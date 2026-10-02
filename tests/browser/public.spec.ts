import { test, expect, type APIResponse } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { inquiryMessage } from "../../src/inquiry";

// Explicit expected state: never infer readiness from what the UI happens to show.
const contactConfigured = process.env.QA_CONTACT_STATE === "configured";

function verifyInquiryRedirect(response: APIResponse, offer?: string) {
  expect(response.status()).toBe(303);
  const location = response.headers()["location"];
  if (!contactConfigured) {
    expect(location).toBe(`/contact${offer ? `?offer=${offer}` : ""}`);
    return;
  }
  const destination = new URL(location);
  expect(destination.origin).toBe("https://wa.me");
  expect(/^[1-9]\d{7,14}$/.test(destination.pathname.slice(1))).toBe(true);
  // Compare booleans so failure output never prints the configured recipient.
  const expectedRecipient = process.env.QA_EXPECT_WHATSAPP_NUMBER;
  expect(
    typeof expectedRecipient === "string" && expectedRecipient.length > 0,
  ).toBe(true);
  expect(destination.pathname.slice(1) === expectedRecipient).toBe(true);
  expect(destination.searchParams.get("text")).toBe(inquiryMessage(offer));
  expect(destination.searchParams.size).toBe(1);
  expect(destination.search.includes(" ")).toBe(false);
}

for (const path of ["/", "/barber", "/contact", "/privacy"]) {
  test(`${path}: layout, metadata, accessibility, keyboard, assets, no browser errors`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const failedRequests: string[] = [];
    page.on("requestfailed", (request) => failedRequests.push(request.url()));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("lang", "id");
    await expect(page).toHaveTitle(/Ranel/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.{40,}/,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(
      await page
        .locator("body")
        .evaluate(() => getComputedStyle(document.body).backgroundColor),
    ).toBe("rgb(242, 240, 235)");
    const css = await page.request.get("/static/style.css");
    expect(css.status()).toBe(200);
    expect(css.headers()["content-type"]).toContain("text/css");
    const favicon = await page.request.get("/static/brand-mark.svg");
    expect(favicon.status()).toBe(200);
    expect(favicon.headers()["content-type"]).toContain("image/svg+xml");
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    await page.keyboard.press("Tab");
    await expect(page.locator(".skip-link")).toBeFocused();
    expect(
      await page
        .locator(".skip-link")
        .evaluate((element) => element.getBoundingClientRect().top),
    ).toBeGreaterThanOrEqual(0);
    await page.keyboard.press("Enter");
    expect(new URL(page.url()).hash).toBe("#main-content");
    await page.keyboard.press("Tab");
    expect(
      await page
        .locator(":focus")
        .evaluate((element) => getComputedStyle(element).outlineStyle),
    ).toBe("solid");
    expect(errors).toEqual([]);
    expect(failedRequests).toEqual([]);
    await page.screenshot({
      path: `qa-artifacts/${contactConfigured ? "configured" : "unconfigured"}-${testInfo.project.name}-${path === "/" ? "home" : path.slice(1)}.png`,
      fullPage: true,
      scale: "css",
    });
  });
}

test("visitor follows home → barber → chosen offer → honest contact state", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Jelajahi penawaran barber" }).click();
  await expect(page).toHaveURL(/\/barber$/);
  await page
    .getByRole("link", { name: "Lihat rencana kit", exact: true })
    .click();
  await expect(page).toHaveURL(/#rencana-kit$/);
  const cards = page.locator(".offer-card");
  await expect(cards).toHaveCount(3);
  await cards.nth(1).getByRole("link", { name: "Bahas rencana kit" }).click();
  await expect(page).toHaveURL(/\/contact\?offer=retention$/);
  await expect(page.locator("#inquiry-message")).toHaveValue(
    /Customer Retention Kit/,
  );
  if (contactConfigured) {
    await expect(
      page.getByRole("heading", { name: "Lanjutkan di WhatsApp." }),
    ).toBeVisible();
    await expect(
      page.getByText("Kontak belum aktif", { exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: "Buka WhatsApp untuk diskusi" }),
    ).toHaveAttribute("href", "/inquiry?offer=retention");
    await expect(
      page.getByText("Website ini tidak mengirim atau menyimpan pesan Anda.", {
        exact: false,
      }),
    ).toBeVisible();
    // Do not follow the external URL, open WhatsApp, or send a real message.
    verifyInquiryRedirect(
      await page.request.get("/inquiry?offer=retention", { maxRedirects: 0 }),
      "retention",
    );
  } else {
    await expect(
      page.getByRole("heading", { name: "Kami belum membuka jalur inquiry." }),
    ).toBeVisible();
    await expect(page.locator('a[href^="/inquiry"]')).toHaveCount(0);
  }
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.locator("textarea")).toHaveAttribute("readonly", "");
  await page
    .getByRole("link", { name: "Simple Business Tracking Kit", exact: true })
    .click();
  await expect(page.locator("#inquiry-message")).toHaveValue(
    /Simple Business Tracking Kit/,
  );
  await page.getByRole("link", { name: "Baca informasi privasi" }).click();
  await expect(page).toHaveURL(/\/privacy$/);
});

test("FAQ works with keyboard; unknown route is a useful 404", async ({
  page,
}) => {
  await page.goto("/barber");
  const question = page.locator("summary").first();
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  const response = await page.goto("/not-a-page");
  expect(response?.status()).toBe(404);
  await page.getByRole("link", { name: "Kembali ke beranda" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("all rendered internal links, hash targets and assets resolve", async ({
  page,
}) => {
  for (const path of ["/", "/barber", "/contact", "/privacy"]) {
    await page.goto(path);
    const links = await page
      .locator("a[href], link[href]")
      .evaluateAll((elements) =>
        elements.map((element) => (element as HTMLAnchorElement).href),
      );
    for (const link of [...new Set(links)]) {
      const url = new URL(link);
      const response = await page.request.get(link, { maxRedirects: 0 });
      if (url.pathname === "/inquiry") {
        verifyInquiryRedirect(
          response,
          url.searchParams.get("offer") ?? undefined,
        );
        continue;
      }
      expect(response.status(), `${path} → ${link}`).toBe(200);
      if (url.hash) {
        const body = await response.text();
        expect(body).toContain(`id="${url.hash.slice(1)}"`);
      }
    }
  }
});

test("inquiry redirects safely preserve all topics without contacting WhatsApp", async ({
  request,
}) => {
  for (const offer of [undefined, "operations", "retention", "tracking"]) {
    const path = `/inquiry${offer ? `?offer=${offer}` : ""}`;
    verifyInquiryRedirect(await request.get(path, { maxRedirects: 0 }), offer);
  }
  const response = await request.get(
    "/inquiry?offer=unknown&url=https://invalid.example",
    { maxRedirects: 0 },
  );
  verifyInquiryRedirect(response);
});

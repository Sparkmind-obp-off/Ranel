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
    for (const headers of [response!.headers()]) {
      expect(headers["x-frame-options"]).toBe("DENY");
      expect(headers["strict-transport-security"]).toBe("max-age=31536000");
      expect(headers["content-security-policy"]).toContain(
        "frame-ancestors 'none'",
      );
    }
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
    for (const resource of [css, favicon]) {
      expect(resource.headers()["x-frame-options"]).toBe("DENY");
      expect(resource.headers()["strict-transport-security"]).toBe(
        "max-age=31536000",
      );
      expect(resource.headers()["content-security-policy"]).toContain(
        "frame-ancestors 'none'",
      );
      expect(resource.headers()["x-content-type-options"]).toBe("nosniff");
    }
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
    const screenshotBase = `qa-artifacts/${contactConfigured ? "configured" : "unconfigured"}-${testInfo.project.name}-${path === "/" ? "home" : path.slice(1)}`;
    if (path === "/barber") {
      // The longer real-preview listing needs bounded viewport tiles on the 1GB sandbox.
      // Keep full vertical coverage without a single giant Chromium raster allocation.
      const height=await page.evaluate(()=>document.documentElement.scrollHeight);
      const step=page.viewportSize()!.height;
      for (let y=0, tile=0;y<height;y+=step,tile++) {
        await page.evaluate(offset=>window.scrollTo(0,offset),y);
        await page.screenshot({path:`${screenshotBase}-tile-${tile}.png`,fullPage:false,scale:"css"});
      }
    } else await page.screenshot({path:`${screenshotBase}.png`,fullPage:true,scale:"css"});
  });
}

test("visitor follows home → barber → chosen offer → honest contact state", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Jelajahi penawaran barber" }).click();
  await expect(page).toHaveURL(/\/barber$/);
  await page
    .getByRole("link", { name: "Lihat katalog pilot", exact: true })
    .click();
  await expect(page).toHaveURL(/#rencana-kit$/);
  const cards = page.locator(".offer-card");
  await expect(cards).toHaveCount(3);
  await cards.nth(1).getByRole("link", { name: "Bahas pilot Growth" }).click();
  await expect(page).toHaveURL(/\/contact\?offer=growth$/);
  await expect(page.locator("#inquiry-message")).toHaveValue(
    /Ranel Barber Growth/,
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
    ).toHaveAttribute("href", "/inquiry?offer=growth");
    await expect(
      page.getByText("Website ini tidak mengirim atau menyimpan pesan Anda.", {
        exact: false,
      }),
    ).toBeVisible();
    // Do not follow the external URL, open WhatsApp, or send a real message.
    verifyInquiryRedirect(
      await page.request.get("/inquiry?offer=growth", { maxRedirects: 0 }),
      "growth",
    );
  } else {
    await expect(
      page.getByRole("heading", { name: "Hubungi Ranel melalui email." }),
    ).toBeVisible();
    await expect(page.locator('a[href^="/inquiry"]')).toHaveCount(0);
  }
  await expect(page.locator('footer a[href="mailto:farasmuhadzib@gmail.com"]')).toBeVisible();
  if (!contactConfigured) await expect(page.locator('main a[href="mailto:farasmuhadzib@gmail.com"]')).toBeVisible();
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.locator("textarea")).toHaveAttribute("readonly", "");
  await page
    .getByRole("link", { name: "Ranel Barber System", exact: true })
    .click();
  await expect(page.locator("#inquiry-message")).toHaveValue(
    /Ranel Barber System/,
  );
  await page.getByRole("link", { name: "Baca informasi privasi" }).click();
  await expect(page).toHaveURL(/\/privacy$/);
});

test("FAQ works with keyboard; unknown route is a useful 404", async ({
  page,
}) => {
  await page.goto("/barber");
  const faq = page.locator(".faq-section");
  const question = faq.locator("summary").first();
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(faq.locator("details").first()).toHaveAttribute("open", "");
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
      if (url.protocol === "mailto:") {
        expect(url.pathname).toBe("farasmuhadzib@gmail.com");
        continue;
      }
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

test("three pilot products expose deliverables, distinctions and contextual CTAs", async ({
  page,
}) => {
  const products = [
    {
      id: "starter",
      name: "Ranel Barber Starter",
      cta: "Bahas pilot Starter",
      status: "Pilot — penjualan belum dibuka",
    },
    {
      id: "growth",
      name: "Ranel Barber Growth",
      cta: "Bahas pilot Growth",
      status: "Pilot — penjualan belum dibuka",
    },
    {
      id: "system",
      name: "Ranel Barber System",
      cta: "Bahas pilot System",
      status: "Pilot — penjualan belum dibuka",
    },
  ];
  for (const product of products) {
    await page.goto("/barber");
    const card = page.locator(`#offer-${product.id}`);
    await expect(
      card.getByRole("heading", { name: product.name, exact: true }),
    ).toBeVisible();
    await expect(card.locator(".status-label")).toHaveText(product.status);
    await expect(card.locator(".product-target")).toContainText("Untuk:");
    await expect(card.locator(".product-delivery")).toContainText(
      "Yang Anda terima",
    );
    await expect(card.locator(".product-delivery dd")).not.toBeEmpty();
    const prices = { starter: "Rp39.000", growth: "Rp79.000", system: "Rp149.000" };
    await expect(card.locator(".offer-price")).toContainText(prices[product.id as keyof typeof prices]);
    await card.getByText("Cara pakai & batas cakupan", { exact: true }).click();
    for (const label of [
      "Cara kerja",
      "Contoh penggunaan",
      "Tidak termasuk",
      "Status pilot",
    ]) {
      await expect(
        card.locator(".product-details dt").filter({ hasText: label }),
      ).toBeVisible();
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (product.id === "growth")
      await expect(card).toContainText("Seluruh fondasi Starter");
    if (product.id === "system") {
      await expect(card).toContainText("Bukan dashboard atau aplikasi aktif");
      await expect(card).toContainText("fitur digital belum dibangun");
    }
    await card.getByRole("link", { name: product.cta, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/contact\\?offer=${product.id}$`));
    await expect(page.locator("#inquiry-message")).toHaveValue(
      new RegExp(product.name),
    );
    if (product.id === "system")
      await expect(page.locator(".contact-scope-note")).toContainText(
        "belum tersedia",
      );
    verifyInquiryRedirect(
      await page.request.get(`/inquiry?offer=${product.id}`, {
        maxRedirects: 0,
      }),
      product.id,
    );
  }
});

test("standard bundles show exact filenames and loaded cropped previews without purchase/download controls", async ({ page }) => {
  await page.goto('/barber');
  const expected = {starter:6,growth:10,system:15};
  for (const [id,count] of Object.entries(expected)) {
    const card=page.locator(`#offer-${id}`);
    await card.locator('.product-manifest summary').click();
    await expect(card.locator('.product-manifest li')).toHaveCount(count);
    await expect(card.locator('.product-manifest')).toContainText('00-README.pdf');
    await expect(card.locator('.product-manifest')).toContainText('MANIFEST.md');
    await expect(card.locator('.product-preview figcaption')).toContainText('bukan file lengkap');
    for (const image of await card.locator('.product-preview img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      expect(await image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth===960)).toBe(true);
    }
  }
  await expect(page.locator('a[href$=".zip"], a[href*="checkout"], button, form, script')).toHaveCount(0);
  for (const tier of ['Starter','Growth','System']) for (const prefix of ['/static/', '/private-products/releases/', '/products/']) expect((await page.request.get(`${prefix}Ranel-Barber-${tier}-v1.0.zip`)).status()).toBe(404);
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test("approved prices and Starter default entry stay informational with no checkout", async ({ page }) => {
  await page.goto("/barber");
  await expect(page.locator('#offer-starter[data-entry="true"]')).toBeVisible();
  await expect(page.locator('.entry-label')).toHaveText('Paket awal / default entry');
  await expect(page.locator('a[href*="checkout"], form, script')).toHaveCount(0);
  await expect(page.locator('.catalog-note')).toContainText('Tidak harus naik paket');
  await page.locator('footer a[href="/legal"]').click();
  await expect(page).toHaveURL(/\/legal$/);
});

test("legal hub and eight policies are accessible, dated and truthful on each viewport", async ({ page }, testInfo) => {
  test.setTimeout(120000);
  for (const slug of ['', 'ownership', 'terms', 'pricing-payment', 'refund-policy', 'privacy', 'license', 'complaints', 'payment-provider']) {
    const response = await page.goto('/legal' + (slug ? '/' + slug : ''));
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.legal-identity')).toContainText('PT Waskita Cakrawarti Digital');
    await expect(page.locator('.policy-dates')).toContainText('3 Oktober 2026');
    await expect(page.locator('.legal-status')).toContainText('Penjualan online dan pembayaran belum dibuka');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
    await expect(page.locator('script, form')).toHaveCount(0);
    await expect(page.locator('.legal-identity a[href="mailto:farasmuhadzib@gmail.com"]')).toBeVisible();
    await expect(page.locator('.legal-identity')).toContainText('AHU-066746.AH.01.30.Tahun 2025');
    await expect(page.locator('.legal-identity')).toContainText('1 Desember 2025');
    await expect(page.locator('.legal-identity')).toContainText('bukan verifikasi legal independen');
    const method = await page.request.post('/legal' + (slug ? '/' + slug : ''), {data: 'fixture_no_action'});
    expect(method.status()).toBe(405);
  }
  await page.goto('/legal');
  await page.screenshot({path: `qa-artifacts/legal-${testInfo.project.name}.png`,fullPage:true,scale:'css'});
  await page.getByRole('navigation', {name: 'Dokumen kebijakan'}).getByRole('link', {name: /Harga & pembayaran/}).click();
  await expect(page.locator('main')).toContainText('maksimum 40%');
  await expect(page.locator('main')).toContainText('Pajak yang berlaku akan dihitung dan ditampilkan');
});

test("read-only PUBLIC rejects oversized and ambiguous input without external effects", async ({
  request,
}) => {
  for (const path of ["/contact", "/inquiry"]) {
    const duplicate = await request.get(`${path}?offer=starter&offer=growth`, {
      maxRedirects: 0,
    });
    expect(duplicate.status()).toBe(400);
    expect(duplicate.headers()["location"]).toBeUndefined();
    const method = await request.post(path, {
      data: "synthetic_no_action",
      maxRedirects: 0,
    });
    expect(method.status()).toBe(405);
    expect(method.headers()["allow"]).toBe("GET, HEAD");
    expect(method.headers()["location"]).toBeUndefined();
    expect(await method.text()).not.toContain("synthetic_no_action");
    expect(method.headers()["x-frame-options"]).toBe("DENY");
  }
  const longURL = await request.get("/contact?padding=" + "x".repeat(2100), {
    maxRedirects: 0,
  });
  expect(longURL.status()).toBe(414);
  expect(longURL.headers()["location"]).toBeUndefined();
});

test("inquiry redirects safely preserve all topics without contacting WhatsApp", async ({
  request,
}) => {
  for (const offer of [
    undefined,
    "starter",
    "growth",
    "system",
    "operations",
    "retention",
    "tracking",
  ]) {
    const path = `/inquiry${offer ? `?offer=${offer}` : ""}`;
    verifyInquiryRedirect(await request.get(path, { maxRedirects: 0 }), offer);
  }
  const response = await request.get(
    "/inquiry?offer=unknown&url=https://invalid.example",
    { maxRedirects: 0 },
  );
  verifyInquiryRedirect(response);
});

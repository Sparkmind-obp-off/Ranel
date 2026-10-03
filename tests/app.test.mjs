import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import app from "../dist/_worker.js";

const request = (path, env = {}, init = {}) =>
  app.fetch(new Request(`https://test.invalid${path}`, init), env, {});
const legalRoutes = ["/legal", ...["ownership", "terms", "pricing-payment", "refund-policy", "privacy", "license", "complaints", "payment-provider"].map(slug => `/legal/${slug}`)];
const routes = ["/", "/barber", "/contact", "/privacy", ...legalRoutes];

for (const route of routes) {
  test(`${route} renders semantic Indonesian HTML and unique metadata`, async () => {
    const response = await request(route);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /text\/html/);
    const html = await response.text();
    assert.match(html, /^<!DOCTYPE html><html lang="id">/);
    assert.match(html, /<title>[^<]*Ranel[^<]*<\/title>/);
    assert.match(html, /<meta name="description" content="[^"]{40,}"/);
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
    for (const tag of ["header", "nav", "main", "footer"])
      assert.match(html, new RegExp(`<${tag}[ >]`));
    assert.match(html, /href="#main-content"/);
    assert.match(html, /id="main-content"/);
    assert.match(html, /href="\/static\/brand-mark.svg"/);
    assert.doesNotMatch(
      html,
      /<script|<form|<button|href="#"|lorem ipsum|localStorage|GoogleAnalytics/i,
    );
  });
}

test("home labels future layers as unavailable", async () => {
  const html = await (await request("/")).text();
  assert.match(html, /Kits → Systems → Supply/);
  assert.equal((html.match(/Belum tersedia/g) ?? []).length, 2);
  assert.match(html, /Fase awal/);
});

test("barber presents exactly three defined pilot products with truthful scope and price labels", async () => {
  const html = await (await request("/barber")).text();
  assert.equal((html.match(/class="offer-card"/g) ?? []).length, 3);
  assert.equal((html.match(/class="product-delivery"/g) ?? []).length, 3);
  assert.equal((html.match(/class="product-details"/g) ?? []).length, 3);
  for (const price of ["Rp39.000", "Rp79.000", "Rp149.000"]) assert.match(html, new RegExp(price.replace(".", "\\.")));
  assert.match(html, /data-entry="true" id="offer-starter"/);
  assert.doesNotMatch(html, /Harga pilot — diskusikan kebutuhan|Tidak ada harga tetap|testimoni|dipercaya oleh|beli sekarang/i);
  for (const [id, name] of [
    ["starter", "Ranel Barber Starter"],
    ["growth", "Ranel Barber Growth"],
    ["system", "Ranel Barber System"],
  ]) {
    assert.match(html, new RegExp(`<h3>${name}</h3>`));
    assert.match(html, new RegExp(`href="/contact\\?offer=${id}"`));
    assert.match(html, new RegExp(`id="offer-${id}"`));
  }
  assert.match(html, /Pilot — penjualan belum dibuka/);
  assert.match(html, /Rp39.000/);
  assert.match(html, /sekali bayar/);
  assert.match(html, /Fondasi \+ catatan &amp; review/);
  assert.match(html, /Seluruh fondasi Starter/);
  assert.match(html, /Bukan dashboard atau aplikasi aktif/);
  assert.match(html, /sebelum pekerjaan atau pembayaran/);
});

test("Phase 02 metadata matches reviewed asset registry without serving private bundles", async () => {
  const registry = JSON.parse(readFileSync(new URL("../products/registry.json", import.meta.url), "utf8"));
  const html = await (await request("/barber")).text();
  for (const product of registry) {
    assert.ok(html.includes(product.sku));
    assert.ok(html.includes(`Rp${product.price.toLocaleString("id-ID")}`));
    assert.equal(product.sellState, "HOLD_PENDING_TERMS");
  }
  for (const path of ["/products/registry.json", "/checkout", "/api/v1/payments", "/products/Ranel-Barber-Starter-v1.0/00-README.pdf"]) assert.equal((await request(path)).status, 404);
});

test("legal content has consistent identity/dates and confirmed official email without unsupported tax/registration/payment claims", async () => {
  for (const route of legalRoutes) {
    const html = await (await request(route)).text();
    assert.match(html, /PT Waskita Cakrawarti Digital/);
    assert.match(html, /Perseroan Perorangan/);
    assert.match(html, /3 Oktober 2026/);
    assert.match(html, /Penjualan online dan pembayaran belum dibuka/);
    assert.match(html, /href="mailto:farasmuhadzib@gmail\.com"/);
    assert.match(html, /AHU-066746\.AH\.01\.30\.Tahun 2025/);
    assert.doesNotMatch(html, /\b\d{16}\b|PPN\s*(11|12)%|Pembayaran diproses melalui Duitku|registered trademark|<script|<form/);
  }
  const price = await (await request("/legal/pricing-payment")).text();
  assert.match(price, /maksimum 40%/); assert.match(price, /tidak stacking/);
  assert.match(price, /Pajak yang berlaku akan dihitung dan ditampilkan/);
  const refund = await (await request("/legal/refund-policy")).text();
  assert.match(refund, /Hak konsumen/); assert.match(refund, /Non-delivery/);
  const license = await (await request("/legal/license")).text();
  assert.match(license, /usahanya sendiri/); assert.match(license, /mensublisensikan/);
});

test("all internal HTML links resolve and anchors exist", async () => {
  for (const route of routes) {
    const html = await (await request(route)).text();
    for (const match of html.matchAll(/href="([^"]+)"/g)) {
      const href = match[1].replaceAll("&amp;", "&");
      if (href.startsWith("/static/")) continue; // Static asset serving checked through Wrangler/browser.
      const url = new URL(href, `https://test.invalid${route}`);
      if (url.protocol === "mailto:") {
        assert.equal(url.pathname, "farasmuhadzib@gmail.com");
        continue;
      }
      if (url.hostname !== "test.invalid") {
        assert.equal(url.protocol, "https:");
        assert.ok(["ahu.go.id", "oss.go.id", "jdih.kemendag.go.id", "jdih.komdigi.go.id", "www.duitku.com"].includes(url.hostname));
        continue;
      }
      const result = await request(url.pathname + url.search);
      assert.equal(result.status, 200, `broken link ${route} → ${href}`);
      if (url.hash)
        assert.ok(
          (await result.text()).includes(`id="${url.hash.slice(1)}"`),
          `missing anchor ${href}`,
        );
    }
  }
});

test("unconfigured WhatsApp falls back to official email without a form", async () => {
  const html = await (await request("/contact")).text();
  assert.match(html, /Email resmi tersedia · WhatsApp belum dikonfigurasi/);
  assert.match(html, /Hubungi Ranel melalui email/);
  assert.match(html, /href="mailto:farasmuhadzib@gmail\.com"/);
  assert.match(html, /readonly=""/);
  assert.doesNotMatch(html, /href="\/inquiry|wa\.me|Buka WhatsApp/);
});

for (const id of ["operations", "retention", "tracking"]) {
  test(`selected ${id} offer is preserved on contact and WhatsApp redirect`, async () => {
    // Synthetic international-format fixture; not a real/verified business contact.
    const env = { INQUIRY_WHATSAPP_NUMBER: "12025550123" };
    const response = await request(`/contact?offer=${id}`, env);
    const html = await response.text();
    assert.match(html, /Jalur WhatsApp tersedia/);
    assert.match(html, new RegExp(`href="/inquiry\\?offer=${id}"`));
    const result = await request(`/inquiry?offer=${id}`, env);
    assert.equal(result.status, 303);
    const url = new URL(result.headers.get("location"));
    assert.equal(url.origin, "https://wa.me");
    assert.equal(url.pathname, "/12025550123");
    const names = {
      operations: "Barber Operations Starter Kit",
      retention: "Customer Retention Kit",
      tracking: "Simple Business Tracking Kit",
    };
    assert.equal(
      url.searchParams.get("text"),
      `Halo Ranel, saya ingin berdiskusi tentang ${names[id]}. Boleh jelaskan rencana isi, cakupan, dan harga pilotnya?`,
    );
    assert.match(html, /Website ini tidak mengirim atau menyimpan/);
  });
}

for (const value of [
  undefined,
  "",
  "+12025550123",
  "08123456789",
  "123",
  " 12025550123 ",
  "12025550123?redirect=https://evil.invalid",
  "1".repeat(16),
]) {
  test(`invalid/missing contact configuration fails closed (${value === undefined ? "undefined" : value.length})`, async () => {
    const env = { INQUIRY_WHATSAPP_NUMBER: value };
    const html = await (await request("/contact?offer=operations", env)).text();
    assert.match(html, /Email resmi tersedia · WhatsApp belum dikonfigurasi/);
    assert.doesNotMatch(html, /href="\/inquiry/);
    const result = await request("/inquiry?offer=operations", env);
    assert.equal(result.status, 303);
    assert.equal(result.headers.get("location"), "/contact?offer=operations");
  });
}

test("unknown/malicious offer input falls back without reflection or open redirect", async () => {
  const input = encodeURIComponent(
    "<script>alert(1)</script>https://evil.invalid",
  );
  const html = await (await request(`/contact?offer=${input}`)).text();
  assert.doesNotMatch(html, /<script|evil\.invalid|alert\(1\)/);
  assert.match(html, /rencana kit pilot untuk usaha barber/);
  const result = await request(
    `/inquiry?offer=${input}&url=https://evil.invalid`,
    { INQUIRY_WHATSAPP_NUMBER: "12025550123" },
  );
  const url = new URL(result.headers.get("location"));
  assert.equal(url.origin, "https://wa.me");
  assert.doesNotMatch(url.searchParams.get("text"), /evil\.invalid/);
});

test("privacy explains no application persistence and third-party handoff", async () => {
  const html = await (await request("/privacy")).text();
  assert.match(html, /Tidak ada akun, database inquiry/);
  assert.match(html, /kebijakan layanan tersebut/);
  assert.match(html, /farasmuhadzib@gmail\.com/);
  assert.match(html, /retensi dan penghapusan pesan belum ditetapkan/);
});

test("404 returns useful navigation and proper status", async () => {
  const response = await request("/does-not-exist");
  assert.equal(response.status, 404);
  assert.match(await response.text(), /Kembali ke beranda/);
});

test("there is no form submission API and nothing reports successful storage", async () => {
  const response = await request(
    "/api/contact",
    {},
    { method: "POST", body: "name=test" },
  );
  assert.equal(response.status, 404);
  assert.doesNotMatch(
    await response.text(),
    /berhasil dikirim|berhasil disimpan/i,
  );
});

for (const [id, name] of [
  ["starter", "Ranel Barber Starter"],
  ["growth", "Ranel Barber Growth"],
  ["system", "Ranel Barber System"],
]) {
  test(`pilot ${id} preserves product context, readiness and safe handoff`, async () => {
    const env = { INQUIRY_WHATSAPP_NUMBER: "12025550123" };
    const html = await (await request(`/contact?offer=${id}`, env)).text();
    assert.match(html, new RegExp(name));
    assert.match(html, new RegExp(`href="/inquiry\\?offer=${id}"`));
    assert.doesNotMatch(html, /<form|berhasil dikirim|berhasil disimpan/);
    const response = await request(`/inquiry?offer=${id}`, env);
    assert.equal(response.status, 303);
    const url = new URL(response.headers.get("location"));
    assert.equal(url.origin, "https://wa.me");
    assert.equal(url.pathname, "/12025550123");
    const prices = { starter: "Rp39.000", growth: "Rp79.000", system: "Rp149.000" };
    const message = `Halo Ranel, saya ingin membahas pilot ${name} dengan harga dasar ${prices[id]} (sekali bayar). Boleh konfirmasi isi, tailoring, ketentuan, waktu, dan dukungannya? Saya memahami penjualan online belum dibuka${id === "system" ? " dan System adalah paket dokumen, bukan aplikasi" : ""}.`;
    assert.equal(url.searchParams.get("text"), message);
    assert.equal(url.searchParams.size, 1);
    const fallback = await request(`/inquiry?offer=${id}`);
    assert.equal(fallback.status, 303);
    assert.equal(fallback.headers.get("location"), `/contact?offer=${id}`);
    if (id === "system") {
      assert.match(
        html,
        /aplikasi, dashboard, booking, database, loyalty, dan otomasi belum tersedia/,
      );
      assert.match(html, /Tidak ada akses demo/);
    }
  });
}

test("concept scope creates no private or transactional routes", async () => {
  for (const path of [
    "/admin",
    "/login",
    "/dashboard",
    "/booking",
    "/api/customers",
    "/api/payments",
    "/api/leads",
  ]) {
    assert.equal((await request(path)).status, 404);
  }
});

test("PUBLIC URLs are bounded before query parsing, without reflecting rejected input", async () => {
  const prefix = "https://test.invalid/contact?padding=";
  const path = "/contact?padding=" + "x".repeat(2048 - prefix.length);
  assert.equal((await request(path)).status, 200);
  const rejected = await request(path + "x");
  assert.equal(rejected.status, 414);
  assert.equal(rejected.headers.get("location"), null);
  assert.equal(rejected.headers.get("cache-control"), "no-store");
  assert.doesNotMatch(await rejected.text(), /padding=|xxxxx/);
});

test("ambiguous and oversized inquiry topics fail closed; short unknown topics still fall back", async () => {
  for (const route of ["/contact", "/inquiry"]) {
    for (const query of [
      "offer=starter&offer=growth",
      "offer=starter&off%65r=growth",
      "offer=" + "x".repeat(65),
    ]) {
      const response = await request(`${route}?${query}`, {
        INQUIRY_WHATSAPP_NUMBER: "12025550123",
      });
      assert.equal(response.status, 400);
      assert.equal(response.headers.get("location"), null);
      assert.doesNotMatch(await response.text(), /xxxxx|starter|growth/);
    }
  }
  assert.equal((await request("/contact?offer=" + "x".repeat(64))).status, 200);
});

test("PUBLIC methods are GET/HEAD only; rejected verbs cannot submit or redirect", async () => {
  for (const path of [...routes, "/inquiry"]) {
    for (const method of ["POST", "PUT", "PATCH", "DELETE", "OPTIONS"]) {
      const response = await request(
        path,
        { INQUIRY_WHATSAPP_NUMBER: "12025550123" },
        { method, body: "untrusted_payload" },
      );
      assert.equal(response.status, 405);
      assert.equal(response.headers.get("allow"), "GET, HEAD");
      assert.equal(response.headers.get("location"), null);
      assert.doesNotMatch(await response.text(), /untrusted_payload/);
    }
    const head = await request(path, {}, { method: "HEAD" });
    assert.equal(head.status, path === "/inquiry" ? 303 : 200);
    assert.equal(await head.text(), "");
    assert.equal(head.headers.get("x-frame-options"), "DENY");
  }
});

test("native asset security headers mirror the Worker contract without broadening HSTS scope", async () => {
  const config = readFileSync(
    new URL("../public/_headers", import.meta.url),
    "utf8",
  );
  assert.match(config, /^\/static\/\*$/m);
  const response = await request("/");
  for (const line of config
    .split("\n")
    .filter((line) => line.startsWith("  "))) {
    const separator = line.indexOf(": ");
    const key = line.slice(2, separator);
    const value = line.slice(separator + 2);
    assert.equal(response.headers.get(key), value, key);
  }
  assert.doesNotMatch(config, /includeSubDomains|preload/);
});

test("generic 500 hides exception details and public requests do not establish financial truth", async () => {
  const env = Object.defineProperty({}, "INQUIRY_WHATSAPP_NUMBER", {
    get() {
      throw new Error("fixture_private_details");
    },
  });
  const failure = await request("/contact", env);
  assert.equal(failure.status, 500);
  assert.doesNotMatch(
    await failure.text(),
    /fixture_private_details|stack|Error:/,
  );
  const intent = await request(
    "/contact?paid=true&amount=1&entitlement=granted",
  );
  assert.equal(intent.status, 200);
  assert.doesNotMatch(
    await intent.text(),
    /entitlement=granted|paid=true|payment confirmed/i,
  );
  for (const path of [
    "/api/payments/callback",
    "/api/entitlements",
    "/api/refunds",
    "/api/payouts",
  ]) {
    assert.equal(
      (await request(path, {}, { method: "POST", body: '{"paid":true}' }))
        .status,
      404,
    );
  }
});

test("page and redirect security headers omit cookies and disallow framing", async () => {
  for (const route of [...routes, "/inquiry"]) {
    const response = await request(route);
    assert.match(
      response.headers.get("content-security-policy"),
      /frame-ancestors 'none'/,
    );
    assert.match(
      response.headers.get("content-security-policy"),
      /form-action 'self'/,
    );
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("x-frame-options"), "DENY");
    assert.equal(
      response.headers.get("strict-transport-security"),
      "max-age=31536000",
    );
    assert.equal(response.headers.get("set-cookie"), null);
    assert.equal(response.headers.get("cache-control"), "no-store");
  }
});

import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import type { Child } from "hono/jsx";
import { legalPaths, legalPages, LegalContent, sellerName } from "./legal";
import {
  offers,
  formatPrice,
  selectedOffer,
  inquiryMessage,
  whatsappDestination,
} from "./inquiry";

type Bindings = { INQUIRY_WHATSAPP_NUMBER?: string };
const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
  await next();
  c.header("X-Content-Type-Options", "nosniff");
  c.header("X-Frame-Options", "DENY");
  // Host-only HTTPS policy: no preload/includeSubDomains or DNS changes.
  c.header("Strict-Transport-Security", "max-age=31536000");
  c.header("Referrer-Policy", "strict-origin-when-cross-origin");
  c.header(
    "Content-Security-Policy",
    "default-src 'none'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
  );
  c.header("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  // Contact availability must reflect the current runtime configuration.
  if (!c.req.path.startsWith("/static/")) c.header("Cache-Control", "no-store");
});
// These are protocol/input contracts for a read-only PUBLIC app, not identity/role authorization.
const readOnlyPublicPaths = new Set([
  "/",
  "/barber",
  "/contact",
  "/privacy",
  "/inquiry",
  ...legalPaths,
]);
app.use("*", async (c, next) => {
  // Bound input before query parsing; never echo a rejected URL or body.
  if (c.req.url.length > 2048)
    return c.text("Alamat permintaan terlalu panjang.", 414);
  if (
    readOnlyPublicPaths.has(c.req.path) &&
    !["GET", "HEAD"].includes(c.req.method)
  ) {
    c.header("Allow", "GET, HEAD");
    return c.text("Metode tidak didukung. Gunakan GET atau HEAD.", 405);
  }
  if (c.req.path === "/contact" || c.req.path === "/inquiry") {
    const topics = c.req.queries("offer") ?? [];
    if (topics.length > 1 || topics.some((topic) => topic.length > 64)) {
      return c.text("Gunakan satu topik inquiry yang valid.", 400);
    }
  }
  await next();
});
app.use("/static/*", serveStatic({ root: "./public" }));

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Action({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: Child;
  secondary?: boolean;
}) {
  return (
    <a class={secondary ? "button button-secondary" : "button"} href={href}>
      {children}
      <Arrow />
    </a>
  );
}
function Layout({
  title,
  description,
  path,
  children,
}: {
  title: string;
  description: string;
  path: string;
  children: Child;
}) {
  return (
    <html lang="id">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#F2F0EB" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/static/brand-mark.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="/static/style.css" />
      </head>
      <body>
        <a class="skip-link" href="#main-content">
          Lewati ke konten
        </a>
        <header class="site-header">
          <a class="wordmark" href="/" aria-label="Ranel — beranda">
            ranel
            <span class="brand-dot" aria-hidden="true">
              .
            </span>
          </a>
          <nav aria-label="Navigasi utama">
            <a href="/" aria-current={path === "/" ? "page" : undefined}>
              Beranda
            </a>
            <a
              href="/barber"
              aria-current={path === "/barber" ? "page" : undefined}
            >
              Untuk barber
            </a>
            <a
              class="nav-contact"
              href="/contact"
              aria-current={path === "/contact" ? "page" : undefined}
            >
              Diskusi pilot <Arrow />
            </a>
          </nav>
        </header>
        <main id="main-content">{children}</main>
        <footer class="site-footer">
          <div>
            <a class="wordmark" href="/">
              ranel
              <span class="brand-dot" aria-hidden="true">
                .
              </span>
            </a>
            <p>Practical systems for better-run businesses.</p>
            <p class="small">Dioperasikan oleh {sellerName} · Perseroan Perorangan</p>
            <p class="small">
              Dimulai dari usaha barber. Dibangun selangkah demi selangkah.
            </p>
          </div>
          <nav aria-label="Navigasi footer">
            <a href="/barber">Penawaran barber</a>
            <a href="/contact">Informasi kontak</a>
            <a href="/privacy">Privasi website</a>
            <a href="/legal">Legal &amp; Policies</a>
            <a href="/legal/terms">Ketentuan produk</a>
            <a href="/legal/pricing-payment">Harga &amp; pembayaran</a>
            <a href="/legal/refund-policy">Refund &amp; pembatalan</a>
            <a href="/legal/privacy">Privasi &amp; data</a>
            <a href="/legal/license">Lisensi produk</a>
            <a href="/legal/complaints">Keluhan &amp; dukungan</a>
          </nav>
          <p class="footer-note">Fase awal · Pilot / hold · Penjualan online dan pembayaran belum dibuka</p>
        </footer>
      </body>
    </html>
  );
}
function OfferCards() {
  return (
    <div class="offer-grid">
      {offers.map((offer) => (
        <article class="offer-card" data-entry={offer.id === "starter" ? "true" : undefined} id={`offer-${offer.id}`} key={offer.id}>
          <div class="card-top">
            <span class="index">{offer.number}</span>
            <span class="status-label">{offer.status}</span>
          </div>
          {offer.id === "starter" && <p class="entry-label">Paket awal / default entry</p>}
          <h3>{offer.name}</h3>
          <p class="offer-price">{formatPrice(offer.price)} <span>sekali bayar · IDR</span></p>
          <p class="small">{offer.sku} · v{offer.version}</p>
          <p class="card-intro">{offer.short}</p>
          <p>{offer.description}</p>
          <p class="product-target">
            <strong>Untuk:</strong> {offer.target}
          </p>
          <p>{offer.problem}</p>
          <h4>
            Isi paket dokumen
          </h4>
          <ul>
            {offer.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <dl class="product-delivery">
            <dt>Yang Anda terima</dt>
            <dd>{offer.receives}</dd>
          </dl>
          <details class="product-details">
            <summary>Cara pakai & batas cakupan</summary>
            <dl>
              <dt>Cara kerja</dt>
              <dd>{offer.how}</dd>
              <dt>Contoh penggunaan</dt>
              <dd>{offer.useCase}</dd>
              <dt>Tidak termasuk</dt>
              <dd>{offer.exclusions}</dd>
              <dt>Status pilot</dt>
              <dd>{offer.statusNote}</dd>
            </dl>
          </details>
          <div class="card-bottom">
            <a class="small" href="/legal/pricing-payment">Harga, pajak &amp; ketentuan</a>
            <a class="text-link" href={`/contact?offer=${offer.id}`}>
              {offer.cta} <Arrow />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
function PilotCTA() {
  return (
    <section class="pilot-cta" aria-labelledby="pilot-title">
      <div>
        <p class="eyebrow">Mulai dari percakapan</p>
        <h2 id="pilot-title">
          Apa yang ingin Anda
          <br />
          rapikan lebih dulu?
        </h2>
        <p>
          Ceritakan kebutuhan usaha Anda. Kita mulai dari ruang lingkup kecil,
          bukan sistem yang berlebihan.
        </p>
      </div>
      <div>
        <Action href="/contact">Lihat cara diskusi pilot</Action>
        <p class="small">
          Harga dasar telah disetujui; ketentuan dan kesiapan fulfillment dikonfirmasi sebelum kesepakatan. Pembayaran belum dibuka.
        </p>
      </div>
    </section>
  );
}

app.get("/", (c) =>
  c.html(
    "<!DOCTYPE html>" +
    (
      <Layout
        title="Ranel — Sistem praktis untuk usaha yang lebih tertata"
        description="Ranel merancang kit dan sistem ringan untuk usaha lokal. Dimulai dari rencana kit pilot untuk barber: rutinitas, pelanggan, dan catatan usaha."
        path="/"
      >
        <section class="hero home-hero" aria-labelledby="home-title">
          <div class="hero-copy">
            <p class="eyebrow">
              <span class="tiny-dot" aria-hidden="true" /> Sistem praktis untuk
              usaha lokal
            </p>
            <h1 id="home-title">
              Usaha lebih tertata.
              <br />
              <span>Mulai dari yang sederhana.</span>
            </h1>
            <p class="hero-description">
              Ranel membantu operator usaha lokal menata cara kerja melalui kit
              praktis dan sistem ringan. Langkah pertama kami: usaha barber.
            </p>
            <div class="hero-actions">
              <Action href="/barber">Jelajahi penawaran barber</Action>
              <a class="text-link" href="#pendekatan">
                Kenali pendekatan kami <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p class="hero-note">
              <span class="tiny-dot" aria-hidden="true" /> Fase awal · Starter &
              Growth dan System adalah paket dokumen pilot, bukan software. Starter mulai Rp39.000 sekali bayar; pembayaran belum dibuka.
            </p>
          </div>
          <aside
            class="system-board"
            aria-label="Ilustrasi pendekatan Ranel, bukan produk jadi"
          >
            <div class="board-header">
              <span class="eyebrow">Cara kerja yang lebih jelas</span>
              <span class="small">R / 01</span>
            </div>
            <div class="board-main">
              <span class="board-caption">Dari kebutuhan sehari-hari</span>
              <p>
                Rapikan.
                <br />
                Jalankan.
                <br />
                <span>Tinjau.</span>
              </p>
            </div>
            <ol class="board-steps">
              <li>
                <span>01</span> Rutinitas yang jelas
              </li>
              <li>
                <span>02</span> Catatan yang sederhana
              </li>
              <li>
                <span>03</span> Langkah yang berulang
              </li>
            </ol>
            <p class="board-footer">
              Kerangka pendekatan · bukan jaminan hasil
            </p>
          </aside>
        </section>
        <section class="intro-strip" aria-labelledby="intro-title">
          <p class="eyebrow">
            Lebih praktis,
            <br />
            bukan lebih rumit.
          </p>
          <div>
            <h2 id="intro-title">Alat kerja yang mengikuti kebutuhan usaha.</h2>
            <p>
              Bukan barbershop, bukan ERP besar, dan bukan sekadar aplikasi.
              Ranel berfokus pada panduan, template, dan alat ringan yang bisa
              dibahas sesuai cara Anda menjalankan usaha.
            </p>
          </div>
        </section>
        <section class="section" id="pendekatan" aria-labelledby="model-title">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Pendekatan Ranel</p>
              <h2 id="model-title">Kits → Systems → Supply</h2>
            </div>
            <p>
              Tiga lapisan arah pengembangan.
              <br />
              Tidak semuanya tersedia sekarang.
            </p>
          </div>
          <div class="model-grid">
            <article class="model-card current">
              <span class="index">01 / Mulai di sini</span>
              <h3>Kits</h3>
              <p>
                Template, SOP, checklist, dan panduan yang memberi struktur pada
                pekerjaan sehari-hari.
              </p>
              <span class="stage">Fokus awal · Dalam pengembangan</span>
            </article>
            <article class="model-card">
              <span class="index">02 / Bila dibutuhkan</span>
              <h3>Systems</h3>
              <p>
                Alat ringan untuk membantu rutinitas dan pencatatan, setelah
                kebutuhan nyata lebih jelas.
              </p>
              <span class="stage">Arah berikutnya · Belum tersedia</span>
            </article>
            <article class="model-card">
              <span class="index">03 / Secara bertahap</span>
              <h3>Supply</h3>
              <p>
                Perlengkapan usaha yang relevan, jika kebutuhan dan jalur
                penyediaannya sudah teruji.
              </p>
              <span class="stage">Arah jangka lanjut · Belum tersedia</span>
            </article>
          </div>
        </section>
        <section class="barber-feature" aria-labelledby="barber-feature-title">
          <div>
            <p class="eyebrow">Vertikal pertama / Barber</p>
            <h2 id="barber-feature-title">
              Fokus pada usaha Anda.
              <br />
              <span>Rapikan cara menjalankannya.</span>
            </h2>
            <p>
              Untuk barber mandiri, barbershop independen, dan operator kecil
              yang ingin mendiskusikan rutinitas, tindak lanjut pelanggan, atau
              catatan usaha.
            </p>
            <Action href="/barber" secondary>
              Kenali katalog pilot barber
            </Action>
          </div>
          <aside class="feature-note">
            <span class="index">Fokus pilot</span>
            <p>
              Operasional harian
              <br />
              Hubungan pelanggan
              <br />
              Pencatatan sederhana
            </p>
            <span class="small">Pilih satu kebutuhan lebih dulu.</span>
          </aside>
        </section>
        <PilotCTA />
      </Layout>
    ),
  ),
);

app.get("/barber", (c) =>
  c.html(
    "<!DOCTYPE html>" +
    (
      <Layout
        title="Ranel Barber Starter, Growth & System — Katalog pilot"
        description="Paket dokumen pilot Ranel Barber: Starter Rp39.000, Growth Rp79.000, System Rp149.000. Sekali bayar IDR; penjualan online belum dibuka."
        path="/barber"
      >
        <section class="hero barber-hero" aria-labelledby="barber-title">
          <div>
            <p class="eyebrow">Ranel untuk barber / Katalog pilot</p>
            <h1 id="barber-title">
              Cara kerja lebih jelas.
              <br />
              <span>Tanpa sistem yang berlebihan.</span>
            </h1>
            <p class="hero-description">
              Tiga cakupan untuk usaha barber: rapikan fondasi dengan Starter,
              tambah catatan dan review dengan Growth, atau petakan kebutuhan
              kerja lewat paket System. Starter adalah entry offer; Growth/System tetap alternatif tanpa wajib membeli paket sebelumnya.
            </p>
            <div class="hero-actions">
              <Action href="#rencana-kit">Lihat katalog pilot</Action>
              <a class="text-link" href="/contact">
                Informasi diskusi pilot <Arrow />
              </a>
            </div>
          </div>
          <aside class="scope-note">
            <p class="eyebrow">Status penawaran</p>
            <h2>
              Pilot dengan
              <br />
              cakupan yang jelas.
            </h2>
            <p>
              Tiga paket dokumen v1.0 dengan harga dasar disetujui. Penjualan ditahan sampai terms, pajak dan fulfillment siap. Penyiapan/tailoring serta delivery tetap manual dan terbatas; System bukan aplikasi.
            </p>
            <span class="status-label">Tanpa checkout otomatis</span>
          </aside>
        </section>
        <section class="section needs-section" aria-labelledby="needs-title">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Mulai dari kebutuhan nyata</p>
              <h2 id="needs-title">
                Bagian mana yang relevan
                <br />
                untuk usaha Anda?
              </h2>
            </div>
            <p>
              Ini area yang bisa dibahas, bukan asumsi bahwa setiap usaha
              memiliki masalah yang sama.
            </p>
          </div>
          <ul class="needs-grid">
            <li>
              <span>01</span>
              <h3>Operasional harian</h3>
              <p>Rutinitas buka, layanan, kebersihan, dan tutup usaha.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Layanan & harga</h3>
              <p>Daftar layanan dan informasi harga yang lebih jelas.</p>
            </li>
            <li>
              <span>03</span>
              <h3>Pelanggan kembali</h3>
              <p>Pencatatan dan follow-up dengan izin pelanggan.</p>
            </li>
            <li>
              <span>04</span>
              <h3>Catatan sederhana</h3>
              <p>Rekap layanan dan pemasukan untuk ditinjau.</p>
            </li>
            <li>
              <span>05</span>
              <h3>Rutinitas berulang</h3>
              <p>Langkah yang bisa digunakan dan dievaluasi kembali.</p>
            </li>
          </ul>
        </section>
        <section
          class="section catalog-section"
          id="rencana-kit"
          aria-labelledby="catalog-title"
        >
          <div class="section-heading">
            <div>
              <p class="eyebrow">Katalog pilot / Mulai dari kebutuhan</p>
              <h2 id="catalog-title">Starter. Growth. System.</h2>
            </div>
            <p>
              Mulai dari yang paling relevan.
              <br />
              Tidak harus mengambil semuanya.
            </p>
          </div>
          <div class="product-path" aria-label="Perbedaan cakupan produk">
            {offers.map((offer) => (
              <a key={offer.id} href={`#offer-${offer.id}`}>
                <span class="index">{offer.number}</span>
                <strong>{offer.name.replace("Ranel Barber ", "")}</strong>
                <span>{offer.focus}</span>
                <span class="small">{offer.status}</span>
              </a>
            ))}
          </div>
          <OfferCards />
          <p class="catalog-note">
            Tidak harus naik paket atau membeli Starter sebelum Growth/System. Harga dasar sekali bayar; paket tetap pilot/hold, bukan unduhan instan atau software subscription. Tidak ada jaminan kunjungan, pendapatan atau hasil usaha. Pelajari <a href="/legal">Legal &amp; Policies</a> sebelum diskusi.
          </p>
        </section>
        <section
          class="section process-section"
          aria-labelledby="process-title"
        >
          <div class="section-heading">
            <div>
              <p class="eyebrow">Alur pilot manual</p>
              <h2 id="process-title">
                Diskusikan dulu.
                <br />
                Sepakati sebelum mulai.
              </h2>
            </div>
            <p>
              Tidak ada pembayaran atau pengiriman produk otomatis di website
              ini.
            </p>
          </div>
          <ol class="process-grid">
            <li>
              <span class="index">01</span>
              <h3>Ceritakan kebutuhan</h3>
              <p>
                Jelaskan bagian usaha yang ingin ditata dan cara Anda bekerja
                saat ini.
              </p>
            </li>
            <li>
              <span class="index">02</span>
              <h3>Bahas cakupan pilot</h3>
              <p>
                Konfirmasi isi, input minimal, waktu delivery, dukungan dan ketentuan berdasarkan harga dasar yang disetujui.
              </p>
            </li>
            <li>
              <span class="index">03</span>
              <h3>Mulai jika cocok</h3>
              <p>
                Pilot hanya dimulai setelah kesepakatan; pelaksanaan dan tindak
                lanjut dilakukan manual.
              </p>
            </li>
          </ol>
        </section>
        <section class="section faq-section" aria-labelledby="faq-title">
          <p class="eyebrow">Pertanyaan umum</p>
          <h2 id="faq-title">Biar jelas dari awal.</h2>
          <details>
            <summary>Apakah ini aplikasi kasir atau booking?</summary>
            <p>
              Bukan. Fase awal Ranel berfokus pada rancangan kit praktis. POS,
              booking, dan sistem pelanggan tidak termasuk dalam penawaran
              website ini.
            </p>
          </details>
          <details>
            <summary>Apa perbedaan Starter, Growth, dan System?</summary>
            <p>
              Starter menata dasar kerja harian. Growth mencakup Starter plus
              catatan pelanggan, follow-up berizin, dan review sederhana. System
              mencakup Growth ditambah peta kerja, customer journey, retensi, owner review dan prioritas. Semua berupa dokumen; dashboard, booking, loyalty, database, dan otomasi belum tersedia.
            </p>
          </details>
          <details>
            <summary>Bagaimana penawaran pilot disepakati?</summary>
            <p>
              Diskusikan kebutuhan lewat WhatsApp. Isi, format
              dokumen/spreadsheet, harga dasar, waktu, dukungan, dan pembatalan
              perlu disepakati tertulis sebelum pekerjaan atau pembayaran.
              Website tidak menjual atau mengirim file secara otomatis. System
              berupa operating-system toolkit dokumentasi, bukan aplikasi.
            </p>
          </details>
          <details>
            <summary>Apakah hasil usaha dijamin meningkat?</summary>
            <p>
              Tidak. Kit dirancang untuk membantu penataan kerja. Manfaat dan
              hasilnya perlu diuji pada kondisi usaha masing-masing.
            </p>
          </details>
          <details>
            <summary>Bagaimana pelanggan saya akan dihubungi?</summary>
            <p>
              Ranel tidak mengirim pesan otomatis. Rancangan follow-up
              mengutamakan persetujuan pelanggan; pelaksanaannya tetap perlu
              dibahas dan dilakukan dengan bertanggung jawab.
            </p>
          </details>
        </section>
        <PilotCTA />
      </Layout>
    ),
  ),
);

app.get("/contact", (c) => {
  const offer = selectedOffer(c.req.query("offer"));
  const ready = !!whatsappDestination(
    c.env?.INQUIRY_WHATSAPP_NUMBER,
    offer?.id,
  );
  return c.html(
    "<!DOCTYPE html>" +
    (
      <Layout
        title="Diskusi pilot & informasi kontak — Ranel"
        description="Informasi jalur inquiry Ranel dan rancangan pesan untuk membahas kit pilot usaha barber. Ketersediaan kontak ditampilkan secara transparan."
        path="/contact"
      >
        <section
          class="section contact-section"
          aria-labelledby="contact-title"
        >
          <p class="eyebrow">Mulai dari percakapan</p>
          <h1 id="contact-title">
            Bahas kebutuhan Anda.
            <br />
            <span>Mulai dengan satu hal.</span>
          </h1>
          <p class="hero-description">
            {offer
              ? `Anda tertarik pada ${offer.name}.`
              : "Cari tahu rencana kit yang paling relevan untuk usaha barber Anda."}{" "}
            Harga dasar Starter Rp39.000, Growth Rp79.000, System Rp149.000, sekali bayar IDR. Ketentuan dan kesiapan pilot dikonfirmasi terlebih dahulu; penjualan online belum dibuka. <a href="/legal">Baca Legal &amp; Policies</a>.
          </p>
          {offer?.id === "system" && (
            <p class="contact-scope-note">
                System adalah paket dokumen lengkap Growth plus pemetaan kerja, bukan software; aplikasi, dashboard, booking, database, loyalty, dan otomasi belum tersedia. Tidak ada akses demo atau pembangunan otomatis.
            </p>
          )}
          <div class="contact-grid">
            <section
              class={`contact-status ${ready ? "ready" : ""}`}
              aria-labelledby="contact-status-title"
            >
              <span class="status-label">
                {ready ? "Jalur WhatsApp tersedia" : "Kontak belum aktif"}
              </span>
              <h2 id="contact-status-title">
                {ready
                  ? "Lanjutkan di WhatsApp."
                  : "Kami belum membuka jalur inquiry."}
              </h2>
              <p>
                {ready
                  ? "Tombol berikut membuka WhatsApp dengan rancangan pesan. Periksa isinya dan kirim sendiri. Website ini tidak mengirim atau menyimpan pesan Anda."
                  : "Tujuan kontak resmi belum dikonfigurasi. Saat ini belum ada cara mengirim inquiry melalui website ini. Rancangan pesan di samping belum dikirim atau disimpan."}
              </p>
              {ready ? (
                <Action href={`/inquiry${offer ? `?offer=${offer.id}` : ""}`}>
                  Buka WhatsApp untuk diskusi
                </Action>
              ) : (
                <Action href="/barber#rencana-kit" secondary>
                  Lihat kembali rencana kit
                </Action>
              )}
              <p class="small">
                {ready
                  ? "Anda akan meninggalkan website Ranel. Penggunaan WhatsApp mengikuti kebijakan layanan tersebut."
                  : "Jalur inquiry akan tersedia setelah kontak resmi diaktifkan oleh pengelola."}
              </p>
              <a class="text-link" href="/privacy">
                Baca informasi privasi <Arrow />
              </a>
            </section>
            <section class="message-preview" aria-labelledby="message-title">
              <p class="eyebrow">Rancangan pesan / Tidak terkirim</p>
              <h2 id="message-title">Mulai dengan pertanyaan sederhana.</h2>
              <label for="inquiry-message">
                Pesan awal yang bisa Anda salin
              </label>
              <textarea id="inquiry-message" readonly rows={6}>
                {inquiryMessage(offer?.id)}
              </textarea>
              <p class="small">
                Tidak perlu menyertakan data pelanggan, informasi sensitif, atau
                dokumen usaha pada pesan pertama.
              </p>
              <h3>Pilih topik lain</h3>
              <nav class="topic-links" aria-label="Topik diskusi">
                {offers.map((item) => (
                  <a
                    key={item.id}
                    href={`/contact?offer=${item.id}`}
                    aria-current={offer?.id === item.id ? "page" : undefined}
                  >
                    {item.name}
                    <Arrow />
                  </a>
                ))}
                <a href="/contact" aria-current={!offer ? "page" : undefined}>
                  Kebutuhan barber secara umum
                  <Arrow />
                </a>
              </nav>
            </section>
          </div>
        </section>
      </Layout>
    ),
  );
});

app.get("/inquiry", (c) => {
  const offer = selectedOffer(c.req.query("offer"));
  const destination = whatsappDestination(
    c.env?.INQUIRY_WHATSAPP_NUMBER,
    offer?.id,
  );
  return c.redirect(
    destination ?? `/contact${offer ? `?offer=${offer.id}` : ""}`,
    303,
  );
});

app.get("/privacy", (c) =>
  c.html(
    "<!DOCTYPE html>" +
    (
      <Layout
        title="Informasi privasi — Ranel"
        description="Cara website fase awal Ranel menangani informasi: tanpa form penyimpanan inquiry, akun, atau analytics tambahan; diskusi melalui WhatsApp bila tersedia."
        path="/privacy"
      >
        <article class="section prose">
          <p class="eyebrow">Informasi website / Privasi</p>
          <p><a href="/legal/privacy">Kebijakan privasi &amp; data pribadi lengkap</a></p>
          <h1>Privasi, dengan jelas.</h1>
          <p class="lead">
            Website ini membantu Anda memahami rencana penawaran Ranel. Tidak
            ada akun, database inquiry, pembayaran, atau pelacakan analytics
            tambahan di aplikasi ini.
          </p>
          <h2>Pesan dan inquiry</h2>
          <p>
            Rancangan pesan pada halaman kontak tidak dikirim atau disimpan oleh
            website. Jika jalur WhatsApp tersedia, tautan akan membuka layanan
            WhatsApp. Pesan baru dikirim jika Anda mengirimnya di sana;
            pemrosesan oleh WhatsApp mengikuti kebijakan layanan tersebut.
          </p>
          <h2>Data yang perlu dibagikan</h2>
          <p>
            Untuk percakapan awal, cukup jelaskan jenis usaha dan kebutuhan yang
            ingin dibahas. Jangan kirim data pelanggan, informasi pembayaran,
            identitas sensitif, atau dokumen rahasia. Website tidak meminta
            persetujuan pemasaran dan tidak berlangganan pesan otomatis.
          </p>
          <h2>Infrastruktur website</h2>
          <p>
            Website dirancang untuk Cloudflare Pages. Infrastruktur hosting
            dapat memproses informasi teknis seperti alamat IP dan permintaan
            halaman untuk penyajian serta keamanan. Aplikasi tidak menambahkan
            cookie, penyimpanan lokal, atau skrip analytics pihak ketiga.
          </p>
          <h2>Percakapan di luar website</h2>
          <p>
            Pengelolaan pesan setelah dikirim melalui WhatsApp dilakukan secara
            manual oleh pengelola. Kebijakan operasional retensi dan penghapusan
            pesan belum ditetapkan di website ini. Konfirmasikan penanganan
            informasi kepada pengelola sebelum membagikan data lebih lanjut.
          </p>
          <h2>Pertanyaan tentang informasi Anda</h2>
          <p>
            Gunakan jalur kontak resmi bila sudah tersedia. Selama belum
            dikonfigurasi, website akan menampilkan status kontak belum aktif
            dan tidak menyediakan form pengiriman.
          </p>
          <Action href="/contact" secondary>
            Lihat status kontak resmi
          </Action>
          <p class="small">
            Diperbarui 3 Oktober 2026. Informasi ini bukan
            klaim sertifikasi atau kepatuhan hukum.
          </p>
        </article>
      </Layout>
    ),
  ),
);

for (const path of legalPaths) {
  app.get(path, (c) => {
    const slug = path.split("/")[2];
    const page = legalPages.find(p => p.slug === slug);
    return c.html("<!DOCTYPE html>" + <Layout title={`${page?.title ?? "Legal & Policies"} — Ranel`} description={page?.description ?? "Legal & Policies Ranel: identitas operator, harga, ketentuan, privasi, lisensi dan dukungan untuk paket barber pilot yang belum membuka pembayaran."} path={path}><LegalContent slug={slug} /></Layout>);
  });
}

// Register the fallback as a route so the Pages adapter preserves it with current Hono.
app.all("*", (c) =>
  c.html(
    "<!DOCTYPE html>" +
    (
      <Layout
        title="Halaman tidak ditemukan — Ranel"
        description="Halaman yang Anda cari tidak ditemukan. Kembali ke beranda Ranel atau lihat rencana kit untuk barber."
        path=""
      >
        <section class="section error-section">
          <p class="eyebrow">404 / Halaman tidak ditemukan</p>
          <h1>
            Mari kembali
            <br />
            ke yang penting.
          </h1>
          <p>Halaman yang Anda cari tidak tersedia.</p>
          <Action href="/">Kembali ke beranda</Action>
        </section>
      </Layout>
    ),
    404,
  ),
);

app.onError((_err, c) =>
  c.html(
    "<!DOCTYPE html>" +
    (
      <Layout
        title="Halaman belum dapat dimuat — Ranel"
        description="Halaman belum dapat dimuat. Silakan coba lagi."
        path=""
      >
        <section class="section error-section">
          <h1>Halaman belum dapat dimuat.</h1>
          <p>Silakan coba lagi. Tidak ada inquiry yang dikirim oleh website.</p>
          <Action href="/">Kembali ke beranda</Action>
        </section>
      </Layout>
    ),
    500,
  ),
);

export default app;

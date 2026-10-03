# Ranel — SYSTEM BASELINE

## 1. Identitas dan batas audit

- Artefak: Phase 00 — System Reset & Baseline Audit, roadmap **Production Commerce System — Real Transaction Ready** dari founder.
- Tanggal observasi: 2026-10-03; metadata production diperiksa sekitar `2026-10-03T04:15:14Z`.
- Canonical repo: `Sparkmind-obp-off/Ranel`, branch `main`.
- Checkpoint kode yang diaudit: `fbaddc4fc1b7fcd144fc81d3f7ae6ca90f124d17`. Fetch memastikan checkpoint sama dengan remote; working tree bersih sebelum audit. Commit artefak baseline akan menjadi perubahan dokumentasi di atas checkpoint ini, bukan deployment aplikasi.
- **Gate Phase 00: PASS untuk baseline terarah. Commerce/live-transaction readiness: belum PASS.** Batas akses yang tidak tersedia dicatat eksplisit, bukan diklaim sudah diverifikasi.
- Hanya audit, verifikasi existing, dan dokumentasi. Tidak ada reset Git, rewrite, perubahan kode/config, deployment, resource baru, migrasi, pemasangan secret, perubahan harga, invoice/payment/refund/payout, atau DNS/domain/billing.

Status digunakan sesuai scope:

| Status | Arti |
|---|---|
| READY | Komponen yang disebut sudah dapat digunakan dalam batas fungsi yang dibuktikan, bukan seluruh commerce siap production |
| PARTIAL | Ada implementasi/evidence tetapi fungsi atau dependency belum lengkap |
| BLOCKED | Gate lanjutan tidak dapat dilalui dengan dependency/akses saat ini |
| NOT IMPLEMENTED | Tidak ada implementasi executable/persistence/deployment yang memenuhi fungsi tersebut |
| NOT VERIFIED | Klaim/konfigurasi luar belum didukung observasi yang memadai |

## 2. Current architecture

**PUBLIC → CONTROL → CORE**, AI cross-cutting, bukan layer keempat. Model bisnis **KITS → SYSTEMS → SUPPLY** tetap dipertahankan.

- **PUBLIC:** Hono + TypeScript SSR pada Cloudflare Pages `ranel`; katalog barber dan inquiry WhatsApp manual. Tidak menyimpan inquiry/customer/order atau melakukan pembayaran.
- **CONTROL:** belum ada UI private, auth operator atau manajemen transaksi.
- **CORE:** kode Worker dan adapter POP ada, tetapi belum ada Worker Ranel yang terdeployed, database Ranel, order service, state pembayaran durable, atau audit ledger.
- Dependensi runtime: Hono. Tooling build/QA: Vite, Wrangler, TypeScript, ESLint, Playwright/Axe. Tidak menambahkan dependensi saat baseline.

Revenue cycle strategis yang sudah ada tetap disimpan: Demand → Opportunity → Product → Distribution → Transaction → Fulfillment → Outcome → Learning. Roadmap baru memperinci bagian Transaction menjadi Order → Payment → Confirmation. Ini detail operasional/dependency, bukan alasan mengubah tiga layer atau menghapus sejarah keputusan.

**Penomoran phase:** Phase 00–14 pada roadmap commerce baru berbeda dari release historis “Phase 1/1B/Phase 2 katalog pilot”. PASS pada Phase 2 katalog lama tidak berarti BUSINESS LOCK atau PRODUCT READY pada roadmap baru sudah PASS.

## 3. Production yang benar-benar ada

| Item | Observasi terbaru |
|---|---|
| PUBLIC origin | `https://ranel.pages.dev` |
| Pages project | `ranel`, production |
| Deployment ID | `a071fcab-4df7-466d-be7e-68d56274f780` |
| Immutable URL | `https://a071fcab.ranel.pages.dev` |
| Deployed application SHA | `c90c1994839e1bee4fa676ed25ea848da66731ad` |
| Provider stage | `deploy`, `success`, selesai `2026-10-02T10:25:40.005195Z` |
| Production env names | Hanya `INQUIRY_WHATSAPP_NUMBER`; nilai tidak dibaca/ditampilkan |
| Preview env names | Kosong |
| Pages D1/R2 binding names | Kosong pada production/preview |
| Domain metadata | `ranel.pages.dev` dan `ranel.biz.id`; ini bukan audit DNS/TLS custom-domain |
| Ranel Workers | `/workers/scripts`: HTTP 200, tidak ada Worker bernama Ranel |
| Ranel D1 | `/d1/database`: HTTP 200, tidak ada database bernama Ranel |
| Workers usage model | `/workers/account-settings`: HTTP 200, `standard`; bukan bukti plan/harga/quota |
| Plan/billing | `/subscriptions`: HTTP 403; NOT VERIFIED dengan akses saat ini |

Lookup resource bernama Ranel dan binding konfigurasi tidak membuktikan seluruh resource eksternal/Hyperdrive/Neon telah diaudit. Tidak ada external-database/Hyperdrive binding di dua konfigurasi aplikasi yang diperiksa. Resource milik project lain tidak dibuka atau diubah; tidak dianggap database yang boleh dipakai Ranel.

PUBLIC live smoke (GET read-only): `/`, `/barber`, `/contact`, `/privacy`, `/static/style.css`, `/static/brand-mark.svg` semuanya 200. Halaman mendapat `no-store`, halaman/aset mendapat `nosniff`. GET `/api/v1/orders` dan `/api/v1/payments` pada PUBLIC mengembalikan 404. Tidak ada checkout live atau Core URL yang dapat dinyatakan terdeployed.

## 4. Inventory komponen dan status

| Komponen | Status | Evidence dan batas |
|---|---|---|
| Repository/canonical main | READY | Fetch, history, remote dan clean working tree diverifikasi; history tidak di-rewrite |
| PUBLIC brand/catalog/privacy/inquiry | READY | Source routes dan live smoke; readiness hanya marketing/manual inquiry |
| Business definition | PARTIAL | Target/problem/kategori pilot ada; sales/delivery/support/terms belum terkunci sebagai offer siap dijual |
| Product catalog | PARTIAL | Starter/Growth pilot manual; System konsep. Belum satu SKU lengkap siap checkout/delivery |
| Approved price/currency/payable rules | NOT IMPLEMENTED | Pricing document menyatakan prices not set; tidak ada angka founder-approved untuk transaksi |
| Commerce entity model | PARTIAL | Tipe domain lokal ada; bukan canonical Product/Order/Attempt/Payment/Fulfillment model lengkap |
| Core application source | PARTIAL | `src/core.ts` ada; tidak ada deployment/store/auth/commerce service |
| Production Core infrastructure | NOT IMPLEMENTED | Worker Ranel tidak ditemukan; config `ranel-core` hanya usulan |
| Production database/migrations | NOT IMPLEMENTED | Tidak ada Ranel D1/binding/migration tracked; `data-model.md` konseptual |
| POP invoice adapter | PARTIAL | Client production/signing/validation/timeout ada dan fixture tests lulus; tidak diaktifkan/dihubungkan ke order durable |
| POP browser bridge | PARTIAL | Source loader/checkout.process ada; tidak dimuat pada PUBLIC |
| Merchant API contract / enabled methods | NOT VERIFIED | Dokumen publik/profile bukan merchant evidence; API-family/version/signing support belum dibuktikan |
| Duitku production credential validity | NOT VERIFIED | Tidak melakukan autentikasi/provider request pada baseline; file shape/secret name bukan bukti validity |
| Callback authentication | PARTIAL | HMAC profile diverifikasi dengan fixture; tidak ada verified live callback atau authoritative processing |
| Durable callback receipt/idempotency | NOT IMPLEMENTED | Store interface saja; callback autentik tidak diakui selesai |
| Status inquiry/reconciliation | NOT IMPLEMENTED | Belum client/status contract merchant terverifikasi atau investigation workflow durable |
| Order creation/customer status | NOT IMPLEMENTED | Tidak ada stored order/attempt atau status lookup customer terotorisasi |
| Fulfillment | PARTIAL | Usulan/manual pilot delivery tercatat; belum deliverable siap jual, entitlement, tracking atau paid-to-delivery executor |
| Authentication/authorization | NOT IMPLEMENTED | Dokumen policy ada; bukan session/actor/record auth executable. 404 private route bukan auth control |
| Financial audit/ledger/refund operations | NOT IMPLEMENTED | Audit transition hanya pure plan; tidak ada record finansial/payout/refund service |
| Security controls PUBLIC | READY | Bounded methods/URLs/topics dan headers pada existing public scope; bukan global security review |
| Commerce security/recovery | PARTIAL | Fail-closed/no browser paid/no blind retry ada; belum rate limiting, durable audit, payment backup/recovery/ops |
| Production payment readiness | BLOCKED | Business/product/price, durable Core, merchant verification dan release/security gates belum PASS |

## 5. Engineering existing yang dipertahankan

File dan fungsi yang tidak di-rewrite dalam reset baseline:

- `src/index.tsx`, `src/inquiry.ts`, `public/static/*`, `public/_headers`: existing PUBLIC, kontak/draft/topik legacy, brand/metadata/accessibility dan privacy.
- `src/duitku-pop.ts`: production-only invoice client, request HMAC, callback HMAC, payload bounds, safe errors, abort timeout, no retry, merchant/reference/checkout-host checks.
- `src/pop-checkout.ts`: production script loader dan event bridge; success/pending/error/close hanya meminta server-status refresh, tidak menulis paid.
- `src/payment-domain.ts`: pure correlation dan pending → paid/failed planner, manual-pending fulfillment, audit plan dan durable-store port.
- `src/core.ts`: minimal liveness, readiness 503, initiation 503, gated callback authentication, browser return unverified, tidak ada public order lookup.
- `tests/app.test.mjs`, `tests/core.test.mjs`, `tests/pop.test.mjs`, `tests/browser/public.spec.ts`: regression/security fixtures dipertahankan, bukan diganti agar milestone tampak lulus.

Repo Core config tetap `DUITKU_ENV=production`, `DUITKU_API_FAMILY=pop`, profile `pop-docs-hmac-sha256-2026-10-03`, `DUITKU_CONTRACT_VERIFIED=false`, `PAYMENTS_ENABLED=false`. Ini konfigurasi repo, **bukan konfigurasi Worker produksi yang sudah dibuat**. Mengubah flag saja tidak menyediakan commerce/persistence.

Kontrak invoice menerima struktur yang disebut persisted server-order snapshot, tetapi belum ada service yang benar-benar membuat snapshot itu. Tipe TypeScript bukan persistence/authorization proof.

## 6. Technical debt dan gap yang harus terlihat

1. **Product sebelum payment:** pilot catalog tidak boleh diam-diam berubah menjadi barang fixed-price/ready-download. SKU, price, payable rules, terms, ownership/access, deliverable, support owner dan timing belum final.
2. **Canonical model belum lengkap:** domain saat ini hanya pending/paid/failed dan fulfillment minimal. Attempt state, UNKNOWN/PROCESSING, expiry/cancellation/refund, immutable order_items snapshot dan full event contracts belum executable. Implementasi kelak harus mencatat timeout sebagai uncertain, bukan otomatis failed.
3. **Kontrak domain vs adapter belum tersambung:** `PaymentAdapter.verifyCallback` mengharapkan authoritative event; `DuitkuPop.authenticateCallback` sengaja menghasilkan notification-only. Jangan cast notification menjadi verified event agar cocok tipe.
4. **Tidak ada durable receipts/atomicity:** authentic callback masih 503; pure replay rejection bukan deduplication production. Tidak ada unique constraints, transaction audit atau fulfillment exactly-once safeguard.
5. **Kontrak provider belum selesai:** POP vs classic V2 bukan interchangeable. Current POP documentation/profile dan SDK lama berbeda signing; merchant support/contract version/status-method harus dibuktikan. Tidak ada claim "POP JS v2" terverifikasi.
6. **Unsigned status/reference:** profile callback yang diimplementasikan tidak menandatangani resultCode/reference dan tidak membawa timestamp/currency authoritative. Tidak dapat menyimpulkan paid atau freshness dari notification saja. Perlu corroboration, stored-order correlation dan atomic receipt.
7. **Auth belum ada:** future customer lookup/control/admin harus mempunyai actor/session/capability/record scope. Jangan menyediakan order lookup guessable atau tombol admin paid tanpa authorization/audit.
8. **Production operational controls belum ada:** database schema/migrations, backup/recovery, transaction monitoring, reconciliation/incident/refund SOP executable dan live Core health tidak tersedia.
9. **Dokumentasi historis bisa disalahbaca:** laporan PASS katalog/test/build adalah scoped evidence, bukan commerce-ready. Komentar lama pada domain yang menyebut belum ada adapter bersifat historis/stale; adapter source kini ada, persistence tetap tidak ada. Catat debt, tidak rewrite engineering pada audit.
10. **Secret containment:** sebelumnya credential pernah dikirim lewat chat. Rotasi/revocation/aman-tidaknya replacement belum dibuktikan. Baseline tidak membuka upload, membaca nilai provider bindings, memasang atau menguji key tersebut. Produksi secret yang aman adalah dependency Phase 05, bukan sesuatu yang disimpulkan dari keberadaan file.

## 7. Production blockers dan pemilik keputusan

| Blocker | Evidence | Syarat penyelesaian |
|---|---|---|
| BUSINESS LOCK belum PASS | Produk pilot dan SOP belum agreement siap jual; support/refund/cancellation belum final | Founder mengunci jawaban bisnis dan rules Phase 01 |
| PRODUCT READY belum PASS | Catalog/pricing masih discussion/no approved price | Satu produk lengkap beserta price/terms/delivery resmi pada Phase 02 |
| Commerce truth belum canonical/durable | Tipe/interface saja, tanpa migration/service | Phase 03 model, kemudian Phase 04 storage/migration/auth boundaries |
| Core resource-cost readiness tidak diketahui | Subscription read 403 | Scoped read evidence plan/quota atau approval biaya resource terbatas sebelum provisioning |
| Merchant contract/credentials tidak terverifikasi | Tidak ada authorized console evidence/non-financial authentication proof | Konfirmasi profile merchant/status/auth-check dan secure credentials pada Phase 05 |
| Confirmation/reconciliation/fulfillment belum lengkap | Tidak ada paid record/receipt/fulfillment production | Phase 06–12 sesuai dependency dan security gate; jangan enable lebih awal |
| Real lifecycle belum terbukti | Tidak ada authorized real invoice/customer/payment/delivery proof | Pilot Phase 13 setelah dependency PASS dan otorisasi aksi live yang spesifik |

Mengetahui blocker adalah hasil audit, bukan persetujuan untuk melewatinya. Resource billing/merchant gaps tidak menghalangi penyelesaian dokumen baseline, tetapi menghalangi klaim readiness fungsi terkait.

## 8. Master dependency graph dan posisi phase

```text
00 Baseline [PASS]
  → 01 Business Lock [BELUM PASS]
  → 02 Product + Price [BELUM PASS]
  → 03 Commerce Model [PARTIAL]
  → 04 Core + Database [NOT IMPLEMENTED production]
  → 05 Provider Contract + Credentials [PARTIAL engineering; NOT VERIFIED production]
  → 06 Checkout [NOT IMPLEMENTED active flow]
  → 07 Reconciliation + Transaction Safety [NOT IMPLEMENTED durable]
  → 08 Fulfillment [PARTIAL manual concept]
  → 09 Customer Commerce UX [PENDING]
  → 10 Admin + Operations [PENDING]
  → 11 Financial Reconciliation [PENDING]
  → 12 Security Hardening [PENDING commerce security gate]
  → 13 Real Production Pilot [PENDING; bukan izin transaksi dari dokumen ini]
  → 14 Production Release [PENDING]
  → Live Commerce [NOT VERIFIED]
```

Keberadaan engineering Phase 05 lebih awal adalah aset yang dipertahankan, bukan alasan melompati Phase 01–04. Satu roadmap utuh; tidak membuat Phase 2A/2B/2C. Business approval tidak boleh diciptakan agent. Kontrol keselamatan tetap diperlukan selama semua phase, meski review formal ada di Phase 12.

## 9. Apa yang boleh dan tidak boleh disentuh

**Dipertahankan:** canonical repo/main/history; existing PUBLIC dan kontak; runtime secret inquiry; project `ranel`; tiga-layer architecture; adapter/signing/fixture tests; pemisahan PUBLIC/Core; production-only provider target; no-browser-paid rule; fail-closed defaults.

**Tidak dilakukan tanpa scope/gate:** rewrite framework/adapter, reuse database project lain, DNS `ranel.biz.id`, billing/plan/account switch, secret replacement/provisioning, public checkout activation, harga/refund/delivery promise rekaan, database schema destructive, manual paid/fulfillment bypass, live transaction.

**Boleh diperbaiki kemudian berdasarkan evidence:** bukan larangan absolut mengubah kode. Perbaikan bug, canonical model dan wiring dapat dilakukan pada phase yang tepat dengan regression/security checks; jangan rewrite hanya karena penomoran roadmap berubah.

## 10. Bukti tes: fresh vs historical

Dijalankan pada baseline ini:

| Pemeriksaan | Hasil | Arti |
|---|---|---|
| `npm run lint` | PASS | Source/tests/config lint |
| `npm run typecheck` | PASS | Current source typecheck |
| `npm run test:core` | 61 PASS, 0 fail | Current source dikompilasi lokal; domain/POP/Core fixtures, bukan provider production |
| `node --test tests/app.test.mjs` | 33 PASS, 0 fail | Existing PUBLIC built artifact; tidak rebuild atau redeploy PUBLIC untuk docs-only audit |
| Live PUBLIC GET smoke | 6 routes/assets 200; 2 commerce API paths 404 | Deployed PUBLIC masih tersedia, bukan purchase lifecycle |
| Provider resource reads | 4 successful targeted reads; subscriptions 403 | Live resource/binding/deployment metadata, bukan provider-console security/billing audit |

Historical evidence pada checkpoint adapter: PUBLIC build 53 modules/67.37 kB; Core dry-run 69.13 KiB/17.99 KiB gzip; 30 local + 30 production browser tests PASS. **Build/dry-run/browser suite tidak diulang pada Phase 00**; hasil itu tetap historis, bukan fresh pilot/payment evidence. Tidak perlu deployment atau full browser rerun untuk penambahan dokumen saja.

Bukti rujukan:

- [Current provider-contract/execution evidence](docs/technology/duitku-production-integration-contract.md#12-pop-production-adapter-execution--2026-10-03).
- [Existing product catalog](docs/products/product-catalog.md), [pricing](docs/business/pricing-and-unit-economics.md).
- [Conceptual data model](docs/technology/data-model.md), [auth policy](docs/technology/auth-and-access-control.md).
- [Adapter checkpoint commit](https://github.com/Sparkmind-obp-off/Ranel/commit/fbaddc4fc1b7fcd144fc81d3f7ae6ca90f124d17).

## 11. Phase 00 acceptance dan handoff

- [x] Current architecture/code/history dan deployed PUBLIC dibedakan.
- [x] Komponen existing, missing components dan debt diberi status/evidence.
- [x] Akses yang tidak tersedia, production blockers dan dependency graph eksplisit.
- [x] Engineering POP dipertahankan; tidak ada reset/rewrite/activation.
- [x] Apa yang harus dijaga dan batas perubahan dicatat.
- [x] Fresh tests dipisahkan dari historical/provider/live-commerce evidence.

**PHASE 00 = PASS (bounded baseline).** Gate berikutnya: **Phase 01 — Business Lock**, bukan melanjutkan payment. Phase 01 belum diselesaikan/dikunci oleh audit ini. Minimal keputusan founder berikutnya adalah satu offer nyata dengan target/problem, format/isi/delivery, sales/support owner dan rules; kemudian Phase 02 mengunci product/price/terms. Tidak ada live transaction authorization yang diberikan oleh baseline atau roadmap umum.

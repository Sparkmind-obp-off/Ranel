# Ranel — Phase 01 Business Lock

**Status: PASS WITH DECISIONS REQUIRED**

**BUSINESS_LOCK_APPROVED = false**

**VALIDATION_STATUS = NOT YET VALIDATED / NOT_VALIDATED**

**PRICE_STATUS = PHASE_02_DECISION**

Tanggal: 2026-10-03. Canonical repo: `Sparkmind-obp-off/Ranel`, `main`. Checkpoint inspeksi: `69541ce0a9458959bf0a4caa4b1f7cd1f1718144`.

## 1. Purpose

Dokumen ini adalah artefak canonical Phase 01 untuk menjawab siapa pembeli pertama, masalahnya, apa yang dibeli, bagaimana diterima, dan aturan komersial setelah pembayaran. Ini business definition, **bukan pengaktifan penjualan, kontrak pelanggan, kebijakan legal final, atau implementasi commerce**.

[Phase 00 baseline](../../SYSTEM_BASELINE.md) tetap **PASS — bounded baseline** dan tidak ditafsirkan ulang. PUBLIC masih katalog/inquiry; Core/DB/order durable/checkout/fulfillment belum production-ready. Engineering POP dipertahankan. Tidak ada perubahan kode, secret, konfigurasi payment atau production.

### Authority dan arti status

- `LOCKED`: keputusan eksplisit yang sudah ada dalam canonical foundation atau instruksi founder; cakupannya harus disebut.
- `DECISION_REQUIRED`: founder belum menyetujui keputusan komersial tersebut. Rekomendasi tidak menjadi keputusan melalui commit dokumen.
- `CANDIDATE / PROPOSED`: bentuk yang didukung arah repo, untuk dipilih/disetujui; bukan offer siap dijual.
- `EXISTING IMPLEMENTATION`: fungsi website saat ini, bukan jaminan layanan setelah purchase.
- `PHASE_02_DECISION`: angka harga/SKU/payable rules/terms final diputuskan pada Phase 02, setelah keputusan bisnis terkait disetujui.

**PASS WITH DECISIONS REQUIRED berarti penyusunan/pemetaan Phase 01 selesai; bukan seluruh commercial truth sudah LOCKED atau izin otomatis masuk Phase 02.** Riwayat “Phase 2 katalog pilot” berbeda dari Phase 02 commerce roadmap baru.

### Evidence register

| Ref | Sumber | Apa yang didukung / tidak didukung |
|---|---|---|
| E01 | [Master Blueprint](../foundation/ranel-master-blueprint.md), §§2–4 | Identitas, batas brand, model KITS → SYSTEMS → SUPPLY; bukan harga/terms first sale |
| E02 | [Business Architecture Lock](../foundation/ranel-business-architecture.md), §§1–3 | Narrow operating problem, barber sebagai vertical pertama, learning sebelum automation |
| E03 | [Business model](business-model.md) | Model LOCKED, tetapi daftar revenue termasuk one-time/setup/recurring adalah potensi, bukan pilihan final first offer |
| E04 | [Product catalog](../products/product-catalog.md), current catalog/pilot boundary | Starter/Growth adalah pilot definitions, System konsep; format/cakupan usulan; no approved price |
| E05 | [Pricing](pricing-and-unit-economics.md) | Prices not set; formats to test; tidak ada angka, discount, tax/fee policy final |
| E06 | [Barber vertical](../verticals/barber/vertical-plan.md) dan [discovery](customer-discovery.md) | Independent shops/small teams/walk-in/informal records adalah hipotesis; bukan hasil interview/payment evidence |
| E07 | [Paid pilot SOP](../verticals/barber/pilot-sop.md) | Sebelum menerima pekerjaan harus menyepakati scope, buyer, price, waktu, support; permission dan no revenue promise |
| E08 | [Operating model](../operations/operating-model.md) | Founder-led, offer-specific boundaries, payment/scope confirmation sebelum delivery; bukan owner assignment/SLA/refund window final |
| E09 | [Public offer source](../../src/inquiry.ts), [contact source](../../src/index.tsx) | PDF/editable pilot language dan WhatsApp manual; bukan fulfillment/payment backend atau support SLA |
| E10 | [Data model](../technology/data-model.md), [auth](../technology/auth-and-access-control.md) | Konsep/policy, bukan DB/account/order/entitlement yang sudah tersedia |
| E11 | [Legal/brand checklist](../governance/legal-and-brand-clearance.md) | Founder-reported checks, external verification pending; tidak membuktikan legal clearance |

Tidak membaca credential uploads atau nilai runtime secrets. Tidak melakukan audit provider/Cloudflare tambahan pada phase bisnis ini. Tidak ada transaksi/interview baru yang diklaim sebagai evidence.

## 2. Business identity

**LOCKED, scope strategis (E01–E03):** Ranel adalah digital revenue engine untuk sistem kerja praktis dan commerce bagi operator bisnis lokal. Value proposition: membantu operator menata rutinitas agar lebih jelas, konsisten dan dapat ditinjau melalui aset yang spesifik dan dapat digunakan, bukan menjual teknologi demi teknologi.

Ranel bukan generic AI agency, enterprise ERP, generic template marketplace, atau merek software khusus barber selamanya. PUBLIC → CONTROL → CORE tetap arsitektur teknis; AI cross-cutting, bukan sumber financial truth.

- Model utama **LOCKED:** Kits → Systems → Supply. Kits sebagai entry/learning layer; Systems dan Supply memerlukan bukti/workflow/sourcing tersendiri.
- Vertical pertama **LOCKED:** barber. Bukan rollout café/laundry/salon bersamaan.
- Kombinasi bisnis jangka panjang: digital assets, manual services dan sistem/supply setelah evidence; ini arah, bukan semuanya tersedia.
- **First transaction:** kandidat Kit dengan penyiapan manual terbatas. Pemilihan Starter vs alternatif serta self-serve vs scoped pilot masih `DECISION_REQUIRED` (D02).
- **Initial market:** PUBLIC saat ini berbahasa Indonesia. Geografi penjualan, pembeli domestik/cross-border dan cakupan layanan belum dikunci (`DECISION_REQUIRED`, D01). Domain .id atau bahasa UI bukan bukti market approval. Fokus operator barber lokal berbahasa Indonesia adalah rekomendasi kandidat, bukan wilayah kota/negara yang diam-diam ditetapkan.

## 3. Target customer

**Vertical barber LOCKED; microsegment first buyer DECISION_REQUIRED (D01).** Kandidat segment berdasarkan E04/E06:

| Dimensi | Kandidat untuk disetujui; bukan fakta pasar |
|---|---|
| Customer type / buyer | Pemilik/operator barber mandiri atau pengelola tim kecil yang dapat memutuskan pembelian alat kerja |
| Operating profile | Barber yang melayani pelanggan, termasuk walk-in, dan membutuhkan rutinitas kerja sederhana; bukan procurement enterprise/franchise |
| Business maturity | Sudah menjalankan atau sedang menyiapkan rutinitas layanan; pilih salah satu prioritas pada D01, jangan mencampur kebutuhan tanpa discovery |
| Likely need | SOP/menu layanan/checklist harian belum jelas atau belum mudah digunakan bersama tim |
| Purchasing context | Diskusi kebutuhan dengan decision-maker dan kesepakatan cakupan; bukan self-serve software subscription saat ini |
| Primary use case | Memakai satu checklist buka/tutup dan informasi layanan yang konsisten pada kegiatan harian |
| Buying trigger | Operator mengalami rutinitas yang terlewat/berbeda antar orang atau ingin mendokumentasikan proses; perlu dibuktikan dari kejadian nyata |

Belum ada bukti yang menetapkan ukuran tim, volume customer, lokasi, budget, atau willingness to pay. Tidak membuat angka baru. Customer di sini adalah pembeli kit/operator barber, bukan pelanggan potong rambut yang datanya menjadi milik Ranel.

## 4. Customer problem

**Problem hypothesis untuk kandidat Starter (E04/E06), `ASSUMPTION`; VALIDATION_STATUS = NOT YET VALIDATED.**

- Current situation: alur layanan, menu/harga usaha dan rutinitas buka/tutup mungkin belum terdokumentasi.
- Operational pain: operator harus menjelaskan ulang atau mengingat langkah; tim mungkin menjalankan cara berbeda.
- Consequence hypothesis: ketidakjelasan rutinitas dan review, pekerjaan terlewat atau waktu koordinasi tambahan. Tidak ada measured loss/revenue impact yang diklaim.
- Current alternatives: mengandalkan ingatan/instruksi lisan, catatan lepas atau template umum adalah **hipotesis untuk ditanyakan**, bukan data observasi customer yang sudah terkumpul.
- Why paid could make sense: materi spesifik yang dapat diedit dan digunakan lebih mudah daripada menyusun sendiri. Nilai/willingness to pay dan delivery economics harus dibuktikan, bukan diasumsikan dari UI katalog.

E06 menyediakan pertanyaan discovery dan working threshold; tidak ada evidence memenuhi threshold itu dalam sumber yang diperiksa. Tidak mengklaim profitable/proven demand/customer-validated.

## 5. Initial offer

**Tidak ada first-sale offer yang dinyatakan final.** Kandidat existing dipetakan, tidak diubah menjadi approval:

| Kandidat | Isi / hubungan | Layak dipertimbangkan untuk first transaction? |
|---|---|---|
| Ranel Barber Starter | Fondasi SOP, menu/daftar harga barber, buka/tutup, follow-up berizin | **Rekomendasi kandidat utama**, cakupan paling kecil menurut E04. Founder harus memilih (D02); belum ready file/fixed price |
| Ranel Barber Growth | Starter + spreadsheet kunjungan/rekap + follow-up/review manual | Alternatif jika kebutuhan records/review dibuktikan. Isi bergantung pada Starter, bukan kewajiban membeli Starter lebih dahulu |
| Ranel Barber System | Pemetaan kebutuhan/prioritas digital; bukan aplikasi aktif | Tidak dapat dijual sebagai SaaS/app access yang sudah tersedia. Menjadikan pemetaan sebagai jasa berbayar perlu approval baru; tidak diasumsikan |
| Legacy/backlog kits | Topik operations/retention/tracking dan backlog lama | Compatibility/history, bukan tambahan produk Available atau automatic first-offer approval |

**Rekomendasi D02:** gunakan **Ranel Barber Starter** sebagai satu candidate first offer: practical digital operating kit dengan bounded manual preparation setelah kesepakatan. Tidak menyebutnya self-serve instant-download atau unlimited implementation. Jika founder memilih Growth/format lain, revisi kandidat dan dependency secara eksplisit sebelum Phase 02; jangan mengubah source/website dalam Phase 01.

## 6. Offer contents

Berikut definisi kandidat Starter yang sudah dijelaskan pada E04/E09. **Scope pilot definition existing; belum approval produk first-sale.**

| Item | Customer would receive setelah offer disetujui dan diproduksi |
|---|---|
| Name / format | Ranel Barber Starter; panduan PDF dan template dokumen editable |
| Components | SOP dasar/penanganan pelanggan; struktur menu layanan dan daftar harga usaha; checklist buka/tutup; panduan pelanggan kembali berbasis izin |
| Use | Operator mengisi/menyesuaikan template terhadap usaha lalu mencoba satu rutinitas |
| Implementation requirement | Penyiapan materi dan input minimal yang disepakati. Tidak ada custom app atau central database |
| Access requirement | Perangkat dan alat yang dapat membuka PDF serta format editable yang kelak dipilih; tidak ada Ranel account/subscription yang dijanjikan |
| Not received | POS/kasir, booking, CRM/loyalty/automation, live analytics, aplikasi/dashboard aktif, third-party integrations, instant hosted entitlement |

**DECISION_REQUIRED (D03/D08):** exact file count/names/formats, extent of tailoring, instructions/onboarding included, acceptance criteria, supported software/access requirements, penggunaan internal/jumlah usaha/redistribusi/resale, IP ownership/licence dan update entitlement. “Editable” tidak otomatis berarti hak menjual ulang atau hak perpetual updates.

**Support included/excluded belum final (D07):** kandidat bantuan memahami/menggunakan file sesuai scope, bukan unlimited consulting/revisions atau software support. Jangan mengiklankan kandidat ini sebagai included benefit sebelum approval. Produk tidak termasuk software/automatic messaging sesuai current pilot boundary; larangan unlimited revisions/support masih keputusan terms yang harus ditetapkan, bukan policy final dari agent.

## 7. Delivery model

**Existing direction (E04/E07/E08):** scope disepakati → input minimal → materi pilot disiapkan manual → operator mencoba satu rutinitas → review penggunaan. Ini model pilot yang terdokumentasi, bukan bukti materi telah dikirim.

**Proposed purchase/delivery flow untuk Starter; D03/D04 approval required:**

```text
Kebutuhan dan scope disepakati
  → order/price/terms disetujui pada phase berikutnya
  → pembayaran dikonfirmasi oleh proses berwenang
  → penyiapan kit / langkah delivery sesuai payment model yang dipilih
  → PDF + editable files diterima melalui channel yang disetujui
  → penerimaan/use issue dicatat dan ditangani
```

Customer menerima **materi sesuai agreement**, bukan akses aplikasi. Jika penyiapan dibayar bertahap, titik mulai kerja dan pelepasan file harus ditetapkan oleh D04; alur di atas tidak menetapkan upfront secara diam-diam.

- Delivery channel (file kiriman/link/email/kanal lain), lead time, acceptance evidence, handling file rusak/link hilang, revision scope dan person accountable: `DECISION_REQUIRED` (D03/D07).
- **After payment:** bukan otomatis fulfilled. Harus ada confirmation, tanggung jawab delivery, bukti penerimaan dan penanganan exception yang disetujui. Tidak ada janji instant download/24-hour delivery.
- Implementation dependency: produksi/version/quality check file pada Phase 02; durable order/payment/fulfillment tracking, akses aman dan delivery executor pada phase commerce/fulfillment berikutnya. Tidak ada kode delivery di phase ini.

## 8. Payment model

Tidak ada model first-offer payment final dari daftar potential revenue E03.

| Dimensi | Sumber/arah dan keputusan |
|---|---|
| One-time vs recurring | One-time kit/pilot adalah rekomendasi kandidat; `DECISION_REQUIRED` D04. Recurring tidak boleh diasumsikan dari Systems/Growth |
| Upfront vs staged | `DECISION_REQUIRED` D04; tentukan kapan penyiapan/delivery dimulai dan apa yang terjadi bila tahap berikutnya tidak dibayar |
| Currency | `DECISION_REQUIRED` D04 untuk model komersial; IDR adalah current adapter constraint, bukan approval currency bisnis. Phase 02 mengunci final currency |
| Harga numerik | **PHASE_02_DECISION / PRICE_DECISION_REQUIRED**; belum ada approved amount |
| Discounts | `DECISION_REQUIRED` D04: apakah ada; angka/eligibility/calculation di Phase 02. Tidak membuat promo |
| Taxes/provider fees | `DECISION_REQUIRED` D04: included/excluded dan disclosure; tidak ada legal tax status/angka fee yang diasumsikan |
| Payment before delivery | E08 menyebut payment/scope confirmed sebelum delivery; detail full/staged/terms harus dikunci D04 |
| Manual pilot payment | `DECISION_REQUIRED` D04. Manual WhatsApp inquiry bukan izin menerima transfer atau membuat invoice; tidak ada rekening/payment method baru dicatat |
| Payment confirmation | `LOCKED` safety principle dari baseline/prompt: verified authorized confirmation sebelum fulfillment; browser return atau AI/callback tanpa verifikasi bukan proof |

Model bisnis tidak mengharuskan menetapkan angka harga pada Phase 01. Tidak ada invoice, nominal test, subscription atau pembayaran aktif. Aturan nominal/order snapshot/payment attempts akan dieksekusi pada Phase 02/03 dan seterusnya setelah gate, bukan di dokumen ini.

## 9. Cancellation

**Policy operational: DECISION_REQUIRED (D05).** Sumber mewajibkan terms disepakati, tetapi tidak menetapkan customer entitlement/window. Dokumen bukan legal advice dan bukan pengganti consumer-law/terms review.

| Tahap | Hal yang harus diputuskan founder; bukan keputusan final |
|---|---|
| Inquiry, sebelum agreement/payment | Apakah customer boleh menarik inquiry, bagaimana request ditutup dan data ditangani |
| Agreement/order belum dibayar | Apakah dapat cancel, expiry proposal/order, dan apakah pekerjaan boleh dimulai |
| Setelah payment, pekerjaan belum dimulai | Eligibility cancel, cara request, kaitan refund, dan cutoff |
| Fulfillment sudah dimulai | Apakah stop/defer/re-scope dimungkinkan, perlakuan pekerjaan yang sudah dilakukan, dan customer consent |
| File sudah diserahkan/diterima | Apakah cancellation masih tersedia; hubungan dengan defect/refund/access licence |
| Ketidakmampuan Ranel memenuhi scope | Cara pemberitahuan, opsi remedy/cancel/refund dan approval |

Tidak menetapkan “no cancellation after payment”, penalty atau automatic full refund tanpa approval. Commercial rules tidak boleh mengurangi hak wajib yang berlaku; applicability/review tetap belum diverifikasi.

## 10. Refund

**Refund policy: DECISION_REQUIRED (D06); tidak ada API/refund executor.**

- Apakah refund ditawarkan, partial/full, payment-method constraints dan approval owner: belum ditetapkan.
- Kasus yang perlu diputuskan: tidak terkirim; file rusak/tidak sesuai agreed scope; duplicate/incorrect payment; Ranel gagal memenuhi agreement; customer berubah pikiran; customer tidak menggunakan atau tidak memperoleh hasil bisnis yang diharapkan. **Ini daftar review cases, bukan automatic eligible/ineligible policy.**
- Window/timing, bukti yang dibutuhkan, response/decision time, deductions/tax/fee treatment dan payment timing: belum disetujui; tidak membuat angka hari.
- Governance yang harus dipenuhi oleh phase transaksi: refund request/approval/execution dibedakan, terkait order/payment, reason/amount/time/actor dicatat, financial history tidak ditimpa dan provider evidence dicek. Ini safety requirements, bukan database/functionality yang sudah dibangun.
- Setelah delivered digital kit: copying/revocation/reuse rights dan service work already completed perlu keputusan D06/D08; tidak menjanjikan mampu menarik kembali file yang sudah diunduh.
- Request channel/escalation mengikuti D07 setelah disetujui. Authority founder atas keputusan bisnis tidak otomatis menetapkan operator/SLA untuk refund.

Tidak ada klaim policy ini legal-reviewed, registered-brand proof, fee refundability atau guaranteed provider refund.

## 11. Support

**Yang tersedia saat ini:** `/contact` dan `/inquiry?offer=starter` membuka WhatsApp manual yang existing (E09/baseline). Ini jalur diskusi, bukan support-delivery acknowledgement atau automated ticket system. Tidak menyalin nomor runtime ke dokumen.

**Recommended candidate support model; DECISION_REQUIRED D07:**

- Gunakan jalur kontak Ranel existing untuk pertanyaan scope/file/use dan escalation, bukan memperkenalkan channel palsu.
- Tetapkan satu support/fulfillment owner yang benar-benar dapat bertugas. E08 mendukung founder-led operating model; **nama/person assignment dan backup belum ditentukan**.
- Pilih jam/response model dan support window yang realistis; belum ada SLA/janji balas sekian jam.
- Tetapkan apakah onboarding, bantuan membuka/mengisi template, koreksi defect dan berapa revisi termasuk. Tentukan layanan tambahan yang membutuhkan agreement terpisah.
- Kandidat exclusions: custom software, business consulting tak terbatas, unsupported integration, administrasi customer-data barber dan hasil revenue/retention terjamin. Exclusions first-sale support harus disetujui bersama scope, bukan dianggap final.
- Escalation: contact → accountable owner → founder/approver untuk scope exception/cancel/refund. Usulan ini membutuhkan assignment dan approval; belum executable support workflow.

## 12. Customer outcome

**Intended outcome, bukan outcome yang sudah terjadi atau guarantee:** customer menerima file lengkap yang dijanjikan, dapat membuka/mengeditnya, lalu memakai checklist dan informasi layanan yang sesuai usahanya.

```text
Kit disepakati dan dibeli ketika sudah ready
  → file yang benar diterima
  → operator memahami dan mencoba satu rutinitas
  → penggunaan/masalah aktual dicatat
  → review dan learning berdasarkan evidence
```

Kandidat success criteria: receipt/usable files, operator mampu menyelesaikan core task, rutinitas dipakai pada kegiatan nyata dan feedback dengan izin. Exact acceptance/use measure harus ditetapkan D03/D08. Jangan menyamakan files delivered dengan guaranteed improvement. Tidak menjamin revenue, profit, customer growth, repeat visit atau willingness to pay ulang.

## 13. Business boundaries

**Existing strategic/pilot boundaries (E01/E04/E07), dipertahankan:**

- Bukan SaaS/POS/booking/database/loyalty/automation aktif pada Starter; tidak menjual app/demo yang belum ada.
- Bukan launch multi-vertical/physical Supply/custom ERP saat ini.
- Tidak menjamin hasil bisnis; tidak mengklaim demand/sales/customer validation tanpa data.
- Tidak mengumpulkan data customer barber secara otomatis atau mengimpor private shop data tanpa izin.
- Tidak menjanjikan engineering commitment dari inquiry System.

**Terms-specific limitations masih DECISION_REQUIRED:** jumlah tailoring/revisi, consulting hours, licence/internal use/resale, third-party compatibility, support duration dan scope changes. File yang dapat diedit bukan mandat bespoke implementation unlimited. Safety principle ini tidak mengarang kuota atau restrictive licence.

## 14. Commercial rules

| Rule | Decision / evidence scope | Status |
|---|---|---|
| Business identity | Practical systems/commerce bagi operator lokal (E01) | LOCKED |
| Primary model | Kits → Systems → Supply (E01–E03); aktivasi tiap layer evidence-gated | LOCKED |
| Initial vertical | Barber (E02) | LOCKED |
| Target customer | Independent barber/small-team owner/operator sebagai candidate first buyer; exact maturity/market D01 | DECISION_REQUIRED |
| Initial offer | Starter direkomendasikan; Growth alternatif; belum keputusan first sale D02 | DECISION_REQUIRED |
| Product format | Candidate PDF + editable kit dengan manual preparation; final packaging D02/D03 | DECISION_REQUIRED |
| Delivery | Manual pilot direction existing; channel/time/acceptance/payment point D03/D04 | DECISION_REQUIRED |
| Payment model | One-time/upfront/staged/currency/manual pilot/tax-fee/discount principle D04 | DECISION_REQUIRED |
| Price | Nominal/SKU/currency/payable calculations setelah business choices | PHASE 02 — PHASE_02_DECISION |
| Payment-confirmation rule | Authorized verified payment sebelum fulfillment; bukan browser/AI assertion | LOCKED — safety rule |
| Cancellation | Pre/post payment, start/delivery cutoff dan exceptions D05 | DECISION_REQUIRED |
| Refund | Whether/eligibility/window/approval/record/access consequences D06/D08 | DECISION_REQUIRED |
| Support | Existing inquiry channel diketahui; included help/owner/window/escalation D07 | DECISION_REQUIRED |
| Fulfillment owner | Founder-led business (E08), tetapi accountable person/capacity D07 belum approved | DECISION_REQUIRED |
| Ownership/access | Internal use, files, transfer/resale, updates/revisions D08 | DECISION_REQUIRED |
| Guaranteed commercial results | Tidak menjanjikan revenue increases/guaranteed outcomes (E04/E07) | LOCKED — boundary |

### Business-level lifecycle (bukan transaction state machine)

```text
Offer kandidat didefinisikan
  → founder menyetujui business choices
  → product/price/terms ready pada Phase 02
  → customer menerima informasi lengkap dan menyepakati order
  → payment required sesuai approved payment model
  → authorized payment confirmation
  → agreed preparation/delivery/fulfillment
  → customer receives / issue resolution
  → observed use/outcome → learning
```

Cancellation/refund adalah branch sesuai policy yang kelak disetujui; uncertain payment tidak dianggap confirmed. Flow ini tidak menciptakan entity, enum, migration atau API. Current customer hanya dapat inquiry, bukan order/payment/delivery flow di atas.

## 15. Decision status

- Strategic identity/model/vertical/safety boundaries: **LOCKED**, scope berdasarkan evidence di tabel.
- Candidate first offer dan seluruh purchase policy yang belum didukung keputusan: **DECISION_REQUIRED**.
- Full BUSINESS LOCK: **belum disetujui**; `BUSINESS_LOCK_APPROVED=false`.
- Dokumen/pemetaan Phase 01: **PASS WITH DECISIONS REQUIRED**, sesuai opsi gate founder. Bukan PASS penuh yang menghapus keputusan terbuka.
- Demand/market/customer outcome: **NOT_VALIDATED**. Hipotesis tidak berubah status hanya karena dokumen di-commit.
- Price: **PHASE_02_DECISION**. IDR dalam kode payment tidak menjadi official commercial approval.

## 16. Open decisions — founder approval record

Tidak ada jawaban atau persetujuan yang diisikan atas nama founder. Semua status berikut `DECISION_REQUIRED`, owner keputusan **founder**, approval/date/evidence **belum ada**:

| ID | Pertanyaan yang harus dijawab | Dependency |
|---|---|---|
| D01 | Siapa first buyer: existing owner/operator vs newly preparing shop, microsegment/market geografis dan problem prioritas? | Offer dan discovery positioning |
| D02 | Pilih Starter atau alternatif; digital kit ready-made vs bounded manual-prepared kit/service; apa tepatnya first transaction? | First-offer scope/Phase 02 product |
| D03 | Apa file/input/tailoring yang wajib, cara delivery, lead time, acceptance, onboarding dan handling gagal delivery? | Deliverable feasibility dan expectation |
| D04 | One-time/recurring, upfront/staged, currency, apakah manual payment pilot diizinkan, apakah taxes/fees included, prinsip discount, kapan kerja/file dilepas? | Payment rules, Phase 02 price/payable rules |
| D05 | Cancellation sebelum/sesudah payment, setelah kerja dimulai dan setelah delivery; Ranel tidak dapat memenuhi scope? | Terms dan customer consent |
| D06 | Apakah dan kapan refund tersedia/tidak tersedia, partial/full, window/timing, approver, deductions dan escalation? | Terms dan financial-operation requirements |
| D07 | Siapa support/fulfillment owner dan backup; channel, window/response expectation, included/excluded help dan escalation? | Capacity dan delivery/support promises |
| D08 | Licence/ownership/internal use/resale, compatibility, revisions/updates/access consequence setelah refund dan intended outcome/acceptance? | Customer rights dan product terms |

Untuk menutup keputusan, catat **pilihan final, batasannya, explicit approval founder, tanggal dan evidence/reference** di dokumen ini melalui task update yang diotorisasi. Approval sebuah grup tidak otomatis menyetujui grup lain. Harga tetap Phase 02; jangan memasukkan nominal acak untuk menutup D04.

## 17. Phase 01 acceptance criteria

Checklist ini memeriksa kelengkapan dokumentasi dan kejujuran keputusan, bukan semua policy telah mendapat approval:

### Business definition
- [x] Business identity dan strategic model/vertical ditautkan ke evidence.
- [x] Target customer dijelaskan konkret sebagai candidate, approval microsegment ditandai.
- [x] Problem/current alternatives/consequences dijelaskan sebagai hipotesis.
- [x] Candidate initial offer, alternatives dan dependencies dibedakan; tidak memilih first sale secara palsu.
- [x] Contents/format/includes/excludes/access/use/support boundaries didokumentasikan.
- [x] Delivery/payment model dan implementation dependencies ditandai.
- [x] Cancellation/refund/support mencakup pertanyaan wajib dan keputusan yang belum approved.
- [x] Outcome dan business boundaries tidak menjanjikan hasil yang tidak dibuktikan.

### Governance
- [x] LOCKED vs candidate vs existing implementation memiliki scope/source.
- [x] Unknowns menggunakan DECISION_REQUIRED dengan approval record kosong.
- [x] Price tidak diciptakan; PHASE_02_DECISION eksplisit.
- [x] No fake validation; legal review tidak diklaim.
- [x] Phase 02 handoff dan hold condition didokumentasikan.
- [ ] Founder menyetujui D01–D08 sehingga full business offer/policies menjadi LOCKED.

### Engineering safety
- [x] Tidak mengubah source, PUBLIC, adapter, tests atau configuration.
- [x] Tidak memasang secret, membuka uploaded credentials, menambah DB/migrations/auth/fulfillment code.
- [x] Tidak mengaktifkan payment/checkout atau menjalankan invoice/payment/refund/payout.
- [x] Tidak mengubah Cloudflare/DNS/billing/plan atau melanjutkan Phase 02.

**PHASE 01 = PASS WITH DECISIONS REQUIRED.** Artefak dapat di-commit sebagai pemetaan bisnis yang jujur; full business approval belum PASS. Menandai checklist dokumentasi tidak menutup item approval yang masih kosong.

## 18. Phase 02 handoff

**Hold:** jangan mulai Phase 02 otomatis. Sebelum Phase 02 first-offer product/pricing lock, founder harus memberi approval D01–D08 atau explicitly narrow/approve keputusan yang relevan bagi satu offer; keputusan material yang masih relevan tidak boleh dibiarkan menjadi default tersembunyi.

Input yang tersedia: strategic business/vertical lock, source-backed Starter/Growth/System definitions, candidate Starter scope, existing manual inquiry, safety rules, pilot/discovery SOP dan decision register. Input yang belum tersedia: approved first commercial offer/fulfillment capacity/payment model/purchase policy.

Setelah business approval ada, Phase 02 menghasilkan minimal satu real ready product: Product ID, SKU, contents/version/file formats, availability/readiness, approved price/currency/payable rules, taxes/fees/discount calculation, delivery/support/customer responsibilities, approved payment/refund/cancellation/licence terms dan bukti deliverability. Jangan memindahkan final price approval ke Phase 01 atau menganggap existing pilot materials sudah ready karena namanya ada di katalog.

Phase 03 dan seterusnya baru menerjemahkan commercial truth ke snapshots/state/persistence/payment/fulfillment. Engineering POP tetap aset yang dipertahankan, bukan izin mengaktifkannya sebelum dependency PASS.

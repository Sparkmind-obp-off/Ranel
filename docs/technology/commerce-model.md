# Ranel — Phase 03 Commerce Model

Tanggal: 2026-10-03 · Versi spesifikasi: 0.1

**SPECIFICATION_COMPLETE / READY_FOR_CHATGPT_REVIEW.** Model logis dan rekomendasi teknis, bukan schema, migrasi, API aktif, order nyata atau izin live commerce. Persetujuan material baru tetap PENDING. Phase 04 tidak dimulai.

Prasyarat sesi: [evidence konsolidasi](../implementation/phase-02-commerce/evidence.md) mencatat gate rilis PUBLIC pages.dev Phase 02 PASS pada source `7b8a1f17ab97e6f5818ba4ff5e995361c3707b7e`. Isu transformasi email pada custom domain dicatat terpisah, tidak disembunyikan sebagai PASS.

## 1. Kontrak bisnis dan batas

Arsitektur **PUBLIC → CONTROL → CORE**; AI cross-cutting, bukan layer keempat. Model bisnis **KITS → SYSTEMS → SUPPLY**; tahap ini hanya kit/dokumen Barber. Siklus strategis tetap **Demand → Opportunity → Product → Distribution → Transaction → Fulfillment → Outcome → Learning**. Tahapan siklus bukan status payment.

Keputusan founder yang dipertahankan:

| Product ID / SKU | Versi | Harga dasar IDR sekali bayar | File bundle |
|---|---|---:|---:|
| ranel.barber.starter / RBS-STARTER-001 | 1.0 | 39000 | 6 |
| ranel.barber.growth / RBS-GROWTH-001 | 1.0 | 79000 | 10 |
| ranel.barber.system / RBS-SYSTEM-001 | 1.0 | 149000 | 15 |

Pasar awal operator barber independen/tim kecil berbahasa Indonesia. Starter default entry; Growth/System alternatif tanpa wajib membeli berurutan. System adalah paket dokumen, bukan SaaS. Harga disetujui, belum tervalidasi pasar. Semua asset `ASSET_READY_FOR_REVIEW`, produk `HOLD_PENDING_TERMS`; tidak diubah oleh spesifikasi.

Manual standard template + bounded tailoring, internal business-use licence, tanpa resale/redistribution, tanpa unlimited consulting/revisions atau guaranteed outcome. Email formal `farasmuhadzib@gmail.com`; WhatsApp 1:1 bila dikonfigurasi. Tidak membuat community/ticket otomatis. Tidak ada real invoice, payment, refund, payout, checkout, secrets, database, auth, analytics atau provider call dalam phase ini.

## 2. Canonical source dan read model

Saat ini canonical keputusan produk: [product definition](../products/phase-02-product-definition.md), [pricing](../business/pricing-and-unit-economics.md), [founder review](../governance/phase-02-founder-review.md), [promo](../business/promotion-policy.md). `products/registry.json` adalah registry asset/metadata yang benar-benar ada; `src/inquiry.ts` mirror PUBLIC yang diuji. Belum ada Core product registry.

**Rekomendasi teknis untuk phase implementasi berikutnya:** satu kontrak versioned ProductRelease yang diturunkan dari keputusan approved + registry/hash QC; Core memvalidasi release, PUBLIC memakai projection read-only dari release yang sama. Jangan menjadikan harga browser atau marketing copy authority. CI harus mendeteksi drift ID/SKU/versi/harga/status/file count. Penolakan drift lebih aman daripada mengubah semua sumber secara diam-diam. Tidak mengimplementasikan generator/projection sekarang.

Pisahkan:
- **Product**: identitas stabil dan masalah/scope.
- **ProductRelease**: versi/SKU, manifest hash, kebutuhan software, asset state, scope dan licence yang disetujui.
- **OfferRevision**: product release yang ditawarkan, harga IDR, channel, terms/policy revisions, promo eligibility, ketersediaan/capacity. Draft/hold/published/retired berbeda dari asset readiness.
- **Channel**: cara memperoleh/menjual, bukan payment method. Kandidat awal `direct_web_manual` (website → diskusi privat). Link.id/marketplace adalah kandidat masa depan, bukan akun/integrasi aktif atau keputusan migrasi.

Channel adapter kelak memetakan external listing/order/fee/payout ke ID internal; identitas eksternal unik dalam namespace channel + account. Seller/merchant of record, terms, refund responsibility, tax/withholding dan biaya harus dikonfirmasi per channel. UTM/referral hanya attribution, tidak bukti order/payment.

## 3. Customer journey dan snapshot

Kini: baca catalog/hold → inquiry manual → diskusi; tidak ada order otomatis. Journey transaksi berikut adalah desain masa depan:

1. Pilih offer yang benar-benar sale-ready; tampilkan release, scope, kebutuhan software, seller, kebijakan, total payable dan delivery/support terms.
2. Catat hanya contact dan input minimum; pisahkan izin korespondensi layanan, marketing dan case-study.
3. Core membentuk quote/order snapshot yang disetujui buyer. Bila tax/terms/capacity belum valid: fail closed, tidak membuat payment request.
4. Initiate payment hanya setelah authorization phase berikutnya, provider contract dan persistence/idempotency tersedia.
5. Verifikasi payment otoritatif → input lengkap → prepare/QC → delivery privat → akses/acceptance/remedy → outcome yang benar-benar dilaporkan → learning anonymized.

Order snapshot immutable mencakup seller legal identity/version, product ID/SKU/release, manifest/file hashes, agreed tailoring/scope, quantity, unit/base price, currency/exponent, promo revision dan calculation basis, tax decision/evidence version, disclosed surcharge bila kelak diizinkan (default tidak ada), final payable, terms/licence/privacy/refund/support revision/hash, channel/attribution, quote expiry dan buyer agreement timestamp/source. Teks/copy yang buyer setujui harus bisa direkonstruksi, bukan hanya link ke policy mutable. Mengubah registry/promo/terms kemudian tidak mengubah order lama; perubahan kesepakatan membutuhkan amendment auditable dan persetujuan ulang bila material.

**Default desain reversible:** satu bundle, quantity 1 per order untuk pilot pertama; tidak ada cart/quantity banyak/subscription/credit upgrade. Ini rekomendasi teknis penyederhanaan, bukan pembatasan pasar yang sudah founder-approved. Jangan otomatis mengurangi harga Growth/System dengan pembelian sebelumnya.

## 4. Model logis, bukan schema fisik

Semua record transaksi kelak private. ID internal tidak cukup untuk authorization. Waktu UTC RFC3339; tampilkan zona Indonesia secara eksplisit. Money integer satuan yang disepakati; untuk pilot IDR whole rupiah, `currency=IDR`, `exponent=0`, tanpa float. Adapter provider harus menguji representasi amount; jangan menyebut 39000 sebagai 39000 sen bila kontrak berbeda.

| Entity | Fields minimum dan purpose | Relasi / invariant |
|---|---|---|
| Product / ProductRelease | ID, SKU, version, scope, manifest, hashes, approved decision refs, readiness | Product 1:N release; immutable setelah digunakan order |
| OfferRevision | ID/revision, release ref, channel, base price, currency, terms refs, sell state, validity/capacity | Order selalu menunjuk revision, bukan latest |
| Channel | ID, type, approved seller role, external namespace, reconciliation rules | Tidak otomatis provider; future integration terpisah |
| CustomerContact | internal ID, minimal recipient name/contact, verified method bila tersedia, service purpose/permission, optional marketing permission | Tidak perlu customer account; contact minimum private; bukan data pelanggan barber |
| Order | ID, customer ref, channel, immutable commercial snapshot, agreement evidence, lifecycle, aggregate version, timestamps | 1:N items/attempts; total harus rekonsiliasi; reference opaque |
| OrderItem | ID, order, product release, qty, price/discount/tax allocation, scope/manifest snapshot | Qty positif; pilot default 1; total item = order components |
| PaymentAttempt | ID, order, provider profile, merchant identity ref (bukan secret), merchantOrderId, dispatch state, request fingerprint, expiry, provider reference bila dikenal | Order 1:N attempt; hanya satu attempt aktif/uncertain dalam pilot; ID/reference unik per merchant/provider |
| Payment | ID, attempt/order, corroborated provider reference, verified amount/currency/status/time, evidence ref | Hanya bukti trusted membentuk payment; tidak dari browser/screenshot |
| PaymentNotificationReceipt | ID, provider, received time, authenticated flag, digest/dedupe key, correlation, processing result, safe evidence ref | Notifikasi bukan Payment; replay dapat terautentikasi namun bukan fakta baru |
| CommercialReceipt | ID/version, order/payment refs, customer-safe seller/price components, issued time, document hash | Receipt bisnis bukan otomatis Faktur Pajak; data tax bila kewajiban tervalidasi |
| ReconciliationCase / SettlementLine | internal ID, order/payment/attempt refs, discrepancy reason, provider/statement evidence, fee/withholding/net amounts, reviewer/status | Cash settlement bukan paid-event; mismatch tidak ditutupi |
| PromoRevision / PromoReservation | code opaque/internal ID, percent, product whitelist, validity, cap, revision; order reservation state | Satu code/order; atomic cap; belum active; tidak mengimplementasikan redemption |
| RefundRequest / RefundExecution | order/payment refs, reason, amount requested/approved, decision actor, remedy, evidence, execution status/time | Request ≠ approval ≠ execution; cumulative verified refund ≤ captured payment |
| Fulfillment / DeliveryAttempt | order/item, required input completeness, assigned operator, prepared manifest/hash, QC signoff, recipient method, attempt IDs, sent/access evidence, state | Unpaid tidak enqueue; sent ≠ access/acceptance; retry tidak membuat entitlement baru |
| SupportCase | ID, order bila ada, minimum issue summary, scope/defect/change classification, messages/evidence refs, owner, decision and outcome | Private; tak ada SLA/revision count baru tanpa persetujuan |
| AuditEvent | event ID/type/version, actor/role, target, occurred/recorded time, correlation/causation, before/after version, safe reason/evidence ref | Append-only facts; bukan secret/raw financial payload |
| IdempotencyRecord | command + actor scope + key, normalized request hash, processing/outcome refs, timestamps | Key sama/body beda ditolak; authorization tetap dicek, bukan reuse lintas actor |

Private artifacts/evidence bukan file publik/Git. D1 kandidat transaksi/constraints dan R2 kandidat private artifact kelak sesuai stack, bukan pilihan/provisioning approved sekarang. Tidak ada SQL, migrations, table atau storage binding baru.

## 5. Lifecycle orthogonal

Jangan satu string `paid/fulfilled/refunded` untuk semua dimensi. Generic API contract `created → pending → paid → fulfilled` adalah contoh konseptual; model ini memisahkan:
- order: `draft → awaiting_payment → active → completed`, atau `cancelled`; `exception` membutuhkan review.
- attempt: `not_dispatched → dispatching → pending / initiation_failed / outcome_unknown`; kemudian `confirmed / failed / expired` hanya berdasar bukti yang cukup.
- payment: `unpaid / verification_pending / confirmed / discrepancy`; agregat refund terpisah.
- fulfillment: `blocked_payment → waiting_inputs → queued → preparing → qc_passed → delivery_pending → delivered → accepted`, dengan `remedy_pending / exception`.
- refund: `requested → under_review → approved / rejected → execution_pending → completed / execution_unknown / execution_failed`.
- settlement: `unreconciled → reconciled / discrepancy`.

Nama di atas proposed vocabulary, tidak mengganti enum `pending|paid|failed` planner existing secara otomatis. `delivered` butuh bukti kirim kepada recipient yang disepakati; `accepted` butuh access/acceptance evidence, tidak otomatis setelah download atau deadline yang belum disetujui. `completed` order tidak menutup statutory rights/support/remedy.

| Command / event | Actor & preconditions | Result yang boleh | Yang dilarang / failure |
|---|---|---|---|
| Confirm agreement | buyer via controlled intake + operator/Core, approved snapshot dan contact basis | draft → awaiting_payment setelah sale-ready gate | Price/body browser dipercaya; tax unknown dianggap zero |
| Initiate attempt | authorized operator/buyer command, persisted order, valid quote, payable >0, no active/unknown attempt | durable dispatch intent, paling banyak satu dispatch | Mengulang createInvoice setelah timeout tanpa rekonsiliasi |
| Receive notification | provider-authenticated request, bounded schema/signature/merchant correlation | durable receipt + verification queue | Mark paid dari `resultCode`/browser return; ACK sukses tanpa durabilitas |
| Confirm payment | verified provider status/evidence and exact merchant/order/reference/amount/currency | payment confirmed; order active; one fulfillment intent | Mismatch/unsigned data, cross-order replay, arbitrary operator toggle |
| Failure/expiry | authoritative status + attempt correlation | close unpaid attempt; order tetap unpaid | Menghapus bukti paid atau membalik confirmed dari callback lama |
| Cancel | buyer request, authorized operator, snapshot/legal review | unpaid order cancel; paid order masuk cancellation/refund review | Cancellation menghilangkan cash/payment truth |
| Late paid after expiry/cancel | trustworthy matched evidence | record financial fact + exception case, hold fulfillment | Abaikan cash masuk atau otomatis fulfill order cancelled |
| QC/deliver/accept | operator role, confirmed payment, required input, manifest/QC/recipient checks | progression fulfillment, delivery/access evidence | Delivery dari callback/UI optimism; send sama dengan acceptance |
| Approve refund | accountable human, remedy/legal facts, remaining refundable amount | approved request/execution intent | AI/ support role menyelesaikan financial refund |
| Complete refund | verified execution/status/statement, amount/reference correlation | completed + aggregate verified amount | Button click/timeout dianggap refund completed |

Confirmed payment tidak diregresi oleh expired/failed notification lama. Confirmed late/duplicate payment kedua menjadi reconciliation/overpayment case, bukan pendapatan/order/fulfillment kedua. Full refund dicatat tanpa menghapus original payment; access withdrawal/licence consequence memerlukan approved policy dan tidak menghapus hak konsumen.

## 6. Evidence authority dan existing engineering gap

Existing current-doc POP adapter masih disabled/undeployed untuk transaksi. [Contract](duitku-production-integration-contract.md) menjelaskan signature callback tidak melindungi `resultCode`/`reference`; authenticated callback adalah **notification-only**. Jangan cast hasil `authenticateCallback` menjadi `VerifiedPaymentEvent`.

Future trusted pipeline: bounded receipt authentication → store receipt → query/corroborate lewat merchant-specific verified status contract → exact correlation including amount/currency/reference → atomic domain transition + audit + one fulfillment intent → safe acknowledgement. Status-query contract/client, durable receipts, recovery mechanism dan atomic store belum ada. Official documentation tidak membuktikan merchant connection.

Browser `success`, redirect, checkout close, JS callbacks, screenshot transfer, emailed claims, timeout atau signature saja bukan paid proof. Operator boleh membuka reconciliation case dengan evidence, tidak menekan arbitrary `mark_paid`. Manual proof procedure, bila kelak diperlukan, harus separately approved, berbasis merchant/bank settlement evidence yang diverifikasi dan diaudit; tidak aktif sekarang.

## 7. Idempotency, concurrency dan reconciliation

Spesifikasi future guarantees:
1. Validate/auth every command; idempotency namespace actor + command + target. Key reuse dengan berbeda request hash → conflict tanpa side effect. Key expiry/retention diputuskan sebelum implementation.
2. Persist intent sebelum external dispatch. Atomic lock/version check untuk order/attempt; unique provider merchant-order/reference. Crash antara dispatch dan persist response → `outcome_unknown`, tidak automatic retry. Cross-request in-memory lock bukan durable guarantee.
3. Receipt durable sebelum ACK sukses; provider event ID bila terjamin, atau stable canonical digest/correlation dedupe + domain idempotency bila event ID tidak tersedia. Receipt dedupe bukan satu-satunya defence terhadap signed replay.
4. Corroboration failure/provider unavailable → verification_pending/exception, tidak paid/failed fiktif. Retry read-status boleh bounded dengan backoff; creation retry tidak diasumsikan aman.
5. Domain transition, aggregate version, paid audit, promo consumption bila applicable, dan unique fulfillment intent harus atomic. Jika delivery external gagal setelah commit, retry task intent tanpa paid/delivery duplicate. Delivery email tidak dapat di-transaction-kan dengan D1; record attempts, uncertain sends dan manual review.
6. Out-of-order events diuji terhadap current authoritative state/time dan correlation, bukan urutan HTTP arrival. Expiry tidak membuktikan tidak ada delayed payment.
7. Payment confirmation, refund, provider fees, cash settlement dipisah. Reconciliation case wajib untuk unknown dispatch, late/duplicate payment, mismatch amount/reference, settlement shortfall/extra cash, failed/unknown refund, duplicate delivery.
8. Review exception queue dan statement comparison oleh operator; cadence/owner/recovery deadlines dipilih di founder packet. Tidak ada cron/background worker sekarang. Cloudflare-compatible future execution: bounded incoming-request catch-up/manual command atau separately approved scheduling; jangan mengasumsikan long-running process.

## 8. Promo calculation contract (tidak aktif)

Aturan approved: maksimum 40%, satu code/order, no stacking, validity start/end, whitelist produk, controlled cap, dari base price sebelum tax; no hidden surcharge. Contoh 40%: 39000 → 23400; 79000 → 47400; 149000 → 89400. Ini contoh matematis, bukan kampanye aktif.

Rekomendasi teknis: whole-rupiah `discount = floor(base × percent / 100)` dengan integer/rational math; boundary waktu `[start_at, end_at)` UTC dengan timezone display; zero/negative/>40 percent reject; one-bundle pilot menghindari allocation rounding. Usulan rounding/window/reservation ini belum commercial approval untuk engine.

Validation kelak: code canonicalization bounded, active revision, timeframe, matching product/release/channel, cap tersisa, tidak stacking, price snapshot authoritative. Quote memuat promo revision dan reserved-discount evidence. Atomic reservation/consume/release; unpaid expiry boleh release sesuai approved rule, unknown/late payment masuk exception agar cap tidak dipakai dua kali. Per-customer limit, redemption cap value, reservation duration dan refund reuse PENDING; tidak menciptakan kupon nyata. Unknown tax/terms tetap block initiation walau promo valid.

## 9. Manual digital fulfillment dan remedy

Delivery unit adalah versioned bundle; bukan link Git/public registry atau review archive. Saat sudah diizinkan kelak: verify payment → check scoped buyer inputs → operator prepare copy → open/render/formula-test → remove demo/private data → reconcile manifest/hash → QC signoff → verify recipient → manual private delivery → confirm access/file opening → acceptance/support evidence.

Minimum tailoring: business name, services/prices, days/hours, preferred contact; optional buyer-owned logo. Growth/System hanya operational fields yang perlu. Tidak meminta database customer barber, credentials, identity scans atau rekening lengkap. Buyer memiliki data yang disuplai; reusable template IP Ranel.

Internal 2-business-day preparation target mulai setelah verified payment **dan** complete inputs; bukan public SLA. Pause/reason/missing input dan capacity diketahui sebelum accepting order. Ukur operator minutes, QC/rework, concurrent capacity, support load dan biaya sebelum public promise. Belum ada end-to-end tailoring/delivery dry-run atau actual customer delivery dalam sesi ini.

Dry-run future synthetic acceptance: setiap tiga bundle bisa disiapkan dengan data dummy labelled, exact 6/10/15 files, buyer-compatible open test, safe recipient check, access failure/retry, corrupt/missing item replacement, support/change request separation. Tidak kirim email/WhatsApp sungguhan tanpa authorization. Standard source file QC Phase 02 tidak sama dengan delivery-system validation.

Failed/inaccessible delivery → support/remedy case, resend correct files with new attempt ID; not a new purchase. Material mismatch/non-delivery/corrupt file dapat correction/replacement/refund sesuai review/hukum. Out-of-scope custom requests butuh separate written scope, tidak memaksa no-refund. No auto-rejection after download, no invented fixed cancellation window or revision count. Delivery medium, link/access duration, lost-access recovery, numeric support/revision limits dan capacity adalah founder/legal/operational gate.

## 10. Privacy, access dan audit

PUBLIC tidak menerima/menyimpan customer transaction data. CONTROL future hanya authenticated operator; CORE authorizes per-record read/write. Tidak perlu customer login untuk membuat kit tampak SaaS. Future controlled order lookup tidak boleh via guessable ID/email query; opaque reference bukan authorization. Tenant model tidak diaktifkan dari buyer yang memiliki toko.

Data dictionary kelak wajib purpose/source/legal basis/owner/retention/export/delete per field. Minimum customer contact: metode yang disepakati dan recipient label bila perlu; jangan wajibkan telepon + email + address sekaligus tanpa purpose. Required order terms agreement bukan marketing consent. No NIK/NPWP pribadi/customer database/password/card data/raw provider bodies in normal records or Git/logs. Tax documents bila wajib hanya restricted workflow.

Role capabilities proposed: operator scope/customer/QC/support; finance reviewer evidence/reconciliation; accountable approver refunds/material overrides; audited least-privilege administrator. Founder dapat memegang beberapa role pada pilot tetapi setiap action mencatat actor/capability/reason; tidak mengklaim segregation/MFA sudah berjalan. AI boleh propose summary, tidak price/paid/refund/delivery truth atau secret access.

Private artifact access bound recipient/order, revocable grants bila digunakan; no permanent public URLs/signed links in logs/analytics/Git. Retention matrix dan legal hold belum ada nilai approved; shortest lawful period, safe archive/export/correction/deletion after obligation review. Deletion marketing consent tidak menghapus mandatory financial evidence. Before storage, approve exact retention, processors/location, recovery and incident procedure; mailto publish tidak membuktikan mailbox secured/deliverable.

## 11. Financial dimensions, jangan menyamakan cash dan revenue

Simpan komponen terpisah: base gross list value, discount, sales consideration after discount, customer tax collected (jika applicable), customer payable, verified payment captured, completed refund, provider fee, marketplace fee, withholding/tax deductions, reserves/adjustments, expected settlement, actual bank settlement, preparation/support variable cost dan tax liability.

Illustrative commercial arithmetic (tax slot unknown, **bukan** tax=0): gross=39000, discount=15600, discounted consideration=23400; final payable tidak executable sampai applicable tax/display disetujui. Provider fee unknown, bukan 0; tidak ditebak menjadi margin/profit. PPh liability bukan otomatis surcharge pelanggan. Refund net, tax correction dan fee returnability membutuhkan verified treatment.

Reconciliation identity per provider statement batch: captured cash − executed cash refunds − fees − withholding/reserves + adjustments = expected settlement **sesuai definisi statement**, bandingkan actual settlement dan timing; hindari double-count refund/fee yang sudah netted dalam statement. Gunakan signed line amounts/evidence IDs, currency matching dan settlement lag. Recognition revenue/profit mengikuti accountant-approved rules, bukan paid UI. Track founder time dan support walaupun belum dibayar gaji; no fabricated unit economics.

## 12. Future acceptance/negative test matrix

Ini **test requirements**, bukan automated tests yang sudah dijalankan.

| ID | Given / action | Expected assertion |
|---|---|---|
| CM01 | Product release/price/status mirror drift | publication/quote rejected; order snapshot lama tetap |
| CM02 | Browser amount/tax/SKU manipulation | recompute from approved authority; unknown tax blocks payment |
| CM03 | Draft/hold or capacity unavailable | no invoice dispatch; truthful hold |
| CM04 | Promo 40% on each bundle | 23400/47400/89400 pre-tax; no active-code claim |
| CM05 | >40%, two codes, expired/start/end boundary, wrong product/channel | rejection, no redemption/discount side effect |
| CM06 | Two concurrent redemptions at last cap slot | at most one reservation; deterministic consume/release |
| CM07 | Same idempotency key/body; different body/actor | same authorized outcome or conflict; no duplicate dispatch/leak |
| CM08 | Crash/timeout after provider received invoice | unknown outcome; no blind recreate; reconciliation |
| CM09 | Valid signature + changed unsigned result/reference | notification-only; corroboration required, no paid |
| CM10 | Browser success/screenshot/unauthenticated notification | no confirmed payment/fulfillment |
| CM11 | Merchant/order/reference/currency/amount mismatch | discrepancy receipt/case; no cross-order mutation |
| CM12 | Duplicate/parallel/replayed valid confirmations | one payment transition/audit intent/fulfillment; durable receipts |
| CM13 | Failed/expired notification after confirmed | no regression/erasure; event auditable |
| CM14 | Late paid cancelled order; second paid attempt | record actual funds, hold fulfillment, exception/refund review |
| CM15 | Status service outage, storage failure, uncertain ACK | no false success; durable/idempotent retry contract |
| CM16 | Missing input/unpaid/QC fail/wrong recipient | no send; queue blocked with safe reason |
| CM17 | Exact bundle delivery, access fail, duplicate retry | manifest match; delivered not accepted until evidence; remedy no duplicate entitlement |
| CM18 | Refund requested/approved/timeout/verified completion | distinct states; cumulative verified amount bounded; no deletion original cash |
| CM19 | Guess another order/support/artifact; role privilege abuse | deny server-side; audit no contact/link leakage |
| CM20 | Withdraw marketing or request deletion with legal hold | suppress marketing, preserve necessary records with basis; purpose-aware response |
| CM21 | Provider statement gross/net/refund lag | separate fee/tax/refund/settlement; discrepancy not silent balancing |
| CM22 | Change offer/terms/asset release mid-order | historical snapshot and agreement retained; material amendment separately accepted |

Implement missing fixtures, integration, recovery/concurrency/migrations/security tests only when authorized in later phases. Current 61 Core tests do not prove this full matrix or durable concurrency.

## 13. Gate dan handoff

Phase 03 documentation gate: existing decisions/source alignment, complete logical model/lifecycle/evidence boundaries, future acceptance cases, [limited official applicability assessment](../business/phase-03-compliance-assessment.md), [single founder packet](../governance/phase-03-founder-review.md), consolidated evidence. **Machine PASS tidak founder approval.** New numeric/legal/financial commitments remain PENDING.

Urutan roadmap: Baseline → Business Lock → Product/Price → **Commerce Model (ini)** → Core/DB → Provider → Checkout → Reconciliation → Fulfillment → Operations/Security → Real Pilot → Release. Phase 04 membutuhkan authorization terpisah atas model review, scoped persistence/access/retention/recovery dan cost/environment plan. Later merchant verification/secret containment, signed status/reconciliation, legal/tax/PSE/OSS evidence, delivery capacity dan real-pilot permission tetap wajib; tidak dilompati karena adapter existing.

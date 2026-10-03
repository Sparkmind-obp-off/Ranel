# Ranel — Phase 03 single founder review packet

Tanggal: 2026-10-03. **READY_FOR_CHATGPT_REVIEW; new material decisions PENDING.** Ini satu paket keputusan untuk gabungan Phase02 remediation → Phase03 specification, bukan approval yang dikarang dan bukan izin Phase04/live commerce. Machine PASS tidak menggantikan founder approval.

## 1. Ringkasan evidence dan rekomendasi

- Phase02 required PUBLIC pages.dev release gate **PASS**, exact source `7b8a1f17ab97e6f5818ba4ff5e995361c3707b7e`; immutable https://b0be6036.ranel.pages.dev, mutable https://ranel.pages.dev. Email/AHU/date verified; no independent AHU lookup/mailbox-delivery claim. Custom-domain email functionality **ISSUE OPEN** akibat Cloudflare obfuscation + CSP; tidak mengubah zona/DNS.
- [Commerce model](../technology/commerce-model.md) selesai sebagai logical specification dengan canonical release/read model, snapshots, orthogonal states, payment evidence/idempotency/reconciliation, manual delivery/support dan future acceptance matrix.
- [Official applicability assessment](../business/phase-03-compliance-assessment.md) selesai terbatas; company-specific legal/tax/OSS/KBLI/PSE status **PENDING_VERIFICATION**. Own-site PMSE dan PSE offering criteria perlu review current site, bukan diasumsikan exemption karena belum checkout.
- Product source bundles tetap **ASSET_READY_FOR_REVIEW / HOLD_PENDING_TERMS**. Tidak ada actual customer delivery, demand/payment validation atau sale-ready claim.

Rekomendasi: terima spesifikasi sebagai review baseline, selesaikan private evidence review dan batas operasional, kemudian authorisasi terpisah jika hendak memulai scoped Core/DB. Jangan langsung mengaktifkan adapter/provider/payment.

## 2. Existing APPROVED — jangan diputus ulang

| Keputusan | Sumber / status |
|---|---|
| Indonesia-speaking independent barber/small teams; Starter entry | F01/F02 APPROVED |
| Growth/System alternatif, tanpa prerequisite purchase | Current founder instruction / product baseline APPROVED |
| 39000 / 79000 / 149000 IDR, one-time | Pricing freeze APPROVED; market price validation belum |
| Controlled promo max40%, one code/order, no stacking, explicit validity/products/cap | F03 operating direction APPROVED, engine/code belum aktif |
| No hidden surcharge, total disclosed before payment | APPROVED, tax treatment belum ditentukan |
| Refund/remedy direction; statutory rights preserved, no blanket no-refund | F04 APPROVED direction, final applicability pending |
| Bounded tailoring/support/revisions, own-business licence/no resale, template IP Ranel, buyer data theirs | F05/product direction APPROVED; numeric commitments belum |
| Operator PT Waskita Cakrawarti Digital/Perseroan Perorangan; approved AHU/date disclosure | Founder-controlled reference APPROVED; independent verification tidak diklaim |
| Official email farasmuhadzib@gmail.com; WhatsApp conditional/private | Founder APPROVED; URI pages.dev verified, mailbox delivery belum |
| PUBLIC → CONTROL → CORE, AI cross-cutting, Kits → Systems → Supply, canonical 8-stage cycle | Strategic LOCKED; tidak berarti seluruh engine implemented |
| Execute Phase02 verification then Phase03 spec in same session | User AUTHORIZED; conditional pages.dev gate met, Phase04 tidak authorized |

## 3. Technical recommendations — documented defaults, not founder claims

Untuk simplicity/reversibility: direct website/manual channel first; one bundle/quantity1 pilot; immutable snapshots; IDR whole rupiah integer/exponent0; proposed promo floor rounding/[start,end) boundary; unknown outcome blocks blind re-initiation; confirmed financial fact never erased by late failure; no public customer login merely to simulate SaaS. Detail bisa direvisi saat review. No DB provisioning, SQL/API implementation atau executable calculation engine sekarang.

## 4. Consolidated material decision/evidence register

Satu response founder bisa memakai ID + APPROVE/MODIFY/REJECT + evidence refs. Silence/machine checks tidak mengubah PENDING. Bukti privat jangan dikirim ke Git/chat bila memuat identifiers/credentials; gunakan redacted status dan controlled reference.

| ID | Keputusan / evidence yang dibutuhkan | Rekomendasi dan trade-off | Owner / gate | Status |
|---|---|---|---|---|
| C01 | Accept/modify Commerce Model baseline sebelum desain Core/DB | Terima split product/offer/channel, snapshots & orthogonal states. Simpler single-bundle pilot; jika cart/upgrade credit perlu separate economics/terms/testing. | Founder + ChatGPT review; block model lock/Phase04 authorization | PENDING |
| C02 | Seller tax status/classification/price display/receipts & PPh regime | Private accountant review actual PKP/status/turnover, original PP20/2026/current VAT rules. Jangan default tax0/11% atau OP500m exemption. Pertahankan approved base prices; final payable/display baru setelah evidence. | Founder/accountant; blocks payment/sale tax lock | PENDING_VERIFICATION |
| C03 | AHU/OSS/NIB/KBLI/PMSE/PSE current applicability/status | Reconcile private documents, own-site Retail Online/PPMSE and current-offering PSE criteria; authoritative registration/permit/transition finding. Jangan memilih generic KBLI barber/software atau menganggap NIB cukup. | Founder/legal/OSS/Komdigi review; urgent current PUBLIC compliance + sale gate | PENDING_VERIFICATION |
| C04 | Final electronic terms, statutory refund/remedy, regulator complaint contact | Confirm applicable rights and complaint/contact obligations; no arbitrary no-refund-after-download/day cutoff. Keep service-request/decision/execution distinct. | Founder/legal; blocks final customer commitments | PENDING_VERIFICATION |
| C05 | Operational delivery medium, capacity, support/revision limits and formal-email reachability | Run synthetic full tailoring/access/remedy dry-run; measure effort. Keep 2-business-day as internal target until realistic public agreement approved. Choose private delivery/recovery window; don't promise instant/perpetual access. | Founder/operator; blocks Available/public SLA/fulfillment readiness | PENDING |
| C06 | Data field purpose, retention/legal hold, processor/access/recovery choices | Minimized private contact/terms/payment/QC evidence, no customer barber database. Approve exact periods/security/recovery before storage; no invented compliance certification. | Founder/privacy/security; blocks persistence/customer-data collection | PENDING |
| C07 | Finance authority/reconciliation cadence/promo operational limits | Assign accountable reviewer/refund approver; confirm promo rounding/timezone/cap/reservation/refund reuse policy, exception review and statement rules. No arbitrary paid toggle, no AI financial authority. | Founder/operator/accountant; blocks transactional engine/promo/refund activation | PENDING |
| C08 | Custom-domain email remediation and mailbox test scope | Isolate Cloudflare transforms; preserve CSP, no blanket allowing injected scripts. Prefer verified pages.dev meanwhile. Explicitly authorize isolated source/zone investigation/fix/retest if required; no DNS/billing change. Mailbox send/receive/security check separate. | Founder; custom-domain formal-contact usability gate | PENDING |
| C09 | Next implementation authorization | After review, propose separately scoped Phase04 Core/DB with own environment/cost, persistence constraints/migrations/access/recovery/test plan. No authorization inferred from this package. Merchant safe-key/contract, Provider/Checkout/Reconciliation/pilot/release gates remain later. | Founder; blocks any Phase04 execution now | PENDING |

Tidak meminta founder memilih setiap field/enum; technical defaults reversible sudah direkomendasikan. Material tax/legal/financial/customer-facing promises memerlukan human authority/evidence. Keputusan accepted spec tidak menyelesaikan C02–C08.

## 5. Suggested single review response

```
Phase03 model C01: APPROVE / MODIFY / REJECT
C02 tax evidence: private reviewer + redacted outcome reference / pending
C03 OSS/PMSE/PSE evidence: private reviewer + redacted outcome reference / pending
C04 final terms/complaints: review owner + outcome / pending
C05 delivery/support: approved channel/capacity/limits or dry-run owner / pending
C06 privacy/retention/access: review owner + outcome / pending
C07 reconciliation/promo authority: approved owner/rules or pending
C08 custom-domain contact: authorize scoped remediation / keep pages.dev / pending
C09 Phase04: NOT AUTHORIZED / request bounded plan / separately authorize defined scope
```

## 6. Exit and boundaries

Phase03 **bounded documentation gate PASS**, recommendations/research assembled for review; no founder decision auto-closed. Consolidated facts and exact deployed source/document provenance in [evidence](../implementation/phase-02-commerce/evidence.md). Overall sale/payment/regulatory readiness remains NOT READY. No live invoices/payments/refunds/payouts/messages, no DB/secrets/auth/Core/Control/promo redemption/checkout/DNS/billing changes. Phase04 and real pilot require separate authorization.

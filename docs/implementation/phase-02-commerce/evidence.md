# Ranel — Commerce Phase 02 execution evidence

Date: 2026-10-03. Canonical input checkpoint: `16ecea9242c9b5fc3351a66c849f7ceb8665c7b6` on `Sparkmind-obp-off/Ranel/main` (fast-forward from `c5795d5`, no unrelated overwrite).

## Scope and state

**ASSET_READY_FOR_REVIEW.** Product production, approved pricing/metadata, PUBLIC informational UI and Legal & Policies only. No payment/order/DB/secret activation, credentials check, Core/Control deployment, refund executor, auth rollout, DNS, billing or live financial action. PUBLIC release metadata is recorded below after actual deployment verification, not inferred from builds.

## Canonical decisions and conflicts reconciled

All 16 required input documents were inspected. Current Founder Review/master prompt takes precedence over historical language:

- F01/F02 approved: Indonesian-speaking independent barber/small teams, Starter default entry, Growth/System alternatives without forced prerequisite purchase.
- Approved prices: Starter IDR 39000, Growth 79000, System 149000; one-time. Old source no-fixed-price/diskusikan-harga labels were replaced; no price recommendation reopened.
- System is the complete Growth + five operating-system mapping documents, not merely a concept discussion and not SaaS/app access.
- F04/F05 and promotion/no-hidden-surcharge direction approved. Product-definition §5, catalog commercial boundary and readiness-plan header/terms text had stale pending language; patched with current approval scope, history preserved elsewhere. Earlier Phase 01 decisions/baseline are historical snapshots, not rewritten/restarted.
- F03 tax still validation-required. No PPN rate, tax amount or PKP claim inserted; neutral approved wording used.
- Legal operator follows founder-controlled SSOT: PT Waskita Cakrawarti Digital, Perseroan Perorangan. AHU reference/date/domicile recorded in canonical input sources; number withheld from PUBLIC because documentary reconciliation and intentional publication are not evidenced. No NIB/NPWP/KBLI/PMSE number, private identifiers/certificates or merchant IDs published.

## Actual product source artifacts

| Product ID | SKU | Version | Source directory | Files | State |
|---|---|---|---|---:|---|
| ranel.barber.starter | RBS-STARTER-001 | 1.0 | products/Ranel-Barber-Starter-v1.0/ | 6 | ASSET_READY_FOR_REVIEW |
| ranel.barber.growth | RBS-GROWTH-001 | 1.0 | products/Ranel-Barber-Growth-v1.0/ | 10 | ASSET_READY_FOR_REVIEW |
| ranel.barber.system | RBS-SYSTEM-001 | 1.0 | products/Ranel-Barber-System-v1.0/ | 15 | ASSET_READY_FOR_REVIEW |

All bundles match the exact canonical filenames, with updated bundle-specific README and manifest. Components carry corresponding product name/ID/SKU/version/preparation date; intentional placeholders and synthetic examples are labelled. No assets are in `public/` or copied into `dist/`.

[Registry](../../../products/registry.json) provides exact manifests and metadata. [Per-file QC](product-qc.json) includes path/type/version/result/hash/limitations for all **31 files; missing = []**. This is actual source production, not a hand-written list pretending files exist. Files remain `HOLD_PENDING_TERMS`; not Available, customer-delivered or demand-validated.

### Production and QC procedure

- `python3 scripts/produce_products.py`: creates PDF/DOCX/XLSX sources and registry offline. Runtime Hono does not execute Python or filesystem operations.
- `python3 scripts/qc_products.py`: validates exact manifests, ZIP/OOXML integrity, metadata, editable DOCX tables, readable PDF text/bounds, no macros/external workbook dependencies and targeted privacy checks.
- LibreOffice 25.2.3.2 renders **every DOCX to PDF** in ignored QA directories. PDF pages were text/bounds checked; first-page Starter/System README images reviewed separately.
- LibreOffice recalculates **all four XLSX instances**. Blank real-input sheets remain blank with zero summaries. Synthetic visit example values evaluate to 25000/30000/50000; synthetic repeat example gives 2/Ya and 1/Tidak. QC-copy mutations independently verify 3 × 10000 = 30000 and repeated-code count 2/propportion 1. No QC mutation written into source buyer-input sheets.
- Final QC clears old conversion outputs before running, so stale outputs cannot mask conversion failure. Original first generation found a merged-cell column-format issue; corrected it and regenerated/QC-passed full bundles. No assertion weakened.
- Tools are explicitly listed in `scripts/requirements-assets.txt`; Python dependencies are offline-only. PDF reader, DOCX-compatible editor and Excel/LibreOffice for XLSX are buyer-side requirements. No paid service, external workbook connection, macros or hosting dependency.
- Formula ranges intentionally bounded to 200 rows, with instructions to extend and retest. Simple COUNT/COUNTIF/SUM/IF/IFERROR formulas; repeat codes are not cohort-retention proof, consent or financial ledger.

### Limitations

Native Microsoft Word/Excel not present; LibreOffice and OOXML parsers used. Templates require buyer input/tailoring/QC before actual delivery. Placeholder fields are intentional. No actual customer data, product-market-fit/price validation, delivered order, tax/legal certification or payment provider verification claimed.

## PUBLIC implementation

Preserved Hono SSR, local brand assets, contacts, fixed-host/no-follow inquiry behavior, legacy topics, metadata/accessibility and fail-closed protocol/header controls.

Updated `/`, `/barber`, `/contact`, `/privacy`: approved price ladder, Starter entry styling, stable product metadata, System package scope, pilot/hold, no active checkout. Canonical inquiry drafts disclose the approved base price and hold; legacy bookmarked topics retain their prior intent. No payment widgets, payment forms, customer account or frontend SDK added.

Added exact read-only routes:

- `/legal`
- `/legal/ownership`
- `/legal/terms`
- `/legal/pricing-payment`
- `/legal/refund-policy`
- `/legal/privacy`
- `/legal/license`
- `/legal/complaints`
- `/legal/payment-provider`

Legal Hub uses entity/status card, individual policy cards, version/effective-for-information/update dates, official reference links and footer Legal navigation. Copy is written for Ranel, not copied SparkMind subscriptions/accounts/payment claims. Privacy legacy URI stays 200 and links the complete legal privacy policy. All new routes enforce GET/HEAD; unsafe methods 405. Unknown/private/financial routes still 404; source bundles not downloadable from PUBLIC.

Refund/remedy covers non-delivery, file/access issues, material mismatch, duplicate/incorrect payment, cancellation/change and applicable rights without blanket no-refund or automatic refunds. Support is 1:1 WhatsApp using existing contact. Email explicitly unconfigured/unpublished; no fake email, response-day, community or support ticket promise. Provider page is planned Duitku only, never active processor status.

## Actual checks before release

- Lint: PASS.
- Typecheck: PASS.
- Core/POP regression: **61 passed, 0 failed**, existing Core/adapter unchanged.
- Built PUBLIC worker: **44 passed, 0 failed**, including all legal routes, safe methods/headers, approved pricing/asset metadata, legal identity/date/no-claim controls, no private bundle or commerce API serving, canonical/legacy inquiries and safe errors.
- PUBLIC build: PASS, 54 transformed modules, `dist/_worker.js` 87.67 kB uncompressed; not alone a deployment claim.
- `npm audit --omit=dev`: 0 reported runtime vulnerabilities. Dependencies unchanged.
- Pre-release scoped configured-token scan: 53 changed/build files, including expanded OOXML entries; no configured-token matches. PUBLIC build contains no Duitku secret binding or invoice client. This is a scoped scan, not an independent credential-rotation assurance. Binary attributes preserve PDF/DOCX/XLSX bytes and PDF xref spacing; no whitespace stripping of document binaries.
- Local browser QA: **36 passed, 0 failed** across 320/390/1440 viewports, configured expectation unconfigured. Existing navigation/contact/assets/FAQ preserved; all 9 legal routes checked for identity/dates/overflow, Axe WCAG A/AA, POST 405, policy navigation, prices and Starter default; no WhatsApp request/message.
- Screenshot review: mobile Legal Hub, desktop catalog, Starter/System README first pages. Readable hierarchy; no observed overlap/clipping or false active-payment/instant-delivery indication. Automated image review's date caution was not applicable: preparation/policy date matches explicit user date 2026-10-03. This first-page/selected-view check is not a claim of inspecting every page manually; full file render/text/formula QC is separate.

## Production release

**PUBLIC deployment/live informational verification: PASS. Phase result: PASS WITH ISSUES (open gates below), not commerce/payment-ready.**

- BYOK deployed only existing project `ranel`, production/main. Source commit: `d17426d901d8842e293f4f4ba7e843810e9eed25`.
- Deployment ID: `2601f448-7037-4753-8f14-311a4c92a416`; created `2026-10-03T07:08:38.686868Z`, provider stage `success`.
- Mutable origin: https://ranel.pages.dev. Immutable release: https://2601f448.ranel.pages.dev.
- 14 page/asset smoke checks returned 200 on each origin. Live `/checkout`, product registry/README bundle paths and `/api/v1/payments` returned 404; no public delivery/commerce exposure.
- Production browser suite: **36 passed / 0 failed**, 2.6 minutes, configured inquiry expectation, 320/390/1440 viewports, all 9 legal routes and accessibility checks. No WhatsApp redirect followed or message sent.
- Provider metadata before/after confirms domain names unchanged (`ranel.pages.dev`, `ranel.biz.id`) and env names unchanged: production only `INQUIRY_WHATSAPP_NUMBER`, preview empty. This is metadata parity, not a DNS-record audit. No domain/secret operation invoked.
- Final 31 source file hashes match committed per-file QC evidence; docs references resolve. Native source assets remain outside build/public.
- Review-only archive: `qa-artifacts/Ranel_Phase02_Assets_v1.0.zip`, 33 entries (31 assets + registry + QC), archive integrity passed. [Download review archive](https://www.genspark.ai/api/files/s/MOJVurHz); signed-in review delivery only, not PUBLIC customer fulfillment.
- No Core deployment is part of this release. Previous known-good PUBLIC deployment: `a071fcab-4df7-466d-be7e-68d56274f780`, `https://a071fcab.ranel.pages.dev`, source `c90c1994839e1bee4fa676ed25ea848da66731ad`; preserved as rollback reference. Rollback concerns PUBLIC code only, not secrets/DNS/data; this release introduced no persisted financial state.
- Closing evidence/README update is documentation-only and does not change the deployed application SHA. Final state: **READY_FOR_CHATGPT_REVIEW**, assets **ASSET_READY_FOR_REVIEW**, products **HOLD_PENDING_TERMS**.

## Founder-confirmed email remediation (post-release source patch)

On 2026-10-03 the founder confirmed `farasmuhadzib@gmail.com` as the official public Ranel email. Source changes now expose it in the footer, contact page, Legal identity card, privacy contact guidance, and complaints policy; unconfigured WhatsApp falls back to a mailto link. Regression tests were updated. Source/test commits: `d5b0005d30f6268ec3df8d081740df1b6249b4fa`, `6440a17eb93a231a66bfe2ea1380b4bdb18f630a`, `c2ebebb8768f8674bf2b0c9d38251a421b02deb1`, `2b58261ef3af8764688c46f7e024553713fe9dcc`. **These changes are committed but not yet test/build/redeployment verified**; see [email remediation handoff](../../handoffs/phase-02-email-confirmation-remediation.md). The earlier production release remains the last verified deployed build until Genspark completes this follow-up.

## Open gates / review packet

- Seller tax status, PKP/non-PKP, product classification, tax-inclusive/exclusive and invoice/tax treatment before live checkout.
- Exact legal/permit/PMSE applicability and final terms review; no certification claim. AHU publication pending reconciliation/approval.
- Official email is founder-confirmed and present in current source; run regression/build and deploy the email-remediation patch before considering the current public release synchronized. WhatsApp remains optional and configuration-dependent.
- Real tailoring/delivery/support capacity and final operational expectations before Available/live fulfillment; internal 2-business-day target is not published as SLA.
- Asset acceptance and PUBLIC policy review by ChatGPT/founder, then next authorized phase; no automatic Phase 03.
- Later Core/persistence/merchant/payment/reconciliation/live-pilot gates all unchanged. Phase 02 output is not payment-ready.

# Ranel — Product Maturation & Sell-Ready Assets evidence

Tanggal: 2026-10-03. Canonical input `6f476ba66c281ba69a51b0a3e2a5ba500c24128e` (verify exact Git parent in closure). Repository `Sparkmind-obp-off/Ranel`, main. User explicitly authorized one product-maturation session, standard self-service delivery without founder tailoring, existing identities/prices/scope; no interviews, price reopening, new roadmap or payment implementation.

## 1. State and authority

**Content: PRODUCT_READY_FOR_COMMERCE_INTEGRATION. Sale: HOLD_PENDING_COMMERCE.** Content QC/extraction/render checks are complete. PUBLIC code/browser/release gate outcome recorded at closure, not inferred from asset readiness. Payment/checkout/recipient-bound automatic delivery remain INACTIVE. No new legal/tax approval or customer/sales/PMF claim.

Latest user instruction supersedes prior manual-tailoring preparation model: buyer receives standard kit, copies/fills/uses offline without founder customization. Product name/ID/SKU/v1.0/prices unchanged. Revision `self-service-maturation-2026-10-03` distinguished by SHA256; earlier v1.0 source/QC/release evidence retained as historical. No actually delivered customer release is claimed or changed.

## 2. Audit before changes

- Clean main fetched/fast-forward check: already current. All **31 actual assets** opened/extracted using PDF/DOCX/XLSX parsers, not only reading their generator/manifest. Inventory/old hashes/content audit: ignored `qa-artifacts/maturation-audit.json`.
- Existing documents had reusable practical instructions, consent-aware follow-up and genuine blanks; improved weaknesses rather than defining new products. Weaknesses: PDF internal asset/sale/approved notes, founder-tailoring dependency, insufficient self-service onboarding, short/placeholder worksheets, missing worked examples/System file relationships, input/calculation fields not obvious, insufficient invalid/duplicate/date handling and limited edge-case QC.
- GitHub API visibility check returned **PUBLIC / isPrivate=false**. Historical paid source documents and full original generator already in public Git history. This is a real IP/distribution gap, not confidentiality. No visibility/account/history change authorized or performed; no force/rewrite/delete-history workaround.

## 3. Improvements by product

**Starter Rp39.000:** self-service quick-start PDF (extract/copy/start with checklist/software/usage/licence/remedy), clean heading/page-number branding; four editable DOCX with separate actual-fictional examples and fill-in worksheets, repeated table headers/row padding, practical first step. Menu prices/examples explicitly fictional; consent/opt-out follow-up manual, not messaging/CRM. Remove internal review/payment-engine/development notes from customer guide/manifest.

**Growth Rp79.000:** includes Starter content plus two XLSX and two DOCX. Workbook Panduan explains exact starting sequence and sheet purposes; input/calculated/example fields have labels plus colors; clean blank sheets separate from fictional examples; date/positive integer/non-negative price/code validations and visible diagnostics; passwordless accidental-formula protection, filters/freeze panes/print layout. Normal summaries only valid rows, no demo leakage. Tracker requires manually entered unique local codes, suppresses duplicate tracking rows, counts dated visits, and documents capacity, case-insensitive codes, limits and consent separately. Added guide/review examples; not a live CRM/POS/customer database/ledger/cohort analytics.

**System Rp149.000:** includes Growth plus five linked maps/owner review/priority documents. Instructions and fictional worked examples establish 09 process → 10 journey → 11 consent-aware repeat process → 12 owner decisions → 13 one practical priority → review back to 09/12. Empty fields are intentional worksheets, not unresolved implementation placeholders. No development/integration/ongoing consulting/unlimited tailoring included.

All tiers preserve own-business/no-resale licence, buyer-owned supplied information, reusable Ranel IP, bounded file/usage support and statutory-rights/remedy direction; official email unchanged. No new SLA, number of revisions, guarantee, testimonial or business outcome invented.

## 4. Exact delivery manifests

One ZIP has one corresponding `Ranel-Barber-<Tier>-v1.0/` folder. No tools, QA copies, rendered files, internal reports, credential data or hidden files inside. Higher tiers use tier-specific guide/manifest/metadata with the same lower-tier substantive templates plus additions.

### Ranel-Barber-Starter-v1.0.zip — 6 files
- `00-README.pdf`
- `01-SOP-Dasar.docx`
- `02-Menu-dan-Daftar-Harga.docx`
- `03-Checklist-Buka-Tutup.docx`
- `04-Follow-Up-Pelanggan-Berizin.docx`
- `MANIFEST.md`

### Ranel-Barber-Growth-v1.0.zip — 10 files
- `00-README.pdf`
- `01-SOP-Dasar.docx`
- `02-Menu-dan-Daftar-Harga.docx`
- `03-Checklist-Buka-Tutup.docx`
- `04-Follow-Up-Pelanggan-Berizin.docx`
- `05-Rekap-Kunjungan.xlsx`
- `06-Tracker-Repeat-Visit.xlsx`
- `07-Review-Bulanan.docx`
- `08-Panduan-Follow-Up-dan-Review.docx`
- `MANIFEST.md`

### Ranel-Barber-System-v1.0.zip — 15 files
- `00-README.pdf`
- `01-SOP-Dasar.docx`
- `02-Menu-dan-Daftar-Harga.docx`
- `03-Checklist-Buka-Tutup.docx`
- `04-Follow-Up-Pelanggan-Berizin.docx`
- `05-Rekap-Kunjungan.xlsx`
- `06-Tracker-Repeat-Visit.xlsx`
- `07-Review-Bulanan.docx`
- `08-Panduan-Follow-Up-dan-Review.docx`
- `09-Peta-Operating-System.docx`
- `10-Peta-Customer-Journey.docx`
- `11-Peta-Retention-dan-Proses.docx`
- `12-Owner-Review-Framework.docx`
- `13-Prioritas-Implementasi.docx`
- `MANIFEST.md`

## 5. Private artifacts and reproducibility

Current source location `/home/user/webapp/private-products/Ranel-Barber-<Tier>-v1.0/`; release ZIP `/home/user/webapp/private-products/releases/`; clean extraction `/home/user/webapp/private-products/extracted/`. All Git-ignored. Paid source improvements/private generation overlay are NOT staged/pushed; source of these releases is the actual ZIP, not the public legacy generator. Avoid running legacy generator to overwrite current registry/content truth.

Review artifact refs (signed-in authenticated file wrapper; **not PUBLIC customer downloads**): Starter `uBGIkkyd`, Growth `VxTQZzw8`, System `4rh5G3mr`. Three protected links supplied in chat only, not embedded in product listings. Exact ZIP byte size/hash and per-file SHA256 in [current registry](../../../products/registry.json) / [QC record](../../products/product-maturation-qc.json). Do not use review wrappers as entitlement-based production delivery.

Offline toolflow in current workspace:
- Private overlay `private-products/tools/mature.py` extends copied existing content, not a new product definition.
- `python scripts/qc_products.py --registry private-products/registry.json --report qa-artifacts/product-maturation-qc.json` uses fresh LibreOffice conversion outputs, recalculates source workbooks, refreshes manifest component hashes, parser/readability/metadata/privacy/edge-case checks.
- `python scripts/package_products.py` verifies asset-QC/hash prerequisites, packages exact entries, clean extraction/open/byte equality, generates six cropped real-file previews and records public metadata-only registry/QC. It is offline only, not a Cloudflare runtime/API.
- To restore asset-QC inputs after sandbox loss, privately download/extract the three reviewed ZIPs into matching `private-products/Ranel-Barber-<Tier>-v1.0/`, restore a private working registry from public metadata, then run QC with an ignored report path. Generation overlay remains local/private; release sources persist in the protected review artifacts.

## 6. Actual asset verification

- 3 PDF guides, **21 DOCX**, **4 XLSX**, 3 customer manifests = **31 files**.
- PDF text extraction/bounds/page numbers, DOCX OOXML/editable tables and full LibreOffice rendering, XLSX OOXML/no macros/external links and LibreOffice recalculation PASS. Blank input/summary zero state, fictional examples, independent modified QC inputs, range200 and edge cases PASS; no cached spreadsheet error remains.
- Rendered **28 PDF views / 82 pages** across three guides, 21 DOCX and four workbook print views; every page text/bounds checked. Seven contact sheets covering all pages visually reviewed via image analysis; no observed clipping/overlap/orphan/blank continuation defect. Thumbnail review cannot prove every fine-size character; parser/bounds/formula checks and selected previews supplement it. No native Microsoft Word/Excel certification.
- ZIP CRC/integrity, exact allowlist, clean extraction, expected hierarchy, exact manifest list, original/extracted-byte equality and open PDF/DOCX/XLSX checks PASS. No proprietary Ranel software/account/macro/plugin dependency. Excel desktop/LibreOffice supported requirements disclosed; native Office/mobile/web/Google Sheets untested, not guaranteed.
- Formula cases: visit normal3×10000=30000, incomplete price/text date/zero quantity/negative price/fractional/text quantity rejected, valid zero-price counted as zero not missing, final range row206 included, row207 excluded. Aggregate3 valid rows/6 services/40000; fictional source example totals25000/30000/50000. Repeat sample2/1; modified3 visits on QC-A, duplicate case-insensitive tracker code suppressed, missing-date/text-date excluded, QC-B1/QC-NONE0; summary3 unique reviewed/one repeat=1/3. Fictional codes/no personal contacts.
- First QC correctly failed DOCX body metadata omission; added actual productID/SKU/date, not weakened assertion. Next edge tests found `INT(text)` causing #VALUE and SUMIF blank-result semantics wrongly summing invalid quantities; fixed error-safe predicate and diagnostic-based valid-row aggregate, then full31-file QC PASS.

## 7. PUBLIC listing scope

Existing Hono/design system extended, no rebuild/new framework. `/barber` cards list all exact files, 6/10/15 counts, price, target/problem/use, software/limitations, self-service flow, exclusions and licence/support/refund links. Six preview WebPs derive from actual PDF/DOCX/LibreOffice workbook renders, cropped sections with visible PRATINJAU label, never full files or misleading mockups. Provenance page/clip/hash in QC.

Standard self-service wording synced on catalog/home/contact/inquiry and relevant product terms/privacy; historical legacy inquiry topics retain original intent. No working purchase button, fake download/success, order form/SDK added. Future payment→private ZIP flow explicitly future/inactive. Existing security/header/GET-HEAD/input limits and legal identity/email unchanged. Native paid ZIP/source paths tested404 separately from static-preview200 paths.

## 8. Checks / release closure

Application checks: lint/typecheck/build PASS, **45 PUBLIC worker tests PASS**, **61 preserved Core/POP tests PASS**. Initial full local browser run: **36 passed / 3 failed**, with Chromium screenshot/page crashes and a legal-test timeout under near-full 1GB RAM/swap; not a PASS. Full-page catalog capture was replaced with bounded viewport tiles covering its full height, preserving every functional/Axe assertion. Full39-test rerun with bounded Node heap completed: **39 passed / 0 failed (5.1m)** across320/390/1440, including all legal pages/Axe, six loaded previews, exact6/10/15 lists, private/native ZIP404 checks, configured-fixture worker and unconfigured-browser contact flows. No functional/security/Axe assertion removed. Generated Chromium core dump was excluded from Git and deleted. Application/source QA gate PASS; new production rollout remains unperformed under wrap-up boundary.

**Wrap-up boundary requested by user:** do not start additional subtasks. New PUBLIC deployment/production browser QA is not started. Wrangler whoami attempts timed out and are not reported as verified auth/release. No deployment command was executed in this maturation session. Last verified production remains source `7b8a1f17ab97e6f5818ba4ff5e995361c3707b7e`, immutable https://b0be6036.ranel.pages.dev; the new listing/previews are prepared in source, not claimed live.

Fresh read-only custom-domain check at `2026-10-03T13:23:50.150271+00:00`: pages.dev `/legal`200 with literal approved email, no obfuscation; `ranel.biz.id/legal`200 but Cloudflare email-protection rewrites email under unchanged script-disallowing CSP. Existing custom-domain contact issue remains open; no DNS/zone/CSP weakening.

Verification-tool issue: Node-built worker has no native Pages static binding; direct `/static/*.zip` unit request gave500 despite no asset. Moved native-static negative check to real Pages browser HTTP test; kept protected/product path404 unit checks, no security assertion weakened. Preview HTTP readiness needed waiting beyond initial3s; restarted via PM2 and verified HTTP200 before rerunning browser. No test failure hidden or current PASS inferred from process masking.

Payment/provider flags/config, Core/Control/database/auth/secrets/DNS/billing unchanged; no real invoice/payment/refund/payout/email/WhatsApp message or customer-data processing. Historical public-source exposure and custom-domain issue remain explicit release concerns, not reasons to invent content defects or live-sale capability.

# Ranel — Phase 03 limited applicability assessment

Tanggal akses/review: **2026-10-03**. Scope: Indonesia, direct website/manual digital kit + bounded tailoring; future channel abstraction only. **PENDING_VERIFICATION**, bukan pendapat hukum/pajak final, bukan certification, bukan pemeriksaan akun AHU/OSS/DJP/PSE/merchant. Review sumber publik dan evidence repository saja. Tidak melakukan login, pendaftaran, perubahan izin, tax filing atau provider call.

## 1. Kesimpulan yang aman

- Founder-approved operator: PT Waskita Cakrawarti Digital, Perseroan Perorangan; AHU reference/date approved untuk disclosure, bukan independent registry verification.
- NIB/NPWP/establishment documents dilaporkan dimiliki founder. Repository yang ditinjau hanya menyimpan referensi naratif; tidak ditemukan certificate PDF/DOCX non-product dalam tracked file inventory. Ini bukan klaim bahwa founder tidak memilikinya. Tidak menelusuri AI Drive atau membuka credential upload.
- NIB bukan otomatis izin seluruh aktivitas; KBLI harus mengikuti kegiatan/jenis barang/jasa sebenarnya, termasuk commercial digital documents + tailoring dan kanal sendiri. Tidak memilih kode KBLI dari nama "barber" (Ranel bukan otomatis usaha pangkas rambut).
- Permendag 19/2026 berlaku menurut JDIH dan PDF resmi; Pasal 7(3) secara eksplisit memasukkan pedagang dalam negeri yang memiliki sarana PMSE sendiri sebagai PPMSE. Jangan menyimpulkan hanya marketplace yang memerlukan Perizinan Berusaha Bidang PMSE.
- PSE criteria resmi mencakup **penawaran** barang/jasa dan pengiriman digital berbayar via email/aplikasi. Tidak ada checkout/account belum tentu mengecualikan website saat ini. PSE/PMSE applicability perlu ditangani untuk current public offering, bukan ditunda otomatis sampai payment API live.
- Tax unknown tidak berarti tax=0 atau non-PKP. Perseroan Perorangan bukan Wajib Pajak Orang Pribadi hanya karena didirikan satu orang. Jangan menerapkan fasilitas omzet Rp500 juta orang pribadi pada badan tanpa dasar.
- Sumber tax generic DJP masih memuat contoh lama/rate 11% dan PP55; ditemukan PP20/2026 amendment yang berlaku 22 April 2026. Jangan membekukan regime/rate/masa fasilitas dari artikel lama. Seller-specific assessment tetap diperlukan.

## 2. Evidence inventory perusahaan

| Fakta | Evidence tersedia | Yang belum dibuktikan |
|---|---|---|
| Brand/operator/form | `legal-entity-and-merchant-identity.md`, `sparkmind-legal-reference.md`, founder approval | Independent AHU/beneficial ownership/current entity standing |
| AHU/date | `AHU-066746.AH.01.30.Tahun 2025`, 1 Desember 2025; PUBLIC pages.dev verified | Original certificate/authentication, registry match; disclosure approval bukan verification |
| NIB/OSS | Founder-reported ownership of documents | Exact current status, activities/projects, risk level, issued licences/standards, restrictions, KBLI/version coverage |
| NPWP/tax | Founder-reported documents | Corporate tax record, PKP determination, regime/elections/transitions, product classification, actual annual/aggregate turnover |
| PSE/PMSE | Official guidance/regulation reviewed | Registration/permit record applicable to Ranel system/entity/domains; no registration number inferred |
| Merchant | Planned Duitku, disabled existing adapter | Entity/account/bank alignment, activation, safe credentials, family/status contract, fees, refund/settlement |
| Complaints/contact | Approved email and conditional WhatsApp on pages.dev; no mailbox send test | Actual reachability, staffed handling, statutory regulator-contact disclosure; custom-domain email transformed and blocked |

Private verification packet kelak: redacted document index/type/issuer/date/status/evidence reference + reviewer; originals di controlled private store. Jangan commit NPWP/NIK/NIB values, bank ownership evidence atau scans. Hanya publikasi identifier yang memang disetujui dan diwajibkan/appropriate.

## 3. Official-source register dan retrieval limits

Semua diakses 2026-10-03. Tingkat evidence dibedakan: official regulation text > official metadata/guidance > hosted commentary/search excerpt. Link bukan bukti company-specific compliance.

| Ref | Source | Hasil nyata / batas penggunaan |
|---|---|---|
| S01 | [Komdigi PSE criteria](https://pse.komdigi.go.id/panduan/kriteria-pendaftaran-pse-lingkup-privat) | Plain fetch hanya shell; JS-rendered fetch membaca enam criteria dan statement salah satu terpenuhi wajib daftar. Criteria 1 penawaran/perdagangan; 3 paid digital delivery termasuk email; 6 processing personal data untuk electronic transactions. Bukan pengecekan daftar Ranel. |
| S02 | [Komdigi FAQ](https://pse.komdigi.go.id/pertanyaan-umum) | JS output menampilkan daftar pertanyaan, tidak full accordion answers. Tidak dipakai membuktikan exemption, deadline, cost atau KBLI tertentu. |
| S03 | [JDIH Permendag 19/2026 metadata](https://jdih.kemendag.go.id/peraturan/peraturan-menteri-perdagangan-republik-indonesia-nomor-19-tahun-2026-tentang-penyelenggaraan-usaha-perdagangan-melalui-sistem-elektronik-1) | JS render: Berlaku, ditetapkan 4 Juni 2026, diundangkan 8 Juni 2026. Metadata lampiran tidak digunakan untuk menyimpulkan PDF tak punya format lampiran. |
| S04 | [Permendag 19/2026 official PDF](https://jdih.kemendag.go.id/peraturan/download/5d4ff6c5-ae21-4591-81ed-4949d6e6ac1d/file_peraturan) | Crawler ditolak termasuk JS retry; curl pertama timeout partial, retry 120s berhasil full PDF dan pdftotext. Dibaca selected pasal: definitions, 2–9, 10–13, 74–76. SHA256 `2c4a3035a6efe5d5d09085dc71f0da10f6cd3aba827a42ea985338f963ea6c32`; local ignored QA copy bukan deliverable/company evidence. Tidak mengklaim full pasal audit. |
| S05 | [OSS conversion](https://oss.go.id/id/kbli/konversi) dan [panduan](https://oss.go.id/id/kbli/konversi/panduan) | Portal memuat konversi KBLI2020→2025; 1:1/1:N/N:1/N:N dan peringatan baca uraian/kegiatan, referensi bukan keputusan hukum. Tidak memilih code atau mengubah OSS. |
| S06 | [DJP Pengusaha](https://www.pajak.go.id/id/pengusaha) | Guidance umum NPWP/PKP/turnover, tetapi contoh/rate lama dan OP tidak cukup untuk tax lock 2026 badan. Hanya supports need to verify actual status; tidak dipakai menetapkan tax Ranel. |
| S07 | [JDIH PP20/2026](https://jdih.kemenkeu.go.id/dok/pp-20-tahun-2026/view) | JS render official metadata: amendment PP55/2022, berlaku 22 April 2026. [Summary](https://jdih.kemenkeu.go.id/dok/pp-20-tahun-2026/summary) dibaca tetapi ditandai generated by AI oleh situs; bukan substitute original text. [Files](https://jdih.kemenkeu.go.id/dok/pp-20-tahun-2026/files) hanya shell/promo, original pasal tidak didownload dalam review ini. Eligibility/calculation/transitions tetap PENDING_VERIFICATION. |
| S08 | [DJP commentary PP20](https://www.pajak.go.id/id/artikel/pp-202026-tarif-pph-05-bagi-umkm-orang-pribadi-berlaku-selamanya) | Membahas perseroan perorangan, aggregation dan eligibility; explicitly personal opinion disclaimer. Research lead untuk original-text/accountant check, bukan tax determination atau founder turnover evidence. |
| S09 | [DJP PPN/DPP press release](https://www.pajak.go.id/en/node/114038) | 18 Februari 2025, PMK11/2025, nominal12%, nilai lain/formula tertentu; bersama PMK131/2024 menunjukkan rate alone tidak cukup. Tidak memastikan template Ranel masuk objek mekanisme tertentu/tidak ada later amendment. |
| S10 | [UU27/2022 PDP official metadata](https://peraturan.go.id/id/uu-no-27-tahun-2022) | Berlaku, 17 Oktober 2022. Metadata bukan full implementation/legal-transfer assessment; privacy/retention/processor obligations perlu mapped ke actual data flow. |
| S11 | [PP80/2019 official page attempt](https://peraturan.go.id/id/pp-no-80-tahun-2019) | Plain + JS fetch gagal/no content. PP80 direferensikan langsung dalam S04 konsideran; tidak mengklaim fresh full PP80 article verification/cancellation-day finding. Full text review remaining action. |

## 4. Limited legal applicability observations

S04 Pasal 1(13): Retail Online adalah pedagang dengan website/aplikasi komersial sendiri; Pasal 3 mencantumkan Retail Online dalam model PPMSE. Pasal 4 kewajiban perizinan perdagangan/sektor; Pasal 5(1) KBLI sesuai barang/jasa; competence requirement Pasal5(2) mengikuti ketentuan yang mewajibkan, bukan otomatis certificate baru untuk setiap template. Pasal7(3) own-site merchant termasuk PPMSE; Pasal8 melalui OSS; Pasal9 klasifikasi sesuai bidang. **Likely relevant own-site PMSE**, final mapping/legal status belum terbukti.

Pasal12 consumer complaints channel harus jelas/can be contacted and responded; Pasal13 regulator consumer-complaint contact. Pasal10(2) multi-channel/SLA membahas layanan **bagi Pedagang** pada model yang disebut (marketplace/iklan baris/daily deals/social/ride/travel/PSP). Jangan menyalin kewajiban marketplace sebagai universal numeric SLA Retail Online. Actual consumer service requirement tetap perlu final mapping. Approved email URI/WhatsApp inquiry tanpa real receipt test belum membuktikan operasional complaints. Regulator contact harus diverifikasi dari official current source sebelum publication; tidak ditebak dalam sesi ini.

Pasal75 mencabut Permendag31/2023; Pasal76 mulai berlaku saat diundangkan. Pasal74 memiliki ketentuan penyesuaian perizinan; **bukan permission untuk menganggap Ranel memenuhi peralihan**. Existing operation date, type/permit status dan exact transition applicability butuh review original pasal dan fakta privat. Hold/payment-disabled label bukan legal exemption.

Batas kit + tailoring perlu mapping barang digital/licence/service yang sebenarnya; legal support bukan produk layanan hukum. KBLI jasa/barang/retail-online tidak dipilih dari keyword convenience. Link.id/marketplace kelak dapat mengubah seller role, withholding/refund/contact obligations; channel abstraction bukan regulatory bypass.

## 5. Requirement / blocker / action matrix

Semua unresolved status **PENDING_VERIFICATION**. "Tidak block spec" artinya boleh mendesain dengan unknown slot, bukan boleh beroperasi/live-sale tanpa kewajiban.

| ID / requirement | Evidence / unknown | Source-date | Block spec? | Block payment/live sale? | Specific evidence/action + owner |
|---|---|---|---|---|---|
| L01 entity & merchant alignment | Founder identity/AHU approved; original company/current standing and merchant/bank alignment unknown | Repo + S03/S04, 2026-10-03 | Tidak | Ya sebelum verified merchant/live claims | Founder/private reviewer reconcile AHU/OSS/tax/legal seller vs merchant and business bank evidence; redacted outcome only |
| L02 NIB/activities/KBLI/risk permits | Founder reports NIB; exact codes/version/projects/standards unknown | S04§4–9, S05 | Tidak | Ya; assess current activity too | Founder/OSS adviser provide private current NIB/project/KBLI list, compare actual digital kit/tailoring and 2020→2025 scope; obtain any required permit without auto change |
| L03 own-site PMSE | Actual own website commercial offers; permit unknown; likely Retail Online/PPMSE | S04§1(13),3,7(3),8,9,74 | Tidak | Ya, unless documented lawful satisfied/transition decision | Legal/OSS reviewer map own-site vs seller-only future channels; verify Perizinan Berusaha Bidang PMSE and any valid transition; no guessed SIUPMSE number |
| L04 PSE registration | Current offers + intended paid digital delivery likely within stated criteria; registration unknown | S01; S02 incomplete | Tidak | Ya; **current PUBLIC applicability urgent** | Founder/Komdigi reviewer check current system/operator/domains criteria/status; evidence of registration or reasoned authoritative determination; no checkout exemption assumption |
| L05 PKP/PPN/tax invoice | No PKP, turnover/classification/display evidence; base prices approved only | S06/S09, 2026-10-03 | Tidak | Ya | Accountant/private DJP status + product classification + latest regulations; decide inclusive/exclusive/all-in display and required receipt/faktur/correction; no default11/12%/0 |
| L06 PPh regime/aggregation | Perseroan Perorangan is body; PP20 new, eligibility/election/exclusions/turnover unknown | S07 metadata, S08 commentary | Tidak | Ya before tax/economics lock | Accountant read original PP20 + PP55/current implementing rules, verify corporate regime/aggregate turnover/elections/transitions; no assume OP Rp500m facility or final0.5% |
| L07 consumer contract/refund/support | Approved bounded directions, policy info only; full current PP80 rights/applicability and regulator contact not reviewed | S04§12–13, S11 failed | Tidak | Ya | Legal reviewer electronic agreement/evidence, statutory remedy/cancellation/refund and records duties; verify regulator complaint contact; approve executable terms without blanket no-refund/new SLA |
| L08 data governance | Minimal future fields specified; retention/basis/processor/security/recovery not approved/implemented | S10, canonical governance | Tidak | Ya before collection/storage/sharing | Founder/security/privacy reviewer field-purpose/lawful basis/retention/legal hold/access/export/deletion and Cloudflare/email/provider transfers, location/security obligations |
| L09 contact usability | pages.dev email/mailto passes; mailbox delivery unknown; custom-domain Cloudflare transform breaks mailto | Phase02 live checks | Tidak | Ya for formal support channel readiness; domain issue scoped | Founder authorize isolated zone/content remediation plan if using custom-domain email; retain CSP, retest; mailbox controlled reachability/security test separately, no messages now |
| L10 fulfillment & truthful sale state | 31 source/QC files, manual capability not end-to-end tested | Canonical product/QC | Tidak | Ya before Available/delivery promises | Founder/operator synthetic dry-run, recipient/access/remedy flow, prep/support hours/capacity, accepted scope; no real customer/demand proof fabricated |

## 6. Next evidence, not automation

Satu private evidence review dapat menghasilkan redacted status checklist tanpa publishing sensitive docs. Review legal/tax professional atau regulator dibutuhkan untuk material applicability, khususnya PSE current offering, own-site PMSE, seller tax treatment dan statutory rights. Jangan memanggil unpaid optional research sebagai legal clearance. Tidak mengubah PUBLIC copy tax, licences, terms commitments atau registration claims dari review ini.

Founder choices dan evidence owners berada pada [single Phase03 founder packet](../governance/phase-03-founder-review.md). [Commerce model](../technology/commerce-model.md) mempertahankan unknown slots dan fail-closed initiation. Phase03 spec dapat selesai walau applicability PENDING; live commerce gate tetap tertutup. Machine PASS bukan legal advice/founder approval.

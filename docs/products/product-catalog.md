# Ranel — Katalog Produk Barber

## Current: Product Maturation — 2026-10-03

Instruksi founder terbaru mengubah delivery dari penyiapan/tailoring manual menjadi **produk digital standar untuk diisi sendiri oleh pembeli**. Tidak mengubah harga, ID/SKU, jumlah/file hierarchy, licence/refund/support direction. Tailoring founder tidak termasuk harga dan bukan dependency order. Ini supersedes model preparation terdahulu, bukan klaim transaksi aktif.

| Paket | Product ID / SKU | Versi | Harga sekali bayar IDR | File | Content state | Sale state |
|---|---|---|---:|---:|---|---|
| Starter | ranel.barber.starter / RBS-STARTER-001 | 1.0 | Rp39.000 | 6 | PRODUCT_READY_FOR_COMMERCE_INTEGRATION | HOLD_PENDING_COMMERCE |
| Growth | ranel.barber.growth / RBS-GROWTH-001 | 1.0 | Rp79.000 | 10 | PRODUCT_READY_FOR_COMMERCE_INTEGRATION | HOLD_PENDING_COMMERCE |
| System | ranel.barber.system / RBS-SYSTEM-001 | 1.0 | Rp149.000 | 15 | PRODUCT_READY_FOR_COMMERCE_INTEGRATION | HOLD_PENDING_COMMERCE |

Revision: `self-service-maturation-2026-10-03`, masih v1.0 pra-penjualan; hashes membedakan revision ini dari asset-review v1.0 sebelumnya. Tidak diam-diam mengganti delivered customer order: belum ada bukti actual delivery/order.

Starter default entry; Growth/System alternatif atau upgrade pilihan, tanpa mandatory sequential purchase atau kredit harga upgrade otomatis. Harga founder-approved; demand/price validation tidak diklaim.

## Starter — fondasi operasional harian

Untuk barber mandiri/tim kecil yang ingin memperjelas menu, alur layanan dan rutinitas buka/tutup. Pembeli membuka panduan, menyalin DOCX, mengisi kondisi usahanya lalu mencoba satu giliran.

ZIP `Ranel-Barber-Starter-v1.0.zip`:
1. `00-README.pdf` — panduan mulai, aplikasi, daftar file, usage/licence/remedy.
2. `01-SOP-Dasar.docx` — panduan, contoh fiktif dan lembar alur layanan.
3. `02-Menu-dan-Daftar-Harga.docx` — menu/harga yang diisi sendiri.
4. `03-Checklist-Buka-Tutup.docx` — lembar harian yang dapat diduplikasi.
5. `04-Follow-Up-Pelanggan-Berizin.docx` — izin, teks dan pengecekan penghentian manual.
6. `MANIFEST.md` — file allowlist dan SHA256 komponen.

## Growth — Starter + catatan dan review

Untuk operator yang ingin mencatat layanan dan meninjau kunjungan kembali secara sederhana. Memuat seluruh lima komponen Starter, panduan/manifest khusus Growth, ditambah:
- `05-Rekap-Kunjungan.xlsx` — lembar Input bersih, Contoh fiktif, Ringkasan dan Panduan.
8. `06-Tracker-Repeat-Visit.xlsx` — Kunjungan/Tracker bersih, dua lembar contoh fiktif, Ringkasan dan Panduan.
9. `07-Review-Bulanan.docx` — keterbatasan angka, temuan dan satu aksi.
10. `08-Panduan-Follow-Up-dan-Review.docx` — cara memakai dua workbook, izin dan review.

Daftar exact 10 file termasuk `00-README.pdf` dan satu `MANIFEST.md` pada [registry](../../products/registry.json); penomoran daftar di atas menjelaskan tambahan, bukan jumlah Starter+Growth yang dijumlah dua kali. Bukan CRM/POS/database pusat/ledger pembayaran/retensi otomatis. Kode tracker ditulis manual dan tidak sinkron otomatis dari Rekap.

Input dan hasil rumus dibedakan warna **dan** label; contoh terpisah. Jumlah/harga/tanggal invalid atau baris incomplete tidak dihitung sebagai transaksi sah; status Periksa memberi arahan. Tracker mencegah/deteksi kode ganda, tidak double count, hanya dated visits; kode tanpa kunjungan sah nol. Range 200 baris; gunakan salinan periode baru ketika penuh. Paste dapat melewati validasi; instruksi tidak menjanjikan input sempurna otomatis. Repeat bukan cohort retention atau izin marketing.

## System — Growth + peta dan keputusan pemilik

Untuk usaha yang ingin meninjau hubungan proses, pengalaman pelanggan dan prioritas perbaikan. Memuat seluruh Growth, panduan/manifest khusus System, ditambah:
- `09-Peta-Operating-System.docx`
- `10-Peta-Customer-Journey.docx`
- `11-Peta-Retention-dan-Proses.docx`
- `12-Owner-Review-Framework.docx`
- `13-Prioritas-Implementasi.docx`

Total 15 file. Urutan: 09 kondisi proses → 10 titik pelanggan → 11 proses kembali berizin → 12 keputusan owner → 13 satu prioritas → review kembali ke 09/12. Setiap dokumen punya contoh fiktif dan lembar kosong. Bukan software/SaaS, jasa development, system integration atau konsultasi berjalan.

## Aplikasi dan penggunaan

PDF reader; DOCX editor Microsoft Word/LibreOffice Writer. Growth/System juga Excel desktop/LibreOffice Calc. LibreOffice25.2 render/recalculation diuji, bukan native Word/Excel certification. Mobile/web/Google Sheets belum diuji dan bukan dependency. Tidak memerlukan akun/software proprietary Ranel, makro/koneksi luar. Data usaha diisi/disimpan sendiri; tidak dikirim ke Ranel.

Licence usaha pembeli sendiri, tanpa resale/sublicensing/redistribusi publik. Buyer memiliki data yang diisi; reusable IP Ranel. Support file/penggunaan/cakupan bounded, tanpa numeric SLA baru/unlimited revisions. Remedy meliputi file hilang/rusak/inaccessible/material mismatch sesuai kebijakan/hak wajib; tidak blanket no-refund. Email resmi `farasmuhadzib@gmail.com`, WhatsApp privat bila configured.

## Artifact dan distribusi

Current paid sources/ZIP di **Git-ignored `private-products/`**, bukan `public/`/build/GitHub. Repository PUBLIC, historical source v1.0 masih terdapat di Git history; tidak diperbaiki dengan rewrite history. Jangan menganggap repo PUBLIC sebagai private delivery. Registry metadata/hash dan crop preview terbatas dapat publik, konten source/ZIP baru tidak.

[Product definition](phase-02-product-definition.md) · [31-file + ZIP/preview QC](product-maturation-qc.json) · [Maturation evidence dan review artifacts](../implementation/product-maturation/evidence.md). Produk content-ready, bukan Available/live sale. Sebelum pembeli benar-benar membayar/download otomatis: approved legal/tax/operations gates, checkout + verified payment + durable transaction/reconciliation + recipient-bound secure download/support readiness harus dibangun dan diuji terpisah. Tidak diimplementasikan dalam task ini.

// Standard self-service products; content readiness does not activate transactions.
const starterFiles = ["00-README.pdf", "01-SOP-Dasar.docx", "02-Menu-dan-Daftar-Harga.docx", "03-Checklist-Buka-Tutup.docx", "04-Follow-Up-Pelanggan-Berizin.docx", "MANIFEST.md"];
const growthFiles = [...starterFiles.slice(0, -1), "05-Rekap-Kunjungan.xlsx", "06-Tracker-Repeat-Visit.xlsx", "07-Review-Bulanan.docx", "08-Panduan-Follow-Up-dan-Review.docx", "MANIFEST.md"];
const systemFiles = [...growthFiles.slice(0, -1), "09-Peta-Operating-System.docx", "10-Peta-Customer-Journey.docx", "11-Peta-Retention-dan-Proses.docx", "12-Owner-Review-Framework.docx", "13-Prioritas-Implementasi.docx", "MANIFEST.md"];
export const productSoftware = "Pembaca PDF; Microsoft Word atau LibreOffice Writer untuk DOCX. Growth/System juga memerlukan Excel desktop atau LibreOffice Calc. LibreOffice 25.2 diuji; Microsoft Office native, aplikasi ponsel/web dan Google Sheets belum diuji. Tanpa software atau akun Ranel.";
export const plannedDelivery = "Rencana setelah checkout aktif: pembayaran diverifikasi → akses privat untuk mengunduh satu ZIP → ekstrak → simpan salinan → isi dan gunakan sendiri. Pembayaran dan download aman belum aktif sekarang; bukan janji unduhan instan.";
export const offers = [
  {
    id: "starter",
    productId: "ranel.barber.starter", sku: "RBS-STARTER-001", version: "1.0", price: 39000,
    sellState: "HOLD_PENDING_COMMERCE",
    files: starterFiles,
    preview: "/static/previews/starter-document.webp",
    previewAlt: "Pratinjau sebagian checklist buka/tutup asli Starter, bukan seluruh template",
    number: "01",
    name: "Ranel Barber Starter",
    short: "Rapikan dasar operasional.",
    description:
      "Paket dasar untuk menata kerja harian tanpa berpindah ke software yang rumit.",
    target:
      "Barber mandiri dan operator kecil yang ingin memulai rutinitas kerja yang lebih jelas.",
    problem:
      "Jika alur layanan, daftar harga, atau rutinitas buka/tutup belum terdokumentasi, mulai dari fondasi yang sederhana.",
    items: [
      "SOP dasar & penanganan pelanggan",
      "Struktur menu layanan & daftar harga",
      "Checklist buka/tutup harian",
      "Panduan pelanggan kembali berbasis izin",
    ],
    receives:
      "Panduan PDF dan template dokumen editable: SOP, menu/harga, checklist, serta alur follow-up dasar.",
    how: "Ekstrak ZIP → baca panduan mulai → simpan salinan checklist/menu → isi kondisi usaha → coba satu giliran. Anda mengisi sendiri; tailoring founder tidak termasuk.",
    useCase:
      "Mulai dari checklist buka/tutup dan menu layanan yang dipakai oleh operator setiap hari.",
    status: "Pilot — penjualan belum dibuka",
    statusNote:
      "Konten standar self-service v1.0; penjualan ditahan sampai checkout, verifikasi pembayaran, delivery aman dan gate komersial siap. Harga dasar disetujui, bukan tombol beli aktif.",
    exclusions:
      "Tidak termasuk tailoring founder, konsultasi berkelanjutan, aplikasi kasir, booking, database terpusat, atau pengiriman pesan otomatis.",
    cta: "Bahas pilot Starter",
    focus: "Fondasi kerja harian",
  },
  {
    id: "growth",
    productId: "ranel.barber.growth", sku: "RBS-GROWTH-001", version: "1.0", price: 79000,
    sellState: "HOLD_PENDING_COMMERCE",
    files: growthFiles,
    preview: "/static/previews/growth-spreadsheet.webp",
    previewAlt: "Pratinjau beberapa baris lembar Contoh fiktif workbook Rekap Growth, bukan seluruh workbook",
    number: "02",
    name: "Ranel Barber Growth",
    short: "Tinjau pelanggan dan cara kerja.",
    description:
      "Fondasi Starter, ditambah pencatatan dan rutinitas review untuk usaha yang sudah berjalan.",
    target:
      "Barber yang sudah beroperasi dan ingin meninjau kunjungan ulang serta catatan usaha dengan lebih teratur.",
    problem:
      "Jika tindak lanjut pelanggan dan catatan layanan belum mudah ditinjau, gunakan struktur pencatatan dan review sederhana.",
    items: [
      "Seluruh fondasi Starter",
      "Rekap kunjungan: template kosong + contoh fiktif",
      "Tracker repeat-visit berbasis kode lokal",
      "Panduan dua workbook dan follow-up berizin",
      "Review rutin & daftar aksi pertumbuhan",
    ],
    receives:
      "Paket Starter, dua workbook XLSX editable (rekap kunjungan dan tracker repeat-visit), review bulanan DOCX, serta panduan penggunaan. Bukan ledger pembayaran atau CRM.",
    how: "Gunakan Starter → baca Panduan workbook → lihat Contoh → isi lembar kosong → baca Ringkasan → tulis satu tindakan di Review Bulanan. Kode tracker diisi manual, bukan sinkron otomatis.",
    useCase:
      "Tinjau catatan layanan dan pelanggan kembali dalam review mingguan; uji satu langkah perbaikan, bukan semua sekaligus.",
    status: "Pilot — penjualan belum dibuka",
    statusNote:
      "Konten standar self-service v1.0, dengan template kosong dan contoh fiktif terpisah. Penjualan masih ditahan; tidak ada jaminan kunjungan atau pendapatan.",
    exclusions:
      "Tidak termasuk tailoring founder, CRM, analytics real-time, loyalty engine, POS atau kampanye pesan otomatis. Catatan dikelola operator, bukan website Ranel.",
    cta: "Bahas pilot Growth",
    focus: "Fondasi + catatan & review",
  },
  {
    id: "system",
    productId: "ranel.barber.system", sku: "RBS-SYSTEM-001", version: "1.0", price: 149000,
    sellState: "HOLD_PENDING_COMMERCE",
    files: systemFiles,
    preview: "/static/previews/system-map.webp",
    previewAlt: "Pratinjau sebagian lembar peta proses asli System, bukan seluruh dokumen",
    number: "03",
    name: "Ranel Barber System",
    short: "Petakan kebutuhan sebelum membangun.",
    description:
      "Paket dokumen operating system: seluruh Growth ditambah peta alur, customer journey, retensi, review owner dan prioritas perbaikan. Bukan software.",
    target:
      "Operator yang telah memiliki rutinitas dasar dan ingin menentukan kebutuhan sistem digital sebelum investasi pembangunan.",
    problem:
      "Jika kebutuhan digital mulai melibatkan beberapa alur, tentukan prioritas dan batas sistem agar tidak membangun fitur yang belum perlu.",
    items: [
      "Seluruh isi Growth, termasuk fondasi Starter",
      "Peta operating system & customer journey",
      "Peta retention dan proses",
      "Owner review framework",
      "Prioritas implementasi praktis",
    ],
    receives:
      "Seluruh materi Growth serta lima dokumen editable untuk peta kerja, journey, retensi, review owner dan prioritas. Bukan dashboard atau aplikasi aktif.",
    how: "Mulai dari 09 peta proses → 10 journey → 11 proses kembali berizin → 12 review pemilik → 13 prioritas. Pilih satu perbaikan dan tinjau hasil sendiri; bukan jasa pembangunan.",
    useCase:
      "Menilai apakah booking, histori pelanggan, atau laporan digital memang diperlukan sebelum menyetujui pembangunan.",
    status: "Pilot — penjualan belum dibuka",
    statusNote:
      "Konten standar self-service v1.0. System adalah peta/template yang Anda isi sendiri; fitur digital belum dibangun. Tidak termasuk aplikasi, hosting, akses demo atau tailoring founder.",
    exclusions:
      "Tailoring founder, konsultasi berkelanjutan, pembuatan dashboard, booking, database, loyalty, integrasi dan otomasi tidak termasuk harga.",
    cta: "Bahas pilot System",
    focus: "Growth + peta operating system",
  },
] as const;

// Keep bookmarked Phase 1B topics and their exact message intent; do not mis-map old kits to new tiers.
const legacyOffers = [
  {
    id: "operations",
    number: "01",
    name: "Barber Operations Starter Kit",
    short: "Rutinitas yang lebih tertata.",
    description:
      "Rancangan SOP dan checklist untuk membantu menata rutinitas harian, dari buka hingga tutup.",
    items: [
      "Checklist buka & tutup",
      "Alur layanan & daftar harga",
      "Panduan tinjauan mingguan",
    ],
  },
  {
    id: "retention",
    number: "02",
    name: "Customer Retention Kit",
    short: "Jaga hubungan, tanpa spam.",
    description:
      "Rancangan template untuk mencatat kunjungan dan menyiapkan tindak lanjut dengan persetujuan pelanggan.",
    items: [
      "Catatan kunjungan pelanggan",
      "Template follow-up opt-in",
      "Panduan rutinitas tindak lanjut",
    ],
  },
  {
    id: "tracking",
    number: "03",
    name: "Simple Business Tracking Kit",
    short: "Catatan sederhana, lebih jelas.",
    description:
      "Rancangan lembar kerja dasar untuk meninjau layanan dan pemasukan tanpa sistem yang rumit.",
    items: [
      "Rekap layanan & pemasukan",
      "Ringkasan mingguan",
      "Panduan membaca catatan usaha",
    ],
  },
] as const;

export function formatPrice(price: number) {
  return `Rp${price.toLocaleString("id-ID")}`;
}

export function selectedOffer(id?: string) {
  return (
    offers.find((offer) => offer.id === id) ??
    legacyOffers.find((offer) => offer.id === id)
  );
}

export function inquiryMessage(id?: string) {
  const offer = selectedOffer(id);
  if (offer && "price" in offer) {
    return `Halo Ranel, saya ingin membahas pilot ${offer.name} dengan harga dasar ${formatPrice(offer.price)} (sekali bayar). Boleh jelaskan isi file, cara pakai sendiri, ketentuan dan dukungannya? Saya memahami tailoring founder tidak termasuk harga. Saya memahami penjualan online belum dibuka${offer.id === "system" ? " dan System adalah paket dokumen, bukan aplikasi" : ""}.`;
  }
  return `Halo Ranel, saya ingin berdiskusi tentang ${offer ? offer.name : "rencana kit pilot untuk usaha barber"}. Boleh jelaskan rencana isi, cakupan, dan harga pilotnya?`;
}

export function whatsappDestination(
  number: unknown,
  id?: string,
): string | null {
  if (typeof number !== "string" || !/^[1-9]\d{7,14}$/.test(number))
    return null;
  const url = new URL(`https://wa.me/${number}`);
  url.searchParams.set("text", inquiryMessage(id));
  return url.href;
}

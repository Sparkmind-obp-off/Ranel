// Phase 2 pilot definitions: concrete scope, not proof of completed delivery or demand.
export const offers = [
  {
    id: "starter",
    productId: "ranel.barber.starter", sku: "RBS-STARTER-001", version: "1.0", price: 39000,
    sellState: "HOLD_PENDING_TERMS",
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
    how: "Bahas cara kerja saat ini → sepakati cakupan → siapkan dokumen pilot → coba satu rutinitas dan tinjau bersama.",
    useCase:
      "Mulai dari checklist buka/tutup dan menu layanan yang dipakai oleh operator setiap hari.",
    status: "Pilot — penjualan belum dibuka",
    statusNote:
      "Materi sumber v1.0 untuk review; penjualan ditahan sampai ketentuan dan fulfillment siap. Harga dasar disetujui, bukan checkout aktif.",
    exclusions:
      "Tidak termasuk aplikasi kasir, booking, database terpusat, atau pengiriman pesan otomatis.",
    cta: "Bahas pilot Starter",
    focus: "Fondasi kerja harian",
  },
  {
    id: "growth",
    productId: "ranel.barber.growth", sku: "RBS-GROWTH-001", version: "1.0", price: 79000,
    sellState: "HOLD_PENDING_TERMS",
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
      "Template catatan pelanggan & kunjungan",
      "Alur retensi/promo dengan persetujuan",
      "Rekap layanan & pemasukan sederhana",
      "Review rutin & daftar aksi pertumbuhan",
    ],
    receives:
      "Paket Starter, template spreadsheet editable untuk catatan/review, serta panduan follow-up dan eksperimen promo manual.",
    how: "Mulai dari fondasi Starter → pilih catatan yang diperlukan → coba follow-up berizin → review data dan pilih satu aksi berikutnya.",
    useCase:
      "Tinjau catatan layanan dan pelanggan kembali dalam review mingguan; uji satu langkah perbaikan, bukan semua sekaligus.",
    status: "Pilot — penjualan belum dibuka",
    statusNote:
      "Materi sumber v1.0 untuk review dan tailoring terbatas; penjualan masih ditahan. Hasil kunjungan atau pendapatan tidak dijamin.",
    exclusions:
      "Bukan CRM, analytics real-time, loyalty engine, atau kampanye pesan otomatis. Catatan dikelola operator, bukan website Ranel.",
    cta: "Bahas pilot Growth",
    focus: "Fondasi + catatan & review",
  },
  {
    id: "system",
    productId: "ranel.barber.system", sku: "RBS-SYSTEM-001", version: "1.0", price: 149000,
    sellState: "HOLD_PENDING_TERMS",
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
    how: "Bahas rutinitas dan bukti kebutuhan → petakan alur → tentukan prioritas → putuskan lanjut/tunda pembangunan berdasarkan evidence.",
    useCase:
      "Menilai apakah booking, histori pelanggan, atau laporan digital memang diperlukan sebelum menyetujui pembangunan.",
    status: "Pilot — penjualan belum dibuka",
    statusNote:
      "Paket dokumen sumber v1.0 untuk review; fitur digital belum dibangun. Tidak menjanjikan aplikasi, engineering, hosting atau akses demo.",
    exclusions:
      "Implementasi dashboard, booking, database, loyalty, integrasi, dan otomasi tidak termasuk Phase 2 atau diskusi konsep ini.",
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
    return `Halo Ranel, saya ingin membahas pilot ${offer.name} dengan harga dasar ${formatPrice(offer.price)} (sekali bayar). Boleh konfirmasi isi, tailoring, ketentuan, waktu, dan dukungannya? Saya memahami penjualan online belum dibuka${offer.id === "system" ? " dan System adalah paket dokumen, bukan aplikasi" : ""}.`;
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

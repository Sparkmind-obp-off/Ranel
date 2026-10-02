// Phase 2 pilot definitions: concrete scope, not proof of completed delivery or demand.
export const offers = [
  {
    id: "starter",
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
    status: "Pilot — diskusi cakupan",
    statusNote:
      "Dokumen pilot disiapkan setelah cakupan, harga, waktu, dan dukungan disepakati; bukan file siap unduh.",
    exclusions:
      "Tidak termasuk aplikasi kasir, booking, database terpusat, atau pengiriman pesan otomatis.",
    cta: "Bahas pilot Starter",
    focus: "Fondasi kerja harian",
  },
  {
    id: "growth",
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
    status: "Pilot — diskusi cakupan",
    statusNote:
      "Materi dan format disiapkan sesuai kesepakatan pilot; hasil kunjungan atau pendapatan tidak dijamin.",
    exclusions:
      "Bukan CRM, analytics real-time, loyalty engine, atau kampanye pesan otomatis. Catatan dikelola operator, bukan website Ranel.",
    cta: "Bahas pilot Growth",
    focus: "Fondasi + catatan & review",
  },
  {
    id: "system",
    number: "03",
    name: "Ranel Barber System",
    short: "Petakan kebutuhan sebelum membangun.",
    description:
      "Diskusi konsep sistem digital untuk operator yang membutuhkan alur kerja lebih terstruktur, bukan aplikasi yang sudah tersedia.",
    target:
      "Operator yang telah memiliki rutinitas dasar dan ingin menentukan kebutuhan sistem digital sebelum investasi pembangunan.",
    problem:
      "Jika kebutuhan digital mulai melibatkan beberapa alur, tentukan prioritas dan batas sistem agar tidak membangun fitur yang belum perlu.",
    items: [
      "Konsep dashboard & pelaporan",
      "Peta inquiry/booking dan alur pelanggan",
      "Kebutuhan database & histori pelanggan",
      "Prioritas konsep loyalty & otomasi",
    ],
    receives:
      "Dokumen pemetaan kebutuhan: alur operasional, prioritas kemampuan, dan batas ruang lingkup. Bukan dashboard atau aplikasi aktif.",
    how: "Bahas rutinitas dan bukti kebutuhan → petakan alur → tentukan prioritas → putuskan lanjut/tunda pembangunan berdasarkan evidence.",
    useCase:
      "Menilai apakah booking, histori pelanggan, atau laporan digital memang diperlukan sebelum menyetujui pembangunan.",
    status: "Konsep — belum tersedia",
    statusNote:
      "Fitur digital belum dibangun. Diskusi ini tidak menjanjikan aplikasi, jadwal engineering, atau akses demo.",
    exclusions:
      "Implementasi dashboard, booking, database, loyalty, integrasi, dan otomasi tidak termasuk Phase 2 atau diskusi konsep ini.",
    cta: "Bahas konsep System",
    focus: "Peta kebutuhan digital",
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

export function selectedOffer(id?: string) {
  return (
    offers.find((offer) => offer.id === id) ??
    legacyOffers.find((offer) => offer.id === id)
  );
}

export function inquiryMessage(id?: string) {
  const offer = selectedOffer(id);
  if (offer?.id === "system") {
    return `Halo Ranel, saya ingin membahas konsep ${offer.name}. Boleh diskusikan kebutuhan, pemetaan alur, dan batas cakupannya? Saya memahami aplikasi dan fitur digitalnya belum tersedia.`;
  }
  if (offer?.id === "starter" || offer?.id === "growth") {
    return `Halo Ranel, saya tertarik dengan pilot ${offer.name}. Boleh jelaskan isi yang diterima, cakupan, harga pilot, waktu, dan dukungannya sebelum kesepakatan?`;
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

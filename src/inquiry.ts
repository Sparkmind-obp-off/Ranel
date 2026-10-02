export const offers = [
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
  return offers.find((offer) => offer.id === id);
}

export function inquiryMessage(id?: string) {
  const offer = selectedOffer(id);
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

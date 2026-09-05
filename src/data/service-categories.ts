export type ServiceCategory = {
  name: string;
  description: string;
  icon: string;
  accent: string;
  count: number;
  tags: string[];
  items: ServiceItem[];
};

export type ServiceItem = {
  title: string;
  description: string;
  duration: string;
  icon: string;
};

export const serviceCategories: ServiceCategory[] = [
  { name: "Kependudukan", description: "KTP, KK, alamat, domisili", icon: "▣", accent: "blue", count: 12, tags: ["KTP", "KK", "Domisili"], items: [{ title: "Pembuatan KTP Baru", description: "Untuk WNI yang baru pertama kali membuat KTP", duration: "3–7 hari kerja", icon: "▣" }, { title: "Perubahan Alamat KTP", description: "Update alamat setelah pindah domisili", duration: "5–10 hari kerja", icon: "⌖" }, { title: "Penggantian KTP Hilang", description: "Proses penggantian KTP yang hilang atau rusak", duration: "3–5 hari kerja", icon: "↻" }, { title: "Pembuatan Kartu Keluarga", description: "Untuk keluarga baru yang belum memiliki KK", duration: "7–14 hari kerja", icon: "♟" }] },
  { name: "Kesehatan", description: "BPJS, vaksinasi, rekam medis", icon: "✚", accent: "mint", count: 8, tags: ["BPJS", "Vaksinasi", "Kesehatan"], items: [{ title: "Pendaftaran BPJS Kesehatan", description: "Daftar kepesertaan untuk diri dan keluarga", duration: "1–3 hari kerja", icon: "✚" }, { title: "Perubahan Faskes", description: "Pindah fasilitas kesehatan tingkat pertama", duration: "1 hari kerja", icon: "⌖" }, { title: "Kartu BPJS Hilang", description: "Dapatkan kembali informasi kartu peserta", duration: "Hari yang sama", icon: "↻" }] },
  { name: "Pendidikan", description: "Beasiswa, izin sekolah, ijazah", icon: "◆", accent: "orange", count: 9, tags: ["Sekolah", "Beasiswa", "Ijazah"], items: [{ title: "Pendaftaran Sekolah", description: "Temukan persiapan dan jalur pendaftaran", duration: "Sesuai jadwal", icon: "◆" }, { title: "Pengajuan Beasiswa", description: "Cari dokumen untuk pengajuan bantuan pendidikan", duration: "Sesuai program", icon: "✦" }, { title: "Legalisir Ijazah", description: "Siapkan kebutuhan legalisasi dokumen pendidikan", duration: "1–7 hari kerja", icon: "▤" }] },
  { name: "Pajak", description: "NPWP, SPT, PBB, pajak kendaraan", icon: "▥", accent: "violet", count: 7, tags: ["NPWP", "SPT", "PBB"], items: [{ title: "Pendaftaran NPWP", description: "Buat identitas wajib pajak untuk kebutuhanmu", duration: "1–3 hari kerja", icon: "▥" }, { title: "Lapor SPT Tahunan", description: "Pahami persiapan sebelum melaporkan SPT", duration: "Sesuai periode", icon: "▤" }, { title: "Pembayaran PBB", description: "Temukan kanal dan persiapan pembayaran PBB", duration: "Hari yang sama", icon: "▣" }] },
  { name: "Kendaraan", description: "SIM, STNK, perpanjangan, mutasi", icon: "▰", accent: "yellow", count: 6, tags: ["SIM", "STNK", "Mutasi"], items: [{ title: "Perpanjangan SIM", description: "Perpanjang masa berlaku SIM kendaraan", duration: "1–3 hari kerja", icon: "▰" }, { title: "Perpanjangan STNK", description: "Siapkan kebutuhan pembayaran pajak kendaraan", duration: "Hari yang sama", icon: "▥" }, { title: "Mutasi Kendaraan", description: "Pindahkan data kendaraan antar wilayah", duration: "7–14 hari kerja", icon: "⌖" }] },
  { name: "Perizinan", description: "IMB, izin usaha, HO, SIUP", icon: "▤", accent: "rose", count: 11, tags: ["Usaha", "IMB", "SIUP"], items: [{ title: "Perizinan Usaha", description: "Mulai memahami izin dasar untuk usaha baru", duration: "Sesuai jenis usaha", icon: "▤" }, { title: "Izin Mendirikan Bangunan", description: "Pahami persiapan dokumen dan proses pengajuan", duration: "Sesuai wilayah", icon: "⌂" }, { title: "Izin Operasional", description: "Cari kebutuhan izin untuk menjalankan kegiatan", duration: "Sesuai sektor", icon: "✓" }] },
];
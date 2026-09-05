export type ServiceCategory = {
  name: string;
  description: string;
  icon: string;
  accent: string;
  count: number;
  tags: string[];
};

export const serviceCategories: ServiceCategory[] = [
  { name: "Kependudukan", description: "KTP, KK, alamat, domisili", icon: "▣", accent: "blue", count: 12, tags: ["KTP", "KK", "Domisili"] },
  { name: "Kesehatan", description: "BPJS, vaksinasi, rekam medis", icon: "✚", accent: "mint", count: 8, tags: ["BPJS", "Vaksinasi", "Kesehatan"] },
  { name: "Pendidikan", description: "Beasiswa, izin sekolah, ijazah", icon: "◆", accent: "orange", count: 9, tags: ["Sekolah", "Beasiswa", "Ijazah"] },
  { name: "Pajak", description: "NPWP, SPT, PBB, pajak kendaraan", icon: "▥", accent: "violet", count: 7, tags: ["NPWP", "SPT", "PBB"] },
  { name: "Kendaraan", description: "SIM, STNK, perpanjangan, mutasi", icon: "▰", accent: "yellow", count: 6, tags: ["SIM", "STNK", "Mutasi"] },
  { name: "Perizinan", description: "IMB, izin usaha, HO, SIUP", icon: "▤", accent: "rose", count: 11, tags: ["Usaha", "IMB", "SIUP"] },
];
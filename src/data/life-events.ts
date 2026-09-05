export type LifeEvent = {
  title: string;
  description: string;
  icon: string;
  accent: string;
  tasks: number;
};

export const lifeEvents: LifeEvent[] = [
  { title: "Pindah tempat tinggal", description: "Perbarui hal-hal penting setelah pindah rumah atau kota.", icon: "⌂", accent: "blue", tasks: 8 },
  { title: "Memulai pekerjaan baru", description: "Siapkan administrasi dan kebutuhan di tempat kerja baru.", icon: "✦", accent: "orange", tasks: 6 },
  { title: "Menikah", description: "Susun urusan setelah perubahan status keluarga.", icon: "♡", accent: "rose", tasks: 7 },
  { title: "Memiliki anak", description: "Temukan langkah penting untuk menyambut anggota keluarga baru.", icon: "✺", accent: "green", tasks: 9 },
  { title: "Memulai sekolah", description: "Atur kebutuhan administrasi untuk perjalanan pendidikan.", icon: "▤", accent: "violet", tasks: 5 },
  { title: "Merawat keluarga", description: "Kelola kebutuhan administratif saat mendampingi keluarga.", icon: "☼", accent: "teal", tasks: 4 },
];
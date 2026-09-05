import { ServiceCategory, ServiceItem } from "@/lib/supabase/types";

export type { ServiceCategory, ServiceItem };

export const serviceCategories: ServiceCategory[] = [
  {
    id: "sc-1",
    slug: "kependudukan",
    name: "Kependudukan",
    description: "KTP-el, Kartu Keluarga, surat pindah, akta sipil",
    icon: "IdCard",
    accent: "blue",
    count: 12,
    order_index: 1,
    tags: ["KTP", "KK", "Domisili", "Dukcapil"],
    items: [
      {
        id: "si-1",
        slug: "pembuatan-ktp-baru",
        title: "Pembuatan KTP Elektronik Baru",
        description: "Perekaman biometrik dan pencetakan KTP-el untuk usia 17 tahun ke atas.",
        duration: "3–7 hari kerja",
        requirements: ["Fotokopi Kartu Keluarga", "Usia genap 17 tahun", "Surat pengantar RT/RW (opsional)"],
        official_url: "https://dukcapil.kemendagri.go.id"
      },
      {
        id: "si-2",
        slug: "perubahan-alamat-ktp",
        title: "Perubahan Alamat & Surat Pindah (SKPWNI)",
        description: "Update alamat setelah pindah domisili antar kab/kota/provinsi.",
        duration: "5–10 hari kerja",
        requirements: ["KTP Asli", "Kartu Keluarga Asli", "Alamat Tujuan Lengkap", "Formulir F-1.08"],
        official_url: "https://layananonline.dukcapil.kemendagri.go.id"
      },
      {
        id: "si-3",
        slug: "penggantian-ktp-hilang",
        title: "Penggantian KTP Hilang / Rusak",
        description: "Proses cetak ulang KTP yang hilang atau fisik kartu rusak tanpa rekam ulang.",
        duration: "1–3 hari kerja",
        requirements: ["Surat Kehilangan dari Kepolisian", "Fotokopi KK", "Fisik KTP rusak (jika rusak)"],
        official_url: "https://dukcapil.kemendagri.go.id"
      },
      {
        id: "si-4",
        slug: "pembuatan-kartu-keluarga",
        title: "Penerbitan / Pemecahan Kartu Keluarga",
        description: "Penerbitan KK baru untuk pasangan baru menikah atau perubahan data.",
        duration: "3–5 hari kerja",
        requirements: ["Buku Nikah / Akta Perkawinan", "KK Asli orang tua", "KTP Suami & Istri"],
        official_url: "https://dukcapil.kemendagri.go.id"
      }
    ]
  },
  {
    id: "sc-2",
    slug: "kesehatan",
    name: "Kesehatan",
    description: "BPJS Kesehatan, faskes rujukan, jaminan persalinan",
    icon: "HeartPulse",
    accent: "mint",
    count: 8,
    order_index: 2,
    tags: ["BPJS", "Faskes", "Kesehatan", "JKN"],
    items: [
      {
        id: "si-5",
        slug: "pendaftaran-bpjs-kesehatan",
        title: "Pendaftaran BPJS Kesehatan Mandiri",
        description: "Daftar kepesertaan online via Mobile JKN untuk diri dan keluarga.",
        duration: "1 hari kerja",
        requirements: ["Kartu Keluarga", "KTP-el", "Nomor Rekening Bank", "No HP & Email"],
        official_url: "https://bpjs-kesehatan.go.id"
      },
      {
        id: "si-6",
        slug: "perubahan-faskes-bpjs",
        title: "Perubahan Fasilitas Kesehatan (Faskes 1)",
        description: "Pindah klinik atau puskesmas rujukan pertama sesuai domisili.",
        duration: "Instan via Mobile JKN",
        requirements: ["Nomor Kartu BPJS / NIK", "Minimal 3 bulan di faskes lama"],
        official_url: "https://bpjs-kesehatan.go.id"
      },
      {
        id: "si-7",
        slug: "kartu-bpjs-digital",
        title: "Aktivasi KIS Digital (Aplikasi Mobile JKN)",
        description: "Akses kartu identitas peserta secara digital tanpa kartu fisik.",
        duration: "Instan",
        requirements: ["Nomor NIK KTP", "No HP aktif terdaftar di BPJS"],
        official_url: "https://bpjs-kesehatan.go.id"
      }
    ]
  },
  {
    id: "sc-3",
    slug: "pendidikan",
    name: "Pendidikan",
    description: "PPDB sekolah, beasiswa, KIP Kuliah, ijazah",
    icon: "GraduationCap",
    accent: "orange",
    count: 9,
    order_index: 3,
    tags: ["PPDB", "Beasiswa", "Ijazah", "KIP"],
    items: [
      {
        id: "si-8",
        slug: "pendaftaran-ppdb-sekolah",
        title: "Pendaftaran PPDB Sekolah Negeri",
        description: "Persiapan akun dan verifikasi jalur zonasi, prestasi, atau afirmasi.",
        duration: "Sesuai jadwal dinas",
        requirements: ["NISN", "Kartu Keluarga", "Akta Lahir", "Nilai Rapor"],
        official_url: "https://siap-ppdb.com"
      },
      {
        id: "si-9",
        slug: "pengajuan-kip-kuliah",
        title: "Pendaftaran Akun KIP Kuliah",
        description: "Bantuan biaya pendidikan tinggi dari Kemendikbudristek.",
        duration: "Sesuai gelombang",
        requirements: ["NIK", "NISN", "NPSN", "Bukti Ekonomi / Terdaftar DTKS"],
        official_url: "https://kip-kuliah.kemdikbud.go.id"
      },
      {
        id: "si-10",
        slug: "legalisir-ijazah",
        title: "Legalisir Ijazah & Pengesahan Dokumen",
        description: "Legalisasi dokumen ijazah di sekolah asal atau Dinas Pendidikan.",
        duration: "1–3 hari kerja",
        requirements: ["Ijazah Asli", "Fotokopi Ijazah (3-5 lembar)"],
        official_url: "#"
      }
    ]
  },
  {
    id: "sc-4",
    slug: "pajak",
    name: "Pajak",
    description: "NPWP pribadi/badan, SPT tahunan di DJP Online, PBB",
    icon: "Receipt",
    accent: "violet",
    count: 7,
    order_index: 4,
    tags: ["NPWP", "SPT", "PBB", "DJP"],
    items: [
      {
        id: "si-11",
        slug: "pendaftaran-npwp-online",
        title: "Pendaftaran NPWP Pribadi Online",
        description: "Buat identitas wajib pajak orang pribadi secara online di DJP.",
        duration: "1 hari kerja",
        requirements: ["NIK KTP-el", "Nomor Kartu Keluarga", "Email & No HP aktif"],
        official_url: "https://pajak.go.id"
      },
      {
        id: "si-12",
        slug: "pelaporan-spt-tahunan",
        title: "Pelaporan SPT Tahunan Pribadi (E-Filing)",
        description: "Lapor pajak tahunan menggunakan formulir 1770 S atau 1770 SS.",
        duration: "15–30 menit",
        requirements: ["EFIN", "Bukti Potong 1721-A1/A2", "Daftar Harta"],
        official_url: "https://djponline.pajak.go.id"
      },
      {
        id: "si-13",
        slug: "pembayaran-pbb",
        title: "Pembayaran Pajak Bumi & Bangunan (PBB)",
        description: "Cek tagihan SPPT PBB dan pembayaran via e-channel perbankan.",
        duration: "Instan",
        requirements: ["NOP (Nomor Objek Pajak)", "Tahun Pajak"],
        official_url: "#"
      }
    ]
  },
  {
    id: "sc-5",
    slug: "kendaraan",
    name: "Kendaraan",
    description: "SIM A/C online di Korlantas, bayar STNK (Signal), BPKB",
    icon: "Car",
    accent: "yellow",
    count: 6,
    order_index: 5,
    tags: ["SIM", "STNK", "Samsat", "Korlantas"],
    items: [
      {
        id: "si-14",
        slug: "perpanjangan-sim-online",
        title: "Perpanjangan SIM A & C Online",
        description: "Perpanjang masa berlaku SIM via aplikasi resmi Digital Korlantas Polri.",
        duration: "2–4 hari kerja",
        requirements: ["SIM Lama", "E-KTP", "Tes Kesehatan Rikkes", "Tes Psikologi Eppsi"],
        official_url: "https://digitalkorlantas.id"
      },
      {
        id: "si-15",
        slug: "pembayaran-pajak-stnk",
        title: "Bayar Pajak Kendaraan Tahunan (Signal)",
        description: "Pengesahan STNK tahunan daring tanpa harus datang ke Samsat.",
        duration: "Hari yang sama",
        requirements: ["E-KTP Pemilik", "Nomor Polisi (Plat)", "5 digit nomor rangka"],
        official_url: "https://samsatdigital.id"
      }
    ]
  },
  {
    id: "sc-6",
    slug: "perizinan",
    name: "Perizinan",
    description: "NIB OSS RBA, sertifikat halal, izin edar PIRT/BPOM",
    icon: "Building2",
    accent: "rose",
    count: 11,
    order_index: 6,
    tags: ["NIB", "OSS", "UMKM", "Halal"],
    items: [
      {
        id: "si-16",
        slug: "pembuatan-nib-oss",
        title: "Penerbitan NIB (Nomor Induk Berusaha) OSS",
        description: "Legalitas izin usaha tunggal instan bagi pelaku UMKM.",
        duration: "15–30 menit",
        requirements: ["KTP Pemilik Usaha", "NPWP Pribadi", "Rincian Bidang Usaha KBLI"],
        official_url: "https://oss.go.id"
      },
      {
        id: "si-17",
        slug: "sertifikasi-halal-sehati",
        title: "Pengajuan Sertifikat Halal Gratis (SEHATI)",
        description: "Sertifikasi halal self-declare untuk produk makanan dan minuman UMKM.",
        duration: "14–21 hari kerja",
        requirements: ["NIB Aktif", "Daftar Bahan Baku Halal", "Alur Produksi"],
        official_url: "https://ptsp.halal.go.id"
      }
    ]
  }
];
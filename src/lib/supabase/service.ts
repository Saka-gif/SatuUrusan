import { getSupabase } from "./client";
import { UserRoadmap, RoadmapTask, LifeEvent, ServiceCategory, FaqItem } from "./types";
import { lifeEvents as defaultLifeEvents } from "@/data/life-events";
import { serviceCategories as defaultServiceCategories } from "@/data/service-categories";

const LOCAL_ROADMAPS_KEY = "satuurusan_roadmaps_v2";

// Default template roadmap tasks for life events
export const eventTaskTemplates: Record<string, Array<{ title: string; desc: string; cat: string; dur: string; reqs: string[]; url: string }>> = {
  "pindah-domisili": [
    {
      title: "Urus Surat Pindah (SKPWNI) dari Daerah Asal",
      desc: "Ajukan surat keterangan pindah WNI secara online atau melalui Disdukcapil domisili asal.",
      cat: "Kependudukan",
      dur: "3-5 hari kerja",
      reqs: ["KTP Asli", "Kartu Keluarga Asli", "Alamat Tujuan Lengkap"],
      url: "https://layananonline.dukcapil.kemendagri.go.id"
    },
    {
      title: "Cetak Kartu Keluarga (KK) & KTP-el di Wilayah Baru",
      desc: "Serahkan SKPWNI ke Disdukcapil / Kecamatan baru untuk update KK dan cetak KTP dengan alamat baru.",
      cat: "Kependudukan",
      dur: "3-7 hari kerja",
      reqs: ["SKPWNI Asli", "KTP Lama", "Surat Pengantar RT/RW (opsional)"],
      url: "https://dukcapil.kemendagri.go.id"
    },
    {
      title: "Pindahkan Fasilitas Kesehatan (Faskes 1) BPJS Kesehatan",
      desc: "Ubah klinik / puskesmas rujukan pertama agar dekat dengan tempat tinggal baru via Mobile JKN.",
      cat: "Kesehatan",
      dur: "Instan (Aktif tgl 1 bulan depan)",
      reqs: ["Nomor Kartu BPJS / NIK", "Aplikasi Mobile JKN"],
      url: "https://bpjs-kesehatan.go.id"
    },
    {
      title: "Perbarui Alamat NPWP di DJP Online",
      desc: "Lakukan pembaruan profil dan pindah KPP terdaftar jika pindah kota/kabupaten.",
      cat: "Pajak",
      dur: "1-2 hari kerja",
      reqs: ["KTP dengan alamat baru", "Nomor NPWP", "Akun DJP Online"],
      url: "https://djponline.pajak.go.id"
    },
    {
      title: "Mutasi Berkas Kendaraan & Ganti Plat (Jika Beda Provinsi)",
      desc: "Cabut berkas kendaraan di Samsat asal dan daftarkan di Samsat tujuan.",
      cat: "Kendaraan",
      dur: "7-14 hari kerja",
      reqs: ["BPKB Asli", "STNK Asli", "KTP Baru Pemilik", "Cek Fisik Kendaraan"],
      url: "https://samsatdigital.id"
    },
    {
      title: "Lapor RT/RW dan Pengurus Lingkungan Baru",
      desc: "Serahkan fotokopi KK & KTP baru kepada pengurus RT setempat untuk pencatatan warga.",
      cat: "Sosial",
      dur: "1 hari kerja",
      reqs: ["Fotokopi KK Baru", "Fotokopi KTP Baru"],
      url: "#"
    }
  ],
  "pekerjaan-baru": [
    {
      title: "Pastikan NPWP Aktif & Terdaftar",
      desc: "Cek status keaktifan NPWP untuk kebutuhan potongan PPh 21 oleh HRD perusahaan.",
      cat: "Pajak",
      dur: "1 hari kerja",
      reqs: ["NIK KTP", "Nomor NPWP"],
      url: "https://pajak.go.id"
    },
    {
      title: "Daftarkan / Alihkan BPJS Ketenagakerjaan",
      desc: "Serahkan nomor KPJ lama ke perusahaan baru atau buat nomor kepesertaan baru.",
      cat: "Ketenagakerjaan",
      dur: "1-3 hari kerja",
      reqs: ["KTP", "Nomor KPJ (jika ada)"],
      url: "https://bpjsketenagakerjaan.go.id"
    },
    {
      title: "Buka Rekening Payroll Bank",
      desc: "Siapkan rekening bank khusus sesuai instruksi payroll kantor.",
      cat: "Perbankan",
      dur: "Hari yang sama",
      reqs: ["KTP", "NPWP", "Surat Keterangan Kerja / Offering Letter"],
      url: "#"
    },
    {
      title: "Siapkan Surat Keterangan Catatan Kepolisian (SKCK)",
      desc: "Buat SKCK online via aplikasi Presisi Polri jika dipersyaratkan oleh perusahaan.",
      cat: "Hukum",
      dur: "1-2 hari kerja",
      reqs: ["KTP", "KK", "Akta Lahir", "Rumus Sidik Jari"],
      url: "https://skck.polri.go.id"
    }
  ],
  "menikah": [
    {
      title: "Pendaftaran Berkas Nikah di Simkah Kemenag / Disdukcapil",
      desc: "Daftarkan pernikahan online via SIMKAH (Muslim) atau Catatan Sipil (Non-Muslim) minimal H-10 kerja.",
      cat: "Kependudukan",
      dur: "10-14 hari kerja",
      reqs: ["Surat N1, N2, N4 dari Kelurahan", "KTP & KK Calon Pengantin", "Ijazah Terakhir", "Pasfoto 2x3 & 4x6 latar biru"],
      url: "https://simkah4.kemenag.go.id"
    },
    {
      title: "Pemeriksaan Kesehatan Pranikah & Suntik TT",
      desc: "Lakukan skrining pranikah di Puskesmas untuk mendapatkan sertifikat ELSIMIL.",
      cat: "Kesehatan",
      dur: "1 hari kerja",
      reqs: ["KTP", "Kartu BPJS"],
      url: "https://elsimil.bkkbn.go.id"
    },
    {
      title: "Pecah Kartu Keluarga & Buat KK Baru Suami-Istri",
      desc: "Setelah akad/pemberkatan, pisahkan diri dari KK orang tua dan terbitkan KK mandiri baru.",
      cat: "Kependudukan",
      dur: "3-5 hari kerja",
      reqs: ["Buku Nikah / Akta Perkawinan", "KK Asli Orang Tua Kedua Belah Pihak"],
      url: "https://dukcapil.kemendagri.go.id"
    },
    {
      title: "Update Status Perkawinan di KTP-el",
      desc: "Ganti status di KTP dari 'Belum Kawin' menjadi 'Kawin' di Disdukcapil/Kecamatan.",
      cat: "Kependudukan",
      dur: "3-5 hari kerja",
      reqs: ["KK Baru", "Buku Nikah Asli", "KTP Lama"],
      url: "https://dukcapil.kemendagri.go.id"
    },
    {
      title: "Gabung Kepesertaan BPJS Kesehatan Suami-Istri",
      desc: "Satukan tanggungan BPJS Kesehatan dalam satu nomor KK untuk mempermudah iuran keluarga.",
      cat: "Kesehatan",
      dur: "1-2 hari kerja",
      reqs: ["KK Baru", "Kartu BPJS Masing-masing"],
      url: "https://bpjs-kesehatan.go.id"
    }
  ],
  "memiliki-anak": [
    {
      title: "Urus Surat Keterangan Kelahiran dari RS / Bidan",
      desc: "Dapatkan surat keterangan lahir resmi dari fasilitas medis tempat persalinan.",
      cat: "Kesehatan",
      dur: "Hari persalinan",
      reqs: ["KTP & KK Orang Tua"],
      url: "#"
    },
    {
      title: "Daftarkan Akta Kelahiran & Tambah Anak ke KK",
      desc: "Ajukan penerbitan NIK bayi, penambahan ke Kartu Keluarga, dan penerbitan Kutipan Akta Kelahiran.",
      cat: "Kependudukan",
      dur: "3-5 hari kerja",
      reqs: ["Surat Lahir RS", "Buku Nikah Asli", "KTP Orang Tua", "KK Asli"],
      url: "https://layananonline.dukcapil.kemendagri.go.id"
    },
    {
      title: "Daftarkan Bayi Baru Lahir ke BPJS Kesehatan",
      desc: "Daftarkan bayi maksimal 28 hari sejak lahir agar seluruh biaya pengobatan/vaksin tercover.",
      cat: "Kesehatan",
      dur: "1 hari kerja",
      reqs: ["Surat Keterangan Lahir", "Kartu BPJS Ibu", "KK"],
      url: "https://bpjs-kesehatan.go.id"
    },
    {
      title: "Buat Kartu Identitas Anak (KIA)",
      desc: "Cetak KTP khusus anak usia 0-17 tahun untuk kebutuhan administratif & perbankan anak.",
      cat: "Kependudukan",
      dur: "3-5 hari kerja",
      reqs: ["Fotokopi Akta Lahir", "Fotokopi KK Orang Tua", "Pasfoto anak (usia > 5 thn)"],
      url: "https://dukcapil.kemendagri.go.id"
    }
  ],
  "memulai-usaha": [
    {
      title: "Buat Akun dan Terbitkan NIB di OSS RBA",
      desc: "Daftarkan Nomor Induk Berusaha secara instan dan gratis melalui Kementerian Investasi / BKPM.",
      cat: "Perizinan",
      dur: "15-30 menit",
      reqs: ["NIK KTP Pemilik", "NPWP Pribadi", "Email & No HP Aktif", "Rincian Bidang Usaha (KBLI)"],
      url: "https://oss.go.id"
    },
    {
      title: "Pengajuan Sertifikasi Halal Gratis (SEHATI)",
      desc: "Ajukan sertifikat halal self-declare via Sihalal BPJPH untuk usaha makanan/minuman.",
      cat: "Perizinan",
      dur: "14-21 hari kerja",
      reqs: ["NIB Aktif", "Daftar Bahan Baku Halal", "Proses Produksi Sederhana"],
      url: "https://ptsp.halal.go.id"
    },
    {
      title: "Daftar Izin Edar SPP-PIRT (Jika Produk Pangan Olahan)",
      desc: "Dapatkan izin edar industri rumah tangga melalui Dinas Kesehatan / PTSP setempat.",
      cat: "Kesehatan",
      dur: "7-14 hari kerja",
      reqs: ["NIB", "Sertifikat PKP (Penyuluhan Keamanan Pangan)", "Rancangan Label Kemasan"],
      url: "https://sppirt.pom.go.id"
    },
    {
      title: "Buka Rekening Giro / Rekening Bisnis Khusus Usaha",
      desc: "Pisahkan keuangan pribadi dan usaha dengan membuka rekening bisnis atas nama usaha/pemilik.",
      cat: "Keuangan",
      dur: "1 hari kerja",
      reqs: ["NIB", "NPWP", "KTP"],
      url: "#"
    }
  ],
  "pendidikan": [
    {
      title: "Persiapan Akun PPDB Online Sekolah",
      desc: "Buat dan verifikasi akun PPDB pada portal dinas pendidikan kota/provinsi setempat.",
      cat: "Pendidikan",
      dur: "Sesuai jadwal PPDB",
      reqs: ["NISN", "Kartu Keluarga (minimal 1 tahun terbit)", "Akta Kelahiran", "Rapor"],
      url: "https://siap-ppdb.com"
    },
    {
      title: "Legalisir Ijazah & Surat Keterangan Lulus",
      desc: "Lakukan legalisasi ijazah di sekolah asal atau Dinas Pendidikan jika sekolah sudah tutup.",
      cat: "Pendidikan",
      dur: "1-3 hari kerja",
      reqs: ["Ijazah Asli", "Fotokopi Ijazah (3-5 lembar)"],
      url: "#"
    },
    {
      title: "Pendaftaran Akun KIP Kuliah (Bantuan Pendidikan Tinggi)",
      desc: "Daftar akun KIP Kuliah untuk lulusan SMA/SMK yang ingin melanjutkan ke perguruan tinggi.",
      cat: "Beasiswa",
      dur: "Sesuai gelombang seleksi",
      reqs: ["NIK", "NISN", "NPSN", "Bukti Penghasilan Orang Tua / Terdaftar DTKS"],
      url: "https://kip-kuliah.kemdikbud.go.id"
    }
  ]
};

// Local storage helpers
function getLocalRoadmaps(): UserRoadmap[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_ROADMAPS_KEY);
    if (!raw) {
      // Seed default roadmap
      const defaultRoadmap = createDefaultRoadmap("pindah-domisili", "Pindah Tempat Tinggal");
      saveLocalRoadmaps([defaultRoadmap]);
      return [defaultRoadmap];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load local roadmaps:", err);
    return [];
  }
}

function saveLocalRoadmaps(roadmaps: UserRoadmap[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_ROADMAPS_KEY, JSON.stringify(roadmaps));
  } catch (err) {
    console.error("Failed to save local roadmaps:", err);
  }
}

export function createDefaultRoadmap(eventSlug: string, eventTitle: string): UserRoadmap {
  const templates = eventTaskTemplates[eventSlug] || eventTaskTemplates["pindah-domisili"];
  const roadmapId = `local_rm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  
  const tasks: RoadmapTask[] = templates.map((t, idx) => ({
    id: `task_${Date.now()}_${idx}`,
    roadmap_id: roadmapId,
    title: t.title,
    description: t.desc,
    category: t.cat,
    duration: t.dur,
    requirements: t.reqs,
    official_url: t.url,
    status: idx === 0 ? "in_progress" : "pending",
    is_completed: false,
    order_index: idx + 1,
    notes: ""
  }));

  return {
    id: roadmapId,
    title: `Peta Urusan: ${eventTitle}`,
    description: `Daftar langkah prioritas dan persiapan dokumen untuk ${eventTitle}`,
    status: "in_progress",
    progress_pct: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tasks
  };
}

// Service Functions
export async function fetchUserRoadmaps(): Promise<UserRoadmap[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data: roadmaps, error } = await supabase
        .from("user_roadmaps")
        .select(`
          *,
          tasks:roadmap_tasks(*)
        `)
        .order("created_at", { ascending: false });

      if (!error && roadmaps && roadmaps.length > 0) {
        return roadmaps as UserRoadmap[];
      }
    } catch (e) {
      console.warn("Supabase fetch failed, using local storage:", e);
    }
  }
  return getLocalRoadmaps();
}

export async function createUserRoadmap(eventSlug: string, eventTitle: string): Promise<UserRoadmap> {
  const newRoadmap = createDefaultRoadmap(eventSlug, eventTitle);
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (user?.user) {
        const { data: rmData, error: rmError } = await supabase
          .from("user_roadmaps")
          .insert({
            user_id: user.user.id,
            title: newRoadmap.title,
            description: newRoadmap.description,
            status: "in_progress",
            progress_pct: 0
          })
          .select()
          .single();

        if (!rmError && rmData) {
          const tasksToInsert = (newRoadmap.tasks || []).map((t) => ({
            roadmap_id: rmData.id,
            title: t.title,
            description: t.description,
            category: t.category,
            duration: t.duration,
            requirements: t.requirements,
            official_url: t.official_url,
            status: t.status,
            is_completed: t.is_completed,
            order_index: t.order_index
          }));

          const { data: insertedTasks } = await supabase
            .from("roadmap_tasks")
            .insert(tasksToInsert)
            .select();

          return {
            ...rmData,
            tasks: insertedTasks || []
          };
        }
      }
    } catch (e) {
      console.warn("Supabase insert failed, falling back to local storage:", e);
    }
  }

  // Local storage fallback
  const current = getLocalRoadmaps();
  const updated = [newRoadmap, ...current];
  saveLocalRoadmaps(updated);
  return newRoadmap;
}

export async function toggleTaskCompletion(
  roadmapId: string, 
  taskId: string, 
  isCompleted: boolean
): Promise<{ roadmap: UserRoadmap; completed: boolean }> {
  const supabase = getSupabase();

  if (supabase) {
    try {
      await supabase
        .from("roadmap_tasks")
        .update({
          is_completed: isCompleted,
          status: isCompleted ? "completed" : "pending",
          completed_at: isCompleted ? new Date().toISOString() : null
        })
        .eq("id", taskId);

      const { data: updatedRm } = await supabase
        .from("user_roadmaps")
        .select(`*, tasks:roadmap_tasks(*)`)
        .eq("id", roadmapId)
        .single();

      if (updatedRm) {
        return { roadmap: updatedRm as UserRoadmap, completed: isCompleted };
      }
    } catch (e) {
      console.warn("Supabase task update failed, using local storage:", e);
    }
  }

  // Local storage update
  const roadmaps = getLocalRoadmaps();
  const targetRm = roadmaps.find((r) => r.id === roadmapId);
  if (!targetRm || !targetRm.tasks) {
    throw new Error("Roadmap not found");
  }

  const targetTask = targetRm.tasks.find((t) => t.id === taskId);
  if (targetTask) {
    targetTask.is_completed = isCompleted;
    targetTask.status = isCompleted ? "completed" : "pending";
    targetTask.completed_at = isCompleted ? new Date().toISOString() : null;
  }

  const completedCount = targetRm.tasks.filter((t) => t.is_completed).length;
  targetRm.progress_pct = Math.round((completedCount / targetRm.tasks.length) * 100);
  targetRm.status = targetRm.progress_pct === 100 ? "completed" : "in_progress";
  targetRm.updated_at = new Date().toISOString();

  saveLocalRoadmaps(roadmaps);
  return { roadmap: targetRm, completed: isCompleted };
}

export async function deleteUserRoadmap(roadmapId: string): Promise<void> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from("user_roadmaps").delete().eq("id", roadmapId);
    } catch (e) {
      console.warn("Supabase delete failed, removing locally:", e);
    }
  }
  const roadmaps = getLocalRoadmaps();
  const filtered = roadmaps.filter((r) => r.id !== roadmapId);
  saveLocalRoadmaps(filtered);
}

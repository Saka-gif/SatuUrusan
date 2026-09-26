"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { 
  fetchUserRoadmaps, 
  createUserRoadmap, 
  toggleTaskCompletion, 
  deleteUserRoadmap 
} from "@/lib/supabase/service";
import { UserRoadmap } from "@/lib/supabase/types";
import { lifeEvents } from "@/data/life-events";
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ExternalLink, 
  Trash2, 
  FileText, 
  Trophy, 
  Compass, 
  Info,
  Sparkles,
  Layers,
  Search,
  ClipboardList,
  Bell,
  UserRound,
  CheckCircle,
  X,
  TrendingUp,
  ArrowDown
} from "lucide-react";
import confetti from "canvas-confetti";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [roadmaps, setRoadmaps] = useState<UserRoadmap[]>([]);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEventSlug, setSelectedEventSlug] = useState("pindah-domisili");
  const [profileName, setProfileName] = useState("Teman Satu");

  useEffect(() => {
    const rawSession = window.localStorage.getItem("satuurusan_session");
    if (!rawSession) {
      router.replace("/masuk");
      return;
    }

    try {
      const parsed = JSON.parse(rawSession) as { name?: string };
      setProfileName(parsed.name || "Teman Satu");
    } catch {
      router.replace("/masuk");
      return;
    }

    async function loadData() {
      setIsLoading(true);
      try {
        const data = await fetchUserRoadmaps();
        setRoadmaps(data);
        if (data.length > 0) {
          const targetId = searchParams.get("id");
          const found = targetId ? data.find((r) => r.id === targetId) : null;
          setSelectedRoadmapId(found ? found.id : data[0].id);
        }
      } catch (err) {
        console.error("Gagal memuat daftar roadmap", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [router, searchParams]);

  const activeRoadmap = roadmaps.find((r) => r.id === selectedRoadmapId) || roadmaps[0];
  const completedTasks = roadmaps.reduce(
    (total, roadmap) => total + (roadmap.tasks?.filter((task) => task.is_completed).length || 0),
    0
  );
  const inProgressCount = roadmaps.filter((roadmap) => roadmap.progress_pct > 0 && roadmap.progress_pct < 100).length;
  const completedRoadmapsCount = roadmaps.filter((roadmap) => roadmap.progress_pct === 100).length;
  const needsActionCount = roadmaps.filter((roadmap) => roadmap.progress_pct < 100).length;

  const handleToggleTask = async (taskId: string, currentCompleted: boolean) => {
    if (!activeRoadmap) return;
    const newStatus = !currentCompleted;

    try {
      const { roadmap: updatedRm } = await toggleTaskCompletion(
        activeRoadmap.id,
        taskId,
        newStatus
      );

      setRoadmaps((prev) =>
        prev.map((r) => (r.id === updatedRm.id ? updatedRm : r))
      );

      // Trigger celebratory confetti when reaching 100%
      if (updatedRm.progress_pct === 100) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#2563eb", "#38bdf8", "#10b981", "#6366f1"]
        });
      }
    } catch (err) {
      console.error("Gagal memperbarui status tugas", err);
    }
  };

  const handleCreateRoadmap = async (slugToCreate?: string) => {
    try {
      const slug = slugToCreate || selectedEventSlug;
      const eventObj = lifeEvents.find((e) => {
        const eSlug = e.slug || e.title.toLowerCase().replace(/\s+/g, "-");
        return eSlug === slug || e.title.toLowerCase().includes(slug);
      }) || lifeEvents[0];

      const newRm = await createUserRoadmap(slug, eventObj.title);
      if (newRm) {
        setRoadmaps((prev) => [newRm, ...prev]);
        setSelectedRoadmapId(newRm.id);
      }
      setShowAddModal(false);
    } catch (err) {
      console.error("Gagal membuat roadmap baru", err);
      alert("Terjadi kesalahan saat membuat peta urusan baru. Silakan coba lagi.");
    }
  };

  const handleDeleteRoadmap = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus roadmap ini?")) return;

    try {
      await deleteUserRoadmap(id);
      setRoadmaps((prev) => {
        const remaining = prev.filter((r) => r.id !== id);
        if (remaining.length > 0 && selectedRoadmapId === id) {
          setSelectedRoadmapId(remaining[0].id);
        } else if (remaining.length === 0) {
          setSelectedRoadmapId("");
        }
        return remaining;
      });
    } catch (err) {
      console.error("Gagal menghapus roadmap", err);
      alert("Terjadi kesalahan saat menghapus roadmap. Silakan coba lagi.");
    }
  };

  return (
    <main aria-busy={isLoading} className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-12 lg:pt-32 lg:pb-16 flex-1 space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-[#0f274a] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-sm">
          <div className="space-y-3 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-50 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Personal Life-Event Roadmap</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Halo, {profileName} <span aria-hidden="true" className="text-2xl">👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
              Pantau progres dokumen prasyarat, urutan prioritas antar dinas, dan checklist langkah tanpa rasa bingung.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-satu-ai"));
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border-transparent text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tanya SatuAI</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Peta Urusan Baru</span>
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" aria-label="Ringkasan urusan">
          {[
            { label: "Total Urusan", value: roadmaps.length, color: "text-blue-600", icon: FileText, trend: "+1", trendLabel: "vs bulan lalu", trendType: "up", trendColor: "text-emerald-600", trendBg: "bg-emerald-500/10" },
            { label: "Sedang Berjalan", value: inProgressCount, color: "text-amber-600", icon: Clock, trend: "+1", trendLabel: "butuh proses", trendType: "up", trendColor: "text-emerald-600", trendBg: "bg-emerald-500/10" },
            { label: "Langkah Selesai", value: completedTasks, color: "text-emerald-600", icon: CheckCircle2, trend: "+12.4%", trendLabel: "vs kemarin", trendType: "up", trendColor: "text-emerald-600", trendBg: "bg-emerald-500/10" },
            { label: "Perlu Tindakan", value: needsActionCount, color: "text-rose-600", icon: Info, trend: "-2", trendLabel: "terselesaikan", trendType: "down", trendColor: "text-emerald-600", trendBg: "bg-emerald-500/10" },
          ].map((stat) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trendType === "up" ? TrendingUp : ArrowDown;
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-500">{stat.label}</span>
                  <div className={`p-1.5 rounded-lg bg-slate-50 border border-slate-100 ${stat.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <strong className={`block mt-2.5 font-display text-2xl font-extrabold ${stat.color}`}>{stat.value}</strong>
                
                <div className="mt-3.5 flex items-center gap-1.5 sm:gap-2">
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center flex-shrink-0 ${stat.trendBg}`}>
                    <TrendIcon className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${stat.trendColor}`} strokeWidth={3} />
                  </div>
                  <span className={`text-[10px] sm:text-xs font-bold ${stat.trendColor}`}>
                    {stat.trend}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">
                    {stat.trendLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {/* Roadmaps Grid View */}
        {roadmaps.length > 0 ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="max-w-md">
                <h2 className="font-display font-extrabold text-xl text-[#0f274a]">Peta Urusan Aktif</h2>
                <p className="text-xs text-slate-500 mt-1">Pilih urusan untuk melihat detail checklist dan menyelesaikannya.</p>
              </div>
              <Link href="/urusan-saya" className="text-xs font-bold text-blue-600 hover:underline whitespace-nowrap">
                Kelola Semua Urusan →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmaps.map((rm) => (
                <div key={rm.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      Peta Urusan
                    </span>
                    <h3 className="font-display font-bold text-lg text-[#0f274a] mt-1 line-clamp-2">
                      {rm.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                      {rm.description || "Daftar langkah penting terurut antar instansi"}
                    </p>
                  </div>
                  
                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-600">Progres</span>
                      <span className={rm.progress_pct === 100 ? "text-emerald-600" : "text-blue-600"}>
                        {rm.progress_pct}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          rm.progress_pct === 100
                            ? "bg-emerald-500"
                            : "bg-blue-600"
                        }`}
                        style={{ width: `${rm.progress_pct}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center justify-between">
                      <span>{rm.tasks?.filter(t => t.is_completed).length || 0} dari {rm.tasks?.length || 0} langkah</span>
                    </div>
                  </div>

                  <Link 
                    href={`/dashboard/checklist/${rm.id}`}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-blue-50 text-[#0f274a] hover:text-blue-700 font-bold text-xs rounded-xl border border-slate-200 hover:border-blue-200 transition-colors"
                  >
                    Buka Checklist <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State when 0 roadmaps exist */
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/90 space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100">
              <Compass className="w-8 h-8" />
            </div>
            
            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#0f274a]">
                Belum ada Peta Urusan yang dibuat
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Pilih satu peristiwa hidup yang sedang kamu jalani untuk menyusun daftar langkah, dokumen prasyarat, dan urutan prioritas antar dinas.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md shadow-blue-600/25 hover:bg-blue-700 cursor-pointer transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Peta Urusan Sekarang</span>
            </button>

            {/* Quick Starter Templates */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Atau pilih langsung alur siap pakai:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
                {[
                  { slug: "pindah-domisili", title: "Pindah Domisili / Rumah", desc: "KTP, KK, BPJS faskes, SKPWNI" },
                  { slug: "pekerjaan-baru", title: "Pekerjaan / Karir Baru", desc: "NPWP, BPJS TK, rekening, SKCK" },
                  { slug: "menikah", title: "Pernikahan & Keluarga", desc: "SIMKAH, pecah KK, KTP kawin, BPJS" },
                  { slug: "memiliki-anak", title: "Kelahiran Anggota Baru", desc: "Akta lahir, tambah KK, BPJS bayi, KIA" },
                  { slug: "memulai-usaha", title: "Membuka Usaha (UMKM)", desc: "NIB OSS RBA, sertifikat halal, PIRT" },
                  { slug: "pendidikan", title: "Pendidikan & Sekolah", desc: "PPDB online, legalisir ijazah, KIP" },
                  { slug: "kehilangan-dokumen", title: "Kehilangan Dokumen", desc: "SKTLK Polri, KTP, ATM, Tabungan" },
                  { slug: "pajak-kendaraan", title: "Pajak & Kendaraan", desc: "STNK, BPKB, Balik Nama, SIGNAL" },
                  { slug: "ahli-waris", title: "Pengurusan Ahli Waris", desc: "Akta Kematian, SKAW, Balik Nama Tanah" },
                ].map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => handleCreateRoadmap(item.slug)}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all group cursor-pointer"
                  >
                    <strong className="text-xs font-bold text-[#0f274a] group-hover:text-blue-600 block transition-colors">
                      {item.title}
                    </strong>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modal Add Roadmap */}
      {showAddModal && (
        <div 
          role="dialog"
          aria-modal="true"
          onClick={() => setShowAddModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in zoom-in-95"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  Pilih Peristiwa Hidup
                </span>
                <h3 className="font-display font-extrabold text-xl text-[#0f274a] mt-1">
                  Buat Peta Urusan Baru
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Pilih template alur yang sesuai dengan kebutuhan Anda saat ini:
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {[
                { slug: "pindah-domisili", title: "Pindah Tempat Tinggal", desc: "KTP, KK, alamat, BPJS faskes, SKPWNI", count: 6 },
                { slug: "pekerjaan-baru", title: "Memulai Pekerjaan Baru", desc: "NPWP, BPJS TK, rekening payroll, SKCK", count: 4 },
                { slug: "menikah", title: "Menikah & Berkeluarga", desc: "Buku nikah, pecah KK, update KTP, BPJS", count: 5 },
                { slug: "memiliki-anak", title: "Kelahiran Anggota Keluarga", desc: "Akta lahir, tambah anak ke KK, BPJS bayi, KIA", count: 4 },
                { slug: "memulai-usaha", title: "Membuka Usaha Mandiri (UMKM)", desc: "NIB OSS, sertifikasi halal, rekening bisnis", count: 4 },
                { slug: "pendidikan", title: "Pendidikan & Sekolah", desc: "PPDB online, legalisir ijazah, KIP Kuliah", count: 3 },
                { slug: "kehilangan-dokumen", title: "Kehilangan Dokumen Penting", desc: "SKTLK Polri, KTP, ATM, Buku Tabungan", count: 3 },
                { slug: "pajak-kendaraan", title: "Pajak & Surat Kendaraan", desc: "Pajak tahunan SIGNAL, BBNKB, STNK", count: 3 },
                { slug: "ahli-waris", title: "Pengurusan Ahli Waris", desc: "Akta Kematian, SKAW, Balik Nama Sertifikat", count: 4 },
              ].map((ev) => (
                <button
                  key={ev.slug}
                  type="button"
                  onClick={() => setSelectedEventSlug(ev.slug)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedEventSlug === ev.slug
                      ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-900"
                      : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="space-y-0.5">
                    <strong className="text-xs font-bold block">{ev.title}</strong>
                    <small className="text-[10px] text-slate-500 block">{ev.desc}</small>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                    {ev.count} langkah
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleCreateRoadmap()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/25 transition-all cursor-pointer"
              >
                Buat Peta Urusan
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-xs">
        Memuat dashboard...
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}

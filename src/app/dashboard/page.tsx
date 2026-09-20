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
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import { 
  Plus, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  FileText, 
  Trophy, 
  Compass, 
  Info,
  Sparkles,
  Search,
  ClipboardList,
  Bell,
  UserRound,
  X,
  LoaderCircle
} from "lucide-react";
import confetti from "canvas-confetti";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [roadmaps, setRoadmaps] = useState<UserRoadmap[]>([]);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEventSlug, setSelectedEventSlug] = useState("pindah-domisili");
  const [profileName] = useState(() => {
    if (typeof window === "undefined") return "Teman Satu";
    try {
      const session = window.localStorage.getItem("satuurusan_session");
      return session ? (JSON.parse(session) as { name?: string }).name || "Teman Satu" : "Teman Satu";
    } catch {
      return "Teman Satu";
    }
  });

  useEffect(() => {
    const rawSession = window.localStorage.getItem("satuurusan_session");
    if (!rawSession) {
      router.replace("/masuk");
      return;
    }

    try {
      JSON.parse(rawSession) as { name?: string };
    } catch {
      router.replace("/masuk");
      return;
    }

    async function loadData() {
      setIsLoading(true);
      try {
        const data = await fetchUserRoadmaps();
        setLoadError("");
        setRoadmaps(data);
        if (data.length > 0) {
          const targetId = searchParams.get("id");
          const found = targetId ? data.find((r) => r.id === targetId) : null;
          setSelectedRoadmapId(found ? found.id : data[0].id);
        }
      } catch (err) {
        console.error("Gagal memuat daftar roadmap", err);
        setLoadError("Daftar urusan belum dapat dimuat. Periksa koneksi lalu coba lagi.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [router, searchParams]);

  const activeRoadmap = roadmaps.find((r) => r.id === selectedRoadmapId) || roadmaps[0];
  const nextTask = activeRoadmap?.tasks?.find((task) => !task.is_completed && task.status !== "completed");
  const completedTasks = roadmaps.reduce(
    (total, roadmap) => total + (roadmap.tasks?.filter((task) => task.is_completed).length || 0),
    0
  );
  const inProgressCount = roadmaps.filter((roadmap) => roadmap.progress_pct > 0 && roadmap.progress_pct < 100).length;
  const needsActionCount = roadmaps.filter((roadmap) => roadmap.progress_pct < 100).length;

  const handleToggleTask = async (taskId: string, currentCompleted: boolean) => {
    if (!activeRoadmap) return;
    const newStatus = !currentCompleted;
    setActionError("");
    setPendingTaskId(taskId);

    try {
      const { roadmap: updatedRm } = await toggleTaskCompletion(
        activeRoadmap.id,
        taskId,
        newStatus
      );

      setRoadmaps((prev) =>
        prev.map((r) => (r.id === updatedRm.id ? updatedRm : r))
      );

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
      setActionError("Perubahan langkah belum tersimpan. Silakan coba lagi.");
    } finally {
      setPendingTaskId(null);
    }
  };

  const handleCreateRoadmap = async (slugToCreate?: string) => {
    if (isCreating) return;
    const slug = slugToCreate || selectedEventSlug;
    const eventObj = lifeEvents.find((e) => {
      const eSlug = e.slug || e.title.toLowerCase().replace(/\s+/g, "-");
      return eSlug === slug || e.title.toLowerCase().includes(slug);
    }) || lifeEvents[0];

    setActionError("");
    setIsCreating(true);
    try {
      const newRm = await createUserRoadmap(slug, eventObj.title);
      setRoadmaps((prev) => [newRm, ...prev]);
      setSelectedRoadmapId(newRm.id);
      setShowAddModal(false);
    } catch (err) {
      console.error("Gagal membuat roadmap", err);
      setActionError("Peta urusan belum berhasil dibuat. Silakan coba lagi.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteRoadmap = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus roadmap ini?")) return;

    setActionError("");
    setIsDeleting(true);
    try {
      await deleteUserRoadmap(id);
      const remaining = roadmaps.filter((r) => r.id !== id);
      setRoadmaps(remaining);
      if (remaining.length > 0) {
        setSelectedRoadmapId(remaining[0].id);
      } else {
        setSelectedRoadmapId("");
      }
    } catch (err) {
      console.error("Gagal menghapus roadmap", err);
      setActionError("Urusan belum berhasil dihapus. Silakan coba lagi.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main aria-busy={isLoading} className="dashboard-page min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans">
      <Navbar />

      <div className="dashboard-shell max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        
        {/* Welcome Banner */}
        <div className="dashboard-welcome-banner rounded-3xl bg-gradient-to-r from-[#0f274a] via-[#17345b] to-[#1e4976] p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-blue-200 text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              <span>Personal Life-Event Roadmap</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              Halo, {profileName} <span aria-hidden="true">👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
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
              className="dashboard-ai-button inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tanya SatuAI</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="dashboard-primary-button inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Peta Urusan Baru</span>
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <section className="dashboard-stats grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" aria-label="Ringkasan urusan">
          {[
            { label: "Total Urusan", value: roadmaps.length, color: "text-blue-600", icon: FileText },
            { label: "Sedang Berjalan", value: inProgressCount, color: "text-amber-600", icon: Clock },
            { label: "Langkah Selesai", value: completedTasks, color: "text-emerald-600", icon: CheckCircle2 },
            { label: "Perlu Tindakan", value: needsActionCount, color: "text-rose-600", icon: Info },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="dashboard-stat bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-500">{stat.label}</span>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <strong className={`block mt-2 font-display text-2xl ${stat.color}`}>{stat.value}</strong>
              </div>
            );
          })}
        </section>

        {(loadError || actionError) && (
          <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700" role="alert">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{loadError || actionError}</span>
          </div>
        )}

        {/* Roadmap Selector Tabs */}
        {roadmaps.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Peta Urusan Aktif ({roadmaps.length})
              </span>
              <Link href="/urusan-saya" className="text-xs font-bold text-blue-600 hover:underline">
                Kelola Semua Urusan →
              </Link>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {roadmaps.map((rm) => {
                const isCurrent = rm.id === (activeRoadmap ? activeRoadmap.id : "");
                return (
                  <button
                    key={rm.id}
                    type="button"
                    onClick={() => setSelectedRoadmapId(rm.id)}
                    className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                      isCurrent
                        ? "bg-white text-blue-700 border-blue-400 shadow-md ring-2 ring-blue-500/20"
                        : "bg-white/80 text-slate-600 border-slate-200 hover:bg-blue-50/50 hover:border-blue-200"
                    }`}
                  >
                    <span>{rm.title.replace("Peta Urusan: ", "")}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${rm.progress_pct === 100 ? "bg-emerald-100 text-emerald-700" : "bg-blue-50 text-blue-600"}`}>
                      {rm.progress_pct}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Roadmap View */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12" aria-label="Memuat dashboard">
            <div className="h-[420px] animate-pulse rounded-3xl border border-slate-200/80 bg-white lg:col-span-8" />
            <div className="h-[280px] animate-pulse rounded-3xl border border-slate-200/80 bg-white lg:col-span-4" />
          </div>
        ) : activeRoadmap ? (
          <div className="dashboard-workspace grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Col: Tasks Checklist */}
            <div id="urusan" className="lg:col-span-8 space-y-6">
              <div className="dashboard-checklist bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      Checklist Alur & Dokumen
                    </span>
                    <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0f274a] mt-0.5">
                      {activeRoadmap.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {activeRoadmap.description || "Daftar langkah penting terurut antar instansi"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleDeleteRoadmap(activeRoadmap.id)}
                      disabled={isDeleting}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                      title="Hapus Roadmap"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-600">Progres Keseluruhan</span>
                    <span className={activeRoadmap.progress_pct === 100 ? "text-emerald-600 font-bold" : "text-blue-600"}>
                      {activeRoadmap.progress_pct}% Selesai ({activeRoadmap.tasks?.filter((t) => t.is_completed).length || 0}/{activeRoadmap.tasks?.length || 0} langkah)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        activeRoadmap.progress_pct === 100
                          ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                          : "bg-gradient-to-r from-blue-600 to-indigo-500"
                      }`}
                      style={{ width: `${activeRoadmap.progress_pct}%` }}
                    />
                  </div>
                </div>

                {nextTask && <div className="next-action-strip">
                  <div className="next-action-label"><span>Berikutnya</span><strong>Aksi yang disarankan</strong></div>
                  <div className="next-action-main"><span className="next-action-number">{String((activeRoadmap.tasks?.indexOf(nextTask) || 0) + 1).padStart(2, "0")}</span><div><strong>{nextTask.title}</strong><span>{nextTask.duration} · {nextTask.category}</span></div></div>
                  <button type="button" onClick={() => document.getElementById(`task-${nextTask.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })}>Lanjutkan urusan <span>→</span></button>
                </div>}

                <RoadmapTimeline roadmap={activeRoadmap} onToggle={handleToggleTask} pendingTaskId={pendingTaskId} />

              </div>
            </div>

            {/* Right Column: Status & Info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="dashboard-side-card bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-100">
                    <Trophy className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-[#0f274a]">
                      Status Roadmap
                    </h3>
                    <span className="text-xs text-slate-500">
                      {activeRoadmap.progress_pct === 100
                        ? "Semua langkah telah selesai 🎉"
                        : "Sedang dalam proses penyelesaian"}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Total Langkah:</span>
                    <strong className="text-slate-800">{activeRoadmap.tasks?.length || 0} urusan</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Langkah Selesai:</span>
                    <strong className="text-emerald-600 font-bold">
                      {activeRoadmap.tasks?.filter((t) => t.is_completed).length || 0} urusan
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sisa Langkah:</span>
                    <strong className="text-amber-600 font-bold">
                      {(activeRoadmap.tasks?.length || 0) - (activeRoadmap.tasks?.filter((t) => t.is_completed).length || 0)} urusan
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("open-satu-ai"));
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-colors cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse-soft" />
                  <span>Konsultasi Alur ke Asisten</span>
                </button>
              </div>

              {/* Quick Actions Card */}
              <div className="dashboard-side-card dashboard-quick-actions bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
                <h3 className="font-display font-bold text-sm text-[#0f274a]">Aksi Cepat</h3>
                <div className="space-y-1">
                  <Link href="/layanan" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Search className="w-4 h-4 text-blue-500" />
                    <span>Cari Katalog Layanan Baru</span>
                  </Link>
                  <Link href="/riwayat" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <ClipboardList className="w-4 h-4 text-violet-500" />
                    <span>Lihat Riwayat Langkah Selesai</span>
                  </Link>
                  <Link href="/bantuan" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Bell className="w-4 h-4 text-amber-500" />
                    <span>Pusat Informasi & FAQ</span>
                  </Link>
                  <Link href="/urusan-saya" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <UserRound className="w-4 h-4 text-indigo-500" />
                    <span>Kelola Seluruh Peta Urusan</span>
                  </Link>
                </div>
              </div>

              {/* Disclaimer reminder */}
              <div className="dashboard-notice bg-blue-50/60 rounded-2xl p-5 border border-blue-100 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Penting Diketahui</span>
                </div>
                <p className="leading-relaxed">
                  SatuUrusan tidak memungut biaya apapun. Seluruh pengajuan dokumen resmi dan pembayaran pajak/PNBP hanya dilakukan melalui rekening negara/kanal resmi pemerintah.
                </p>
              </div>
            </div>

          </div>
        ) : (
          /* Empty State when 0 roadmaps exist */
          <div className="dashboard-empty bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/90 space-y-6 shadow-sm">
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
                ].map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => handleCreateRoadmap(item.slug)}
                    disabled={isCreating}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all group cursor-pointer disabled:cursor-wait disabled:opacity-60"
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
          className="dashboard-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="dashboard-modal-panel bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6"
          >
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
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                aria-label="Tutup dialog"
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
                disabled={isCreating}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/25 transition-all cursor-pointer disabled:cursor-wait disabled:opacity-60"
              >
                {isCreating && <LoaderCircle className="h-3.5 w-3.5 animate-spin" />}
                {isCreating ? "Membuat peta..." : "Buat Peta Urusan"}
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

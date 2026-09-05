"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  fetchUserRoadmaps, 
  createUserRoadmap, 
  toggleTaskCompletion, 
  deleteUserRoadmap 
} from "@/lib/supabase/service";
import { UserRoadmap, RoadmapTask } from "@/lib/supabase/types";
import { lifeEvents } from "@/data/life-events";
import { AuthBrand } from "@/components/AuthBrand";
import { 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ExternalLink, 
  Trash2, 
  ArrowRight, 
  FileText, 
  Trophy, 
  Compass, 
  Layers, 
  LogOut,
  ChevronDown,
  Info
} from "lucide-react";
import confetti from "canvas-confetti";

export default function DashboardPage() {
  const [roadmaps, setRoadmaps] = useState<UserRoadmap[]>([]);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEventSlug, setSelectedEventSlug] = useState("pindah-domisili");

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await fetchUserRoadmaps();
        setRoadmaps(data);
        if (data.length > 0) {
          setSelectedRoadmapId(data[0].id);
        }
      } catch (err) {
        console.error("Failed to load roadmaps", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const activeRoadmap = roadmaps.find((r) => r.id === selectedRoadmapId) || roadmaps[0];

  const handleToggleTask = async (taskId: string, currentCompleted: boolean) => {
    if (!activeRoadmap) return;
    const newStatus = !currentCompleted;

    try {
      const { roadmap: updatedRm, completed } = await toggleTaskCompletion(
        activeRoadmap.id,
        taskId,
        newStatus
      );

      setRoadmaps((prev) =>
        prev.map((r) => (r.id === updatedRm.id ? updatedRm : r))
      );

      // Trigger confetti celebration when reaching 100%
      if (updatedRm.progress_pct === 100) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#2563eb", "#f59e0b", "#10b981", "#8b5cf6"]
        });
      }
    } catch (err) {
      console.error("Failed to toggle task", err);
    }
  };

  const handleCreateRoadmap = async () => {
    const eventObj = lifeEvents.find((e) => {
      const slug = e.title.toLowerCase().replace(/\s+/g, "-");
      return slug === selectedEventSlug || e.title.toLowerCase().includes(selectedEventSlug);
    }) || lifeEvents[0];

    const slug = selectedEventSlug;
    const newRm = await createUserRoadmap(slug, eventObj.title);
    setRoadmaps((prev) => [newRm, ...prev]);
    setSelectedRoadmapId(newRm.id);
    setShowAddModal(false);
  };

  const handleDeleteRoadmap = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus roadmap ini?")) {
      await deleteUserRoadmap(id);
      const remaining = roadmaps.filter((r) => r.id !== id);
      setRoadmaps(remaining);
      if (remaining.length > 0) {
        setSelectedRoadmapId(remaining[0].id);
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <AuthBrand />
        <div className="flex items-center gap-3">
          <Link
            href="/layanan"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Katalog Layanan</span>
          </Link>
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              TS
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold block leading-none text-slate-800">Teman Satu</span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Aktif
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0f274a] via-[#17345b] to-[#1e4976] p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Personal Life-Event Roadmap</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              Halo! Siap menuntaskan urusan apa hari ini?
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pantau progres dokumen prasyarat, urutan prioritas antar dinas, dan checklist langkah tanpa rasa bingung.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="relative z-10 flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Peta Urusan Baru</span>
          </button>
        </div>

        {/* Roadmap Selector Tabs */}
        {roadmaps.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {roadmaps.map((rm) => {
              const isCurrent = rm.id === selectedRoadmapId;
              return (
                <button
                  key={rm.id}
                  type="button"
                  onClick={() => setSelectedRoadmapId(rm.id)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                    isCurrent
                      ? "bg-white text-blue-700 border-blue-300 shadow-sm ring-1 ring-blue-500/20"
                      : "bg-white/60 text-slate-600 border-slate-200 hover:bg-white"
                  }`}
                >
                  <span>{rm.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${rm.progress_pct === 100 ? "bg-emerald-100 text-emerald-700" : "bg-blue-50 text-blue-600"}`}>
                    {rm.progress_pct}%
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Roadmap Detailed View */}
        {activeRoadmap ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Col: Tasks Checklist */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
                
                {/* Roadmap Info Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0f274a]">
                      {activeRoadmap.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {activeRoadmap.description || "Daftar langkah penting terurut"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteRoadmap(activeRoadmap.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                      title="Hapus Roadmap"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar Display */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-600">Progres Keseluruhan</span>
                    <span className={activeRoadmap.progress_pct === 100 ? "text-emerald-600" : "text-blue-600"}>
                      {activeRoadmap.progress_pct}% Selesai
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

                {/* Task Checklist Items */}
                <div className="space-y-3 pt-2">
                  {activeRoadmap.tasks?.map((task, idx) => (
                    <div
                      key={task.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                        task.is_completed
                          ? "bg-emerald-50/40 border-emerald-200/70 opacity-90"
                          : "bg-slate-50/70 hover:bg-white border-slate-200/80 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <button
                          type="button"
                          onClick={() => handleToggleTask(task.id, task.is_completed)}
                          className="mt-0.5 flex-shrink-0 focus:outline-none"
                        >
                          {task.is_completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 hover:text-blue-500 transition-colors" />
                          )}
                        </button>

                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className={`font-display font-bold text-sm ${task.is_completed ? "line-through text-slate-500" : "text-[#0f274a]"}`}>
                              {idx + 1}. {task.title}
                            </h4>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                                {task.category}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-blue-500" />
                                {task.duration}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed">
                            {task.description}
                          </p>

                          {/* Requirements Pills */}
                          {task.requirements && task.requirements.length > 0 && (
                            <div className="pt-1 flex flex-wrap items-center gap-1.5">
                              <span className="text-[10px] font-bold text-slate-400">Siapkan:</span>
                              {task.requirements.map((req, rIdx) => (
                                <span
                                  key={rIdx}
                                  className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded-md text-slate-600 font-medium"
                                >
                                  {req}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Official URL link */}
                          {task.official_url && task.official_url !== "#" && (
                            <div className="pt-1">
                              <a
                                href={task.official_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                <span>Buka Portal Resmi Instansi</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Right Col: Advice & Quick Guide Card */}
            <div className="lg:col-span-4 space-y-6">
              {/* Status card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
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
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 hover:bg-blue-100/80 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Konsultasi Roadmap ke SatuAI</span>
                </button>
              </div>

              {/* Disclaimer reminder */}
              <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100/80 text-xs text-slate-600 space-y-2">
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
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <Compass className="w-12 h-12 text-blue-500 mx-auto animate-bounce" />
            <h3 className="font-display font-bold text-lg text-slate-800">
              Belum ada Peta Urusan yang dibuat
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Pilih satu peristiwa hidup untuk otomatis menyusun urutan langkah dan persiapan dokumen Anda.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Peta Urusan Sekarang</span>
            </button>
          </div>
        )}

      </div>

      {/* Modal Add Roadmap */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in zoom-in-95">
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
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    selectedEventSlug === ev.slug
                      ? "bg-blue-50 border-blue-500 ring-1 ring-blue-500/20 text-blue-900"
                      : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="space-y-0.5">
                    <strong className="text-xs font-bold block">{ev.title}</strong>
                    <small className="text-[10px] text-slate-500 block">{ev.desc}</small>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-100/80 px-2 py-0.5 rounded-full">
                    {ev.count} langkah
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleCreateRoadmap}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/25 transition-all"
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

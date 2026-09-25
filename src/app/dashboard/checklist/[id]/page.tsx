"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  fetchUserRoadmaps, 
  toggleTaskCompletion, 
  deleteUserRoadmap 
} from "@/lib/supabase/service";
import { UserRoadmap } from "@/lib/supabase/types";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ExternalLink, 
  Trash2, 
  Trophy, 
  ArrowLeft,
  LoaderCircle,
  ClipboardList
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ChecklistPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [activeRoadmap, setActiveRoadmap] = useState<UserRoadmap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use React.use to unwrap the Promise correctly in Next 15+
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  useEffect(() => {
    const rawSession = window.localStorage.getItem("satuurusan_session");
    if (!rawSession) {
      router.replace("/masuk");
      return;
    }

    async function loadData() {
      setIsLoading(true);
      try {
        const roadmaps = await fetchUserRoadmaps();
        const found = roadmaps.find((r) => r.id === id);
        if (found) {
          setActiveRoadmap(found);
        } else {
          router.replace("/dashboard");
        }
      } catch (err) {
        console.error("Gagal memuat roadmap", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [id, router]);

  const handleToggleTask = async (taskId: string, currentCompleted: boolean) => {
    if (!activeRoadmap) return;
    const newStatus = !currentCompleted;

    try {
      const { roadmap: updatedRm } = await toggleTaskCompletion(
        activeRoadmap.id,
        taskId,
        newStatus
      );

      setActiveRoadmap(updatedRm);

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

  const handleDeleteRoadmap = async () => {
    if (!activeRoadmap) return;
    if (!confirm("Apakah Anda yakin ingin menghapus peta urusan ini?")) return;

    try {
      await deleteUserRoadmap(activeRoadmap.id);
      router.replace("/dashboard");
    } catch (err) {
      console.error("Gagal menghapus roadmap", err);
      alert("Terjadi kesalahan saat menghapus roadmap. Silakan coba lagi.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin text-blue-600" /> Memuat data checklist...
      </div>
    );
  }

  if (!activeRoadmap) return null;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white pb-20">
      {/* Minimal Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-display text-sm sm:text-base font-bold text-[#0f274a]">
              {activeRoadmap.title}
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-500">Mode Fokus Checklist</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 mt-8 space-y-6">
        
        {/* Main Checklist Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                <ClipboardList className="w-3.5 h-3.5" /> Checklist Alur & Dokumen
              </span>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0f274a] mt-1.5">
                {activeRoadmap.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {activeRoadmap.description || "Daftar langkah penting terurut antar instansi"}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={handleDeleteRoadmap}
                className="p-2.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
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

          {/* Status Box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-100">
                  <Trophy className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs text-[#0f274a]">
                    Status Roadmap
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    {activeRoadmap.progress_pct === 100
                      ? "Semua langkah telah selesai 🎉"
                      : "Sedang dalam proses penyelesaian"}
                  </span>
                </div>
              </div>
          </div>

          {/* Task Checklist Items */}
          <div className="space-y-3 pt-2">
            {activeRoadmap.tasks?.map((task, idx) => (
              <div
                key={task.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                  task.is_completed
                    ? "bg-emerald-50/30 border-emerald-200/70"
                    : "bg-white border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    type="button"
                    onClick={() => handleToggleTask(task.id, task.is_completed)}
                    className="mt-0.5 flex-shrink-0 focus:outline-none cursor-pointer"
                    aria-label={task.is_completed ? "Tandai belum selesai" : "Tandai selesai"}
                  >
                    {task.is_completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300 hover:text-blue-500 transition-colors" />
                    )}
                  </button>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className={`font-display font-bold text-sm ${task.is_completed ? "line-through text-slate-400" : "text-[#0f274a]"}`}>
                        {idx + 1}. {task.title}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
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

                    {/* Requirements */}
                    {task.requirements && task.requirements.length > 0 && (
                      <div className="pt-1 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400">Siapkan:</span>
                        {task.requirements.map((req, rIdx) => (
                          <span
                            key={rIdx}
                            className="text-[10px] px-2.5 py-0.5 bg-slate-50 border border-slate-200 rounded-md text-slate-600 font-medium"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Official URL */}
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
    </main>
  );
}

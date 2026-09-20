"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  CheckCircle2, 
  Clock, 
  ClipboardList, 
  History, 
  LoaderCircle, 
  ArrowRight,
  FolderOpen,
  Plus,
  Compass,
  FileCheck2,
  Trash2
} from "lucide-react";
import { fetchUserRoadmaps, deleteUserRoadmap } from "@/lib/supabase/service";
import { UserRoadmap } from "@/lib/supabase/types";

export function AccountRoadmaps({ mode }: { mode: "active" | "history" }) {
  const router = useRouter();
  const [roadmaps, setRoadmaps] = useState<UserRoadmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!window.localStorage.getItem("satuurusan_session")) {
      router.replace("/masuk");
      return;
    }

    fetchUserRoadmaps()
      .then(setRoadmaps)
      .finally(() => setIsLoading(false));
  }, [router]);

  const completedTasks = roadmaps.flatMap((roadmap) =>
    (roadmap.tasks || [])
      .filter((task) => task.is_completed)
      .map((task) => ({ ...task, roadmapId: roadmap.id, roadmapTitle: roadmap.title }))
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus peta urusan ini?")) return;
    try {
      await deleteUserRoadmap(id);
      setRoadmaps((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Gagal menghapus roadmap", err);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f8fafc] text-xs text-slate-500">
        <LoaderCircle className="mr-2 h-5 w-5 animate-spin text-blue-600" />
        <span>Memuat data urusan...</span>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-36 lg:pb-20">
        
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 border-b border-slate-200/90 pb-6 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold shadow-2xs">
              {mode === "active" ? (
                <FolderOpen className="w-3.5 h-3.5 text-blue-600" />
              ) : (
                <History className="w-3.5 h-3.5 text-violet-600" />
              )}
              <span>{mode === "active" ? "Kelola Seluruh Peta Urusan" : "Arsip & Riwayat Langkah"}</span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#0f274a]">
              {mode === "active" ? "Peta Urusan Saya" : "Riwayat Aktivitas Selesai"}
            </h1>
            
            <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-slate-500">
              {mode === "active"
                ? "Pantau dan kelola seluruh peta langkah peristiwa hidup yang sedang kamu jalankan."
                : "Daftar seluruh tahapan dan dokumen prasyarat yang telah berhasil kamu selesaikan."}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>Buka Dashboard Utama</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </header>

        {mode === "active" ? (
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Daftar peta urusan">
            {roadmaps.map((roadmap) => {
              const completedCount = roadmap.tasks?.filter((t) => t.is_completed).length || 0;
              const totalCount = roadmap.tasks?.length || 0;

              return (
                <article
                  key={roadmap.id}
                  className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                          Peta Peristiwa
                        </span>
                        <h2 className="font-display text-lg font-extrabold text-[#0f274a] leading-snug">
                          {roadmap.title.replace("Peta Urusan: ", "")}
                        </h2>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
                          roadmap.progress_pct === 100
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-blue-100/80 text-blue-700"
                        }`}
                      >
                        {roadmap.progress_pct}%
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed text-slate-500 line-clamp-2">
                      {roadmap.description || "Panduan runtut dokumen prasyarat antar dinas resmi."}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                        <span>Progres</span>
                        <span className={roadmap.progress_pct === 100 ? "text-emerald-600" : "text-blue-600"}>
                          {completedCount}/{totalCount} langkah
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            roadmap.progress_pct === 100
                              ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                              : "bg-gradient-to-r from-blue-600 to-indigo-500"
                          }`}
                          style={{ width: `${roadmap.progress_pct}%` }}
                        />
                      </div>
                    </div>

                    {/* Action links */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <button
                        type="button"
                        onClick={() => handleDelete(roadmap.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus peta urusan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <Link
                        href={`/dashboard?id=${roadmap.id}`}
                        className="font-bold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Buka Checklist</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <section className="space-y-3" aria-label="Riwayat langkah selesai">
            {completedTasks.map((task) => (
              <article
                key={task.id}
                className="flex items-start gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-emerald-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-display font-bold text-sm text-[#0f274a]">
                      {task.title}
                    </h2>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800">
                      <History className="h-3 w-3" />
                      <span>Selesai</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-500">
                    Dari {task.roadmapTitle}
                  </p>
                  
                  {task.description && (
                    <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                      {task.description}
                    </p>
                  )}
                </div>

                <Link
                  href={`/dashboard?id=${task.roadmapId}`}
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline self-center flex-shrink-0"
                >
                  <span>Lihat di Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            ))}
          </section>
        )}

        {/* Empty State */}
        {((mode === "active" && roadmaps.length === 0) || (mode === "history" && completedTasks.length === 0)) && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-12 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100">
              {mode === "active" ? <ClipboardList className="h-7 w-7" /> : <Clock className="h-7 w-7 text-slate-400" />}
            </div>
            
            <div className="space-y-1">
              <h2 className="font-display font-extrabold text-xl text-[#0f274a]">
                {mode === "active" ? "Belum ada Peta Urusan" : "Belum ada Langkah Selesai"}
              </h2>
              <p className="mx-auto max-w-md text-xs sm:text-sm leading-relaxed text-slate-500">
                {mode === "active"
                  ? "Pilih salah satu peristiwa hidup untuk menyusun daftar langkah, dokumen prasyarat, dan urutan prioritas instansi."
                  : "Setiap langkah checklist yang kamu centang di dashboard akan tersimpan riwayatnya di sini."}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-600/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Buka Dashboard & Buat Peta Urusan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

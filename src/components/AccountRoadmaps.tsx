"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Clock, ClipboardList, History, LoaderCircle, ArrowRight } from "lucide-react";
import { fetchUserRoadmaps } from "@/lib/supabase/service";
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
      .map((task) => ({ ...task, roadmapTitle: roadmap.title }))
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center text-sm text-slate-500">
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin text-blue-600" /> Memuat data urusan...
      </div>
    );
  }

  return (
    <main className="flex-1 bg-slate-50/70">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              Ruang akun
            </span>
            <h1 className="mt-1 font-display text-3xl font-black tracking-tight text-[#0f274a]">
              {mode === "active" ? "Urusan Saya" : "Riwayat Aktivitas"}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              {mode === "active"
                ? "Kelola peta langkah, cek progres, dan lanjutkan urusan yang sedang kamu kerjakan."
                : "Lihat langkah yang sudah selesai dari seluruh peta urusanmu."}
            </p>
          </div>
          {mode === "active" && (
            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700">
              Buka Dashboard <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </header>

        {mode === "active" ? (
          <section className="grid gap-4 md:grid-cols-2" aria-label="Daftar peta urusan">
            {roadmaps.map((roadmap) => (
              <article key={roadmap.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Peta urusan</span>
                    <h2 className="mt-1 font-display text-lg font-bold text-[#0f274a]">{roadmap.title}</h2>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">{roadmap.progress_pct}%</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{roadmap.description}</p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" style={{ width: `${roadmap.progress_pct}%` }} />
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{roadmap.tasks?.filter((task) => task.is_completed).length || 0} dari {roadmap.tasks?.length || 0} langkah selesai</span>
                  <Link href={`/dashboard?id=${roadmap.id}`} className="font-bold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1">
                    <span>Lihat Detail Checklist</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="space-y-3" aria-label="Riwayat langkah selesai">
            {completedTasks.map((task) => (
              <article key={task.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-bold text-[#0f274a]">{task.title}</h2>
                  <p className="mt-1 text-xs text-slate-500">{task.roadmapTitle}</p>
                </div>
                <span className="hidden items-center gap-1 text-[11px] font-semibold text-emerald-600 sm:flex"><History className="h-3.5 w-3.5" /> Selesai</span>
              </article>
            ))}
          </section>
        )}

        {((mode === "active" && roadmaps.length === 0) || (mode === "history" && completedTasks.length === 0)) && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center space-y-3">
            {mode === "active" ? <ClipboardList className="mx-auto h-9 w-9 text-blue-500" /> : <Clock className="mx-auto h-9 w-9 text-slate-400" />}
            <h2 className="font-display font-bold text-[#0f274a]">{mode === "active" ? "Belum ada urusan tersimpan" : "Belum ada aktivitas selesai"}</h2>
            <p className="mx-auto max-w-sm text-xs leading-relaxed text-slate-500">{mode === "active" ? "Buat peta urusan pertamamu dari dashboard untuk mulai menyusun langkah." : "Checklist yang kamu selesaikan akan muncul di sini."}</p>
            {mode === "active" && (
              <div className="pt-2">
                <Link href="/dashboard" className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm">
                  <span>Buka Dashboard & Buat Urusan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

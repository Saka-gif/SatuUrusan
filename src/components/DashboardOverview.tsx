"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Bell, CheckCircle2, ClipboardList, FileText, Plus, Search, Sparkles, UserRound, X } from "lucide-react";
import { fetchUserRoadmaps, createUserRoadmap } from "@/lib/supabase/service";
import { lifeEvents } from "@/data/life-events";
import { UserRoadmap } from "@/lib/supabase/types";
import { AppNotification, addNotification, getNotifications } from "@/lib/notifications";

const EVENT_OPTIONS = [
  { slug: "pindah-domisili", title: "Pindah Tempat Tinggal" },
  { slug: "pekerjaan-baru", title: "Memulai Pekerjaan Baru" },
  { slug: "menikah", title: "Menikah & Berkeluarga" },
  { slug: "memiliki-anak", title: "Kelahiran Anggota Keluarga" },
  { slug: "memulai-usaha", title: "Membuka Usaha Mandiri" },
  { slug: "pendidikan", title: "Pendidikan & Sekolah" },
];

function getProgressLabel(progress: number) {
  if (progress === 100) return { label: "Selesai", tone: "text-emerald-700 bg-emerald-50" };
  if (progress > 0) return { label: "Sedang berjalan", tone: "text-blue-700 bg-blue-50" };
  return { label: "Persiapan dokumen", tone: "text-amber-700 bg-amber-50" };
}

export function DashboardOverview() {
  const [roadmaps, setRoadmaps] = useState<UserRoadmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEventSlug, setSelectedEventSlug] = useState(EVENT_OPTIONS[0].slug);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
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
    fetchUserRoadmaps().then(setRoadmaps).finally(() => setIsLoading(false));
    const syncNotifications = () => setNotifications(getNotifications());
    syncNotifications();
    window.addEventListener("satuurusan-notifications-changed", syncNotifications);
    return () => window.removeEventListener("satuurusan-notifications-changed", syncNotifications);
  }, []);

  const stats = useMemo(() => {
    const completed = roadmaps.reduce((total, roadmap) => total + (roadmap.tasks?.filter((task) => task.is_completed).length || 0), 0);
    return [
      { label: "Total Urusan", value: roadmaps.length, color: "text-blue-600", icon: FileText },
      { label: "Sedang Berjalan", value: roadmaps.filter((roadmap) => roadmap.progress_pct > 0 && roadmap.progress_pct < 100).length, color: "text-amber-600", icon: ClipboardList },
      { label: "Selesai", value: roadmaps.filter((roadmap) => roadmap.progress_pct === 100).length, color: "text-emerald-600", icon: CheckCircle2 },
      { label: "Perlu Tindakan", value: roadmaps.filter((roadmap) => roadmap.progress_pct < 100).length, color: "text-rose-600", icon: AlertTriangle },
      { label: "Langkah Selesai", value: completed, color: "text-teal-600", icon: CheckCircle2 },
    ];
  }, [roadmaps]);

  const handleCreateRoadmap = async () => {
    const event = EVENT_OPTIONS.find((item) => item.slug === selectedEventSlug) || EVENT_OPTIONS[0];
    const eventData = lifeEvents.find((item) => item.title === event.title) || lifeEvents[0];
    const newRoadmap = await createUserRoadmap(event.slug, eventData.title);
    setRoadmaps((current) => [newRoadmap, ...current]);
    addNotification({
      title: "Peta urusan berhasil dibuat",
      message: `Peta ${eventData.title} siap kamu lanjutkan.`,
      type: "success",
    });
    setShowAddModal(false);
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-slate-700">
      <div className="mx-auto max-w-5xl px-4 py-7 sm:px-6 lg:px-8">
        <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs text-slate-500">Selamat datang kembali,</p>
            <h1 className="mt-1 font-display text-3xl font-black tracking-tight text-[#0f274a] sm:text-4xl">{profileName} <span aria-hidden="true">👋</span></h1>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-satu-ai"))} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"><Sparkles className="h-3.5 w-3.5 text-amber-300" /> Tanya SatuAI</button>
            <button type="button" onClick={() => setShowAddModal(true)} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-blue-400 hover:text-blue-600"><Plus className="h-3.5 w-3.5" /> Urusan Baru</button>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 py-6 sm:grid-cols-4" aria-label="Ringkasan dashboard">
          {stats.slice(0, 4).map((stat) => {
            const Icon = stat.icon;
            return <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><span className="text-[11px] text-slate-500">{stat.label}</span><Icon className={`h-4 w-4 ${stat.color}`} /></div><strong className={`mt-2 block font-display text-2xl ${stat.color}`}>{stat.value}</strong></div>;
          })}
        </section>

        <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
          <section id="urusan" className="min-w-0">
            <div className="mb-3 flex items-center justify-between"><h2 className="font-display text-base font-bold text-[#0f274a]">Urusan Kamu</h2><Link href="/urusan-saya" className="text-xs font-bold text-blue-600 hover:underline">Lihat semua <span aria-hidden="true">→</span></Link></div>
            {isLoading ? <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500">Memuat urusan...</div> : roadmaps.length === 0 ? <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center"><ClipboardList className="mx-auto h-8 w-8 text-blue-500" /><p className="mt-2 text-sm font-bold text-slate-700">Belum ada urusan</p><button type="button" onClick={() => setShowAddModal(true)} className="mt-3 text-xs font-bold text-blue-600 hover:underline">Buat urusan pertama</button></div> : <div className="space-y-3">{roadmaps.slice(0, 3).map((roadmap) => { const status = getProgressLabel(roadmap.progress_pct); return <article key={roadmap.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300"><div className="flex items-start gap-3"><div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><FileText className="h-4 w-4" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-2"><h3 className="text-sm font-bold text-[#0f274a]">{roadmap.title.replace("Peta Urusan: ", "")}</h3><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${status.tone}`}>{status.label}</span></div><p className="mt-1 line-clamp-1 text-xs text-slate-500">{roadmap.description}</p><div className="mt-3 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-teal-500" style={{ width: `${roadmap.progress_pct}%` }} /></div><span className="text-[10px] font-bold text-slate-400">{roadmap.progress_pct}%</span></div><div className="mt-2 flex items-center justify-between text-[10px] text-slate-400"><span>{roadmap.tasks?.filter((task) => task.is_completed).length || 0} langkah selesai</span><Link href="/urusan-saya" className="font-bold text-blue-600 hover:underline">Lihat detail</Link></div></div></div></article>; })}</div>}
          </section>

          <aside className="space-y-4">
            <div className="rounded-xl bg-gradient-to-br from-[#173f7a] to-[#2563eb] p-5 text-white shadow-sm"><Sparkles className="h-5 w-5 text-amber-300" /><h2 className="mt-3 font-display text-sm font-bold">SatuAI Insight</h2><p className="mt-2 text-xs leading-relaxed text-blue-100">Kamu punya {roadmaps.filter((roadmap) => roadmap.progress_pct < 100).length} urusan yang masih perlu ditindaklanjuti.</p><button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-satu-ai"))} className="mt-4 rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-[11px] font-bold hover:bg-white/20">Tanya SatuAI <span aria-hidden="true">→</span></button></div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-display text-sm font-bold text-[#0f274a]">Aksi Cepat</h2><div className="mt-3 space-y-1"><Link href="/layanan" className="flex items-center gap-3 rounded-lg px-2 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-blue-600"><Search className="h-3.5 w-3.5 text-blue-500" /> Cari layanan baru</Link><Link href="/riwayat" className="flex items-center gap-3 rounded-lg px-2 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-blue-600"><ClipboardList className="h-3.5 w-3.5 text-violet-500" /> Lihat riwayat</Link><Link href="/bantuan" className="flex items-center gap-3 rounded-lg px-2 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-blue-600"><Bell className="h-3.5 w-3.5 text-amber-500" /> Pusat bantuan</Link><Link href="/urusan-saya" className="flex items-center gap-3 rounded-lg px-2 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-blue-600"><UserRound className="h-3.5 w-3.5 text-indigo-500" /> Profil saya</Link></div></div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-display text-sm font-bold text-[#0f274a]">Notifikasi Terbaru</h2><Link href="/notifikasi" className="text-[10px] font-bold text-blue-600 hover:underline">Lihat semua</Link></div><div className="mt-3 space-y-3 text-xs">{notifications.length === 0 ? <div className="rounded-lg bg-slate-50 p-3 text-center text-[11px] text-slate-500">Belum ada notifikasi.</div> : notifications.slice(0, 3).map((notification) => <div key={notification.id} className="flex gap-2 border-b border-slate-100 pb-3 last:border-0 last:pb-0">{notification.type === "success" ? <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" /> : <AlertTriangle className="h-4 w-4 flex-shrink-0 text-amber-500" />}<div><p className="font-semibold text-slate-700">{notification.title}</p><p className="mt-0.5 text-[10px] leading-relaxed text-slate-500">{notification.message}</p><span className="text-[10px] text-slate-400">{new Date(notification.createdAt).toLocaleDateString("id-ID")}</span></div></div>)}</div></div>
          </aside>
        </div>
      </div>

      {showAddModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Urusan baru</span><h2 className="mt-1 font-display text-xl font-black text-[#0f274a]">Pilih peristiwa hidup</h2></div><button type="button" onClick={() => setShowAddModal(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" title="Tutup"><X className="h-4 w-4" /></button></div><div className="mt-5 space-y-2">{EVENT_OPTIONS.map((event) => <button key={event.slug} type="button" onClick={() => setSelectedEventSlug(event.slug)} className={`w-full rounded-lg border p-3 text-left text-xs font-bold transition ${selectedEventSlug === event.slug ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 hover:border-blue-300"}`}>{event.title}</button>)}</div><button type="button" onClick={handleCreateRoadmap} className="mt-5 w-full rounded-lg bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700">Buat Peta Urusan</button></div></div>}
    </main>
  );
}

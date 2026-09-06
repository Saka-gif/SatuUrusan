"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, LoaderCircle } from "lucide-react";
import { AppNotification, getNotifications, markAllNotificationsRead } from "@/lib/notifications";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sync = () => {
      setNotifications(getNotifications());
      setIsLoading(false);
    };
    sync();
    window.addEventListener("satuurusan-notifications-changed", sync);
    return () => window.removeEventListener("satuurusan-notifications-changed", sync);
  }, []);

  const iconFor = (notification: AppNotification) => {
    if (notification.type === "success") return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
    if (notification.type === "warning") return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    return <Info className="h-5 w-5 text-blue-500" />;
  };

  return (
    <main className="flex-1 bg-[#f7f7f5]">
      <div className="mx-auto w-full max-w-3xl px-4 py-9 sm:px-6">
        <header className="flex items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="font-display text-3xl font-black tracking-tight text-[#0f274a]">Notifikasi</h1>
            <p className="mt-1 text-xs text-slate-500">{notifications.filter((item) => !item.read).length} belum dibaca</p>
          </div>
          {notifications.some((item) => !item.read) && <button type="button" onClick={() => { markAllNotificationsRead(); setNotifications(getNotifications()); }} className="text-xs font-bold text-blue-600 hover:underline">Tandai semua dibaca</button>}
        </header>

        {isLoading ? <div className="flex min-h-64 items-center justify-center text-sm text-slate-500"><LoaderCircle className="mr-2 h-4 w-4 animate-spin text-blue-600" /> Memuat notifikasi...</div> : notifications.length === 0 ? <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><Info className="mx-auto h-8 w-8 text-slate-400" /><h2 className="mt-3 font-display font-bold text-[#0f274a]">Belum ada notifikasi</h2><p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-slate-500">Notifikasi dari aktivitas akunmu akan terkumpul di sini.</p></div> : <section className="mt-6 space-y-3" aria-label="Daftar notifikasi">{notifications.map((notification) => <article key={notification.id} className={`flex gap-3 rounded-2xl border p-4 shadow-sm ${notification.read ? "border-slate-200 bg-white" : "border-blue-300 bg-blue-50/20"}`}><div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white">{iconFor(notification)}</div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h2 className="text-sm font-bold text-[#0f274a]">{notification.title}</h2>{!notification.read && <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" aria-label="Belum dibaca" />}</div><p className="mt-1 text-xs leading-relaxed text-slate-600">{notification.message}</p><time className="mt-2 block text-[10px] text-slate-400">{formatDate(notification.createdAt)}</time></div></article>)}</section>}
      </div>
    </main>
  );
}

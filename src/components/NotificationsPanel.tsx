"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  LoaderCircle, 
  Bell, 
  Check, 
  Trash2, 
  ArrowRight,
  Clock,
  Sparkles,
  Inbox
} from "lucide-react";
import { AppNotification, getNotifications, markAllNotificationsRead } from "@/lib/notifications";

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
  } catch {
    return value;
  }
}

export function NotificationsPanel() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    if (!window.localStorage.getItem("satuurusan_session")) {
      router.replace("/masuk");
      return;
    }

    const sync = () => {
      setNotifications(getNotifications());
      setIsLoading(false);
    };
    sync();
    window.addEventListener("satuurusan-notifications-changed", sync);
    return () => window.removeEventListener("satuurusan-notifications-changed", sync);
  }, [router]);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const filteredList = notifications.filter((item) => {
    if (filter === "unread") return !item.read;
    return true;
  });

  const iconFor = (notification: AppNotification) => {
    if (notification.type === "success") {
      return (
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="h-5 w-5" />
        </div>
      );
    }
    if (notification.type === "warning") {
      return (
        <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="h-5 w-5" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0">
        <Info className="h-5 w-5" />
      </div>
    );
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    setNotifications(getNotifications());
  };

  return (
    <main className="flex-1 bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-36 lg:pb-20 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200/90">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold shadow-2xs">
              <Bell className="w-3.5 h-3.5 text-blue-600" />
              <span>Pusat Notifikasi & Pembaruan</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#0f274a]">
              Pemberitahuan
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
              Informasi perkembangan dokumen, panduan alur, dan pengingat checklist urusan Anda.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-blue-50 text-blue-600 font-bold text-xs rounded-2xl border border-slate-200 hover:border-blue-300 shadow-2xs transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Tandai Semua Dibaca ({unreadCount})</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-[#0f274a] text-white shadow-md shadow-blue-950/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Semua ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filter === "unread"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <span>Belum Dibaca</span>
            {unreadCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                filter === "unread" ? "bg-white text-blue-600" : "bg-rose-500 text-white"
              }`}>
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Content List */}
        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center text-xs text-slate-500 bg-white rounded-3xl border border-slate-200 p-12">
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin text-blue-600" />
            <span>Memuat data notifikasi...</span>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-12 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-100">
              <Inbox className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <h2 className="font-display font-bold text-lg text-[#0f274a]">
                {filter === "unread" ? "Tidak ada notifikasi belum dibaca" : "Belum ada notifikasi"}
              </h2>
              <p className="mx-auto max-w-sm text-xs leading-relaxed text-slate-500">
                Pembaruan aktivitas peta urusan dan konfirmasi dokumen akan muncul secara otomatis di sini.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl shadow-md shadow-blue-600/20 transition-all"
              >
                <span>Buka Dashboard Saya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <section className="space-y-3" aria-label="Daftar notifikasi">
            {filteredList.map((notification) => (
              <article
                key={notification.id}
                className={`flex items-start gap-4 p-5 rounded-3xl border transition-all duration-300 ${
                  notification.read
                    ? "border-slate-200/80 bg-white hover:border-slate-300"
                    : "border-blue-300/80 bg-gradient-to-r from-blue-50/40 via-white to-white shadow-xs hover:border-blue-400"
                }`}
              >
                {iconFor(notification)}
                
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display font-bold text-sm text-[#0f274a]">
                      {notification.title}
                    </h2>
                    {!notification.read && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                        Baru
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {notification.message}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <time>{formatDate(notification.createdAt)}</time>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

      </div>
    </main>
  );
}

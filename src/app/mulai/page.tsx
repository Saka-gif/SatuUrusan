"use client";

import Link from "next/link";
import { AuthBrand } from "@/components/AuthBrand";
import { ArrowRight, ShieldCheck, Compass } from "lucide-react";

export default function StartPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">
        <AuthBrand />
        <Link
          href="/masuk"
          className="text-xs font-bold text-slate-700 hover:text-blue-600 bg-white/80 backdrop-blur-sm border border-slate-200 px-4 py-2 rounded-xl transition-all"
        >
          Masuk Akun
        </Link>
      </header>

      {/* Hero Center */}
      <div className="max-w-4xl mx-auto w-full py-12 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          <span>Langkah Awal yang Teratur</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl text-[#0f274a] tracking-tight leading-tight">
          Semua urusanmu,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
            satu peta terpadu.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Mulai dari satu peristiwa hidup yang sedang kamu hadapi saat ini. Kami akan menyusun daftar langkah, dokumen prasyarat, dan mengarahkanmu ke portal resmi pemerintah.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/daftar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0f274a] via-[#17345b] to-[#2563eb] hover:from-[#17345b] hover:to-[#1d4ed8] text-white font-bold text-sm shadow-xl shadow-blue-950/20 hover:shadow-blue-950/30 transition-all transform hover:-translate-y-0.5"
          >
            <span>Buat Akun Sekarang</span>
            <ArrowRight className="w-4 h-4 text-blue-300" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-sm transition-all"
          >
            <span>Lihat Mode Demo</span>
          </Link>
        </div>

        <div className="pt-6 flex items-center justify-center gap-2 text-xs text-slate-500 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Gratis tanpa pungutan · Menghubungkan langsung ke kanal instansi resmi</span>
        </div>
      </div>

      {/* Footer info */}
      <footer className="max-w-7xl mx-auto w-full text-center text-[11px] text-slate-400 relative z-10">
        © {new Date().getFullYear()} SatuUrusan. Seluruh hak cipta dilindungi.
      </footer>
    </main>
  );
}

"use client";

import { AuthBrand } from "./AuthBrand";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col justify-between p-4 sm:p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 relative overflow-hidden font-sans selection:bg-blue-500/20 selection:text-blue-900">
      {/* Ambient background soft light pools */}
      <div className="absolute top-10 right-1/3 w-[500px] h-[500px] bg-blue-400/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Navigation */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between relative z-10 py-2">
        <AuthBrand />
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-white/80 hover:bg-white border border-slate-200/90 px-3.5 py-2 rounded-xl transition-all shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </header>

      {/* Center Auth Card */}
      <div className="w-full max-w-md mx-auto my-auto py-8 relative z-10">
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-blue-950/10 space-y-6">
          {children}

          {/* Trust & Security Guarantee */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>100% Gratis & Terhubung ke Sistem Resmi Pemerintah</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <footer className="max-w-5xl mx-auto w-full text-center text-xs text-slate-500 relative z-10 py-2">
        © {new Date().getFullYear()} SatuUrusan. Panduan urusan publik netral & terpercaya.
      </footer>
    </main>
  );
}
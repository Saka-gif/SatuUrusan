"use client";

import { AuthBrand } from "./AuthBrand";
import { ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/10 space-y-6">
          <div className="flex items-center justify-between">
            <AuthBrand />
            <Link
              href="/bantuan"
              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
              title="Pusat Bantuan"
            >
              <HelpCircle className="w-4 h-4" />
            </Link>
          </div>

          {children}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Kerahasiaan data Anda terlindungi</span>
          </div>
        </div>
      </div>
    </main>
  );
}
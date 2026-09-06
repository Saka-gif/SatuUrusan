"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/AuthShell";
import { Eye, EyeOff, ArrowRight, Lock, Mail, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const username = email.split("@")[0] || "Teman Satu";
    const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
    window.localStorage.setItem("satuurusan_session", JSON.stringify({
      name: formattedName,
      email,
    }));
    window.dispatchEvent(new CustomEvent("satuurusan-session-changed"));
    setTimeout(() => {
      router.push("/dashboard");
    }, 300);
  };

  const handleDemoLogin = () => {
    setEmail("warga@bantugerak.id");
    setPassword("password123");
    setIsLoading(true);
    window.localStorage.setItem("satuurusan_session", JSON.stringify({
      name: "Warga Demo",
      email: "demo@satuurusan.id",
    }));
    window.dispatchEvent(new CustomEvent("satuurusan-session-changed"));
    setTimeout(() => {
      router.push("/dashboard");
    }, 300);
  };

  return (
    <AuthShell>
      {/* Auth Tab Switcher */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200/60">
        <Link
          href="/masuk"
          className="flex-1 py-2 rounded-xl text-xs font-bold text-center bg-white text-blue-600 shadow-xs border border-slate-200/50 transition-all"
        >
          Masuk Akun
        </Link>
        <Link
          href="/daftar"
          className="flex-1 py-2 rounded-xl text-xs font-bold text-center text-slate-600 hover:text-slate-900 transition-all"
        >
          Daftar Baru
        </Link>
      </div>

      <div className="space-y-1.5 text-left pt-1">
        <h1 className="font-display font-black text-2xl text-[#0f274a] tracking-tight">
          Selamat Datang Kembali
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          Akses peta roadmap urusan administratif dan checklist progres Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-left">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">Email Terdaftar</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full pl-10 pr-4 py-3 bg-slate-50/80 focus:bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all shadow-2xs"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">Kata Sandi</label>
            <Link href="/bantuan" className="text-[11px] text-blue-600 hover:underline font-semibold">
              Lupa sandi?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi"
              className="w-full pl-10 pr-10 py-3 bg-slate-50/80 focus:bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-gradient-to-r from-[#0f274a] via-[#17345b] to-[#2563eb] hover:from-[#17345b] hover:to-[#1d4ed8] text-white font-bold text-xs rounded-2xl shadow-xl shadow-blue-950/20 hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 mt-2 cursor-pointer"
        >
          <span>{isLoading ? "Memproses..." : "Masuk ke Dashboard"}</span>
          <ArrowRight className="w-3.5 h-3.5 text-blue-200" />
        </button>

        {/* 1-Click Quick Demo Access */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-2.5 bg-blue-50 hover:bg-blue-100/80 text-blue-700 font-bold text-xs rounded-2xl border border-blue-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>⚡ Coba Akun Demo Langsung</span>
        </button>
      </form>
    </AuthShell>
  );
}


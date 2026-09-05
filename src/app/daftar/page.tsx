"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/AuthShell";
import { Eye, EyeOff, ArrowRight, Lock, Mail, User, Phone, CheckSquare, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const pass = form.get("password") as string;
    const confirm = form.get("confirmPassword") as string;

    if (pass !== confirm) {
      setError("Konfirmasi kata sandi belum cocok.");
      return;
    }
    if (!accepted) {
      setError("Kamu harus menyetujui syarat & ketentuan.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      router.push("/onboarding");
    }, 400);
  };

  return (
    <AuthShell>
      <div className="space-y-2 text-left">
        <h1 className="font-display font-black text-2xl text-[#0f274a] tracking-tight">
          Buat Akun Baru
        </h1>
        <p className="text-xs text-slate-500">
          Sudah punya akun?{" "}
          <Link href="/masuk" className="text-blue-600 font-bold hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 pt-2 text-left">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Nama Lengkap</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              required
              name="name"
              placeholder="Contoh: Budi Santoso"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Email Aktif</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              required
              type="email"
              name="email"
              placeholder="nama@email.com"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Nomor HP / WhatsApp</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              required
              type="tel"
              name="phone"
              placeholder="08123456789"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Kata Sandi</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              minLength={6}
              placeholder="Minimal 6 karakter"
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Konfirmasi Kata Sandi</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              required
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              minLength={6}
              placeholder="Ulangi kata sandi"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => {
              setAccepted(e.target.checked);
              setError("");
            }}
            className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 w-4 h-4 accent-blue-600"
          />
          <span className="leading-snug">
            Saya menyetujui <Link href="/bantuan" className="text-blue-600 font-bold hover:underline">Syarat & Ketentuan</Link> serta <Link href="/bantuan" className="text-blue-600 font-bold hover:underline">Kebijakan Privasi</Link> SatuUrusan.
          </span>
        </label>

        {error && (
          <div className="flex items-center gap-2 text-[11px] font-bold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-[#0f274a] via-[#17345b] to-[#2563eb] hover:from-[#17345b] hover:to-[#1d4ed8] text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-950/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 mt-2"
        >
          <span>{isLoading ? "Menyiapkan Akun..." : "Buat Akun & Lanjutkan"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>
    </AuthShell>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/AuthShell";
import { Sparkles, Compass, CheckCircle2, ArrowRight, ShieldCheck, Bell } from "lucide-react";

const STAGES = [
  {
    icon: Sparkles,
    iconBg: "bg-blue-50 text-blue-600",
    title: "Biarkan SatuAI Memandu\nUrusan Administratifmu",
    text: "SatuAI siap membantu memahami alur birokrasi, daftar syarat dokumen, dan alternatif solusi jika ada kendala.",
    agree: "Aktifkan Panduan SatuAI",
    skip: "Lewati untuk sekarang"
  },
  {
    icon: Compass,
    iconBg: "bg-amber-50 text-amber-600",
    title: "Pantau Semua Proses\ndalam Satu Dashboard",
    text: "Lihat status kemajuan seluruh urusanmu secara rapi. Tahu kapan harus bertindak dan dokumen apa yang harus dibawa.",
    agree: "Simpan Progres Saya",
    skip: "Nanti saja"
  },
  {
    icon: CheckCircle2,
    iconBg: "bg-emerald-50 text-emerald-600",
    title: "Siap Mulai Mengurus\nPeristiwa Hidupmu?",
    text: "Pilih satu kejadian nyata dan SatuUrusan akan langsung menyusun peta urusan prioritas untuk Anda.",
    agree: "Mulai Jelajahi Dashboard",
    skip: "Kembali"
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [stage, setStage] = useState(0);

  const current = STAGES[stage];
  const IconComponent = current.icon;

  const handleNext = () => {
    if (stage === STAGES.length - 1) {
      router.push("/dashboard");
    } else {
      setStage(stage + 1);
    }
  };

  return (
    <AuthShell>
      <div className="text-center space-y-6 py-2">
        {/* Stage Icon */}
        <div className={`w-16 h-16 mx-auto rounded-3xl flex items-center justify-center shadow-md ${current.iconBg}`}>
          <IconComponent className="w-8 h-8" />
        </div>

        {/* Title & Desc */}
        <div className="space-y-2">
          <h1 className="font-display font-extrabold text-xl sm:text-2xl text-[#0f274a] whitespace-pre-line tracking-tight leading-tight">
            {current.title}
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            {current.text}
          </p>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2">
          {STAGES.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === stage ? "w-6 bg-blue-600" : "w-2 bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={handleNext}
            className="w-full py-3 bg-gradient-to-r from-[#0f274a] via-[#17345b] to-[#2563eb] hover:from-[#17345b] hover:to-[#1d4ed8] text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-950/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            <span>{current.agree}</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
          </button>

          {stage < STAGES.length - 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-2.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              {current.skip}
            </button>
          )}
        </div>
      </div>
    </AuthShell>
  );
}

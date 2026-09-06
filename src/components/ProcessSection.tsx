"use client";

import { useState } from "react";
import { 
  Compass, 
  ListOrdered, 
  CheckSquare, 
  ExternalLink, 
  ArrowRight, 
  ChevronRight,
  Info
} from "lucide-react";
import Link from "next/link";

const PROCESS_STEPS = [
  {
    number: "01",
    icon: Compass,
    title: "Pahami Peristiwanya",
    tagline: "Mulai dari apa yang kamu alami",
    description: "Cukup pilih situasi nyata yang sedang kamu jalani (pindah rumah, menikah, pekerjaan baru, atau kelahiran). Anda tidak perlu bingung menghafal nama instansi terlebih dahulu.",
    tip: "Kami memetakan seluruh dampak administratif dari peristiwa tersebut secara terstruktur.",
    accent: "from-blue-500 to-indigo-600",
    iconBg: "bg-blue-50 text-blue-600"
  },
  {
    number: "02",
    icon: ListOrdered,
    title: "Susun Urutan Langkah",
    tagline: "Prioritas terstruktur & anti-bolak-balik",
    description: "SatuUrusan mengurutkan langkah mana yang wajib diselesaikan nomor satu (misalnya Surat Pindah sebelum cetak KTP baru), sehingga Anda tidak membuang waktu dan biaya.",
    tip: "Setiap langkah dilengkapi dengan daftar dokumen yang wajib disiapkan dari rumah.",
    accent: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-50 text-amber-600"
  },
  {
    number: "03",
    icon: CheckSquare,
    title: "Ikuti Checklist Progres",
    tagline: "Pantau apa yang sudah & belum beres",
    description: "Tandai progres di dashboard pribadi. Simpan catatan khusus, unduh ringkasan berkas, dan dapatkan kepastian langkah berikutnya dengan tenang.",
    tip: "Tersedia indikator persen kemajuan untuk memastikan tidak ada dokumen yang terlewat.",
    accent: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-50 text-emerald-600"
  },
  {
    number: "04",
    icon: ExternalLink,
    title: "Hubungkan ke Kanal Resmi",
    tagline: "Aman, terverifikasi & bebas calo",
    description: "Kami mengarahkan Anda langsung ke portal online resmi instansi (Disdukcapil, BPJS, DJP, Korlantas Polri) atau kantor fisik terdekat tanpa perantara pihak ketiga.",
    tip: "Semua pengajuan diproses langsung oleh sistem resmi negara (.go.id).",
    accent: "from-indigo-500 to-purple-600",
    iconBg: "bg-indigo-50 text-indigo-600"
  }
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const current = PROCESS_STEPS[activeStep];
  const IconComponent = current.icon;

  return (
    <section className="py-24 bg-[#0a192f] text-white relative overflow-hidden" id="cara-kerja">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-soft" />
            <span>Prinsip & Cara Kerja</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Kami bukan dinas pemerintah.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
              Kami merapikan jalannya.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            SatuUrusan tidak mencetak KTP atau menggantikan instansi mana pun. Kami adalah pemandu netral yang memastikan Anda tahu apa yang harus disiapkan sebelum melangkah ke kanal resmi.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {PROCESS_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isActive = activeStep === idx;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 ease-out transform hover:-translate-y-1 relative overflow-hidden group cursor-pointer ${
                  isActive
                    ? "bg-white/10 border-blue-400/50 shadow-xl shadow-blue-500/10 ring-1 ring-blue-400/30"
                    : "bg-slate-900/50 border-slate-800 hover:bg-white/5 hover:border-blue-400/40"
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-amber-400" />
                )}

                <div className="flex items-center justify-between mb-3.5">
                  <span className={`font-mono text-xs font-black tracking-wider ${isActive ? "text-amber-300" : "text-slate-500"}`}>
                    LANGKAH {step.number}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? "bg-blue-500/20 text-blue-300" : "bg-slate-800 text-slate-500 group-hover:text-blue-300"}`}>
                    <StepIcon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className={`font-display font-bold text-sm sm:text-base ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                  {step.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Highlight Stage Card */}
        <div className="bg-gradient-to-br from-slate-900/95 via-[#0f274a] to-slate-900/95 rounded-3xl border border-blue-500/20 p-6 sm:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Big number watermark */}
          <span className="font-display font-black text-7xl sm:text-9xl text-white/5 absolute right-6 sm:right-12 top-6 sm:top-1/2 -translate-y-1/2 pointer-events-none select-none">
            {current.number}
          </span>

          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br ${current.accent} text-white`}>
                <IconComponent className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
                  {current.tagline}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {current.title}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {current.description}
            </p>

            {/* Context Tip Box */}
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-400/20 text-xs sm:text-sm text-blue-200 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
              <span>{current.tip}</span>
            </div>

            {/* Step navigation actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/mulai"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>Coba Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length)}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span>Langkah Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
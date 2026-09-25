"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  Compass, 
  ListOrdered, 
  CheckSquare, 
  ExternalLink, 
  ArrowRight, 
  X,
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
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (activeStep !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeStep]);

  const rotations = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];
  
  return (
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden" id="cara-kerja">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse-soft" />
            <span>Prinsip & Cara Kerja</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#0f274a] tracking-tight">
            Kami bukan dinas pemerintah.<br />
            <span className="text-blue-600">
              Kami merapikan jalannya.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            SatuUrusan tidak mencetak KTP atau menggantikan instansi mana pun. Kami adalah pemandu netral yang memastikan Anda tahu apa yang harus disiapkan sebelum melangkah ke kanal resmi.
          </p>
        </div>

        {/* Desktop Interactive Step Navigator with SVG Connectors */}
        <div className="relative w-full mx-auto mb-16 hidden lg:block h-[340px]">
          {/* Connector 1 (Card 1 is higher, Card 2 is lower) */}
          <div className="absolute top-[35%] left-[18.5%] w-[10%] h-[50px] z-20 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <path d="M 10 20 Q 90 80 170 60" fill="none" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
              <circle cx="10" cy="20" r="9" fill="#3b82f6" />
              <circle cx="170" cy="60" r="9" fill="#3b82f6" />
            </svg>
          </div>

          {/* Connector 2 (Card 2 is lower, Card 3 is higher) U-shape downward */}
          <div className="absolute top-[55%] left-[44%] w-[10%] h-[50px] z-20 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <path d="M 10 30 C 60 110, 120 110, 170 10" fill="none" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
              <circle cx="10" cy="30" r="9" fill="#3b82f6" />
              <circle cx="170" cy="10" r="9" fill="#3b82f6" />
            </svg>
          </div>

          {/* Connector 3 (Card 3 is higher, Card 4 is lowest) */}
          <div className="absolute top-[45%] left-[69%] w-[10%] h-[50px] z-20 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <path d="M 10 10 Q 90 80 170 80" fill="none" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
              <circle cx="10" cy="10" r="9" fill="#3b82f6" />
              <circle cx="170" cy="80" r="9" fill="#3b82f6" />
            </svg>
          </div>

          <div className="grid grid-cols-4 gap-8 xl:gap-12 relative z-10 h-full items-center">
            {PROCESS_STEPS.map((step, idx) => {
              // Staggering height/margin slightly to add dynamic feel like the design
              const margins = ["mt-0", "mt-12", "mt-4", "mt-20"];
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-6 xl:p-8 rounded-[2rem] bg-white shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer flex flex-col h-[280px] group ${rotations[idx]} ${margins[idx]} ${
                    activeStep === idx ? "ring-2 ring-blue-500 border-blue-500 scale-105" : "border border-slate-100 hover:border-blue-200"
                  }`}
                >
                  <h3 className="font-display text-4xl xl:text-5xl font-black text-[#0f274a] group-hover:text-blue-600 transition-colors mb-6">
                    {step.number}
                  </h3>
                  <h4 className="font-bold text-lg xl:text-xl text-slate-800 mb-3">{step.title}</h4>
                  <p className="text-xs xl:text-sm text-slate-500 leading-relaxed line-clamp-3 xl:line-clamp-4">
                    {step.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Layout with SVG Connectors */}
        <div className="flex flex-col items-center w-full pb-10 pt-4 lg:hidden relative z-10">
           {PROCESS_STEPS.map((step, idx) => {
              return (
                <div key={step.number} className="w-full flex flex-col items-center">
                  {/* Vertical SVG Connector */}
                  {idx > 0 && (
                    <div className="w-12 h-24 -mt-8 -mb-4 relative z-20 pointer-events-none">
                      <svg viewBox="0 0 50 100" className="w-full h-full overflow-visible">
                        {idx % 2 === 1 ? (
                           <path d="M 25 5 C 45 40, 5 60, 25 95" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                        ) : (
                           <path d="M 25 5 C 5 40, 45 60, 25 95" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                        )}
                        <circle cx="25" cy="5" r="7" fill="#3b82f6" />
                        <circle cx="25" cy="95" r="7" fill="#3b82f6" />
                      </svg>
                    </div>
                  )}

                  {/* Square Card for Mobile */}
                  <button
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`relative z-10 w-full max-w-[280px] aspect-square flex flex-col text-left p-7 rounded-[2rem] bg-white shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer group ${rotations[idx]} ${
                      activeStep === idx ? "ring-2 ring-blue-500 border-blue-500 scale-[1.02]" : "border border-slate-100 hover:border-blue-200"
                    }`}
                  >
                    <h3 className="font-display text-4xl font-black text-[#0f274a] group-hover:text-blue-600 transition-colors mb-6">
                      {step.number}
                    </h3>
                    <h4 className="font-bold text-lg text-slate-800 leading-snug mb-3">{step.title}</h4>
                    <p className="text-sm text-slate-500 line-clamp-3">
                      {step.description}
                    </p>
                  </button>
                </div>
              );
            })}
        </div>

      </div>

      {/* Sidebar Overlay Modal */}
      {mounted && activeStep !== null && createPortal(
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div 
            className="absolute inset-0 bg-slate-900/40 transition-opacity"
            onClick={() => setActiveStep(null)}
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 z-10">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <span className="font-display font-bold text-blue-600">Langkah {PROCESS_STEPS[activeStep].number}</span>
              <button 
                onClick={() => setActiveStep(null)}
                className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Sidebar Content */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg ${PROCESS_STEPS[activeStep].iconBg} border border-slate-100`}>
                {(() => {
                  const Icon = PROCESS_STEPS[activeStep].icon;
                  return <Icon className="w-8 h-8" />;
                })()}
              </div>
              
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
                {PROCESS_STEPS[activeStep].tagline}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0f274a] mb-6">
                {PROCESS_STEPS[activeStep].title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed mb-8">
                {PROCESS_STEPS[activeStep].description}
              </p>
              
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-sm text-blue-800 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>{PROCESS_STEPS[activeStep].tip}</span>
              </div>
            </div>
            
            {/* Sidebar Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <Link
                href="/mulai"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-colors"
              >
                <span>Mulai Susun Urusan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
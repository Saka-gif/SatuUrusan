"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Compass, 
  ListOrdered, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  FileText,
  HelpCircle
} from "lucide-react";
import Link from "next/link";

const WORK_STEPS = [
  {
    step: "01",
    title: "Ceritakan peristiwanya",
    summary: "Pilih situasi yang paling dekat dengan keadaanmu saat ini.",
    tip: "Kamu tidak perlu tahu nama instansinya terlebih dahulu. Misalnya 'Pindah Domisili' atau 'Membuka Usaha Baru'.",
    badge: "Fase Awal"
  },
  {
    step: "02",
    title: "Kami susun peta urusan",
    summary: "SatuUrusan menghubungkan kebutuhan yang biasanya tersebar di berbagai instansi.",
    tip: "Setiap langkah diurutkan secara logis agar tidak terjadi penolakan berkas karena syarat prasyarat belum selesai.",
    badge: "Pemetaan Cerdas"
  },
  {
    step: "03",
    title: "Kamu ikuti langkahnya",
    summary: "Tandai progres dan siapkan dokumen yang diperlukan di setiap tahap.",
    tip: "Checklist interaktif membuatmu selalu tahu dokumen apa yang sudah dan belum disiapkan.",
    badge: "Aksi Terarah"
  },
  {
    step: "04",
    title: "Terhubung ke kanal resmi",
    summary: "Setiap layanan tetap dilakukan di portal online resmi atau kantor instansi terkait.",
    tip: "Kami membantu menemukan pintu resmi yang tepat tanpa calo dan tanpa biaya tambahan.",
    badge: "Finalisasi Resmi"
  }
];

const FAQS = [
  {
    q: "Bagaimana cara memulai proses administrasi?",
    a: "Pilih satu peristiwa hidup yang sedang kamu alami di halaman Beranda atau Dashboard. SatuUrusan akan langsung menyusun peta urusan, dokumen prasyarat, dan urutan tindakannya."
  },
  {
    q: "Apakah SatuUrusan memproses dokumen saya secara langsung?",
    a: "Tidak. SatuUrusan tidak mencetak KTP, menerbitkan KK, atau bertindak sebagai agen biro jasa. Kami adalah platform pemandu informasi yang mengarahkan Anda ke kanal resmi pemerintah."
  },
  {
    q: "Apakah informasi yang diberikan di platform ini resmi dan valid?",
    a: "Ya. Seluruh panduan disusun berdasarkan regulasi terbaru (seperti Permendagri, Perpres, dan peraturan instansi terkait) serta dilengkapi tautan langsung ke situs resmi pemerintah (.go.id)."
  },
  {
    q: "Apakah layanan di SatuUrusan berbayar?",
    a: "Tidak. Platform SatuUrusan dapat digunakan secara 100% gratis oleh seluruh masyarakat Indonesia."
  }
];

export function WorkGuide() {
  const [activeStep, setActiveStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#0f274a] via-[#173960] to-[#1e4976] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Panduan & Metodologi SatuUrusan</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Ada yang ingin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-amber-300">kamu pahami?</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Temukan bagaimana SatuUrusan mengubah kerumitan birokrasi menjadi urutan langkah yang mudah dipahami.
          </p>
        </div>
      </section>

      {/* Interactive 4-step workflow */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Alur Sederhana</span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#0f274a]">
            Empat Langkah Menuju Ketenangan
          </h2>
        </div>

        {/* Step Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {WORK_STEPS.map((ws, idx) => (
            <button
              key={ws.step}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 ease-out transform hover:-translate-y-1 cursor-pointer ${
                activeStep === idx
                  ? "bg-[#0f274a] text-white border-[#0f274a] shadow-xl shadow-blue-950/20"
                  : "bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50 shadow-sm"
              }`}
            >
              <span className={`font-mono text-xs font-bold block ${activeStep === idx ? "text-amber-300" : "text-blue-600"}`}>
                LANGKAH {ws.step}
              </span>
              <h3 className="font-display font-bold text-sm sm:text-base mt-1 line-clamp-1">{ws.title}</h3>
            </button>
          ))}
        </div>

        {/* Active Step Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                {WORK_STEPS[activeStep].badge}
              </span>
              <h3 className="font-display font-extrabold text-2xl text-[#0f274a] mt-1">
                {WORK_STEPS[activeStep].title}
              </h3>
            </div>
            <span className="font-display font-black text-4xl text-slate-200">
              {WORK_STEPS[activeStep].step}
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {WORK_STEPS[activeStep].summary}
          </p>

          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-xs sm:text-sm text-blue-900 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <span>{WORK_STEPS[activeStep].tip}</span>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Link
              href="/mulai"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20"
            >
              <span>Coba Alur Ini</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((p) => p - 1)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-500 disabled:opacity-30 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>
              <button
                type="button"
                disabled={activeStep === WORK_STEPS.length - 1}
                onClick={() => setActiveStep((p) => p + 1)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-blue-600 disabled:opacity-30 rounded-lg hover:bg-blue-50 cursor-pointer"
              >
                <span>Berikutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="pt-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Pertanyaan Umum</span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0f274a]">
                Hal yang Sering Ditanyakan
              </h2>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari FAQ..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-[#0f274a]">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

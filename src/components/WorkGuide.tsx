"use client";

import { useState } from "react";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ArrowLeft,
  Info
} from "lucide-react";
import Link from "next/link";

const WORK_STEPS = [
  {
    step: "01",
    title: "Pilih Kejadian Hidup",
    summary: "Pilih situasi yang paling dekat dengan keadaanmu saat ini (misalnya pindah rumah, pekerjaan baru, atau membuka usaha).",
    tip: "Anda tidak perlu tahu nama instansinya terlebih dahulu. Kami yang akan mengidentifikasi semua dinas terkait.",
    badge: "Fase 1: Identifikasi"
  },
  {
    step: "02",
    title: "Peta Urusan Disusun",
    summary: "SatuUrusan menghubungkan kebutuhan yang biasanya tersebar di berbagai instansi menjadi urutan prioritas.",
    tip: "Setiap langkah diurutkan secara logis agar tidak terjadi penolakan berkas karena syarat prasyarat belum selesai.",
    badge: "Fase 2: Pemetaan"
  },
  {
    step: "03",
    title: "Ikuti Checklist & Berkas",
    summary: "Tandai progres dan siapkan dokumen yang diperlukan di setiap tahap secara terstruktur.",
    tip: "Checklist interaktif membuat Anda selalu tahu dokumen apa yang sudah dan belum disiapkan.",
    badge: "Fase 3: Eksekusi"
  },
  {
    step: "04",
    title: "Terhubung ke Kanal Resmi",
    summary: "Setiap layanan tetap diproses melalui portal online resmi (.go.id) atau kantor instansi terkait tanpa calo.",
    tip: "Kami membantu menemukan pintu resmi yang tepat tanpa pungutan biaya tambahan apapun.",
    badge: "Fase 4: Finalisasi"
  }
];

const FAQS = [
  {
    q: "Bagaimana cara memulai proses administrasi?",
    a: "Pilih satu peristiwa hidup yang sedang Anda alami di halaman Beranda atau Dashboard. SatuUrusan akan langsung menyusun peta urusan, dokumen prasyarat, dan urutan tindakannya secara runtut."
  },
  {
    q: "Apakah SatuUrusan memproses dokumen saya secara langsung?",
    a: "Tidak. SatuUrusan tidak mencetak KTP, menerbitkan KK, atau bertindak sebagai biro jasa. Kami adalah platform pemandu informasi yang mengarahkan Anda langsung ke kanal resmi pemerintah (.go.id)."
  },
  {
    q: "Apakah informasi yang diberikan di platform ini resmi dan valid?",
    a: "Ya. Seluruh panduan disusun berdasarkan regulasi terbaru (seperti Permendagri, Perpres, dan peraturan kementerian terkait) serta diverifikasi secara berkala."
  },
  {
    q: "Apakah layanan di SatuUrusan berbayar?",
    a: "Tidak. Platform SatuUrusan dapat digunakan secara 100% gratis oleh seluruh masyarakat Indonesia tanpa pungutan biaya apapun."
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
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-soft" />
            <span>Panduan & Metodologi SatuUrusan</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Bagaimana SatuUrusan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-amber-300">bekerja?</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Temukan bagaimana kami mengubah kerumitan birokrasi menjadi urutan langkah yang mudah dipahami dan bebas calo.
          </p>
        </div>
      </section>

      {/* Interactive 4-step workflow */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Alur Kerja</span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#0f274a]">
            Empat Tahap Menuju Kepastian
          </h2>
        </div>

        {/* Step Tabs with dynamic light-blue hover */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {WORK_STEPS.map((ws, idx) => (
            <button
              key={ws.step}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 ease-out transform hover:-translate-y-1 cursor-pointer ${
                activeStep === idx
                  ? "bg-[#0f274a] text-white border-[#0f274a] shadow-xl shadow-blue-950/20"
                  : "bg-white text-slate-700 border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/40 shadow-sm"
              }`}
            >
              <span className={`font-mono text-xs font-bold block ${activeStep === idx ? "text-amber-300" : "text-blue-600"}`}>
                TAHAP {ws.step}
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
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>{WORK_STEPS[activeStep].tip}</span>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Link
              href="/mulai"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 transform hover:-translate-y-0.5"
            >
              <span>Coba Alur Ini</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-200" />
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

        {/* FAQs Accordion with Light Blue Glow */}
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
                placeholder="Cari pertanyaan..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-slate-200/80 hover:border-blue-300 overflow-hidden transition-all shadow-sm hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-[#0f274a]">{faq.q}</span>
                    <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
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


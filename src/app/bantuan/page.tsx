"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  ArrowRight
} from "lucide-react";

const TOPICS = [
  "Semua Topik",
  "Tentang SatuUrusan",
  "Keamanan & Privasi",
  "Panduan Penggunaan",
  "Kanal Resmi Pemerintah"
];

const QUESTIONS = [
  {
    category: "Tentang SatuUrusan",
    q: "Apa itu SatuUrusan dan bagaimana cara kerjanya?",
    a: "SatuUrusan adalah platform navigator urusan administratif publik di Indonesia. Kami memetakan seluruh kebutuhan dokumen, alur, dan syarat berdasarkan peristiwa hidup yang kamu alami (seperti pindah rumah, karir baru, menikah, kelahiran), lalu mengarahkanmu langsung ke kanal resmi pemerintah tanpa calo."
  },
  {
    category: "Tentang SatuUrusan",
    q: "Apakah SatuUrusan terhubung atau mewakili instansi pemerintah?",
    a: "Bukan. SatuUrusan adalah platform navigasi independen yang bertujuan merapikan informasi birokrasi dan memudahkan masyarakat. Kami tidak mencetak dokumen atau memungut biaya apapun."
  },
  {
    category: "Keamanan & Privasi",
    q: "Bagaimana memastikan informasi di SatuUrusan tetap akurat dan resmi?",
    a: "Kami selalu menampilkan sumber rujukan peraturan resmi, waktu verifikasi berkala, dan tautan langsung ke portal resmi (.go.id) sebelum kamu mengajukan permohonan."
  },
  {
    category: "Panduan Penggunaan",
    q: "Apakah saya harus membuat akun untuk menggunakan SatuUrusan?",
    a: "Belum perlu. Kamu bisa bebas menjelajahi katalog layanan, mencari syarat dokumen, dan bertanya ke SatuAI tanpa login. Namun jika ingin menyimpan progress checklist roadmap di Dashboard, kamu bisa membuat akun gratis."
  },
  {
    category: "Keamanan & Privasi",
    q: "Apakah SatuUrusan menyimpan atau memproses data rahasia/biometrik saya?",
    a: "Sama sekali tidak. Kami tidak pernah meminta kata sandi perbankan, PIN, scan KTP asli di server terbuka, atau data biometrik. Semua pengajuan berkas tetap dilakukan pada sistem resmi instansi terkait."
  },
  {
    category: "Kanal Resmi Pemerintah",
    q: "Bagaimana cara mengakses portal resmi jika saya sudah siap?",
    a: "Di setiap checklist tugas pada roadmap atau katalog layanan, terdapat tombol 'Buka Portal Resmi Instansi' yang langsung mengarah ke situs web resmi pemerintah (seperti dukcapil.kemendagri.go.id, bpjs-kesehatan.go.id, oss.go.id, atau pajakonlin)."
  }
];

export function HelpContent() {
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("Semua Topik");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = QUESTIONS.filter((item) => {
    const matchTopic = selectedTopic === "Semua Topik" || item.category === selectedTopic;
    const matchQuery =
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.a.toLowerCase().includes(query.toLowerCase());
    return matchTopic && matchQuery;
  });

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-12 lg:pt-32 lg:pb-16 space-y-10">
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>Pusat Informasi & Bantuan</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-[#0f274a] tracking-tight">
          Mulai dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">tenang.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Temukan jawaban singkat tentang peran SatuUrusan, jaminan privasi, dan cara memanfaatkan panduan administrasi.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari pertanyaan atau kata kunci..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all"
        />
      </div>

      {/* Main Grid: Topic Categories + Accordion List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Topic Selector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-2 mb-2">
              Kategori Pertanyaan
            </span>
            {TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  selectedTopic === topic
                    ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{topic}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </button>
            ))}
          </div>

          {/* Contact Card */}
          <div className="bg-gradient-to-br from-[#0f274a] to-[#1e4976] rounded-2xl p-6 text-white shadow-lg space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base">Belum menemukan jawaban?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tanyakan langsung pada asisten cerdas SatuAI atau hubungi tim bantuan kami.
            </p>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-satu-ai"));
                }
              }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all text-center block"
            >
              Buka SatuAI Guide
            </button>
          </div>
        </div>

        {/* Right Accordion List */}
        <div className="lg:col-span-8 space-y-3">
          {filtered.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
                  isOpen
                    ? "border-blue-400 ring-2 ring-blue-500/10 shadow-md shadow-blue-500/5"
                    : "border-slate-200/90 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5 hover:-translate-y-0.5"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 focus:outline-none group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-base text-[#0f274a] group-hover:text-blue-600 transition-colors">
                      {item.q}
                    </h3>
                  </div>
                  {isOpen ? (
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <ChevronUp className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 group-hover:text-blue-600 text-slate-400 flex items-center justify-center flex-shrink-0 mt-1 transition-colors">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
              Tidak ada pertanyaan yang sesuai dengan kata kunci &quot;{query}&quot;.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <HelpContent />
    </div>
  );
}

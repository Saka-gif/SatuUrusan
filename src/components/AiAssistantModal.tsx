"use client";

import { useState, useEffect, useRef } from "react";
import { 
  X, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  HelpCircle,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

type ChatMessage = {
  id: string;
  sender: "user" | "ai";
  text: string;
  actionUrl?: string;
  actionLabel?: string;
  steps?: string[];
  officialUrl?: string;
};

const SUGGESTED_PROMPTS = [
  "Bagaimana cara pindah domisili KTP antar provinsi?",
  "Syarat buat KK baru setelah menikah?",
  "Cara daftar BPJS Kesehatan Mandiri secara online?",
  "Dokumen untuk pembuatan NIB di OSS RBA?",
  "Bagaimana cara perpanjang SIM online via aplikasi?"
];

const PRESET_RESPONSES: Record<string, { text: string; steps: string[]; officialUrl: string; actionUrl: string; actionLabel: string }> = {
  "pindah": {
    text: "Untuk pindah domisili KTP & KK, Anda perlu mengurus SKPWNI di daerah asal lalu mencetak dokumen baru di alamat tujuan:",
    steps: [
      "1. Siapkan KTP Asli, KK Asli, dan Alamat Tujuan Lengkap",
      "2. Ajukan SKPWNI via portal online Dukcapil daerah asal atau kantor Disdukcapil",
      "3. Bawa SKPWNI ke Disdukcapil tujuan untuk diterbitkan KK baru & KTP-el baru",
      "4. Update faskes BPJS Kesehatan via Mobile JKN dan lapor RT/RW setempat"
    ],
    officialUrl: "https://layananonline.dukcapil.kemendagri.go.id",
    actionUrl: "/dashboard",
    actionLabel: "Buka Roadmap Pindah Domisili"
  },
  "menikah": {
    text: "Berikut langkah penting administrasi sebelum dan setelah pernikahan:",
    steps: [
      "1. Urus Surat Pengantar N1, N2, N4 dari Kelurahan masing-masing",
      "2. Daftar SIMKAH Kemenag (Muslim) atau Catatan Sipil minimal H-10 kerja",
      "3. Tes kesehatan pranikah di Puskesmas untuk sertifikat ELSIMIL",
      "4. Setelah akad/pemberkatan, pisahkan KK lama dan buat KK baru bersama pasangan",
      "5. Update status perkawinan di KTP-el dan satukan nomor BPJS Kesehatan"
    ],
    officialUrl: "https://simkah4.kemenag.go.id",
    actionUrl: "/dashboard",
    actionLabel: "Buka Roadmap Menikah"
  },
  "bpjs": {
    text: "Pendaftaran BPJS Kesehatan Mandiri bisa dilakukan 100% online tanpa harus antre:",
    steps: [
      "1. Unduh aplikasi 'Mobile JKN' di Play Store / App Store",
      "2. Pilih menu 'Pendaftaran Peserta Baru' dan setujui syarat & ketentuan",
      "3. Masukkan NIK KTP dan nomor Kartu Keluarga",
      "4. Pilih Fasilitas Kesehatan Tingkat Pertama (FKTP / Puskesmas / Klinik) terdekat",
      "5. Pilih kelas rawat (Kelas 1, 2, atau 3) dan lakukan pembayaran iuran pertama via autodebet"
    ],
    officialUrl: "https://bpjs-kesehatan.go.id",
    actionUrl: "/layanan",
    actionLabel: "Lihat Detail Layanan BPJS"
  },
  "nib": {
    text: "Nomor Induk Berusaha (NIB) adalah identitas tunggal bagi pelaku usaha UMKM:",
    steps: [
      "1. Buka portal resmi OSS RBA di oss.go.id dan pilih 'Daftar'",
      "2. Masukkan NIK KTP, email aktif, dan nomor telepon pemilik usaha",
      "3. Isi profil usaha, alamat kegiatan usaha, dan kode KBLI (Klasifikasi Baku Lapangan Usaha)",
      "4. Klik 'Proses NIB' — dokumen NIB ber-QR Code akan langsung terbit dalam hitungan menit secara gratis"
    ],
    officialUrl: "https://oss.go.id",
    actionUrl: "/dashboard",
    actionLabel: "Buka Roadmap Memulai Usaha"
  },
  "sim": {
    text: "Perpanjangan SIM A dan C dapat dilakukan dari rumah melalui aplikasi Digital Korlantas:",
    steps: [
      "1. Download aplikasi 'Digital Korlantas Polri'",
      "2. Lakukan tes kesehatan di erikkes.id dan tes psikologi di app.eppsi.id",
      "3. Unggah foto SIM lama, E-KTP, dan pasfoto latar belakang biru",
      "4. Pilih SATPAS terdekat dan pilih metode pengiriman POS Indonesia langsung ke rumah Anda"
    ],
    officialUrl: "https://digitalkorlantas.id",
    actionUrl: "/layanan",
    actionLabel: "Lihat Layanan Kendaraan"
  }
};

export function AiAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Halo! Saya **SatuAI**, asisten panduan administrasi & urusan publik Anda. Ada peristiwa hidup atau urusan berkas yang sedang Anda hadapi?",
      steps: [
        "Pindah tempat tinggal / ganti KTP & KK",
        "Pendaftaran BPJS Kesehatan & Ketenagakerjaan",
        "Surat nikah & pembuatan KK baru",
        "NIB & Izin Usaha UMKM di OSS"
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-satu-ai", handleOpen);
    return () => window.removeEventListener("open-satu-ai", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Smart matcher
    setTimeout(() => {
      const qLower = query.toLowerCase();
      let matchedResponse = null;

      if (qLower.includes("pindah") || qLower.includes("domisili") || qLower.includes("ktp") || qLower.includes("kk")) {
        matchedResponse = PRESET_RESPONSES["pindah"];
      } else if (qLower.includes("nikah") || qLower.includes("kawin") || qLower.includes("suami") || qLower.includes("istri")) {
        matchedResponse = PRESET_RESPONSES["menikah"];
      } else if (qLower.includes("bpjs") || qLower.includes("sehat") || qLower.includes("faskes")) {
        matchedResponse = PRESET_RESPONSES["bpjs"];
      } else if (qLower.includes("usaha") || qLower.includes("nib") || qLower.includes("oss") || qLower.includes("umkm")) {
        matchedResponse = PRESET_RESPONSES["nib"];
      } else if (qLower.includes("sim") || qLower.includes("stnk") || qLower.includes("kendaraan") || qLower.includes("motor") || qLower.includes("mobil")) {
        matchedResponse = PRESET_RESPONSES["sim"];
      }

      if (matchedResponse) {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai_${Date.now()}`,
            sender: "ai",
            text: matchedResponse.text,
            steps: matchedResponse.steps,
            officialUrl: matchedResponse.officialUrl,
            actionUrl: matchedResponse.actionUrl,
            actionLabel: matchedResponse.actionLabel
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai_${Date.now()}`,
            sender: "ai",
            text: `Saya memahami Anda ingin mengetahui informasi tentang "${query}". Berikut panduan umum alurnya:`,
            steps: [
              "1. Pastikan dokumen identitas dasar lengkap (KTP-el & Kartu Keluarga asli)",
              "2. Periksa apakah instansi terkait memiliki portal pendaftaran online resmi",
              "3. Siapkan scan dokumen dalam format PDF/JPG jelas berukuran di bawah 2MB",
              "4. Anda dapat menyusun checklist langkah ini secara rapi di Dashboard SatuUrusan"
            ],
            officialUrl: "https://indonesia.go.id",
            actionUrl: "/dashboard",
            actionLabel: "Susun Roadmap di Dashboard"
          }
        ]);
      }
      setIsTyping(false);
    }, 650);
  };

  return (
    <>
      {/* Floating trigger button on bottom-right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 group border border-blue-400/30"
        aria-label="Buka Asisten Panduan"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>
        <Compass className="w-4 h-4 text-blue-100 group-hover:rotate-45 transition-transform duration-300" />
        <span className="font-bold text-xs tracking-wide">Tanya Panduan</span>
      </button>

      {/* Modal / Slide-in Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full sm:max-w-lg h-[85vh] sm:h-[620px] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200/80 animate-in slide-in-from-bottom-6 duration-300"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0f274a] via-[#173960] to-[#1e4976] px-5 py-4 text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                  <Compass className="w-5 h-5 text-sky-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white tracking-tight">SatuAI Guide</h3>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                      Online
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">Navigator panduan urusan birokrasi Indonesia</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      <Compass className="w-3.5 h-3.5 text-sky-200" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-none space-y-2.5"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Step by step highlight */}
                    {msg.steps && msg.steps.length > 0 && (
                      <div className="space-y-1.5 pt-1 border-t border-slate-100">
                        {msg.steps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <ChevronRight className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action button & official portal link */}
                    {(msg.actionUrl || msg.officialUrl) && (
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {msg.actionUrl && (
                          <Link
                            href={msg.actionUrl}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-[11px] transition-colors shadow-sm"
                          >
                            <span>{msg.actionLabel || "Buka Roadmap"}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                        {msg.officialUrl && (
                          <a
                            href={msg.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-medium transition-colors"
                          >
                            <span>Kanal Resmi</span>
                            <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex-shrink-0 flex items-center justify-center text-white text-xs shadow-sm">
                      <User className="w-3.5 h-3.5 text-slate-200" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-center text-slate-400 text-xs pl-2 animate-pulse">
                  <Bot className="w-4 h-4 text-blue-500" />
                  <span>SatuAI sedang menyusun langkah...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggested Chips */}
            <div className="px-4 py-2 bg-white border-t border-slate-100 overflow-x-auto flex gap-2 no-scrollbar">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="flex-shrink-0 text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200/80 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan urusan administratif kamu..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-sm"
                aria-label="Kirim pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

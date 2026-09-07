"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./BrandMark";
import { 
  ShieldCheck, 
  ExternalLink, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Compass, 
  HelpCircle, 
  Bot, 
  ArrowUp, 
  Lock, 
  Zap, 
  ArrowRight,
  Globe
} from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const shouldHideFooter = [
    "/dashboard", 
    "/urusan-saya", 
    "/riwayat", 
    "/notifikasi",
    "/daftar",
    "/masuk",
    "/mulai",
    "/onboarding"
  ].some((path) => pathname === path || pathname.startsWith(path));

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const openAiAssistant = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-satu-ai"));
    }
  };

  if (shouldHideFooter) return null;

  const popularTags = [
    { label: "#KTP-el", href: "/layanan" },
    { label: "#PindahDomisili", href: "/dashboard" },
    { label: "#NIB-UMKM", href: "/layanan" },
    { label: "#BPJSKesehatan", href: "/layanan" },
    { label: "#KartuKeluarga", href: "/layanan" },
    { label: "#NPWPOnline", href: "/layanan" },
  ];

  return (
    <>
      <section className="bg-white relative overflow-hidden selection:bg-blue-600 selection:text-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* ========================================================================= */}
          {/* 1. HERO CALLOUT SHOWCASE BANNER (Glassmorphic Dual-Column Showcase)       */}
          {/* ========================================================================= */}
          <div className="pt-16 sm:pt-20 pb-12">
            <div className="relative rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-slate-50 border border-slate-200/80 p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl">
              {/* Inner Glow Decorative Corner Elements */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-100/60 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
                
                {/* Left Column: Bold Value Proposition */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span>Navigator Administrasi Mandiri · 100% Bebas Calo</span>
                  </div>

                  {/* Headline */}
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f274a] tracking-tight leading-[1.15]">
                    Siap menyelesaikan urusan dokumenmu <span className="text-blue-600">tanpa ribet?</span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
                    Pilih peristiwa hidupmu, ikuti checklist langkah runtut, dan langsung terhubung ke portal instansi resmi pemerintah Republik Indonesia.
                  </p>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3.5">
                    <Link
                      href="/mulai"
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300 transform hover:-translate-y-0.5 group"
                    >
                      <span>Mulai Susun Urusan</span>
                      <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      type="button"
                      onClick={openAiAssistant}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm sm:text-base border border-slate-200 shadow-sm hover:border-blue-300 transition-all duration-300 cursor-pointer group"
                    >
                      <Bot className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span>Tanya Asisten AI</span>
                    </button>
                  </div>

                  {/* Micro guarantees */}
                  <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>50+ Panduan Terverifikasi</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Aman & Bebas Biaya</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span>Kanal Resmi .go.id</span>
                    </span>
                  </div>
                </div>

                {/* Right Column: Visual Interactive Mini Roadmap Card */}
                <div className="lg:col-span-5">
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
                    {/* Card Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                          <Compass className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0f274a] leading-tight">Live Alur: Pindah Domisili</h4>
                          <span className="text-[11px] text-slate-500">Tahapan Terstruktur Antar-Dinas</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                        3/4 Selesai
                      </span>
                    </div>

                    {/* Visual Steps Mockup */}
                    <div className="space-y-2.5">
                      {/* Step 1 */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">
                            ✓
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-slate-700">1. Surat Pindah (SKPWNI)</p>
                            <span className="text-[11px] text-slate-500">Disdukcapil Asal · Dokumen Terbit</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">
                          Selesai
                        </span>
                      </div>

                      {/* Step 2 */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">
                            ✓
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-slate-700">2. KK & KTP-el Baru</p>
                            <span className="text-[11px] text-slate-500">Disdukcapil Tujuan · Terbit Baru</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">
                          Selesai
                        </span>
                      </div>

                      {/* Step 3 */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-200">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold animate-pulse">
                            3
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-[#0f274a]">3. Pindah Faskes BPJS</p>
                            <span className="text-[11px] text-blue-600">Aplikasi Mobile JKN · Online</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 border border-blue-200">
                          Proses
                        </span>
                      </div>
                    </div>

                    {/* Card Footer Link */}
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-between pt-1 text-xs font-bold text-blue-600 hover:text-blue-500 group transition-colors"
                    >
                      <span>Coba Simulator Roadmap Interaktif</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. VALUE & TRUST PILLARS STRIP (Visual High-Impact Feature Badges)        */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8 border-b border-slate-200">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-[#0f274a]">100% Bebas Calo</h5>
                <p className="text-xs text-slate-500 leading-relaxed">Panduan mandiri terhubung ke sistem resmi dinas.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-[#0f274a]">Alur Logis & Efisien</h5>
                <p className="text-xs text-slate-500 leading-relaxed">Urutan tahapan terstruktur agar tidak bolak-balik.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-[#0f274a]">Privasi Terjaga</h5>
                <p className="text-xs text-slate-500 leading-relaxed">Tidak menyimpan dokumen rahasia di server publik.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-[#0f274a]">Asisten AI 24/7</h5>
                <p className="text-xs text-slate-500 leading-relaxed">Bantuan interaktif langsung memahami syarat berkas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#071324] text-slate-300 mt-auto relative overflow-hidden selection:bg-blue-600 selection:text-white">
        {/* Background ambient lighting for Dark Footer */}
        <div className="absolute top-0 right-1/4 w-[36rem] h-[36rem] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[36rem] h-[36rem] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[48rem] bg-sky-500/5 rounded-full blur-[160px] pointer-events-none" />

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ========================================================================= */}
        {/* 3. MAIN FOOTER DIRECTORY & NAVIGATION COLUMNS                             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 py-16">
          
          {/* Brand & Topic Cloud Column (Col-span-4) */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <BrandMark size="normal" />
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight group-hover:text-blue-400 transition-colors">
                  Satu<span className="text-blue-400">Urusan</span>
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  Navigator Birokrasi Publik
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed">
              Platform navigasi independen terdepan yang membantu masyarakat Indonesia menyusun alur urusan administratif, persyaratan berkas, dan kanal resmi dinas secara transparan.
            </p>

            {/* Popular Topic Tags */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Topik Layanan Populer
              </span>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Link
                    key={tag.label}
                    href={tag.href}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600/30 text-xs font-semibold text-slate-300 hover:text-blue-200 border border-slate-700/60 hover:border-blue-500/50 transition-all duration-200"
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Directory (Col-span-8) */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            
            {/* Column 1: Peristiwa Hidup */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <div className="w-6 h-6 rounded-md bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wider">
                  Peristiwa Hidup
                </h4>
              </div>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/dashboard" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 inline-block transition-all">
                    Pindah Domisili
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 inline-block transition-all">
                    Karir & Pekerjaan Baru
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 inline-block transition-all">
                    Pernikahan & Keluarga
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 inline-block transition-all">
                    Kelahiran Bayi
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 inline-block transition-all">
                    Membuka Usaha (UMKM)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Layanan Populer */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wider">
                  Layanan Populer
                </h4>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between">
                  <Link href="/layanan" className="text-slate-300 hover:text-blue-400 transition-colors">
                    KTP-el & Kartu Keluarga
                  </Link>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    Populer
                  </span>
                </li>
                <li>
                  <Link href="/layanan" className="text-slate-300 hover:text-blue-400 transition-colors">
                    BPJS Kesehatan Mandiri
                  </Link>
                </li>
                <li>
                  <Link href="/layanan" className="text-slate-300 hover:text-blue-400 transition-colors">
                    NPWP Pribadi Online
                  </Link>
                </li>
                <li className="flex items-center justify-between">
                  <Link href="/layanan" className="text-slate-300 hover:text-blue-400 transition-colors">
                    NIB OSS RBA
                  </Link>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Instan
                  </span>
                </li>
                <li>
                  <Link href="/layanan" className="text-slate-300 hover:text-blue-400 transition-colors">
                    SIM & Pajak Kendaraan
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Bantuan & Edukasi */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <div className="w-6 h-6 rounded-md bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wider">
                  Bantuan & Legal
                </h4>
              </div>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/cara-kerja" className="text-slate-300 hover:text-blue-400 transition-colors">
                    Cara Kerja Platform
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={openAiAssistant}
                    className="text-slate-300 hover:text-blue-400 flex items-center gap-1.5 text-left cursor-pointer transition-colors"
                  >
                    <span>Tanya Asisten AI</span>
                    <Sparkles className="w-3 h-3 text-blue-400" />
                  </button>
                </li>
                <li>
                  <Link href="/bantuan" className="text-slate-300 hover:text-blue-400 transition-colors">
                    Pusat Bantuan & FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/bantuan" className="text-slate-300 hover:text-blue-400 transition-colors">
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://indonesia.go.id" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                  >
                    <span>Portal Indonesia.go.id</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. BOTTOM BAR WITH COPYRIGHT, DISCLAIMER & BACK TO TOP BUTTON            */}
        {/* ========================================================================= */}
        <div className="pt-8 pb-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs sm:text-sm text-slate-400">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-slate-300 font-medium">
              © {new Date().getFullYear()} SatuUrusan. Inisiatif navigasi independen untuk kemudahan masyarakat.
            </p>
            <p className="text-slate-500 text-xs">
              Bukan bagian dari instansi pemerintah · Menghubungkan langsung ke kanal resmi Republik Indonesia
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-800/90 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700/80 hover:border-blue-500/60 shadow-md transition-all duration-300 cursor-pointer group flex-shrink-0"
            aria-label="Kembali ke atas"
          >
            <span className="text-xs font-bold">Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
    </>
  );
}
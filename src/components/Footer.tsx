"use client";

import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { ShieldCheck, Heart, ExternalLink, Sparkles, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0a192f] text-slate-300 border-t border-slate-800/80 mt-auto relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Pre-footer Callout Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900/50 border border-blue-500/20 p-8 sm:p-12 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/15 rounded-full blur-2xl" />
          
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Bebas Calo, 100% Panduan Resmi</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Siap menyusun urusan administratifmu hari ini?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Mulai dari satu peristiwa hidup, dapatkan checklist langkah lengkap, dan hubungkan langsung ke portal instansi terkait.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/mulai"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all transform hover:-translate-y-0.5"
              >
                <span>Mulai Sekarang Gratis</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cara-kerja"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-colors"
              >
                <span>Pelajari Cara Kerja</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pt-16 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <BrandMark />
              <div className="flex flex-col">
                <span className="font-display font-black text-xl text-white tracking-tight">
                  Satu<span className="text-blue-400">Urusan</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest -mt-1">
                  Navigator Hidup
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              SatuUrusan adalah platform navigasi independen yang membantu masyarakat Indonesia memahami alur, persiapan, dan syarat urusan administratif secara jelas dan terstruktur.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Tidak memungut biaya apapun</span>
            </div>
          </div>

          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Peristiwa Hidup</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Pindah Domisili</Link></li>
              <li><Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Karir & Pekerjaan Baru</Link></li>
              <li><Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Pernikahan & Keluarga</Link></li>
              <li><Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Kelahiran Bayi</Link></li>
              <li><Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Membuka Usaha UMKM</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Layanan Populer</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/layanan" className="text-slate-400 hover:text-white transition-colors">KTP-el & Kartu Keluarga</Link></li>
              <li><Link href="/layanan" className="text-slate-400 hover:text-white transition-colors">BPJS Kesehatan Mandiri</Link></li>
              <li><Link href="/layanan" className="text-slate-400 hover:text-white transition-colors">NPWP Pribadi Online</Link></li>
              <li><Link href="/layanan" className="text-slate-400 hover:text-white transition-colors">NIB OSS RBA</Link></li>
              <li><Link href="/layanan" className="text-slate-400 hover:text-white transition-colors">SIM & Pajak Kendaraan</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Bantuan & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/cara-kerja" className="text-slate-400 hover:text-white transition-colors">Cara Kerja Platform</Link></li>
              <li><Link href="/bantuan" className="text-slate-400 hover:text-white transition-colors">Pusat Bantuan & FAQ</Link></li>
              <li><Link href="/bantuan" className="text-slate-400 hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="/bantuan" className="text-slate-400 hover:text-white transition-colors">Disclaimer Resmi</Link></li>
              <li><a href="https://indonesia.go.id" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300">Portal Indonesia.go.id <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SatuUrusan. Dibuat dengan transparansi untuk mempermudah birokrasi publik.</p>
          <p className="flex items-center gap-1">
            Bukan bagian dari instansi pemerintah · Terhubung langsung ke kanal resmi
          </p>
        </div>
      </div>
    </footer>
  );
}
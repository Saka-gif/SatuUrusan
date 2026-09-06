"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./BrandMark";
import { ShieldCheck, ExternalLink } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const isAccountArea = ["/dashboard", "/urusan-saya", "/riwayat"].some((path) => pathname.startsWith(path));

  if (isAccountArea) return null;

  return (
    <footer className="bg-[#0a192f] text-slate-300 border-t border-slate-800/80 mt-auto relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
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
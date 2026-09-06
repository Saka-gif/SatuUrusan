"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { BrandMark } from "./BrandMark";
import { Menu, X, ArrowRight, Compass, Layers, HelpCircle } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled((prev) => {
            // Hysteresis prevents flickering around threshold
            if (!prev && currentY > 28) return true;
            if (prev && currentY < 12) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda", icon: Compass },
    { href: "/layanan", label: "Ruang Layanan", icon: Layers },
    { href: "/cara-kerja", label: "Cara Kerja", icon: Compass },
    { href: "/bantuan", label: "Pusat Bantuan", icon: HelpCircle },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const openAiAssistant = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-satu-ai"));
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "pt-2 sm:pt-3 pb-1 px-3 sm:px-6"
          : "pt-4 sm:pt-6 pb-2 px-4 sm:px-6 lg:px-8"
      }`}
    >
      <div
        className={`mx-auto w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between transform-gpu ${
          scrolled
            ? "max-w-6xl bg-white/92 backdrop-blur-xl rounded-full border border-blue-200/80 shadow-xl shadow-blue-950/8 py-2 px-4 sm:px-6"
            : "max-w-7xl bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm py-3.5 sm:py-4 px-5 sm:px-8"
        }`}
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none flex-shrink-0"
          aria-label="SatuUrusan Beranda"
        >
          <BrandMark size="normal" />
          <div className="flex flex-col">
            <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-[#0f274a] group-hover:text-blue-600 transition-colors leading-none">
              Satu<span className="text-blue-600 font-black">Urusan</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase mt-1">
              Navigator Hidup
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/70 shadow-inner flex-shrink-0"
          aria-label="Navigasi Utama"
        >
          {navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
                  active
                    ? "bg-white text-blue-600 shadow-sm shadow-slate-900/10"
                    : "text-slate-600 hover:text-blue-600 hover:bg-white/70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Assistant Trigger */}
          <button
            type="button"
            onClick={openAiAssistant}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-blue-700 bg-blue-50/90 hover:bg-blue-100 border border-blue-200/90 rounded-full transition-all duration-300 group cursor-pointer shadow-2xs hover:shadow-xs transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-soft" />
            <span>Asisten Panduan</span>
          </button>

          {/* Login */}
          <Link
            href="/masuk"
            className="px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-full transition-colors whitespace-nowrap"
          >
            Masuk
          </Link>

          {/* Primary CTA */}
          <Link
            href="/mulai"
            className="flex items-center gap-1.5 px-4.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-extrabold text-white bg-[#0f274a] hover:bg-blue-600 rounded-full shadow-md shadow-blue-950/20 hover:shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <span>Mulai Sekarang</span>
            <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label={menuOpen ? "Tutup Menu" : "Buka Menu"}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 space-y-4 animate-in slide-in-from-top-4 duration-300 shadow-2xl max-w-lg mx-auto">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-base font-bold transition-all ${
                    active
                      ? "bg-blue-50 text-blue-600 font-bold border border-blue-200/60 shadow-xs"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-5 h-5 text-slate-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMenuOpen(false);
                openAiAssistant();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-blue-700 bg-blue-50 rounded-xl border border-blue-200 cursor-pointer shadow-xs"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse-soft" />
              <span>Tanya Asisten Panduan</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/masuk"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center py-3 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/mulai"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-md shadow-blue-600/20"
              >
                <span>Mulai</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
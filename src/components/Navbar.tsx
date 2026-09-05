"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { BrandMark } from "./BrandMark";
import { Sparkles, Menu, X, ArrowRight, Compass, Layers, HelpCircle, User } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
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
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm shadow-slate-900/5 border-b border-slate-200/80 py-2.5"
          : "bg-white/70 backdrop-blur-sm border-b border-slate-200/50 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none" aria-label="SatuUrusan Beranda">
          <BrandMark />
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight text-[#0f274a] group-hover:text-blue-600 transition-colors">
              Satu<span className="text-blue-600 font-black">Urusan</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 -mt-1 tracking-wider uppercase">
              Navigator Hidup
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner" aria-label="Navigasi Utama">
          {navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 ${
                  active
                    ? "bg-white text-blue-600 shadow-sm shadow-slate-900/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* AI Trigger */}
          <button
            type="button"
            onClick={openAiAssistant}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-700 bg-blue-50/90 hover:bg-blue-100/80 border border-blue-200/80 rounded-xl transition-all duration-200 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-12 transition-transform" />
            <span>SatuAI</span>
          </button>

          {/* Login */}
          <Link
            href="/masuk"
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Masuk
          </Link>

          {/* Primary CTA */}
          <Link
            href="/mulai"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0f274a] via-[#17345b] to-[#1e4976] hover:from-[#17345b] hover:to-[#2563eb] rounded-xl shadow-md shadow-blue-950/15 hover:shadow-blue-950/25 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>Mulai Sekarang</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label={menuOpen ? "Tutup Menu" : "Buka Menu"}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-5 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    active ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMenuOpen(false);
                openAiAssistant();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-blue-700 bg-blue-50 rounded-xl border border-blue-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Tanya SatuAI</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/masuk"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/mulai"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-1 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
              >
                <span>Mulai</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
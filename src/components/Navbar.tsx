"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "./BrandMark";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (path: string) => pathname === path || (path !== "/" && pathname.startsWith(path));
  return <header className="site-header"><div className="nav-shell">
    <Link href="/" className="brand" aria-label="SatuUrusan beranda"><BrandMark /><span>Satu<span>Urusan</span></span></Link>
    <nav className="main-nav" aria-label="Navigasi utama"><Link className={isActive("/") ? "active" : ""} href="/">Beranda</Link><Link className={isActive("/layanan") ? "active" : ""} href="/layanan">Layanan</Link><Link className={isActive("/cara-kerja") ? "active" : ""} href="/cara-kerja">Cara Kerja</Link><Link className={isActive("/bantuan") ? "active" : ""} href="/bantuan">Bantuan</Link></nav>
    <div className="nav-actions"><Link className="ai-pill" href="/onboarding"><span>✦</span> SatuAI</Link><Link className="login-button" href="/masuk">Masuk</Link><Link className="nav-cta" href="/mulai">Mulai Sekarang <span>→</span></Link></div>
    <button className="menu-button" type="button" aria-label={menuOpen ? "Tutup menu" : "Buka menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button>
    {menuOpen && <nav className="mobile-nav" aria-label="Navigasi mobile"><Link href="/" onClick={() => setMenuOpen(false)}>Beranda</Link><Link href="/layanan" onClick={() => setMenuOpen(false)}>Layanan</Link><Link href="/cara-kerja" onClick={() => setMenuOpen(false)}>Cara Kerja</Link><Link href="/bantuan" onClick={() => setMenuOpen(false)}>Bantuan</Link><Link className="mobile-nav-cta" href="/mulai" onClick={() => setMenuOpen(false)}>Mulai Sekarang →</Link></nav>}
  </div></header>;
}
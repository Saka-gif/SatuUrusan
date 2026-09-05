"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./BrandMark";

export function Footer() {
  const pathname = usePathname();
  if (["/mulai", "/daftar", "/masuk", "/onboarding", "/dashboard"].some((path) => pathname.startsWith(path))) return null;
  return <>
    <section className="footer-cta">
      <p className="section-kicker">Langkah pertama dimulai di sini</p>
      <h2>Siap mulai mengurus?</h2>
      <p>Masuk untuk melanjutkan, atau mulai sekarang untuk menemukan langkah yang relevan dengan situasimu.</p>
      <div className="footer-cta-actions"><Link className="secondary-button" href="/masuk">Masuk</Link><Link className="primary-button" href="/mulai">Mulai Sekarang <span>→</span></Link></div>
    </section>
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-intro"><Link href="/" className="footer-brand"><BrandMark /><span>Satu<span>Urusan</span></span></Link><p>Platform digital untuk membantu masyarakat memahami dan menyelesaikan urusan publik dengan lebih mudah.</p><span className="footer-note">Bukan pengganti layanan pemerintah.</span></div>
        <div className="footer-column"><strong>Layanan</strong><Link href="/layanan">Kependudukan</Link><Link href="/layanan">Kesehatan</Link><Link href="/layanan">Pendidikan</Link><Link href="/layanan">Pajak</Link></div>
        <div className="footer-column"><strong>Platform</strong><Link href="/cara-kerja">Cara Kerja</Link><Link href="/bantuan">Bantuan</Link><Link href="/bantuan#faq">FAQ</Link><Link href="/">SatuAI</Link></div>
        <div className="footer-column"><strong>Perusahaan</strong><Link href="/bantuan">Tentang Kami</Link><Link href="/bantuan">Kebijakan Privasi</Link><Link href="/bantuan">Syarat & Ketentuan</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 SatuUrusan. Semua Urusan, Satu Tempat.</span><div className="social-links"><a href="https://instagram.com" aria-label="Instagram">◎</a><a href="https://linkedin.com" aria-label="LinkedIn">in</a><a href="mailto:halo@satuurusan.id" aria-label="Email">✉</a></div></div>
    </footer>
    <button className="ai-float" type="button"><span>✦</span> Tanya SatuAI</button>
  </>;
}
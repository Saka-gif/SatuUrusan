import Link from "next/link";
import { AuthBrand } from "@/components/AuthBrand";

export default function StartPage() {
  return <main className="start-page"><div className="start-shell"><AuthBrand /><div className="start-copy"><p className="section-kicker">Teman mengurus hidup</p><h1>Semua urusanmu,<br /><em>satu tempat.</em></h1><p>Mulai dengan satu kejadian yang sedang kamu alami. SatuUrusan akan membantu menyusun langkah yang perlu kamu pahami.</p><div className="start-actions"><Link className="primary-button" href="/daftar">Mulai Sekarang <span>→</span></Link><Link className="secondary-button" href="/masuk">Masuk</Link></div><div className="start-trust"><span>✓</span> Gratis untuk mulai &nbsp;·&nbsp; Tidak menggantikan layanan pemerintah</div></div><div className="start-orbit"><div className="start-node node-one">⌂<small>Pindah</small></div><div className="start-node node-two">✦<small>Kerja baru</small></div><div className="start-node node-three">♡<small>Menikah</small></div><div className="start-core"><span>✦</span><strong>Satu<br />peta</strong></div></div></div></main>;
}

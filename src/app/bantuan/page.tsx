"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";

const questions = [
  ["Apa itu SatuUrusan?", "SatuUrusan adalah panduan personal yang memetakan urusan administratif berdasarkan peristiwa hidup yang kamu alami.", "Tentang SatuUrusan"],
  ["Apakah SatuUrusan terhubung dengan instansi pemerintah?", "Tidak. Kami tidak mewakili atau menggantikan instansi pemerintah mana pun.", "Tentang SatuUrusan"],
  ["Bagaimana memastikan informasi tetap resmi?", "Kami menampilkan sumber, waktu verifikasi, dan tautan ke kanal resmi sebelum kamu melanjutkan.", "Keamanan & sumber"],
  ["Apakah saya harus membuat akun?", "Belum perlu. Kamu bisa mulai menjelajah peta urusan tanpa akun.", "Mulai menggunakan"],
  ["Apakah SatuUrusan memproses dokumen saya?", "Tidak. Kami hanya membantu memahami urutan dan persiapan. Pengajuan tetap dilakukan pada kanal resmi.", "Keamanan & sumber"],
];

export default function HelpPage() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("Semua");
  const topics = ["Semua", "Tentang SatuUrusan", "Keamanan & sumber", "Mulai menggunakan"];
  const filtered = questions.filter(([question, answer, category]) => (topic === "Semua" || category === topic) && `${question} ${answer}`.toLowerCase().includes(query.toLowerCase()));
  return <><Navbar /><main className="inner-page help-page"><p className="section-kicker">Pusat bantuan</p><h1>Mulai dengan<br /><em>tenang.</em></h1><p className="inner-lede">Jawaban singkat untuk memahami peran SatuUrusan dan batasannya.</p><label className="service-search help-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari pertanyaan..." /></label><div className="help-layout"><aside className="help-topics">{topics.map((item) => <button className={topic === item ? "active" : ""} key={item} type="button" onClick={() => setTopic(item)}>{item}<span>→</span></button>)}<div className="contact-card"><span>✦</span><strong>Belum menemukan jawaban?</strong><p>Tim kami siap membantu memahami langkah pertama.</p><a href="mailto:halo@satuurusan.id">Hubungi kami →</a></div></aside><div className="faq-list" id="faq">{filtered.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}{filtered.length === 0 && <p className="empty-state">Pertanyaan belum tersedia. Coba kata kunci lain.</p>}</div></div></main></>;
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/AuthShell";

const stages = [
  { icon: "✦", title: "Biarkan SatuAI memandu\nurusamu", text: "SatuAI membantu memahami proses administrasi, menyiapkan dokumen, dan menemukan langkah yang tepat.", question: "Aktifkan panduan SatuAI?", agree: "Ya, bantu saya", skip: "Lewati dulu" },
  { icon: "▥", title: "Pantau semua proses\ndalam satu dashboard", text: "Lihat status semua urusanmu secara real-time. Tahu kapan harus bertindak, dokumen apa yang dibutuhkan, dan langkah apa yang harus dilakukan selanjutnya.", question: "Simpan progres urusanmu?", agree: "Ya, simpan progres", skip: "Nanti saja" },
  { icon: "✓", title: "Siap memulai urusanmu?", text: "Pilih satu peristiwa kehidupan dan SatuUrusan akan menyusun peta langkah yang relevan untukmu.", question: "Mari mulai dari satu peristiwa.", agree: "Mulai SatuUrusan", skip: "Kembali" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [stage, setStage] = useState(0);
  const current = stages[stage];
  const next = () => stage === stages.length - 1 ? router.push("/dashboard") : setStage(stage + 1);
  return <AuthShell><div className="onboarding-content"><div className={`onboarding-icon onboarding-${stage}`}>{current.icon}</div><h1>{current.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h1><p>{current.text}</p><div className="onboarding-dots">{stages.map((item, index) => <span className={index === stage ? "active" : ""} key={item.title} />)}</div><div className="onboarding-actions">{stage < 2 && <button className="secondary-button" type="button" onClick={next}>{current.skip}</button>}<button className="primary-button" type="button" onClick={next}>{current.agree} <span>→</span></button></div><p className="onboarding-question">{current.question}</p></div></AuthShell>;
}

"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";

const steps = [["Ceritakan peristiwanya", "Pilih situasi yang paling dekat dengan keadaanmu saat ini.", "Kamu tidak perlu tahu nama instansinya dulu."], ["Kami susun peta urusan", "SatuUrusan menghubungkan kebutuhan yang biasanya tersebar.", "Hal penting diurutkan berdasarkan konteks dan prioritas."], ["Kamu ikuti langkahnya", "Tandai progres dan siapkan hal yang diperlukan di setiap tahap.", "Checklist sederhana membuatmu tahu apa yang sudah selesai."], ["Terhubung ke kanal resmi", "Setiap layanan tetap dilakukan di situs atau kantor resmi.", "Kami membantu menemukan pintu yang tepat, bukan menggantikannya."]];

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);
  return <><Navbar /><main className="inner-page process-page"><p className="section-kicker">Cara kerja</p><h1>Dari kejadian hidup<br /><em>menjadi langkah.</em></h1><p className="inner-lede">Kami mulai dari konteks hidupmu, bukan dari daftar lembaga. Hasilnya adalah urutan yang lebih masuk akal untuk diikuti.</p><div className="interactive-process"><div className="step-tabs">{steps.map((step, index) => <button type="button" className={activeStep === index ? "active" : ""} key={step[0]} onClick={() => setActiveStep(index)}><span>0{index + 1}</span>{step[0]}</button>)}</div><div className="step-stage"><div className="step-stage-number">0{activeStep + 1}</div><div><p className="section-kicker">Langkah {activeStep + 1} dari 4</p><h2>{steps[activeStep][0]}</h2><p>{steps[activeStep][1]}</p><span className="stage-tip">✦ {steps[activeStep][2]}</span></div><div className="stage-progress"><span style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} /></div></div></div><div className="notice-box"><strong>Catatan penting</strong><p>SatuUrusan adalah navigator informasi. Kami tidak menerbitkan dokumen, mengambil keputusan, atau memproses permohonan layanan pemerintah.</p></div></main></>;
}

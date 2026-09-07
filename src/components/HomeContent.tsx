"use client";

import { useState } from "react";
import Link from "next/link";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { 
  ArrowRight, 
  Clock,
  FileCheck2,
  CheckCircle,
  Circle
} from "lucide-react";
import { EventCard } from "./EventCard";
import { ServiceExplorer } from "./ServiceExplorer";
import { ProcessSection } from "./ProcessSection";
import { lifeEvents } from "@/data/life-events";
import { LifeEvent } from "@/lib/supabase/types";

// Realistic live roadmap templates for the interactive console
const HERO_SIMULATIONS = [
  {
    id: "pindah",
    name: "Pindah Domisili",
    subtitle: "Pindah Antar Kota / Provinsi",
    steps: [
      { id: "s1", title: "Surat Pindah (SKPWNI)", agency: "Disdukcapil Asal", duration: "1 Hari Kerja", doc: "KTP & KK Asli", completed: true },
      { id: "s2", title: "Penerbitan KK & KTP-el Baru", agency: "Disdukcapil Tujuan", duration: "1-3 Hari", doc: "SKPWNI Asal", completed: false },
      { id: "s3", title: "Pindah Faskes BPJS", agency: "BPJS Kesehatan", duration: "Instan Online", doc: "Mobile JKN", completed: false },
      { id: "s4", title: "Lapor Pengurus RT/RW Baru", agency: "Kelurahan", duration: "Hari yang sama", doc: "KK Baru", completed: false },
    ]
  },
  {
    id: "usaha",
    name: "Membuka Usaha (UMKM)",
    subtitle: "Pendaftaran Usaha & Legalitas",
    steps: [
      { id: "u1", title: "Registrasi Akun OSS RBA", agency: "Kementerian Investasi", duration: "5 Menit", doc: "NIK KTP & Email", completed: true },
      { id: "u2", title: "Penerbitan NIB Ber-QR", agency: "Sistem OSS", duration: "Instan", doc: "Data Usaha & KBLI", completed: false },
      { id: "u3", title: "NPWP Badan / Usaha", agency: "DJP Online", duration: "1 Hari Kerja", doc: "NIB & KTP", completed: false },
      { id: "u4", title: "Sertifikasi Standar / Halal", agency: "BPJPH / Instansi Teknis", duration: "14 Hari Kerja", doc: "NIB & Foto Produk", completed: false },
    ]
  },
  {
    id: "nikah",
    name: "Pernikahan & Keluarga",
    subtitle: "Administrasi Sebelum & Sesudah Akad",
    steps: [
      { id: "n1", title: "Surat Pengantar Kelurahan (N1-N4)", agency: "Kelurahan", duration: "1 Hari Kerja", doc: "KTP & KK Asli", completed: true },
      { id: "n2", title: "Pendaftaran Berkas di KUA / Dukcapil", agency: "Kemenag / Catatan Sipil", duration: "Min. H-10 Kerja", doc: "Surat N1-N4 & Foto", completed: false },
      { id: "n3", title: "Pemisahan KK & Pembuatan KK Baru", agency: "Disdukcapil", duration: "1-2 Hari", doc: "Buku Nikah Asli", completed: false },
      { id: "n4", title: "Penyatuan Nomor BPJS Kesehatan", agency: "BPJS Kesehatan", duration: "Instan Online", doc: "KK Pasangan Baru", completed: false },
    ]
  }
];

export function HomeContent() {
  const [activeEvent, setActiveEvent] = useState<LifeEvent>(lifeEvents[0]);
  const [activeSimIndex, setActiveSimIndex] = useState(0);
  const [simSteps, setSimSteps] = useState(HERO_SIMULATIONS[0].steps);

  const currentSim = HERO_SIMULATIONS[activeSimIndex];

  const handleSelectSim = (idx: number) => {
    setActiveSimIndex(idx);
    setSimSteps(HERO_SIMULATIONS[idx].steps);
  };

  const handleToggleSimStep = (stepId: string) => {
    setSimSteps(prev => prev.map(s => s.id === stepId ? { ...s, completed: !s.completed } : s));
  };

  const completedCount = simSteps.filter(s => s.completed).length;
  const progressPct = Math.round((completedCount / simSteps.length) * 100);

  return (
    <main className="flex-1">
      {/* Human-Crafted Editorial Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-blue-50/60 via-slate-50/70 to-white">
        {/* Soft Ambient Light Glows */}
        <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Editorial Copy Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Clean Status Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-xs text-xs font-bold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
                <span>Navigator Urusan Publik Indonesia</span>
                <span className="text-slate-300">|</span>
                <span className="text-blue-600 font-semibold">100% Kanal Resmi</span>
              </div>

              {/* Bold Editorial Headline */}
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#0f274a] tracking-tight leading-[1.12]">
                Satu peristiwa hidup.<br />
                <span className="text-blue-600">
                  Satu alur yang teratur.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Pindah rumah, menikah, atau buka usaha? SatuUrusan merangkai seluruh dokumen dan tahapan antar-dinas menjadi urutan prioritas yang logis, tanpa calo.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/mulai"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#0f274a] hover:bg-blue-600 text-white font-bold text-sm shadow-xl shadow-blue-950/15 hover:shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>Mulai Susun Urusan</span>
                  <ArrowRight className="w-4 h-4 text-blue-200" />
                </Link>

                <Link
                  href="/layanan"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-blue-50/80 text-slate-700 hover:text-blue-600 font-bold text-sm border border-slate-200 shadow-sm hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>Katalog 50+ Layanan</span>
                </Link>
              </div>

              {/* Trust Indicators Bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 text-left">
                <div>
                  <strong className="font-display font-black text-xl text-[#0f274a] block">53+</strong>
                  <span className="text-[11px] text-slate-500">Alur Prosedur</span>
                </div>
                <div>
                  <strong className="font-display font-black text-xl text-emerald-600 block">0 Biaya</strong>
                  <span className="text-[11px] text-slate-500">Gratis & Terbuka</span>
                </div>
                <div>
                  <strong className="font-display font-black text-xl text-blue-600 block">Resmi</strong>
                  <span className="text-[11px] text-slate-500">Sumber Terpercaya</span>
                </div>
              </div>
            </div>

            {/* Right Lottie Animation */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end items-center lg:translate-x-8">
              <div className="w-full max-w-xl lg:max-w-[600px] h-[400px] sm:h-[450px] lg:h-[550px] lg:scale-105">
                <DotLottieReact
                  src="https://lottie.host/5c88da22-7a0d-4c52-bac2-b2feeeee4e20/GnqrTQ7DBT.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Life Events Grid Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse-soft" />
                <span>Pilih Kejadian Hidupmu</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0f274a] tracking-tight">
                Peta langkah untuk setiap fase penting
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
              Satu peristiwa biasanya melibatkan 3 hingga 9 tahapan antar dinas yang saling berkaitan secara runtut.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifeEvents.map((event) => (
              <EventCard
                key={event.title}
                event={event}
                isSelected={activeEvent.title === event.title}
                onClick={() => setActiveEvent(event)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Explorer Section */}
      <ServiceExplorer />

      {/* Process Section */}
      <ProcessSection />
    </main>
  );
}
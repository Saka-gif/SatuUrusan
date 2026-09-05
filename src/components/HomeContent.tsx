"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Compass, 
  FileText, 
  Users,
  Building,
  HeartHandshake
} from "lucide-react";
import { EventCard } from "./EventCard";
import { ServiceExplorer } from "./ServiceExplorer";
import { ProcessSection } from "./ProcessSection";
import { lifeEvents } from "@/data/life-events";
import { LifeEvent } from "@/lib/supabase/types";

export function HomeContent() {
  const [activeEvent, setActiveEvent] = useState<LifeEvent>(lifeEvents[0]);

  return (
    <main className="flex-1">
      {/* Dynamic Luxury Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/50 via-slate-50/80 to-white">
        {/* Ambient Decorative Circles */}
        <div className="absolute top-12 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-48 left-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold tracking-tight shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
                <span>Personal Life-Event Navigator</span>
              </div>

              {/* Main Headline with Outfit Display Font */}
              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#0f274a] tracking-tight leading-[1.08]">
                Satu peristiwa.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
                  Lebih sedikit bingung.
                </span>
              </h1>

              {/* Hero Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                SatuUrusan membantu kamu memahami seluruh rentetan administrasi yang muncul dari sebuah kejadian hidup—lalu menyusunnya menjadi langkah prioritas yang jelas, tanpa calo.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/mulai"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#0f274a] via-[#17345b] to-[#2563eb] hover:from-[#17345b] hover:to-[#1d4ed8] text-white font-bold text-sm shadow-xl shadow-blue-950/20 hover:shadow-blue-950/30 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>Mulai Dari Peristiwa</span>
                  <ArrowRight className="w-4 h-4 text-blue-300" />
                </Link>

                <Link
                  href="#cara-kerja"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-sm transition-all duration-200"
                >
                  <span>Lihat Cara Kerja</span>
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-slate-500">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Panduan netral · 100% terhubung ke kanal resmi pemerintah</span>
              </div>
            </div>

            {/* Right Interactive Node Visual Card */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Outer Orbit Rings */}
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-blue-200/60 animate-spin-slow pointer-events-none" />
                <div className="absolute inset-8 rounded-full border border-dashed border-amber-300/60 pointer-events-none" />

                {/* Central Interactive Roadmap Card */}
                <div className="relative z-10 w-72 sm:w-80 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl shadow-blue-900/15 border border-slate-200/80 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-blue-600">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span>Peta Urusan Aktif</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">01/08</span>
                  </div>

                  {/* Card Title */}
                  <div className="py-4">
                    <span className="text-[11px] text-slate-400 font-semibold">Peristiwa Hidup</span>
                    <h3 className="font-display font-extrabold text-xl text-[#0f274a]">
                      {activeEvent.title}
                    </h3>
                  </div>

                  {/* Roadmap Step Items */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 text-xs">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="font-semibold text-slate-700">Surat Pindah (SKPWNI)</span>
                      <span className="ml-auto text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">01</span>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/80 border border-amber-100 text-xs">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="font-semibold text-slate-700">Update KK & KTP-el</span>
                      <span className="ml-auto text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">02</span>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs opacity-75">
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      <span className="font-semibold text-slate-600">Pindah Faskes BPJS</span>
                      <span className="ml-auto text-[10px] font-bold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded">03</span>
                    </div>
                  </div>

                  {/* Card Action */}
                  <Link
                    href="/dashboard"
                    className="mt-5 w-full flex items-center justify-center gap-1.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                  >
                    <span>Jelajahi Peta Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Floating Micro Chips */}
                <div className="absolute top-4 right-0 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200 shadow-lg text-[11px] font-bold text-slate-700 flex items-center gap-2 animate-bounce-slow">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>1 Kejadian</span>
                </div>

                <div className="absolute bottom-6 left-0 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200 shadow-lg text-[11px] font-bold text-emerald-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>8 Langkah Tersusun</span>
                </div>
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold">
                <Compass className="w-3.5 h-3.5" />
                <span>Pilih Kejadian Hidupmu</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0f274a] tracking-tight">
                Peta langkah untuk setiap fase penting
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
              Satu peristiwa biasanya melibatkan 3 hingga 9 tahapan antar dinas yang saling berkaitan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Layers,
  ChevronRight,
  CheckCircle2
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
        {/* Ambient Decorative Light Pools */}
        <div className="absolute top-12 right-10 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none animate-float-alive" />
        <div className="absolute top-48 left-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Clean Minimalist Pill Badge (No AI Sparkles) */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-blue-200/80 text-blue-700 text-xs font-bold tracking-tight shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-soft" />
                <span>Personal Life-Event Navigator</span>
              </div>

              {/* Main Headline */}
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

              {/* Action Buttons with Dynamic Azure Hover */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/mulai"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#0f274a] via-[#1d4ed8] to-[#2563eb] hover:from-[#1e40af] hover:via-[#2563eb] hover:to-[#38bdf8] text-white font-bold text-sm shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>Mulai Dari Peristiwa</span>
                  <ArrowRight className="w-4 h-4 text-blue-200" />
                </Link>

                <Link
                  href="#cara-kerja"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-blue-50/60 text-slate-700 hover:text-blue-600 font-bold text-sm border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>Lihat Cara Kerja</span>
                </Link>
              </div>

              {/* Trust Indicator */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-slate-500">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Panduan netral · 100% terhubung ke kanal resmi pemerintah</span>
              </div>
            </div>

            {/* Right Interactive Node Visual Card (Alive floating) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center animate-float-alive">
                
                {/* Orbit Rings with Soft Breathing Motion */}
                <div className="absolute inset-2 rounded-full border border-blue-200/50 pointer-events-none animate-aura-blue" />
                <div className="absolute inset-10 rounded-full border border-dashed border-sky-300/40 pointer-events-none" />

                {/* Central Interactive Roadmap Card */}
                <div className="relative z-10 w-72 sm:w-80 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl shadow-blue-900/10 border border-slate-200/80 hover:border-blue-400/80 hover:shadow-blue-500/15 transition-all duration-500 transform hover:scale-[1.02]">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-blue-600">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-soft" />
                      <span>Peta Urusan Aktif</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono font-bold bg-slate-50 px-2 py-0.5 rounded-md">01/08</span>
                  </div>

                  {/* Card Title */}
                  <div className="py-4">
                    <span className="text-[11px] text-slate-400 font-semibold block">Peristiwa Hidup</span>
                    <h3 className="font-display font-extrabold text-xl text-[#0f274a] mt-0.5">
                      {activeEvent.title}
                    </h3>
                  </div>

                  {/* Roadmap Step Items with Interactive Hover */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-100/80 text-xs transition-colors cursor-pointer group">
                      <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
                      <span className="font-semibold text-slate-700 group-hover:text-blue-900">Surat Pindah (SKPWNI)</span>
                      <span className="ml-auto text-[10px] font-bold text-blue-600 bg-white px-2 py-0.5 rounded-full border border-blue-100 shadow-2xs">01</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 hover:bg-sky-50 border border-slate-100 text-xs transition-colors cursor-pointer group">
                      <span className="w-2 h-2 rounded-full bg-amber-500 group-hover:scale-125 transition-transform" />
                      <span className="font-semibold text-slate-700 group-hover:text-sky-900">Update KK & KTP-el</span>
                      <span className="ml-auto text-[10px] font-bold text-amber-600 bg-white px-2 py-0.5 rounded-full border border-slate-100 shadow-2xs">02</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/60 hover:bg-indigo-50 border border-slate-100 text-xs transition-colors cursor-pointer group opacity-85">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform" />
                      <span className="font-semibold text-slate-600 group-hover:text-indigo-900">Pindah Faskes BPJS</span>
                      <span className="ml-auto text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-100 shadow-2xs">03</span>
                    </div>
                  </div>

                  {/* Card Action */}
                  <Link
                    href="/dashboard"
                    className="mt-5 w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-0.5"
                  >
                    <span>Jelajahi Peta Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-200" />
                  </Link>
                </div>

                {/* Floating Clean Micro Badges */}
                <div className="absolute top-2 right-0 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200/90 shadow-lg text-[11px] font-bold text-slate-700 flex items-center gap-2 animate-float-slow">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>1 Kejadian Terarah</span>
                </div>

                <div className="absolute bottom-4 left-0 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200/90 shadow-lg text-[11px] font-bold text-emerald-700 flex items-center gap-2 animate-float-alive">
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
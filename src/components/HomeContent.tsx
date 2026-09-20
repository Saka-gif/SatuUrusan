"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Circle,
  ExternalLink,
  Sparkles,
  Layers,
  FileCheck2,
  ChevronDown,
  RotateCcw,
  Check,
  ShieldCheck
} from "lucide-react";
import { EventCard } from "./EventCard";
import { ServiceExplorer } from "./ServiceExplorer";
import { ProcessSection } from "./ProcessSection";
import { lifeEvents } from "@/data/life-events";
import { LifeEvent } from "@/lib/supabase/types";
import { eventTaskTemplates, createUserRoadmap } from "@/lib/supabase/service";

export function HomeContent() {
  const router = useRouter();
  const [activeEvent, setActiveEvent] = useState<LifeEvent>(lifeEvents[0]);
  const [activeSteps, setActiveSteps] = useState<Array<{
    id: string;
    title: string;
    desc: string;
    cat: string;
    dur: string;
    reqs: string[];
    url: string;
    completed: boolean;
  }>>([]);
  const [isCreatingRoadmap, setIsCreatingRoadmap] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileName, setProfileName] = useState("Teman Satu");
  const simRef = useRef<HTMLDivElement>(null);

  // Sync session
  useEffect(() => {
    const syncSession = () => {
      if (typeof window === "undefined") return;
      const rawSession = window.localStorage.getItem("satuurusan_session");
      if (rawSession) {
        try {
          const session = JSON.parse(rawSession) as { name?: string };
          setIsAuthenticated(true);
          setProfileName(session.name || "Teman Satu");
        } catch {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    syncSession();
    window.addEventListener("storage", syncSession);
    window.addEventListener("satuurusan-session-changed", syncSession);
    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener("satuurusan-session-changed", syncSession);
    };
  }, []);

  // Sync steps when active event changes
  useEffect(() => {
    const template = eventTaskTemplates[activeEvent.slug] || eventTaskTemplates["pindah-domisili"] || [];
    setActiveSteps(
      template.map((t, idx) => ({
        id: `sim_step_${activeEvent.slug}_${idx}`,
        ...t,
        completed: idx === 0, // Mark first step as completed by default for demo
      }))
    );
  }, [activeEvent]);

  const handleSelectEvent = (event: LifeEvent) => {
    setActiveEvent(event);
    // Smooth scroll down to simulation console if on mobile
    if (typeof window !== "undefined" && window.innerWidth < 1024 && simRef.current) {
      simRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleToggleStep = (stepId: string) => {
    setActiveSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, completed: !s.completed } : s))
    );
  };

  const handleResetSteps = () => {
    setActiveSteps((prev) => prev.map((s) => ({ ...s, completed: false })));
  };

  const handleCreateAndOpenRoadmap = async () => {
    setIsCreatingRoadmap(true);
    try {
      const rm = await createUserRoadmap(activeEvent.slug, activeEvent.title);
      if (rm && rm.id) {
        router.push(`/dashboard?id=${rm.id}`);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Gagal membuat roadmap:", err);
      router.push("/dashboard");
    } finally {
      setIsCreatingRoadmap(false);
    }
  };

  const completedCount = activeSteps.filter((s) => s.completed).length;
  const totalCount = activeSteps.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

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
              {/* Clean Status Pill / Welcome Pill */}
              {isAuthenticated ? (
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 shadow-xs text-xs font-bold text-blue-900">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
                  <span>Halo, {profileName} 👋</span>
                  <span className="text-blue-300">|</span>
                  <Link href="/dashboard" className="text-blue-600 hover:underline font-extrabold flex items-center gap-1">
                    <span>Akses Dashboard Saya</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-xs text-xs font-bold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
                  <span>Navigator Urusan Publik Indonesia</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-blue-600 font-semibold">100% Kanal Resmi</span>
                </div>
              )}

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
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#0f274a] to-blue-600 hover:from-[#17345b] hover:to-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-950/15 hover:shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <span>Buka Dashboard Saya</span>
                      <ArrowRight className="w-4 h-4 text-blue-200" />
                    </Link>

                    <Link
                      href="/layanan"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-blue-50/80 text-slate-700 hover:text-blue-600 font-bold text-sm border border-slate-200 shadow-sm hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <span>Katalog 50+ Layanan</span>
                    </Link>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
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
              Klik salah satu peristiwa di bawah untuk melihat simulasi alur dokumen, syarat berkas, dan estimasi waktu antar dinas secara langsung.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifeEvents.map((event) => (
              <EventCard
                key={event.title}
                event={event}
                isSelected={activeEvent.slug === event.slug}
                onClick={() => handleSelectEvent(event)}
              />
            ))}
          </div>

          {/* Interactive Simulation & Roadmap View for Selected Event */}
          <div 
            ref={simRef} 
            className="pt-4 animate-in fade-in duration-300 scroll-mt-28"
          >
            <div className="rounded-3xl border-2 border-blue-200/90 bg-gradient-to-b from-blue-50/50 via-white to-white p-6 sm:p-10 shadow-xl shadow-blue-950/5 space-y-8">
              
              {/* Simulator Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-extrabold text-xs shadow-xs">
                      Simulasi Alur Interaktif
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">
                      {totalCount} Tahapan Berurutan
                    </span>
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0f274a] tracking-tight">
                    {activeEvent.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                    {activeEvent.description}
                  </p>
                </div>

                {/* Progress & Reset Box */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex-shrink-0">
                  <div className="space-y-1.5 min-w-44">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-600">Simulasi Progres:</span>
                      <span className={progressPct === 100 ? "text-emerald-600 font-black" : "text-blue-600 font-black"}>
                        {progressPct}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 block">
                      {completedCount} dari {totalCount} langkah tercentang
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetSteps}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                    title="Ulangi simulasi"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Step Checklist Flow */}
              <div className="grid grid-cols-1 gap-3.5">
                {activeSteps.map((step, idx) => (
                  <div
                    key={step.id}
                    onClick={() => handleToggleStep(step.id)}
                    className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      step.completed
                        ? "bg-emerald-50/40 border-emerald-300 shadow-2xs"
                        : "bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-xs"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox Trigger */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStep(step.id);
                        }}
                        className="mt-0.5 flex-shrink-0 cursor-pointer focus:outline-none"
                        aria-label={step.completed ? "Tandai belum selesai" : "Tandai selesai"}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100 transition-transform transform scale-110" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-300 hover:text-blue-500 transition-colors" />
                        )}
                      </button>

                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className={`font-display font-bold text-sm sm:text-base ${
                            step.completed ? "line-through text-slate-400" : "text-[#0f274a]"
                          }`}>
                            Langkah {idx + 1}: {step.title}
                          </h4>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              {step.cat}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200">
                              <Clock className="w-3 h-3 text-blue-500" />
                              {step.dur}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {step.desc}
                        </p>

                        {/* Requirements */}
                        {step.reqs && step.reqs.length > 0 && (
                          <div className="pt-1 flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Berkas Wajib:</span>
                            {step.reqs.map((req, rIdx) => (
                              <span
                                key={rIdx}
                                className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                              >
                                {req}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Official URL */}
                        {step.url && step.url !== "#" && (
                          <div className="pt-1">
                            <a
                              href={step.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              <span>Buka Portal Resmi Pengajuan</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Seluruh rincian alur terhubung langsung dengan regulasi & kanal resmi kementerian.</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent("open-satu-ai"));
                      }
                    }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-blue-50 text-blue-700 font-bold text-xs border border-slate-200 shadow-sm transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Tanya Asisten AI</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCreateAndOpenRoadmap}
                    disabled={isCreatingRoadmap}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#0f274a] hover:bg-blue-600 text-white font-bold text-xs shadow-lg shadow-blue-950/15 hover:shadow-blue-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <span>{isCreatingRoadmap ? "Menyusun..." : "Simpan & Lanjutkan di Dashboard"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-200" />
                  </button>
                </div>
              </div>

            </div>
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
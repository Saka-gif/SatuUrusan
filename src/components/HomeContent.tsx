"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-6 space-y-6 text-center lg:text-left"
            >
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
                  <span className="relative inline-block isolate px-1">
                    <span className="absolute bottom-2 sm:bottom-3 left-0 w-full h-[40%] bg-[#d9f96b] -z-10"></span>
                    <span className="text-[#0f274a]">Satu alur</span>
                  </span>{' '}
                  yang teratur.
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
            </motion.div>

            {/* Right Lottie Animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-6 flex justify-center lg:justify-end items-center lg:translate-x-8"
            >
              <div className="w-full max-w-xl lg:max-w-[600px] h-[400px] sm:h-[450px] lg:h-[550px] lg:scale-105">
                <DotLottieReact
                  src="https://lottie.host/5c88da22-7a0d-4c52-bac2-b2feeeee4e20/GnqrTQ7DBT.lottie"
                  loop
                  autoplay
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Life Events Grid Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
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
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {lifeEvents.map((event) => (
              <EventCard
                key={event.title}
                event={event}
                isSelected={activeEvent.slug === event.slug}
                onClick={() => handleSelectEvent(event)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Explorer Section */}
      <ServiceExplorer />

      {/* Process Section */}
      <ProcessSection />
    </main>
  );
}
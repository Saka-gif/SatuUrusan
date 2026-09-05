"use client";

import { 
  Home, 
  Briefcase, 
  Heart, 
  Baby, 
  Building2, 
  GraduationCap, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { LifeEvent } from "@/lib/supabase/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Home,
  Briefcase,
  Heart,
  Baby,
  Building2,
  GraduationCap,
};

const ACCENT_STYLES: Record<string, { 
  bg: string; 
  iconBg: string; 
  text: string; 
  border: string; 
  hoverBorder: string; 
  hoverShadow: string; 
  badge: string; 
  dot: string 
}> = {
  blue: {
    bg: "bg-white",
    iconBg: "bg-blue-50 text-blue-600 border border-blue-200/60",
    text: "text-blue-600",
    border: "border-slate-200/90",
    hoverBorder: "hover:border-blue-400",
    hoverShadow: "hover:shadow-xl hover:shadow-blue-600/10",
    badge: "bg-blue-50 text-blue-700 border border-blue-200/60",
    dot: "bg-blue-500",
  },
  orange: {
    bg: "bg-white",
    iconBg: "bg-amber-50 text-amber-600 border border-amber-200/60",
    text: "text-amber-600",
    border: "border-slate-200/90",
    hoverBorder: "hover:border-amber-400",
    hoverShadow: "hover:shadow-xl hover:shadow-amber-600/10",
    badge: "bg-amber-50 text-amber-700 border border-amber-200/60",
    dot: "bg-amber-500",
  },
  rose: {
    bg: "bg-white",
    iconBg: "bg-rose-50 text-rose-600 border border-rose-200/60",
    text: "text-rose-600",
    border: "border-slate-200/90",
    hoverBorder: "hover:border-rose-400",
    hoverShadow: "hover:shadow-xl hover:shadow-rose-600/10",
    badge: "bg-rose-50 text-rose-700 border border-rose-200/60",
    dot: "bg-rose-500",
  },
  green: {
    bg: "bg-white",
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
    text: "text-emerald-600",
    border: "border-slate-200/90",
    hoverBorder: "hover:border-emerald-400",
    hoverShadow: "hover:shadow-xl hover:shadow-emerald-600/10",
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    dot: "bg-emerald-500",
  },
  violet: {
    bg: "bg-white",
    iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-200/60",
    text: "text-indigo-600",
    border: "border-slate-200/90",
    hoverBorder: "hover:border-indigo-400",
    hoverShadow: "hover:shadow-xl hover:shadow-indigo-600/10",
    badge: "bg-indigo-50 text-indigo-700 border border-indigo-200/60",
    dot: "bg-indigo-500",
  },
  teal: {
    bg: "bg-white",
    iconBg: "bg-teal-50 text-teal-600 border border-teal-200/60",
    text: "text-teal-600",
    border: "border-slate-200/90",
    hoverBorder: "hover:border-teal-400",
    hoverShadow: "hover:shadow-xl hover:shadow-teal-600/10",
    badge: "bg-teal-50 text-teal-700 border border-teal-200/60",
    dot: "bg-teal-500",
  },
  yellow: {
    bg: "bg-white",
    iconBg: "bg-yellow-50 text-yellow-700 border border-yellow-200/60",
    text: "text-yellow-700",
    border: "border-slate-200/90",
    hoverBorder: "hover:border-yellow-400",
    hoverShadow: "hover:shadow-xl hover:shadow-yellow-600/10",
    badge: "bg-yellow-50 text-yellow-800 border border-yellow-200/60",
    dot: "bg-yellow-500",
  },
};

export function EventCard({
  event,
  isSelected = false,
  onClick,
}: {
  event: LifeEvent;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  const IconComponent = ICON_MAP[event.icon] || Sparkles;
  const style = ACCENT_STYLES[event.accent] || ACCENT_STYLES.blue;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full h-full text-left p-6 rounded-2xl border transition-all duration-300 ease-out transform hover:-translate-y-2 hover:scale-[1.01] flex flex-col justify-between cursor-pointer ${
        isSelected
          ? "bg-white border-blue-600 ring-2 ring-blue-600/20 shadow-xl shadow-blue-600/15"
          : `${style.bg} ${style.border} ${style.hoverBorder} ${style.hoverShadow} shadow-sm`
      }`}
    >
      {/* Top row: Icon & Tasks Badge */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md ${style.iconBg}`}
          >
            <IconComponent className="w-6 h-6 transition-transform group-hover:rotate-6" />
          </div>
          <span
            className={`text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs ${style.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`} />
            <span>{event.tasks_count} Urusan</span>
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="font-display font-extrabold text-base sm:text-lg text-[#0f274a] group-hover:text-blue-600 transition-colors tracking-tight">
            {event.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed line-clamp-2">
            {event.description}
          </p>
        </div>
      </div>

      {/* Footer hover indicator */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
        <span>Buka alur urusan</span>
        <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all transform group-hover:translate-x-1">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
}
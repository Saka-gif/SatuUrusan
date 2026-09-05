"use client";

import { 
  Home, 
  Briefcase, 
  Heart, 
  Baby, 
  Building2, 
  GraduationCap, 
  ArrowRight, 
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
  iconBg: string; 
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  dotColor: string;
}> = {
  blue: {
    iconBg: "bg-blue-50/80 group-hover:bg-blue-600 group-hover:text-white",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-50/70 border-blue-100",
    badgeText: "text-blue-700",
    dotColor: "bg-blue-500",
  },
  orange: {
    iconBg: "bg-amber-50/80 group-hover:bg-amber-500 group-hover:text-white",
    iconColor: "text-amber-600",
    badgeBg: "bg-amber-50/70 border-amber-100",
    badgeText: "text-amber-700",
    dotColor: "bg-amber-500",
  },
  rose: {
    iconBg: "bg-rose-50/80 group-hover:bg-rose-500 group-hover:text-white",
    iconColor: "text-rose-600",
    badgeBg: "bg-rose-50/70 border-rose-100",
    badgeText: "text-rose-700",
    dotColor: "bg-rose-500",
  },
  green: {
    iconBg: "bg-emerald-50/80 group-hover:bg-emerald-500 group-hover:text-white",
    iconColor: "text-emerald-600",
    badgeBg: "bg-emerald-50/70 border-emerald-100",
    badgeText: "text-emerald-700",
    dotColor: "bg-emerald-500",
  },
  violet: {
    iconBg: "bg-indigo-50/80 group-hover:bg-indigo-500 group-hover:text-white",
    iconColor: "text-indigo-600",
    badgeBg: "bg-indigo-50/70 border-indigo-100",
    badgeText: "text-indigo-700",
    dotColor: "bg-indigo-500",
  },
  teal: {
    iconBg: "bg-teal-50/80 group-hover:bg-teal-500 group-hover:text-white",
    iconColor: "text-teal-600",
    badgeBg: "bg-teal-50/70 border-teal-100",
    badgeText: "text-teal-700",
    dotColor: "bg-teal-500",
  },
  yellow: {
    iconBg: "bg-yellow-50/80 group-hover:bg-yellow-500 group-hover:text-white",
    iconColor: "text-yellow-700",
    badgeBg: "bg-yellow-50/70 border-yellow-100",
    badgeText: "text-yellow-800",
    dotColor: "bg-yellow-500",
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
  const IconComponent = ICON_MAP[event.icon] || Home;
  const style = ACCENT_STYLES[event.accent] || ACCENT_STYLES.blue;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full h-full text-left p-6 sm:p-7 rounded-3xl border transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer card-interactive-blue ${
        isSelected
          ? "ring-2 ring-blue-500 border-blue-400 bg-gradient-to-b from-blue-50/40 via-white to-white shadow-xl shadow-blue-500/15"
          : "hover:border-blue-400 hover:bg-gradient-to-b hover:from-white hover:to-blue-50/20"
      }`}
    >
      {/* Top section: Category Icon & Clean Pill Badge */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-md border border-slate-100 ${style.iconBg} ${style.iconColor}`}
          >
            <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:rotate-3" />
          </div>

          <div
            className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-tight border flex items-center gap-1.5 transition-colors ${style.badgeBg} ${style.badgeText} group-hover:bg-blue-100/80 group-hover:text-blue-700 group-hover:border-blue-200`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${style.dotColor} animate-pulse-soft`} />
            <span>{event.tasks_count} Tahapan</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#0f274a] group-hover:text-blue-600 transition-colors tracking-tight leading-snug">
            {event.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 font-normal">
            {event.description}
          </p>
        </div>
      </div>

      {/* Bottom Action Footer with smooth hover slide */}
      <div className="mt-6 pt-4 border-t border-slate-100/90 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
        <span className="font-medium text-slate-500 group-hover:text-blue-600 transition-colors">Lihat peta alur</span>
        <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1 shadow-2xs">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
}
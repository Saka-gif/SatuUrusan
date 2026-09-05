"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  IdCard, 
  HeartPulse, 
  GraduationCap, 
  Receipt, 
  Car, 
  Building2, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  X,
  FileCheck,
  Search,
  ChevronRight
} from "lucide-react";
import { serviceCategories } from "@/data/service-categories";
import { ServiceCategory, ServiceItem } from "@/lib/supabase/types";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Kependudukan: IdCard,
  Kesehatan: HeartPulse,
  Pendidikan: GraduationCap,
  Pajak: Receipt,
  Kendaraan: Car,
  Perizinan: Building2,
};

const CATEGORY_COLORS: Record<string, { bg: string; iconBg: string; text: string; badge: string; glow: string }> = {
  blue: { bg: "bg-blue-50 text-blue-600", iconBg: "bg-blue-100 text-blue-600", text: "text-blue-600", badge: "bg-blue-50 text-blue-700 border border-blue-200/80", glow: "hover:border-blue-300 hover:shadow-blue-500/10" },
  mint: { bg: "bg-emerald-50 text-emerald-600", iconBg: "bg-emerald-100 text-emerald-600", text: "text-emerald-600", badge: "bg-emerald-50 text-emerald-700 border border-emerald-200/80", glow: "hover:border-emerald-300 hover:shadow-emerald-500/10" },
  orange: { bg: "bg-amber-50 text-amber-600", iconBg: "bg-amber-100 text-amber-600", text: "text-amber-600", badge: "bg-amber-50 text-amber-700 border border-amber-200/80", glow: "hover:border-amber-300 hover:shadow-amber-500/10" },
  violet: { bg: "bg-indigo-50 text-indigo-600", iconBg: "bg-indigo-100 text-indigo-600", text: "text-indigo-600", badge: "bg-indigo-50 text-indigo-700 border border-indigo-200/80", glow: "hover:border-indigo-300 hover:shadow-indigo-500/10" },
  yellow: { bg: "bg-yellow-50 text-yellow-700", iconBg: "bg-yellow-100 text-yellow-700", text: "text-yellow-700", badge: "bg-yellow-50 text-yellow-800 border border-yellow-200/80", glow: "hover:border-yellow-300 hover:shadow-yellow-500/10" },
  rose: { bg: "bg-rose-50 text-rose-600", iconBg: "bg-rose-100 text-rose-600", text: "text-rose-600", badge: "bg-rose-50 text-rose-700 border border-rose-200/80", glow: "hover:border-rose-300 hover:shadow-rose-500/10" },
  teal: { bg: "bg-teal-50 text-teal-600", iconBg: "bg-teal-100 text-teal-600", text: "text-teal-600", badge: "bg-teal-50 text-teal-700 border border-teal-200/80", glow: "hover:border-teal-300 hover:shadow-teal-500/10" },
};

export function ServiceExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(serviceCategories[0]);
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const activeColor = selectedCategory ? (CATEGORY_COLORS[selectedCategory.accent] || CATEGORY_COLORS.blue) : CATEGORY_COLORS.blue;

  const filteredCategories = serviceCategories.filter((cat) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.tags.some((t) => t.toLowerCase().includes(q)) ||
      cat.items?.some((i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
    );
  });

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50/60 to-white relative" id="layanan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse-soft" />
              <span>Jelajahi Berdasarkan Kebutuhan</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0f274a] tracking-tight">
              Apa yang ingin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-600">kamu urus?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Cari layanan tanpa perlu bingung menghafal nama kementerian atau dinas. Kami petakan syarat dan alurnya secara jelas.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari layanan (KTP, BPJS, SIM...)"
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Category Pills Slider / Grid with Fluid Hover */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filteredCategories.map((category) => {
            const Icon = CATEGORY_ICONS[category.name] || IdCard;
            const isCurrent = selectedCategory?.name === category.name;
            const colors = CATEGORY_COLORS[category.accent] || CATEGORY_COLORS.blue;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl border text-xs font-bold transition-all duration-300 ease-out transform hover:-translate-y-1 cursor-pointer ${
                  isCurrent
                    ? "bg-[#0f274a] border-[#0f274a] text-white shadow-xl shadow-blue-950/20"
                    : "bg-white border-slate-200/90 text-slate-700 hover:bg-blue-50/50 hover:text-blue-700 hover:border-blue-300 shadow-sm"
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${isCurrent ? "bg-white/15 text-white" : "bg-blue-50 text-blue-600"}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{category.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isCurrent ? "bg-white/20 text-blue-200" : "bg-slate-100 text-slate-500"}`}>
                  {category.count || category.items?.length || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Details & Service Items Cards */}
        {selectedCategory && (
          <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-xl shadow-slate-900/5 space-y-8 animate-in fade-in duration-300">
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-sm ${activeColor.bg}`}>
                  {(() => {
                    const Icon = CATEGORY_ICONS[selectedCategory.name] || IdCard;
                    return <Icon className="w-7 h-7" />;
                  })()}
                </div>
                <div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-[#0f274a]">
                    Layanan {selectedCategory.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {selectedCategory.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedCategory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-slate-50 text-slate-600 text-[11px] font-semibold border border-slate-200/80 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Grid of Service Items with Electric Blue Hover Lift */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {selectedCategory.items?.map((item) => (
                <div
                  key={item.title}
                  onClick={() => setSelectedItem(item)}
                  className="group relative bg-white hover:bg-gradient-to-b hover:from-white hover:to-blue-50/30 rounded-2xl p-6 border border-slate-200/80 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/12 transition-all duration-300 ease-out transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between h-full"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display font-bold text-sm sm:text-base text-[#0f274a] group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-400 flex-shrink-0 transition-all shadow-2xs">
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-bold text-slate-500 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span>{item.duration}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-blue-600 font-bold text-xs group-hover:underline">
                      <span>Lihat Syarat</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Link to Full Services */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <p>
                Menampilkan {selectedCategory.items?.length || 0} dari {selectedCategory.count || selectedCategory.items?.length || 0} total urusan dalam kategori ini.
              </p>
              <Link
                href="/layanan"
                className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>Buka Seluruh Direktori Layanan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Interactive Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in zoom-in-95 duration-200"
              role="dialog"
              aria-modal="true"
            >
              {/* Modal Top */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    Detail Prosedur Layanan
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-[#0f274a]">
                    {selectedItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {selectedItem.description}
              </p>

              {/* Requirements List */}
              <div className="space-y-2.5">
                <h4 className="font-display font-bold text-xs text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                  <FileCheck className="w-4 h-4 text-emerald-500" />
                  <span>Persyaratan Dokumen</span>
                </h4>
                <div className="space-y-2">
                  {(selectedItem.requirements || ["KTP Asli", "Kartu Keluarga Asli", "Formulir Permohonan"]).map((req, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Processing Info & Official Portal */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-xs">
                <div className="flex items-center gap-2 text-blue-900 font-bold">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Estimasi: {selectedItem.duration}</span>
                </div>
                {selectedItem.official_url && (
                  <a
                    href={selectedItem.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-900 underline"
                  >
                    <span>Kanal Resmi</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 transition-all"
                >
                  <span>Mulai Urus di Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
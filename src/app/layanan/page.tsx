"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { serviceCategories } from "@/data/service-categories";
import { ServiceCategory, ServiceItem } from "@/lib/supabase/types";
import { 
  Search, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Layers, 
  X,
  FileCheck,
  IdCard,
  HeartPulse,
  GraduationCap,
  Receipt,
  Car,
  Building2
} from "lucide-react";
import Link from "next/link";

const ICONS: Record<string, React.ElementType> = {
  Kependudukan: IdCard,
  Kesehatan: HeartPulse,
  Pendidikan: GraduationCap,
  Pajak: Receipt,
  Kendaraan: Car,
  Perizinan: Building2,
};

export default function ServicesPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(serviceCategories[0]);
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);

  const filteredCategories = serviceCategories.filter((cat) => {
    const q = query.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.tags.some((t) => t.toLowerCase().includes(q)) ||
      cat.items?.some((i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Ruang Katalog Layanan Publik</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-[#0f274a] tracking-tight">
              Mulai dari kebutuhan,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                bukan nama instansi.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Cari topik administrasi yang Anda butuhkan. Kami bantu menjelaskan prasyarat berkas dan mengarahkan ke kanal resmi.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4 flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl font-display">
              53+
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">Layanan Terpetakan</span>
              <span className="text-[11px] text-slate-500">Seluruh Indonesia</span>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xl">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari layanan (misal: KTP baru, BPJS faskes, NPWP, SIM, NIB...)"
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all"
          />
        </div>

        {/* Categories Browser Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Category List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
              Pilih Kategori Layanan
            </span>
            <div className="space-y-2">
              {filteredCategories.map((cat) => {
                const Icon = ICONS[cat.name] || IdCard;
                const isSelected = selectedCategory.name === cat.name;

                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-md shadow-blue-500/5 text-[#0f274a]"
                        : "bg-white/80 border-slate-200 hover:bg-white text-slate-700 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="font-display font-bold text-sm block">{cat.name}</strong>
                        <small className="text-xs text-slate-500 block">{cat.description}</small>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isSelected ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}

              {filteredCategories.length === 0 && (
                <div className="bg-white p-8 rounded-2xl text-center border border-slate-200 text-slate-500 text-xs">
                  Tidak ada kategori yang cocok dengan pencarian "{query}".
                </div>
              )}
            </div>
          </div>

          {/* Right Selected Category Items Showcase */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Daftar Prosedur Urusan
                  </span>
                  <h2 className="font-display font-black text-2xl text-[#0f274a] mt-1">
                    {selectedCategory.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedCategory.description}. Klik salah satu urusan untuk melihat syarat dokumen lengkap.
                  </p>
                </div>
              </div>

              {/* Items Grid */}
              <div className="space-y-3">
                {selectedCategory.items?.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => setSelectedItem(item)}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-sm text-[#0f274a] group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-200/60 text-xs">
                      <span className="flex items-center gap-1 font-semibold text-slate-500 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        {item.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 text-blue-600 font-bold text-xs group-hover:underline">
                        <span>Syarat</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span>Informasi diperbarui sesuai regulasi instansi terkait</span>
                <Link href="/cara-kerja" className="inline-flex items-center gap-1 font-bold text-blue-600 hover:underline">
                  <span>Pelajari Alur</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Document Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in zoom-in-95">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    Persyaratan & Alur Dokumen
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-[#0f274a] mt-1">
                    {selectedItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {selectedItem.description}
              </p>

              <div className="space-y-2.5">
                <h4 className="font-display font-bold text-xs text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                  <FileCheck className="w-4 h-4 text-emerald-500" />
                  <span>Dokumen yang Perlu Disiapkan:</span>
                </h4>
                <div className="space-y-2">
                  {(selectedItem.requirements || ["KTP Asli", "Kartu Keluarga Asli", "Formulir Permohonan"]).map((req, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-xs">
                <div className="flex items-center gap-2 text-blue-900 font-semibold">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Estimasi Pengerjaan: {selectedItem.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Tutup
                </button>
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/25 transition-all inline-flex items-center gap-1.5"
                >
                  <span>Mulai Urus di Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

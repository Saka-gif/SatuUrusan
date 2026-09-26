import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Compass, Clock, Building2, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import { lifeEvents } from "@/data/life-events";
import { eventTaskTemplates } from "@/lib/supabase/service";
import { Navbar } from "@/components/Navbar";

export default async function SimulasiAlurPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = lifeEvents.find((e) => e.slug === slug);
  const tasks = eventTaskTemplates[slug];

  if (!event || !tasks) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans pb-20">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 flex-1 space-y-10">
        
        {/* Header */}
        <div className="space-y-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/90 text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-4 border border-blue-100">
              <Compass className="w-3 h-3" />
              <span>Simulasi Alur Peta Urusan</span>
            </div>
            
            <h1 className="font-display font-black text-2xl sm:text-4xl text-[#0f274a] tracking-tight mb-4">
              {event.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/90 relative">
          <div className="absolute left-[39px] sm:left-[55px] top-10 bottom-10 w-0.5 bg-slate-100" />
          
          <div className="space-y-8 relative">
            {tasks.map((task, index) => (
              <div key={index} className="flex gap-4 sm:gap-6 group">
                <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all z-10 relative mt-1">
                  <span className="font-display font-bold text-sm sm:text-lg">{index + 1}</span>
                </div>
                
                <div className="flex-1 bg-slate-50/50 hover:bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-100 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200/50 text-slate-600 rounded-md">
                          {task.cat}
                        </span>
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-800 leading-snug">
                        {task.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {task.desc}
                      </p>
                      
                      {task.reqs && task.reqs.length > 0 && (
                        <div className="pt-3 mt-3 border-t border-slate-200/50">
                          <strong className="text-[11px] uppercase tracking-wider text-slate-400 block mb-2">Persyaratan Inti:</strong>
                          <ul className="space-y-1">
                            {task.reqs.map((req, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2 sm:items-end flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-orange-400" />
                        <span>{task.dur}</span>
                      </div>
                      {task.url && task.url !== "#" && (
                        <a 
                          href={task.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 mt-1"
                        >
                          <LinkIcon className="w-3.5 h-3.5" />
                          <span>Portal Resmi</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthBrand } from "@/components/AuthBrand";
import { lifeEvents } from "@/data/life-events";

export default function DashboardPage() {
  const [selected, setSelected] = useState(lifeEvents[0]);
  return <main className="dashboard-page"><header className="dashboard-header"><AuthBrand /><div className="dashboard-user"><span>TS</span><small>Halo, teman</small><b>⌄</b></div></header><div className="dashboard-shell"><div className="dashboard-welcome"><div><p className="section-kicker">Dashboard pribadi</p><h1>Halo, siap mengurus<br /><em>apa hari ini?</em></h1><p>Pilih satu peristiwa untuk membuat peta urusan pertamamu.</p></div><div className="dashboard-orb">✦</div></div><section className="dashboard-panel"><div className="dashboard-panel-heading"><div><h2>Mulai dari peristiwa</h2><p>Satu kejadian bisa memunculkan beberapa urusan.</p></div><Link href="/layanan">Jelajahi layanan →</Link></div><div className="dashboard-event-grid">{lifeEvents.slice(0, 4).map((event) => <button className={selected.title === event.title ? "active" : ""} type="button" key={event.title} onClick={() => setSelected(event)}><span className={`event-icon ${event.accent}`}>{event.icon}</span><strong>{event.title}</strong><small>{event.tasks} langkah tersedia</small></button>)}</div><div className="dashboard-next"><span className={`event-icon ${selected.accent}`}>{selected.icon}</span><div><small>Peristiwa terpilih</small><strong>{selected.title}</strong></div><button type="button">Susun peta <span>→</span></button></div></section><p className="dashboard-disclaimer">SatuUrusan membantu memetakan informasi. Semua pengajuan tetap dilakukan melalui kanal resmi pemerintah.</p></div></main>;
}

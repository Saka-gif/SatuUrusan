"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { serviceCategories } from "@/data/service-categories";

export default function ServicesPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(serviceCategories[0]);
  const filtered = serviceCategories.filter((service) => `${service.name} ${service.description} ${service.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  return <><Navbar /><main className="inner-page services-page"><div className="inner-hero-row"><div><p className="section-kicker">Ruang layanan</p><h1>Mulai dari kebutuhan,<br /><em>bukan nama instansi.</em></h1><p className="inner-lede">Cari topik administrasi yang kamu butuhkan. Kami bantu menjelaskan langkahnya dan mengarahkanmu ke kanal resmi.</p></div><div className="inner-stat"><strong>53+</strong><span>layanan yang bisa<br />dipetakan</span></div></div><label className="service-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari layanan, misalnya KTP atau BPJS..." /></label><div className="service-browser"><div className="service-browser-list">{filtered.map((service) => <button key={service.name} className={selected.name === service.name ? "selected" : ""} type="button" onClick={() => setSelected(service)}><span className={`event-icon ${service.accent}`}>{service.icon}</span><span><strong>{service.name}</strong><small>{service.description}</small></span><b>→</b></button>)}{filtered.length === 0 && <p className="empty-state">Belum menemukan layanan itu. Coba kata kunci lain.</p>}</div><aside className="service-detail"><div className={`service-icon ${selected.accent}`}>{selected.icon}</div><p className="section-kicker">Peta layanan</p><h2>{selected.name}</h2><p>{selected.description}. Temukan dokumen, urutan langkah, dan kanal resmi yang berkaitan.</p><div className="detail-tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href="/cara-kerja" className="primary-button">Lihat cara kerja <span>→</span></a></aside></div></main></>;
}

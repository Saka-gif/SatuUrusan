const steps = [
  { number: "01", icon: "⌕", title: "Ceritakan situasimu", text: "Pilih peristiwa hidup yang sedang kamu hadapi." },
  { number: "02", icon: "▤", title: "Dapatkan peta urusan", text: "Kami susun kebutuhan yang saling berkaitan secara berurutan." },
  { number: "03", icon: "✓", title: "Bergerak dengan yakin", text: "Ikuti langkahnya dan lanjutkan melalui kanal resmi." },
];

export function ProcessSection() {
  return <section className="process-section"><div className="section-shell"><div className="process-heading"><p className="section-kicker">Sederhana sejak langkah pertama</p><h2>Cara Kerja <em>SatuUrusan</em></h2><p>Tiga langkah sederhana untuk menyelesaikan urusanmu.</p></div><div className="process-grid">{steps.map((step) => <article className="process-item" key={step.number}><span className="process-icon">{step.icon}</span><span className="process-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>;
}
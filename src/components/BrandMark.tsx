"use client";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0f274a] via-[#17345b] to-[#2563eb] shadow-md shadow-blue-950/20 text-white overflow-hidden transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: "38px", height: "38px" }}
    >
      {/* Decorative gradient sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-transparent opacity-60" />
      
      {/* Dynamic Brand Symbol */}
      <svg
        className="w-5 h-5 relative z-10 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
      
      {/* Mini glowing accent dot */}
      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-2 ring-blue-900 animate-pulse" />
    </div>
  );
}
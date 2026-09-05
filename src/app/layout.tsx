import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { AiAssistantModal } from "@/components/AiAssistantModal";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SatuUrusan — Navigator Urusan Hidup & Administrasi Publik",
  description: "Platform navigasi cerdas untuk memetakan urusan administratif di Indonesia berdasarkan peristiwa hidup. Lebih jelas, terarah, dan langsung terhubung ke kanal resmi pemerintah.",
  keywords: ["administrasi publik", "pindah domisili", "KTP online", "BPJS kesehatan", "NPWP", "izin usaha OSS", "Indonesia"],
  authors: [{ name: "SatuUrusan Team" }],
};

export const viewport: Viewport = {
  themeColor: "#0f274a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#f8fafc] text-[#0f172a] selection:bg-blue-500/20 selection:text-blue-900">
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
        <AiAssistantModal />
      </body>
    </html>
  );
}

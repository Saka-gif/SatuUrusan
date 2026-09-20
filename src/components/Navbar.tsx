"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { BrandMark } from "./BrandMark";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Compass, 
  Layers, 
  HelpCircle, 
  History, 
  LogOut, 
  Bell, 
  ChevronDown, 
  Sparkles, 
  LayoutDashboard, 
  FolderOpen 
} from "lucide-react";
import { getNotifications, AppNotification } from "@/lib/notifications";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Hide Navbar on dedicated auth/onboarding pages
  const isAuthPage = [
    "/masuk", 
    "/daftar", 
    "/mulai", 
    "/onboarding"
  ].some((path) => pathname === path || pathname.startsWith(path));

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lazy initialize state from localStorage to prevent flash/layout shift on mount
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!window.localStorage.getItem("satuurusan_session");
  });

  const [profileName, setProfileName] = useState(() => {
    if (typeof window === "undefined") return "Teman Satu";
    try {
      const raw = window.localStorage.getItem("satuurusan_session");
      return raw ? (JSON.parse(raw) as { name?: string }).name || "Teman Satu" : "Teman Satu";
    } catch {
      return "Teman Satu";
    }
  });

  const [profileEmail, setProfileEmail] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      const raw = window.localStorage.getItem("satuurusan_session");
      return raw ? (JSON.parse(raw) as { email?: string }).email || "warga@satuurusan.id" : "";
    } catch {
      return "";
    }
  });

  const [unreadCount, setUnreadCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    return getNotifications().filter((n: AppNotification) => !n.read).length;
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync session and notifications
  useEffect(() => {
    let ticking = false;

    const syncSession = () => {
      if (typeof window === "undefined") return;
      const rawSession = window.localStorage.getItem("satuurusan_session");
      if (!rawSession) {
        setIsAuthenticated(false);
        setProfileName("Teman Satu");
        setProfileEmail("");
        return;
      }

      try {
        const session = JSON.parse(rawSession) as { name?: string; email?: string };
        setIsAuthenticated(true);
        setProfileName(session.name || "Teman Satu");
        setProfileEmail(session.email || "warga@satuurusan.id");
      } catch {
        window.localStorage.removeItem("satuurusan_session");
        setIsAuthenticated(false);
      }
    };

    const syncNotifications = () => {
      const notifs = getNotifications();
      const unread = notifs.filter((n: AppNotification) => !n.read).length;
      setUnreadCount(unread);
    };

    syncSession();
    syncNotifications();

    window.addEventListener("storage", syncSession);
    window.addEventListener("satuurusan-session-changed", syncSession);
    window.addEventListener("satuurusan-notifications-changed", syncNotifications);

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled((prev) => {
            if (!prev && currentY > 24) return true;
            if (prev && currentY < 10) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener("satuurusan-session-changed", syncSession);
      window.removeEventListener("satuurusan-notifications-changed", syncNotifications);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isAuthPage) return null;

  const navLinks = isAuthenticated
    ? [
        { href: "/", label: "Beranda", icon: Compass },
        { href: "/layanan", label: "Ruang Layanan", icon: Layers },
        { href: "/cara-kerja", label: "Cara Kerja", icon: Compass },
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, isHighlighted: true },
        { href: "/bantuan", label: "Pusat Bantuan", icon: HelpCircle },
      ]
    : [
        { href: "/", label: "Beranda", icon: Compass },
        { href: "/layanan", label: "Ruang Layanan", icon: Layers },
        { href: "/cara-kerja", label: "Cara Kerja", icon: Compass },
        { href: "/bantuan", label: "Pusat Bantuan", icon: HelpCircle },
      ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const openAiAssistant = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-satu-ai"));
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("satuurusan_session");
      window.dispatchEvent(new CustomEvent("satuurusan-session-changed"));
    }
    setProfileDropdownOpen(false);
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "pt-3 sm:pt-4 pb-1.5 px-3 sm:px-6"
          : "pt-6 sm:pt-7 lg:pt-8 pb-2.5 px-4 sm:px-6 lg:px-8"
      }`}
    >
      <div
        className={`mx-auto w-full pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between transform-gpu rounded-full border border-slate-200/90 shadow-[0_12px_40px_rgba(15,39,74,0.08)] bg-white/95 backdrop-blur-xl ${
          scrolled
            ? "max-w-6xl py-2 px-4 sm:px-6 shadow-xl shadow-blue-950/10"
            : "max-w-7xl py-2.5 sm:py-3 px-5 sm:px-7"
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none flex-shrink-0"
          aria-label="SatuUrusan Beranda"
        >
          <BrandMark size="sm" />
          <div className="flex flex-col">
            <span className="font-display font-black text-lg sm:text-xl tracking-tight text-[#0f274a] group-hover:text-blue-600 transition-colors leading-none">
              Satu<span className="text-blue-600 font-black">Urusan</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
              Navigator Hidup
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Smooth Pill Transitions */}
        <nav
          className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/70 shadow-inner flex-shrink-0 relative"
          aria-label="Navigasi Utama"
        >
          {navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative whitespace-nowrap px-4 py-1.5 text-xs xl:text-[13px] font-bold rounded-full transition-all duration-300 ease-out flex items-center gap-1.5 ${
                  active
                    ? "bg-white text-blue-600 shadow-sm shadow-blue-950/10 ring-1 ring-slate-200/50 transform scale-[1.02]"
                    : item.isHighlighted
                    ? "text-blue-700 hover:text-blue-800 hover:bg-blue-50/80"
                    : "text-slate-600 hover:text-blue-600 hover:bg-white/70"
                }`}
              >
                {item.isHighlighted && (
                  <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-blue-600" : "bg-blue-500"} animate-pulse-soft`} />
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Buttons & Profile */}
        <div className="hidden sm:flex items-center gap-2.5 flex-shrink-0">
          {/* Assistant Trigger Button */}
          <button
            type="button"
            onClick={openAiAssistant}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-blue-700 bg-blue-50/90 hover:bg-blue-100 border border-blue-200/90 rounded-full transition-all duration-300 group cursor-pointer shadow-2xs hover:shadow-xs transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            <span>Asisten Panduan</span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 relative" ref={dropdownRef}>
              {/* Notifications Icon Button */}
              <Link
                href="/notifikasi"
                className="relative p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors focus:outline-none"
                title="Notifikasi"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
                )}
              </Link>

              {/* Logged-In User Profile Button with Dropdown Trigger */}
              <button
                type="button"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border transition-all duration-200 cursor-pointer shadow-2xs ${
                  profileDropdownOpen
                    ? "bg-blue-50/90 border-blue-300 ring-2 ring-blue-500/20"
                    : "bg-slate-100/90 border-slate-200/90 hover:border-slate-300 hover:bg-slate-200/70"
                }`}
                aria-expanded={profileDropdownOpen}
                aria-haspopup="true"
              >
                {/* User Avatar Circle */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center font-bold text-[11px] sm:text-xs shadow-xs">
                  {profileName.slice(0, 1).toUpperCase()}
                </div>

                <div className="flex flex-col items-start text-left">
                  <span className="max-w-20 sm:max-w-24 truncate text-xs font-bold text-slate-800 leading-tight">
                    {profileName}
                  </span>
                  <span className="text-[9px] font-semibold text-blue-600 leading-tight">
                    Akun Aktif
                  </span>
                </div>

                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    profileDropdownOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border border-slate-200/90 animate-in fade-in zoom-in-95 duration-200 z-50 space-y-2">
                  {/* User Profile Header Card */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200/70">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                        {profileName.slice(0, 1).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <strong className="block text-xs font-extrabold text-[#0f274a] truncate">
                          {profileName}
                        </strong>
                        <span className="block text-[11px] text-slate-500 truncate">
                          {profileEmail || "warga@satuurusan.id"}
                        </span>
                        <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[9px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>Warga Terverifikasi</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Navigation Links */}
                  <div className="space-y-0.5 py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-600" />
                      <span>Dashboard Utama</span>
                    </Link>

                    <Link
                      href="/urusan-saya"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <FolderOpen className="w-4 h-4 text-indigo-600" />
                      <span>Peta Urusan Saya</span>
                    </Link>

                    <Link
                      href="/riwayat"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <History className="w-4 h-4 text-violet-600" />
                      <span>Riwayat Langkah Selesai</span>
                    </Link>

                    <Link
                      href="/notifikasi"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Bell className="w-4 h-4 text-amber-500" />
                        <span>Pemberitahuan</span>
                      </div>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-extrabold">
                          {unreadCount} baru
                        </span>
                      )}
                    </Link>

                    <Link
                      href="/bantuan"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-teal-600" />
                      <span>Pusat Bantuan & FAQ</span>
                    </Link>
                  </div>

                  {/* Dropdown Divider & Logout */}
                  <div className="pt-1.5 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar dari Akun</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/masuk"
                className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/60 rounded-full transition-all duration-300 whitespace-nowrap"
              >
                Masuk
              </Link>
              <Link
                href="/mulai"
                className="flex items-center gap-1.5 px-4.5 sm:px-5 py-2 text-xs sm:text-sm font-extrabold text-white bg-[#0f274a] hover:bg-blue-600 rounded-full shadow-md shadow-blue-950/20 hover:shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>Mulai Sekarang</span>
                <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none"
          aria-label={menuOpen ? "Tutup Menu" : "Buka Menu"}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="lg:hidden pointer-events-auto mt-2 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-5 space-y-4 animate-in slide-in-from-top-4 duration-300 shadow-2xl max-w-lg mx-auto">
          {/* User Profile Card on Mobile if Authenticated */}
          {isAuthenticated && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50/50 border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {profileName.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <strong className="block text-xs font-extrabold text-[#0f274a]">
                    {profileName}
                  </strong>
                  <span className="block text-[11px] text-slate-500">
                    {profileEmail || "warga@satuurusan.id"}
                  </span>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-[11px] font-bold shadow-xs hover:bg-blue-700"
              >
                Dashboard
              </Link>
            </div>
          )}

          {/* Nav items */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    active
                      ? "bg-blue-50 text-blue-600 border border-blue-200/60 shadow-xs"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className="w-5 h-5 text-slate-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.isHighlighted && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                      Personal
                    </span>
                  )}
                </Link>
              );
            })}

            {isAuthenticated && (
              <>
                <Link
                  href="/urusan-saya"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <FolderOpen className="w-5 h-5 text-slate-400" />
                  <span>Peta Urusan Saya</span>
                </Link>
                <Link
                  href="/riwayat"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <History className="w-5 h-5 text-slate-400" />
                  <span>Riwayat Langkah Selesai</span>
                </Link>
                <Link
                  href="/notifikasi"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <Bell className="w-5 h-5 text-slate-400" />
                    <span>Pemberitahuan</span>
                  </div>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              </>
            )}
          </nav>

          {/* Drawer Actions */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openAiAssistant();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-blue-700 bg-blue-50 rounded-2xl border border-blue-200 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Tanya Asisten Panduan AI</span>
            </button>

            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold text-rose-600 bg-rose-50 rounded-2xl border border-rose-200 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar dari Akun</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/masuk"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center py-3 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all shadow-xs"
                >
                  Masuk
                </Link>
                <Link
                  href="/mulai"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#0f274a] to-blue-600 hover:bg-blue-700 rounded-2xl transition-all shadow-md shadow-blue-950/20"
                >
                  <span>Mulai Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
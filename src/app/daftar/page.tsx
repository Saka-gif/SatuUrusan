"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/AuthShell";

export default function RegisterPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const submit = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = new FormData(event.currentTarget); if (form.get("password") !== form.get("confirmPassword")) { setError("Konfirmasi kata sandi belum cocok."); return; } if (!accepted) { setError("Kamu harus menyetujui syarat dan ketentuan."); return; } router.push("/onboarding"); };
  return <AuthShell><div className="auth-heading"><h1>Buat akun baru</h1><p>Sudah punya akun? <Link href="/masuk">Masuk</Link></p></div><form className="auth-form" onSubmit={submit}><label>Nama Lengkap<input required name="name" autoComplete="name" placeholder="Nama lengkap" /></label><label>Email<input required name="email" type="email" autoComplete="email" placeholder="nama@email.com" /></label><label>No. HP<input required name="phone" type="tel" autoComplete="tel" placeholder="08xxxxxxxxxx" /></label><label>Kata Sandi<input required name="password" type="password" autoComplete="new-password" placeholder="Minimal 8 karakter" minLength={8} /></label><label>Konfirmasi Kata Sandi<input required name="confirmPassword" type="password" autoComplete="new-password" placeholder="Ulangi kata sandi" minLength={8} /></label><label className="check-label"><input type="checkbox" checked={accepted} onChange={(event) => { setAccepted(event.target.checked); setError(""); }} /><span>Saya menyetujui <a href="/bantuan">Syarat & Ketentuan</a> dan <a href="/bantuan">Kebijakan Privasi</a> SatuUrusan</span></label>{error && <p className="form-error" role="alert">⚠ {error}</p>}<button className="auth-submit" type="submit">Buat Akun <span>→</span></button></form></AuthShell>;
}

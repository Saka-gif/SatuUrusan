"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/AuthShell";

export default function LoginPage() {
	const router = useRouter();
	return <AuthShell><div className="auth-heading"><h1>Selamat datang lagi</h1><p>Belum punya akun? <Link href="/daftar">Buat akun</Link></p></div><form className="auth-form" onSubmit={(event) => { event.preventDefault(); router.push("/dashboard"); }}><label>Email<input required type="email" placeholder="nama@email.com" /></label><label>Kata Sandi<input required type="password" placeholder="Masukkan kata sandi" /></label><a className="forgot-link" href="/bantuan">Lupa kata sandi?</a><button className="auth-submit" type="submit">Masuk <span>→</span></button></form></AuthShell>;
}

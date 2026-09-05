"use client";

import Link from "next/link";
import { BrandMark } from "./BrandMark";

export function AuthBrand() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group focus:outline-none">
      <BrandMark />
      <span className="font-display font-extrabold text-lg tracking-tight text-[#0f274a] group-hover:text-blue-600 transition-colors">
        Satu<span className="text-blue-600">Urusan</span>
      </span>
    </Link>
  );
}
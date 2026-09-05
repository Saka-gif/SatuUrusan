import Link from "next/link";
import { BrandMark } from "./BrandMark";

export function AuthBrand() {
  return <Link className="auth-brand" href="/"><BrandMark /><span>Satu<span>Urusan</span></span></Link>;
}
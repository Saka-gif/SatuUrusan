import type { ReactNode } from "react";
import { AuthBrand } from "./AuthBrand";

export function AuthShell({ children }: { children: ReactNode }) {
  return <main className="auth-page"><div className="auth-card"><AuthBrand />{children}</div><span className="auth-help">?</span></main>;
}
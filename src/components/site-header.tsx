import Link from "next/link";
import { Zap } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-emerald-100 bg-white/85 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Zap size={18} aria-hidden="true" />
          </span>
          <span>{siteConfig.name}</span>
        </Link>
        <nav
          aria-label="Navigatie principala"
          className="hidden items-center gap-4 text-sm font-medium text-slate-700 md:flex lg:gap-6"
        >
          <Link href="/#calculator" className="hover:text-emerald-700">
            Calculator
          </Link>
          <Link href="/#calculatoare-populare" className="hover:text-emerald-700">
            Calculatoare
          </Link>
          <Link href="/#simulator-factura" className="hover:text-emerald-700">
            Simulator
          </Link>
          <Link href="/#ghiduri-utile" className="hover:text-emerald-700">
            Ghiduri
          </Link>
          <Link href="/#faq" className="hover:text-emerald-700">
            FAQ
          </Link>
          <Link href="/despre" className="hover:text-emerald-700">
            Despre
          </Link>
        </nav>
      </div>
    </header>
  );
}

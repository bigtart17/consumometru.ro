"use client";

import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { primaryNavigationLinks } from "@/data/siteNavigation";
import { siteConfig } from "@/lib/site";

type HeaderNavigationLink = {
  href: string;
  label: string;
  featured?: boolean;
};

const annualCalculatorLink = {
  href: "/calculeaza/consum-anual-locuinta",
  label: "Consum anual",
  featured: true
};

const navigationLinks: HeaderNavigationLink[] = [
  primaryNavigationLinks[0],
  annualCalculatorLink,
  ...primaryNavigationLinks.slice(1),
  { href: "/despre", label: "Despre", featured: false }
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-emerald-100 bg-white/85 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-slate-950"
          onClick={() => setIsOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Zap size={18} aria-hidden="true" />
          </span>
          <span>{siteConfig.name}</span>
        </Link>
        <nav
          aria-label="Navigație principală"
          className="hidden items-center gap-4 text-sm font-medium text-slate-700 md:flex lg:gap-6"
        >
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.featured
                  ? "inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100"
                  : "hover:text-emerald-700"
              }
            >
              {link.label}
              {link.featured ? (
                <span className="rounded-full bg-emerald-700 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Nou
                </span>
              ) : null}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-100 bg-white text-slate-800 shadow-sm transition hover:border-emerald-200 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 md:hidden"
          aria-label={isOpen ? "Închide meniul" : "Deschide meniul"}
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Navigație mobilă"
        className={
          isOpen
            ? "mx-auto mt-3 grid max-w-7xl gap-2 rounded-lg border border-emerald-100 bg-white p-2 text-sm font-semibold text-slate-800 shadow-sm md:hidden"
            : "hidden"
        }
      >
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              link.featured
                ? "flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-3 text-emerald-900 hover:bg-emerald-100"
                : "rounded-lg px-3 py-3 hover:bg-emerald-50 hover:text-emerald-700"
            }
            onClick={() => setIsOpen(false)}
          >
            <span>{link.label}</span>
            {link.featured ? (
              <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Nou
              </span>
            ) : null}
          </Link>
        ))}
      </nav>
    </header>
  );
}

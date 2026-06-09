"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { FooterSection } from "@/components/site-footer";

type MobileFooterAccordionProps = {
  sections: FooterSection[];
};

export function MobileFooterAccordion({ sections }: MobileFooterAccordionProps) {
  const baseId = useId();
  const [openSections, setOpenSections] = useState(() => new Set(["Calculatoare"]));

  function toggleSection(title: string) {
    setOpenSections((current) => {
      const next = new Set(current);

      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }

      return next;
    });
  }

  return (
    <nav aria-label="Linkuri utile din footer" className="divide-y divide-emerald-100 rounded-lg border border-emerald-100">
      {sections.map((section, index) => {
        const isOpen = openSections.has(section.title);
        const buttonId = `${baseId}-footer-button-${index}`;
        const panelId = `${baseId}-footer-panel-${index}`;

        return (
          <div key={section.title} className="bg-white first:rounded-t-lg last:rounded-b-lg">
            <button
              type="button"
              id={buttonId}
              className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-950 outline-none ring-inset ring-emerald-500 transition hover:bg-emerald-50 focus-visible:ring-2"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleSection(section.title)}
            >
              <span>{section.title}</span>
              <span
                className={`text-lg leading-none text-emerald-700 transition ${isOpen ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-4 pb-4"
            >
              <div className="grid gap-2">
                {section.links.map((link) => (
                  <Link
                    key={`${section.title}-${link.href}-${link.label}`}
                    href={link.href}
                    className="rounded-md py-1.5 text-sm text-slate-600 outline-none ring-inset ring-emerald-500 transition hover:text-emerald-700 focus-visible:ring-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

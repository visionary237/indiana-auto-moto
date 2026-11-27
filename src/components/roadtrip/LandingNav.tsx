"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { id: "pourquoi", label: "Pourquoi partir" },
  { id: "deroulement", label: "Le stage" },
  { id: "region", label: "La côte" },
  { id: "prix", label: "Prix" },
  { id: "devis", label: "Mon devis" },
  { id: "faq", label: "Questions" },
];

/** Sommaire collant de la landing. */
export function LandingNav() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-40% 0px -55% 0px" });
    LINKS.forEach((l) => { const el = document.getElementById(l.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label="Sommaire du stage" className="sticky top-16 z-40 border-b border-sable-dark/60 bg-white/95">
      <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-5 lg:px-8">
        {LINKS.map((l) => (
          <li key={l.id} className="shrink-0">
            <a href={`#${l.id}`} data-silent aria-current={active === l.id ? "true" : undefined} className={`inline-flex min-h-[40px] items-center rounded-full px-4 text-[.92rem] font-medium transition-colors ${active === l.id ? "bg-carbone text-white" : "text-carbone/75 hover:bg-sable"}`}>{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

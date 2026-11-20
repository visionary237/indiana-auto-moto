"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { id: "le-stage", label: "Le stage" },
  { id: "prix", label: "Prix" },
  { id: "programme", label: "Programme" },
  { id: "region", label: "La région" },
  { id: "disponibilites", label: "Disponibilités" },
  { id: "faq", label: "Questions" },
];

/** Sommaire collant de la landing (mobile d'abord) + CTA unique en bas d'écran sur mobile. */
export function LandingNav() {
  const [active, setActive] = useState("");
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    LINKS.forEach((l) => { const el = document.getElementById(l.id); if (el) io.observe(el); });
    const devis = document.getElementById("devis");
    let devisVisible = false;
    const io2 = new IntersectionObserver(([e]) => { devisVisible = e.isIntersecting; update(); }, { threshold: 0.05 });
    if (devis) io2.observe(devis);
    function update() { setShowCta(window.scrollY > window.innerHeight * 0.8 && !devisVisible); }
    window.addEventListener("scroll", update, { passive: true });
    return () => { io.disconnect(); io2.disconnect(); window.removeEventListener("scroll", update); };
  }, []);

  return (
    <>
      <nav aria-label="Sommaire du stage" className="sticky top-16 z-40 border-b border-sable-dark/60 bg-white/95">
        <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-5 lg:px-8">
          {LINKS.map((l) => (
            <li key={l.id} className="shrink-0">
              <a href={`#${l.id}`} aria-current={active === l.id ? "true" : undefined} className={`inline-flex min-h-[40px] items-center rounded-full px-4 text-[.92rem] font-medium transition-colors ${active === l.id ? "bg-carbone text-white" : "text-carbone/75 hover:bg-sable"}`}>
                {l.label}
              </a>
            </li>
          ))}
          <li className="ml-auto hidden shrink-0 md:block">
            <a href="#devis" className="inline-flex min-h-[40px] items-center rounded-full bg-sunset px-4 text-[.92rem] font-semibold text-carbone hover:bg-[#f08550]">Recevoir mon devis</a>
          </li>
        </ul>
      </nav>
      <div className={`sticky-cta fixed inset-x-3 bottom-3 z-40 transition-all duration-300 md:hidden ${showCta ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}>
        <a href="#devis" className="btn btn-sunset w-full shadow-xl">Recevoir mon devis personnalisé</a>
      </div>
    </>
  );
}

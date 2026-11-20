"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./Logo";
import { nav, school } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const btn = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) drawer.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) { setOpen(false); btn.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <>
      {/* Pas de backdrop-filter sur l'en-tête : il créerait un bloc conteneur et rognerait le menu mobile en position fixe. */}
      <header className="sticky top-0 z-50 border-b border-beton bg-marquage">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-5 lg:px-8">
          <Link href="/" className="min-w-0 shrink" aria-label="Accueil Indiana Auto-Moto">
            <Logo />
          </Link>

          <nav aria-label="Navigation principale" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {nav.filter((n) => !n.mobileOnly).map((item) => {
                const active = isActive(item.href);
                const featured = item.href.includes("stage-moto");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-full px-3 py-2 text-[.95rem] font-medium transition-colors ${
                        featured ? "bg-foret text-sable hover:bg-foret-light" : active ? "bg-beton text-asphalt" : "text-asphalt/80 hover:bg-beton hover:text-asphalt"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a href={school.phoneHref} className="hidden text-[.95rem] font-semibold lg:inline-block">{school.phone}</a>
            <Link href="/contact/" className="btn btn-rouge hidden !py-2.5 md:inline-flex">S'inscrire</Link>
            <button
              ref={btn}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-asphalt text-marquage xl:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-[18px]" aria-hidden="true">
                <span className={`absolute left-0 h-[2px] w-[18px] bg-current transition-transform ${open ? "top-[5px] rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-[5px] h-[2px] w-[18px] bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-[2px] w-[18px] bg-current transition-transform ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            ref={drawer}
            id="menu-mobile"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 bottom-0 top-16 z-[60] overflow-y-auto overscroll-contain bg-asphalt px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 text-marquage xl:hidden"
          >
            <Link href="/stage-moto-normandie/" className="mb-4 block rounded-2xl bg-foret p-5">
              <span className="block text-sm text-sable/75">Nouveau</span>
              <span className="block font-display text-2xl font-semibold text-sable">Stage moto et séjour en Normandie</span>
            </Link>
            <ul>
              {[{ href: "/", label: "Accueil" }, ...nav.filter((n) => !n.href.includes("stage-moto")), { href: "/contact/", label: "Contact et inscription" }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex min-h-[52px] items-center border-b border-white/10 font-display text-xl font-medium aria-[current=page]:text-rouge"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3">
              <Link href="/contact/" className="btn btn-rouge w-full">S'inscrire</Link>
              <a href={school.phoneHref} className="btn btn-ghost btn-ghost-light w-full">Appeler le {school.phone}</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./Logo";
import { nav, school } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-beton bg-marquage/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="Accueil Indiana Auto-Moto">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded px-2.5 py-2 font-display text-[1.1rem] font-semibold transition-colors hover:text-rouge ${
                      item.href.includes("stage-moto") ? "text-foret" : ""
                    } ${active ? "text-rouge" : ""}`}
                  >
                    {item.label}
                    {active && <span className="absolute inset-x-2.5 -bottom-[13px] h-[3px] bg-rouge" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={school.phoneHref} className="hidden font-display text-lg font-bold md:inline-block">
            {school.phone}
          </a>
          <Link href="/contact/" className="btn btn-rouge hidden md:inline-flex">
            S'inscrire
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded border-2 border-asphalt xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-5">
              <span className={`absolute left-0 h-[2.5px] w-5 bg-asphalt transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-[2.5px] w-5 bg-asphalt transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-[2.5px] w-5 bg-asphalt transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] bottom-0 overflow-y-auto bg-asphalt px-6 pb-10 pt-6 text-marquage xl:hidden"
          >
            <ul className="space-y-1">
              {[{ href: "/", label: "Accueil" }, ...nav, { href: "/contact/", label: "Contact et inscription" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block border-b border-asphalt-2 py-3 font-display text-3xl font-bold hover:text-rouge">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={school.phoneHref} className="btn btn-rouge mt-8 w-full">
              Appeler le {school.phone}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

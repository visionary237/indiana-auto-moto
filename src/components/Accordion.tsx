"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y-2 divide-beton border-y-2 border-beton">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <h3>
              <button
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-[1.6rem] font-bold hover:text-rouge"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {it.q}
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-current transition-transform ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">+</span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                  <p className="measure pb-6 text-asphalt/80">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

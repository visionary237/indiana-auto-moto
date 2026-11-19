"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Jour } from "@/lib/roadtrip";

const TYPE_LABEL: Record<string, { label: string; cls: string }> = {
  arrivee: { label: "Arrivée", cls: "bg-ocean text-white" },
  formation: { label: "Formation", cls: "bg-carbone text-sable" },
  decouverte: { label: "Découverte", cls: "bg-foret text-sable" },
  examen: { label: "Examen", cls: "bg-sunset text-carbone" },
  depart: { label: "Départ", cls: "bg-ocean text-white" },
};

/** Scène 04 : timeline interactive des 14 jours, pilotée par content/roadtrip/programme.json. */
export function Timeline14({ jours }: { jours: Jour[] }) {
  const [sel, setSel] = useState(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const j = jours[sel];

  function onKey(e: KeyboardEvent) {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = Math.min(jours.length - 1, Math.max(0, sel + d));
    setSel(n);
    btns.current[n]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Jours du séjour" onKeyDown={onKey} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-4 lg:mx-0 lg:grid lg:grid-cols-[repeat(14,minmax(0,1fr))] lg:px-0">
        {jours.map((d, i) => {
          const on = i === sel;
          const exam = d.type.includes("examen");
          return (
            <button
              key={d.jour}
              ref={(el) => { btns.current[i] = el; }}
              role="tab"
              aria-selected={on}
              aria-controls="jour-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setSel(i)}
              className={`relative min-w-[64px] rounded-md border-2 px-2 py-3 text-left transition-colors ${on ? "border-carbone bg-carbone text-sable" : "border-sable-dark bg-white/60 hover:border-carbone"}`}
            >
              <span className="block font-display text-2xl font-bold leading-none">J{d.jour}</span>
              <span className={`block text-xs ${on ? "text-sable/70" : "text-gris"}`}>{d.jour_semaine.slice(0, 3)}.</span>
              <span className="mt-2 flex gap-1" aria-hidden="true">
                {d.type.includes("formation") && <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-sable" : "bg-carbone"}`} />}
                {d.type.includes("decouverte") && <span className="h-1.5 w-1.5 rounded-full bg-foret-light" />}
                {exam && <span className="h-1.5 w-1.5 rounded-full bg-sunset" />}
              </span>
            </button>
          );
        })}
      </div>

      <div id="jour-panel" role="tabpanel" aria-live="polite" className="mt-6 overflow-hidden rounded-xl bg-white/70">
        <AnimatePresence mode="wait">
          <motion.div key={sel} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="grid gap-8 p-6 md:grid-cols-[1fr_1.2fr_1.2fr] md:p-10">
            <div>
              <p className="font-display text-lg font-semibold text-gris">Jour {j.jour}, {j.jour_semaine.toLowerCase()}</p>
              <h3 className="font-editorial mt-1 text-4xl md:text-5xl">{j.titre}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {j.type.map((t) => <span key={t} className={`rounded-full px-3 py-1 text-sm font-semibold ${TYPE_LABEL[t]?.cls}`}>{TYPE_LABEL[t]?.label}</span>)}
              </div>
            </div>
            <div>
              <p className="font-display text-xl font-bold">Formation</p>
              <p className="mt-2 text-carbone/80">{j.formation}</p>
            </div>
            <div>
              <p className="font-display text-xl font-bold text-foret">Temps libre et découverte</p>
              <p className="mt-2 text-carbone/80">{j.decouverte}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-4 text-sm text-gris">
        Programme prévisionnel, donné à titre indicatif. Il est ajusté après l'évaluation de départ, selon votre progression et les dates
        d'examen attribuées par l'administration. Les sorties sont libres et ne sont pas comprises dans le prix du séjour.
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CTA_BY_STAGE, journey, STAMPS, TOTAL_KM, type StampId } from "@/lib/journey";

const useJourney = () => useSyncExternalStore(journey.subscribe, journey.get, journey.server);

/** Section d'étape : décerne un tampon quand le visiteur la lit. */
export function Etape({ id, stamp, km, className = "", children, label }: { id: string; stamp?: StampId; km: number; className?: string; children: ReactNode; label?: string }) {
  return (
    <section id={id} data-stamp={stamp} data-km={km} className={`scroll-mt-28 ${className}`} aria-label={label}>
      {children}
    </section>
  );
}

/** Bouton principal : même destination (le devis), texte qui progresse avec le voyage. */
export function JourneyCta({ className = "btn btn-sunset", fixed }: { className?: string; fixed?: string }) {
  const s = useJourney();
  const label = fixed ?? CTA_BY_STAGE[Math.min(s.stamps.length, CTA_BY_STAGE.length - 1)];
  return (
    <a href="#devis" className={className} data-rev-strong>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={label} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.2 }}>{label}</motion.span>
      </AnimatePresence>
    </a>
  );
}

function Stamp({ id, on, fresh, size = 34 }: { id: StampId; on: boolean; fresh: boolean; size?: number }) {
  const s = STAMPS.find((x) => x.id === id)!;
  return (
    <motion.span
      title={on ? `${s.label} : ${s.hint}` : "Tampon à obtenir"}
      animate={fresh ? { scale: [1.8, 0.9, 1], rotate: [-18, 6, -6] } : {}}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{ width: size, height: size }}
      className={`grid shrink-0 place-items-center rounded-full border-2 text-[12px] font-bold leading-none ${on ? "-rotate-6 border-sunset bg-sunset/15 text-sunset" : "border-dashed border-white/25 text-white/25"}`}
    >
      {s.short}
    </motion.span>
  );
}

/**
 * Carnet de route : compteur Paris → Le Havre et tampons.
 * Ordinateur : carte flottante en bas à gauche. Mobile : barre basse avec le bouton principal.
 */
export function JourneyHud() {
  const s = useJourney();

  useEffect(() => {
    const steps = Array.from(document.querySelectorAll<HTMLElement>("[data-km]"));
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { const st = (e.target as HTMLElement).dataset.stamp as StampId | undefined; if (e.isIntersecting && st) journey.stamp(st); }),
      { threshold: 0.3 },
    );
    steps.forEach((x) => io.observe(x));
    const onScroll = () => {
      // Kilomètres interpolés entre les étapes selon la position de lecture
      const mid = window.innerHeight * 0.5;
      let km = 0;
      for (let i = 0; i < steps.length; i++) {
        const r = steps[i].getBoundingClientRect(), a = Number(steps[i].dataset.km), b = Number(steps[i + 1]?.dataset.km ?? TOTAL_KM);
        if (r.top <= mid) km = a + (b - a) * Math.min(1, Math.max(0, (mid - r.top) / Math.max(1, r.height)));
      }
      if (!journey.get().done) journey.setKm(km);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const devis = document.getElementById("devis");
    const io2 = new IntersectionObserver(([e]) => setInDevis(e.isIntersecting), { threshold: 0.15 });
    if (devis) io2.observe(devis);
    return () => { io.disconnect(); io2.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const pct = (s.km / TOTAL_KM) * 100;
  const fresh = STAMPS.find((x) => x.id === s.fresh);
  const show = s.km >= 34;
  const [inDevis, setInDevis] = useState(false);
  const showDesk = show && !inDevis;

  return (
    <>
      <p className="sr-only" aria-live="polite">{fresh ? `Tampon obtenu : ${fresh.label}` : ""}</p>

      {/* Ordinateur : pastille compacte, dépliée au survol ou au clavier */}
      <motion.aside
        aria-label="Votre carnet de route"
        initial={false}
        animate={{ opacity: showDesk ? 1 : 0, y: showDesk ? 0 : 24 }}
        className="group fixed bottom-4 left-4 z-40 hidden w-[250px] rounded-[20px] bg-carbone/95 p-2.5 text-white shadow-2xl ring-1 ring-white/10 transition-[width] duration-300 hover:w-[310px] focus-within:w-[310px] focus:w-[310px] lg:block"
        style={{ pointerEvents: showDesk ? "auto" : "none" }}
        tabIndex={showDesk ? 0 : -1}
      >
        <div className="flex items-center gap-3 px-1">
          <span className="text-xl" aria-hidden="true">🏍️</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between"><p className="font-display text-lg font-semibold tabular-nums">{s.km} km</p><p className="text-xs text-white/60">{s.stamps.length}/{STAMPS.length} tampons</p></div>
            <div className="mt-1 h-1.5 rounded bg-white/15"><div className="h-full rounded bg-sunset transition-[width] duration-300" style={{ width: `${pct}%` }} /></div>
          </div>
        </div>
        <AnimatePresence>
          {fresh && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-2 px-1 pt-3 text-sm text-white/85">
              <Stamp id={fresh.id} on fresh size={28} /><span>Tampon <strong className="text-sunset">{fresh.label}</strong> : {fresh.hint}</span>
            </motion.p>
          )}
        </AnimatePresence>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] group-focus:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="flex justify-between px-1 pt-3 text-xs text-white/55"><span>Paris</span><span>Le Havre</span></div>
            <div className="mt-2 flex gap-1.5 px-1">{STAMPS.map((x) => <Stamp key={x.id} id={x.id} on={s.stamps.includes(x.id)} fresh={s.fresh === x.id} />)}</div>
            <JourneyCta className="btn btn-sunset mx-1 mb-1 mt-3 w-[calc(100%-.5rem)] !min-h-[42px] !py-2 text-[.95rem]" />
          </div>
        </div>
      </motion.aside>

      {/* Mobile */}
      <div className={`sticky-cta fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 lg:hidden ${show && !s.done && !inDevis ? "translate-y-0" : "translate-y-full"}`}>
        <div className="h-1 bg-white/20"><div className="h-full bg-sunset transition-[width] duration-300" style={{ width: `${pct}%` }} /></div>
        <div className="flex items-center gap-3 bg-carbone/95 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 text-white">
          <div className="shrink-0 leading-tight">
            <p className="font-display text-lg font-semibold tabular-nums">{s.km} km</p>
            <p className="text-[11px] text-white/60">{s.stamps.length}/{STAMPS.length} tampons</p>
          </div>
          <JourneyCta className="btn btn-sunset min-w-0 flex-1 !px-4" />
        </div>
        <AnimatePresence>
          {fresh && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="absolute -top-14 left-3 right-3 flex items-center gap-3 rounded-2xl bg-carbone px-4 py-2.5 text-sm text-white shadow-xl">
              <Stamp id={fresh.id} on fresh size={30} /> <span>Tampon <strong className="text-sunset">{fresh.label}</strong> : {fresh.hint}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/** Rangée de tampons pour l'écran final du devis. */
export function StampBook() {
  const s = useJourney();
  return (
    <div className="flex flex-wrap gap-2">
      {STAMPS.map((x) => (
        <span key={x.id} className={`rounded-full border-2 px-3 py-1 text-sm font-semibold ${s.stamps.includes(x.id) ? "border-sunset bg-sunset/10 text-carbone" : "border-dashed border-carbone/20 text-carbone/40"}`}>{x.label}</span>
      ))}
    </div>
  );
}

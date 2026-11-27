"use client";

import { useEffect, useSyncExternalStore } from "react";
import { rev, setSoundEnabled, soundEnabled, subscribeSound } from "@/lib/sound";

/** Joue le son moto au clic sur un bouton d'action principal, partout sur le site. */
export function SoundFx() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.("[data-rev], .btn-rouge, .btn-sunset");
      if (el && !el.hasAttribute("data-silent")) rev(el.hasAttribute("data-rev-strong") ? 1.3 : 1);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

/** Bouton pour couper ou remettre le son. */
export function SoundToggle({ className = "" }: { className?: string }) {
  const on = useSyncExternalStore(subscribeSound, soundEnabled, () => true);
  return (
    <button
      type="button"
      data-silent
      onClick={() => { setSoundEnabled(!on); if (!on) setTimeout(() => rev(0.8), 30); }}
      aria-pressed={on}
      aria-label={on ? "Couper le son moto des boutons" : "Activer le son moto des boutons"}
      title={on ? "Son moto activé" : "Son moto coupé"}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors ${className}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
        {on ? <><path d="M16.5 8.5a5 5 0 0 1 0 7" /><path d="M19 6a8.5 8.5 0 0 1 0 12" /></> : <path d="m17 9 5 6m0-6-5 6" />}
      </svg>
    </button>
  );
}

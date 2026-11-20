"use client";

import { useState } from "react";
import { euro } from "@/lib/content";
import type { Composante } from "@/lib/roadtrip";

const BADGE: Record<string, { label: string; cls: string }> = {
  fixe: { label: "Prix fixe", cls: "bg-foret text-sable" },
  devis: { label: "Sur devis", cls: "bg-sunset/20 text-carbone" },
  besoin: { label: "Si besoin", cls: "bg-ocean/10 text-ocean" },
  confirmer: { label: "À confirmer", cls: "bg-carbone/10 text-carbone" },
  charge: { label: "À votre charge", cls: "border border-carbone/25 text-carbone/80" },
};

function Toggle({ value, set, options, label }: { value: string; set: (v: never) => void; options: [string, string][]; label: string }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-carbone/70">{label}</legend>
      <div className="inline-flex rounded-full bg-white p-1 shadow-sm">
        {options.map(([v, l]) => (
          <label key={v} className={`cursor-pointer rounded-full px-4 py-2 text-[.95rem] font-medium transition-colors ${value === v ? "bg-carbone text-sable" : "text-carbone/75 hover:text-carbone"}`}>
            <input type="radio" className="sr-only" checked={value === v} onChange={() => set(v as never)} />
            {l}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Composition transparente du prix du stage : seuls les montants réellement fixés sont chiffrés. */
export function PriceBuilder({ composantes }: { composantes: Composante[] }) {
  const [code, setCode] = useState<"obtenu" | "a-preparer">("obtenu");
  const [heb, setHeb] = useState<"avec" | "sans">("avec");

  const lignes = composantes.filter((c) =>
    c.regle === "si-code-a-preparer" ? code === "a-preparer" : c.regle === "si-hebergement" ? heb === "avec" : true,
  );
  const fixe = lignes.filter((c) => c.prix !== null && (c.regle === "toujours" || c.regle === "si-code-a-preparer")).reduce((s, c) => s + (c.prix ?? 0), 0);
  const badge = (c: Composante) =>
    c.regle === "si-besoin" ? BADGE.besoin : c.regle === "a-confirmer" ? BADGE.confirmer : c.regle === "a-votre-charge" ? BADGE.charge : c.prix === null ? BADGE.devis : BADGE.fixe;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div>
        <div className="flex flex-wrap gap-6">
          <Toggle label="Le code moto" value={code} set={setCode} options={[["obtenu", "Déjà obtenu"], ["a-preparer", "À préparer"]]} />
          <Toggle label="Le logement" value={heb} set={setHeb} options={[["avec", "Avec hébergement"], ["sans", "Sans hébergement"]]} />
        </div>
        <ul className="mt-8 divide-y divide-sable-dark rounded-2xl bg-white px-5 md:px-7">
          {lignes.map((c) => {
            const b = badge(c);
            return (
              <li key={c.id} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div>
                  <p className="font-semibold">{c.libelle}</p>
                  <p className="mt-0.5 text-[.95rem] text-carbone/65">{c.detail}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${b.cls}`}>{b.label}</span>
                  {c.prix !== null && <span className="font-display text-xl font-semibold">{euro(c.prix)}{c.unite ? ` ${c.unite}` : ""}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="h-fit rounded-2xl bg-carbone p-6 text-sable md:p-8 lg:sticky lg:top-32" aria-live="polite">
        <p className="text-sable/70">Montant déjà fixé</p>
        <p className="font-display text-5xl font-semibold text-white">{euro(fixe)}</p>
        <p className="mt-1 text-sm text-sable/70">{code === "a-preparer" ? "Formation A2 et préparation au code" : "Formation A2, tarif de l'école"}</p>
        <div className="mt-6 space-y-2 border-t border-white/15 pt-5 text-[.95rem]">
          <p>+ frais d'organisation du stage</p>
          {heb === "avec" && <p>+ hébergement, selon le logement</p>}
          <p className="text-sable/65">Transport, repas et loisirs à votre charge</p>
        </div>
        <p className="mt-6 rounded-xl bg-white/10 p-4 text-sm leading-relaxed">
          Le prix total du stage dépend de vos choix. Il vous est communiqué dans un devis détaillé, ligne par ligne, avant tout engagement.
        </p>
        <a href="#devis" className="btn btn-sunset mt-6 w-full">Recevoir mon devis personnalisé</a>
      </aside>
    </div>
  );
}

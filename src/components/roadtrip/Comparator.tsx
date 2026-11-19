"use client";

import { useMemo, useState } from "react";
import { euro } from "@/lib/content";

type Num = number | "";
const n = (v: Num) => (v === "" ? null : v);

/**
 * Comparateur : formation près de chez moi vs séjour Indiana.
 * Aucune donnée moyenne n'est inventée : seules les valeurs saisies et les tarifs Indiana validés sont utilisés.
 */
export function Comparator({ indianaFormation, hebergementPrix }: { indianaFormation: number; hebergementPrix: number | null }) {
  const [local, setLocal] = useState({ prix: "" as Num, delai: "" as Num, deplacements: "" as Num, trajet: "" as Num, fraisTrajet: "" as Num });
  const [indiana, setIndiana] = useState({ hebergement: (hebergementPrix ?? "") as Num, transport: "" as Num, sejourFrais: "" as Num });
  const [heuresDispo, setHeuresDispo] = useState<Num>("");

  const res = useMemo(() => {
    const deps = n(local.deplacements), trajet = n(local.trajet), frais = n(local.fraisTrajet), prix = n(local.prix);
    const localTemps = deps !== null && trajet !== null ? (deps * trajet * 2) / 60 : null; // heures de trajet aller-retour
    const localCout = prix !== null ? prix + (deps !== null && frais !== null ? deps * frais : 0) : null;
    const heb = n(indiana.hebergement), tr = n(indiana.transport), sf = n(indiana.sejourFrais);
    const indianaCout = indianaFormation + (heb ?? 0) + (tr ?? 0) + (sf ?? 0);
    return { localTemps, localCout, indianaCout, indianaComplet: heb !== null };
  }, [local, indiana, indianaFormation]);

  const field = (id: string, label: string, value: Num, onChange: (v: Num) => void, hint?: string, suffix?: string) => (
    <div className="rt-field">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input id={id} type="number" inputMode="decimal" min={0} value={value} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} />
        {suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gris">{suffix}</span>}
      </div>
      {hint && <p className="mt-1 text-sm text-gris">{hint}</p>}
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr_0.9fr]">
      <fieldset className="rounded-xl bg-white/70 p-6">
        <legend className="font-editorial px-1 text-3xl">A. Près de chez moi</legend>
        <div className="mt-4 space-y-4">
          {field("c-prix", "Prix de la formation annoncé", local.prix, (v) => setLocal({ ...local, prix: v }), "Le devis de votre moto-école locale.", "€")}
          {field("c-delai", "Délai annoncé avant l'examen", local.delai, (v) => setLocal({ ...local, delai: v }), "Ce que l'école vous a indiqué.", "semaines")}
          {field("c-dep", "Nombre de déplacements pour les leçons", local.deplacements, (v) => setLocal({ ...local, deplacements: v }), undefined, "trajets")}
          {field("c-trajet", "Durée d'un trajet aller", local.trajet, (v) => setLocal({ ...local, trajet: v }), undefined, "min")}
          {field("c-frais", "Frais annexes par déplacement", local.fraisTrajet, (v) => setLocal({ ...local, fraisTrajet: v }), "Transport, stationnement…", "€")}
        </div>
      </fieldset>

      <fieldset className="rounded-xl bg-foret p-6 text-sable">
        <legend className="font-editorial px-1 text-3xl text-white">B. Séjour Indiana</legend>
        <p className="mt-4 text-sable/85">Formation Indiana, à partir de <strong className="text-white">{euro(indianaFormation)}</strong> TTC (tarifs de l'école).</p>
        <div className="mt-4 space-y-4 [&_label]:text-sable [&_.text-gris]:text-sable/70">
          {field("c-heb", "Hébergement 13 nuits", indiana.hebergement, (v) => setIndiana({ ...indiana, hebergement: v }), hebergementPrix === null ? "Tarif communiqué à l'ouverture des sessions : saisissez votre estimation." : undefined, "€")}
          {field("c-tr", "Transport aller-retour jusqu'au Havre", indiana.transport, (v) => setIndiana({ ...indiana, transport: v }), undefined, "€")}
          {field("c-sf", "Repas et sorties sur place", indiana.sejourFrais, (v) => setIndiana({ ...indiana, sejourFrais: v }), undefined, "€")}
          {field("c-dispo", "Jours de congés que vous pouvez poser", heuresDispo, setHeuresDispo, "Le séjour compte 10 jours ouvrés.", "jours")}
        </div>
      </fieldset>

      <div className="flex flex-col rounded-xl bg-carbone p-6 text-sable" aria-live="polite">
        <h3 className="font-editorial text-3xl text-white">Votre comparaison</h3>
        <dl className="mt-5 space-y-5">
          <div>
            <dt className="text-sable/70">Coût A, formation et déplacements</dt>
            <dd className="font-display text-4xl font-bold text-white">{res.localCout !== null ? euro(res.localCout) : "À renseigner"}</dd>
          </div>
          <div>
            <dt className="text-sable/70">Coût B, séjour complet {res.indianaComplet ? "" : "(hébergement non saisi)"}</dt>
            <dd className="font-display text-4xl font-bold text-sunset">{euro(res.indianaCout)}</dd>
          </div>
          <div>
            <dt className="text-sable/70">Temps passé dans les trajets, option A</dt>
            <dd className="font-display text-3xl font-bold text-white">{res.localTemps !== null ? `${Math.round(res.localTemps)} h` : "À renseigner"}</dd>
          </div>
          <div>
            <dt className="text-sable/70">Durée de formation</dt>
            <dd className="text-white">A : {local.delai !== "" ? `${local.delai} semaines annoncées` : "à renseigner"}. B : 2 semaines sur place, examen selon les places attribuées.</dd>
          </div>
          {heuresDispo !== "" && heuresDispo < 10 && (
            <p className="rounded-md bg-sunset/15 p-3 text-sm text-sable">Avec moins de 10 jours ouvrés disponibles, demandez-nous une formule adaptée.</p>
          )}
        </dl>
        <p className="mt-auto pt-6 text-xs text-sable/60">Calcul basé uniquement sur vos saisies et sur les tarifs Indiana. Indicatif, sans valeur d'offre. L'obtention du permis n'est jamais garantie.</p>
      </div>
    </div>
  );
}

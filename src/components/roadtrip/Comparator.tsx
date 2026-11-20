"use client";

import { useMemo, useState } from "react";
import { euro } from "@/lib/content";

type Num = number | "";

function Field({ id, label, value, onChange, suffix, hint }: { id: string; label: string; value: Num; onChange: (v: Num) => void; suffix: string; hint?: string }) {
  return (
    <div className="rt-field">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input id={id} type="number" inputMode="decimal" min={0} value={value} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} className="!pr-20" />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gris">{suffix}</span>
      </div>
      {hint && <p className="mt-1 text-sm text-gris">{hint}</p>}
    </div>
  );
}

function Row({ label, a: va, b: vb }: { label: string; a: string; b: string }) {
  return (
    <tr className="border-b border-sable-dark align-top">
      <th scope="row" className="py-4 pr-4 text-left font-medium text-carbone/70">{label}</th>
      <td className="py-4 pr-4 font-semibold">{va}</td>
      <td className="py-4 font-semibold">{vb}</td>
    </tr>
  );
}


/**
 * Comparateur à périmètre égal : on compare la formation A2 seule, puis la logistique.
 * Aucune donnée moyenne n'est inventée : seules les saisies et le tarif école Indiana sont utilisés.
 * Les frais du stage (organisation, hébergement) ne sont chiffrés que si l'utilisateur saisit son devis.
 */
export function Comparator({ formationIndiana }: { formationIndiana: number }) {
  const [a, setA] = useState({ prix: "" as Num, semaines: "" as Num, trajets: "" as Num, minutes: "" as Num, fraisTrajet: "" as Num });
  const [devis, setDevis] = useState<Num>("");
  const [transport, setTransport] = useState<Num>("");

  const r = useMemo(() => {
    const has = (v: Num) => v !== "";
    const heuresTrajet = has(a.trajets) && has(a.minutes) ? ((a.trajets as number) * (a.minutes as number) * 2) / 60 : null;
    const coutTrajets = has(a.trajets) && has(a.fraisTrajet) ? (a.trajets as number) * (a.fraisTrajet as number) : null;
    const totalA = has(a.prix) ? (a.prix as number) + (coutTrajets ?? 0) : null;
    const totalB = has(devis) ? (devis as number) + (has(transport) ? (transport as number) : 0) : null;
    return { heuresTrajet, coutTrajets, totalA, totalB };
  }, [a, devis, transport]);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div className="space-y-8">
        <fieldset className="space-y-4">
          <legend className="mb-1 font-display text-2xl font-semibold">Votre moto-école près de chez vous</legend>
          <Field id="cmp-prix" label="Prix annoncé pour le permis A2" value={a.prix} onChange={(v) => setA({ ...a, prix: v })} suffix="€" hint="Le montant de votre devis local." />
          <Field id="cmp-sem" label="Délai annoncé jusqu'à l'examen" value={a.semaines} onChange={(v) => setA({ ...a, semaines: v })} suffix="semaines" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="cmp-traj" label="Nombre de leçons" value={a.trajets} onChange={(v) => setA({ ...a, trajets: v })} suffix="trajets" />
            <Field id="cmp-min" label="Trajet aller" value={a.minutes} onChange={(v) => setA({ ...a, minutes: v })} suffix="min" />
          </div>
          <Field id="cmp-frais" label="Coût d'un aller-retour" value={a.fraisTrajet} onChange={(v) => setA({ ...a, fraisTrajet: v })} suffix="€" hint="Transport, stationnement." />
        </fieldset>
        <fieldset className="space-y-4">
          <legend className="mb-1 font-display text-2xl font-semibold">Le stage au Havre</legend>
          <Field id="cmp-devis" label="Montant de votre devis Indiana" value={devis} onChange={setDevis} suffix="€" hint="Laissez vide si vous ne l'avez pas encore reçu." />
          <Field id="cmp-tr" label="Train ou voiture aller-retour" value={transport} onChange={setTransport} suffix="€" />
        </fieldset>
      </div>

      <div className="rounded-2xl bg-white p-5 md:p-8" aria-live="polite">
        <h3 className="font-display text-2xl font-semibold">Côte à côte</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[440px] text-[.97rem]">
            <thead>
              <tr className="border-b-2 border-carbone text-left text-sm text-carbone/60">
                <th className="py-2 font-medium" />
                <th className="py-2 font-medium">Près de chez vous</th>
                <th className="py-2 font-medium">Stage au Havre</th>
              </tr>
            </thead>
            <tbody>
              <Row label="Formation A2 seule" a={a.prix !== "" ? euro(a.prix) : "À saisir"} b={`${euro(formationIndiana)} (tarif école)`} />
              <Row label="Durée" a={a.semaines !== "" ? `${a.semaines} semaines annoncées` : "À saisir"} b="2 semaines sur place, examen selon les places attribuées" />
              <Row label="Temps de trajet" a={r.heuresTrajet !== null ? `${Math.round(r.heuresTrajet)} h au total` : "À saisir"} b="Un aller-retour" />
              <Row label="Total à prévoir" a={r.totalA !== null ? euro(r.totalA) : "À saisir"} b={r.totalB !== null ? euro(r.totalB) : "Selon votre devis"} />
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-sm text-carbone/65">
          Le stage comprend des prestations qu'une formation classique n'inclut pas : organisation, logement en option. Le total ne se compare donc qu'avec votre devis en main.
          Calcul fondé uniquement sur vos saisies et le tarif de l'école.
        </p>
      </div>
    </div>
  );
}

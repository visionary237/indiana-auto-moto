"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { euro } from "@/lib/content";
import { sendLead } from "@/lib/leads";

const FORMATIONS = [
  { id: "b-manuelle", label: "Permis B, boîte manuelle", base: 1490, hours: 20, ref: "Pack permis B accéléré" },
  { id: "b-auto", label: "Permis B, boîte automatique", base: 790, hours: 13, ref: "Pack permis B boîte automatique" },
  { id: "a2", label: "Permis moto A2", base: 790, hours: 20, ref: "Pack permis A2" },
  { id: "a1", label: "Permis moto A1 (125 cm³)", base: 690, hours: 20, ref: "Pack permis A1" },
] as const;

const DECOUVERTES = [
  "Le Havre, centre reconstruit par Auguste Perret (UNESCO)",
  "Étretat et ses falaises",
  "Honfleur et le pont de Normandie",
  "Front de mer et plage du Havre",
];

const HEBERGEMENT = [
  { id: "aucun", label: "Je n'ai pas besoin d'hébergement" },
  { id: "partenaire", label: "Je souhaite un hébergement proposé par l'école" },
  { id: "autonome", label: "Je m'organise seul·e" },
];

const DAYS = 10; // 2 semaines ouvrées

export function EscapeConfigurator() {
  const [formation, setFormation] = useState<(typeof FORMATIONS)[number]["id"]>("b-manuelle");
  const [code, setCode] = useState<"obtenu" | "a-obtenir">("obtenu");
  const [extra, setExtra] = useState(0);
  const [heb, setHeb] = useState("partenaire");
  const [decouvertes, setDecouvertes] = useState<string[]>([DECOUVERTES[0], DECOUVERTES[1]]);
  const [periode, setPeriode] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "mailto">("idle");

  const f = FORMATIONS.find((x) => x.id === formation)!;
  const isMoto = formation === "a1" || formation === "a2";
  const totalHours = f.hours + extra;
  const lines = useMemo(() => {
    const l: { label: string; price: number }[] = [{ label: `${f.ref} (${f.hours} h)`, price: f.base }];
    if (code === "a-obtenir") l.push({ label: "Forfait code illimité + redevance examen", price: 180 });
    if (extra > 0) l.push({ label: `${extra} h de conduite supplémentaires`, price: extra * 60 });
    return l;
  }, [f, code, extra]);
  const total = lines.reduce((s, l) => s + l.price, 0);

  const months = useMemo(() => {
    const out: string[] = [];
    const d = new Date();
    for (let i = 2; i < 10; i++) {
      const m = new Date(d.getFullYear(), d.getMonth() + i, 1);
      out.push(m.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }));
    }
    return out;
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("site")) return;
    setStatus("sending");
    try {
      const r = await sendLead("Driving Escape : demande de devis", {
        Formation: f.label,
        Code: code === "obtenu" ? "Déjà obtenu" : "À obtenir",
        "Heures supplémentaires": extra,
        "Estimation formation (TTC)": euro(total),
        Hébergement: HEBERGEMENT.find((h) => h.id === heb)?.label,
        Découvertes: decouvertes,
        "Période souhaitée": periode || "Flexible",
        Nom: String(fd.get("nom")),
        Téléphone: String(fd.get("tel")),
        Email: String(fd.get("email")),
        "Tranche d'âge": String(fd.get("age")),
        "Ville de résidence": String(fd.get("ville")),
        Situation: String(fd.get("situation")),
        "Déjà pris des leçons": String(fd.get("experience")),
        "Financement CPF envisagé": fd.get("cpf") === "on",
        Message: String(fd.get("message") ?? ""),
      });
      setStatus(r === "mailto" ? "mailto" : "idle");
      if (r === "sent") setStep(3);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="rounded-md bg-white p-6 md:p-8">
        <ol className="mb-8 flex gap-2 text-sm font-semibold" aria-label="Étapes">
          {["Votre séjour", "Votre profil", "Envoyé"].map((s, i) => (
            <li key={s} className={`flex-1 border-t-4 pt-2 ${step >= i + 1 ? "border-manche text-manche" : "border-beton text-gris"}`} aria-current={step === i + 1 ? "step" : undefined}>
              {i + 1}. {s}
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-8">
              <fieldset>
                <legend className="font-display text-2xl font-bold">Quel permis ?</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {FORMATIONS.map((x) => (
                    <label key={x.id} className={`cursor-pointer rounded border-2 p-4 transition-colors ${formation === x.id ? "border-manche bg-manche-light" : "border-beton hover:border-gris"}`}>
                      <input type="radio" name="formation" value={x.id} checked={formation === x.id} onChange={() => setFormation(x.id)} className="sr-only" />
                      <span className="block font-semibold">{x.label}</span>
                      <span className="text-sm text-gris">à partir de {euro(x.base)}, {x.hours} h incluses</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-display text-2xl font-bold">Le code</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[{ id: "obtenu", l: "Je l'ai déjà" }, { id: "a-obtenir", l: "Je dois le passer" }].map((c) => (
                    <label key={c.id} className={`cursor-pointer rounded border-2 px-4 py-2.5 ${code === c.id ? "border-manche bg-manche-light" : "border-beton"}`}>
                      <input type="radio" name="code" className="sr-only" checked={code === c.id} onChange={() => setCode(c.id as typeof code)} />
                      {c.l}
                    </label>
                  ))}
                </div>
                {code === "a-obtenir" && (
                  <p className="mt-2 text-sm text-gris">Pour profiter pleinement des deux semaines, le code se prépare en ligne avant votre arrivée, avec le suivi de l'école.</p>
                )}
              </fieldset>

              <div className="field">
                <label htmlFor="extra">Heures de conduite en plus : <strong>{extra} h</strong></label>
                <input id="extra" type="range" min={0} max={10} step={1} value={extra} onChange={(e) => setExtra(+e.target.value)} className="w-full accent-manche" style={{ border: "none", padding: 0 }} />
                <p className="hint">Soit environ {Math.round((totalHours / DAYS) * 10) / 10} h de {isMoto ? "moto" : "conduite"} par jour sur 10 jours ouvrés. Le volume réel est fixé après l'évaluation de départ.</p>
              </div>

              <fieldset>
                <legend className="font-display text-2xl font-bold">Hébergement</legend>
                <div className="mt-3 space-y-2">
                  {HEBERGEMENT.map((h) => (
                    <label key={h.id} className="flex items-center gap-3">
                      <input type="radio" name="heb" checked={heb === h.id} onChange={() => setHeb(h.id)} className="h-4 w-4 accent-manche" />
                      {h.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-display text-2xl font-bold">Découvrir la région</legend>
                <p className="text-sm text-gris">Sorties envisagées en dehors des heures de formation.</p>
                <div className="mt-3 space-y-2">
                  {DECOUVERTES.map((d) => (
                    <label key={d} className="flex items-center gap-3">
                      <input type="checkbox" className="h-4 w-4 accent-manche" checked={decouvertes.includes(d)} onChange={(e) => setDecouvertes((v) => (e.target.checked ? [...v, d] : v.filter((x) => x !== d)))} />
                      {d}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="field max-w-sm">
                <label htmlFor="periode">Période souhaitée</label>
                <select id="periode" value={periode} onChange={(e) => setPeriode(e.target.value)}>
                  <option value="">Je suis flexible</option>
                  {months.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>

              <button type="button" className="btn btn-rouge" onClick={() => setStep(2)}>Continuer vers mon profil</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.form key="s2" onSubmit={submit} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="grid gap-5 md:grid-cols-2">
              <div className="field"><label htmlFor="e-nom">Nom et prénom</label><input id="e-nom" name="nom" required autoComplete="name" /></div>
              <div className="field"><label htmlFor="e-tel">Téléphone</label><input id="e-tel" name="tel" type="tel" required autoComplete="tel" /></div>
              <div className="field md:col-span-2"><label htmlFor="e-email">E-mail</label><input id="e-email" name="email" type="email" required autoComplete="email" /></div>
              <div className="field">
                <label htmlFor="e-age">Âge</label>
                <select id="e-age" name="age" required defaultValue="">
                  <option value="" disabled>Choisir…</option>
                  <option>15 à 17 ans</option><option>18 à 25 ans</option><option>26 ans et plus</option>
                </select>
                <p className="hint">Mineur·e : l'accord d'un représentant légal est nécessaire.</p>
              </div>
              <div className="field"><label htmlFor="e-ville">Ville de résidence</label><input id="e-ville" name="ville" required placeholder="Paris, Versailles, Créteil…" autoComplete="address-level2" /></div>
              <div className="field">
                <label htmlFor="e-sit">Situation</label>
                <select id="e-sit" name="situation" defaultValue="Étudiant·e">
                  <option>Lycéen·ne ou étudiant·e</option><option>Salarié·e</option><option>Demandeur·se d'emploi</option><option>Indépendant·e</option><option>Autre</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="e-exp">Avez-vous déjà pris des leçons ?</label>
                <select id="e-exp" name="experience" defaultValue="Non">
                  <option>Non</option><option>Oui, moins de 10 h</option><option>Oui, plus de 10 h</option>
                </select>
              </div>
              <div className="field md:col-span-2"><label htmlFor="e-msg">Une précision ? (facultatif)</label><textarea id="e-msg" name="message" rows={3} /></div>
              <input type="text" name="site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <label className="flex items-start gap-3 md:col-span-2"><input type="checkbox" name="cpf" className="mt-1.5 h-4 w-4 accent-manche" /> J'envisage de mobiliser mon CPF</label>
              <label className="flex items-start gap-3 text-sm text-gris md:col-span-2">
                <input type="checkbox" required className="mt-1 h-4 w-4 accent-manche" />
                J'ai compris que Driving Escape est un projet en cours de validation et que cette demande ne vaut ni réservation ni engagement. J'accepte d'être recontacté·e à ce sujet.
              </label>
              <div className="flex flex-wrap gap-3 md:col-span-2">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>Modifier mon séjour</button>
                <button className="btn btn-rouge" disabled={status === "sending"}>{status === "sending" ? "Envoi en cours…" : "Demander mon devis"}</button>
              </div>
              {status === "mailto" && <p className="text-sm text-gris md:col-span-2" role="status">Votre messagerie s'est ouverte avec la demande pré-remplie : il ne reste qu'à l'envoyer.</p>}
              {status === "error" && <p className="text-sm text-rouge md:col-span-2" role="alert">L'envoi n'a pas abouti. Réessayez ou appelez le 02 35 41 27 06.</p>}
            </motion.form>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="status">
              <h3 className="text-3xl">Demande de devis envoyée</h3>
              <p className="measure mt-2 text-asphalt/75">
                Vous faites partie des premières personnes intéressées. Nous revenons vers vous dès que les dates, l'hébergement et les conditions du séjour sont confirmés.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Récapitulatif : se met à jour à chaque choix */}
      <aside className="h-fit rounded-md bg-manche p-6 text-marquage lg:sticky lg:top-24 md:p-8" aria-live="polite">
        <h3 className="text-3xl">Votre estimation</h3>
        <ul className="mt-5 space-y-3">
          {lines.map((l) => (
            <li key={l.label} className="flex justify-between gap-4 border-b border-white/15 pb-3">
              <span>{l.label}</span>
              <span className="font-semibold">{euro(l.price)}</span>
            </li>
          ))}
          <li className="flex justify-between gap-4 border-b border-white/15 pb-3 text-marquage/75">
            <span>Hébergement et découvertes</span><span>sur devis</span>
          </li>
        </ul>
        <p className="mt-5 flex items-baseline justify-between">
          <span>Formation, à partir de</span>
          <motion.span key={total} initial={{ opacity: 0.4, y: -4 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl font-bold">{euro(total)}</motion.span>
        </p>
        <p className="mt-4 text-sm text-marquage/70">
          Estimation indicative TTC, établie à partir des tarifs actuels de l'école. Elle ne constitue pas une offre. Les dates d'examen sont attribuées par l'administration : elles ne peuvent pas être garanties, pas plus que l'obtention du permis.
        </p>
      </aside>
    </div>
  );
}

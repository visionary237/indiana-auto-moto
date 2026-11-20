"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { euro } from "@/lib/content";
import { sendLead } from "@/lib/leads";

type Ans = {
  permis: string; code: string; experience: string; niveau: string;
  ville: string; periode: string; deuxSemaines: string; hebergement: string; transport: string; budget: string;
};
const INIT: Ans = { permis: "a2", code: "obtenu", experience: "jamais", niveau: "debutant", ville: "", periode: "", deuxSemaines: "oui", hebergement: "individuelle", transport: "train", budget: "" };

const Q = {
  permis: [["a2", "Permis A2"], ["a1", "Permis A1 (125 cm³)"], ["a", "Passerelle A2 vers A"], ["nsp", "Je ne sais pas encore"]],
  code: [["obtenu", "Code moto obtenu"], ["en-cours", "En cours de révision"], ["non", "Pas encore commencé"]],
  experience: [["jamais", "Jamais conduit de deux-roues"], ["scooter", "Scooter ou 125 cm³"], ["moto", "Déjà roulé à moto"]],
  niveau: [["debutant", "Je débute"], ["heures", "J'ai déjà pris des leçons"], ["echec", "J'ai déjà passé l'examen"]],
  deuxSemaines: [["oui", "Oui, deux semaines d'affilée"], ["non", "Non, moins que ça"], ["nsp", "À préciser"]],
  hebergement: [["individuelle", "Chambre individuelle"], ["partagee", "Chambre partagée, si possible"], ["aucun", "Je n'en ai pas besoin"]],
  transport: [["train", "Train"], ["voiture", "Voiture"], ["aide", "J'aimerais de l'aide pour organiser le trajet"]],
} as const;

function Choice({ name, value, onChange, options }: { name: string; value: string; onChange: (v: string) => void; options: readonly (readonly [string, string])[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([v, l]) => (
        <label key={v} className={`cursor-pointer rounded-full border-2 px-4 py-2 text-[.98rem] transition-colors ${value === v ? "border-foret bg-foret text-sable" : "border-sable-dark bg-white/60 hover:border-carbone"}`}>
          <input type="radio" className="sr-only" name={name} value={v} checked={value === v} onChange={() => onChange(v)} />
          {l}
        </label>
      ))}
    </div>
  );
}

/** Scène 11 : configurateur et qualification. Propose une formule ou transmet une demande personnalisée. */
export function AdventureConfigurator({ prix }: { prix: { codeObtenu: number; codeAPreparer: number } }) {
  const [a, setA] = useState<Ans>(INIT);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const set = (k: keyof Ans) => (v: string) => setA((s) => ({ ...s, [k]: v }));

  const reco = useMemo(() => {
    const reasons: string[] = [];
    if (a.permis !== "a2") reasons.push(a.permis === "nsp" ? "Nous vous aidons à choisir la catégorie adaptée." : "Le stage est conçu pour le permis A2 : nous étudions une formule sur mesure.");
    if (a.deuxSemaines === "non") reasons.push("Le stage dure deux semaines : nous regardons un format plus court.");
    if (a.niveau === "echec") reasons.push("Nous adaptons le programme à votre précédent passage.");
    const perso = reasons.length > 0;
    const formule = a.code === "obtenu" ? { nom: "Stage A2, code moto obtenu", prix: prix.codeObtenu } : { nom: "Stage A2, code moto à préparer", prix: prix.codeAPreparer };
    const warn = a.code === "non" ? "Le code moto doit être réussi avant les épreuves pratiques. Prévoyez quelques semaines de révision en ligne avant le stage." : null;
    const qualifie = !perso && a.deuxSemaines === "oui";
    return { perso, reasons, formule, warn, qualifie };
  }, [a, prix]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("site")) return;
    setStatus("sending");
    try {
      const r = await sendLead("Stage moto Normandie : demande de séjour", {
        "Étape CRM": reco.qualifie ? "Candidat qualifié" : "Demande de renseignements",
        Source: "stage-moto-normandie",
        "Formule proposée": reco.perso ? "Demande personnalisée" : reco.formule.nom,
        Permis: a.permis, Code: a.code, Expérience: a.experience, Niveau: a.niveau,
        "Ville de résidence": a.ville, "Période de congés": a.periode || "Flexible", "Deux semaines disponibles": a.deuxSemaines,
        Hébergement: a.hebergement, Transport: a.transport, Budget: a.budget || "Non précisé",
        Nom: String(fd.get("nom")), Email: String(fd.get("email")), Téléphone: String(fd.get("tel")),
        "Accepte la brochure": fd.get("brochure") === "on", Message: String(fd.get("message") ?? ""),
      });
      setStatus(r === "sent" ? "sent" : "mailto");
    } catch {
      setStatus("error");
    }
  }

  const months = useMemo(() => {
    const out: string[] = []; const d = new Date();
    for (let i = 1; i < 13; i++) out.push(new Date(d.getFullYear(), d.getMonth() + i, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" }));
    return out;
  }, []);

  const steps = ["Votre projet", "Votre séjour", "Vos coordonnées"];

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div className="rounded-2xl bg-white p-5 text-carbone shadow-sm md:p-10">
        <ol className="mb-8 flex gap-2 text-sm font-semibold" aria-label="Étapes">
          {steps.map((s, i) => (
            <li key={s} aria-current={step === i ? "step" : undefined} className={`flex-1 border-t-4 pt-2 ${step >= i ? "border-foret text-foret" : "border-sable-dark text-gris"}`}>{s}</li>
          ))}
        </ol>

        {status === "sent" ? (
          <div role="status">
            <h3 className="font-display text-4xl font-semibold">Demande envoyée</h3>
            <p className="measure mt-3 text-carbone/80">Vous recevez un e-mail de confirmation. Nous vous rappelons pour préciser votre projet, puis vous recevez votre devis détaillé.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="p" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} className="space-y-7">
                <fieldset><legend className="mb-3 text-lg font-semibold">Quel permis visez-vous&nbsp;?</legend><Choice name="permis" value={a.permis} onChange={set("permis")} options={Q.permis} /></fieldset>
                <fieldset><legend className="mb-3 text-lg font-semibold">Le code moto (ETM)</legend><Choice name="code" value={a.code} onChange={set("code")} options={Q.code} /></fieldset>
                <fieldset><legend className="mb-3 text-lg font-semibold">Votre expérience</legend><Choice name="experience" value={a.experience} onChange={set("experience")} options={Q.experience} /></fieldset>
                <fieldset><legend className="mb-3 text-lg font-semibold">Votre niveau actuel</legend><Choice name="niveau" value={a.niveau} onChange={set("niveau")} options={Q.niveau} /></fieldset>
                <button type="button" className="btn btn-rouge" onClick={() => setStep(1)}>Continuer</button>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="s" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} className="space-y-7">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rt-field"><label htmlFor="rt-ville">Ville de résidence</label><input id="rt-ville" value={a.ville} onChange={(e) => set("ville")(e.target.value)} placeholder="Paris, Lyon, Lille…" autoComplete="address-level2" /></div>
                  <div className="rt-field">
                    <label htmlFor="rt-periode">Période de congés envisagée</label>
                    <select id="rt-periode" value={a.periode} onChange={(e) => set("periode")(e.target.value)}>
                      <option value="">Je suis flexible</option>
                      {months.map((m) => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                <fieldset><legend className="mb-3 text-lg font-semibold">Pouvez-vous vous libérer deux semaines&nbsp;?</legend><Choice name="deux" value={a.deuxSemaines} onChange={set("deuxSemaines")} options={Q.deuxSemaines} /></fieldset>
                <fieldset><legend className="mb-3 text-lg font-semibold">Hébergement</legend><Choice name="heb" value={a.hebergement} onChange={set("hebergement")} options={Q.hebergement} /></fieldset>
                <fieldset><legend className="mb-3 text-lg font-semibold">Venir au Havre</legend><Choice name="transport" value={a.transport} onChange={set("transport")} options={Q.transport} /></fieldset>
                <div className="rt-field max-w-sm">
                  <label htmlFor="rt-budget">Budget global envisagé</label>
                  <select id="rt-budget" value={a.budget} onChange={(e) => set("budget")(e.target.value)}>
                    <option value="">Je préfère ne pas le préciser</option>
                    <option>Moins de 1 500 €</option><option>1 500 à 2 500 €</option><option>2 500 à 3 500 €</option><option>Plus de 3 500 €</option>
                  </select>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button type="button" className="btn btn-ghost" onClick={() => setStep(0)}>Retour</button>
                  <button type="button" className="btn btn-rouge" onClick={() => setStep(2)}>Continuer</button>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.form key="c" onSubmit={submit} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} className="grid gap-5 md:grid-cols-2">
                <div className="rt-field"><label htmlFor="rt-nom">Nom et prénom</label><input id="rt-nom" name="nom" required autoComplete="name" /></div>
                <div className="rt-field"><label htmlFor="rt-tel">Téléphone</label><input id="rt-tel" name="tel" type="tel" autoComplete="tel" /></div>
                <div className="rt-field md:col-span-2"><label htmlFor="rt-email">E-mail</label><input id="rt-email" name="email" type="email" required autoComplete="email" /></div>
                <div className="rt-field md:col-span-2"><label htmlFor="rt-msg">Une précision ? (facultatif)</label><textarea id="rt-msg" name="message" rows={3} /></div>
                <input type="text" name="site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <label className="flex items-start gap-3 md:col-span-2"><input type="checkbox" name="brochure" className="mt-1.5 h-4 w-4 accent-[#1e3a2f] h-5 w-5" /> Recevoir aussi la brochure et l'annonce des prochaines sessions</label>
                <label className="flex items-start gap-3 text-sm text-gris md:col-span-2">
                  <input type="checkbox" required className="mt-1 h-4 w-4 accent-[#1e3a2f] h-5 w-5" />
                  J'accepte qu'Indiana Auto-Moto utilise ces informations pour répondre à ma demande. Elles ne sont ni revendues ni cédées.
                </label>
                <div className="flex flex-wrap gap-3 md:col-span-2">
                  <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>Retour</button>
                  <button className="btn btn-rouge" disabled={status === "sending"}>{status === "sending" ? "Envoi en cours…" : "Recevoir mon devis personnalisé"}</button>
                </div>
                {status === "mailto" && <p className="text-sm text-gris md:col-span-2" role="status">Votre messagerie s'est ouverte avec la demande pré-remplie : il ne reste qu'à l'envoyer.</p>}
                {status === "error" && <p className="text-sm text-rouge md:col-span-2" role="alert">L'envoi n'a pas abouti. Réessayez ou appelez le 02 35 41 27 06.</p>}
              </motion.form>
            )}
          </AnimatePresence>
        )}
      </div>

      <aside className="h-fit rounded-2xl bg-carbone p-6 text-sable md:p-8 lg:sticky lg:top-24" aria-live="polite">
        <p className="text-sable/70">Notre proposition</p>
        {reco.perso ? (
          <>
            <h3 className="mt-1 font-display text-3xl font-semibold text-white">Un devis sur mesure</h3>
            <ul className="mt-4 space-y-2 text-sable/85">{reco.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
          </>
        ) : (
          <>
            <h3 className="mt-1 font-display text-3xl font-semibold text-white">{reco.formule.nom}</h3>
            <p className="mt-5 text-sm text-sable/70">Votre devis détaillera :</p>
            <ul className="mt-2 divide-y divide-white/10 text-[.97rem]">
              <li className="flex justify-between gap-4 py-2.5"><span>{a.code === "obtenu" ? "Formation A2" : "Formation A2 et code"}</span><motion.span key={reco.formule.prix} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="font-semibold text-white">{euro(reco.formule.prix)}</motion.span></li>
              <li className="flex justify-between gap-4 py-2.5"><span>Frais d'organisation</span><span className="text-sable/75">sur devis</span></li>
              {a.hebergement !== "aucun" && <li className="flex justify-between gap-4 py-2.5"><span>Hébergement, 13 nuits</span><span className="text-sable/75">sur devis</span></li>}
            </ul>
          </>
        )}
        {reco.warn && <p className="mt-4 rounded-md bg-sunset/15 p-3 text-sm">{reco.warn}</p>}
        <p className="mt-6 text-xs text-sable/60">Sans engagement. La présentation à l'examen dépend des prérequis, de votre niveau et des places attribuées : l'obtention du permis n'est jamais garantie.</p>
      </aside>
    </div>
  );
}

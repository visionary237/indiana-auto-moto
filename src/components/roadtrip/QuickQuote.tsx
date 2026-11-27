"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { euro } from "@/lib/content";
import { journey } from "@/lib/journey";
import { sendLead } from "@/lib/leads";
import { rev } from "@/lib/sound";
import { StampBook } from "./Journey";

const PERMIS = [["a2", "Permis A2"], ["a1", "Permis A1"], ["a", "Passerelle A"], ["nsp", "Je ne sais pas"]] as const;
const CODE = [["obtenu", "Code moto obtenu"], ["a-preparer", "À préparer"]] as const;
const LOGEMENT = [["avec", "Avec logement"], ["sans", "Sans logement"]] as const;

function Chips<T extends string>({ name, value, set, options }: { name: string; value: T; set: (v: T) => void; options: readonly (readonly [T, string])[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([v, l]) => (
        <label key={v} className={`inline-flex min-h-[44px] cursor-pointer items-center rounded-full border-2 px-4 text-[.98rem] font-medium transition-colors ${value === v ? "border-carbone bg-carbone text-white" : "border-sable-dark bg-white hover:border-carbone"}`}>
          <input type="radio" className="sr-only" name={name} checked={value === v} onChange={() => set(v)} />{l}
        </label>
      ))}
    </div>
  );
}

/**
 * Devis en un écran (le minimum pour rappeler), puis précisions facultatives après l'envoi.
 * L'envoi complète le carnet de route.
 */
export function QuickQuote({ prix }: { prix: { formation: number; code: number } }) {
  const [permis, setPermis] = useState<(typeof PERMIS)[number][0]>("a2");
  const [code, setCode] = useState<(typeof CODE)[number][0]>("obtenu");
  const [logement, setLogement] = useState<(typeof LOGEMENT)[number][0]>("avec");
  const [step, setStep] = useState<"form" | "sent" | "refined">("form");
  const [status, setStatus] = useState<"idle" | "sending" | "mailto" | "error">("idle");
  const [contact, setContact] = useState({ prenom: "", email: "" });

  const months = (() => { const d = new Date(); return Array.from({ length: 10 }, (_, i) => new Date(d.getFullYear(), d.getMonth() + i + 1, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })); })();
  const fixe = prix.formation + (code === "a-preparer" ? prix.code : 0);
  const surMesure = permis !== "a2";

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("site")) return;
    setStatus("sending");
    const c = { prenom: String(fd.get("prenom")), email: String(fd.get("email")) };
    setContact(c);
    try {
      const r = await sendLead("Stage moto Normandie : demande de devis", {
        "Étape CRM": surMesure ? "Demande de renseignements" : "Candidat qualifié",
        Source: "stage-moto-normandie",
        Permis: permis, Code: code, Logement: logement, Période: String(fd.get("periode")) || "Flexible",
        Prénom: c.prenom, Email: c.email, Téléphone: String(fd.get("tel") ?? ""),
        "Kilomètres parcourus sur la page": journey.get().km, "Tampons obtenus": journey.get().stamps,
      });
      if (r === "mailto") { setStatus("mailto"); return; }
      setStatus("idle"); setStep("sent"); journey.complete(); rev(1.4);
    } catch { setStatus("error"); }
  }

  async function refine(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await sendLead("Stage moto Normandie : précisions", { Email: contact.email, Ville: String(fd.get("ville")), Expérience: String(fd.get("exp")), Transport: String(fd.get("transport")), Budget: String(fd.get("budget")), Message: String(fd.get("msg") ?? "") }).catch(() => {});
    setStep("refined");
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="rounded-[28px] bg-white p-5 shadow-sm md:p-10">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.form key="f" onSubmit={submit} exit={{ opacity: 0, y: -10 }} className="space-y-7">
              <fieldset><legend className="mb-3 text-lg font-semibold">Votre permis</legend><Chips name="permis" value={permis} set={setPermis} options={PERMIS} /></fieldset>
              <fieldset><legend className="mb-3 text-lg font-semibold">Le code moto</legend><Chips name="code" value={code} set={setCode} options={CODE} /></fieldset>
              <fieldset><legend className="mb-3 text-lg font-semibold">Le logement</legend><Chips name="logement" value={logement} set={setLogement} options={LOGEMENT} /></fieldset>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rt-field"><label htmlFor="q-periode">Quand partir ?</label>
                  <select id="q-periode" name="periode" defaultValue=""><option value="">Je suis flexible</option>{months.map((m) => <option key={m}>{m}</option>)}</select>
                </div>
                <div className="rt-field"><label htmlFor="q-prenom">Prénom</label><input id="q-prenom" name="prenom" required autoComplete="given-name" /></div>
                <div className="rt-field"><label htmlFor="q-email">E-mail</label><input id="q-email" name="email" type="email" required autoComplete="email" /></div>
                <div className="rt-field"><label htmlFor="q-tel">Téléphone <span className="font-normal text-gris">(pour vous rappeler)</span></label><input id="q-tel" name="tel" type="tel" autoComplete="tel" /></div>
              </div>
              <input type="text" name="site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <label className="flex items-start gap-3 text-sm text-carbone/70">
                <input type="checkbox" required className="mt-0.5 accent-[#1e3a2f]" />
                J'accepte qu'Indiana Auto-Moto utilise ces informations pour me répondre. Elles ne sont ni revendues ni cédées.
              </label>
              <button className="btn btn-rouge w-full sm:w-auto" data-rev-strong disabled={status === "sending"}>{status === "sending" ? "Envoi…" : "Recevoir mon devis personnalisé"}</button>
              {status === "mailto" && <p className="text-sm text-gris" role="status">Votre messagerie s'est ouverte avec la demande pré-remplie : il ne reste qu'à l'envoyer.</p>}
              {status === "error" && <p className="text-sm text-rouge" role="alert">L'envoi n'a pas abouti. Réessayez ou appelez le 02 35 41 27 06.</p>}
            </motion.form>
          )}
          {step !== "form" && (
            <motion.div key="s" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} role="status">
              <motion.div initial={{ scale: 2.4, rotate: -25, opacity: 0 }} animate={{ scale: 1, rotate: -8, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 }}
                className="inline-grid h-28 w-28 place-items-center rounded-full border-4 border-sunset text-center font-display text-sm font-bold uppercase leading-tight text-sunset">
                Destination<br />Le Havre
              </motion.div>
              <h3 className="mt-6 text-3xl">Carnet complet, {contact.prenom || "c'est parti"}.</h3>
              <p className="mt-2 max-w-lg text-carbone/75">Votre demande est partie. Nous vous rappelons pour valider les prérequis, puis vous recevez votre devis détaillé, ligne par ligne.</p>
              <div className="mt-5"><StampBook /></div>
              {step === "sent" ? (
                <details className="mt-8 rounded-2xl bg-marquage p-5">
                  <summary className="cursor-pointer font-semibold">Gagner du temps : préciser votre projet (facultatif)</summary>
                  <form onSubmit={refine} className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rt-field"><label htmlFor="r-ville">Ville de départ</label><input id="r-ville" name="ville" placeholder="Paris, Lille…" /></div>
                    <div className="rt-field"><label htmlFor="r-exp">Expérience</label><select id="r-exp" name="exp"><option>Jamais roulé</option><option>Scooter ou 125</option><option>Déjà roulé à moto</option><option>Déjà passé l'examen</option></select></div>
                    <div className="rt-field"><label htmlFor="r-tr">Venir au Havre</label><select id="r-tr" name="transport"><option>Train</option><option>Voiture</option><option>Besoin d'aide</option></select></div>
                    <div className="rt-field"><label htmlFor="r-bud">Budget global</label><select id="r-bud" name="budget"><option>Non précisé</option><option>Moins de 1 500 €</option><option>1 500 à 2 500 €</option><option>Plus de 2 500 €</option></select></div>
                    <div className="rt-field sm:col-span-2"><label htmlFor="r-msg">Un mot pour nous ?</label><textarea id="r-msg" name="msg" rows={2} /></div>
                    <button className="btn btn-ghost sm:col-span-2 sm:justify-self-start" data-silent>Envoyer ces précisions</button>
                  </form>
                </details>
              ) : <p className="mt-6 font-semibold text-foret">Merci, c'est noté.</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <aside className="h-fit rounded-[28px] bg-carbone p-6 text-white md:p-8 lg:sticky lg:top-32" aria-live="polite">
        <p className="text-sm text-white/60">Votre itinéraire</p>
        <p className="mt-1 font-display text-3xl font-semibold">{surMesure ? "Formule sur mesure" : "Stage A2, deux semaines"}</p>
        <ul className="mt-5 divide-y divide-white/10 text-[.97rem]">
          <li className="flex justify-between gap-4 py-3"><span>{code === "a-preparer" ? "Formation A2 et code" : "Formation A2"}</span><span className="font-semibold">{surMesure ? "sur devis" : euro(fixe)}</span></li>
          <li className="flex justify-between gap-4 py-3"><span>Organisation du stage</span><span className="text-white/65">sur devis</span></li>
          {logement === "avec" && <li className="flex justify-between gap-4 py-3"><span>Logement, 13 nuits</span><span className="text-white/65">sur devis</span></li>}
          <li className="flex justify-between gap-4 py-3 text-white/60"><span>Transport, repas, sorties</span><span>à votre charge</span></li>
        </ul>
        <p className="mt-5 text-xs text-white/55">Gratuit, sans engagement. La présentation à l'examen dépend des prérequis, de votre niveau et des places attribuées : le permis n'est jamais garanti.</p>
      </aside>
    </div>
  );
}

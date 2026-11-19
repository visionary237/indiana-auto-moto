"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { packs, stages } from "@/lib/content";
import { sendLead } from "@/lib/leads";

const options = [...packs, ...stages];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const [formation, setFormation] = useState("");

  useEffect(() => {
    const f = new URLSearchParams(window.location.search).get("formation");
    if (f) setFormation(f);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("site")) return; // pot de miel anti-spam
    setStatus("sending");
    try {
      const r = await sendLead("Demande d'inscription", {
        Nom: String(fd.get("nom")),
        Téléphone: String(fd.get("tel")),
        Email: String(fd.get("email")),
        Formation: String(fd.get("formation")),
        "Code obtenu": String(fd.get("code")),
        "Financement CPF envisagé": fd.get("cpf") === "on",
        Message: String(fd.get("message") ?? ""),
      });
      setStatus(r);
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-md bg-white p-8" role="status">
          <h3 className="text-3xl">Demande envoyée</h3>
          <p className="mt-2 text-asphalt/75">L'accueil vous rappelle aux heures d'ouverture pour fixer votre évaluation de départ.</p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} className="grid gap-5 rounded-md bg-white p-6 md:grid-cols-2 md:p-8">
          <div className="field"><label htmlFor="nom">Nom et prénom</label><input id="nom" name="nom" required autoComplete="name" /></div>
          <div className="field"><label htmlFor="tel">Téléphone</label><input id="tel" name="tel" type="tel" required autoComplete="tel" /></div>
          <div className="field md:col-span-2"><label htmlFor="email">E-mail</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
          <div className="field">
            <label htmlFor="formation">Formation souhaitée</label>
            <select id="formation" name="formation" value={formation} onChange={(e) => setFormation(e.target.value)} required>
              <option value="">Choisir…</option>
              {options.map((o) => <option key={o.slug} value={o.slug}>{o.name}</option>)}
              <option value="driving-escape">Indiana Driving Escape (séjour)</option>
              <option value="autre">Je ne sais pas encore</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="code">Avez-vous le code ?</label>
            <select id="code" name="code" defaultValue="non">
              <option value="non">Pas encore</option>
              <option value="oui">Oui, je l'ai</option>
              <option value="en-cours">En cours de révision</option>
            </select>
          </div>
          <div className="field md:col-span-2"><label htmlFor="message">Votre message (facultatif)</label><textarea id="message" name="message" rows={4} placeholder="Vos disponibilités, une date d'examen visée, une question…" /></div>
          <input type="text" name="site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <label className="flex items-start gap-3 md:col-span-2"><input type="checkbox" name="cpf" className="mt-1.5 h-4 w-4 accent-rouge" /> Je souhaite financer ma formation avec mon CPF</label>
          <label className="flex items-start gap-3 text-sm text-gris md:col-span-2">
            <input type="checkbox" required className="mt-1 h-4 w-4 accent-rouge" />
            J'accepte que mes coordonnées soient utilisées par Indiana Auto-Moto pour répondre à ma demande. Elles ne sont ni revendues ni utilisées à d'autres fins.
          </label>
          <div className="md:col-span-2">
            <button className="btn btn-rouge" disabled={status === "sending"}>{status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}</button>
            {status === "mailto" && <p className="mt-3 text-sm text-gris" role="status">Votre messagerie s'est ouverte avec la demande pré-remplie : il ne reste qu'à l'envoyer.</p>}
            {status === "error" && <p className="mt-3 text-sm text-rouge" role="alert">L'envoi n'a pas abouti. Réessayez ou appelez le 02 35 41 27 06.</p>}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

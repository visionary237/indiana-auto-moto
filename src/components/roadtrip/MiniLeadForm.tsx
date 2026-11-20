"use client";

import { useState, type FormEvent } from "react";
import { sendLead } from "@/lib/leads";

/** Formulaire court : alerte d'ouverture des sessions, ou candidature partenaire. */
export function MiniLeadForm({ kind, stage, cta, fields, done, tone = "dark" }: {
  kind: string; stage: string; cta: string; done: string; tone?: "dark" | "light";
  fields: { name: string; label: string; type?: string; required?: boolean; placeholder?: string }[];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("site")) return;
    setStatus("sending");
    try {
      const data: Record<string, string> = { "Étape CRM": stage, Source: "stage-moto-normandie" };
      fields.forEach((f) => (data[f.label] = String(fd.get(f.name) ?? "")));
      const r = await sendLead(kind, data);
      setStatus(r === "sent" ? "sent" : "mailto");
    } catch {
      setStatus("error");
    }
  }
  if (status === "sent") return <p role="status" className="font-display text-2xl font-semibold">{done}</p>;
  const id = kind.replace(/\W+/g, "-").toLowerCase();
  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:items-end">
      {fields.map((f) => (
        <div key={f.name} className="rt-field">
          <label htmlFor={`${id}-${f.name}`} className={tone === "dark" ? "text-sable" : ""}>{f.label}</label>
          <input id={`${id}-${f.name}`} name={f.name} type={f.type ?? "text"} required={f.required} placeholder={f.placeholder} />
        </div>
      ))}
      <input type="text" name="site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button className="btn btn-sunset" disabled={status === "sending"}>{status === "sending" ? "Envoi…" : cta}</button>
      {status === "mailto" && <p className="text-sm opacity-80 sm:col-span-full" role="status">Votre messagerie s'est ouverte : il ne reste qu'à envoyer le message.</p>}
      {status === "error" && <p className="text-sm text-rouge sm:col-span-full" role="alert">L'envoi n'a pas abouti. Réessayez dans un instant.</p>}
    </form>
  );
}

import { school } from "./content";

export type LeadPayload = Record<string, string | number | boolean | string[] | undefined>;

/**
 * Envoie un lead vers le webhook configuré (n8n, Make, CRM…).
 * Sans endpoint configuré, ouvre un e-mail pré-rempli vers l'école (repli sans backend).
 */
export async function sendLead(kind: string, data: LeadPayload): Promise<"sent" | "mailto"> {
  const endpoint = process.env.NEXT_PUBLIC_LEADS_ENDPOINT;
  const payload = { kind, ...data, page: typeof window !== "undefined" ? window.location.href : "", sentAt: new Date().toISOString() };
  if (endpoint) {
    const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return "sent";
  }
  const body = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== "" && v !== false)
    .map(([k, v]) => `${k} : ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");
  window.location.href = `mailto:${school.email}?subject=${encodeURIComponent(`[Site] ${kind}`)}&body=${encodeURIComponent(body)}`;
  return "mailto";
}

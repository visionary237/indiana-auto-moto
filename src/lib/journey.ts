/** État du « carnet de route » : kilomètres parcourus de Paris au Havre et tampons obtenus en lisant la page. */
export const TOTAL_KM = 197;
export const STAMPS = [
  { id: "depart", short: "75", label: "Départ", hint: "Paris dans le rétro" },
  { id: "aventure", short: "↗", label: "Aventure", hint: "Deux semaines face à la mer" },
  { id: "permis", short: "A2", label: "Permis", hint: "20 h avec un moniteur" },
  { id: "cle-en-main", short: "✓", label: "Clé en main", hint: "Tout est organisé" },
  { id: "decouverte", short: "◎", label: "Découverte", hint: "La côte d'Albâtre" },
  { id: "budget", short: "€", label: "Budget clair", hint: "Chaque ligne détaillée" },
  { id: "arrivee", short: "76", label: "Le Havre", hint: "Votre départ se prépare" },
] as const;
export type StampId = (typeof STAMPS)[number]["id"];

/** Le texte du bouton principal évolue avec le parcours. */
export const CTA_BY_STAGE = [
  "Prendre la route",
  "Je veux partir",
  "Je veux partir",
  "Préparer mon départ",
  "Préparer mon départ",
  "Recevoir mon devis personnalisé",
  "Recevoir mon devis personnalisé",
  "Recevoir mon devis personnalisé",
];

type State = { km: number; stamps: StampId[]; fresh: StampId | null; done: boolean };
let state: State = { km: 0, stamps: [], fresh: null, done: false };
const subs = new Set<() => void>();
const emit = () => subs.forEach((s) => s());

export const journey = {
  get: () => state,
  server: (): State => ({ km: 0, stamps: [], fresh: null, done: false }),
  subscribe: (s: () => void) => { subs.add(s); return () => { subs.delete(s); }; },
  setKm: (km: number) => { const k = Math.round(Math.min(TOTAL_KM, Math.max(0, km))); if (k !== state.km) { state = { ...state, km: k }; emit(); } },
  stamp: (id: StampId) => {
    if (state.stamps.includes(id)) return;
    state = { ...state, stamps: [...state.stamps, id], fresh: id }; emit();
    setTimeout(() => { if (state.fresh === id) { state = { ...state, fresh: null }; emit(); } }, 2600);
  },
  complete: () => { journey.stamp("arrivee"); state = { ...state, done: true, km: TOTAL_KM }; emit(); },
};

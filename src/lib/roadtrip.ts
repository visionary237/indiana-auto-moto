/**
 * Indiana Road Trip : données administrables.
 * Les fichiers JSON de /content/roadtrip sont modifiables depuis /admin (Decap CMS) ou directement dans le dépôt.
 */
import sessionsData from "../../content/roadtrip/sessions.json";
import hebergementsData from "../../content/roadtrip/hebergements.json";
import partenairesData from "../../content/roadtrip/partenaires.json";
import programmeData from "../../content/roadtrip/programme.json";
import formulesData from "../../content/roadtrip/formules.json";
import destinationsData from "../../content/roadtrip/destinations.json";
import { asset } from "./asset";

export const ROADTRIP_PATH = "/stage-moto-normandie/";

export type SessionStatut = "en-preparation" | "ouverte" | "liste-attente" | "complet";
export type Session = {
  id: string;
  debut: string; // AAAA-MM-JJ
  fin: string;
  places_total?: number;
  places_restantes?: number;
  prix_a_partir?: number;
  hebergement_id?: string;
  prerequis?: string[];
  date_limite?: string;
  statut: SessionStatut;
  examen_info?: string;
};

export type Hebergement = {
  id: string;
  nom: string;
  valide: boolean;
  photos: string[];
  type_chambre: string;
  equipements: string[];
  localisation: string;
  distance_ecole: string;
  conditions: string;
  inclus: string[];
  non_inclus: string[];
  options: string[];
};

export type Partenaire = {
  id: string;
  nom: string;
  categorie: string;
  photos: string[];
  description: string;
  ville: string;
  lat?: number;
  lng?: number;
  horaires?: string;
  site?: string;
  avantage?: string;
  avantage_confirme: boolean;
  conditions?: string;
};

export type Jour = { jour: number; jour_semaine: string; titre: string; formation: string; decouverte: string; type: string[] };
export type Regle = "toujours" | "si-code-a-preparer" | "si-hebergement" | "si-besoin" | "a-confirmer" | "a-votre-charge";
export type Composante = { id: string; libelle: string; detail: string; prix: number | null; unite?: string; regle: Regle };
export type Destination = { id: string; nom: string; lat: number; lng: number; distance: string; image: string | null; texte: string };
export type Lieu = { nom: string; categorie: string; lat: number; lng: number; incontournable?: boolean };

export const sessions = (sessionsData.sessions as Session[]).filter((s) => s.statut !== undefined);
export const hebergements = (hebergementsData.hebergements as Hebergement[]).filter((h) => h.valide).map((h) => ({ ...h, photos: h.photos.map(asset) }));
export const partenaires = (partenairesData.partenaires as Partenaire[]).map((p) => ({ ...p, photos: p.photos.map(asset) }));
export const programme = programmeData.jours as Jour[];
export const composantes = formulesData.composantes as Composante[];
export const heureSup = formulesData.heure_supplementaire;
export const MISE_A_JOUR = formulesData.mise_a_jour;
export const prixFormationA2 = composantes.find((c) => c.id === "formation")!.prix as number;
export const prixCode = composantes.find((c) => c.id === "code")!.prix as number;
export const destinations = (destinationsData.destinations as Destination[]).map((d) => ({ ...d, image: d.image ? asset(d.image) : null }));
export const lieux = destinationsData.lieux as Lieu[];


export const MAP_FILTERS = [
  { id: "incontournable", label: "Incontournables" },
  { id: "plage", label: "Plages" },
  { id: "patrimoine", label: "Patrimoine" },
  { id: "balade", label: "Balades" },
  { id: "activite", label: "Activités" },
  { id: "restaurant", label: "Restaurants" },
  { id: "hebergement", label: "Hébergements" },
  { id: "partenaire", label: "Partenaires" },
] as const;

/** Points de la carte : lieux publics + partenaires et hébergements validés. */
export function mapPoints() {
  const pts: (Lieu & { partenaire?: boolean })[] = [...lieux];
  partenaires.forEach((p) => {
    if (p.lat && p.lng) pts.push({ nom: p.nom, categorie: p.categorie === "hebergement" ? "hebergement" : p.categorie === "restaurant" ? "restaurant" : "activite", lat: p.lat, lng: p.lng, partenaire: true });
  });
  return pts;
}

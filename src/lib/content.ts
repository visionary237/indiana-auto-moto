/**
 * Contenu factuel d'Indiana Auto-Moto.
 * Source : audit du site https://www.indiana-auto-ecole.fr/ réalisé le 19/11/2026.
 * Tout élément marqué `aValider: true` doit être confirmé par l'établissement avant mise en ligne.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.indiana-auto-ecole.fr";

export const school = {
  name: "Indiana Auto-Moto",
  tagline: "L'école des motards",
  legalName: "INDIANA SARL",
  capital: "40 000 €",
  rcs: "481 155 801 R.C.S. Le Havre",
  tva: "FR 20 481 155 801",
  publicationDirector: "Mme Sandrine Kociszewski",
  agrement: "E0207607070",
  address: { street: "108 rue Jean-Jacques Rousseau", postalCode: "76600", city: "Le Havre", region: "Normandie" },
  geo: { lat: 49.4938, lng: 0.1079 }, // à vérifier sur Google Business Profile
  phone: "02 35 41 27 06",
  phoneHref: "tel:+33235412706",
  fax: "02 35 43 55 05",
  email: "indiana-autoecole@orange.fr",
  hours: {
    accueil: [
      { days: "Lundi", slots: "14h – 19h" },
      { days: "Mardi au vendredi", slots: "10h – 12h et 14h – 19h" },
      { days: "Samedi", slots: "10h – 15h" },
    ],
    conduite: [
      { days: "Lundi au vendredi", slots: "8h – 20h" },
      { days: "Samedi", slots: "8h – 16h" },
    ],
    closed: "Fermé le dimanche et les jours fériés",
  },
  recognitions: [
    { name: "Qualiopi", detail: "Certification qualité des organismes de formation" },
    { name: "Datadock", detail: "Référencement qualité de la formation professionnelle" },
    { name: "AFDM", detail: "Reconnue par l'Association pour la formation des motards" },
    { name: "Assurance Mutuelle des Motards", detail: "Reconnue par la Mutuelle des Motards" },
    { name: "REMC", detail: "Programme national de formation, complété par une vérification finale théorique et pratique" },
  ],
  network:
    "Indiana fait partie d'un réseau où chaque école conserve sa propre identité : ce n'est pas un réseau de franchisés. Il réunit des écoles qui partagent la volonté d'enseigner correctement la conduite.",
  referral: "Parrainez un élève et recevez 1 heure de conduite offerte.",
  cpf:
    "Inscription possible avec votre CPF en auto, moto et formation accélérée, sous réserve d'éligibilité professionnelle dans le cadre d'un premier permis.",
};

/** Argument principal demandé par le client. À confirmer : le site actuel cite 3 pistes (Gonfreville-l'Orcher, Champ de Foire, Stade Océane). */
export const piste = {
  aValider: true,
  headline: "Une piste moto privée pour apprendre le plateau",
  body:
    "Le plateau, c'est là que tout se joue : maniabilité à allure lente, slalom, freinage, évitement. Sur une piste réservée, vous répétez les exercices autant qu'il le faut, sans attendre qu'un parking se libère ni partager l'espace avec le public.",
  facts: [
    { value: "6", label: "motos maximum par séance sur piste" },
    { value: "5 à 10 min", label: "de l'école aux lieux de formation" },
    { value: "MT-03", label: "Yamaha récente dans la flotte moto" },
  ],
  existingTracks: [
    { name: "ZI portuaire – Centre routier", place: "76700 Gonfreville-l'Orcher", time: "≈ 10 min" },
    { name: "Champ de Foire", place: "Rue Philippe Le Bon, Le Havre", time: "≈ 5 min" },
    { name: "Stade Océane", place: "Bd de Leningrad, Le Havre", time: "≈ 10 min" },
  ],
};

export type Pack = {
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  hours: string;
  includes: string[];
  note?: string;
  category: "auto" | "moto" | "code" | "stage";
  minAge?: string;
};

const BASE = ["Frais de dossier (dont aide administrative ANTS)", "Avec ou sans code inclus", "Livret d'apprentissage"];

export const packs: Pack[] = [
  { slug: "auto", name: "Permis B – boîte manuelle", price: 1190, hours: "20 h de conduite", includes: [...BASE, "1 évaluation", "1 accompagnement à l'examen"], category: "auto", minAge: "Dès 15 ans (inscription), examen à 17 ans" },
  { slug: "auto-bva", name: "Permis B – boîte automatique", price: 790, hours: "13 h de conduite", includes: [...BASE, "1 évaluation", "1 accompagnement à l'examen"], category: "auto" },
  { slug: "auto-accelere", name: "Permis B accéléré", price: 1490, oldPrice: 1690, hours: "20 h de conduite", includes: [...BASE, "1 évaluation", "1 accompagnement à l'examen"], note: "Offre à durée limitée", category: "auto" },
  { slug: "auto-aac", name: "Conduite accompagnée (AAC)", price: 1490, hours: "20 h de conduite", includes: [...BASE, "1 évaluation", "1 accompagnement à l'examen", "1 rendez-vous préalable", "2 rendez-vous pédagogiques"], category: "auto", minAge: "Dès 15 ans" },
  { slug: "moto-a1", name: "Permis A1 – 125 cm³", price: 690, hours: "20 h de conduite", includes: [...BASE, "1 accompagnement examen plateau", "1 accompagnement examen circulation"], category: "moto", minAge: "Dès 16 ans" },
  { slug: "moto-a2", name: "Permis A2", price: 790, hours: "20 h de conduite", includes: [...BASE, "1 évaluation", "1 accompagnement examen plateau", "1 accompagnement examen circulation"], category: "moto", minAge: "Dès 18 ans" },
  { slug: "moto-a2-scooter", name: "Permis A2 Maxi Scooter", price: 790, hours: "20 h de conduite", includes: [...BASE, "1 évaluation", "1 accompagnement examen plateau", "1 accompagnement examen circulation"], note: "Formule proposée en exclusivité au Havre", category: "moto", minAge: "Dès 18 ans" },
  { slug: "code", name: "Forfait code", price: 390, hours: "Cours de code illimités", includes: ["Frais de dossier (dont aide administrative ANTS)", "Cours de code illimités en salle", "Préparation au code sur internet"], category: "code" },
];

export const stages: Pack[] = [
  { slug: "stage-moto-7h", name: "Formation 7 h – 125 cm³ / MP3 ou passerelle A2 → A", price: 290, hours: "7 h", includes: ["Conduite d'une 125 cm³ ou d'un trois-roues avec un permis B de plus de 2 ans", "Ou passage du permis A2 au permis A (2 ans d'A2 requis)"], category: "stage" },
  { slug: "stage-am", name: "Permis AM – scooter 50 cm³", price: 290, hours: "8 h", includes: ["Formation pratique au cyclomoteur", "Dès 14 ans"], category: "stage", minAge: "Dès 14 ans" },
  { slug: "stage-novice", name: "Stage conducteur novice", price: 120, hours: "7 h", includes: ["Entre 6 mois et 1 an de permis", "Réduit la période probatoire", "Récupérez vos 12 points plus rapidement"], category: "stage" },
  { slug: "bva-bm", name: "Passerelle boîte auto → manuelle", price: 390, hours: "7 h de conduite", includes: ["Pour les titulaires d'un permis B boîte automatique", "Levée de la restriction boîte automatique"], category: "stage" },
];

export const unitPrices = [
  { label: "Leçon de conduite (auto manuelle, automatique, moto)", price: 60 },
  { label: "Évaluation de départ", price: 55 },
  { label: "Pack 5 h auto", price: 250 },
  { label: "Forfait code cours illimités", price: 150 },
  { label: "Formation code internet", price: 40 },
  { label: "Frais de dossier", price: 150 },
  { label: "Aide administrative (ANTS, examen code ou CPF)", price: 30 },
  { label: "Accompagnement examen code ETG / ETM", price: 90 },
  { label: "Redevance examen code (prestataire privé)", price: 30 },
  { label: "Accompagnement examen conduite auto", price: 55 },
  { label: "Accompagnement examen conduite moto", price: 100 },
  { label: "Rendez-vous préalable AAC", price: 100 },
  { label: "Rendez-vous pédagogique AAC", price: 100 },
];

export const PRICES_DATE = "19 novembre 2026";

export const fleet = [
  { name: "Yamaha MT-03", kind: "Moto A2", note: "Dernière arrivée dans la flotte" },
  { name: "Simulateur de conduite", kind: "Auto", note: "Pour les premières heures de prise en main" },
  { name: "Prépacode", kind: "Code", note: "Entraînement en ligne suivi par l'école" },
];

/** Équipe : aucun nom ni portrait n'est publié sur le site actuel. À compléter avec l'établissement. */
export const team: { name: string; role: string; bio: string; photo?: string; placeholder?: boolean }[] = [
  { name: "Portrait à venir", role: "Enseignant·e de la conduite – auto", bio: "Diplôme (BEPECASER / Titre ECSR), années d'expérience et spécialités à compléter.", placeholder: true },
  { name: "Portrait à venir", role: "Enseignant·e de la conduite – moto", bio: "Mention deux-roues, années de pratique et parcours de motard à compléter.", placeholder: true },
  { name: "Portrait à venir", role: "Accueil et secrétariat pédagogique", bio: "Inscriptions, dossiers ANTS et CPF, planning des leçons.", placeholder: true },
];

/** Avis : n'afficher que des avis vérifiables (Google Business Profile, Avis Vérifiés…), avec accord. Vide par défaut. */
export const reviews: { author: string; date: string; rating: number; text: string; source: string; url?: string }[] = [];

export const documents = [
  { label: "Financer son permis (PDF)", href: "https://www.indiana-auto-ecole.fr/pub/financerpermis.pdf" },
  { label: "Livre d'or (PDF)", href: "https://www.indiana-auto-ecole.fr/pub/IndianaLivreDor.pdf" },
  { label: "Formulaire de réclamation (PDF)", href: "https://www.indiana-auto-ecole.fr/pub/reclamation.pdf" },
];

export const requiredDocs = {
  common: ["2 photos d'identité", "6 timbres", "Une pièce d'identité"],
  autoMinor: "Moins de 18 ans : attestation de recensement",
  autoMajor: "18 ans et plus : certificat de participation à la JDC (ex-JAPD)",
  moto: "Moto : votre permis de conduire si vous en avez un",
};

export const motoGear = [
  "Casque homologué",
  "Gants homologués CE",
  "Blouson ou veste à manches longues",
  "Pantalon ou combinaison",
  "Bottes ou chaussures montantes",
];

export const nav = [
  { href: "/permis-auto/", label: "Permis auto" },
  { href: "/permis-moto/", label: "Permis moto" },
  { href: "/formations-accelerees/", label: "Accéléré" },
  { href: "/stages/", label: "Stages" },
  { href: "/stage-moto-normandie/", label: "Stage moto & séjour" },
  { href: "/tarifs-financements/", label: "Tarifs" },
  { href: "/equipe/", label: "Équipe" },
  { href: "/faq/", label: "FAQ" },
];

export const euro = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

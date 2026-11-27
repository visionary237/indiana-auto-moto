import Image from "next/image";
import Link from "next/link";
import { CoastRoad3D } from "@/components/roadtrip/CoastRoad3D";
import { StackedReasons } from "@/components/roadtrip/StackedReasons";
import { SplitJourney } from "@/components/roadtrip/SplitJourney";
import { Timeline14 } from "@/components/roadtrip/Timeline14";
import { ExploreMap } from "@/components/roadtrip/ExploreMap";
import { Comparator } from "@/components/roadtrip/Comparator";
import { PriceBuilder } from "@/components/roadtrip/PriceBuilder";
import { QuickQuote } from "@/components/roadtrip/QuickQuote";
import { MiniLeadForm } from "@/components/roadtrip/MiniLeadForm";
import { LandingNav } from "@/components/roadtrip/LandingNav";
import { Proofs } from "@/components/roadtrip/Proofs";
import { Etape, JourneyCta, JourneyHud } from "@/components/roadtrip/Journey";
import { Accordion } from "@/components/Accordion";
import { Container, JsonLd } from "@/components/ui";
import { euro, school, SITE_URL } from "@/lib/content";
import { composantes, destinations, hebergements, mapPoints, MISE_A_JOUR, partenaires, prixCode, prixFormationA2, programme, ROADTRIP_PATH, sessions } from "@/lib/roadtrip";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { asset } from "@/lib/asset";

export const metadata = pageMeta({
  title: "Stage permis moto intensif en Normandie : deux semaines au Havre",
  description:
    "Stage intensif de permis moto A2 au Havre : deux semaines de formation avec moniteur, logement en option, la côte normande à découvrir, à 2 h 10 de Paris. Prix détaillé et devis personnalisé.",
  path: ROADTRIP_PATH,
});

const dateMaj = new Date(MISE_A_JOUR).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

/* Réponses autonomes : chacune se comprend sans le reste de la page (moteurs de réponse et assistants IA). */
const faq = [
  { q: "Peut-on passer son permis moto en deux semaines ?", a: `C'est possible, sans être garanti. La formation A2 compte au minimum 20 heures de conduite, ce qui tient sur deux semaines à raison d'environ deux heures par jour. La présentation aux épreuves en fin de stage dépend de trois conditions : avoir réussi le code moto (ETM) avant, avoir le niveau requis selon votre moniteur, et obtenir une place d'examen, attribuée par l'administration. Si l'examen ne peut pas avoir lieu pendant le stage, Indiana Auto-Moto vous présente à une date ultérieure.` },
  { q: "Combien coûte un stage de permis moto accéléré avec hébergement ?", a: `Le prix se compose de plusieurs éléments. La formation au permis A2 coûte ${euro(prixFormationA2)} TTC au tarif de l'école Indiana Auto-Moto. S'y ajoutent les frais d'organisation du stage et, si vous le choisissez, l'hébergement pour 13 nuits : ces deux montants figurent dans votre devis. La préparation au code moto coûte ${euro(prixCode)} si vous ne l'avez pas encore. Le transport, les repas et les loisirs restent à votre charge.` },
  { q: "Comment venir au Havre depuis Paris ?", a: "En train, des TER directs relient Paris Saint-Lazare à la gare du Havre en 2 h 10 environ. En voiture, comptez un peu plus de deux heures par l'autoroute A13. Sur place, l'école se trouve 108 rue Jean-Jacques Rousseau, au Havre." },
  { q: "Que comprend le stage moto en Normandie ?", a: "Le stage comprend la formation au permis A2 (20 heures de conduite, frais de dossier, livret, évaluation et accompagnement aux deux épreuves), un planning intensif sur deux semaines et le suivi par l'école. L'hébergement est proposé en option. Ne sont pas compris : le transport jusqu'au Havre, les repas, les sorties touristiques et les éventuelles heures de conduite supplémentaires (60 € l'heure)." },
  { q: "Dois-je avoir le code moto avant de venir ?", a: "C'est fortement recommandé. Le code moto (ETM) doit être réussi avant de passer les épreuves pratiques. Il se prépare en ligne et se passe dans un centre agréé, près de chez vous, avant le stage." },
  { q: "Faut-il venir avec son équipement ?", a: "Un équipement homologué est obligatoire dès la première leçon : casque, gants, blouson à manches longues, pantalon et chaussures montantes. Les possibilités de prêt sont précisées à l'ouverture des sessions." },
  { q: "Puis-je utiliser mon CPF ?", a: school.cpf },
];

const ETAPES = [
  { t: "Vous demandez un devis", d: "Une minute : votre permis, votre période, logement ou non." },
  { t: "On vous rappelle", d: "Un échange court pour vérifier les prérequis et votre niveau." },
  { t: "Vous recevez votre devis", d: "Chaque ligne détaillée : formation, organisation, logement." },
  { t: "Vous partez", d: "Dossier, code, équipement : on vous guide jusqu'au premier jour." },
];

/** Borne kilométrique en tête de chaque étape du voyage. */
function Borne({ km, lieu, light = false }: { km: number; lieu: string; light?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-3 text-sm font-medium ${light ? "text-white/80" : "text-carbone/60"}`}>
      <span className="grid h-11 w-11 place-items-center rounded-b-md rounded-t-full border-2 border-carbone bg-white font-display text-[13px] font-bold text-carbone">{km}</span>
      km : {lieu}
    </p>
  );
}

export default function StageMotoNormandie() {
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Stage intensif de permis moto A2 au Havre",
    description: metadata.description,
    url: `${SITE_URL}${ROADTRIP_PATH}`,
    inLanguage: "fr",
    educationalCredentialAwarded: "Permis de conduire de catégorie A2",
    provider: { "@type": "DrivingSchool", name: school.name, url: SITE_URL, telephone: "+33235412706", address: { "@type": "PostalAddress", streetAddress: school.address.street, postalCode: school.address.postalCode, addressLocality: school.address.city, addressCountry: "FR" } },
    dateModified: MISE_A_JOUR,
    hasCourseInstance: sessions.filter((s) => s.statut === "ouverte").map((s) => ({ "@type": "CourseInstance", courseMode: "onsite", startDate: s.debut, endDate: s.fin, location: { "@type": "Place", name: "Le Havre" } })),
  };

  return (
    <div className="bg-marquage pb-24 text-carbone lg:pb-0">
      <JsonLd data={jsonld} />
      <JsonLd data={faqJsonLd(faq)} />
      <JourneyHud />

      {/* KM 0 : la route en 3D, la promesse */}
      <Etape id="depart" stamp="depart" km={0} label="Départ" className="relative overflow-hidden bg-[#e88a55] text-white">
        <Image src={asset("/images/roadtrip/route-normandie-poster.jpg")} alt="" fill priority sizes="100vw" className="object-cover" />
        <CoastRoad3D />
        <div className="absolute inset-0 bg-gradient-to-t from-carbone via-carbone/70 to-carbone/0 md:bg-gradient-to-r md:from-carbone/80 md:via-carbone/30 md:to-transparent" />
        <Container className="relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-end pb-12 pt-20 md:justify-center md:pb-20">
          <Borne km={0} lieu="Paris, porte Maillot" light />
          <h1 className="mt-5 max-w-3xl text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.98]">Mettez Paris dans le rétro.</h1>
          <p className="mt-5 max-w-xl text-lg text-white/90 md:text-xl">
            Deux semaines au Havre pour passer votre permis moto A2 : un moniteur, la mer à deux pas, et tout organisé pour vous.
          </p>
          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {[["Durée", "2 semaines"], ["Depuis Paris", "2 h 10 en train"], ["Permis", "A2, dès 18 ans"], ["Logement", "En option"]].map(([k, v]) => (
              <div key={k}><dt className="text-sm text-white/65">{k}</dt><dd className="font-semibold">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#pourquoi" className="btn btn-sunset" data-rev-strong>Prendre la route</a>
            <a href="#devis" className="px-2 py-2 text-center font-medium text-white underline-offset-4 hover:underline" data-silent>Aller directement au devis</a>
          </div>
          <p className="mt-7 max-w-xl text-sm text-white/65">Examen visé en fin de stage selon votre niveau, les prérequis et les places attribuées. Le permis n'est jamais garanti.</p>
        </Container>
      </Etape>

      <LandingNav />

      {/* KM 40 : les bénéfices qui s'additionnent */}
      <Etape id="pourquoi" stamp="aventure" km={40} label="Pourquoi partir" className="py-16 md:py-24">
        <Container>
          <Borne km={40} lieu="la ville s'efface" />
          <h2 className="mt-5 max-w-3xl text-[clamp(2.2rem,5vw,3.8rem)]">Un stage qui s'additionne.</h2>
          <p className="mt-4 max-w-xl text-lg text-carbone/70">Faites défiler : chaque raison s'ajoute à la précédente.</p>
          <div className="mt-10"><StackedReasons /></div>
        </Container>
      </Etape>

      {/* KM 90 : comment ça se passe */}
      <Etape id="deroulement" km={90} label="Le stage" className="py-16 md:py-24">
        <Container>
          <Borne km={90} lieu="mi-chemin" />
          <h2 className="mt-5 max-w-3xl text-[clamp(2.2rem,5vw,3.8rem)]">De votre canapé au guidon, en quatre étapes.</h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e, i) => (
              <li key={e.t} className="rounded-[24px] bg-white p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-carbone font-semibold text-white">{i + 1}</span>
                <p className="mt-4 text-lg font-semibold">{e.t}</p>
                <p className="mt-1 text-carbone/70">{e.d}</p>
              </li>
            ))}
          </ol>
          <h3 className="mt-20 text-[clamp(1.7rem,3.4vw,2.6rem)]">Et sur place, vos quatorze jours</h3>
          <p className="mt-2 max-w-2xl text-carbone/70">Un programme type, ajusté après votre évaluation du premier jour.</p>
          <div className="mt-8"><Timeline14 jours={programme} /></div>
        </Container>
      </Etape>

      <SplitJourney />

      {/* KM 150 : la côte */}
      <Etape id="region" stamp="decouverte" km={150} label="La côte" className="bg-[#e8f0ef] py-16 md:py-24">
        <Container>
          <Borne km={150} lieu="premiers embruns" />
          <h2 className="mt-5 max-w-3xl text-[clamp(2.2rem,5vw,3.8rem)]">Votre terrain de jeu, entre deux leçons.</h2>
          <p className="mt-4 max-w-2xl text-lg text-carbone/70">Touchez une destination sur la carte. Les sorties sont libres et à votre charge ; pendant la formation, vous ne roulez qu'en leçon.</p>
          <div className="mt-10 [&_.rt-chip]:text-carbone"><ExploreMap destinations={destinations} lieux={mapPoints()} /></div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <div className="rounded-[24px] bg-white p-6 md:p-8">
              <h3 className="text-2xl">Où dormir&nbsp;?</h3>
              {hebergements.length === 0 ? (
                <p className="mt-3 text-carbone/75">Un logement vous est proposé en option, près de l'école. Les adresses partenaires sont en cours de sélection : seuls les lieux sous contrat seront présentés, avec leurs vraies photos. Le stage se réserve aussi sans logement.</p>
              ) : (
                <ul className="mt-3 space-y-2">{hebergements.map((h) => <li key={h.id}><strong>{h.nom}</strong>, {h.distance_ecole} de l'école. {h.type_chambre}.</li>)}</ul>
              )}
            </div>
            <div className="rounded-[24px] bg-white p-6 md:p-8">
              <h3 className="text-2xl">Venir depuis Paris</h3>
              <ul className="mt-3 space-y-2 text-carbone/80">
                <li><strong className="text-carbone">Train :</strong> TER directs depuis Saint-Lazare, environ 2 h 10.</li>
                <li><strong className="text-carbone">Voiture :</strong> un peu plus de deux heures par l'A13.</li>
                <li><strong className="text-carbone">L'école :</strong> {school.address.street}, {school.address.city}.</li>
              </ul>
              {partenaires.length === 0 && (
                <details className="mt-5">
                  <summary className="cursor-pointer text-sm font-semibold text-foret">Vous tenez un établissement en Normandie ? Rejoignez nos adresses</summary>
                  <div className="mt-4"><MiniLeadForm tone="light" kind="Stage moto Normandie : candidature partenaire" stage="Partenaire à contacter" cta="Proposer mon établissement" done="Merci, nous revenons vers vous." fields={[{ name: "etab", label: "Établissement", required: true }, { name: "email", label: "E-mail", type: "email", required: true }]} /></div>
                </details>
              )}
            </div>
          </div>
        </Container>
      </Etape>

      {/* KM 175 : le prix */}
      <Etape id="prix" stamp="budget" km={175} label="Prix" className="bg-sable py-16 md:py-24">
        <Container>
          <Borne km={175} lieu="le pont de Normandie en vue" />
          <h2 className="mt-5 max-w-3xl text-[clamp(2.2rem,5vw,3.8rem)]">Combien coûte le voyage&nbsp;?</h2>
          <p className="mt-4 max-w-2xl text-lg text-carbone/75">La formation a un prix fixe. L'organisation et le logement dépendent de vos choix : ils sont chiffrés dans votre devis, ligne par ligne.</p>
          <div className="mt-10"><PriceBuilder composantes={composantes} /></div>
          <p className="mt-4 text-sm text-carbone/60">Tarifs TTC de l'école au {dateMaj}. Le passage des épreuves pratiques du permis est gratuit. <Link href="/tarifs-financements/" className="underline underline-offset-2">Tous les tarifs</Link></p>
          <details id="comparer" className="mt-10 scroll-mt-28 rounded-[24px] bg-white/60 p-5 md:p-8">
            <summary className="cursor-pointer text-lg font-semibold">Comparer avec une moto-école près de chez vous</summary>
            <p className="mt-3 max-w-2xl text-carbone/75">Comparaison à périmètre égal : la formation seule, puis le temps et les trajets. Le calcul n'utilise que vos chiffres et le tarif de l'école.</p>
            <div className="mt-6"><Comparator formationIndiana={prixFormationA2} /></div>
          </details>
        </Container>
      </Etape>

      {/* Preuves et disponibilités */}
      <section className="py-16 md:py-24" aria-labelledby="confiance">
        <Container>
          <h2 id="confiance" className="max-w-3xl text-[clamp(2.2rem,5vw,3.8rem)]">Avec qui vous partez.</h2>
          <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Une école agréée", d: `Indiana Auto-Moto, au Havre. Agrément n° ${school.agrement}.` },
              { t: "Certifiée Qualiopi", d: "Éligible au CPF sous conditions." },
              { t: "Reconnue par les motards", d: "AFDM et Assurance Mutuelle des Motards." },
              { t: "Une méthode suivie", d: "Programme REMC et vérification avant l'examen." },
            ].map((x) => <div key={x.t}><h3 className="text-lg">{x.t}</h3><p className="mt-1 text-carbone/70">{x.d}</p></div>)}
          </div>
          <div className="mt-10"><Proofs /></div>
          <p className="mt-6 text-sm text-carbone/55">{school.legalName}, {school.address.street}, {school.address.postalCode} {school.address.city}. <a href={school.phoneHref} className="underline">{school.phone}</a>. Informations mises à jour le {dateMaj}.</p>

          <div className="mt-14 grid gap-8 rounded-[28px] bg-foret p-6 text-white md:p-10 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl md:text-3xl">Quand partir&nbsp;?</h3>
              {sessions.length === 0 ? (
                <p className="mt-3 text-white/85">Les premières sessions sont en préparation : aucune date n'est encore ouverte. Dites-nous quand vous aimeriez partir, nous vous prévenons dès qu'une session correspond.</p>
              ) : (
                <ul className="mt-3 space-y-2">{sessions.map((s) => <li key={s.id}>Du {new Date(s.debut).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} au {new Date(s.fin).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} : {{ ouverte: "inscriptions ouvertes", "liste-attente": "liste d'attente", complet: "complet", "en-preparation": "en préparation" }[s.statut]}{s.places_restantes !== undefined ? `, ${s.places_restantes} place(s)` : ""}</li>)}</ul>
              )}
            </div>
            <MiniLeadForm kind="Stage moto Normandie : alerte sessions" stage="Prospect" cta="Me prévenir" done="C'est noté, vous serez prévenu en priorité." fields={[{ name: "email", label: "E-mail", type: "email", required: true }, { name: "periode", label: "Période souhaitée", placeholder: "Ex. mai 2027" }]} />
          </div>
        </Container>
      </section>

      {/* KM 197 : destination */}
      <Etape id="devis" km={197} label="Mon devis" className="bg-sable py-16 md:py-24">
        <Container>
          <Borne km={197} lieu="Le Havre, vous y êtes" />
          <h2 className="mt-5 max-w-3xl text-[clamp(2.2rem,5vw,3.8rem)]">Dernier tampon, votre devis.</h2>
          <p className="mt-4 max-w-2xl text-lg text-carbone/75">Une minute, gratuit, sans engagement. On vous rappelle, puis vous recevez votre devis détaillé.</p>
          <div className="mt-10"><QuickQuote prix={{ formation: prixFormationA2, code: prixCode }} /></div>
        </Container>
      </Etape>

      <section id="faq" className="scroll-mt-28 py-16 md:py-24" aria-labelledby="faq-titre">
        <Container className="max-w-4xl">
          <h2 id="faq-titre" className="text-[clamp(2rem,4.5vw,3.2rem)]">Vos questions</h2>
          <div className="mt-8"><Accordion items={faq} /></div>
          <p className="mt-10 text-carbone/75">
            À lire aussi :{" "}
            <Link href="/permis-moto-accelere/" className="font-semibold underline underline-offset-4">le permis moto accéléré</Link>,{" "}
            <Link href="/guides/permis-moto-en-deux-semaines/" className="font-semibold underline underline-offset-4">le permis moto en deux semaines</Link>,{" "}
            <Link href="/guides/prix-stage-permis-moto-hebergement/" className="font-semibold underline underline-offset-4">le prix d'un stage avec hébergement</Link>,{" "}
            <Link href="/guides/permis-moto-depuis-paris/" className="font-semibold underline underline-offset-4">venir de Paris</Link>.
          </p>
          <div className="mt-12 flex justify-center"><JourneyCta className="btn btn-rouge" /></div>
        </Container>
      </section>
    </div>
  );
}

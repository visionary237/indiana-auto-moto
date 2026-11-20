import Image from "next/image";
import Link from "next/link";
import { VideoBackdrop } from "@/components/roadtrip/VideoBackdrop";
import { SplitJourney } from "@/components/roadtrip/SplitJourney";
import { Timeline14 } from "@/components/roadtrip/Timeline14";
import { ExploreMap } from "@/components/roadtrip/ExploreMap";
import { Comparator } from "@/components/roadtrip/Comparator";
import { PriceBuilder } from "@/components/roadtrip/PriceBuilder";
import { AdventureConfigurator } from "@/components/roadtrip/AdventureConfigurator";
import { MiniLeadForm } from "@/components/roadtrip/MiniLeadForm";
import { LandingNav } from "@/components/roadtrip/LandingNav";
import { Accordion } from "@/components/Accordion";
import { Container, JsonLd, Reviews } from "@/components/ui";
import { euro, school, SITE_URL } from "@/lib/content";
import { composantes, destinations, hebergements, mapPoints, MISE_A_JOUR, partenaires, prixCode, prixFormationA2, programme, ROADTRIP_PATH, sessions } from "@/lib/roadtrip";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { asset } from "@/lib/asset";

export const metadata = pageMeta({
  title: "Stage permis moto intensif en Normandie : deux semaines au Havre",
  description:
    "Stage intensif de permis moto A2 au Havre : deux semaines de formation avec moniteur, hébergement en option, à 2 h 10 de Paris en train. Prix détaillé et devis personnalisé.",
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
  { t: "Vous demandez un devis", d: "Deux minutes en ligne : votre permis visé, vos dates, vos besoins de logement." },
  { t: "On vous rappelle", d: "Un échange court pour vérifier les prérequis et votre niveau." },
  { t: "Vous recevez votre devis", d: "Chaque ligne détaillée : formation, organisation, hébergement." },
  { t: "Vous préparez le départ", d: "Dossier, code moto, équipement : on vous guide jusqu'au premier jour." },
];

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
    <div className="bg-marquage pb-20 text-carbone md:pb-0">
      <JsonLd data={jsonld} />
      <JsonLd data={faqJsonLd(faq)} />

      {/* 1. Premier écran : bénéfice, durée, lieu, un seul appel à l'action */}
      <section className="relative overflow-hidden bg-carbone text-white" aria-labelledby="titre">
        <VideoBackdrop src={asset("/videos/route-normandie.mp4")} poster={asset("/images/roadtrip/route-normandie-poster.jpg")} label="Un motard roule sur une route de campagne normande" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbone/95 via-carbone/55 to-carbone/25 md:bg-gradient-to-r" />
        <Container className="relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-end pb-12 pt-24 md:min-h-[82vh] md:justify-center md:pb-20">
          <h1 id="titre" className="max-w-3xl text-[clamp(2.4rem,6.4vw,5rem)]">Deux semaines au Havre pour passer votre permis moto.</h1>
          <p className="mt-5 max-w-xl text-lg text-white/85 md:text-xl">
            Un stage intensif A2 avec moniteur, à 2 h 10 de Paris en train. Vous vous formez, nous organisons le reste.
          </p>
          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {[["Durée", "2 semaines"], ["Lieu", "Le Havre"], ["Permis", "A2, dès 18 ans"], ["Logement", "En option"]].map(([k, v]) => (
              <div key={k}><dt className="text-sm text-white/60">{k}</dt><dd className="font-semibold">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#devis" className="btn btn-sunset">Recevoir mon devis personnalisé</a>
            <a href="#le-stage" className="px-2 py-2 text-center font-medium text-white/85 underline-offset-4 hover:underline">Comment ça marche</a>
          </div>
          <p className="mt-6 max-w-xl text-sm text-white/60">Présentation à l'examen en fin de stage selon votre niveau, les prérequis et les places attribuées. Le permis n'est jamais garanti.</p>
        </Container>
      </section>

      <LandingNav />

      {/* 2. Le stage : bénéfices et processus */}
      <section id="le-stage" className="scroll-mt-28 py-20 md:py-28">
        <Container>
          <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)]">Moins d'attente, moins d'allers-retours, un seul objectif.</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              { t: "Vous gagnez du temps", d: "Vos 20 heures de conduite sont regroupées sur deux semaines, au lieu de s'étaler sur des mois." },
              { t: "Tout est organisé", d: "Planning des leçons, logement si besoin, dossier d'inscription : vous n'avez qu'à venir." },
              { t: "Vous êtes accompagné", d: "Une école agréée, reconnue par les motards, et un moniteur qui adapte le rythme à vos progrès." },
            ].map((x) => (
              <div key={x.t}>
                <h3 className="text-2xl">{x.t}</h3>
                <p className="mt-2 text-carbone/70">{x.d}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-20 text-[clamp(1.6rem,3vw,2.2rem)]">Comment ça marche</h3>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e, i) => (
              <li key={e.t} className="rounded-2xl bg-white p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-sunset font-semibold text-carbone">{i + 1}</span>
                <p className="mt-4 text-lg font-semibold">{e.t}</p>
                <p className="mt-1 text-carbone/70">{e.d}</p>
              </li>
            ))}
          </ol>
          <a href="#devis" className="btn btn-rouge mt-10">Recevoir mon devis personnalisé</a>
        </Container>
      </section>

      {/* 3. Apprendre et découvrir */}
      <SplitJourney />

      {/* 4. Prix transparent + comparateur à périmètre égal */}
      <section id="prix" className="scroll-mt-28 bg-sable py-20 md:py-28">
        <Container>
          <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)]">Combien coûte le stage&nbsp;?</h2>
          <p className="mt-4 max-w-2xl text-lg text-carbone/75">
            Le prix de la formation est fixe. Les frais d'organisation et l'hébergement dépendent de vos choix : ils sont chiffrés dans votre devis, ligne par ligne.
          </p>
          <div className="mt-10"><PriceBuilder composantes={composantes} /></div>
          <p className="mt-4 text-sm text-carbone/60">Tarifs TTC de l'école au {dateMaj}. Le passage des épreuves pratiques du permis est gratuit. <Link href="/tarifs-financements/" className="underline underline-offset-2">Tous les tarifs de l'école</Link></p>

          <div id="comparer" className="mt-24 scroll-mt-28">
            <h2 className="max-w-3xl text-[clamp(1.8rem,3.6vw,2.8rem)]">Comparer avec une formation près de chez vous</h2>
            <p className="mt-3 max-w-2xl text-carbone/75">On compare à périmètre égal : la formation seule, puis le temps et les trajets. Le calcul n'utilise que vos chiffres et le tarif de l'école.</p>
            <div className="mt-8"><Comparator formationIndiana={prixFormationA2} /></div>
          </div>
        </Container>
      </section>

      {/* 5. Programme et logement */}
      <section id="programme" className="scroll-mt-28 py-20 md:py-28">
        <Container>
          <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)]">Comment se passent les deux semaines&nbsp;?</h2>
          <p className="mt-4 max-w-2xl text-lg text-carbone/75">Un programme type, ajusté après votre évaluation du premier jour.</p>
          <div className="mt-10"><Timeline14 jours={programme} /></div>

          <div className="mt-24 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)]">Où dormir pendant le stage&nbsp;?</h2>
              {hebergements.length === 0 ? (
                <>
                  <p className="mt-4 max-w-xl text-lg text-carbone/75">Un hébergement vous est proposé en option, près de l'école. Les logements partenaires sont en cours de sélection : seuls les lieux sous contrat seront présentés, avec leurs vraies photos.</p>
                  <p className="mt-4 max-w-xl text-carbone/75">Vous préférez vous organiser seul ? Le stage se réserve aussi sans hébergement.</p>
                </>
              ) : (
                <ul className="mt-6 space-y-4">
                  {hebergements.map((h) => (
                    <li key={h.id} className="rounded-2xl bg-white p-6">
                      <p className="text-xl font-semibold">{h.nom}</p>
                      <p className="text-carbone/70">{h.localisation}, {h.distance_ecole} de l'école. {h.type_chambre}.</p>
                      <p className="mt-2 text-sm text-carbone/70">Inclus : {h.inclus.join(", ")}. Non inclus : {h.non_inclus.join(", ")}.</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={asset("/images/roadtrip/hebergement-illustration.jpg")} alt="Séjour lumineux ouvert sur la campagne" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-2 text-sm text-carbone/55">Photo d'ambiance, non contractuelle.</figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* 6. Région, accès et adresses */}
      <section id="region" className="scroll-mt-28 bg-[#e8f0ef] py-20 md:py-28">
        <Container>
          <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)]">Que faire autour du Havre&nbsp;?</h2>
          <p className="mt-4 max-w-2xl text-lg text-carbone/75">Entre deux leçons, la côte est à vous. Les sorties sont libres et à votre charge&nbsp;; pendant la formation, vous ne roulez qu'en leçon.</p>
          <div className="mt-10 [&_.rt-chip]:text-carbone"><ExploreMap destinations={destinations} lieux={mapPoints()} /></div>

          <div className="mt-20 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl">Comment venir depuis Paris&nbsp;?</h2>
              <ul className="mt-4 space-y-3 text-carbone/80">
                <li><strong className="text-carbone">En train :</strong> TER directs depuis Paris Saint-Lazare, environ 2 h 10 jusqu'à la gare du Havre.</li>
                <li><strong className="text-carbone">En voiture :</strong> un peu plus de deux heures par l'A13.</li>
                <li><strong className="text-carbone">Sur place :</strong> l'école est au {school.address.street}, {school.address.city}.</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl">Nos adresses partenaires</h2>
              {partenaires.length === 0 ? (
                <p className="mt-4 text-carbone/75">Restaurants, activités, loueurs : le réseau se constitue. Les avantages réservés aux stagiaires seront indiqués uniquement une fois signés.</p>
              ) : (
                <ul className="mt-4 space-y-2">{partenaires.map((p) => <li key={p.id}><strong>{p.nom}</strong>, {p.ville}{p.avantage && p.avantage_confirme ? ` : ${p.avantage}` : ""}</li>)}</ul>
              )}
              <details className="mt-5">
                <summary className="cursor-pointer font-semibold text-foret">Vous tenez un établissement en Normandie&nbsp;?</summary>
                <div className="mt-4">
                  <MiniLeadForm tone="light" kind="Stage moto Normandie : candidature partenaire" stage="Partenaire à contacter" cta="Proposer mon établissement" done="Merci, nous revenons vers vous." fields={[{ name: "etab", label: "Établissement", required: true }, { name: "email", label: "E-mail", type: "email", required: true }]} />
                </div>
              </details>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Disponibilités */}
      <section id="disponibilites" className="scroll-mt-28 bg-foret py-20 text-sable md:py-24">
        <Container>
          <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)] text-white">Quand partir&nbsp;?</h2>
          {sessions.length === 0 ? (
            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <p className="max-w-xl text-lg text-sable/85">
                Les premières sessions sont en préparation : aucune date n'est encore ouverte. Indiquez la période qui vous arrange, nous vous prévenons dès qu'une session correspond.
              </p>
              <MiniLeadForm kind="Stage moto Normandie : alerte sessions" stage="Prospect" cta="Demander une disponibilité" done="C'est noté : vous serez prévenu en priorité." fields={[{ name: "email", label: "E-mail", type: "email", required: true }, { name: "periode", label: "Période souhaitée", placeholder: "Ex. mai 2027" }]} />
            </div>
          ) : (
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {sessions.map((s) => (
                <li key={s.id} className="rounded-2xl bg-white/10 p-6">
                  <p className="text-xl font-semibold text-white">Du {new Date(s.debut).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} au {new Date(s.fin).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
                  <p className="mt-1">{{ ouverte: "Inscriptions ouvertes", "liste-attente": "Liste d'attente", complet: "Complet", "en-preparation": "En préparation" }[s.statut]}{s.places_restantes !== undefined ? `, ${s.places_restantes} place(s) sur ${s.places_total}` : ""}{s.date_limite ? `, jusqu'au ${new Date(s.date_limite).toLocaleDateString("fr-FR")}` : ""}</p>
                  {s.prerequis && <p className="mt-1 text-sm text-sable/75">Prérequis : {s.prerequis.join(", ")}</p>}
                  {s.examen_info && <p className="mt-1 text-sm text-sable/75">{s.examen_info}</p>}
                  {s.statut === "ouverte" && <a href="#devis" className="btn btn-sunset mt-4">Recevoir mon devis</a>}
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* 8. Confiance : qui organise, preuves */}
      <section className="py-20 md:py-28" aria-labelledby="confiance">
        <Container>
          <h2 id="confiance" className="max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)]">Qui vous forme&nbsp;?</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="grid gap-8 sm:grid-cols-2">
              {[
                { t: "Une école agréée", d: `Indiana Auto-Moto, au Havre. Agrément préfectoral n° ${school.agrement}.` },
                { t: "Certifiée Qualiopi", d: "Organisme de formation certifié, éligible au CPF sous conditions." },
                { t: "Reconnue par les motards", d: "Par l'AFDM et par l'Assurance Mutuelle des Motards." },
                { t: "Une méthode suivie", d: "Programme national REMC et vérification de votre niveau avant l'examen." },
              ].map((x) => (
                <div key={x.t}>
                  <h3 className="text-xl">{x.t}</h3>
                  <p className="mt-1 text-carbone/70">{x.d}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-white p-6 md:p-8">
              <p className="font-semibold">{school.legalName}</p>
              <p className="text-carbone/70">{school.address.street}, {school.address.postalCode} {school.address.city}</p>
              <p className="mt-2"><a href={school.phoneHref} className="font-semibold text-rouge">{school.phone}</a></p>
              <p><a href={`mailto:${school.email}`} className="underline underline-offset-2">{school.email}</a></p>
              <p className="mt-4 text-sm text-carbone/60">Formation dispensée par Indiana Auto-Moto. Les conditions d'organisation du séjour et d'annulation figurent dans votre devis et les conditions générales.</p>
              <p className="mt-2 text-sm text-carbone/60">Informations mises à jour le {dateMaj}.</p>
            </div>
          </div>
          <div className="mt-12"><Reviews /></div>
        </Container>
      </section>

      {/* 9. Devis */}
      <section id="devis" className="scroll-mt-28 bg-sable py-20 md:py-28" aria-labelledby="devis-titre">
        <Container>
          <h2 id="devis-titre" className="max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)]">Recevoir mon devis personnalisé</h2>
          <p className="mt-4 max-w-2xl text-lg text-carbone/75">Trois étapes, deux minutes. Gratuit et sans engagement.</p>
          <div className="mt-10"><AdventureConfigurator prix={{ codeObtenu: prixFormationA2, codeAPreparer: prixFormationA2 + prixCode }} /></div>
        </Container>
      </section>

      {/* 10. Questions */}
      <section id="faq" className="scroll-mt-28 py-20 md:py-28" aria-labelledby="faq-titre">
        <Container className="max-w-4xl">
          <h2 id="faq-titre" className="text-[clamp(2rem,4.5vw,3.4rem)]">Vos questions</h2>
          <div className="mt-8"><Accordion items={faq} /></div>
          <p className="mt-10 text-carbone/75">
            À lire aussi :{" "}
            <Link href="/guides/permis-moto-en-deux-semaines/" className="font-semibold underline underline-offset-4">le permis moto en deux semaines</Link>,{" "}
            <Link href="/guides/prix-stage-permis-moto-hebergement/" className="font-semibold underline underline-offset-4">le prix d'un stage avec hébergement</Link>,{" "}
            <Link href="/guides/permis-moto-depuis-paris/" className="font-semibold underline underline-offset-4">passer son permis moto en venant de Paris</Link>.
          </p>
        </Container>
      </section>
    </div>
  );
}

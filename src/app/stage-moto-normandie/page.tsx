import Image from "next/image";
import Link from "next/link";
import { CityToCoast } from "@/components/roadtrip/CityToCoast";
import { VideoBackdrop } from "@/components/roadtrip/VideoBackdrop";
import { SplitJourney } from "@/components/roadtrip/SplitJourney";
import { Timeline14 } from "@/components/roadtrip/Timeline14";
import { ExploreMap } from "@/components/roadtrip/ExploreMap";
import { Comparator } from "@/components/roadtrip/Comparator";
import { AdventureConfigurator } from "@/components/roadtrip/AdventureConfigurator";
import { MiniLeadForm } from "@/components/roadtrip/MiniLeadForm";
import { Accordion } from "@/components/Accordion";
import { Container, JsonLd, Recognitions, Reviews } from "@/components/ui";
import { euro, school, SITE_URL } from "@/lib/content";
import { destinations, formules, hebergementPrix, hebergements, mapPoints, partenaires, prixFormation, programme, ROADTRIP_PATH, sessions } from "@/lib/roadtrip";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { asset } from "@/lib/asset";

export const metadata = pageMeta({
  title: "Stage permis moto intensif en Normandie : deux semaines, hébergement inclus",
  description:
    "Indiana Road Trip : passez votre permis moto A2 pendant un séjour de deux semaines au Havre. Formation intensive, hébergement, découverte de la côte normande. Pensé pour les Franciliens.",
  path: ROADTRIP_PATH,
});

const STATUT: Record<string, { label: string; cls: string }> = {
  inclus: { label: "Inclus", cls: "bg-foret text-sable" },
  option: { label: "En option", cls: "bg-ocean text-white" },
  "a-confirmer": { label: "À confirmer", cls: "bg-sable-dark text-carbone" },
  candidat: { label: "À votre charge", cls: "border border-carbone/30 text-carbone" },
};

const faq = [
  { q: "Le permis est-il garanti en deux semaines ?", a: "Non. Le séjour concentre la formation sur deux semaines et prévoit une présentation aux épreuves en fin de séjour, mais celle-ci dépend de votre niveau, des prérequis et des places d'examen attribuées par l'administration. Si l'examen ne peut pas avoir lieu pendant le séjour, un plan de suite vous est proposé." },
  { q: "Pour quel permis le séjour est-il conçu ?", a: "Pour le permis A2, accessible dès 18 ans. Pour un permis A1, la passerelle A2 vers A ou une situation particulière, le configurateur transmet une demande personnalisée." },
  { q: "Dois-je avoir le code moto avant de venir ?", a: "C'est fortement recommandé. Le code moto (ETM) doit être réussi avant de passer les épreuves pratiques. La formule « code à préparer » comprend la formation en ligne et la redevance d'examen : vous passez l'examen dans un centre agréé près de chez vous, avant le séjour." },
  { q: "Combien d'heures de conduite sont prévues ?", a: "Le forfait A2 comprend 20 heures de conduite, le minimum prévu par la réglementation. Des heures supplémentaires peuvent être ajoutées à 60 € TTC l'heure si votre moniteur le juge utile." },
  { q: "Les visites et restaurants sont-ils compris ?", a: "Non. Le programme de découverte est indicatif et les sorties sont libres et à votre charge. Les avantages chez nos partenaires sont indiqués uniquement lorsqu'ils sont confirmés." },
  { q: "Faut-il venir avec son équipement ?", a: "Un équipement homologué est obligatoire : casque, gants, blouson à manches longues, pantalon et chaussures montantes. Les possibilités de prêt seront précisées à l'ouverture des sessions." },
  { q: "Puis-je utiliser mon CPF ?", a: school.cpf },
];

export default function StageMotoNormandie() {
  const [fObt, fPrep] = formules;
  const pObt = prixFormation(fObt), pPrep = prixFormation(fPrep);
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Indiana Road Trip : stage intensif de permis moto en Normandie",
    description: metadata.description,
    url: `${SITE_URL}${ROADTRIP_PATH}`,
    provider: { "@type": "DrivingSchool", name: school.name, url: SITE_URL },
    offers: { "@type": "Offer", price: pObt, priceCurrency: "EUR", description: "Prix de la formation, hors hébergement" },
    hasCourseInstance: sessions.filter((s) => s.statut === "ouverte").map((s) => ({ "@type": "CourseInstance", courseMode: "onsite", startDate: s.debut, endDate: s.fin, location: { "@type": "Place", name: "Le Havre" } })),
  };

  return (
    <div className="bg-carbone">
      <JsonLd data={jsonld} />
      <JsonLd data={faqJsonLd(faq)} />

      {/* SCÈNE 01 — Escape the city */}
      <CityToCoast />

      {/* SCÈNE 02 — The Road Trip */}
      <section className="grain relative flex min-h-[100svh] items-end overflow-hidden text-sable" aria-labelledby="rt-titre">
        <VideoBackdrop src={asset("/videos/route-normandie.mp4")} poster={asset("/images/roadtrip/route-normandie-poster.jpg")} label="Un motard roule sur une route de campagne normande" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbone via-carbone/40 to-carbone/10" />
        <Container className="relative z-10 w-full pb-16 pt-40">
          <p className="font-display text-xl font-semibold text-sable/85">Indiana Road Trip, stage moto et séjour</p>
          <h1 id="rt-titre" className="font-editorial mt-3 max-w-5xl text-[clamp(3.2rem,8vw,7.5rem)] text-white">Découvrez la Normandie en passant votre permis moto.</h1>
          <ul className="mt-10 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/20 pt-6 md:grid-cols-5">
            {[["2 semaines", "sur place, au Havre"], ["Intensive", "formation A2, 20 h incluses"], ["Hébergement", "inclus dans la formule"], ["La région", "côte, ports et villages"], ["L'examen", "visé en fin de séjour*"]].map(([t, d]) => (
              <li key={t}><p className="font-display text-2xl font-bold text-white">{t}</p><p className="text-sable/75">{d}</p></li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#sessions" className="btn btn-sunset">Découvrir les prochaines sessions</a>
            <a href="#preparer" className="btn btn-ghost btn-ghost-light text-white">Préparer mon aventure</a>
          </div>
          <p className="mt-6 max-w-3xl text-sm text-sable/65">* Sous réserve des prérequis, de votre niveau et des places d'examen attribuées. Offre en cours de lancement : dates, hébergement et conditions sont confirmés à l'ouverture des sessions.</p>
        </Container>
      </section>

      {/* SCÈNE 03 — One journey, two experiences */}
      <SplitJourney />

      {/* SCÈNE 04 — Jour après jour */}
      <section className="bg-sable py-24 text-carbone" aria-labelledby="rt-timeline">
        <Container>
          <p className="font-display text-xl font-semibold text-foret">Votre aventure, jour après jour</p>
          <h2 id="rt-timeline" className="font-editorial mt-2 max-w-4xl text-[clamp(2.6rem,5.5vw,5rem)]">Quatorze jours, un objectif, un rythme qui s'adapte à vous.</h2>
          <div className="mt-12"><Timeline14 jours={programme} /></div>
        </Container>
      </section>

      {/* SCÈNE 05 — Hébergement */}
      <section className="bg-foret py-24 text-sable" aria-labelledby="rt-heb">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="font-display text-xl font-semibold text-sable/70">Votre hébergement</p>
              <h2 id="rt-heb" className="font-editorial mt-2 text-[clamp(2.6rem,5vw,4.6rem)] text-white">Un endroit pour se poser, à quelques minutes de l'école.</h2>
              {hebergements.length === 0 ? (
                <>
                  <p className="measure mt-6 text-lg text-sable/85">Les hébergements partenaires sont en cours de sélection. Seuls les lieux sous contrat seront présentés ici, avec leurs vraies photos.</p>
                  <p className="mt-6 font-display text-xl font-bold text-white">Chaque fiche précisera</p>
                  <ul className="mt-3 grid gap-x-6 gap-y-2 text-sable/85 sm:grid-cols-2">
                    {["Le type de chambre", "Les équipements", "La localisation", "La distance de l'école", "Les conditions du séjour", "Les prestations incluses et non incluses", "Les options disponibles", "Une galerie photo du lieu"].map((x) => <li key={x} className="border-b border-white/15 pb-2">{x}</li>)}
                  </ul>
                </>
              ) : null}
            </div>
            <figure className="relative">
              <div className="relative aspect-[4/4.2] overflow-hidden rounded-2xl">
                <Image src={asset("/images/roadtrip/hebergement-illustration.jpg")} alt="Séjour lumineux ouvert sur la campagne" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-sable/60">Photo d'ambiance, non contractuelle.</figcaption>
            </figure>
          </div>
          {hebergements.length > 0 && (
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {hebergements.map((h) => (
                <article key={h.id} className="rounded-2xl bg-carbone p-6">
                  <h3 className="font-editorial text-4xl text-white">{h.nom}</h3>
                  <p className="mt-1 text-sable/70">{h.localisation}, {h.distance_ecole} de l'école. {h.type_chambre}.</p>
                  <ul className="mt-3 flex flex-wrap gap-2">{h.equipements.map((e) => <li key={e} className="rounded-full bg-foret px-3 py-1 text-sm">{e}</li>)}</ul>
                  <p className="mt-4 text-sable/85">{h.conditions}</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm">
                    <div><p className="font-semibold text-white">Inclus</p><ul>{h.inclus.map((x) => <li key={x}>{x}</li>)}</ul></div>
                    <div><p className="font-semibold text-white">Non inclus</p><ul>{h.non_inclus.map((x) => <li key={x}>{x}</li>)}</ul></div>
                    <div><p className="font-semibold text-white">Options</p><ul>{h.options.map((x) => <li key={x}>{x}</li>)}</ul></div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* SCÈNE 06 — Explore Normandy */}
      <section className="relative overflow-hidden bg-ocean py-24 text-sable" aria-labelledby="rt-explore">
        <Container>
          <p className="font-display text-xl font-semibold text-sable/70">Explore Normandy</p>
          <h2 id="rt-explore" className="font-editorial mt-2 max-w-4xl text-[clamp(2.6rem,5.5vw,5rem)] text-white">Neuf destinations à portée de guidon, ou de train.</h2>
          <p className="measure mt-4 text-lg text-sable/85">Pendant vos temps libres, la côte est à vous. Pendant la formation, vous ne roulez qu'en leçon, avec votre moniteur.</p>
          <div className="mt-12"><ExploreMap destinations={destinations} lieux={mapPoints()} /></div>
        </Container>
      </section>

      {/* SCÈNE 07 — Partenaires */}
      <section className="bg-carbone py-24 text-sable" aria-labelledby="rt-partners">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="font-display text-xl font-semibold text-sable/70">Indiana Partners</p>
              <h2 id="rt-partners" className="font-editorial mt-2 text-[clamp(2.6rem,5vw,4.6rem)] text-white">Les bonnes adresses de l'équipe, à votre table.</h2>
              {partenaires.length === 0 ? (
                <p className="measure mt-6 text-lg text-sable/85">Restaurants, loueurs, activités : le réseau de partenaires se constitue. Chaque adresse sera présentée avec ses horaires, son site et, lorsqu'il est signé, l'avantage réservé aux stagiaires.</p>
              ) : null}
              <div className="mt-8 rounded-2xl bg-carbone-2 p-6">
                <p className="font-display text-2xl font-bold text-white">Vous tenez un établissement en Normandie&nbsp;?</p>
                <p className="mt-1 text-sable/75">Rejoignez le réseau et accueillez nos stagiaires.</p>
                <div className="mt-5">
                  <MiniLeadForm kind="Road Trip : candidature partenaire" stage="Partenaire à contacter" cta="Proposer mon établissement" done="Merci, nous revenons vers vous." fields={[{ name: "etab", label: "Établissement", required: true }, { name: "email", label: "E-mail", type: "email", required: true }]} />
                </div>
              </div>
            </div>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={asset("/images/roadtrip/terrasse-port.jpg")} alt="Table dressée en terrasse face à un port de plaisance" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-sable/60">Photo d'ambiance. Aucun partenariat n'est encore signé.</figcaption>
            </figure>
          </div>
          {partenaires.length > 0 && (
            <ul className="mt-14 grid gap-6 md:grid-cols-3">
              {partenaires.map((p) => (
                <li key={p.id} className="overflow-hidden rounded-2xl bg-carbone-2">
                  {p.photos[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.photos[0]} alt={p.nom} className="aspect-[4/3] w-full object-cover" />
                  )}
                  <div className="p-6">
                    <p className="text-sm text-sable/60">{p.categorie}, {p.ville}</p>
                    <h3 className="font-editorial text-3xl text-white">{p.nom}</h3>
                    <p className="mt-2 text-sable/80">{p.description}</p>
                    {p.horaires && <p className="mt-2 text-sm text-sable/70">{p.horaires}</p>}
                    {p.avantage && p.avantage_confirme && <p className="mt-3 rounded-md bg-sunset/15 p-3 text-sm">Avantage stagiaires : {p.avantage}{p.conditions ? ` (${p.conditions})` : ""}</p>}
                    {p.site && <a href={p.site} target="_blank" rel="noopener" className="mt-3 inline-block border-b border-sunset text-sm">Site internet</a>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* SCÈNE 08 — Formules */}
      <section className="bg-sable py-24 text-carbone" aria-labelledby="rt-formules">
        <Container>
          <p className="font-display text-xl font-semibold text-foret">Votre formule tout compris</p>
          <h2 id="rt-formules" className="font-editorial mt-2 max-w-4xl text-[clamp(2.6rem,5.5vw,5rem)]">Ce qui est compris, ce qui est en option, ce qui reste à votre charge.</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {formules.map((f, i) => (
              <article key={f.id} className={`rounded-2xl p-6 md:p-8 ${i === 0 ? "bg-white/80" : "bg-white/50"}`}>
                <h3 className="font-editorial text-4xl">{f.nom}</h3>
                <p className="mt-1 text-carbone/70">{f.pour}</p>
                <p className="mt-6 flex items-baseline gap-3">
                  <span className="font-display text-5xl font-extrabold">{euro(prixFormation(f))}</span>
                  <span className="text-carbone/70">TTC formation{hebergementPrix === null ? ", hébergement en sus" : ""}</span>
                </p>
                <ul className="mt-6 divide-y divide-sable-dark">
                  {f.lignes.map((l) => (
                    <li key={l.libelle} className="flex items-start justify-between gap-4 py-3">
                      <span>
                        {l.libelle}
                        {l.note && <span className="block text-sm text-carbone/60">{l.note}</span>}
                      </span>
                      <span className="flex shrink-0 flex-col items-end gap-1">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUT[l.statut].cls}`}>{STATUT[l.statut].label}</span>
                        {l.prix ? <span className="text-sm font-semibold">{euro(l.prix)}{l.unite ? ` ${l.unite}` : ""}</span> : null}
                      </span>
                    </li>
                  ))}
                </ul>
                <a href="#preparer" className="btn btn-rouge mt-6">Choisir cette formule</a>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-4xl text-sm text-carbone/70">Tarifs de formation TTC issus de la grille de l'école. Le passage des épreuves pratiques du permis est gratuit ; l'accompagnement par l'école est compris dans le forfait A2.</p>

          <div className="mt-20" id="comparer">
            <h3 className="font-editorial text-[clamp(2.2rem,4vw,3.6rem)]">Comparez avec une formation près de chez vous</h3>
            <p className="measure mt-2 text-carbone/75">Renseignez ce que votre moto-école vous a annoncé. Le calcul n'utilise que vos chiffres et les tarifs Indiana.</p>
            <div className="mt-8"><Comparator indianaFormation={pObt} hebergementPrix={hebergementPrix} /></div>
          </div>
        </Container>
      </section>

      {/* SCÈNE 09 — Sessions */}
      <section id="sessions" className="scroll-mt-20 bg-carbone py-24 text-sable" aria-labelledby="rt-sessions">
        <Container>
          <p className="font-display text-xl font-semibold text-sable/70">Les prochaines sessions</p>
          <h2 id="rt-sessions" className="font-editorial mt-2 max-w-4xl text-[clamp(2.6rem,5.5vw,5rem)] text-white">Choisissez vos deux semaines.</h2>
          {sessions.length === 0 ? (
            <div className="mt-10 grid gap-10 rounded-2xl bg-carbone-2 p-6 md:p-10 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="font-display text-2xl font-bold text-white">Les premières sessions sont en préparation</p>
                <p className="measure mt-2 text-sable/80">Aucune date n'est encore ouverte à l'inscription. Laissez votre e-mail : vous serez prévenu dès l'ouverture, sans engagement.</p>
                <p className="mt-6 text-sm text-sable/60">Chaque session affichera ses dates, les places réellement disponibles, le prix, l'hébergement, les prérequis, la date limite d'inscription et les informations d'examen.</p>
              </div>
              <MiniLeadForm kind="Road Trip : alerte sessions" stage="Prospect" cta="Me prévenir" done="C'est noté, vous serez prévenu en priorité." fields={[{ name: "email", label: "E-mail", type: "email", required: true }, { name: "periode", label: "Période souhaitée", placeholder: "Ex. mai 2027" }]} />
            </div>
          ) : (
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead><tr className="border-b border-white/30 text-sm text-sable/70"><th className="py-3">Dates</th><th>Places</th><th>Prix</th><th>Prérequis</th><th>Inscriptions</th><th /></tr></thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.id} className="border-b border-white/10">
                      <td className="py-4 font-display text-xl font-bold text-white">{new Date(s.debut).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} au {new Date(s.fin).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</td>
                      <td>{s.places_restantes !== undefined ? `${s.places_restantes} sur ${s.places_total}` : "À venir"}</td>
                      <td>{s.prix_a_partir ? euro(s.prix_a_partir) : "À venir"}</td>
                      <td className="text-sm">{s.prerequis?.join(", ")}</td>
                      <td className="text-sm">{{ ouverte: "Ouvertes", "liste-attente": "Liste d'attente", complet: "Complet", "en-preparation": "En préparation" }[s.statut]}{s.date_limite ? `, jusqu'au ${new Date(s.date_limite).toLocaleDateString("fr-FR")}` : ""}</td>
                      <td>{s.statut === "ouverte" && <a href="#preparer" className="btn btn-sunset">Réserver</a>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Container>
      </section>

      {/* SCÈNE 10 — Pourquoi Indiana */}
      <section className="bg-marquage py-24" aria-labelledby="rt-why">
        <Container>
          <p className="font-display text-xl font-semibold text-rouge">Pourquoi Indiana&nbsp;?</p>
          <h2 id="rt-why" className="font-editorial mt-2 max-w-4xl text-[clamp(2.6rem,5.5vw,5rem)]">L'école des motards du Havre, derrière l'aventure.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { t: "Une école reconnue", d: "Agréée, certifiée Qualiopi, reconnue par l'AFDM et l'Assurance Mutuelle des Motards." },
              { t: "Une méthode éprouvée", d: "Le programme national REMC, complété par une vérification de niveau avant chaque présentation." },
              { t: "Des motos récentes", d: "Dont une Yamaha MT-03, et des lieux de formation sur piste à quelques minutes de l'agence." },
              { t: "Des enseignants diplômés", d: "Des enseignants de la conduite diplômés d'État, au sein d'une école reconnue par les motards." },
              { t: "Le terrain", d: "Ville portuaire, rocade, routes de campagne et côtières : un terrain de formation complet." },
              { t: "Des horaires larges", d: "Leçons de 8h à 20h en semaine et le samedi jusqu'à 16h." },
            ].map((x) => (
              <div key={x.t} className="border-t-4 border-carbone pt-4">
                <h3 className="font-editorial text-3xl">{x.t}</h3>
                <p className="mt-2 text-carbone/75">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-14"><Recognitions /></div>
          <div className="mt-10"><Reviews /></div>
          <p className="mt-6"><Link href="/equipe/" className="border-b-2 border-rouge font-semibold">Rencontrer l'équipe</Link></p>
        </Container>
      </section>

      {/* SCÈNE 11 — Préparez votre aventure */}
      <section id="preparer" className="scroll-mt-20 bg-foret py-24 text-sable" aria-labelledby="rt-prep">
        <Container>
          <p className="font-display text-xl font-semibold text-sable/70">Préparez votre aventure</p>
          <h2 id="rt-prep" className="font-editorial mt-2 max-w-4xl text-[clamp(2.6rem,5.5vw,5rem)] text-white">Dites-nous qui vous êtes, on vous dit comment y aller.</h2>
          <div className="mt-12"><AdventureConfigurator prix={{ codeObtenu: pObt, codeAPreparer: pPrep }} /></div>
        </Container>
      </section>

      <section className="bg-sable py-24 text-carbone" aria-labelledby="rt-faq">
        <Container className="max-w-4xl">
          <h2 id="rt-faq" className="font-editorial text-[clamp(2.4rem,5vw,4.4rem)]">Questions fréquentes</h2>
          <div className="mt-8 [&_.divide-beton]:divide-sable-dark [&_.border-beton]:border-sable-dark [&_p]:text-carbone/80"><Accordion items={faq} /></div>
          <p className="mt-8 text-carbone/80">À lire aussi : <Link href="/guides/permis-moto-en-deux-semaines/" className="border-b-2 border-foret font-semibold">Passer son permis moto en deux semaines : ce qui est réaliste</Link></p>
        </Container>
      </section>

      {/* CTA mobile persistant */}
      <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
        <a href="#preparer" className="btn btn-sunset w-full shadow-xl">Préparer mon aventure</a>
      </div>
    </div>
  );
}

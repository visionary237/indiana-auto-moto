import Link from "next/link";
import { Container, JsonLd, PageHero } from "@/components/ui";
import { RoadTripCta } from "@/components/roadtrip/RoadTripCta";
import { euro, packs, school, SITE_URL } from "@/lib/content";
import { prixFormationA2 } from "@/lib/roadtrip";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { asset } from "@/lib/asset";

const PATH = "/permis-moto-accelere/";
export const metadata = pageMeta({
  title: "Permis moto accéléré : stage intensif A2 au Havre",
  description: "Passer son permis moto en accéléré : stage intensif de deux semaines au Havre avec logement en option, ou formation resserrée pour les Havrais. Conditions, prix et délais réalistes.",
  path: PATH,
});

const faq = [
  { q: "Qu'est-ce qu'un permis moto accéléré ?", a: "C'est une formation au permis moto dont les heures de conduite sont regroupées sur une période courte, au lieu d'être étalées sur plusieurs mois. Le volume minimum reste le même : 20 heures pour le permis A2." },
  { q: "Combien de temps dure un permis moto accéléré ?", a: "Chez Indiana Auto-Moto, la formule intensive se déroule sur deux semaines. La présentation à l'examen en fin de formation dépend du code moto (à réussir avant), de votre niveau et des places attribuées par l'administration." },
  { q: "Combien coûte un permis moto accéléré ?", a: `La formation A2 coûte ${euro(prixFormationA2)} TTC au tarif de l'école. En stage avec séjour, s'ajoutent des frais d'organisation et, en option, le logement, chiffrés dans un devis personnalisé.` },
];

export default function Page() {
  const a2 = packs.find((p) => p.slug === "moto-a2")!;
  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: metadata.title, url: `${SITE_URL}${PATH}`, inLanguage: "fr", dateModified: "2026-11-27" }} />
      <PageHero
        title="Le permis moto accéléré, en vrai."
        intro="Vos 20 heures de formation regroupées sur deux semaines, au lieu de plusieurs mois. Deux façons de le faire avec Indiana Auto-Moto."
        image={asset("/images/piste-moto.jpg")}
        imageAlt="Un élève motard en slalom entre des plots"
      >
        <Link href="/stage-moto-normandie/" className="btn btn-rouge">Voir le stage en Normandie</Link>
      </PageHero>

      <section className="py-16 md:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          <article className="flex flex-col rounded-[28px] bg-foret p-7 text-white md:p-10">
            <p className="text-sm font-semibold text-sunset">Vous venez de loin</p>
            <h2 className="mt-2 text-3xl md:text-4xl">Le stage de deux semaines au Havre</h2>
            <p className="mt-3 text-white/85">Formation A2 intensive, logement en option, la côte normande à découvrir. Pensé pour les Parisiens et les habitants des grandes villes.</p>
            <ul className="mt-5 space-y-1.5 text-white/85">
              <li>Formation A2 : {euro(prixFormationA2)} TTC</li>
              <li>Organisation et logement : sur devis</li>
              <li>À 2 h 10 de Paris en train</li>
            </ul>
            <Link href="/stage-moto-normandie/" className="btn btn-sunset mt-auto self-start !mt-8">Découvrir le stage</Link>
          </article>
          <article className="flex flex-col rounded-[28px] bg-white p-7 ring-1 ring-beton md:p-10">
            <p className="text-sm font-semibold text-rouge">Vous habitez près du Havre</p>
            <h2 className="mt-2 text-3xl md:text-4xl">Une formation resserrée sur place</h2>
            <p className="mt-3 text-carbone/75">Le forfait A2 classique, avec des leçons planifiées de façon dense, du lundi au samedi, de 8 h à 20 h.</p>
            <ul className="mt-5 space-y-1.5 text-carbone/80">
              <li>Forfait A2 : {euro(a2.price)} TTC, 20 h de conduite</li>
              <li>CPF accepté sous conditions</li>
              <li>{school.address.street}, {school.address.city}</li>
            </ul>
            <Link href="/contact/?formation=moto-a2" className="btn btn-ghost mt-auto self-start !mt-8">Demander un planning</Link>
          </article>
        </Container>
      </section>

      <section className="bg-sable py-16 md:py-24">
        <Container className="max-w-3xl">
          <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)]">Ce qu'il faut savoir avant de se lancer</h2>
          <dl className="mt-8 divide-y divide-sable-dark">
            {faq.map((f) => <div key={f.q} className="py-5"><dt className="text-lg font-semibold">{f.q}</dt><dd className="mt-2 text-carbone/80">{f.a}</dd></div>)}
          </dl>
          <p className="mt-8 text-carbone/75">Pour aller plus loin : <Link className="font-semibold underline underline-offset-4" href="/guides/permis-moto-en-deux-semaines/">peut-on passer son permis moto en deux semaines ?</Link></p>
        </Container>
      </section>
      <RoadTripCta />
    </>
  );
}

import Link from "next/link";
import { Container, JsonLd } from "@/components/ui";
import { RoadTripCta } from "@/components/roadtrip/RoadTripCta";
import { SITE_URL } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

const PATH = "/guides/permis-moto-en-deux-semaines/";
export const metadata = pageMeta({
  title: "Passer son permis moto en deux semaines : ce qui est réaliste",
  description: "Code moto, 20 heures minimum, épreuves plateau et circulation, places d'examen : tout ce qu'il faut savoir avant de passer son permis moto A2 en stage intensif.",
  path: PATH,
});

const sections = [
  {
    h: "Ce que la réglementation impose",
    p: [
      "Le permis A2 demande une formation pratique d'au moins 20 heures : une partie hors circulation, sur piste, et une partie en circulation. Deux semaines laissent largement le temps de les suivre, à raison de deux heures environ par jour ouvré.",
      "Avant les épreuves pratiques, il faut avoir réussi l'examen théorique moto, l'ETM. Il se passe dans un centre agréé, n'importe où en France : vous pouvez donc le réussir près de chez vous avant de partir.",
    ],
  },
  {
    h: "Ce qui ne dépend pas de vous",
    p: [
      "L'examen pratique se déroule en deux temps : l'épreuve hors circulation, puis l'épreuve en circulation. Les places sont attribuées par l'administration, département par département. Une école peut les demander, mais aucune ne peut garantir une date.",
      "C'est pourquoi un stage sérieux parle d'objectif d'examen en fin de séjour, jamais de permis garanti. Si l'épreuve ne peut pas avoir lieu pendant le séjour, l'école doit vous proposer un plan de suite.",
    ],
  },
  {
    h: "Ce qui dépend de vous",
    p: [
      "Arriver avec le code moto en poche, un dossier ANTS complet et un équipement homologué fait gagner des jours précieux. Être disponible deux semaines d'affilée, sans obligation à côté, aide aussi à progresser vite.",
      "Votre aisance de départ compte : l'évaluation du premier jour permet au moniteur d'ajuster le volume d'heures, et de vous dire honnêtement si des heures supplémentaires seront utiles.",
    ],
  },
];

const checklist = [
  "Code moto (ETM) réussi, ou planifié avant le départ",
  "Numéro de dossier ANTS obtenu avec l'aide de l'école",
  "Deux semaines de congés consécutives",
  "Casque, gants, blouson, pantalon et chaussures montantes homologués",
  "Un budget qui prévoit l'éventualité d'heures supplémentaires",
];

export default function Guide() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: metadata.title, url: `${SITE_URL}${PATH}`, author: { "@type": "Organization", name: "Indiana Auto-Moto" }, dateModified: "2026-11-19" }} />
      <article className="bg-sable py-20 text-carbone">
        <Container className="max-w-3xl">
          <p className="font-display text-lg font-semibold text-foret">Guide</p>
          <h1 className="font-editorial mt-2 text-[clamp(2.8rem,6vw,5rem)]">Passer son permis moto en deux semaines : ce qui est réaliste</h1>
          <p className="mt-6 text-xl leading-relaxed text-carbone/85">
            Concentrer sa formation sur une courte période est possible, et souvent efficace. À condition de savoir ce qui se prépare à l'avance, et ce qui reste incertain.
          </p>
          {sections.map((s) => (
            <section key={s.h} className="mt-12">
              <h2 className="font-editorial text-4xl">{s.h}</h2>
              {s.p.map((t) => <p key={t} className="mt-4 text-lg leading-[1.75] text-carbone/85">{t}</p>)}
            </section>
          ))}
          <section className="mt-12 rounded-2xl bg-white/70 p-8">
            <h2 className="font-editorial text-4xl">Avant de partir</h2>
            <ul className="mt-4 space-y-2 text-lg">{checklist.map((c) => <li key={c} className="border-b border-sable-dark pb-2">{c}</li>)}</ul>
          </section>
          <section className="mt-12">
            <h2 className="font-editorial text-4xl">Partir, ou rester près de chez soi&nbsp;?</h2>
            <p className="mt-4 text-lg leading-[1.75] text-carbone/85">
              Tout dépend du délai et du prix que vous annonce votre moto-école locale, et du temps que vous passeriez en trajets. Notre comparateur fait le calcul avec vos propres chiffres.
            </p>
            <Link href="/stage-moto-normandie/#comparer" className="btn btn-rouge mt-6">Comparer les deux options</Link>
          </section>
        </Container>
      </article>
      <RoadTripCta />
    </>
  );
}

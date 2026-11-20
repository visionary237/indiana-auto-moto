import Link from "next/link";
import type { ReactNode } from "react";
import { Container, JsonLd } from "@/components/ui";
import { RoadTripCta } from "@/components/roadtrip/RoadTripCta";
import { SITE_URL } from "@/lib/content";
import { faqJsonLd } from "@/lib/seo";

export type GuideSection = { h: string; body: ReactNode };

const GUIDES = [
  { href: "/guides/permis-moto-en-deux-semaines/", label: "Passer son permis moto en deux semaines" },
  { href: "/guides/prix-stage-permis-moto-hebergement/", label: "Prix d'un stage de permis moto avec hébergement" },
  { href: "/guides/permis-moto-depuis-paris/", label: "Passer son permis moto en venant de Paris" },
];

/** Gabarit des guides : réponse courte d'abord, sections, questions, maillage. */
export function GuideLayout({ path, title, answer, sections, faq, updated }: {
  path: string; title: string; answer: string; sections: GuideSection[]; faq: { q: string; a: string }[]; updated: string;
}) {
  const date = new Date(updated).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: title, url: `${SITE_URL}${path}`, inLanguage: "fr", dateModified: updated, author: { "@type": "Organization", name: "Indiana Auto-Moto" }, publisher: { "@type": "Organization", name: "Indiana Auto-Moto" } }} />
      {faq.length > 0 && <JsonLd data={faqJsonLd(faq)} />}
      <article className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <nav aria-label="Fil d'Ariane" className="text-sm text-gris">
            <Link href="/" className="inline-block py-2 hover:underline">Accueil</Link> / <Link href="/stage-moto-normandie/" className="inline-block py-2 hover:underline">Stage moto</Link> / Guide
          </nav>
          <h1 className="mt-4 text-[clamp(2.1rem,5vw,3.6rem)]">{title}</h1>
          <p className="mt-2 text-sm text-gris">Mis à jour le {date}, par l'équipe Indiana Auto-Moto</p>

          <div className="mt-8 rounded-2xl bg-white p-6 text-lg leading-relaxed md:p-8">
            <p className="text-sm font-semibold text-foret">En bref</p>
            <p className="mt-2">{answer}</p>
          </div>

          {sections.map((s) => (
            <section key={s.h} className="mt-12">
              <h2 className="text-[clamp(1.5rem,3vw,2.1rem)]">{s.h}</h2>
              <div className="mt-4 space-y-4 text-[1.08rem] leading-[1.75] text-carbone/85 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">{s.body}</div>
            </section>
          ))}

          {faq.length > 0 && (
            <section className="mt-14">
              <h2 className="text-[clamp(1.5rem,3vw,2.1rem)]">Questions fréquentes</h2>
              <dl className="mt-4 divide-y divide-beton">
                {faq.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="text-lg font-semibold">{f.q}</dt>
                    <dd className="mt-2 text-carbone/80">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <div className="mt-14 flex flex-col gap-4 rounded-2xl bg-sable p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <p className="text-lg font-semibold">Un projet de stage ? Recevez un devis détaillé, sans engagement.</p>
            <Link href="/stage-moto-normandie/#devis" className="btn btn-rouge shrink-0">Recevoir mon devis personnalisé</Link>
          </div>

          <aside className="mt-12">
            <p className="font-semibold">Autres guides</p>
            <ul className="mt-3 space-y-2">
              {GUIDES.filter((g) => g.href !== path).map((g) => (
                <li key={g.href}><Link href={g.href} className="underline underline-offset-4 hover:text-rouge">{g.label}</Link></li>
              ))}
            </ul>
          </aside>
        </Container>
      </article>
      <RoadTripCta />
    </>
  );
}

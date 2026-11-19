import Link from "next/link";
import { Container, CtaBand, PackCard, PageHero, PriceNote, SectionTitle } from "@/components/ui";
import { stages } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { RoadTripCta } from "@/components/roadtrip/RoadTripCta";
import { asset } from "@/lib/asset";

export const metadata = pageMeta({
  title: "Stages et perfectionnement au Havre : 125 cm³, passerelle A, AM, jeune conducteur",
  description: "Formation 7 h 125 cm³ et passerelle A2 vers A, permis AM 50 cm³, stage conducteur novice, passage boîte auto vers manuelle. Indiana Auto-Moto, Le Havre.",
  path: "/stages/",
});

export default function Stages() {
  return (
    <>
      <PageHero
        title="Stages et perfectionnement"
        intro="Vous avez déjà un permis ? Ces formations courtes ouvrent de nouvelles catégories ou vous font gagner du temps sur votre période probatoire."
        image={asset("/images/piste-groupe.jpg")}
        imageAlt="Groupe de motards en formation sur piste"
      >
        <Link href="/contact/" className="btn btn-rouge">Réserver un stage</Link>
      </PageHero>
      <section className="py-20">
        <Container>
          <SectionTitle title="Formations courtes" />
          <div className="grid gap-6 md:grid-cols-2">
            {stages.map((s) => <PackCard key={s.slug} pack={s} />)}
          </div>
          <PriceNote />
        </Container>
      </section>
      <RoadTripCta />
      <CtaBand title="Une question sur votre situation ?" text="Ancienneté de permis, catégorie visée : appelez-nous, on vous dit en deux minutes quelle formation vous concerne." />
    </>
  );
}

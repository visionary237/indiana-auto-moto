import Link from "next/link";
import { Container, CtaBand, PackCard, PageHero, PriceNote, SectionTitle, Steps } from "@/components/ui";
import { packs, school } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { RoadTripCta } from "@/components/roadtrip/RoadTripCta";
import { asset } from "@/lib/asset";

export const metadata = pageMeta({
  title: "Permis accéléré au Havre : 20 h de conduite sur une période resserrée",
  description: "Formation au permis B accéléré au Havre : 20 heures de conduite planifiées de façon intensive, finançable par le CPF sous conditions. Indiana Auto-Moto.",
  path: "/formations-accelerees/",
});

export default function Accelere() {
  const acc = packs.find((p) => p.slug === "auto-accelere")!;
  return (
    <>
      <PageHero
        title="Le permis accéléré, pour ceux qui ont une échéance"
        intro="Un nouvel emploi, une mobilité, un départ en études : la formation accélérée regroupe vos heures de conduite sur une période courte. Le planning est construit avec vous dès l'inscription."
        image={asset("/images/moniteur-evaluation.jpg")}
        imageAlt="Un enseignant de la conduite prend des notes pendant qu'une élève conduit"
      >
        <Link href="/contact/?formation=auto-accelere" className="btn btn-rouge">Demander un planning</Link>
      </PageHero>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <PackCard pack={acc} featured />
            <PriceNote />
          </div>
          <div>
            <SectionTitle title="Comment ça se déroule" />
            <Steps
              steps={[
                { title: "Le code d'abord", text: "Le code se travaille en amont, en salle et sur Prépacode, pour arriver au volant l'esprit libre." },
                { title: "Évaluation", text: "On mesure votre niveau et on confirme le volume d'heures nécessaire." },
                { title: "Leçons rapprochées", text: "Vos 20 heures sont planifiées de façon dense, du lundi au samedi." },
                { title: "Présentation à l'examen", text: "Dès que votre niveau est validé, nous demandons une place d'examen." },
              ]}
            />
            <p className="measure mt-10 rounded-md bg-beton p-5 text-asphalt/85">
              Les places d'examen sont attribuées par l'administration : une formation accélérée raccourcit votre apprentissage, mais aucune
              auto-école ne peut garantir une date d'examen ni la réussite.
            </p>
          </div>
        </Container>
      </section>

      <RoadTripCta title="Le permis moto en accéléré ? Faites-le en stage." text="Votre formation A2 regroupée sur deux semaines au Havre, avec un planning intensif et un hébergement en option." />

      <section className="bg-beton py-16">
        <Container>
          <h2 className="text-4xl">Financement CPF</h2>
          <p className="measure mt-3 text-lg text-asphalt/80">{school.cpf}</p>
          <Link href="/tarifs-financements/" className="mt-4 inline-block border-b-2 border-rouge font-semibold">Toutes les solutions de financement</Link>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

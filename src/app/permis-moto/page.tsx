import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, PackCard, PageHero, PriceNote, SectionTitle } from "@/components/ui";
import { TrackSlalom } from "@/components/TrackSlalom";
import { motoGear, packs, piste, requiredDocs } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { RoadTripCta } from "@/components/roadtrip/RoadTripCta";
import { asset } from "@/lib/asset";

export const metadata = pageMeta({
  title: "Permis moto au Havre : A1, A2, maxi scooter, passerelle A",
  description: "Moto-école au Havre reconnue par l'AFDM et la Mutuelle des Motards : permis A1, A2, A2 maxi scooter, passerelle A2 vers A, piste moto et Yamaha MT-03.",
  path: "/permis-moto/",
});

const categories = [
  { name: "A1", age: "Dès 16 ans", text: "Motos jusqu'à 125 cm³ et 11 kW, tricycles jusqu'à 15 kW." },
  { name: "A2", age: "Dès 18 ans", text: "Motos jusqu'à 35 kW, avec un rapport puissance / poids inférieur à 0,2 kW/kg." },
  { name: "A", age: "Après 2 ans d'A2", text: "Toutes les motos, après une formation obligatoire de 7 heures." },
];

export default function PermisMoto() {
  const motos = packs.filter((p) => p.category === "moto");
  return (
    <>
      <PageHero
        title="Le permis moto, enseigné par des motards"
        intro="Indiana est reconnue par l'Association pour la formation des motards et par l'Assurance Mutuelle des Motards. On vous apprend à passer l'examen, et surtout à rouler longtemps."
        image={asset("/images/piste-moto.jpg")}
        imageAlt="Un élève motard négocie un slalom entre des plots"
      >
        <Link href="/contact/?formation=moto-a2" className="btn btn-rouge">Demander mon inscription</Link>
      </PageHero>

      <section className="bg-asphalt py-20 text-marquage">
        <Container>
          <SectionTitle light title={piste.headline} intro={piste.body} />
          <TrackSlalom />
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-3xl">Ce que vous y travaillez</h3>
              <ul className="mt-4 space-y-2 text-marquage/80">
                <li>Maniabilité à allure lente, avec et sans passager</li>
                <li>Slalom, évitement et freinage d'urgence à allure plus soutenue</li>
                <li>Interrogation orale sur les 12 thèmes de l'examen</li>
              </ul>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-md">
              <Image src={asset("/images/piste-groupe.jpg")} alt="Plusieurs élèves motards en exercice sur une piste" fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionTitle title="Quel permis pour quelle moto ?" />
          <div className="grid gap-px overflow-hidden rounded-md bg-beton md:grid-cols-3">
            {categories.map((c) => (
              <div key={c.name} className="bg-marquage p-7">
                <p className="font-display text-7xl font-bold text-rouge">{c.name}</p>
                <p className="mt-1 font-semibold">{c.age}</p>
                <p className="mt-2 text-asphalt/75">{c.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-beton py-20">
        <Container>
          <SectionTitle title="Nos forfaits moto" intro="Formation plateau et circulation, accompagnement aux deux épreuves de l'examen." />
          <div className="grid gap-6 md:grid-cols-3">
            {motos.map((p, i) => <PackCard key={p.slug} pack={p} featured={i === 1} />)}
          </div>
          <PriceNote />
        </Container>
      </section>

      <RoadTripCta />

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-5xl">Votre équipement</h2>
            <p className="mt-3 text-asphalt/75">Obligatoire dès la première leçon, pour vous comme pour un éventuel passager.</p>
            <ul className="mt-5 space-y-2 text-lg">{motoGear.map((g) => <li key={g}>{g}</li>)}</ul>
            <p className="mt-3 text-sm text-gris">Les bottes en caoutchouc et les bottes coupe-vent ne sont pas acceptées.</p>
          </div>
          <div>
            <h2 className="text-5xl">Pour vous inscrire</h2>
            <ul className="mt-5 space-y-2 text-lg">
              {requiredDocs.common.map((d) => <li key={d}>{d}</li>)}
              <li>{requiredDocs.moto}</li>
            </ul>
          </div>
        </Container>
      </section>
      <CtaBand title="Prêt à monter en selle ?" />
    </>
  );
}

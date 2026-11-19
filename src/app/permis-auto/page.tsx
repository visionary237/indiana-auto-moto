import Link from "next/link";
import { Container, CtaBand, PackCard, PageHero, PriceNote, SectionTitle } from "@/components/ui";
import { packs, requiredDocs } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { asset } from "@/lib/asset";

export const metadata = pageMeta({
  title: "Permis B au Havre : boîte manuelle, automatique et conduite accompagnée",
  description: "Passez le permis B au Havre avec Indiana Auto-Moto : forfaits boîte manuelle, automatique, conduite accompagnée (AAC) dès 15 ans. Simulateur, code en ligne, CPF accepté.",
  path: "/permis-auto/",
});

export default function PermisAuto() {
  const autos = packs.filter((p) => p.category === "auto" && p.slug !== "auto-accelere");
  return (
    <>
      <PageHero
        title="Le permis B, de la première heure au jour de l'examen"
        intro="Boîte manuelle, boîte automatique ou conduite accompagnée : on construit avec vous la formule qui colle à votre âge, à votre budget et à votre emploi du temps."
        image={asset("/images/lecon-auto.jpg")}
        imageAlt="Une élève souriante au volant, son enseignant à ses côtés"
      >
        <Link href="/contact/?formation=auto" className="btn btn-rouge">Demander mon inscription</Link>
        <Link href="/formations-accelerees/" className="btn btn-ghost">Version accélérée</Link>
      </PageHero>

      <section className="py-20">
        <Container>
          <SectionTitle title="Nos forfaits auto" intro="Chaque forfait comprend les frais de dossier, l'aide administrative ANTS, le livret d'apprentissage, une évaluation et l'accompagnement à l'examen." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {autos.map((p, i) => <PackCard key={p.slug} pack={p} featured={i === 0} />)}
          </div>
          <PriceNote />
        </Container>
      </section>

      <section className="bg-beton py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-5xl">Manuelle ou automatique ?</h2>
            <p className="measure mt-4 text-asphalt/80">
              La boîte automatique demande moins d'heures (13 h incluses dans le forfait, contre 20 h en manuelle) et convient bien aux
              élèves qui appréhendent l'embrayage. Le permis obtenu est limité aux véhicules automatiques ; une formation de 7 heures permet
              ensuite de lever cette restriction.
            </p>
            <Link href="/stages/" className="mt-5 inline-block border-b-2 border-rouge font-semibold">Voir la passerelle boîte auto vers manuelle</Link>
          </div>
          <div>
            <h2 className="text-5xl">La conduite accompagnée</h2>
            <p className="measure mt-4 text-asphalt/80">
              Dès 15 ans, l'apprentissage anticipé de la conduite (AAC) permet de rouler avec un accompagnateur après la formation initiale.
              Le forfait inclut un rendez-vous préalable et deux rendez-vous pédagogiques pour faire le point avec l'enseignant.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-5xl">Pour vous inscrire</h2>
            <ul className="mt-5 space-y-2 text-lg">
              {requiredDocs.common.map((d) => <li key={d}>{d}</li>)}
              <li>{requiredDocs.autoMinor}</li>
              <li>{requiredDocs.autoMajor}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-5xl">Pour apprendre</h2>
            <ul className="mt-5 space-y-3 text-lg text-asphalt/85">
              <li><strong>Un simulateur</strong> pour les premières prises en main, sans stress.</li>
              <li><strong>Le code en salle</strong> avec un enseignant, et en ligne sur Prépacode.</li>
              <li><strong>Des leçons de 8h à 20h</strong> en semaine, et le samedi jusqu'à 16h.</li>
              <li><strong>Annulation gratuite</strong> d'une leçon jusqu'à 48 h avant, depuis votre espace en ligne.</li>
            </ul>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

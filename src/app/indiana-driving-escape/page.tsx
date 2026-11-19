import Image from "next/image";
import { Container, SectionTitle, Steps } from "@/components/ui";
import { EscapeConfigurator } from "@/components/EscapeConfigurator";
import { pageMeta } from "@/lib/seo";
import { asset } from "@/lib/asset";

export const metadata = pageMeta({
  title: "Indiana Driving Escape : deux semaines de permis au Havre (projet)",
  description: "Projet de séjour intensif de formation à la conduite au Havre pour les Franciliens : leçons auto ou moto, hébergement possible, découverte de la Normandie. Demandez votre devis.",
  path: "/indiana-driving-escape/",
});

const parcours = [
  { title: "Avant le départ", text: "Échange avec l'école, code préparé en ligne, dossier ANTS monté à distance, planning établi selon vos disponibilités." },
  { title: "Jours 1 et 2", text: "Évaluation de départ, prise en main, maniabilité. En moto, premiers exercices sur piste." },
  { title: "Jours 3 à 8", text: "Leçons quotidiennes en ville, sur la rocade et les routes du pays de Caux. Points d'étape avec votre enseignant." },
  { title: "Jours 9 et 10", text: "Vérification de niveau. Si une place d'examen est disponible, présentation accompagnée. Sinon, un plan de suite vous est remis." },
];

export default function DrivingEscape() {
  return (
    <>
      <div className="bg-asphalt py-3 text-center text-sm text-marquage" role="note">
        <Container>
          <strong>Projet en cours de validation.</strong> Dates, hébergements partenaires et conditions ne sont pas encore confirmés.
          Les demandes reçues nous aident à construire le séjour et ne valent pas réservation.
        </Container>
      </div>

      <section className="relative overflow-hidden bg-manche text-marquage">
        <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="font-display text-2xl font-semibold text-marquage/70">Indiana Driving Escape</p>
            <h1 className="mt-2 text-[clamp(3rem,7vw,6rem)] leading-[0.95]">Deux semaines au Havre. La route, la mer, le permis en ligne de mire.</h1>
            <p className="measure mt-6 text-lg text-marquage/85">
              À deux heures de Paris, un séjour pour se consacrer pleinement à sa formation : leçons tous les jours, hébergement sur place si
              besoin, et des fins de journée entre la plage du Havre, Étretat et Honfleur.
            </p>
            <a href="#configurateur" className="btn btn-rouge mt-8">Configurer mon séjour</a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image src={asset("/images/lecon-auto.jpg")} alt="Une élève conduit, accompagnée de son enseignant" fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </Container>
        <div className="lane text-marquage/40" aria-hidden="true" />
      </section>

      <section className="py-20">
        <Container>
          <SectionTitle title="Pourquoi venir se former en Normandie ?" />
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { t: "Du temps pour soi", d: "Deux semaines sans trajets entre travail, études et leçons : vous êtes là pour apprendre." },
              { t: "Une circulation variée", d: "Ville portuaire, rocade, routes de campagne et côtières : un terrain complet pour progresser." },
              { t: "Une école reconnue", d: "Agréée, certifiée Qualiopi, reconnue par l'AFDM et la Mutuelle des Motards." },
            ].map((x) => (
              <div key={x.t} className="border-t-4 border-manche pt-4">
                <h3 className="text-3xl">{x.t}</h3>
                <p className="mt-2 text-asphalt/75">{x.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-beton py-20">
        <Container>
          <SectionTitle title="Le parcours pédagogique envisagé" intro="Base de travail sur 10 jours ouvrés, ajustée après votre évaluation de départ." />
          <Steps steps={parcours} />
          <p className="measure mt-10 text-asphalt/80">
            Nous ne garantissons ni l'obtention du permis ni une date d'examen : les places sont attribuées par l'administration et la réussite
            dépend de votre progression. Si l'examen ne peut avoir lieu pendant le séjour, nous vous présentons à une date ultérieure.
          </p>
        </Container>
      </section>

      <section id="configurateur" className="scroll-mt-24 py-20">
        <Container>
          <SectionTitle title="Configurez votre séjour" intro="Choisissez votre formule, découvrez une estimation de la partie formation et demandez votre devis. Réponse personnalisée dès que le séjour est ouvert." />
          <EscapeConfigurator />
        </Container>
      </section>
    </>
  );
}

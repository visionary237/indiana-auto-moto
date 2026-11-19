import Image from "next/image";
import { Container, CtaBand, PageHero, Recognitions, Reviews, SectionTitle } from "@/components/ui";
import { fleet, school, team } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { asset } from "@/lib/asset";

export const metadata = pageMeta({
  title: "Notre équipe, nos véhicules, notre méthode",
  description: "Enseignants de la conduite auto et moto, Yamaha MT-03, simulateur, programme REMC : découvrez l'équipe et les méthodes d'Indiana Auto-Moto au Havre.",
  path: "/equipe/",
});

export default function Equipe() {
  return (
    <>
      <PageHero
        title="Une équipe de passionnés, au volant comme au guidon"
        intro="Une école indépendante, membre d'un réseau sans franchise, qui partage une conviction : bien enseigner la conduite, et toujours chercher à mieux le faire."
        image={asset("/images/moniteur-evaluation.jpg")}
        imageAlt="Enseignant de la conduite échangeant avec une élève dans la voiture"
      />

      <section className="py-20">
        <Container>
          <SectionTitle title="Vos enseignants" intro="Les enseignants de la conduite sont diplômés d'État. Chacun vous suit sur la durée, pour que vous ne repartiez pas de zéro à chaque leçon." />
          <ul className="grid gap-6 md:grid-cols-3">
            {team.map((m, i) => (
              <li key={i} className={`rounded-md p-6 ${m.placeholder ? "border-2 border-dashed border-beton" : "bg-white"}`}>
                <div className="relative mb-5 aspect-square overflow-hidden rounded bg-beton">
                  {m.photo ? <Image src={m.photo} alt={m.name} fill className="object-cover" /> : <span className="absolute inset-0 grid place-items-center font-display text-xl text-gris">Photo à venir</span>}
                </div>
                <h3 className="text-2xl">{m.name}</h3>
                <p className="font-semibold text-rouge">{m.role}</p>
                <p className="mt-2 text-asphalt/75">{m.bio}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-asphalt py-20 text-marquage">
        <Container>
          <SectionTitle light title="Le matériel" intro="Des outils choisis pour chaque étape de l'apprentissage." />
          <ul className="grid gap-px overflow-hidden rounded-md bg-asphalt-2 md:grid-cols-3">
            {fleet.map((f) => (
              <li key={f.name} className="bg-asphalt p-7">
                <p className="text-marquage/60">{f.kind}</p>
                <p className="font-display text-4xl font-bold">{f.name}</p>
                <p className="mt-2 text-marquage/75">{f.note}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionTitle title="Notre méthode" intro="L'école applique le programme national REMC et y ajoute ses propres repères pédagogiques, techniques et matériels." />
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { t: "Un contrat clair", d: "Un contrat de formation précise dès le départ les modalités de votre apprentissage." },
              { t: "Un livret qui vous suit", d: "Votre livret d'apprentissage retrace chaque compétence travaillée et validée." },
              { t: "Une vérification finale", d: "Avant l'examen, l'école contrôle votre niveau théorique et pratique." },
            ].map((x) => (
              <div key={x.t} className="border-t-4 border-asphalt pt-4">
                <h3 className="text-3xl">{x.t}</h3>
                <p className="mt-2 text-asphalt/75">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-14"><Recognitions /></div>
          <p className="mt-6 text-sm text-gris">Agrément préfectoral n° {school.agrement}</p>
          <div className="mt-14"><Reviews /></div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

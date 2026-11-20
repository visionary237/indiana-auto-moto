import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, Recognitions, Reviews, SectionTitle, Steps } from "@/components/ui";
import { TrackSlalom } from "@/components/TrackSlalom";
import { HeroIntro } from "@/components/HeroIntro";
import { RoadTripTeaser } from "@/components/roadtrip/RoadTripTeaser";
import { euro, packs, piste, school, stages } from "@/lib/content";
import { asset } from "@/lib/asset";

const method = [
  { title: "Évaluation de départ", text: "Un premier rendez-vous au volant ou au guidon pour estimer le nombre d'heures dont vous aurez besoin. Le simulateur aide aux premières prises en main en auto." },
  { title: "Le code, à votre rythme", text: "Cours en salle animés par un enseignant et entraînement en ligne sur Prépacode, suivi par l'école." },
  { title: "La conduite, en situation réelle", text: "Leçons du lundi au samedi selon le programme national REMC : ville, rocade, voies rapides, et piste pour le plateau moto." },
  { title: "Vérification avant l'examen", text: "Avant de vous présenter, l'école vérifie votre niveau théorique et pratique. Vous y allez quand vous êtes prêt." },
];

export default function Home() {
  const auto = packs.find((p) => p.slug === "auto")!;
  return (
    <>
      <HeroIntro />
      <RoadTripTeaser />

      {/* Deux voies : auto ou moto */}
      <section className="py-20">
        <Container>
          <SectionTitle title="Deux roues ou quatre, la même exigence" intro="Choisissez votre formation. Les forfaits incluent les frais de dossier, l'aide administrative ANTS et le livret d'apprentissage." />
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { href: "/permis-auto/", title: "Permis auto", img: asset("/images/lecon-auto.jpg"), alt: "Une élève au volant avec son enseignant de la conduite", from: auto.price, desc: "Boîte manuelle ou automatique, conduite accompagnée dès 15 ans, passerelle vers la boîte manuelle." },
              { href: "/permis-moto/", title: "Permis moto", img: asset("/images/plateau-moto.jpg"), alt: "Un élève motard sur une piste de maniabilité balisée", from: packs.find((p) => p.slug === "moto-a1")!.price, desc: "A1, A2, A2 maxi scooter, passerelle A2 vers A et permis AM, avec une Yamaha MT-03 dans la flotte." },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group relative block overflow-hidden rounded-md bg-asphalt text-marquage">
                <div className="relative aspect-[16/10]">
                  <Image src={c.img} alt={c.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="font-semibold text-marquage/80">à partir de {euro(c.from)} TTC</p>
                  <h3 className="text-5xl md:text-6xl">{c.title}</h3>
                  <p className="measure mt-2 text-marquage/80">{c.desc}</p>
                  <span className="mt-4 inline-block border-b-2 border-rouge pb-0.5 font-display text-xl font-bold">Voir les formations</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* L'argument fort : la piste */}
      <section className="bg-asphalt py-20 text-marquage" aria-labelledby="piste-titre">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <div>
              <h2 id="piste-titre" className="text-[clamp(2.6rem,5vw,4.6rem)]">{piste.headline}</h2>
            </div>
            <p className="measure text-lg text-marquage/80">{piste.body}</p>
          </div>
          <div className="mt-12">
            <TrackSlalom />
          </div>
          <dl className="mt-10 grid gap-8 sm:grid-cols-3">
            {piste.facts.map((f) => (
              <div key={f.label} className="border-l-4 border-rouge pl-5">
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-5xl font-bold">{f.value}</dd>
                <dd className="text-marquage/70">{f.label}</dd>
              </div>
            ))}
          </dl>
          <Link href="/permis-moto/" className="btn btn-rouge mt-12">Découvrir le permis moto</Link>
        </Container>
      </section>

      {/* Méthode : c'est un parcours, la numérotation a du sens */}
      <section className="py-20">
        <Container>
          <SectionTitle title="Comment se passe votre formation" intro="Un contrat de formation fixe les modalités dès l'inscription. Ensuite, quatre étapes, et votre motivation comme moteur." />
          <Steps steps={method} />
        </Container>
      </section>

      {/* Formations courtes et séjour */}
      <section className="bg-beton py-20">
        <Container>
          <SectionTitle title="Pressé, déjà titulaire, ou envie d'ailleurs ?" />
          <div className="grid gap-6 lg:grid-cols-3">
            <Link href="/formations-accelerees/" className="group rounded-md bg-white p-7 hover:outline hover:outline-2 hover:outline-asphalt">
              <p className="font-display text-5xl font-bold text-rouge">{euro(packs.find((p) => p.slug === "auto-accelere")!.price)}</p>
              <h3 className="mt-3 text-3xl">Permis B accéléré</h3>
              <p className="mt-2 text-asphalt/75">20 heures de conduite planifiées sur une période resserrée, finançable par le CPF sous conditions.</p>
            </Link>
            <Link href="/stages/" className="group rounded-md bg-white p-7 hover:outline hover:outline-2 hover:outline-asphalt">
              <p className="font-display text-5xl font-bold text-rouge">dès {euro(Math.min(...stages.map((s) => s.price)))}</p>
              <h3 className="mt-3 text-3xl">Stages et perfectionnement</h3>
              <p className="mt-2 text-asphalt/75">Formation 125 cm³, passerelle A2 vers A, permis AM, stage jeune conducteur, passage en boîte manuelle.</p>
            </Link>
            <Link href="/indiana-driving-escape/" className="group relative overflow-hidden rounded-md bg-manche p-7 text-marquage hover:outline hover:outline-2 hover:outline-asphalt">
              <p className="inline-block rounded-sm bg-white/15 px-2 py-0.5 text-sm font-semibold">Projet en préparation</p>
              <h3 className="mt-3 text-3xl">Indiana Driving Escape</h3>
              <p className="mt-2 text-marquage/80">Deux semaines au Havre pour se former intensivement, entre leçons, mer et falaises. Un projet pensé pour les Franciliens.</p>
              <span className="mt-4 inline-block border-b-2 border-marquage pb-0.5 font-display text-xl font-bold">Configurer mon séjour</span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionTitle title="Reconnue par les motards, certifiée pour la formation" intro={school.network} />
          <Recognitions />
          <div className="mt-12"><Reviews /></div>
        </Container>
      </section>

      <section className="border-t-2 border-beton py-16">
        <Container className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-4xl">Nous trouver</h2>
            <p className="mt-3 text-lg">{school.address.street}<br />{school.address.postalCode} {school.address.city}</p>
            <a href="https://www.google.com/maps/search/?api=1&query=108+rue+Jean-Jacques+Rousseau+76600+Le+Havre" target="_blank" rel="noopener" className="mt-3 inline-block border-b-2 border-rouge font-semibold">Itinéraire</a>
          </div>
          <div>
            <h3 className="text-2xl">Accueil et code</h3>
            <ul className="mt-2 text-asphalt/80">{school.hours.accueil.map((h) => <li key={h.days}>{h.days} : {h.slots}</li>)}</ul>
          </div>
          <div>
            <h3 className="text-2xl">Leçons auto et moto</h3>
            <ul className="mt-2 text-asphalt/80">{school.hours.conduite.map((h) => <li key={h.days}>{h.days} : {h.slots}</li>)}</ul>
            <p className="mt-3 font-semibold">{school.referral}</p>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

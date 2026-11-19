import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { euro, PRICES_DATE, school, type Pack, reviews } from "@/lib/content";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-5 lg:px-8 ${className}`}>{children}</div>;
}

export function PageHero({
  title, intro, image, imageAlt, children, tone = "light",
}: { title: string; intro: string; image?: string; imageAlt?: string; children?: ReactNode; tone?: "light" | "manche" }) {
  const manche = tone === "manche";
  return (
    <section className={manche ? "bg-manche text-marquage" : "bg-beton"}>
      <Container className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h1 className="text-[clamp(2.8rem,6vw,5.2rem)]">{title}</h1>
          <p className={`measure mt-5 text-lg md:text-xl ${manche ? "text-marquage/85" : "text-asphalt/80"}`}>{intro}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image src={image} alt={imageAlt ?? ""} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
        )}
      </Container>
    </section>
  );
}

export function SectionTitle({ title, intro, light = false }: { title: string; intro?: string; light?: boolean }) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="text-[clamp(2.1rem,4vw,3.4rem)]">{title}</h2>
      {intro && <p className={`measure mt-4 text-lg ${light ? "text-marquage/80" : "text-asphalt/75"}`}>{intro}</p>}
    </div>
  );
}

/** Carte tarif façon panneau : le prix est l'information principale. */
export function PackCard({ pack, featured = false }: { pack: Pack; featured?: boolean }) {
  return (
    <article className={`flex flex-col rounded-md border-2 p-6 ${featured ? "border-asphalt bg-asphalt text-marquage" : "border-beton bg-white"}`}>
      <h3 className="text-[1.75rem]">{pack.name}</h3>
      <p className={`mt-1 ${featured ? "text-marquage/70" : "text-gris"}`}>{pack.hours}{pack.minAge ? `, ${pack.minAge.toLowerCase()}` : ""}</p>
      <p className="mt-5 flex items-baseline gap-3">
        <span className="font-display text-5xl font-extrabold">{euro(pack.price)}</span>
        {pack.oldPrice && <s className={featured ? "text-marquage/55" : "text-gris"}>{euro(pack.oldPrice)}</s>}
      </p>
      <p className={`text-sm ${featured ? "text-marquage/60" : "text-gris"}`}>TTC</p>
      <ul className="mt-5 flex-1 space-y-2 text-[.98rem]">
        {pack.includes.map((i) => (
          <li key={i} className="flex gap-2.5">
            <svg className="mt-1.5 h-3 w-3 shrink-0 text-rouge" viewBox="0 0 12 12" aria-hidden="true"><rect width="12" height="12" rx="2" fill="currentColor" /></svg>
            <span>{i}</span>
          </li>
        ))}
      </ul>
      {pack.note && <p className={`mt-4 text-sm ${featured ? "text-marquage/60" : "text-gris"}`}>{pack.note}</p>}
      <Link href={`/contact/?formation=${pack.slug}`} className={`btn mt-6 ${featured ? "btn-rouge" : "btn-ghost"}`}>
        Demander cette formation
      </Link>
    </article>
  );
}

export function PriceNote() {
  return (
    <p className="mt-6 text-sm text-gris">
      Tarifs TTC relevés sur le site de l'école le {PRICES_DATE}, susceptibles d'évoluer. Paiement en 2 ou 3 fois sans frais sur certains forfaits.
      Le nombre d'heures indiqué est un forfait : le volume réellement nécessaire est fixé lors de l'évaluation de départ.
    </p>
  );
}

export function Recognitions({ dark = false }: { dark?: boolean }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-md sm:grid-cols-2 lg:grid-cols-5" style={{ background: dark ? "#2a2f34" : "#e4e6e3" }}>
      {school.recognitions.map((r) => (
        <li key={r.name} className={`p-5 ${dark ? "bg-asphalt" : "bg-marquage"}`}>
          <p className="font-display text-2xl font-bold">{r.name}</p>
          <p className={`mt-1 text-sm ${dark ? "text-marquage/70" : "text-gris"}`}>{r.detail}</p>
        </li>
      ))}
    </ul>
  );
}

export function Reviews() {
  if (reviews.length === 0) {
    return (
      <div className="rounded-md border-2 border-dashed border-beton p-8">
        <p className="font-display text-2xl font-bold">Ce qu'en disent nos élèves</p>
        <p className="measure mt-2 text-asphalt/75">
          Nous publions uniquement des avis vérifiables, laissés par d'anciens élèves sur des plateformes indépendantes.
          Vous avez passé votre permis chez nous ? Votre retour aide les prochains élèves.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="btn btn-ghost" href="https://www.indiana-auto-ecole.fr/pub/IndianaLivreDor.pdf" target="_blank" rel="noopener">Lire le livre d'or</a>
        </div>
      </div>
    );
  }
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {reviews.map((r) => (
        <li key={r.author + r.date} className="rounded-md bg-white p-6">
          <p aria-label={`${r.rating} sur 5`} className="text-rouge">{"★".repeat(r.rating)}</p>
          <blockquote className="mt-3">{r.text}</blockquote>
          <p className="mt-4 text-sm text-gris">{r.author}, {r.date}, avis {r.source}</p>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({ title = "On commence quand ?", text = "Passez à l'agence, appelez-nous ou envoyez votre demande : on vous rappelle pour faire le point sur votre projet et organiser l'évaluation de départ." }: { title?: string; text?: string }) {
  return (
    <section className="bg-rouge text-white">
      <Container className="flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <div>
          <h2 className="text-[clamp(2.2rem,4vw,3.4rem)]">{title}</h2>
          <p className="measure mt-2 text-white/85">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact/" className="btn bg-white text-rouge hover:bg-asphalt hover:text-white">Envoyer ma demande</Link>
          <a href={school.phoneHref} className="btn btn-ghost btn-ghost-light">{school.phone}</a>
        </div>
      </Container>
    </section>
  );
}

export function Steps({ steps, light = false }: { steps: { title: string; text: string }[]; light?: boolean }) {
  return (
    <ol className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <span className={`font-display text-6xl font-extrabold ${light ? "text-marquage/25" : "text-rouge"}`}>{i + 1}</span>
          <h3 className="mt-2 text-2xl">{s.title}</h3>
          <p className={`mt-2 ${light ? "text-marquage/75" : "text-asphalt/75"}`}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

import Link from "next/link";
import { Logo } from "./Logo";
import { documents, nav, school } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-asphalt text-marquage">
      <div className="lane text-rouge" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo light />
          <p className="mt-5 text-marquage/75">
            {school.address.street}
            <br />
            {school.address.postalCode} {school.address.city}
          </p>
          <p className="mt-3">
            <a href={school.phoneHref} className="font-display text-2xl font-bold hover:text-rouge">{school.phone}</a>
            <br />
            <a href={`mailto:${school.email}`} className="text-marquage/75 underline-offset-4 hover:underline">{school.email}</a>
          </p>
        </div>

        <div>
          <h2 className="text-2xl">Horaires</h2>
          <p className="mt-4 font-semibold">Accueil, inscriptions et code</p>
          <ul className="text-marquage/75">
            {school.hours.accueil.map((h) => <li key={h.days}>{h.days} : {h.slots}</li>)}
          </ul>
          <p className="mt-3 font-semibold">Leçons auto et moto</p>
          <ul className="text-marquage/75">
            {school.hours.conduite.map((h) => <li key={h.days}>{h.days} : {h.slots}</li>)}
          </ul>
          <p className="mt-2 text-sm text-marquage/60">{school.hours.closed}</p>
        </div>

        <div>
          <h2 className="text-2xl">Formations</h2>
          <ul className="mt-4 space-y-1.5">
            {nav.map((n) => (
              <li key={n.href}><Link className="text-marquage/75 hover:text-marquage" href={n.href}>{n.label}</Link></li>
            ))}
            <li><Link className="text-marquage/75 hover:text-marquage" href="/indiana-driving-escape/">Driving Escape (séjour auto)</Link></li>
            <li><Link className="text-marquage/75 hover:text-marquage" href="/guides/permis-moto-en-deux-semaines/">Guide : le permis moto en deux semaines</Link></li>
            <li><Link className="text-marquage/75 hover:text-marquage" href="/contact/">Contact et inscription</Link></li>
          </ul>
        </div>

        <div>
          <Link href="/stage-moto-normandie/" className="mb-8 block rounded-md bg-foret p-5 hover:bg-foret-light">
            <span className="block font-editorial text-3xl text-sable">Indiana Road Trip</span>
            <span className="text-sm text-sable/80">Stage moto et séjour en Normandie</span>
          </Link>
          <h2 className="text-2xl">Documents</h2>
          <ul className="mt-4 space-y-1.5">
            {documents.map((d) => (
              <li key={d.href}><a className="text-marquage/75 hover:text-marquage" href={d.href} target="_blank" rel="noopener">{d.label}</a></li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-marquage/60">
            Agrément préfectoral n° {school.agrement}
            <br />Certifiée Qualiopi et Datadock
          </p>
        </div>
      </div>
      <div className="border-t border-asphalt-2">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-marquage/55 md:flex-row md:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} {school.legalName}, capital {school.capital}, {school.rcs}. Directrice de la publication : {school.publicationDirector}.</p>
          <p>
            <a className="hover:text-marquage" href="https://www.indiana-auto-ecole.fr/pages/mentions-legales">Mentions légales</a>
            {"  /  "}
            <a className="hover:text-marquage" href="https://www.indiana-auto-ecole.fr/pages/conditons-generales-de-vente">CGV</a>
            {"  /  "}
            <a className="hover:text-marquage" href="https://www.indiana-auto-ecole.fr/pages/politique-de-confidentialite">Confidentialité</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

import { ContactForm } from "@/components/ContactForm";
import { Container, PageHero } from "@/components/ui";
import { requiredDocs, school } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact et inscription",
  description: "Inscrivez-vous au permis auto ou moto chez Indiana Auto-Moto, 108 rue Jean-Jacques Rousseau au Havre. Tél. 02 35 41 27 06.",
  path: "/contact/",
});

export default function Contact() {
  return (
    <>
      <PageHero title="Contact et inscription" intro="Envoyez votre demande : l'accueil vous rappelle pour fixer l'évaluation de départ et finaliser votre dossier." />
      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <ContactForm />
          <aside className="space-y-8">
            <div>
              <h2 className="text-3xl">À l'agence</h2>
              <p className="mt-2 text-lg">{school.address.street}<br />{school.address.postalCode} {school.address.city}</p>
              <p className="mt-2"><a href={school.phoneHref} className="font-display text-3xl font-bold text-rouge">{school.phone}</a></p>
              <p><a href={`mailto:${school.email}`} className="underline underline-offset-4">{school.email}</a></p>
            </div>
            <div>
              <h2 className="text-3xl">Horaires d'accueil</h2>
              <ul className="mt-2">{school.hours.accueil.map((h) => <li key={h.days}>{h.days} : {h.slots}</li>)}</ul>
            </div>
            <div>
              <h2 className="text-3xl">À apporter</h2>
              <ul className="mt-2 space-y-1">
                {requiredDocs.common.map((d) => <li key={d}>{d}</li>)}
                <li>{requiredDocs.autoMinor}</li>
                <li>{requiredDocs.autoMajor}</li>
              </ul>
            </div>
            <iframe
              title="Plan d'accès à Indiana Auto-Moto"
              className="aspect-[4/3] w-full rounded-md border-0"
              loading="lazy"
              src="https://www.google.com/maps?q=108+rue+Jean-Jacques+Rousseau+76600+Le+Havre&output=embed"
            />
          </aside>
        </Container>
      </section>
    </>
  );
}

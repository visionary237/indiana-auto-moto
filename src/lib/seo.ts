import type { Metadata } from "next";
import { SITE_URL, packs, school, stages } from "./content";

export function pageMeta(opts: { title: string; description: string; path: string }): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: { title: opts.title, description: opts.description, url, siteName: school.name, locale: "fr_FR", type: "website" },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    name: school.name,
    alternateName: "Auto Moto École Indiana",
    url: SITE_URL,
    telephone: "+33235412706",
    email: school.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: school.address.street,
      postalCode: school.address.postalCode,
      addressLocality: school.address.city,
      addressRegion: school.address.region,
      addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: school.geo.lat, longitude: school.geo.lng },
    areaServed: ["Le Havre", "Sainte-Adresse", "Montivilliers", "Harfleur", "Gonfreville-l'Orcher", "Octeville-sur-Mer", "Seine-Maritime"],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "14:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "12:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "14:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "15:00" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Formations au permis de conduire",
      itemListElement: [...packs, ...stages].map((p) => ({
        "@type": "Offer",
        price: p.price,
        priceCurrency: "EUR",
        itemOffered: { "@type": "Course", name: p.name, provider: { "@type": "Organization", name: school.name } },
      })),
    },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

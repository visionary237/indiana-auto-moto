import { Container, CtaBand, PageHero, SectionTitle } from "@/components/ui";
import { documents, euro, packs, PRICES_DATE, school, stages, unitPrices } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { RoadTripCta } from "@/components/roadtrip/RoadTripCta";

export const metadata = pageMeta({
  title: "Tarifs du permis au Havre et financements (CPF, paiement en plusieurs fois)",
  description: "Tous les tarifs d'Indiana Auto-Moto : forfaits permis B, AAC, moto A1, A2, stages et prestations à l'unité. CPF, paiement en 2 ou 3 fois, permis à 1 € par jour.",
  path: "/tarifs-financements/",
});

function Table({ caption, rows }: { caption: string; rows: { label: string; detail?: string; price: number }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left">
        <caption className="mb-3 text-left font-display text-3xl font-bold">{caption}</caption>
        <thead>
          <tr className="border-b-2 border-asphalt text-sm text-gris">
            <th className="py-2 font-semibold">Prestation</th>
            <th className="py-2 font-semibold">Contenu</th>
            <th className="py-2 text-right font-semibold">Prix TTC</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-beton">
              <td className="py-3 pr-4 font-semibold">{r.label}</td>
              <td className="py-3 pr-4 text-asphalt/70">{r.detail}</td>
              <td className="py-3 text-right font-display text-2xl font-bold">{euro(r.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Tarifs() {
  return (
    <>
      <PageHero title="Tarifs et financements" intro={`Des prix affichés en clair, frais de dossier compris dans les forfaits. Tarifs TTC au ${PRICES_DATE}.`} />
      <section className="py-20">
        <Container className="space-y-16">
          <Table caption="Forfaits permis" rows={packs.map((p) => ({ label: p.name, detail: p.hours, price: p.price }))} />
          <Table caption="Stages" rows={stages.map((p) => ({ label: p.name, detail: p.hours, price: p.price }))} />
          <Table caption="Prestations à l'unité" rows={unitPrices.map((u) => ({ label: u.label, price: u.price }))} />
        </Container>
      </section>

      <RoadTripCta title="Stage moto et séjour : la formule tout compris" text="Formation A2, hébergement et accompagnement réunis dans une seule formule de deux semaines au Havre." />

      <section className="bg-beton py-20">
        <Container>
          <SectionTitle title="Financer votre permis" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Compte personnel de formation", d: school.cpf },
              { t: "Paiement en 2 ou 3 fois", d: "Sans frais, sur certains forfaits. Le premier versement intervient à l'inscription." },
              { t: "Permis à 1 € par jour", d: "Prêt à taux zéro de l'État pour les 15-25 ans, en partenariat avec des banques. Sous conditions." },
              { t: "Parrainage", d: `${school.referral} Non cumulable avec les offres nouveaux clients.` },
            ].map((x) => (
              <div key={x.t} className="rounded-md bg-white p-6">
                <h3 className="text-2xl">{x.t}</h3>
                <p className="mt-2 text-asphalt/75">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8"><a href={documents[0].href} className="border-b-2 border-rouge font-semibold" target="_blank" rel="noopener">Télécharger le guide « Financer son permis »</a></p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

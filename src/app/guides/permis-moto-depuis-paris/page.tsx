import { GuideLayout } from "@/components/GuideLayout";
import { pageMeta } from "@/lib/seo";

const PATH = "/guides/permis-moto-depuis-paris/";
export const metadata = pageMeta({
  title: "Passer son permis moto hors Île-de-France, en venant de Paris",
  description: "S'inscrire dans une moto-école d'un autre département, venir au Havre depuis Paris, organiser son stage de permis moto intensif : le mode d'emploi.",
  path: PATH,
});

export default function Page() {
  return (
    <GuideLayout
      path={PATH}
      title="Passer son permis moto en Normandie quand on vit à Paris"
      updated="2026-11-20"
      answer="Vous pouvez vous inscrire dans une moto-école d'un autre département que le vôtre. Le Havre est à environ 2 h 10 de Paris Saint-Lazare en train direct. Vous passez le code moto près de chez vous, puis vous suivez la formation et les épreuves pratiques au Havre."
      sections={[
        { h: "S'inscrire dans une école hors de chez soi", body: <>
          <p>Aucune règle ne vous oblige à passer le permis là où vous habitez. L'école qui vous forme monte votre dossier sur le site de l'ANTS et vous présente aux épreuves pratiques dans son département.</p>
          <p>Le code moto (ETM), lui, se passe dans n'importe quel centre agréé en France. Le plus simple : le réussir près de chez vous, avant le stage.</p>
        </> },
        { h: "Venir au Havre", body: <ul>
          <li><strong>En train :</strong> des TER directs relient Paris Saint-Lazare à la gare du Havre en 2 h 10 environ.</li>
          <li><strong>En voiture :</strong> un peu plus de deux heures par l'autoroute A13.</li>
          <li><strong>Sur place :</strong> l'école Indiana Auto-Moto est située 108 rue Jean-Jacques Rousseau, au Havre.</li>
        </ul> },
        { h: "Organiser ses deux semaines", body: <>
          <p>Posez deux semaines de congés consécutives. Les leçons ont lieu du lundi au samedi ; le dimanche est libre. Un hébergement peut vous être proposé en option, près de l'école.</p>
          <p>Avant de réserver, comparez avec la formation que vous propose une moto-école près de chez vous : prix de la formation seule, délai annoncé, nombre de trajets.</p>
        </> },
      ]}
      faq={[
        { q: "Mon permis sera-t-il différent s'il est passé en Normandie ?", a: "Non. Le permis de conduire est national : il est le même quel que soit le département où vous passez l'examen." },
        { q: "Les délais d'examen sont-ils plus courts au Havre ?", a: "Les délais varient selon les départements et les périodes. Nous vous indiquons la situation constatée au moment de votre demande de devis, sans promesse de date." },
      ]}
    />
  );
}

import { GuideLayout } from "@/components/GuideLayout";
import { euro } from "@/lib/content";
import { prixCode, prixFormationA2, heureSup } from "@/lib/roadtrip";
import { pageMeta } from "@/lib/seo";

const PATH = "/guides/prix-stage-permis-moto-hebergement/";
export const metadata = pageMeta({
  title: "Prix d'un stage de permis moto accéléré avec hébergement",
  description: "Formation, frais d'organisation, hébergement, code, heures supplémentaires : comment se calcule le prix d'un stage de permis moto intensif avec logement.",
  path: PATH,
});

export default function Page() {
  return (
    <GuideLayout
      path={PATH}
      title="Combien coûte un stage de permis moto avec hébergement ?"
      updated="2026-11-20"
      answer={`Le prix d'un stage additionne plusieurs éléments : la formation au permis (${euro(prixFormationA2)} TTC pour le permis A2 chez Indiana Auto-Moto), des frais d'organisation du stage et, si vous le choisissez, l'hébergement. Ces deux derniers montants figurent dans un devis personnalisé. Le transport et les repas restent à votre charge.`}
      sections={[
        { h: "Ce qui compose le prix", body: <ul>
          <li><strong>La formation A2 :</strong> {euro(prixFormationA2)} TTC au tarif de l'école, avec 20 heures de conduite, les frais de dossier, le livret, une évaluation et l'accompagnement aux deux épreuves.</li>
          <li><strong>La préparation au code moto :</strong> {euro(prixCode)} si vous ne l'avez pas encore (formation en ligne et redevance d'examen).</li>
          <li><strong>Les frais d'organisation du stage :</strong> le planning intensif, la coordination des leçons et du logement, le suivi avant et pendant le séjour. Montant précisé dans le devis.</li>
          <li><strong>L'hébergement :</strong> en option, 13 nuits, selon le logement choisi. Montant précisé dans le devis.</li>
          <li><strong>Les heures supplémentaires :</strong> {euro(heureSup)} l'heure, uniquement si votre moniteur les juge utiles et avec votre accord.</li>
        </ul> },
        { h: "Ce qui n'est pas compris", body: <p>Le transport jusqu'au Havre, les repas, les sorties et les activités touristiques. Le passage des épreuves pratiques du permis, lui, est gratuit.</p> },
        { h: "Pourquoi un devis plutôt qu'un prix unique ?", body: <p>Le total dépend de vos choix : avec ou sans hébergement, code déjà obtenu ou non, période. Un devis détaillé ligne par ligne évite les mauvaises surprises : vous savez exactement ce que vous payez avant de vous engager.</p> },
        { h: "Comment comparer avec une moto-école près de chez soi ?", body: <p>Comparez la formation seule entre elles, puis ajoutez de chaque côté ce qui s'y rattache : les trajets répétés pour une formation locale, l'organisation et le logement pour un stage. Le comparateur de notre page stage fait ce calcul avec vos propres chiffres.</p> },
      ]}
      faq={[
        { q: "Le prix affiché de 790 € est-il le prix du stage ?", a: `Non. ${euro(prixFormationA2)} correspond à la formation au permis A2 au tarif de l'école. Le prix du stage ajoute les frais d'organisation et, en option, l'hébergement, précisés dans votre devis.` },
        { q: "Le CPF peut-il financer le stage ?", a: "La formation peut être financée par le CPF sous réserve d'éligibilité professionnelle, dans le cadre d'un premier permis. L'école vous aide à vérifier votre situation." },
      ]}
    />
  );
}

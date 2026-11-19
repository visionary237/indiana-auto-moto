import { Accordion } from "@/components/Accordion";
import { Container, CtaBand, JsonLd, PageHero } from "@/components/ui";
import { faqJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Questions fréquentes sur le permis auto et moto",
  description: "Âge minimum, documents à fournir, CPF, annulation de leçon, équipement moto, délais d'examen : les réponses d'Indiana Auto-Moto au Havre.",
  path: "/faq/",
});

const faq = [
  { q: "À partir de quel âge puis-je m'inscrire ?", a: "Dès 15 ans pour la conduite accompagnée, 16 ans pour le permis A1 et 18 ans pour le permis A2. Le permis B peut être passé à partir de 17 ans. Avant 18 ans, l'accord d'un représentant légal est nécessaire." },
  { q: "Quels documents dois-je apporter ?", a: "Deux photos d'identité, six timbres et une pièce d'identité. Ajoutez l'attestation de recensement si vous avez moins de 18 ans, ou le certificat de participation à la JDC si vous avez 18 ans ou plus. Pour la moto, apportez votre permis si vous en avez déjà un." },
  { q: "Puis-je payer avec mon CPF ?", a: "Oui pour l'auto, la moto et la formation accélérée, sous réserve d'éligibilité professionnelle dans le cadre d'un premier permis. L'accueil vous aide à faire la démarche (aide administrative CPF)." },
  { q: "Combien d'heures de conduite me faudra-t-il ?", a: "Les forfaits comprennent 13 à 20 heures selon la formule. Le volume réellement nécessaire dépend de chacun : l'évaluation de départ permet de l'estimer, et les heures supplémentaires sont facturées 60 € TTC l'unité." },
  { q: "Et si je dois annuler une leçon ?", a: "Annulez depuis votre espace en ligne au moins 48 heures à l'avance : la leçon est recréditée. Une leçon annulée plus tard, ou directement auprès de l'enseignant, reste due, sauf motif légitime justifié par écrit." },
  { q: "Puis-je payer en plusieurs fois ?", a: "Oui, en 2 ou 3 fois sans frais sur certains forfaits. Le dispositif « permis à 1 € par jour » est également accepté, sous conditions." },
  { q: "Quel équipement faut-il pour la moto ?", a: "Casque homologué, gants homologués CE, blouson à manches longues, pantalon ou combinaison, bottes ou chaussures montantes. Les bottes en caoutchouc ne sont pas acceptées." },
  { q: "Pouvez-vous me garantir une date d'examen ?", a: "Non. Les places d'examen sont attribuées par l'administration. Nous vous présentons dès que votre niveau est validé et vous accompagnons le jour J, mais aucune école ne peut garantir une date ni le résultat." },
  { q: "J'ai un droit de rétractation ?", a: "Oui, 14 jours calendaires à compter de l'achat, sans avoir à vous justifier. Les prestations déjà consommées restent dues au prorata." },
  { q: "Comment fonctionne le parrainage ?", a: "Pour chaque élève que vous parrainez et qui s'inscrit, vous recevez une heure de conduite offerte. L'offre n'est pas cumulable avec les offres nouveaux clients." },
];

export default function Faq() {
  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <PageHero title="Vos questions, nos réponses" intro="Vous ne trouvez pas votre réponse ? L'accueil vous répond par téléphone ou à l'agence." />
      <section className="py-20">
        <Container className="max-w-4xl">
          <Accordion items={faq} />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

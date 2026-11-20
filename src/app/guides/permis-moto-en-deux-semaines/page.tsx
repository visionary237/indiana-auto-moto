import { GuideLayout } from "@/components/GuideLayout";
import { pageMeta } from "@/lib/seo";

const PATH = "/guides/permis-moto-en-deux-semaines/";
const TITLE = "Peut-on passer son permis moto en deux semaines ?";
export const metadata = pageMeta({
  title: "Permis moto en deux semaines : est-ce possible ?",
  description: "Code moto, 20 heures minimum, épreuves plateau et circulation, places d'examen : ce qui est réaliste quand on passe son permis moto A2 en stage intensif.",
  path: PATH,
});

export default function Page() {
  return (
    <GuideLayout
      path={PATH}
      title={TITLE}
      updated="2026-11-20"
      answer="Oui, c'est possible, mais jamais garanti. Les 20 heures de formation du permis A2 tiennent sur deux semaines. Pour passer l'examen à la fin, il faut avoir réussi le code moto avant, avoir le niveau requis et obtenir une place d'examen, attribuée par l'administration."
      sections={[
        { h: "Ce que la réglementation impose", body: <>
          <p>Le permis A2 demande au minimum 20 heures de formation pratique : une partie sur piste, hors circulation, puis une partie en circulation. Sur deux semaines, cela représente environ deux heures de conduite par jour de leçon.</p>
          <p>Avant les épreuves pratiques, il faut avoir réussi l'examen théorique moto (ETM). Il se passe dans un centre agréé, partout en France : vous pouvez le réussir près de chez vous avant de partir.</p>
        </> },
        { h: "Ce qui ne dépend pas de vous", body: <>
          <p>L'examen pratique se passe en deux temps : l'épreuve sur piste, puis l'épreuve en circulation. Les places sont attribuées par l'administration, département par département. Une école les demande pour vous, mais ne peut pas garantir une date.</p>
          <p>Un stage sérieux parle donc d'un objectif d'examen en fin de stage, jamais d'un permis garanti. Si l'examen ne peut pas avoir lieu pendant le stage, l'école vous présente plus tard.</p>
        </> },
        { h: "Ce qui dépend de vous", body: <ul>
          <li>Arriver avec le code moto en poche</li>
          <li>Avoir un dossier d'inscription complet (l'école s'en charge avec vous)</li>
          <li>Être disponible deux semaines d'affilée</li>
          <li>Venir avec un équipement homologué : casque, gants, blouson, pantalon, chaussures montantes</li>
          <li>Prévoir un budget pour d'éventuelles heures en plus, si votre moniteur les juge utiles</li>
        </ul> },
      ]}
      faq={[
        { q: "Combien d'heures de conduite faut-il pour le permis A2 ?", a: "Au minimum 20 heures, réparties entre la piste et la circulation. Votre moniteur peut proposer des heures supplémentaires selon votre progression." },
        { q: "Et si je rate l'examen pendant le stage ?", a: "Vous pouvez être présenté à nouveau à une date ultérieure. L'école vous indique les heures complémentaires éventuelles et la procédure." },
      ]}
    />
  );
}

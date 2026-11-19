# Indiana Road Trip : stratégie SEO nationale

## Principe
Une page pilier (`/stage-moto-normandie/`) et des guides qui répondent chacun à une intention distincte. Pas de pages « permis moto + [ville] » dupliquées : une seule page par intention, avec un contenu propre.

## Cartographie des intentions

| Intention de recherche | Type d'intention | Page cible | Statut | Angle du contenu |
|---|---|---|---|---|
| stage moto normandie | Transactionnelle locale | `/stage-moto-normandie/` | Livrée | L'offre, les sessions, le prix |
| stage permis moto intensif | Transactionnelle | `/stage-moto-normandie/` | Livrée | Formule de 2 semaines, 20 h, encadrement |
| permis moto accéléré avec hébergement | Transactionnelle | `/stage-moto-normandie/` (section formules) | Livrée | Inclus / options / à votre charge |
| permis moto en deux semaines | Informationnelle | `/guides/permis-moto-en-deux-semaines/` | Livrée | Ce qui est réaliste, sans promesse |
| permis moto accéléré paris | Informationnelle / comparaison | `/guides/permis-moto-accelere-depuis-paris/` | À rédiger | Venir de Paris : trajet en train, organisation, comparateur. Pas de délais moyens inventés. |
| passer son permis moto hors île-de-france | Informationnelle | même guide que ci-dessus (section dédiée) | À rédiger | Inscription dans un autre département, dossier ANTS, examen |
| permis moto pendant ses congés | Informationnelle | `/guides/permis-moto-pendant-ses-conges/` | À rédiger | Poser ses congés, CPF, calendrier type |
| vacances permis moto | Inspirationnelle | `/guides/permis-moto-pendant-ses-conges/` | À rédiger | Même page : séjour, découverte, budget |
| formation moto intensive a2 | Informationnelle / transactionnelle | `/permis-moto/` + section A2 de la landing | Partielle | Contenu de la formation A2, 20 h, épreuves |

## Règles de rédaction
- Une page = une intention. Si deux requêtes ont la même réponse, elles partagent la même page.
- Chaque guide renvoie vers la landing (lien contextuel + CTA) et vers le comparateur `#comparer`.
- Aucune statistique de délai par ville tant qu'elle n'est pas sourcée et datée.
- Mettre à jour `dateModified` du JSON-LD Article à chaque révision.

## Balisage technique livré
- Landing : `Course` (+ `CourseInstance` générées automatiquement pour chaque session ouverte), `FAQPage`
- Guide : `Article`
- Site : `DrivingSchool` avec catalogue d'offres
- Sitemap mis à jour avec les nouvelles URL

## Netlinking et notoriété (hors site)
- Fiche partenaire sur les offices de tourisme (Le Havre Étretat Normandie Tourisme, Normandie Attractivité)
- Articles invités dans les médias moto (relations presse « stage moto et séjour »)
- Fiches des partenaires signés pointant vers la landing

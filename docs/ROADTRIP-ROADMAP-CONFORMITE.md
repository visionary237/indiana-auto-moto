# Indiana Road Trip : conformité, mise en vente et roadmap

## 1. À valider avant la mise en vente (bloquant)

| Sujet | Question | Qui valide | Statut |
|---|---|---|---|
| Inscription | Candidats non résidents en Seine-Maritime : dépôt du dossier ANTS par l'école, pièces requises | Indiana + préfecture | À faire |
| Prérequis | ETM obtenu avant l'arrivée (formule « code obtenu ») ou planifié (formule « à préparer ») ; âge minimum 18 ans pour A2 | Indiana | À faire |
| Examens | Capacité réelle d'obtenir des places en fin de séjour via RdvPermis ; délais locaux constatés | Indiana | À faire |
| Disponibilités | Moniteurs moto et motos dédiés sans pénaliser les élèves locaux ; créneaux piste | Indiana | À faire |
| Tarifs | Prix de la formation (790 € A2), hébergement, options : grille définitive | Indiana + DOERZ | À faire |
| Hébergement | Contrats signés, capacité, conditions d'annulation, accueil des moins de 18 ans (non concerné en A2) | Indiana + hébergeur | À faire |
| Assurances | RC professionnelle de l'école couvrant l'offre ; garantie annulation proposée au client | Assureur | À faire |
| CGV | CGV spécifiques Road Trip : acompte, annulation, échec ou report d'examen, heures supplémentaires | Juriste | À faire |
| Voyage à forfait | La vente combinée formation + hébergement peut relever du régime des voyages à forfait (Code du tourisme, L.211-1 et suivants) : immatriculation Atout France et garantie financière, ou vente dissociée (hébergement facturé directement par l'hébergeur) | Juriste | À trancher |
| Publicité | Aucune promesse de réussite ni de date d'examen ; mention « sous réserve » visible près de chaque promesse d'examen | DOERZ | Fait sur le site |
| Piste « privée » | Justificatif d'usage exclusif (voir AUDIT.md) | Indiana | À faire |

## 2. Version 1 commerciale (livrée dans ce dépôt)
- Landing `/stage-moto-normandie/` en 11 scènes, comparateur, configurateur
- Contenus administrables (`/admin`, Decap CMS) : sessions, hébergements, partenaires, programme, formules
- Leads vers n8n avec étape CRM
- Maillage : menu, hero, section après le hero, pages moto, accéléré, stages, tarifs, footer
- Guide SEO « permis moto en deux semaines »

## 3. Roadmap

### V1.1 (après les premières validations)
- Saisie de la première session et de l'hébergement signé dans `/admin`
- Production des assets P1 (voir ASSETS.md)
- Brochure PDF automatique
- Guides SEO « depuis Paris » et « pendant ses congés »

### V2 : Indiana Travel Pass
Une carte digitale réservée aux participants, ajoutée au portefeuille du téléphone.

| Contenu | Source |
|---|---|
| Planning du séjour (mis à jour par l'école) | Agenda de la session |
| Hébergement : adresse, code d'accès, contact | Fiche hébergement |
| Adresses partenaires et avantages confirmés | `partenaires.json` (avantage_confirme = true) |
| Contacts utiles (agence, moniteur, urgences) | Configuration |
| Recommandations touristiques | `destinations.json` |
| Informations pédagogiques (livret, prochaines leçons) | Logiciel de gestion de l'école |

**Technique.** Pass Apple Wallet (`.pkpass` signé via un certificat Pass Type ID) et Google Wallet (Generic Pass via l'API Google Wallet). Génération par n8n à l'étape « Inscription confirmée », mise à jour poussée à chaque changement de planning. Une page web `/pass/[jeton]` sert de repli pour les autres appareils.

**Condition.** Le Travel Pass ne bloque pas la V1 : il démarre une fois la première session vendue.

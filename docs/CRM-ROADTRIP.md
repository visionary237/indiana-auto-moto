# Indiana Road Trip : pipeline CRM et automatisations

## Données envoyées par le site
Chaque formulaire envoie un POST JSON à `NEXT_PUBLIC_LEADS_ENDPOINT` (webhook n8n). Champs communs : `kind`, `Étape CRM`, `Source`, `page`, `sentAt`, puis les réponses.

| Formulaire | `kind` | Étape CRM initiale |
|---|---|---|
| Alerte d'ouverture des sessions | `Road Trip : alerte sessions` | Prospect |
| Configurateur, profil incomplet ou demande sur mesure | `Road Trip : demande de séjour` | Demande de renseignements |
| Configurateur, A2 + 2 semaines disponibles | `Road Trip : demande de séjour` | Candidat qualifié |
| Candidature partenaire | `Road Trip : candidature partenaire` | Pipeline partenaires |

## Pipeline commercial

| # | Étape | Entrée dans l'étape | Sortie | Automatisation déclenchée |
|---|---|---|---|---|
| 1 | Prospect | Alerte sessions | Demande de séjour envoyée | Confirmation + guide « permis moto en 2 semaines » |
| 2 | Demande de renseignements | Configurateur (non qualifié) | Appel de qualification | Confirmation + brochure (si consentement) ; tâche d'appel J+1 |
| 3 | Candidat qualifié | Configurateur (qualifié) ou appel | Session proposée | Envoi des prochaines sessions |
| 4 | Session proposée | Commercial | Acompte versé | Relance J+3 puis J+7, puis clôture à J+21 |
| 5 | Dossier en attente | Acompte reçu | Dossier ANTS complet | Rappel des documents (J+0, J+5, J+10) |
| 6 | Inscription confirmée | Dossier complet + solde | J−14 avant session | Confirmation, CGV, attestation |
| 7 | Préparation du séjour | J−14 | Arrivée | Infos pratiques J−14 ; guide touristique J−7 ; rappel équipement J−2 |
| 8 | Stage en cours | J1 | J14 | Message de bienvenue J1 ; point mi-séjour J7 |
| 9 | Suivi après formation | J14 | Clôture | Enquête de satisfaction J+2 ; demande d'avis Google J+7 ; résultat d'examen et plan de suite |

## Workflow n8n fourni
`docs/n8n-roadtrip-leads.json` est importable dans n8n. Il contient :
1. Webhook `POST /roadtrip-lead`
2. Normalisation du lead et calcul de l'étape (Code node)
3. Routage par type de formulaire (Switch)
4. E-mail de confirmation (SMTP)
5. Ajout dans Google Sheets, CRM provisoire (remplaçable par HubSpot, Pipedrive ou Brevo)
6. Notification à l'agence

Les séquences temporelles (relances, J−14, J−7, J+2) se branchent ensuite sur l'étape CRM, avec un nœud Schedule quotidien qui lit la feuille.

## Règles RGPD
- Brochure et newsletter : consentement explicite, case non cochée par défaut
- Durée de conservation des prospects : 3 ans après le dernier contact
- Désinscription dans chaque e-mail

# Indiana Auto-Moto : refonte du site (DOERZ)

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion, GSAP (ScrollTrigger + MotionPath). Export statique : déploiement possible sur n'importe quel hébergeur (Vercel, Netlify, OVH, Webaxys).

## Démarrer
```bash
npm install
cp .env.example .env.local   # renseigner NEXT_PUBLIC_LEADS_ENDPOINT (webhook n8n conseillé)
npm run dev                  # http://localhost:3000
npm run build                # génère /out (site statique)
```

## Où modifier le contenu
Tout le contenu factuel est centralisé dans `src/lib/content.ts` : coordonnées, horaires, forfaits, prix, équipe, avis, piste.
Les points à valider sont listés dans `AUDIT.md`.

## Pages
| Route | Rôle |
|---|---|
| `/` | Accueil |
| `/permis-auto/` | B manuelle, BVA, AAC |
| `/permis-moto/` | A1, A2, maxi scooter, piste |
| `/formations-accelerees/` | Permis B accéléré |
| `/stages/` | 125 cm³ / passerelle A, AM, novice, BVA vers BM |
| `/indiana-driving-escape/` | Landing du séjour (projet) : configurateur, qualification, devis |
| `/equipe/` | Équipe, matériel, méthode, certifications |
| `/tarifs-financements/` | Tous les tarifs, CPF, paiement fractionné |
| `/faq/` | FAQ (JSON-LD FAQPage) |
| `/contact/` | Formulaire d'inscription, plan |
| `/stage-moto-normandie/` | **Indiana Road Trip** : landing immersive en 11 scènes, comparateur, configurateur |
| `/guides/permis-moto-en-deux-semaines/` | Guide SEO |
| `/admin/` | Administration Decap CMS (sessions, hébergements, partenaires, programme, formules) |

## Formulaires
`src/lib/leads.ts` envoie un POST JSON vers `NEXT_PUBLIC_LEADS_ENDPOINT` (n8n, Make, CRM). Sans endpoint, le formulaire ouvre un e-mail pré-rempli vers l'école. Les formulaires intègrent un pot de miel anti-spam et un consentement RGPD.

## SEO local
- JSON-LD `DrivingSchool` sur toutes les pages : adresse, horaires, zone desservie, catalogue d'offres
- Métadonnées et URL canonique par page, `sitemap.xml`, `robots.txt`
- Requêtes visées : « auto-école Le Havre », « moto-école Le Havre », « permis moto Le Havre », « permis accéléré Le Havre », « stage permis Normandie », « permis intensif Normandie » (pour les Franciliens)

## Motion
- Une séquence d'ouverture sur l'accueil (titre et photo)
- Un moment fort au défilement : la moto qui suit le slalom de la piste (GSAP)
- Des micro-interactions au clic : menu, FAQ, étapes du configurateur
- Le réglage `prefers-reduced-motion` est respecté partout

## Indiana Road Trip
- Contenus administrables : `content/roadtrip/*.json`, éditables depuis `/admin` (Decap CMS, backend git-gateway à activer chez l'hébergeur)
- Composants : `src/components/roadtrip/`
- Documentation : `docs/ASSETS.md`, `docs/SEO-ROADTRIP.md`, `docs/CRM-ROADTRIP.md`, `docs/n8n-roadtrip-leads.json`, `docs/ROADTRIP-ROADMAP-CONFORMITE.md`
- Règles : aucune session, aucun hébergement ni partenaire n'est affiché tant qu'il n'est pas saisi et validé. Les sections affichent alors un état vide explicite, avec une collecte de leads.

## Déploiement GitHub Pages
1. Settings → Pages → Source : **GitHub Actions**.
2. Chaque push sur `main` lance `.github/workflows/deploy.yml`, qui construit le site et le publie sur `https://<compte>.github.io/<dépôt>/`.
3. (Facultatif) Settings → Secrets and variables → Actions → Variables : `LEADS_ENDPOINT` = URL du webhook n8n.
4. Domaine personnalisé : le déclarer dans Settings → Pages, puis passer `NEXT_PUBLIC_BASE_PATH` à vide et `NEXT_PUBLIC_SITE_URL` au domaine dans le workflow.

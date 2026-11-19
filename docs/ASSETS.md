# Indiana Road Trip : inventaire des assets

Dernière mise à jour : 19/11/2026. Tous les visuels marqués « provisoire » doivent être remplacés avant la mise en vente.

## 1. Audit des assets existants

| Fichier | Source | Utilisé où | Statut | Remarque |
|---|---|---|---|---|
| `videos/route-normandie.mp4` | Film A fourni (IA), 8 s, 720p | Accueil (teaser), landing scène 02 et 03 | Provisoire | Filigrane « Agnes » retiré par recadrage (−10 %). Re-générer en 1080p sans filigrane. |
| `videos/plateau-circuit.mp4` | Film B fourni (IA), 8 s, 720p | Landing scène 03 | Provisoire | Idem. Le tracé ne correspond pas aux plateaux français. |
| `videos/moniteur-eleve.mp4` | Film C fourni (IA), 8 s, 720p | Landing scène 03 | Provisoire | Idem. À remplacer par un vrai moniteur Indiana. |
| `roadtrip/etretat-couchant.jpg` | Banque d'images (fourni) | CTA contextuel, carte | Droits à vérifier | 789 px de large : insuffisant en plein écran. |
| `roadtrip/etretat-aerien.jpg` | Banque d'images (fourni) | Scène 03, carte (Côte d'Albâtre) | Droits à vérifier | Idem. |
| `roadtrip/honfleur.jpg` | Banque d'images (fourni) | Scène 03, carte | Droits à vérifier | Idem. |
| `roadtrip/deauville-planches.jpg` | Banque d'images (fourni) | Scène 03, carte | Droits à vérifier | Idem. |
| `roadtrip/route-cotiere.jpg` | motor.nl (crédit visible sur la maquette fournie) | Non utilisé | Bloqué | Photo d'un média tiers : licence obligatoire avant tout usage. |
| `roadtrip/hebergement-illustration.jpg` | Fourni | Scène 05, légendé « photo d'ambiance » | Provisoire | À remplacer par les photos de l'hébergement réellement signé. |
| `roadtrip/terrasse-port.jpg` | Fourni | Scène 07, légendé « photo d'ambiance » | Provisoire | À remplacer par les photos des partenaires signés. |
| Femme bras levés sur une moto | Fourni | Exclu | Écarté | Pilote sans les mains : message contraire à la sécurité routière pour une école de conduite. |
| Moniteur au logo « French » | Fourni | Exclu | Écarté | Marque tierce visible. |

## 2. Assets manquants (par priorité de production)

Les prompts sont rédigés pour Gemini (Veo / Imagen) et Higgsfield. Ajouter systématiquement : « no text, no logo, no watermark, no brand names, riders wear full certified gear (helmet, gloves, jacket, trousers, boots), both hands on handlebars ».

### P1 : indispensables à la version commerciale

| ID | Description | Emplacement | Format | Durée | Résolution | Direction artistique | Prompt | Animation |
|---|---|---|---|---|---|---|---|---|
| RT-V01 | Ville → côte : périphérique saturé qui se dissout en route côtière | Landing, scène 01 (remplace l'illustration SVG) | MP4 H.264 + WebM, sans son | 10 s, découpable en 3 plans | 1920×1080 et 1080×1920 | Gris froid désaturé → lumière dorée de fin de journée, caméra frontale stable | Higgsfield : « Cinematic single continuous shot, dashcam height, gridlocked Paris ring road at grey dawn, slowly morphing into an empty winding coastal road above white chalk cliffs in Normandy at golden hour, soft film grain, 35mm, no text » | Lecture pilotée par le scroll (scrub image par image) |
| RT-V02 | Motard en formation sur route normande, falaises en fond | Landing, scène 02 et teaser accueil | MP4 + WebM | 12 à 15 s, boucle | 1920×1080 + 1080×1920 | Documentaire de voyage, contre-jour léger, moto A2 roadster | Veo : « Tracking shot of a learner motorcyclist on an A2 roadster, followed at distance by an instructor on a second motorcycle, narrow countryside road along chalk cliffs of the Côte d'Albâtre, Normandy, late afternoon, calm pace, documentary style » | Boucle fondue, pause accessible |
| RT-P01 | Portraits des moniteurs Indiana | Landing scène 10, page équipe | JPG/WebP | — | 2000×2500 | Lumière naturelle, fond piste ou agence | Shooting réel (pas d'IA) | Parallaxe légère |
| RT-P02 | Flotte moto Indiana, dont la MT-03 | Scène 10, permis moto | JPG/WebP | — | 3000×2000 | Motos logotées Indiana, piste au Havre | Shooting réel | Aucune |
| RT-P03 | Hébergement signé : 8 photos (chambre, salle d'eau, extérieur, stationnement moto) | Scène 05 | JPG/WebP | — | 2400×1600 | Lumière du jour, sans retouche trompeuse | Shooting réel sur place | Galerie au glisser |
| RT-P04 | Piste de formation utilisée par Indiana | Scènes 03 et 10, accueil | JPG + MP4 6 s | 6 s | 1920×1080 | Vue drone + plan au sol | Shooting réel | Lecture au scroll |

### P2 : enrichissement

| ID | Description | Emplacement | Format | Durée | Résolution | Direction artistique | Prompt | Animation |
|---|---|---|---|---|---|---|---|---|
| RT-P05 | Le Havre : centre Perret, front de mer, jardins suspendus | Carte (Le Havre) | JPG | — | 2400×1600 | Ciel clair, architecture béton | Shooting réel ou banque sous licence | Fondu |
| RT-P06 | Fécamp, Trouville, Veules-les-Roses, Pays d'Auge | Carte (fiches sans visuel) | JPG | — | 2400×1600 | Cohérence chromatique avec la palette Road Trip | Banque sous licence (Normandie Attractivité, Seine-Maritime Attractivité) | Fondu |
| RT-V03 | Moment de vie : stagiaires au café après la leçon, casques sur la table | Scène 03 (soir) | MP4 | 6 s | 1920×1080 | Chaleureux, golden hour, sans alcool visible | Veo : « Two motorcycle learners in their twenties laughing at a seaside café terrace in a Normandy harbour town, helmets on the table, golden hour, handheld documentary feel » | Fondu croisé synchronisé |
| RT-V04 | Plateau : maniabilité allure lente avec plots | Scène 03 (matin) | MP4 | 8 s | 1920×1080 | Plan large drone puis plan serré mains / regard | Higgsfield : « Drone shot descending over a motorcycle training ground with orange cones, learner rider performing a slow-speed figure-eight, instructor watching, overcast soft light » | Lecture au scroll |
| RT-I01 | Illustrations des 14 jours (pictogrammes) | Timeline scène 04 | SVG | — | Vectoriel | Trait fin, palette Road Trip | Création graphique | Apparition au changement de jour |
| RT-I02 | Fond de carte détaillé de la côte (Le Tréport → Cabourg) | Scène 06 | SVG | — | Vectoriel | Remplace la carte schématique actuelle | Dérivé d'OpenStreetMap (licence ODbL, attribution) | Zoom sur destination |

### P3 : roadmap

| ID | Description | Emplacement | Format |
|---|---|---|---|
| RT-B01 | Brochure PDF Road Trip | Automatisation « envoi de brochure » | PDF A4, 8 pages |
| RT-B02 | Visuels Travel Pass (carte Wallet) | Indiana Travel Pass | PNG 1032×336 (strip Apple), logo 480×150 |
| RT-S01 | Déclinaisons réseaux sociaux | Campagnes Meta / TikTok | 1080×1920 vidéo, 1080×1350 image |

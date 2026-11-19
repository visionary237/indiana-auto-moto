# Audit du site actuel : indiana-auto-ecole.fr (19/11/2026)

## Identité conservée
- Nom : Indiana Auto-Moto, « L'école des motards ». INDIANA SARL au capital de 40 000 €, RCS Le Havre 481 155 801, TVA FR 20 481 155 801
- Directrice de la publication : Mme Sandrine Kociszewski
- Agrément E0207607070, 108 rue Jean-Jacques Rousseau, 76600 Le Havre, 02 35 41 27 06, indiana-autoecole@orange.fr
- Couleurs rouge et noir, typographie condensée et logo casque : conservés (rouge #D3271C, Barlow Condensed)
- Reconnaissances : AFDM, Assurance Mutuelle des Motards, Qualiopi, Datadock, programme REMC, réseau d'écoles indépendantes (pas de franchise)

## Points à valider avec l'établissement AVANT la mise en ligne
1. **Piste moto privée** (argument principal du nouveau site). Le site actuel cite 3 lieux : ZI portuaire / Centre routier (Gonfreville-l'Orcher), Champ de Foire et Stade Océane. Les deux derniers sont des espaces partagés, fermés lors d'événements. Il faut un justificatif (bail, convention d'usage exclusif) pour pouvoir écrire « privée ». Sinon, passer `piste.headline` à une formulation neutre (« Trois pistes à moins de 10 minutes de l'école »). Sans justificatif, la mention expose à un risque de pratique commerciale trompeuse.
2. **Incohérences de prix** entre les pages :
   - Permis B accéléré : 1 490 € (fiche produit, « au lieu de 1 690 € ») contre 1 690 € (page Informations)
   - Permis B : 1 190 € pour 20 h (fiche) contre « Auto Premium 21 h, 1 190 € sans code » (Informations)
   - Moto A2 : 20 h (fiche) contre 21 h (Informations)
   - Accompagnement examen auto : 55 € (Tarifs unitaires) contre 60 € (Informations)
   - Forfait 10 h auto à 450 € (Informations) : absent de la boutique
   - Montant de 250 € affiché sans libellé sur chaque fiche (probablement l'acompte)
   → Le nouveau site reprend les prix des fiches produits (boutique). À confirmer.
3. **Promesse « obtenez votre permis en décembre 2026 »** et **« Très peu de places restantes »** sur l'accueil actuel : retirées, car une date d'examen ne peut pas être garantie.
4. **Exclusivité du permis Maxi Scooter au Havre** : affirmation de l'école, à confirmer.
5. **Équipe** : aucun nom, diplôme ni portrait publié. Fiches à compléter dans `src/lib/content.ts > team`.
6. **Avis** : seul un livre d'or PDF est disponible. Sur GoWork, la note est de 3,9/5 sur 11 évaluations, dont 27 % à 1 étoile. Il faut mettre en place une collecte d'avis Google et n'afficher que des avis vérifiables (`reviews`).
7. **Photos** : les visuels actuels sont des images provisoires en basse définition. Il faut prévoir un shooting réel : équipe, flotte avec la Yamaha MT-03 et les motos logotées, piste, routes normandes. Ne pas utiliser les photos montrant d'autres marques ou auto-écoles (Plaisir Permis, L'Académie de la conduite, ADAC, Honda).
8. **Logo** : wordmark provisoire, à remplacer par le fichier vectoriel officiel.
9. **Coordonnées GPS** du JSON-LD à vérifier sur la fiche Google Business Profile.
10. **CGV** datées du 27/04/2021 : à mettre à jour, notamment pour l'offre Driving Escape.

## Driving Escape : conditions avant lancement
- Le bandeau « Projet en cours de validation » reste affiché tant que ces points ne sont pas réglés : dates, capacité des moniteurs, partenaires d'hébergement, assurance, CGV spécifiques, éventuel statut d'opérateur de voyages (immatriculation Atout France si un forfait formation + hébergement est vendu)
- Aucune garantie de résultat ni de date d'examen n'est donnée

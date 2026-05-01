# SkillBadge — Certification numérique décentralisée des compétences

> **Certifiez. Vérifiez. Faites confiance.**  
> SkillBadge est une plateforme de certification numérique basée sur la blockchain Polygon, permettant d'émettre des badges NFT infalsifiables pour valider les compétences autodidactes.

---

## Table des matières

- [Présentation du projet](#présentation-du-projet)
- [Pourquoi la blockchain ?](#pourquoi-la-blockchain-)
- [Technologies utilisées](#technologies-utilisées)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Structure des données](#structure-des-données)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Sécurité](#sécurité)
- [Roadmap](#roadmap)

---

## Présentation du projet

SkillBadge est une solution de certification numérique conçue pour répondre aux limites des systèmes traditionnels (diplômes papier, PDF falsifiables, bases de données centralisées). Elle permet à des formateurs de délivrer des **badges NFT** à des apprenants, certifiant une compétence précise à un niveau défini.

Chaque badge est infalsifiable (inscrit de manière permanente sur la blockchain Polygon), vérifiable instantanément par n'importe quel recruteur sans intermédiaire, et propriété exclusive de l'apprenant, stocké dans son wallet personnel.

> Le projet est conçu avec un impact social fort pour le contexte africain (notamment le Burkina Faso), où les coûts de transaction bas et l'accessibilité sont essentiels.

---

## Pourquoi la blockchain ?

| Critère | Certification classique | SkillBadge (Blockchain) |
|---|---|---|
| Falsification | ⚠️ Possible par l'admin | ✅ Impossible — immuable |
| Vérification | ⚠️ Contact de l'émetteur requis | ✅ Instantanée et publique |
| Disponibilité | ⚠️ Dépend d'un serveur | ✅ 24h/24, 7j/7, mondial |
| Propriété du badge | ⚠️ Détenue par la plateforme | ✅ Détenue par l'apprenant |
| Pérennité | ⚠️ Perdue si la plateforme ferme | ✅ Permanente sur la blockchain |
| Transparence | ⚠️ Opaque | ✅ Totalement publique |

---

## Technologies utilisées

### Blockchain & Smart Contracts

| Technologie | Rôle |
|---|---|
| **Polygon (MATIC)** | Réseau blockchain principal — transactions à moins de 0,01 $, confirmation en 2 à 5 secondes |
| **Solidity** | Langage de développement des smart contracts |
| **ERC-721** | Standard NFT pour badge unique par compétence |
| **ERC-1155** | Standard NFT pour émission de badges multiples |
| **Ethereum mainnet** | Couche 1 de sécurité — ancrage des données critiques |

### Stockage décentralisé

| Technologie | Rôle |
|---|---|
| **IPFS** | Stockage décentralisé des métadonnées visuelles (images PNG/SVG, descriptions longues) |
| **Pinata** | Service d'épinglage IPFS pour garantir la persistance des fichiers |
| **Filecoin** | Stockage décentralisé longue durée |

### Outils de développement

| Outil | Rôle |
|---|---|
| **Hardhat** | Framework de développement, test et déploiement des smart contracts |
| **OpenZeppelin** | Bibliothèque de contrats Solidity sécurisés et audités (ERC-721, ERC-1155) |
| **MetaMask** | Wallet Ethereum/Polygon pour l'intégration utilisateur et les tests |

### Sécurité cryptographique

| Mécanisme | Rôle |
|---|---|
| **SHA-256** | Génération d'une empreinte numérique unique pour chaque badge |
| **Signature ECDSA** | Signature de l'émetteur via clé privée au moment du mint |
| **Wallet custodial** | Wallet auto-généré à l'inscription pour les utilisateurs non techniques |

---

## Fonctionnalités principales

### 🎓 Émission de badges — Formateur
- Création d'un badge NFT en définissant le domaine, la compétence et le niveau (Débutant / Intermédiaire / Avancé / Expert)
- Attribution directe au wallet de l'apprenant
- Signature cryptographique automatique de l'émetteur au moment du mint
- Horodatage Unix immuable inscrit on-chain

### 👤 Gestion du profil — Apprenant
- Wallet blockchain généré automatiquement à l'inscription, sans connaissance technique requise
- Tableau de bord personnel listant tous les badges reçus avec leurs détails
- Possibilité d'exporter sa clé privée (pour les utilisateurs avancés)
- Portabilité totale des badges, indépendante de la plateforme

### 🔍 Vérification instantanée — Recruteur
- Vérification d'un badge via l'adresse wallet ou l'identifiant du badge en moins d'une seconde
- Consultation publique sans création de compte ni intermédiaire
- Affichage des informations complètes : compétence, niveau, domaine, émetteur, date d'émission
- Vérification de l'authenticité cryptographique de la signature de l'émetteur

### 🛡️ Sécurité & Infalsifiabilité
- Immuabilité garantie par la blockchain Polygon — aucune donnée ne peut être modifiée après inscription
- Hash SHA-256 unique par badge — toute tentative d'altération est détectable immédiatement
- Architecture hybride : données critiques on-chain + métadonnées visuelles sur IPFS

---

## Structure des données

### Données inscrites on-chain (Polygon)

Chaque badge enregistre de manière permanente les informations suivantes sur la blockchain :

| Donnée | Description | Exemple |
|---|---|---|
| `tokenId` | Identifiant unique du badge NFT | #BADGE_001 |
| `owner` | Adresse wallet de l'apprenant propriétaire | 0xAB...4F3E |
| `issuer` | Adresse wallet du formateur émetteur | 0xF0...9B2C |
| `competence` | Compétence certifiée | JavaScript |
| `level` | Niveau de maîtrise | Intermédiaire |
| `domain` | Domaine de la compétence | Développement Web |
| `issuedAt` | Horodatage Unix de l'émission | 1713621120 |
| `metadataURI` | Lien IPFS vers les métadonnées visuelles | ipfs://Qm... |
| `txHash` | Hash de la transaction blockchain | 0x7f3a...d9c1 |

### Données stockées off-chain (IPFS)

Les métadonnées volumineuses sont hébergées sur IPFS pour des raisons de coût et de performance. Le smart contract contient uniquement le lien IPFS pointant vers ces données.

| Donnée | Contenu |
|---|---|
| Image du badge | Visuel PNG/SVG avec logo SkillBadge |
| Nom complet | Intitulé complet (ex. : « JavaScript — Intermédiaire ») |
| Description | Présentation des compétences couvertes et des critères d'évaluation |
| Attributs étendus | Institution, critères de validation, durée de validité |

---

## Installation

### Prérequis

- Node.js version 18 ou supérieure
- Un wallet MetaMask configuré sur le réseau Polygon (Mumbai Testnet pour les tests)
- Un compte Pinata pour l'épinglage IPFS
- Les variables d'environnement suivantes à configurer : URL RPC Polygon, clé privée de déploiement, clés API Pinata, secret JWT pour l'API backend

### Étapes

1. Cloner le dépôt GitHub du projet
2. Installer les dépendances avec npm
3. Renseigner les variables d'environnement dans le fichier `.env`
4. Compiler les smart contracts avec Hardhat
5. Déployer les contrats sur le réseau de test Mumbai Testnet
6. Lancer le serveur applicatif — l'interface est accessible en local sur le port 3000

---

## Utilisation

### Émettre un badge (Formateur)
Se connecter avec son compte formateur, accéder à la section "Émettre un badge", renseigner le domaine, la compétence, le niveau et l'adresse wallet de l'apprenant, puis valider. Le badge est minté sur Polygon en 2 à 5 secondes.

### Consulter ses badges (Apprenant)
Se connecter avec son compte apprenant et accéder à "Mes badges" pour visualiser l'ensemble des badges NFT reçus avec leurs détails complets. L'adresse wallet publique peut être partagée directement avec un recruteur.

### Vérifier un badge (Recruteur)
Saisir l'adresse wallet de l'apprenant ou l'identifiant du badge sur la page de vérification publique. Aucun compte n'est requis. Le résultat avec toutes les informations d'authenticité s'affiche en moins d'une seconde.

---

## Sécurité

- **Immuabilité** : toute donnée inscrite sur Polygon est permanente et ne peut jamais être modifiée ni supprimée
- **Hash SHA-256** : chaque badge possède une empreinte numérique unique — toute altération est détectable immédiatement
- **Signature ECDSA** : chaque badge est signé par la clé privée du formateur au moment du mint ; la falsification est cryptographiquement impossible sans cette clé
- **Wallet custodial sécurisé** : les utilisateurs non techniques reçoivent un wallet géré par SkillBadge, avec option d'export de la clé privée depuis les paramètres
- **Aucun tiers de confiance requis** : la vérification se fait directement sur la blockchain publique Polygon

---

## Roadmap

- [x] Architecture blockchain définie (Polygon + ERC-721)
- [x] Plan de données on-chain / off-chain
- [x] Mécanismes de sécurité cryptographique
- [ ] Déploiement des smart contracts sur Mumbai Testnet
- [ ] Interface web formateur / apprenant
- [ ] Intégration IPFS via Pinata
- [ ] API REST publique de vérification
- [ ] Support ERC-1155 pour les badges multiples
- [ ] Application mobile
- [ ] Déploiement sur Polygon Mainnet

---

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

*SkillBadge — Burkina Faso · Certification numérique des compétences autodidactes*

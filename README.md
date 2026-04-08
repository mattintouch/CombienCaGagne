# Combien Ça Gagne

Site web du podcast **Combien Ça Gagne**, animé par Clémence Lepic (Orso Media).

## Stack technique

- **Next.js 16** (App Router, SSG)
- **Tailwind CSS 4**
- **TypeScript**
- Déployé sur **Vercel**

## Démarrage local

```bash
# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local

# Lancer en développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

| Variable | Description | Obligatoire |
|---|---|---|
| `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` | URL POST de l'API newsletter (Kessel Point Média) | Non (V1 : console.log) |
| `NEXT_PUBLIC_SITE_URL` | URL de production pour OG tags et sitemap | Non (default: combiencagagne.fr) |
| `NEXT_PUBLIC_SPOTIFY_EMBED_DISABLED` | Masquer les embeds Spotify en dev | Non |

## Ajouter un nouvel épisode

1. Ouvrir `data/episodes.json`
2. Ajouter un objet au format suivant **en premier** dans le tableau (le plus récent en premier) :

```json
{
  "id": 43,
  "slug": "combien-gagne-un-dentiste",
  "titre": "Combien gagne un dentiste ?",
  "metier": "Dentiste",
  "invite": "Dr. Nom Prénom",
  "numero": 43,
  "duree": "45 min",
  "date": "2025-03-22",
  "categorie": "Santé",
  "resume": "Description de l'épisode...",
  "chiffres": [
    { "label": "Chiffre d'affaires annuel", "valeur": "600 000 €" },
    { "label": "Revenu net mensuel", "valeur": "12 000 €" },
    { "label": "Charges", "valeur": "55 %" }
  ],
  "plateformes": {
    "spotify": "https://open.spotify.com/episode/...",
    "apple": "https://podcasts.apple.com/podcast/...",
    "youtube": "https://youtube.com/watch?v=..."
  }
}
```

3. Commit et push : le site se redéploie automatiquement sur Vercel

## Catégories disponibles

Artisanat, Divertissement, Immobilier, Professions libérales, Santé, Tech, Food

## Deployer sur Vercel

1. Connecter le repo GitHub sur [vercel.com](https://vercel.com)
2. Le framework Next.js est auto-détecté
3. Ajouter les variables d'environnement dans les settings Vercel
4. Chaque push sur `main` déclenche un redéploiement automatique

## Structure du projet

```
app/
  layout.tsx          # Layout global + metadata OG
  page.tsx            # Page d'accueil
  sitemap.ts          # Sitemap XML auto-généré
  robots.ts           # robots.txt
  episodes/
    page.tsx           # Archive avec recherche, filtres, pagination
    [slug]/page.tsx    # Page épisode (SEO dynamique, JSON-LD)
  newsletter/
    page.tsx           # Page inscription newsletter
components/
  Header.tsx           # Navigation + liens plateformes
  Footer.tsx           # Footer global
  EpisodeCard.tsx      # Card épisode (grid/list/compact + skeleton)
  EpisodesArchive.tsx  # Archive client (recherche, filtres, toggle vue)
  NewsletterForm.tsx   # Formulaire newsletter inline
  NewsletterPageForm.tsx # Formulaire newsletter page dédiée
data/
  episodes.json        # Base de données épisodes
```

## Licence

Tous droits réservés - Orso Media

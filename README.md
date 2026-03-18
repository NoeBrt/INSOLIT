# INSOLIT - Bons Plans Insolites (-26 ans)

Application de bons plans exclusifs pour les moins de 26 ans. Stack : React (Vite + Tailwind CSS), Express.js, Supabase.

## Structure

```
├── client/          # Frontend React (Vite + Tailwind)
├── server/          # API Express.js
└── supabase/        # SQL schema & seed data
```

## Setup

### 1. Supabase

1. Crée un projet sur [supabase.com](https://supabase.com)
2. Exécute `supabase/schema.sql` dans le SQL Editor
3. Exécute `supabase/seed.sql` pour les données de test

### 2. Variables d'environnement

**Client** (`client/.env`) :
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Server** (`server/.env`) :
```
PORT=3001
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

### 3. Installation & lancement

```bash
# Installer toutes les dépendances
npm run install:all

# Lancer client + serveur
npm run dev
```

Le client tourne sur `http://localhost:5173`, le serveur sur `http://localhost:3001`.

## API Routes

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/promos` | Liste des promos (+ filtre `?category=Food`) |
| GET | `/api/promos/:id` | Détail d'une promo |
| POST | `/api/claim` | Enregistrer l'utilisation d'une offre |

## Features

- Auth : inscription/connexion via Supabase Auth (vérification âge < 26 ans)
- Dashboard avec grille de cartes et filtres par catégorie
- Vue détail avec carte Leaflet et révélation du code promo
- Design dark mode avec accents néon violet/cyan
- Responsive design

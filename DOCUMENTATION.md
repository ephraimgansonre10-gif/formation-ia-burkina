# Documentation Complète - Formation IA Burkina Faso

*Dernière mise à jour: 20 Février 2026*

---

## Table des Matières

1. [Description du Projet](#description-du-projet)
2. [Technologies](#technologies)
3. [Structure du Projet](#structure-du-projet)
4. [Installation](#installation)
5. [Déploiement](#dploiement)
6. [Identifiants et Secrets](#identifiants-et-secrets)
7. [Erreurs Rencontrées et Solutions](#erreurs-rencontres-et-solutions)
8. [Historique des Modifications](#historique-des-modifications)
9. [Problèmes Connus](#problèmes-connus)
10. [Workflow de Développement](#workflow-de-dveloppement)

---

## Description du Projet

Site web promotionnel pour une formation en Intelligence Artificielle au Burkina Faso comprenant:
- **Page publique**: Présentation de la formation, modules, tarifs, témoignages, contact
- **Page Admin**: Interface d'administration pour modifier le contenu du site en temps réel

---

## Technologies

| Technologie | Version | Usage |
|-------------|---------|-------|
| Next.js | 14.2.35 | Framework React SSR |
| React | 18.2.0 | UI Library |
| TypeScript | 5.0.0 | Typage statique |
| Supabase | - | Base de données PostgreSQL |
| Vercel | - | Hébergement et déploiement |

---

## Structure du Projet

```
src/
├── app/
│   ├── page.tsx              # Page d'accueil publique
│   ├── layout.tsx            # Layout principal
│   ├── globals.css           # Styles CSS globaux
│   ├── admin/
│   │   ├── page.tsx          # Dashboard admin
│   │   └── login/page.tsx    # Page de connexion admin
│   └── api/
│       ├── content/route.ts  # API CRUD pour le contenu
│       └── auth/
│           ├── login/route.ts    # API connexion
│           └── verify/route.ts   # API vérification token
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── About.tsx
│   ├── Modules.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── lib/
    ├── data.ts           # Helper pour les données
    └── supabase.ts       # Client Supabase
```

---

## Installation

```bash
# Cloner le repository
git clone https://github.com/ephraimgansonre10-gif/formation-ia-burkina.git

# Installer les dépendances
npm install

# Créer .env.local avec les variables d'environnement
# (voir section Identifiants)

# Lancer en développement
npm run dev
```

---

## Déploiement

### Vercel
- **Dashboard**: https://vercel.com/ephraimgansonre10-gif/formation-ia-burkina
- **Site en ligne**: https://formation-ia-burkina.vercel.app
- **Statut**: Déploiement automatique depuis GitHub (branche main)

### GitHub
- **Repository**: https://github.com/ephraimgansonre10-gif/formation-ia-burkina

### Supabase
- **Dashboard**: https://supabase.com/dashboard/project/amajwhufvtyzhdlkrkkm
- **Table**: `site_content`

```sql
CREATE TABLE site_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Identifiants et Secrets

### Admin
- **URL**: `/admin/login`
- **Mot de passe**: `admin123`
- **Secret token**: `formation-ia-burkina-secret-key-2024`

### Variables d'environnement (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://amajwhufvtyzhdlkrkkm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_48C92QoKFyAjIj-cRqmkvQ_Z_AThBQV
ADMIN_PASSWORD=admin123
ADMIN_SECRET=formation-ia-burkina-secret-key-2024
```

---

## Erreurs Rencontrées et Solutions

### Erreur 1: Modifications admin non visibles sur la page client

**Description**: Les modifications effectuées dans le panel admin n'étaient pas prises en compte sur la page publique après sauvegarde.

**Cause**: Next.js met en cache les pages rendues côté serveur (`SSR`). Même avec `revalidate = 0`, le cache Vercel persistait.

**Tentative 1 - Échec**:
```typescript
// Ajout dans src/app/page.tsx
export const revalidate = 0
export const dynamic = 'force-dynamic'
```

**Tentative 2 - Échec**:
```typescript
// Ajout dans src/app/api/content/route.ts
import { revalidatePath } from 'next/cache'
// Après sauvegarde:
revalidatePath('/', 'layout')
```

**Solution Finale - Succès**:
Convertir la page en client-side pour contourner le cache serveur:

```typescript
// src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [content, setContent] = useState(fallbackData.content)

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setContent(data)
        }
      })
      .catch(() => {})
  }, [])
  // ...
}
```

**Fichiers modifiés**:
- `src/app/page.tsx` - Conversion en client-side
- `src/app/api/content/route.ts` - Ajout revalidatePath (gardé pour compatibilité)

---

### Erreur 2: TypeScript build error sur crossorigin

**Description**: Le build Vercel échouait avec l'erreur:
```
Type error: Property 'crossorigin' does not exist on type 'DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>'. Did you mean 'crossOrigin'?
```

**Cause**: En JSX/TypeScript, les attributs HTML doivent être en camelCase.

**Solution**:
```diff
- <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
+ <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

**Fichier modifié**: `src/app/layout.tsx` ligne 31

---

### Erreur 3: Variables d'environnement Supabase non configurées sur Vercel

**Symptôme**: La page ne pouvait pas se connecter à Supabase en production.

**Solution**: Configurer les variables d'environnement dans Vercel:
1. Aller dans Settings → Environment Variables
2. Ajouter toutes les variables du `.env.local`

---

## Historique des Modifications

### 20 Février 2026 - Correction synchronisation Admin/Client

**Commit**: `fix: client-side fetching to bypass Vercel cache`

**Fichier**: `src/app/page.tsx`

**Avant**:
```typescript
import { supabase } from '@/lib/supabase'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function Home() {
  let content = fallbackData.content
  const { data, error } = await supabase
    .from('site_content')
    .select('content')
    .eq('id', 1)
    .single()
  if (!error && data?.content) {
    content = data.content
  }
  // ...
}
```

**Après**:
```typescript
'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [content, setContent] = useState(fallbackData.content)

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setContent(data)
        }
      })
      .catch(() => {})
  }, [])
  // ...
}
```

---

### 20 Février 2026 - Correction TypeScript

**Commit**: `fix: crossOrigin capitalization for TypeScript`

**Fichier**: `src/app/layout.tsx`

**Changement**: `crossorigin` → `crossOrigin`

---

### 20 Février 2026 - Ajout revalidatePath

**Commit**: `fix: invalidate cache after admin save for instant client updates`

**Fichier**: `src/app/api/content/route.ts`

**Ajout**:
```typescript
import { revalidatePath } from 'next/cache'

// Dans POST, après sauvegarde réussie:
revalidatePath('/', 'layout')
```

---

## Problèmes Connus

### 1. Fallback data.json
Si Supabase est indisponible, le site affiche le contenu de `data.json`. Ce fichier doit être maintenu à jour manuellement.

### 2. Pas de notifications email
Le formulaire de contact ne fonctionne pas (côté client uniquement).

### 3. Sécurité admin basique
L'authentification admin utilise un simple mot de passe. Pour la production, implémenter une vraie authentification (NextAuth, Supabase Auth, etc.).

---

## Workflow de Développement

### Modifier le contenu via Admin
1. Aller sur `/admin/login`
2. Se connecter avec le mot de passe
3. Modifier le contenu
4. Cliquer "Sauvegarder"
5. Les changements sont immédiatement visibles sur la page publique

### Déployer une modification de code
```bash
# Vérifier les modifications
git status
git diff

# Committer et pousser
git add .
git commit -m "description de la modification"
git push

# Vercel redéploie automatiquement
```

### Commandes utiles
```bash
npm run dev      # Développement local (http://localhost:3000)
npm run build    # Build production
npm run start    # Servir le build production
```

---

## Checklist Avant Déploiement

- [ ] `npm run build` passe sans erreur
- [ ] Variables d'environnement configurées sur Vercel
- [ ] Tester les modifications en local
- [ ] Vérifier que les types TypeScript sont corrects

---

## Contacts et Ressources

- **GitHub**: https://github.com/ephraimgansonre10-gif/formation-ia-burkina
- **Vercel Dashboard**: https://vercel.com/ephraimgansonre10-gif/formation-ia-burkina
- **Supabase Dashboard**: https://supabase.com/dashboard/project/amajwhufvtyzhdlkrkkm

---

*Documentation générée le 20 Février 2026*

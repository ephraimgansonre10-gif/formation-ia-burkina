# 📋 NOTE GLOBALE DU PROJET - Formation IA Burkina Faso

*Dernière mise à jour: 20 Février 2026*

---

## 🎯 DESCRIPTION DU PROJET

Site web promotionnel pour une formation en Intelligence Artificielle au Burkina Faso. Le site comprend:
- **Page publique**: Présentation de la formation, modules, tarifs, témoignages, contact
- **Page Admin**: Interface d'administration pour modifier le contenu du site

---

## 🛠️ TECHNOLOGIES UTILISÉES

| Technologie | Version | Usage |
|-------------|---------|-------|
| Next.js | 14.2.35 | Framework React SSR |
| React | 18.2.0 | UI Library |
| TypeScript | 5.0.0 | Typage statique |
| Tailwind CSS | 3.x | Styles (non utilisé - CSS pur) |
| Supabase | - | Base de données PostgreSQL |

---

## 📁 STRUCTURE DU PROJET

```
C:\Users\user\Desktop\Opus4.6\
├── src/
│   ├── app/
│   │   ├── page.tsx              # Page d'accueil publique
│   │   ├── layout.tsx            # Layout principal
│   │   ├── globals.css           # Styles CSS globaux
│   │   ├── admin/
│   │   │   ├── page.tsx          # Dashboard admin
│   │   │   └── login/
│   │   │       └── page.tsx      # Page de connexion admin
│   │   └── api/
│   │       ├── content/route.ts  # API pour le contenu
│   │       └── auth/
│   │           ├── login/route.ts    # API connexion
│   │           └── verify/route.ts   # API vérification token
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── About.tsx
│   │   ├── Modules.tsx
│   │   ├── Pricing.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── lib/
│       ├── data.ts           # Helper pour les données
│       └── supabase.ts       # Client Supabase
├── data.json                 # Contenu du site (source principale)
├── .env.local               # Variables d'environnement (NON versionné)
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── next.config.js
└── vercel.json
```

---

## 🌐 DÉPLOIEMENT

### Vercel (Hosting)
- **URL du projet**: https://vercel.com/ephraimgansonre10-gif/formation-ia-burkina
- **Site en ligne**: https://formation-ia-burkina.vercel.app
- **Statut**: Déployé automatiquement depuis GitHub

### GitHub (Code Source)
- **Repository**: https://github.com/ephraimgansonre10-gif/formation-ia-burkina
- **Propriétaire**: ephraimgansonre10-gif
- **Branch principale**: main

### Supabase (Base de données)
- **Dashboard**: https://supabase.com/dashboard/project/amajwhufvtyzhdlkrkkm
- **Project URL**: https://amajwhufvtyzhdlkrkkm.supabase.co
- **Table utilisée**: `site_content`
- **Structure de la table**:
  ```sql
  CREATE TABLE site_content (
    id INTEGER PRIMARY KEY DEFAULT 1,
    content JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ```

---

## 🔐 IDENTIFIANTS ET SECRETS

### Admin
- **URL**: `/admin/login`
- **Mot de passe**: `admin123`
- **Secret token**: `formation-ia-burkina-secret-key-2024`

### Variables d'environnement Vercel
```
NEXT_PUBLIC_SUPABASE_URL=https://amajwhufvtyzhdlkrkkm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_48C92QoKFyAjIj-cRqmkvQ_Z_AThBQV
ADMIN_PASSWORD=admin123
ADMIN_SECRET=formation-ia-burkina-secret-key-2024
```

### GitHub Tokens (à générer pour chaque push)
- Créer un token: https://github.com/settings/tokens
- Cocher "repo" pour les permissions

---

## ⚠️ PROBLÈMES CONNUS

### 1. Erreur Supabase sur Vercel
**Problème**: `Dynamic server usage: no-store fetch` - Next.js 14 n'autorise pas le fetch dynamique avec `cache: 'no-store'` lors du build statique.

**Solution actuelle**: La page d'accueil utilise directement le fichier `data.json` local. Les modifications dans l'admin sont sauvegardées dans Supabase mais ne sont pas reflétées sur le site public tant qu'un nouveau déploiement n'est pas effectué.

**Solution permanente recommandée**: 
- Convertir la page en client-side avec `'use client'`
- Ou utiliser Supabase Realtime pour les mises à jour

### 2. Animations CSS
**Problème**: Les animations avec `opacity: 0` au départ faisaient disparaître les éléments.

**Statut**: Les animations ont été retirées. Le CSS est stable mais sans animations avancées.

### 3. Responsive Mobile
**Statut**: Le CSS responsive fonctionne mais peut être amélioré pour les petits écrans.

---

## ✅ CE QUI FONCTIONNE

- ✅ Page d'accueil publique (affichage)
- ✅ Navigation entre sections
- ✅ Formulaire de contact (côté client)
- ✅ Page de connexion admin
- ✅ Dashboard admin (lecture des données)
- ✅ Sauvegarde dans Supabase (API fonctionne)
- ✅ Déploiement automatique Vercel

---

## ❌ CE QUI NE FONCTIONNE PAS ENCORE

- ❌ Modifications admin visibles en temps réel sur le site public
- ❌ Animations CSS avancées (retirées pour stabilité)
- ❌ Notifications email lors d'un contact

---

## 🔄 WORKFLOW DE DÉVELOPPEMENT

### Pour modifier le contenu:
1. Aller sur `/admin/login`
2. Se connecter avec le mot de passe
3. Modifier le contenu dans les onglets
4. Cliquer "Sauvegarder"
5. **IMPORTANT**: Les changements sont dans Supabase mais pas sur le site public

### Pour que les changements soient visibles:
1. Récupérer le contenu de Supabase et mettre à jour `data.json`
2. Ou modifier directement `data.json` en local
3. Pousser sur GitHub: `git add . && git commit -m "message" && git push`
4. Vercel redéploie automatiquement

### Commandes locales:
```bash
# Démarrer en développement
npm run dev

# Build pour production
npm run build

# Pousser sur GitHub (nécessite un token)
git add .
git commit -m "description"
git push
```

---

## 📝 FICHIER DATA.JSON

C'est la source principale du contenu. Structure:
```json
{
  "content": {
    "hero": { "title", "subtitle", "description", "cta" },
    "about": { "title", "description", "features": [] },
    "modules": [],
    "pricing": { "title", "plans": [] },
    "contact": { "title", "address", "phone", "email", "hours" },
    "testimonials": [],
    "stats": { "students", "satisfaction", "employmentRate", "hoursContent" }
  },
  "admin": {
    "password": "admin123",
    "secret": "formation-ia-burkina-secret-key-2024"
  }
}
```

---

## 🚀 POURSUITE DU DÉVELOPPEMENT

### Priorité 1 - Synchronisation Admin/Public
Le problème principal est que les modifications dans l'admin ne sont pas visibles sur le site public.

**Solution recommandée**:
1. Créer une version client-side de la page d'accueil
2. Charger le contenu depuis l'API `/api/content` au montage
3. Utiliser SWR ou React Query pour le cache

### Priorité 2 - Sécurité
- Changer le mot de passe admin par défaut
- Utiliser des variables d'environnement sécurisées
- Implémenter une vraie authentification

### Priorité 3 - Fonctionnalités
- Formulaire de contact fonctionnel (envoi email)
- Analytics
- SEO optimisé

---

## 📞 CONTACTS

- **Développeur**: Projet créé avec l'aide de Claude (Anthropic)
- **Propriétaire**: ephraimgansonre10-gif (GitHub)

---

## 📌 NOTES IMPORTANTES

1. **Tokens GitHub**: Ils expirent. Toujours en générer un nouveau pour chaque session de push.

2. **Variables Vercel**: Elles sont configurées dans Settings → Environment Variables. Ne pas les mettre dans le code.

3. **Supabase**: La base est créée mais la synchronisation avec le site public n'est pas automatique.

4. **CSS**: Le fichier `globals.css` contient tous les styles. Tailwind est installé mais pas utilisé.

5. **Build**: Toujours vérifier `npm run build` avant de pousser sur GitHub.

---

*Fin de la note - Projet fonctionnel mais nécessite des améliorations pour la synchronisation temps réel.*

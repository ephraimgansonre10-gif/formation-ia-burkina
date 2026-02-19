'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ContentData {
  hero: {
    title: string
    subtitle: string
    description: string
    cta: string
  }
  about: {
    title: string
    description: string
    features: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  modules: Array<{
    id: number
    title: string
    description: string
    duration: string
    level: string
  }>
  pricing: {
    title: string
    plans: Array<{
      name: string
      price: string
      currency: string
      duration: string
      features: string[]
      popular: boolean
    }>
  }
  contact: {
    title: string
    address: string
    phone: string
    email: string
    hours: string
  }
  testimonials: Array<{
    name: string
    role: string
    content: string
    avatar: string
  }>
  stats: {
    students: string
    satisfaction: string
    employmentRate: string
    hoursContent: string
  }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('hero')
  const [content, setContent] = useState<ContentData | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
    
    fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setIsAuthenticated(true)
          fetchContent()
        } else {
          localStorage.removeItem('adminToken')
          router.push('/admin/login')
        }
      })
      .catch(() => router.push('/admin/login'))
      .finally(() => setIsLoading(false))
  }, [router])

  const fetchContent = async () => {
    const res = await fetch('/api/content')
    const data = await res.json()
    setContent(data)
  }

  const handleSave = async () => {
    setSaving(true)
    const token = localStorage.getItem('adminToken')
    
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(content)
      })
      
      if (res.ok) {
        setMessage('Contenu sauvegardé avec succès !')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch {
      setMessage('Erreur lors de la sauvegarde')
    }
    
    setSaving(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    )
  }

  if (!isAuthenticated || !content) return null

  const tabs = [
    { id: 'hero', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'modules', label: 'Modules' },
    { id: 'pricing', label: 'Tarifs' },
    { id: 'testimonials', label: 'Témoignages' },
    { id: 'contact', label: 'Contact' },
    { id: 'stats', label: 'Statistiques' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="/" className="text-blue-600 hover:underline">← Voir le site</a>
            <h1 className="text-xl font-bold">Administration</h1>
          </div>
          <button onClick={handleLogout} className="text-red-600 hover:underline">
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {message && (
          <div className="mb-4 p-4 rounded-lg bg-green-100 text-green-800">
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Section Hero</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  className="admin-input"
                  value={content.hero.title}
                  onChange={(e) => setContent({...content, hero: {...content.hero, title: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sous-titre</label>
                <input
                  type="text"
                  className="admin-input"
                  value={content.hero.subtitle}
                  onChange={(e) => setContent({...content, hero: {...content.hero, subtitle: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="admin-textarea"
                  value={content.hero.description}
                  onChange={(e) => setContent({...content, hero: {...content.hero, description: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Texte du bouton</label>
                <input
                  type="text"
                  className="admin-input"
                  value={content.hero.cta}
                  onChange={(e) => setContent({...content, hero: {...content.hero, cta: e.target.value}})}
                />
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Section À propos</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  className="admin-input"
                  value={content.about.title}
                  onChange={(e) => setContent({...content, about: {...content.about, title: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="admin-textarea"
                  value={content.about.description}
                  onChange={(e) => setContent({...content, about: {...content.about, description: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Caractéristiques</label>
                {content.about.features.map((feature, index) => (
                  <div key={index} className="border p-4 rounded-lg mb-4 bg-gray-50">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <label className="block text-xs font-medium mb-1">Icône</label>
                        <select
                          className="admin-input"
                          value={feature.icon}
                          onChange={(e) => {
                            const newFeatures = [...content.about.features]
                            newFeatures[index].icon = e.target.value
                            setContent({...content, about: {...content.about, features: newFeatures}})
                          }}
                        >
                          <option value="graduation-cap">Diplôme</option>
                          <option value="users">Utilisateurs</option>
                          <option value="briefcase">Mallette</option>
                          <option value="clock">Horloge</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Titre</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={feature.title}
                          onChange={(e) => {
                            const newFeatures = [...content.about.features]
                            newFeatures[index].title = e.target.value
                            setContent({...content, about: {...content.about, features: newFeatures}})
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Description</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={feature.description}
                        onChange={(e) => {
                          const newFeatures = [...content.about.features]
                          newFeatures[index].description = e.target.value
                          setContent({...content, about: {...content.about, features: newFeatures}})
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'modules' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Modules de formation</h2>
              {content.modules.map((module, index) => (
                <div key={module.id} className="border p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Module {index + 1}</span>
                    <button
                      onClick={() => {
                        const newModules = content.modules.filter(m => m.id !== module.id)
                        setContent({...content, modules: newModules})
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">Titre</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={module.title}
                        onChange={(e) => {
                          const newModules = [...content.modules]
                          newModules[index].title = e.target.value
                          setContent({...content, modules: newModules})
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Niveau</label>
                      <select
                        className="admin-input"
                        value={module.level}
                        onChange={(e) => {
                          const newModules = [...content.modules]
                          newModules[index].level = e.target.value
                          setContent({...content, modules: newModules})
                        }}
                      >
                        <option value="Débutant">Débutant</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Avancé">Avancé</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">Description</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={module.description}
                        onChange={(e) => {
                          const newModules = [...content.modules]
                          newModules[index].description = e.target.value
                          setContent({...content, modules: newModules})
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Durée</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={module.duration}
                        onChange={(e) => {
                          const newModules = [...content.modules]
                          newModules[index].duration = e.target.value
                          setContent({...content, modules: newModules})
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newId = Math.max(...content.modules.map(m => m.id)) + 1
                  setContent({
                    ...content,
                    modules: [...content.modules, {
                      id: newId,
                      title: 'Nouveau module',
                      description: 'Description du module',
                      duration: '2 semaines',
                      level: 'Débutant'
                    }]
                  })
                }}
                className="btn-primary"
              >
                + Ajouter un module
              </button>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Plans tarifaires</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Titre de la section</label>
                <input
                  type="text"
                  className="admin-input"
                  value={content.pricing.title}
                  onChange={(e) => setContent({...content, pricing: {...content.pricing, title: e.target.value}})}
                />
              </div>
              {content.pricing.plans.map((plan, index) => (
                <div key={index} className="border p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Plan: {plan.name}</span>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={plan.popular}
                        onChange={(e) => {
                          const newPlans = content.pricing.plans.map((p, i) => ({
                            ...p,
                            popular: i === index ? e.target.checked : false
                          }))
                          setContent({...content, pricing: {...content.pricing, plans: newPlans}})
                        }}
                      />
                      <span className="text-sm">Plus populaire</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">Nom</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={plan.name}
                        onChange={(e) => {
                          const newPlans = [...content.pricing.plans]
                          newPlans[index].name = e.target.value
                          setContent({...content, pricing: {...content.pricing, plans: newPlans}})
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Prix</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={plan.price}
                        onChange={(e) => {
                          const newPlans = [...content.pricing.plans]
                          newPlans[index].price = e.target.value
                          setContent({...content, pricing: {...content.pricing, plans: newPlans}})
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Devise</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={plan.currency}
                        onChange={(e) => {
                          const newPlans = [...content.pricing.plans]
                          newPlans[index].currency = e.target.value
                          setContent({...content, pricing: {...content.pricing, plans: newPlans}})
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Avantages (un par ligne)</label>
                    <textarea
                      className="admin-textarea"
                      value={plan.features.join('\n')}
                      onChange={(e) => {
                        const newPlans = [...content.pricing.plans]
                        newPlans[index].features = e.target.value.split('\n').filter(f => f.trim())
                        setContent({...content, pricing: {...content.pricing, plans: newPlans}})
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Témoignages</h2>
              {content.testimonials.map((testimonial, index) => (
                <div key={index} className="border p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{testimonial.name}</span>
                    <button
                      onClick={() => {
                        const newTestimonials = content.testimonials.filter((_, i) => i !== index)
                        setContent({...content, testimonials: newTestimonials})
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">Nom</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={testimonial.name}
                        onChange={(e) => {
                          const newTestimonials = [...content.testimonials]
                          newTestimonials[index].name = e.target.value
                          setContent({...content, testimonials: newTestimonials})
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Rôle</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={testimonial.role}
                        onChange={(e) => {
                          const newTestimonials = [...content.testimonials]
                          newTestimonials[index].role = e.target.value
                          setContent({...content, testimonials: newTestimonials})
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Témoignage</label>
                    <textarea
                      className="admin-textarea"
                      value={testimonial.content}
                      onChange={(e) => {
                        const newTestimonials = [...content.testimonials]
                        newTestimonials[index].content = e.target.value
                        setContent({...content, testimonials: newTestimonials})
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  setContent({
                    ...content,
                    testimonials: [...content.testimonials, {
                      name: 'Nouveau témoignage',
                      role: 'Profession',
                      content: 'Contenu du témoignage...',
                      avatar: '/images/avatar.jpg'
                    }]
                  })
                }}
                className="btn-primary"
              >
                + Ajouter un témoignage
              </button>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Informations de contact</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  className="admin-input"
                  value={content.contact.title}
                  onChange={(e) => setContent({...content, contact: {...content.contact, title: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Adresse</label>
                <input
                  type="text"
                  className="admin-input"
                  value={content.contact.address}
                  onChange={(e) => setContent({...content, contact: {...content.contact, address: e.target.value}})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Téléphone</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={content.contact.phone}
                    onChange={(e) => setContent({...content, contact: {...content.contact, phone: e.target.value}})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={content.contact.email}
                    onChange={(e) => setContent({...content, contact: {...content.contact, email: e.target.value}})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Horaires</label>
                <input
                  type="text"
                  className="admin-input"
                  value={content.contact.hours}
                  onChange={(e) => setContent({...content, contact: {...content.contact, hours: e.target.value}})}
                />
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Étudiants formés</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={content.stats.students}
                    onChange={(e) => setContent({...content, stats: {...content.stats, students: e.target.value}})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Satisfaction</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={content.stats.satisfaction}
                    onChange={(e) => setContent({...content, stats: {...content.stats, satisfaction: e.target.value}})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Taux d'emploi</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={content.stats.employmentRate}
                    onChange={(e) => setContent({...content, stats: {...content.stats, employmentRate: e.target.value}})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Heures de contenu</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={content.stats.hoursContent}
                    onChange={(e) => setContent({...content, stats: {...content.stats, hoursContent: e.target.value}})}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-4 border-t">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary"
            >
              {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

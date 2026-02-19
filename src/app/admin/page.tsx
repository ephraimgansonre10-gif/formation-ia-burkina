'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ContentData {
  hero: { title: string; subtitle: string; description: string; cta: string }
  about: { title: string; description: string; features: Array<{ icon: string; title: string; description: string }> }
  modules: Array<{ id: number; title: string; description: string; duration: string; level: string }>
  pricing: { title: string; plans: Array<{ name: string; price: string; currency: string; duration: string; features: string[]; popular: boolean }> }
  contact: { title: string; address: string; phone: string; email: string; hours: string }
  testimonials: Array<{ name: string; role: string; content: string; avatar: string }>
  stats: { students: string; satisfaction: string; employmentRate: string; hoursContent: string }
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
    
    fetch('/api/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
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
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(content)
      })
      
      if (res.ok) {
        setMessage('success')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('error')
      }
    } catch {
      setMessage('error')
    }
    
    setSaving(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner"></div>
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
    { id: 'stats', label: 'Stats' },
  ]

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-header-left">
            <a href="/">← Voir le site</a>
            <h1>Administration</h1>
          </div>
          <button onClick={handleLogout} className="admin-logout-btn">
            Déconnexion
          </button>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {message && (
          <div className={`admin-message ${message}`}>
            {message === 'success' ? '✓ Contenu sauvegardé avec succès !' : '✗ Erreur lors de la sauvegarde'}
          </div>
        )}

        <div className="admin-card">
          {activeTab === 'hero' && (
            <>
              <h2>Section Hero</h2>
              <div className="admin-field">
                <label>Titre principal</label>
                <input
                  type="text"
                  value={content.hero.title}
                  onChange={(e) => setContent({...content, hero: {...content.hero, title: e.target.value}})}
                />
              </div>
              <div className="admin-field">
                <label>Sous-titre</label>
                <input
                  type="text"
                  value={content.hero.subtitle}
                  onChange={(e) => setContent({...content, hero: {...content.hero, subtitle: e.target.value}})}
                />
              </div>
              <div className="admin-field">
                <label>Description</label>
                <textarea
                  value={content.hero.description}
                  onChange={(e) => setContent({...content, hero: {...content.hero, description: e.target.value}})}
                />
              </div>
              <div className="admin-field">
                <label>Texte du bouton</label>
                <input
                  type="text"
                  value={content.hero.cta}
                  onChange={(e) => setContent({...content, hero: {...content.hero, cta: e.target.value}})}
                />
              </div>
            </>
          )}

          {activeTab === 'about' && (
            <>
              <h2>Section À propos</h2>
              <div className="admin-field">
                <label>Titre</label>
                <input
                  type="text"
                  value={content.about.title}
                  onChange={(e) => setContent({...content, about: {...content.about, title: e.target.value}})}
                />
              </div>
              <div className="admin-field">
                <label>Description</label>
                <textarea
                  value={content.about.description}
                  onChange={(e) => setContent({...content, about: {...content.about, description: e.target.value}})}
                />
              </div>
              <h3 style={{ marginTop: '20px', marginBottom: '15px', fontSize: '16px' }}>Caractéristiques</h3>
              {content.about.features.map((feature, index) => (
                <div key={index} className="admin-subcard">
                  <div className="admin-subcard-header">
                    <span>Caractéristique {index + 1}</span>
                  </div>
                  <div className="admin-field-row">
                    <div className="admin-field">
                      <label>Icône</label>
                      <select
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
                    <div className="admin-field">
                      <label>Titre</label>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => {
                          const newFeatures = [...content.about.features]
                          newFeatures[index].title = e.target.value
                          setContent({...content, about: {...content.about, features: newFeatures}})
                        }}
                      />
                    </div>
                  </div>
                  <div className="admin-field">
                    <label>Description</label>
                    <input
                      type="text"
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
            </>
          )}

          {activeTab === 'modules' && (
            <>
              <h2>Modules de formation</h2>
              {content.modules.map((module, index) => (
                <div key={module.id} className="admin-subcard">
                  <div className="admin-subcard-header">
                    <span>Module {index + 1}</span>
                    <button
                      onClick={() => {
                        const newModules = content.modules.filter(m => m.id !== module.id)
                        setContent({...content, modules: newModules})
                      }}
                      className="admin-delete-btn"
                    >
                      Supprimer
                    </button>
                  </div>
                  <div className="admin-field-row">
                    <div className="admin-field">
                      <label>Titre</label>
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) => {
                          const newModules = [...content.modules]
                          newModules[index].title = e.target.value
                          setContent({...content, modules: newModules})
                        }}
                      />
                    </div>
                    <div className="admin-field">
                      <label>Niveau</label>
                      <select
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
                  <div className="admin-field-row">
                    <div className="admin-field">
                      <label>Description</label>
                      <input
                        type="text"
                        value={module.description}
                        onChange={(e) => {
                          const newModules = [...content.modules]
                          newModules[index].description = e.target.value
                          setContent({...content, modules: newModules})
                        }}
                      />
                    </div>
                    <div className="admin-field">
                      <label>Durée</label>
                      <input
                        type="text"
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
                    modules: [...content.modules, { id: newId, title: 'Nouveau module', description: 'Description', duration: '2 semaines', level: 'Débutant' }]
                  })
                }}
                className="admin-add-btn"
              >
                + Ajouter un module
              </button>
            </>
          )}

          {activeTab === 'pricing' && (
            <>
              <h2>Plans tarifaires</h2>
              <div className="admin-field">
                <label>Titre de la section</label>
                <input
                  type="text"
                  value={content.pricing.title}
                  onChange={(e) => setContent({...content, pricing: {...content.pricing, title: e.target.value}})}
                />
              </div>
              {content.pricing.plans.map((plan, index) => (
                <div key={index} className="admin-subcard">
                  <div className="admin-subcard-header">
                    <span>Plan: {plan.name}</span>
                    <label className="admin-checkbox">
                      <input
                        type="checkbox"
                        checked={plan.popular}
                        onChange={(e) => {
                          const newPlans = content.pricing.plans.map((p, i) => ({ ...p, popular: i === index ? e.target.checked : false }))
                          setContent({...content, pricing: {...content.pricing, plans: newPlans}})
                        }}
                      />
                      <span>Populaire</span>
                    </label>
                  </div>
                  <div className="admin-field-row">
                    <div className="admin-field">
                      <label>Nom</label>
                      <input type="text" value={plan.name} onChange={(e) => {
                        const newPlans = [...content.pricing.plans]
                        newPlans[index].name = e.target.value
                        setContent({...content, pricing: {...content.pricing, plans: newPlans}})
                      }} />
                    </div>
                    <div className="admin-field">
                      <label>Prix</label>
                      <input type="text" value={plan.price} onChange={(e) => {
                        const newPlans = [...content.pricing.plans]
                        newPlans[index].price = e.target.value
                        setContent({...content, pricing: {...content.pricing, plans: newPlans}})
                      }} />
                    </div>
                  </div>
                  <div className="admin-field">
                    <label>Avantages (un par ligne)</label>
                    <textarea
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
            </>
          )}

          {activeTab === 'testimonials' && (
            <>
              <h2>Témoignages</h2>
              {content.testimonials.map((testimonial, index) => (
                <div key={index} className="admin-subcard">
                  <div className="admin-subcard-header">
                    <span>{testimonial.name}</span>
                    <button onClick={() => {
                      const newTestimonials = content.testimonials.filter((_, i) => i !== index)
                      setContent({...content, testimonials: newTestimonials})
                    }} className="admin-delete-btn">Supprimer</button>
                  </div>
                  <div className="admin-field-row">
                    <div className="admin-field">
                      <label>Nom</label>
                      <input type="text" value={testimonial.name} onChange={(e) => {
                        const newTestimonials = [...content.testimonials]
                        newTestimonials[index].name = e.target.value
                        setContent({...content, testimonials: newTestimonials})
                      }} />
                    </div>
                    <div className="admin-field">
                      <label>Rôle</label>
                      <input type="text" value={testimonial.role} onChange={(e) => {
                        const newTestimonials = [...content.testimonials]
                        newTestimonials[index].role = e.target.value
                        setContent({...content, testimonials: newTestimonials})
                      }} />
                    </div>
                  </div>
                  <div className="admin-field">
                    <label>Témoignage</label>
                    <textarea value={testimonial.content} onChange={(e) => {
                      const newTestimonials = [...content.testimonials]
                      newTestimonials[index].content = e.target.value
                      setContent({...content, testimonials: newTestimonials})
                    }} />
                  </div>
                </div>
              ))}
              <button onClick={() => {
                setContent({
                  ...content,
                  testimonials: [...content.testimonials, { name: 'Nouveau', role: 'Profession', content: 'Témoignage...', avatar: '/images/avatar.jpg' }]
                })
              }} className="admin-add-btn">+ Ajouter un témoignage</button>
            </>
          )}

          {activeTab === 'contact' && (
            <>
              <h2>Informations de contact</h2>
              <div className="admin-field">
                <label>Titre</label>
                <input type="text" value={content.contact.title} onChange={(e) => setContent({...content, contact: {...content.contact, title: e.target.value}})} />
              </div>
              <div className="admin-field">
                <label>Adresse</label>
                <input type="text" value={content.contact.address} onChange={(e) => setContent({...content, contact: {...content.contact, address: e.target.value}})} />
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Téléphone</label>
                  <input type="text" value={content.contact.phone} onChange={(e) => setContent({...content, contact: {...content.contact, phone: e.target.value}})} />
                </div>
                <div className="admin-field">
                  <label>Email</label>
                  <input type="text" value={content.contact.email} onChange={(e) => setContent({...content, contact: {...content.contact, email: e.target.value}})} />
                </div>
              </div>
              <div className="admin-field">
                <label>Horaires</label>
                <input type="text" value={content.contact.hours} onChange={(e) => setContent({...content, contact: {...content.contact, hours: e.target.value}})} />
              </div>
            </>
          )}

          {activeTab === 'stats' && (
            <>
              <h2>Statistiques</h2>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Étudiants formés</label>
                  <input type="text" value={content.stats.students} onChange={(e) => setContent({...content, stats: {...content.stats, students: e.target.value}})} />
                </div>
                <div className="admin-field">
                  <label>Satisfaction</label>
                  <input type="text" value={content.stats.satisfaction} onChange={(e) => setContent({...content, stats: {...content.stats, satisfaction: e.target.value}})} />
                </div>
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Taux d'emploi</label>
                  <input type="text" value={content.stats.employmentRate} onChange={(e) => setContent({...content, stats: {...content.stats, employmentRate: e.target.value}})} />
                </div>
                <div className="admin-field">
                  <label>Heures de contenu</label>
                  <input type="text" value={content.stats.hoursContent} onChange={(e) => setContent({...content, stats: {...content.stats, hoursContent: e.target.value}})} />
                </div>
              </div>
            </>
          )}

          <div className="admin-save-section">
            <button onClick={handleSave} disabled={saving} className="admin-save-btn">
              {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

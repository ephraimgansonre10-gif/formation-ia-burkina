interface ModuleData {
  id: number
  title: string
  description: string
  duration: string
  level: string
}

const levelClass: Record<string, string> = {
  'Débutant': 'level-beginner',
  'Intermédiaire': 'level-intermediate',
  'Avancé': 'level-advanced',
  'Expert': 'level-expert',
}

export default function Modules({ data }: { data: ModuleData[] }) {
  return (
    <section id="modules" className="modules">
      <div className="section-inner">
        <div className="section-title">
          <h2>Programme de Formation</h2>
          <p>Un parcours complet de 20 semaines pour maîtriser l'Intelligence Artificielle</p>
        </div>
        
        <div className="modules-grid">
          {data.map((module, index) => (
            <div key={module.id} className="module-card">
              <div className="module-header">
                <div className="module-number">{index + 1}</div>
                <span className={`module-level ${levelClass[module.level] || 'level-beginner'}`}>
                  {module.level}
                </span>
              </div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <div className="module-duration">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {module.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

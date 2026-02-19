interface ModuleData {
  id: number
  title: string
  description: string
  duration: string
  level: string
}

const levelColors: Record<string, string> = {
  'Débutant': 'bg-green-100 text-green-800',
  'Intermédiaire': 'bg-yellow-100 text-yellow-800',
  'Avancé': 'bg-orange-100 text-orange-800',
  'Expert': 'bg-red-100 text-red-800',
}

export default function Modules({ data }: { data: ModuleData[] }) {
  return (
    <section id="modules" className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Programme de Formation</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un parcours complet de 20 semaines pour maîtriser l'Intelligence Artificielle
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((module, index) => (
            <div key={module.id} className="card p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 gradient-bg opacity-10 rounded-bl-full"></div>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                  {index + 1}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelColors[module.level]}`}>
                  {module.level}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
              <p className="text-gray-600 mb-4">{module.description}</p>
              
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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

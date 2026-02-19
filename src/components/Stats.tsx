interface StatsData {
  students: string
  satisfaction: string
  employmentRate: string
  hoursContent: string
}

export default function Stats({ data }: { data: StatsData }) {
  const stats = [
    { value: data.students, label: 'Étudiants formés', icon: '👨‍🎓' },
    { value: data.satisfaction, label: 'Satisfaction', icon: '⭐' },
    { value: data.employmentRate, label: 'Taux d\'emploi', icon: '💼' },
    { value: data.hoursContent, label: 'Heures de contenu', icon: '📚' },
  ]

  return (
    <section className="stats">
      <div className="stats-inner">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

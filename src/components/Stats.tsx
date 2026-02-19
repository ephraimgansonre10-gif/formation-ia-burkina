'use client'

import { useEffect, useRef, useState } from 'react'

interface StatsData {
  students: string
  satisfaction: string
  employmentRate: string
  hoursContent: string
}

export default function Stats({ data }: { data: StatsData }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { value: data.students, label: 'Étudiants formés', icon: '👨‍🎓' },
    { value: data.satisfaction, label: 'Satisfaction', icon: '⭐' },
    { value: data.employmentRate, label: 'Taux d\'emploi', icon: '💼' },
    { value: data.hoursContent, label: 'Heures de contenu', icon: '📚' },
  ]

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

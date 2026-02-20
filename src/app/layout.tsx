import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Formation IA Burkina Faso | Intelligence Artificielle',
  description: 'Formation complète en Intelligence Artificielle au Burkina Faso. Machine Learning, Deep Learning, Python. Devenez expert en IA.',
  keywords: 'IA, Intelligence Artificielle, Formation, Burkina Faso, Machine Learning, Deep Learning, Python',
  openGraph: {
    title: 'Formation IA Burkina Faso',
    description: 'Maîtrisez l\'Intelligence Artificielle au Burkina Faso',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}

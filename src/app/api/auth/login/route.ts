import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    const adminSecret = process.env.ADMIN_SECRET || 'formation-ia-burkina-secret-key-2024'

    if (password === adminPassword) {
      return NextResponse.json({ 
        token: adminSecret,
        message: 'Connexion réussie' 
      })
    }

    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Erreur de serveur' }, { status: 500 })
  }
}

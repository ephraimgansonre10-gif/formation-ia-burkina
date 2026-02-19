import { NextRequest, NextResponse } from 'next/server'
import { getAdminConfig } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const adminConfig = getAdminConfig()

    if (password === adminConfig.password) {
      return NextResponse.json({ 
        token: adminConfig.secret,
        message: 'Connexion réussie' 
      })
    }

    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Erreur de serveur' }, { status: 500 })
  }
}

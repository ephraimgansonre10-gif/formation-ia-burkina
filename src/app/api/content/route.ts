import { NextRequest, NextResponse } from 'next/server'
import { getContent, getAdminConfig } from '@/lib/data'

export async function GET() {
  return NextResponse.json(getContent())
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const token = authHeader.substring(7)
  const adminConfig = getAdminConfig()
  
  if (token !== adminConfig.secret) {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
  }

  try {
    const newContent = await request.json()
    const fs = await import('fs')
    const path = await import('path')
    
    const dataPath = path.join(process.cwd(), 'data.json')
    const data = await import('@/lib/data').then(m => m.default)
    const updatedData = { ...data, content: newContent }
    
    fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2))
    
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', 1)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Erreur de base de données' }, { status: 500 })
    }

    return NextResponse.json(data?.content || {})
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const token = authHeader.substring(7)
  const adminSecret = process.env.ADMIN_SECRET || 'formation-ia-burkina-secret-key-2024'
  
  if (token !== adminSecret) {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
  }

  try {
    const newContent = await request.json()
    
    const { error } = await supabase
      .from('site_content')
      .upsert({
        id: 1,
        content: newContent,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

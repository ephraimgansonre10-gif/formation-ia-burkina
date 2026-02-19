import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ valid: false })
  }

  const token = authHeader.substring(7)
  const adminSecret = process.env.ADMIN_SECRET || 'formation-ia-burkina-secret-key-2024'
  
  return NextResponse.json({ valid: token === adminSecret })
}

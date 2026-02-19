import { NextRequest, NextResponse } from 'next/server'
import { getAdminConfig } from '@/lib/data'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ valid: false })
  }

  const token = authHeader.substring(7)
  const adminConfig = getAdminConfig()
  
  return NextResponse.json({ valid: token === adminConfig.secret })
}

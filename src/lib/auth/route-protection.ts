import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function withAuth(
  handler: (request: NextRequest, user: any) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const supabase = createClient()

    try {
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error || !user) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }

      return handler(request, user)
    } catch (error) {
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      )
    }
  }
}

export async function withOptionalAuth(
  handler: (request: NextRequest, user: any | null) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const supabase = createClient()

    try {
      const { data: { user } } = await supabase.auth.getUser()
      return handler(request, user)
    } catch (error) {
      return handler(request, null)
    }
  }
}
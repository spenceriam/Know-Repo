import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    
    try {
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth callback error:', error)
        return NextResponse.redirect(`${requestUrl.origin}/auth/signin?error=auth_callback_error`)
      }

      // If we have a session, create or update the user profile
      if (data.session) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.session.user.id,
            github_username: data.session.user.user_metadata?.user_name,
            avatar_url: data.session.user.user_metadata?.avatar_url,
            github_provider_token: data.session.provider_token,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'id'
          })

        if (profileError) {
          console.error('Profile update error:', profileError)
        }
      }

      // Redirect to dashboard
      return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${requestUrl.origin}/auth/signin?error=auth_callback_error`)
    }
  }

  // If no code, redirect to sign in
  return NextResponse.redirect(`${requestUrl.origin}/auth/signin`)
} 
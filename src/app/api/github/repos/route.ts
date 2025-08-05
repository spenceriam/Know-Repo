import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from 'octokit'

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Check if user is authenticated
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile with GitHub token
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('github_provider_token')
      .eq('id', session.user.id)
      .single()

    if (profileError || !profile?.github_provider_token) {
      return NextResponse.json({ error: 'GitHub token not available' }, { status: 400 })
    }

    // Initialize Octokit with the GitHub token
    const octokit = new Octokit({
      auth: profile.github_provider_token,
    })

    // Fetch user's repositories
    const { data: repos, error: reposError } = await octokit.rest.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100,
    })

    if (reposError) {
      console.error('GitHub API error:', reposError)
      return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 })
    }

    // Filter and format repositories
    const formattedRepos = repos
      .filter(repo => !repo.fork) // Only include non-forked repositories
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        private: repo.private,
        html_url: repo.html_url,
        updated_at: repo.updated_at,
      }))

    return NextResponse.json({ repos: formattedRepos })
  } catch (error) {
    console.error('Error in GitHub repos API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 
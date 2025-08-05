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

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    // Get the project details
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single()

    if (projectError || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Get the admin's GitHub token for this project
    const { data: adminProfile, error: profileError } = await supabase
      .from('profiles')
      .select('github_provider_token')
      .eq('id', project.user_id)
      .single()

    if (profileError || !adminProfile?.github_provider_token) {
      return NextResponse.json({ error: 'GitHub token not available' }, { status: 400 })
    }

    // Parse repository name from full_name
    const [owner, repo] = project.github_repo_fullname.split('/')

    // Initialize Octokit with the admin's GitHub token
    const octokit = new Octokit({
      auth: adminProfile.github_provider_token,
    })

    // Fetch open issues from the repository
    const { data: issues, error: issuesError } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: 'open',
      sort: 'created',
      direction: 'desc',
      per_page: 50,
    })

    if (issuesError) {
      console.error('GitHub API error:', issuesError)
      return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 })
    }

    // Format issues for the frontend
    const formattedIssues = issues.map(issue => ({
      id: issue.id,
      number: issue.number,
      title: issue.title,
      body: issue.body,
      state: issue.state,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      user: {
        login: issue.user?.login,
        avatar_url: issue.user?.avatar_url,
      },
      labels: issue.labels.map(label => ({
        name: typeof label === 'string' ? label : label.name,
        color: typeof label === 'string' ? undefined : label.color,
      })),
    }))

    return NextResponse.json({ issues: formattedIssues })
  } catch (error) {
    console.error('Error in GitHub issues API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 
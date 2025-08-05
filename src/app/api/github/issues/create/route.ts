import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from 'octokit'

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Check if user is authenticated
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { projectId, title, description } = body

    if (!projectId || !title || !description) {
      return NextResponse.json({ error: 'Project ID, title, and description are required' }, { status: 400 })
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

    // Create the issue in GitHub
    const { data: newIssue, error: createError } = await octokit.rest.issues.create({
      owner,
      repo,
      title,
      body: description,
    })

    if (createError) {
      console.error('GitHub API error:', createError)
      return NextResponse.json({ error: 'Failed to create issue' }, { status: 500 })
    }

    // Format the response
    const formattedIssue = {
      id: newIssue.id,
      number: newIssue.number,
      title: newIssue.title,
      body: newIssue.body,
      state: newIssue.state,
      created_at: newIssue.created_at,
      updated_at: newIssue.updated_at,
      user: {
        login: newIssue.user?.login,
        avatar_url: newIssue.user?.avatar_url,
      },
      labels: newIssue.labels.map(label => ({
        name: typeof label === 'string' ? label : label.name,
        color: typeof label === 'string' ? undefined : label.color,
      })),
    }

    return NextResponse.json({ issue: formattedIssue })
  } catch (error) {
    console.error('Error in GitHub create issue API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 
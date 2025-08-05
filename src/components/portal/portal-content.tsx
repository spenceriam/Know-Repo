'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Plus, GitBranch, Loader2, X, Calendar, User } from 'lucide-react'
import CreateIssueModal from './create-issue-modal'
import IssueCard from './issue-card'

interface PortalContentProps {
  project: {
    id: string
    project_name: string
    github_repo_fullname: string
  }
}

interface GitHubIssue {
  id: number
  number: number
  title: string
  body: string
  state: string
  created_at: string
  updated_at: string
  user: {
    login: string
    avatar_url: string
  }
  labels: Array<{
    name: string
    color?: string
  }>
}

export default function PortalContent({ project }: PortalContentProps) {
  const [issues, setIssues] = useState<GitHubIssue[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchIssues()
  }, [project.id])

  const fetchIssues = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/github/issues?projectId=${project.id}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch issues')
      }

      const data = await response.json()
      setIssues(data.issues || [])
    } catch (error) {
      console.error('Error fetching issues:', error)
      setError('Failed to load issues. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateIssue = async (title: string, description: string) => {
    try {
      const response = await fetch('/api/github/issues/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: project.id,
          title,
          description,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create issue')
      }

      const data = await response.json()
      
      // Add the new issue to the beginning of the list
      setIssues(prevIssues => [data.issue, ...prevIssues])
      setIsCreateModalOpen(false)
    } catch (error) {
      console.error('Error creating issue:', error)
      setError('Failed to create issue. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <GitBranch className="h-6 w-6 text-blue-500" />
          <h2 className="text-lg font-medium text-white">Welcome to {project.project_name}</h2>
        </div>
        <p className="text-gray-400">
          You can view and create issues for this repository. This is a simplified interface 
          that doesn't require a GitHub account.
        </p>
      </div>

      {/* Issues Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white">Issues</h3>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Issue
          </button>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-400">Loading issues...</span>
          </div>
        ) : issues.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-300 mb-2">No issues found</h4>
            <p className="text-gray-500">
              This repository doesn't have any open issues yet. Create the first one!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <MessageSquare className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-300">About this portal</h4>
            <p className="mt-1 text-sm text-blue-200">
              This is a secure guest portal for {project.github_repo_fullname}. 
              You can view open issues and create new ones without needing a GitHub account.
            </p>
          </div>
        </div>
      </div>

      {/* Create Issue Modal */}
      <CreateIssueModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateIssue}
        projectName={project.project_name}
      />
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { X, GitBranch, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface AddRepoModalProps {
  isOpen: boolean
  onClose: () => void
  user: any
  profile: any
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  private: boolean
}

export default function AddRepoModal({ isOpen, onClose, user, profile }: AddRepoModalProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingRepos, setIsFetchingRepos] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null)
  const [projectName, setProjectName] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && profile?.github_provider_token) {
      fetchRepositories()
    }
  }, [isOpen, profile])

  const fetchRepositories = async () => {
    if (!profile?.github_provider_token) {
      setError('GitHub token not available. Please sign in again.')
      return
    }

    setIsFetchingRepos(true)
    setError(null)

    try {
      const response = await fetch('/api/github/repos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch repositories')
      }

      const data = await response.json()
      setRepos(data.repos || [])
    } catch (error) {
      console.error('Error fetching repos:', error)
      setError('Failed to fetch repositories. Please try again.')
    } finally {
      setIsFetchingRepos(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedRepo || !projectName.trim()) {
      setError('Please select a repository and enter a project name.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          project_name: projectName.trim(),
          github_repo_fullname: selectedRepo.full_name,
        })

      if (error) {
        throw error
      }

      // Close modal and refresh
      onClose()
      window.location.reload()
    } catch (error) {
      console.error('Error creating project:', error)
      setError('Failed to create project. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-white">Add Repository</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter a friendly name for this project"
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Repository
            </label>
            {isFetchingRepos ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-400">Loading repositories...</span>
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto border border-gray-600 rounded-md">
                {repos.map((repo) => (
                  <button
                    key={repo.id}
                    type="button"
                    onClick={() => setSelectedRepo(repo)}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 ${
                      selectedRepo?.id === repo.id ? 'bg-blue-600 text-white' : 'text-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <GitBranch className="h-4 w-4" />
                      <div className="flex-1">
                        <div className="font-medium">{repo.name}</div>
                        <div className="text-sm text-gray-400">{repo.full_name}</div>
                        {repo.description && (
                          <div className="text-xs text-gray-500 truncate">{repo.description}</div>
                        )}
                      </div>
                      {repo.private && (
                        <span className="text-xs bg-gray-600 px-2 py-1 rounded">Private</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !selectedRepo || !projectName.trim()}
              className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                'Add Repository'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 
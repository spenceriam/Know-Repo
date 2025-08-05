'use client'

import { useState } from 'react'
import { GitBranch, Mail, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import GuestAuth from './guest-auth'
import PortalContent from './portal-content'

interface GuestPortalProps {
  project: {
    id: string
    project_name: string
    github_repo_fullname: string
    shareable_link_id: string
  }
  isAuthenticated: boolean
  shareableLinkId: string
}

export default function GuestPortal({ project, isAuthenticated, shareableLinkId }: GuestPortalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await supabase.auth.signOut()
      window.location.reload()
    } catch (error) {
      console.error('Sign out error:', error)
      setError('Failed to sign out. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <GitBranch className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">Know-Repo</span>
              <span className="ml-4 text-sm text-gray-400">Guest Portal</span>
            </div>
            
            {isAuthenticated && (
              <button
                onClick={handleSignOut}
                disabled={isLoading}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-1" />
                    Sign out
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">{project.project_name}</h1>
            <p className="text-gray-400">{project.github_repo_fullname}</p>
          </div>

          {isAuthenticated ? (
            <PortalContent project={project} />
          ) : (
            <GuestAuth 
              project={project}
              shareableLinkId={shareableLinkId}
            />
          )}
        </div>
      </main>
    </div>
  )
} 
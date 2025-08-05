'use client'

import { useState } from 'react'
import { User, LogOut, Plus, Share2, GitBranch, Settings } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import AddRepoModal from './add-repo-modal'
import ProjectCard from './project-card'

interface DashboardContentProps {
  user: any
  profile: any
  projects: any[]
}

export default function DashboardContent({ user, profile, projects }: DashboardContentProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setIsLoading(true)
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleAddProject = () => {
    setIsAddModalOpen(true)
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
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {profile?.avatar_url && (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.github_username || 'User'} 
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span className="text-white">{profile?.github_username || user.email}</span>
              </div>
              
              <button
                onClick={handleSignOut}
                disabled={isLoading}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Your Repository Portals</h1>
              <p className="text-gray-400">Manage which repositories are accessible to guests</p>
            </div>
            
            <button
              onClick={handleAddProject}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Repository
            </button>
          </div>

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <GitBranch className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-300">No repositories added</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding your first repository to create a guest portal.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleAddProject}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Repository
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Repository Modal */}
      <AddRepoModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        user={user}
        profile={profile}
      />
    </div>
  )
} 
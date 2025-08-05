'use client'

import { useState } from 'react'
import { MessageSquare, Plus, GitBranch } from 'lucide-react'

interface PortalContentProps {
  project: {
    id: string
    project_name: string
    github_repo_fullname: string
  }
}

export default function PortalContent({ project }: PortalContentProps) {
  const [isLoading, setIsLoading] = useState(false)

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

      {/* Issues Section - Placeholder for Task 4 */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Issues</h3>
          <button
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Issue
          </button>
        </div>

        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h4 className="text-lg font-medium text-gray-300 mb-2">No issues found</h4>
          <p className="text-gray-500">
            Issues will appear here once they are created or when the repository has existing issues.
          </p>
        </div>
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
    </div>
  )
} 
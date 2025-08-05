'use client'

import { useState } from 'react'
import { Share2, GitBranch, Copy, Check } from 'lucide-react'

interface ProjectCardProps {
  project: {
    id: string
    project_name: string
    github_repo_fullname: string
    shareable_link_id: string
    created_at: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [copied, setCopied] = useState(false)
  const portalUrl = `${window.location.origin}/portal/${project.shareable_link_id}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(portalUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <GitBranch className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium text-white">{project.project_name}</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4">{project.github_repo_fullname}</p>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Portal URL:</span>
            <code className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
              {portalUrl}
            </code>
          </div>
        </div>
        
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center px-3 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </>
          )}
        </button>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
          <div className="flex items-center space-x-1">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  )
} 
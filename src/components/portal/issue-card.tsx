'use client'

import { useState } from 'react'
import { MessageSquare, Calendar, User, ExternalLink } from 'lucide-react'

interface IssueCardProps {
  issue: {
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
}

export default function IssueCard({ issue }: IssueCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <div className="bg-gray-700 rounded-lg border border-gray-600 p-4 hover:border-gray-500 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-400">#{issue.number}</span>
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
              {issue.state}
            </span>
          </div>
          
          <h4 className="text-lg font-medium text-white mb-2">
            {issue.title}
          </h4>

          {issue.body && (
            <p className="text-gray-300 mb-3">
              {isExpanded ? issue.body : truncateText(issue.body, 150)}
              {issue.body.length > 150 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="ml-2 text-blue-400 hover:text-blue-300 text-sm"
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </p>
          )}

          {/* Labels */}
          {issue.labels.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {issue.labels.map((label, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: label.color ? `#${label.color}` : '#6b7280',
                    color: label.color ? '#ffffff' : '#d1d5db',
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          )}

          {/* Meta information */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{issue.user.login}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(issue.created_at)}</span>
              </div>
            </div>
            
            <button
              onClick={() => window.open(`https://github.com/issues/${issue.number}`, '_blank')}
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300"
            >
              <ExternalLink className="h-4 w-4" />
              <span>View on GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 
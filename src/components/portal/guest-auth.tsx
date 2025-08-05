'use client'

import { useState } from 'react'
import { Mail, Loader2, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface GuestAuthProps {
  project: {
    id: string
    project_name: string
    github_repo_fullname: string
  }
  shareableLinkId: string
}

export default function GuestAuth({ project, shareableLinkId }: GuestAuthProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/portal/${shareableLinkId}`,
        }
      })

      if (error) {
        throw error
      }

      setIsSent(true)
    } catch (error) {
      console.error('Magic link error:', error)
      setError('Failed to send magic link. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSent) {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Check your email
          </h2>
          <p className="text-gray-400 mb-4">
            We've sent a magic link to <span className="text-white">{email}</span>
          </p>
          <p className="text-sm text-gray-500">
            Click the link in your email to access the portal. The link will expire in 1 hour.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
        <div className="text-center mb-6">
          <Mail className="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Access {project.project_name}
          </h2>
          <p className="text-gray-400">
            Enter your email to receive a secure access link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Send Magic Link
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            No GitHub account required. This is a secure, temporary access link.
          </p>
        </div>
      </div>
    </div>
  )
} 
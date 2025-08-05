import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import GuestPortal from '@/components/portal/guest-portal'

interface PortalPageProps {
  params: {
    shareable_link_id: string
  }
}

export default async function PortalPage({ params }: PortalPageProps) {
  const supabase = createServerComponentClient({ cookies })
  
  // Get the project by shareable link ID
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('shareable_link_id', params.shareable_link_id)
    .single()

  if (projectError || !project) {
    notFound()
  }

  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <div className="min-h-screen bg-gray-900">
      <GuestPortal 
        project={project}
        isAuthenticated={!!session}
        shareableLinkId={params.shareable_link_id}
      />
    </div>
  )
} 
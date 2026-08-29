import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Committee, VolunteerApplication } from '@/lib/types/database'
import { OrganizerDashboardClient } from '@/components/organizer/OrganizerDashboardClient'

export const dynamic = 'force-dynamic'

export default async function OrganizerDashboardPage() {
  const supabase = await createClient()

  // Protect route with Supabase Auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/organizer/login')
  }

  // Fetch committees
  const { data: committeesData, error: commError } = await supabase
    .from('committees')
    .select('*')
    .order('name')

  const committees: Committee[] = committeesData || []

  // Fetch applications
  const { data: applicationsData, error: appError } = await supabase
    .from('volunteer_applications')
    .select('*')
    .order('created_at', { ascending: false })

  const applications: VolunteerApplication[] = (applicationsData as VolunteerApplication[]) || []

  return (
    <OrganizerDashboardClient
      initialApplications={applications}
      committees={committees}
      organizerEmail={user.email || 'organizer@arduinoday.ph'}
    />
  )
}

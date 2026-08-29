import { createClient } from '@/lib/supabase/server'
import { Committee } from '@/lib/types/database'
import { VolunteerPortalClient } from '@/components/volunteer/VolunteerPortalClient'

export const dynamic = 'force-dynamic'

const FALLBACK_COMMITTEES: Committee[] = [
  {
    id: 'technical-av',
    name: 'Technical & Audio-Visual',
    description:
      'Oversee hardware test stations, workshop microcontroller setups, stage A/V systems, and technical troubleshooting.',
    responsibilities: [
      'Setup projector & live stream displays',
      'Test Arduino Uno/ESP32 workshop kits',
      'Manage audio mics and speakers',
      'Assist keynote speakers with tech setups',
    ],
    icon: 'Cpu',
    created_at: new Date().toISOString(),
  },
  {
    id: 'logistics-venue',
    name: 'Logistics & Venue Operations',
    description:
      'Coordinate venue ingress/egress, workshop materials kit distribution, booth layout, and attendee movement.',
    responsibilities: [
      'Venue floor plan setup & teardown',
      'Distribute maker swag & badge lanyards',
      'Manage workshop parts inventory',
      'Direct floor traffic and crowd logistics',
    ],
    icon: 'Boxes',
    created_at: new Date().toISOString(),
  },
  {
    id: 'program-speakers',
    name: 'Program & Speaker Relations',
    description:
      'Manage keynote timing, workshop speaker hospitality, master of ceremonies (MC) cues, and event scheduling.',
    responsibilities: [
      'Speaker check-in & hospitality',
      'Workshop timekeeping and transition cues',
      'Coordinate stage agenda and Q&A sessions',
      'Support workshop facilitators',
    ],
    icon: 'Mic',
    created_at: new Date().toISOString(),
  },
  {
    id: 'marketing-creatives',
    name: 'Marketing, Media & Creatives',
    description:
      'Document the event through professional photography, video highlight reels, social media live updates, and maker interviews.',
    responsibilities: [
      'Capture high-res event photography',
      'Film workshop and project showcase demos',
      'Publish live updates to social channels',
      'Interview keynote makers and attendees',
    ],
    icon: 'Camera',
    created_at: new Date().toISOString(),
  },
  {
    id: 'registration-ushering',
    name: 'Registration & Ushering',
    description:
      'Warmly welcome participants, scan attendee QR codes, verify registrations, and distribute official welcome kits.',
    responsibilities: [
      'Front desk check-in and QR ticket scan',
      'Distribute attendee badges & event passports',
      'Provide venue directions & program maps',
      'Answer general attendee questions',
    ],
    icon: 'Users',
    created_at: new Date().toISOString(),
  },
  {
    id: 'safety-firstaid',
    name: 'Safety & First Aid',
    description:
      'Ensure workshop electrical safety, soldering station ventilation, emergency egress clearance, and basic medical support.',
    responsibilities: [
      'Inspect soldering station safety and ventilation',
      'Maintain clean workshop walkways',
      'Coordinate with venue emergency staff',
      'Provide first-aid kit assistance',
    ],
    icon: 'ShieldAlert',
    created_at: new Date().toISOString(),
  },
]

export default async function HomePage() {
  let committees: Committee[] = FALLBACK_COMMITTEES

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('committees')
      .select('*')
      .order('name')

    if (!error && data && data.length > 0) {
      committees = data
    }
  } catch (err) {
    console.error('Error fetching committees from Supabase:', err)
  }

  return <VolunteerPortalClient committees={committees} />
}

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jwdlqmeqktsmfdnvrsyd.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZGxxbWVxa3RzbWZkbnZyc3lkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Nzk4ODY2NSwiZXhwIjoyMTAzNTY0NjY1fQ.Lnrcrds6x9zeMxInPQdWcr2pqVO-jg-j0oZynMxQ00g'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function seed() {
  const email = 'organizer@arduinoday.ph'
  const password = 'ArduinoDay2026!'

  console.log(`Checking organizer user: ${email}`)

  const { data: list, error: listError } = await supabase.auth.admin.listUsers()
  if (listError) {
    console.error('Failed to list users:', listError)
    process.exit(1)
  }

  const existing = list.users.find((u) => u.email === email)
  if (existing) {
    console.log(`Organizer already exists with ID: ${existing.id}`)
    process.exit(0)
  }

  const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      role: 'organizer',
      name: 'Lead Organizer',
    },
  })

  if (createError) {
    console.error('Failed to create organizer:', createError)
    process.exit(1)
  }

  console.log(`Organizer created successfully! ID: ${newUser.user.id}`)
}

seed()

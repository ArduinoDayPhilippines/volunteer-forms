'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { organizerLoginSchema } from '@/lib/validations/volunteer'

export async function loginOrganizer(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const validation = organizerLoginSchema.safeParse({ email, password })
  if (!validation.success) {
    return {
      error: validation.error.issues[0]?.message || 'Invalid email or password format',
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      error: error.message === 'Invalid login credentials'
        ? 'Invalid email or password. Please check your organizer credentials.'
        : error.message,
    }
  }

  redirect('/organizer')
}

export async function logoutOrganizer() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/organizer/login')
}

export async function updateApplicationStatusAction({
  applicationId,
  status,
  reviewerNotes,
}: {
  applicationId: string
  status: 'pending' | 'approved' | 'rejected' | 'waitlist'
  reviewerNotes?: string
}) {
  const supabase = await createClient()

  // Verify authenticated organizer
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      success: false,
      error: 'Unauthorized. You must be an authenticated organizer to perform this action.',
    }
  }

  const { data, error } = await supabase
    .from('volunteer_applications')
    .update({
      status,
      reviewer_notes: reviewerNotes || null,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', applicationId)
    .select()
    .single()

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  revalidatePath('/organizer')
  return {
    success: true,
    application: data,
  }
}

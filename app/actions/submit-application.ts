'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { volunteerApplicationSchema, VolunteerApplicationFormData } from '@/lib/validations/volunteer'

export type SubmitApplicationResult = {
  success: boolean
  applicationId?: string
  applicantName?: string
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function submitVolunteerApplication(
  formData: VolunteerApplicationFormData
): Promise<SubmitApplicationResult> {
  // Validate schema
  const validationResult = volunteerApplicationSchema.safeParse(formData)

  if (!validationResult.success) {
    const flattened = validationResult.error.flatten()
    return {
      success: false,
      error: 'Please resolve the validation errors before submitting.',
      fieldErrors: flattened.fieldErrors,
    }
  }

  const data = validationResult.data

  try {
    const adminSupabase = createAdminClient()

    // Check if email is already registered
    const { data: existingApp, error: checkError } = await adminSupabase
      .from('volunteer_applications')
      .select('id, email')
      .eq('email', data.email)
      .maybeSingle()

    if (checkError) {
      console.error('Error checking existing application:', checkError)
    }

    if (existingApp) {
      return {
        success: false,
        error: 'An application with this email address has already been submitted. If you need to update your application details, please contact the Arduino Day Philippines organizers directly.',
      }
    }

    // Insert volunteer application
    const { data: inserted, error: insertError } = await adminSupabase
      .from('volunteer_applications')
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        organization_or_school: data.organizationOrSchool || null,
        primary_committee_id: data.primaryCommitteeId,
        secondary_committee_id: data.secondaryCommitteeId || null,
        maker_hardware_experience: data.makerHardwareExperience,
        maker_experience_details: data.makerExperienceDetails || null,
        past_volunteer_experience: data.pastVolunteerExperience || null,
        availability: data.availability,
        tshirt_size: data.tshirtSize,
        emergency_contact_name: data.emergencyContactName,
        emergency_contact_phone: data.emergencyContactPhone,
        agreed_to_rules: true,
        agreed_to_photo_release: data.agreedToPhotoRelease,
        status: 'pending',
      })
      .select('id, full_name')
      .single()

    if (insertError) {
      if (insertError.code === '23505') {
        return {
          success: false,
          error: 'An application with this email address has already been submitted.',
        }
      }
      console.error('Supabase insert error:', insertError)
      return {
        success: false,
        error: `Submission failed: ${insertError.message}`,
      }
    }

    return {
      success: true,
      applicationId: inserted.id,
      applicantName: inserted.full_name,
    }
  } catch (err: unknown) {
    console.error('Unexpected error in submitVolunteerApplication:', err)
    const errorMessage = err instanceof Error ? err.message : 'An unexpected server error occurred.'
    return {
      success: false,
      error: errorMessage,
    }
  }
}

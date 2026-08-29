import { VolunteerApplication, Committee } from '@/lib/types/database'

export function exportApplicationsToCSV(
  applications: VolunteerApplication[],
  committees: Committee[],
  filenamePrefix = 'adph-2026-volunteers'
) {
  const committeeMap = new Map(committees.map((c) => [c.id, c.name]))

  const headers = [
    'Application ID',
    'Full Name',
    'Email',
    'Phone',
    'Organization / School',
    'Primary Committee',
    'Secondary Committee',
    'Status',
    'T-Shirt Size',
    'Availability Slots',
    'Hardware Skills',
    'Maker Project Details',
    'Past Volunteer Experience',
    'Emergency Contact Name',
    'Emergency Contact Phone',
    'Rules Agreed',
    'Photo Release Agreed',
    'Reviewer Notes',
    'Submitted At',
  ]

  const rows = applications.map((app) => {
    const primaryName = committeeMap.get(app.primary_committee_id) || app.primary_committee_id
    const secondaryName = app.secondary_committee_id
      ? committeeMap.get(app.secondary_committee_id) || app.secondary_committee_id
      : 'None'

    return [
      app.id,
      app.full_name,
      app.email,
      app.phone,
      app.organization_or_school || '',
      primaryName,
      secondaryName,
      app.status.toUpperCase(),
      app.tshirt_size,
      (app.availability || []).join('; '),
      (app.maker_hardware_experience || []).join('; '),
      app.maker_experience_details ? `"${app.maker_experience_details.replace(/"/g, '""')}"` : '',
      app.past_volunteer_experience ? `"${app.past_volunteer_experience.replace(/"/g, '""')}"` : '',
      app.emergency_contact_name,
      app.emergency_contact_phone,
      app.agreed_to_rules ? 'YES' : 'NO',
      app.agreed_to_photo_release ? 'YES' : 'NO',
      app.reviewer_notes ? `"${app.reviewer_notes.replace(/"/g, '""')}"` : '',
      new Date(app.created_at).toLocaleString('en-US', { timeZone: 'Asia/Manila' }),
    ]
  })

  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row
        .map((field) => {
          if (typeof field === 'string' && (field.includes(',') || field.includes('\n') || field.includes('"'))) {
            return `"${field.replace(/"/g, '""')}"`
          }
          return field
        })
        .join(',')
    ),
  ].join('\r\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const timestamp = new Date().toISOString().slice(0, 10)
  link.setAttribute('href', url)
  link.setAttribute('download', `${filenamePrefix}-${timestamp}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

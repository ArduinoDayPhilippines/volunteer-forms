import { z } from 'zod'

export const HARDWARE_EXPERIENCE_OPTIONS = [
  'Arduino (Uno, Mega, Nano)',
  'ESP32 / ESP8266 / IoT',
  'Raspberry Pi / Single Board Computers',
  'Soldering & Circuit Prototyping',
  '3D Printing & CAD Design',
  'Robotics & Sensor Interfacing',
  'Embedded C / C++ / MicroPython',
  'Audio / Video / Stage Equipment',
] as const

export const AVAILABILITY_OPTIONS = [
  { id: 'pre-event', label: 'Pre-Event Ingress & Kit Assembly (Day -1)' },
  { id: 'event-morning', label: 'Event Day Morning & Registration (6:30 AM - 1:00 PM)' },
  { id: 'event-afternoon', label: 'Event Day Afternoon & Workshops (12:30 PM - 6:30 PM)' },
  { id: 'post-event', label: 'Post-Event Egress & Teardown (6:00 PM - 9:00 PM)' },
] as const

export const TSHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'] as const

export const volunteerApplicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid contact phone number')
    .max(25, 'Phone number is too long'),
  organizationOrSchool: z
    .string()
    .trim()
    .max(150, 'Organization or school must not exceed 150 characters')
    .optional()
    .or(z.literal('')),
  primaryCommitteeId: z
    .string()
    .min(1, 'Please select a primary committee preference'),
  secondaryCommitteeId: z
    .string()
    .optional()
    .nullable()
    .or(z.literal('')),
  makerHardwareExperience: z
    .array(z.string())
    .default([]),
  makerExperienceDetails: z
    .string()
    .trim()
    .max(1000, 'Details must not exceed 1000 characters')
    .optional()
    .or(z.literal('')),
  pastVolunteerExperience: z
    .string()
    .trim()
    .max(1000, 'Volunteer experience must not exceed 1000 characters')
    .optional()
    .or(z.literal('')),
  availability: z
    .array(z.string())
    .min(1, 'Please select at least one availability slot'),
  tshirtSize: z
    .enum(TSHIRT_SIZES, {
      message: 'Please select a valid t-shirt size',
    }),
  emergencyContactName: z
    .string()
    .trim()
    .min(2, 'Emergency contact name is required')
    .max(100, 'Emergency contact name is too long'),
  emergencyContactPhone: z
    .string()
    .trim()
    .min(7, 'Emergency contact phone number is required')
    .max(25, 'Emergency contact phone number is too long'),
  agreedToRules: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must acknowledge and accept the Volunteer Code of Conduct & Rules to submit',
    }),
  agreedToPhotoRelease: z
    .boolean()
    .default(true),
})

export type VolunteerApplicationFormData = z.infer<typeof volunteerApplicationSchema>

export const organizerLoginSchema = z.object({
  email: z.string().trim().email('Please enter a valid organizer email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type OrganizerLoginFormData = z.infer<typeof organizerLoginSchema>

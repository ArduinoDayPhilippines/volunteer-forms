'use client'

import React, { useState } from 'react'
import {
  User,
  Mail,
  Phone,
  Building2,
  Cpu,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Shirt,
  CalendarCheck,
  HeartHandshake,
} from 'lucide-react'
import { Committee } from '@/lib/types/database'
import {
  HARDWARE_EXPERIENCE_OPTIONS,
  AVAILABILITY_OPTIONS,
  TSHIRT_SIZES,
  VolunteerApplicationFormData,
  volunteerApplicationSchema,
  PHONE_REGEX,
} from '@/lib/validations/volunteer'
import { submitVolunteerApplication } from '@/app/actions/submit-application'
import { CertificateGenerator } from './CertificateGenerator'

type FormStep = 1 | 2 | 3 | 4

const INITIAL_FORM_DATA: VolunteerApplicationFormData = {
  fullName: '',
  email: '',
  phone: '',
  organizationOrSchool: '',
  primaryCommitteeId: '',
  secondaryCommitteeId: '',
  makerHardwareExperience: [],
  makerExperienceDetails: '',
  pastVolunteerExperience: '',
  availability: [],
  tshirtSize: 'M',
  emergencyContactName: '',
  emergencyContactPhone: '',
  agreedToRules: false,
  agreedToPhotoRelease: true,
}

export function VolunteerForm({
  committees,
  preselectedCommitteeId,
}: {
  committees: Committee[]
  preselectedCommitteeId?: string | null
}) {
  const [currentStep, setCurrentStep] = useState<FormStep>(1)
  const [formData, setFormData] = useState<VolunteerApplicationFormData>({
    ...INITIAL_FORM_DATA,
    primaryCommitteeId: preselectedCommitteeId || '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [submissionResult, setSubmissionResult] = useState<{
    applicationId: string
    applicantName: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  // Update primary committee if preselection changes
  React.useEffect(() => {
    if (preselectedCommitteeId) {
      setFormData((prev) => ({
        ...prev,
        primaryCommitteeId: preselectedCommitteeId,
      }))
    }
  }, [preselectedCommitteeId])

  const validateStep = (step: FormStep): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required'
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = 'Full name must be at least 2 characters'
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address'
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Contact number is required'
      } else if (!PHONE_REGEX.test(formData.phone.trim())) {
        newErrors.phone =
          'Please enter a valid phone number with country code (e.g. +1 555 123 4567 or +63 917 123 4567)'
      }
    }

    if (step === 2) {
      if (!formData.primaryCommitteeId) {
        newErrors.primaryCommitteeId = 'Please select a primary committee preference'
      }
      if (
        formData.secondaryCommitteeId &&
        formData.secondaryCommitteeId === formData.primaryCommitteeId
      ) {
        newErrors.secondaryCommitteeId =
          'Secondary committee must be different from primary committee'
      }
    }

    if (step === 3) {
      // Experience step is mostly optional checkboxes, but check length limits if provided
      if (
        formData.makerExperienceDetails &&
        formData.makerExperienceDetails.length > 1000
      ) {
        newErrors.makerExperienceDetails = 'Details cannot exceed 1000 characters'
      }
      if (
        formData.pastVolunteerExperience &&
        formData.pastVolunteerExperience.length > 1000
      ) {
        newErrors.pastVolunteerExperience =
          'Experience notes cannot exceed 1000 characters'
      }
    }

    if (step === 4) {
      if (!formData.availability || formData.availability.length === 0) {
        newErrors.availability = 'Please select at least one availability slot'
      }
      if (!formData.tshirtSize) {
        newErrors.tshirtSize = 'Please choose a t-shirt size'
      }
      if (!formData.emergencyContactName.trim()) {
        newErrors.emergencyContactName = 'Emergency contact name is required'
      }
      if (!formData.emergencyContactPhone.trim()) {
        newErrors.emergencyContactPhone = 'Emergency contact phone is required'
      } else if (!PHONE_REGEX.test(formData.emergencyContactPhone.trim())) {
        newErrors.emergencyContactPhone =
          'Please enter a valid phone number with country code (e.g. +1 555 123 4567 or +63 917 123 4567)'
      }
      if (!formData.agreedToRules) {
        newErrors.agreedToRules =
          'You must read and accept the Volunteer Code of Conduct & Rules to submit'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setServerError(null)
      setCurrentStep((prev) => Math.min(prev + 1, 4) as FormStep)
    }
  }

  const handleBack = () => {
    setServerError(null)
    setCurrentStep((prev) => Math.max(prev - 1, 1) as FormStep)
  }

  const handleHardwareToggle = (option: string) => {
    setFormData((prev) => {
      const exists = prev.makerHardwareExperience.includes(option)
      return {
        ...prev,
        makerHardwareExperience: exists
          ? prev.makerHardwareExperience.filter((item) => item !== option)
          : [...prev.makerHardwareExperience, option],
      }
    })
  }

  const handleAvailabilityToggle = (id: string) => {
    setFormData((prev) => {
      const exists = prev.availability.includes(id)
      const updated = exists
        ? prev.availability.filter((item) => item !== id)
        : [...prev.availability, id]
      return { ...prev, availability: updated }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(4)) return

    setIsSubmitting(true)
    setServerError(null)

    try {
      const result = await submitVolunteerApplication(formData)

      if (result.success && result.applicationId) {
        setSubmissionResult({
          applicationId: result.applicationId,
          applicantName: result.applicantName || formData.fullName,
        })
      } else {
        setServerError(result.error || 'Failed to submit application.')
        if (result.fieldErrors) {
          const mappedErrors: Record<string, string> = {}
          for (const [key, msgs] of Object.entries(result.fieldErrors)) {
            if (msgs && msgs.length > 0) {
              mappedErrors[key] = msgs[0]
            }
          }
          setErrors(mappedErrors)
        }
      }
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : 'An unexpected network error occurred.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyApplicationId = () => {
    if (!submissionResult?.applicationId) return
    navigator.clipboard.writeText(submissionResult.applicationId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA)
    setCurrentStep(1)
    setSubmissionResult(null)
    setServerError(null)
    setErrors({})
  }

  // Confirmation Success View
  if (submissionResult) {
    const chosenCommittee = committees.find(
      (c) => c.id === formData.primaryCommitteeId
    )

    const issuedDate = new Date().toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    return (
      <div
        className="max-w-2xl mx-auto p-6 sm:p-10 rounded-2xl border text-center"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-base)' }}
      >
        <div className="w-16 h-16 rounded-xl bg-[#00979D] flex items-center justify-center mx-auto mb-6 text-white shadow-sm">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Application Received!
        </h3>
        <p className="text-base sm:text-lg max-w-md mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
          Mabuhay, <span className="text-[#00979D] font-semibold">{submissionResult.applicantName}</span>! Your volunteer application for Arduino Day Philippines 2026 has been submitted to the organizing committee.
        </p>

        {/* Reference ID card */}
        <div
          className="p-5 rounded-xl border text-left mb-8"
          style={{ background: 'var(--bg-base)', borderColor: 'var(--border-base)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Application Reference ID
            </span>
            <button
              onClick={copyApplicationId}
              className="inline-flex items-center gap-1.5 text-xs text-[#00979D] hover:text-[#008184] font-medium transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>
          <p className="font-mono text-sm sm:text-base break-all select-all" style={{ color: 'var(--text-primary)' }}>
            {submissionResult.applicationId}
          </p>
          <div
            className="mt-4 pt-3 border-t flex flex-wrap gap-y-2 justify-between text-sm"
            style={{ borderColor: 'var(--border-muted)', color: 'var(--text-muted)' }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Primary Committee: </span>
              <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                {chosenCommittee?.name || formData.primaryCommitteeId}
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Email: </span>
              <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{formData.email}</span>
            </div>
          </div>
        </div>

        {/* Certificate Generator */}
        <CertificateGenerator
          applicantName={submissionResult.applicantName}
          committeeName={chosenCommittee?.name || formData.primaryCommitteeId}
          applicationId={submissionResult.applicationId}
          issuedDate={issuedDate}
        />

        {/* What happens next timeline */}
        <div
          className="text-left space-y-4 mt-8 mb-8 p-5 rounded-xl border"
          style={{ background: 'var(--bg-base)', borderColor: 'var(--border-base)' }}
        >
          <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
            <Sparkles className="w-4 h-4 text-[#00979D]" />
            <span>Next Steps in the Recruitment Process</span>
          </h4>
          <ol
            className="relative border-l ml-3 space-y-4 text-sm"
            style={{ borderColor: 'var(--border-base)', color: 'var(--text-muted)' }}
          >
            <li className="ml-4">
              <div className="absolute w-2 h-2 rounded-full bg-[#00979D] -left-1 top-1.5" />
              <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>1. Committee Review</span>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Committee leads review applications within 3–5 business days based on capacity and maker preferences.
              </p>
            </li>
            <li className="ml-4">
              <div className="absolute w-2 h-2 rounded-full -left-1 top-1.5" style={{ background: 'var(--border-base)' }} />
              <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>2. Virtual Interview / Screening</span>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Shortlisted applicants will receive an email invite to a 10-minute discovery sync.
              </p>
            </li>
            <li className="ml-4">
              <div className="absolute w-2 h-2 rounded-full -left-1 top-1.5" style={{ background: 'var(--border-base)' }} />
              <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>3. General Volunteer Orientation</span>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Official onboarding, safety walkthrough, and swag kit distribution.
              </p>
            </li>
          </ol>
        </div>

        <button
          onClick={resetForm}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border font-medium text-base transition-colors hover:border-[#00979D] hover:text-[#00979D] cursor-pointer"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-base)', color: 'var(--text-secondary)' }}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Submit Another Application</span>
        </button>
      </div>
    )
  }

  // Step names
  const steps = [
    { number: 1, title: 'Personal' },
    { number: 2, title: 'Committee' },
    { number: 3, title: 'Experience' },
    { number: 4, title: 'Confirmation' },
  ]

  return (
    <div id="volunteer-form-container" className="max-w-3xl mx-auto">
      {/* Step Header Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div
            className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0"
            style={{ background: 'var(--border-base)' }}
          />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-[#00979D] -translate-y-1/2 z-0 transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />

          {steps.map((s) => {
            const isCompleted = currentStep > s.number
            const isCurrent = currentStep === s.number
            return (
              <div key={s.number} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => {
                    // Only allow clicking to previous steps
                    if (s.number < currentStep) {
                      setCurrentStep(s.number as FormStep)
                    }
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border ${
                    isCompleted
                      ? 'bg-[#00979D] text-white border-[#00979D]'
                      : isCurrent
                      ? 'bg-[#00979D] text-white border-[#00979D] ring-4 ring-[#00979D]/20 shadow-sm'
                      : 'border-[var(--border-base)]'
                  }`}
                  style={
                    !isCompleted && !isCurrent
                      ? { background: 'var(--bg-card)', color: 'var(--text-muted)', borderColor: 'var(--border-base)' }
                      : undefined
                  }
                >
                  {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : s.number}
                </button>
                <span
                  className="mt-2 text-xs font-medium hidden sm:inline"
                  style={{
                    color: isCurrent
                      ? '#00979D'
                      : isCompleted
                      ? 'var(--text-secondary)'
                      : 'var(--text-muted)',
                  }}
                >
                  {s.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Form Card */}
      <div
        className="rounded-2xl border p-6 sm:p-10"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-base)' }}
      >
        {/* Error notification banner */}
        {serverError && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-800 text-red-200 flex items-start gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-300">Registration Error</p>
              <p className="text-xs sm:text-sm mt-0.5 text-red-200">{serverError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* STEP 1: Personal & Contact Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Personal Information
                </h3>
                <p className="text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
                  Tell us a bit about yourself so the volunteer leads can reach you.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-base font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Full Name <span className="text-[#F26727]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: 'var(--text-muted)' }}>
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="e.g. Maria Santos"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border text-sm sm:text-base focus:outline-none transition-all ${
                      errors.fullName
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'focus:border-[#00979D] focus:ring-2 focus:ring-[#00979D]/20'
                    }`}
                    style={{
                      background: 'var(--form-bg)',
                      borderColor: errors.fullName ? undefined : 'var(--form-border)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-base font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Email Address <span className="text-[#F26727]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: 'var(--text-muted)' }}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="maria.santos@example.com"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border text-sm sm:text-base focus:outline-none transition-all ${
                      errors.email
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'focus:border-[#00979D] focus:ring-2 focus:ring-[#00979D]/20'
                    }`}
                    style={{
                      background: 'var(--form-bg)',
                      borderColor: errors.email ? undefined : 'var(--form-border)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-base font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Phone Number <span className="text-[#F26727]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: 'var(--text-muted)' }}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 555 123 4567 or +63 917 123 4567"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border text-sm sm:text-base focus:outline-none transition-all ${
                      errors.phone
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'focus:border-[#00979D] focus:ring-2 focus:ring-[#00979D]/20'
                    }`}
                    style={{
                      background: 'var(--form-bg)',
                      borderColor: errors.phone ? undefined : 'var(--form-border)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
                <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                  International numbers welcome. Include your country code (e.g. +1, +44, +81, +63).
                </p>
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Organization or School */}
              <div>
                <label className="block text-base font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  University / Company / Maker Organization{' '}
                  <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: 'var(--text-muted)' }}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={formData.organizationOrSchool || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, organizationOrSchool: e.target.value })
                    }
                    placeholder="e.g. Polytechnic University of the Philippines / MakerLab PH"
                    className="w-full pl-11 pr-4 py-3 rounded-lg border text-sm sm:text-base focus:outline-none focus:border-[#00979D] focus:ring-2 focus:ring-[#00979D]/20 transition-all"
                    style={{
                      background: 'var(--form-bg)',
                      borderColor: 'var(--form-border)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Committee Preference */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Committee Preferences
                </h3>
                <p className="text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
                  Select your primary committee choice and an optional backup team.
                </p>
              </div>

              {/* Primary Committee */}
              <div>
                <label className="block text-base font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Primary Committee Preference <span className="text-[#F26727]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {committees.map((committee) => {
                    const isSelected = formData.primaryCommitteeId === committee.id
                    return (
                      <button
                        key={committee.id}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            primaryCommitteeId: committee.id,
                          })
                        }
                        className={`p-4 rounded-xl border text-left transition-colors cursor-pointer flex flex-col justify-between ${
                          isSelected ? '' : 'hover:border-[#00979D]/40'
                        }`}
                        style={{
                          background: isSelected ? 'var(--brand-teal-surface)' : 'var(--bg-card)',
                          borderColor: isSelected ? '#00979D' : 'var(--border-base)',
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-sm font-bold"
                            style={{ color: isSelected ? '#00979D' : 'var(--text-primary)' }}
                          >
                            {committee.name}
                          </span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-[#00979D]" />
                          )}
                        </div>
                        <p
                          className="text-xs line-clamp-2"
                          style={{ color: isSelected ? 'var(--text-secondary)' : 'var(--text-muted)' }}
                        >
                          {committee.description}
                        </p>
                      </button>
                    )
                  })}
                </div>
                {errors.primaryCommitteeId && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.primaryCommitteeId}</span>
                  </p>
                )}
              </div>

              {/* Secondary Committee */}
              <div>
                <label className="block text-base font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Secondary Committee Preference{' '}
                  <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>
                    (Optional Alternate)
                  </span>
                </label>
                <select
                  value={formData.secondaryCommitteeId || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      secondaryCommitteeId: e.target.value || null,
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg border text-sm sm:text-base focus:outline-none focus:border-[#00979D] focus:ring-2 focus:ring-[#00979D]/20 transition-all"
                  style={{
                    background: 'var(--form-bg)',
                    borderColor: 'var(--form-border)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <option value="">-- None / No secondary preference --</option>
                  {committees
                    .filter((c) => c.id !== formData.primaryCommitteeId)
                    .map((committee) => (
                      <option key={committee.id} value={committee.id}>
                        {committee.name}
                      </option>
                    ))}
                </select>
                {errors.secondaryCommitteeId && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.secondaryCommitteeId}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Experience & Maker Background */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Hardware &amp; Maker Skills
                </h3>
                <p className="text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
                  Help us match you with hands-on tasks and workshop mentorship roles.
                </p>
              </div>

              {/* Hardware Skills Checklist */}
              <div>
                <label className="block text-base font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Check all hardware &amp; maker areas you have experience with:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {HARDWARE_EXPERIENCE_OPTIONS.map((opt) => {
                    const isChecked = formData.makerHardwareExperience.includes(opt)
                    return (
                      <label
                        key={opt}
                        className="flex items-center gap-3 p-3.5 rounded-xl border transition-colors cursor-pointer select-none"
                        style={{
                          background: isChecked ? 'var(--brand-teal-surface)' : 'var(--bg-card)',
                          borderColor: isChecked ? '#00979D' : 'var(--border-base)',
                          color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleHardwareToggle(opt)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-[#00979D] text-white'
                              : 'border border-[var(--border-base)] bg-[var(--bg-base)]'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{opt}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Maker Experience Details */}
              <div>
                <label className="block text-base font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Maker Projects or Hardware Demos{' '}
                  <span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>
                    (Optional highlights)
                  </span>
                </label>
                <textarea
                  rows={3}
                  value={formData.makerExperienceDetails || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, makerExperienceDetails: e.target.value })
                  }
                  placeholder="Share a brief overview of any electronics, robotics, or IoT projects you've built or mentored..."
                  className="w-full p-4 rounded-lg border text-sm focus:outline-none focus:border-[#00979D] focus:ring-2 focus:ring-[#00979D]/20 transition-all resize-none"
                  style={{
                    background: 'var(--form-bg)',
                    borderColor: 'var(--form-border)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              {/* Past Volunteer Experience */}
              <div>
                <label className="block text-base font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Past Event / Community Volunteer Experience{' '}
                  <span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.pastVolunteerExperience || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, pastVolunteerExperience: e.target.value })
                  }
                  placeholder="e.g. Hackathons, tech conferences, student organization events..."
                  className="w-full p-4 rounded-lg border text-sm focus:outline-none focus:border-[#00979D] focus:ring-2 focus:ring-[#00979D]/20 transition-all resize-none"
                  style={{
                    background: 'var(--form-bg)',
                    borderColor: 'var(--form-border)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 4: Availability, Sizing & Code of Conduct */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Logistics &amp; Confirmation
                </h3>
                <p className="text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
                  Final details to prepare your volunteer badge, shirt, and shift schedule.
                </p>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-base font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Availability Slots <span className="text-[#F26727]">*</span>
                </label>
                <div className="space-y-2.5">
                  {AVAILABILITY_OPTIONS.map((slot) => {
                    const isChecked = formData.availability.includes(slot.id)
                    return (
                      <label
                        key={slot.id}
                        className="flex items-start gap-3 p-3.5 rounded-xl border transition-colors cursor-pointer select-none"
                        style={{
                          background: isChecked ? 'var(--brand-teal-surface)' : 'var(--bg-card)',
                          borderColor: isChecked ? '#00979D' : 'var(--border-base)',
                          color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleAvailabilityToggle(slot.id)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-[#00979D] text-white'
                              : 'border border-[var(--border-base)] bg-[var(--bg-base)]'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="text-xs sm:text-sm">
                          <span className="font-semibold">{slot.label}</span>
                        </div>
                      </label>
                    )
                  })}
                </div>
                {errors.availability && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.availability}</span>
                  </p>
                )}
              </div>

              {/* T-Shirt Sizing */}
              <div>
                <label className="block text-base font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Official Volunteer T-Shirt Size{' '}
                  <span className="text-[#F26727]">*</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {TSHIRT_SIZES.map((size) => {
                    const isSelected = formData.tshirtSize === size
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setFormData({ ...formData, tshirtSize: size })}
                        className={`min-w-[48px] h-11 px-4 rounded-lg font-bold text-sm transition-colors cursor-pointer flex items-center justify-center border ${
                          isSelected
                            ? 'bg-[#00979D] text-white border-[#00979D] shadow-sm'
                            : 'hover:border-[#00979D]/50'
                        }`}
                        style={
                          !isSelected
                            ? {
                                background: 'var(--bg-card)',
                                borderColor: 'var(--border-base)',
                                color: 'var(--text-secondary)',
                              }
                            : undefined
                        }
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Emergency Contact Name <span className="text-[#F26727]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.emergencyContactName}
                    onChange={(e) =>
                      setFormData({ ...formData, emergencyContactName: e.target.value })
                    }
                    placeholder="Parent / Guardian / Spouse"
                    className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none transition-all ${
                      errors.emergencyContactName
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'focus:border-[#00979D] focus:ring-2 focus:ring-[#00979D]/20'
                    }`}
                    style={{
                      background: 'var(--form-bg)',
                      borderColor: errors.emergencyContactName ? undefined : 'var(--form-border)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  {errors.emergencyContactName && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.emergencyContactName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-base font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Emergency Contact Phone <span className="text-[#F26727]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.emergencyContactPhone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emergencyContactPhone: e.target.value,
                      })
                    }
                    placeholder="+1 555 123 4567 or +63 917 123 4567"
                    className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none transition-all ${
                      errors.emergencyContactPhone
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'focus:border-[#00979D] focus:ring-2 focus:ring-[#00979D]/20'
                    }`}
                    style={{
                      background: 'var(--form-bg)',
                      borderColor: errors.emergencyContactPhone ? undefined : 'var(--form-border)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                    Include country code for international contacts.
                  </p>
                  {errors.emergencyContactPhone && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.emergencyContactPhone}
                    </p>
                  )}
                </div>
              </div>

              {/* Rules & Conduct Acknowledgment */}
              <div className="pt-4 border-t space-y-3" style={{ borderColor: 'var(--border-muted)' }}>
                <label
                  className="flex items-start gap-3 p-4 rounded-xl border transition-colors cursor-pointer"
                  style={{
                    background: formData.agreedToRules ? 'var(--brand-teal-surface)' : 'var(--bg-card)',
                    borderColor: formData.agreedToRules
                      ? '#00979D'
                      : errors.agreedToRules
                      ? '#ef4444'
                      : 'var(--border-base)',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.agreedToRules}
                    onChange={(e) =>
                      setFormData({ ...formData, agreedToRules: e.target.checked })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      formData.agreedToRules
                        ? 'bg-[#00979D] text-white'
                        : 'border border-[var(--border-base)] bg-[var(--bg-base)]'
                    }`}
                  >
                    {formData.agreedToRules && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      I have read, understood, and agree to the Arduino Day Philippines Volunteer Rules &amp; Code of Conduct.
                    </span>{' '}
                    I commit to attending the briefing and adhering to safety and inclusivity standards.
                  </div>
                </label>
                {errors.agreedToRules && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.agreedToRules}</span>
                  </p>
                )}

                {/* Photo Release */}
                <label
                  className="flex items-start gap-3 p-3 rounded-xl border cursor-pointer"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border-base)' }}
                >
                  <input
                    type="checkbox"
                    checked={formData.agreedToPhotoRelease}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        agreedToPhotoRelease: e.target.checked,
                      })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      formData.agreedToPhotoRelease
                        ? 'bg-[#00979D] text-white'
                        : 'border border-[var(--border-base)] bg-[var(--bg-card)]'
                    }`}
                  >
                    {formData.agreedToPhotoRelease && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    I consent to being photographed or recorded during event activities for official community recaps and social media archive.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Action Buttons */}
          <div
            className="mt-8 pt-6 border-t flex items-center justify-between gap-4"
            style={{ borderColor: 'var(--border-muted)' }}
          >
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border font-medium text-sm transition-colors hover:border-[#00979D] hover:text-[#00979D] cursor-pointer"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-base)',
                  color: 'var(--text-secondary)',
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00979D] hover:bg-[#008184] text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#00979D] hover:bg-[#008184] text-white font-bold text-sm shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Complete &amp; Submit Application</span>
                    <Sparkles className="w-4 h-4 text-white" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

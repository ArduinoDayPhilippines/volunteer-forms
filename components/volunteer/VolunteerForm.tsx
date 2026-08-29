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
} from '@/lib/validations/volunteer'
import { submitVolunteerApplication } from '@/app/actions/submit-application'

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
      } else if (formData.phone.trim().length < 7) {
        newErrors.phone = 'Please enter a valid phone number'
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

    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-[#00979c]/40 shadow-2xl text-center backdrop-blur-xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00979c] to-[#00e5ff] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#00979c]/30">
          <CheckCircle2 className="w-9 h-9 text-slate-950 stroke-[2.5]" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Application Received!
        </h3>
        <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8">
          Mabuhay, <span className="text-[#00e5ff] font-semibold">{submissionResult.applicantName}</span>! Your volunteer application for Arduino Day Philippines 2026 has been submitted to the organizing committee.
        </p>

        {/* Reference ID card */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Application Reference ID
            </span>
            <button
              onClick={copyApplicationId}
              className="inline-flex items-center gap-1.5 text-xs text-[#00e5ff] hover:text-[#00979c] font-medium transition-colors cursor-pointer"
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
          <p className="font-mono text-sm sm:text-base text-white break-all select-all">
            {submissionResult.applicationId}
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-y-2 justify-between text-xs text-slate-400">
            <div>
              <span className="text-slate-500">Primary Committee: </span>
              <span className="text-slate-200 font-medium">
                {chosenCommittee?.name || formData.primaryCommitteeId}
              </span>
            </div>
            <div>
              <span className="text-slate-500">Email: </span>
              <span className="text-slate-200 font-medium">{formData.email}</span>
            </div>
          </div>
        </div>

        {/* What happens next timeline */}
        <div className="text-left space-y-4 mb-8 p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
          <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00e5ff]" />
            <span>Next Steps in the Recruitment Process</span>
          </h4>
          <ol className="relative border-l border-slate-800 ml-3 space-y-4 text-xs sm:text-sm text-slate-400">
            <li className="ml-4">
              <div className="absolute w-2 h-2 rounded-full bg-[#00979c] -left-1 top-1.5" />
              <span className="font-medium text-slate-200">1. Committee Review</span>
              <p className="text-xs text-slate-400 mt-0.5">
                Committee leads review applications within 3–5 business days based on capacity and maker preferences.
              </p>
            </li>
            <li className="ml-4">
              <div className="absolute w-2 h-2 rounded-full bg-slate-700 -left-1 top-1.5" />
              <span className="font-medium text-slate-200">2. Virtual Interview / Screening</span>
              <p className="text-xs text-slate-400 mt-0.5">
                Shortlisted applicants will receive an email invite to a 10-minute discovery sync.
              </p>
            </li>
            <li className="ml-4">
              <div className="absolute w-2 h-2 rounded-full bg-slate-700 -left-1 top-1.5" />
              <span className="font-medium text-slate-200">3. General Volunteer Orientation</span>
              <p className="text-xs text-slate-400 mt-0.5">
                Official onboarding, safety walkthrough, and swag kit distribution.
              </p>
            </li>
          </ol>
        </div>

        <button
          onClick={resetForm}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-colors cursor-pointer"
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
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-[#00979c] -translate-y-1/2 z-0 transition-all duration-300"
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    isCompleted
                      ? 'bg-[#00979c] text-white'
                      : isCurrent
                      ? 'bg-[#00e5ff] text-slate-950 ring-4 ring-[#00979c]/30 shadow-lg shadow-[#00979c]/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : s.number}
                </button>
                <span
                  className={`mt-2 text-xs font-medium hidden sm:inline ${
                    isCurrent
                      ? 'text-[#00e5ff]'
                      : isCompleted
                      ? 'text-slate-300'
                      : 'text-slate-500'
                  }`}
                >
                  {s.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Form Card */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
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
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Personal Information
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Tell us a bit about yourself so the volunteer leads can reach you.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Full Name <span className="text-[#e47128]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
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
                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/90 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none transition-all ${
                      errors.fullName
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                        : 'border-slate-800 focus:border-[#00979c] focus:ring-2 focus:ring-[#00979c]/30'
                    }`}
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
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Email Address <span className="text-[#e47128]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
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
                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/90 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none transition-all ${
                      errors.email
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                        : 'border-slate-800 focus:border-[#00979c] focus:ring-2 focus:ring-[#00979c]/30'
                    }`}
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
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Mobile Phone Number <span className="text-[#e47128]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+63 912 345 6789"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/90 border text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none transition-all ${
                      errors.phone
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                        : 'border-slate-800 focus:border-[#00979c] focus:ring-2 focus:ring-[#00979c]/30'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Organization or School */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  University / Company / Maker Organization{' '}
                  <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={formData.organizationOrSchool || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, organizationOrSchool: e.target.value })
                    }
                    placeholder="e.g. Polytechnic University of the Philippines / MakerLab PH"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-[#00979c] focus:ring-2 focus:ring-[#00979c]/30 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Committee Preference */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Committee Preferences
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Select your primary committee choice and an optional backup team.
                </p>
              </div>

              {/* Primary Committee */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Primary Committee Preference <span className="text-[#e47128]">*</span>
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
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#00979c]/20 border-[#00e5ff] shadow-lg shadow-[#00979c]/20 ring-1 ring-[#00e5ff]'
                            : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-sm font-bold ${
                              isSelected ? 'text-[#00e5ff]' : 'text-white'
                            }`}
                          >
                            {committee.name}
                          </span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-[#00e5ff]" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">
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
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Secondary Committee Preference{' '}
                  <span className="text-xs text-slate-400 font-normal">
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white text-sm sm:text-base focus:outline-none focus:border-[#00979c] focus:ring-2 focus:ring-[#00979c]/30 transition-all"
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
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Hardware &amp; Maker Skills
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Help us match you with hands-on tasks and workshop mentorship roles.
                </p>
              </div>

              {/* Hardware Skills Checklist */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-3">
                  Check all hardware &amp; maker areas you have experience with:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {HARDWARE_EXPERIENCE_OPTIONS.map((opt) => {
                    const isChecked = formData.makerHardwareExperience.includes(opt)
                    return (
                      <label
                        key={opt}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                          isChecked
                            ? 'bg-[#00979c]/15 border-[#00979c] text-white'
                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
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
                              ? 'bg-[#00979c] text-white'
                              : 'border border-slate-700 bg-slate-900'
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
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Maker Projects or Hardware Demos{' '}
                  <span className="text-xs text-slate-400 font-normal">
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
                  className="w-full p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00979c] focus:ring-2 focus:ring-[#00979c]/30 transition-all resize-none"
                />
              </div>

              {/* Past Volunteer Experience */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Past Event / Community Volunteer Experience{' '}
                  <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.pastVolunteerExperience || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, pastVolunteerExperience: e.target.value })
                  }
                  placeholder="e.g. Hackathons, tech conferences, student organization events..."
                  className="w-full p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00979c] focus:ring-2 focus:ring-[#00979c]/30 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Availability, Sizing & Code of Conduct */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Logistics &amp; Confirmation
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Final details to prepare your volunteer badge, shirt, and shift schedule.
                </p>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-3">
                  Availability Slots <span className="text-[#e47128]">*</span>
                </label>
                <div className="space-y-2.5">
                  {AVAILABILITY_OPTIONS.map((slot) => {
                    const isChecked = formData.availability.includes(slot.id)
                    return (
                      <label
                        key={slot.id}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                          isChecked
                            ? 'bg-[#00979c]/15 border-[#00979c] text-white'
                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
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
                              ? 'bg-[#00979c] text-white'
                              : 'border border-slate-700 bg-slate-900'
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
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Official Volunteer T-Shirt Size{' '}
                  <span className="text-[#e47128]">*</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {TSHIRT_SIZES.map((size) => {
                    const isSelected = formData.tshirtSize === size
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setFormData({ ...formData, tshirtSize: size })}
                        className={`min-w-[48px] h-11 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#00979c] text-white shadow-md shadow-[#00979c]/30'
                            : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
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
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Emergency Contact Name <span className="text-[#e47128]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.emergencyContactName}
                    onChange={(e) =>
                      setFormData({ ...formData, emergencyContactName: e.target.value })
                    }
                    placeholder="Parent / Guardian / Spouse"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/90 border text-white text-sm focus:outline-none transition-all ${
                      errors.emergencyContactName
                        ? 'border-red-500'
                        : 'border-slate-800 focus:border-[#00979c]'
                    }`}
                  />
                  {errors.emergencyContactName && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.emergencyContactName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Emergency Contact Phone <span className="text-[#e47128]">*</span>
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
                    placeholder="+63 912 345 6789"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/90 border text-white text-sm focus:outline-none transition-all ${
                      errors.emergencyContactPhone
                        ? 'border-red-500'
                        : 'border-slate-800 focus:border-[#00979c]'
                    }`}
                  />
                  {errors.emergencyContactPhone && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.emergencyContactPhone}
                    </p>
                  )}
                </div>
              </div>

              {/* Rules & Conduct Acknowledgment */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                    formData.agreedToRules
                      ? 'bg-[#00979c]/15 border-[#00979c]'
                      : errors.agreedToRules
                      ? 'bg-red-950/20 border-red-500'
                      : 'bg-slate-950/80 border-slate-800'
                  }`}
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
                        ? 'bg-[#00979c] text-white'
                        : 'border border-slate-700 bg-slate-900'
                    }`}
                  >
                    {formData.agreedToRules && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300">
                    <span className="font-semibold text-white">
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
                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 cursor-pointer">
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
                        ? 'bg-[#00979c] text-white'
                        : 'border border-slate-700 bg-slate-900'
                    }`}
                  >
                    {formData.agreedToPhotoRelease && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                  <span className="text-xs text-slate-400">
                    I consent to being photographed or recorded during event activities for official community recaps and social media archive.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Action Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-colors cursor-pointer"
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00979c] to-[#008184] hover:from-[#008184] hover:to-[#006468] text-white font-semibold text-sm shadow-md shadow-[#00979c]/25 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] via-[#00979c] to-[#008184] text-slate-950 font-bold text-sm shadow-lg shadow-[#00979c]/30 hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Complete &amp; Submit Application</span>
                    <Sparkles className="w-4 h-4 text-slate-950" />
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

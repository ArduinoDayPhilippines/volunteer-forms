'use client'

import React, { useState, useEffect } from 'react'
import {
  X,
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Shirt,
  Heart,
  Cpu,
  Sparkles,
  FileText,
  AlertTriangle,
} from 'lucide-react'
import { VolunteerApplication, Committee } from '@/lib/types/database'
import { updateApplicationStatusAction } from '@/app/actions/organizer-actions'

export function ApplicantDrawer({
  application,
  committees,
  onClose,
  onStatusUpdated,
}: {
  application: VolunteerApplication | null
  committees: Committee[]
  onClose: () => void
  onStatusUpdated: (updatedApp: VolunteerApplication) => void
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [notes, setNotes] = useState('')
  const [actionError, setActionError] = useState<string | null>(null)

  useEffect(() => {
    if (application) {
      setNotes(application.reviewer_notes || '')
      setActionError(null)
    }
  }, [application])

  if (!application) return null

  const committeeMap = new Map(committees.map((c) => [c.id, c.name]))
  const primaryName = committeeMap.get(application.primary_committee_id) || application.primary_committee_id
  const secondaryName = application.secondary_committee_id
    ? committeeMap.get(application.secondary_committee_id) || application.secondary_committee_id
    : 'None'

  const handleStatusChange = async (
    newStatus: 'pending' | 'approved' | 'rejected' | 'waitlist'
  ) => {
    setIsUpdating(true)
    setActionError(null)

    try {
      const res = await updateApplicationStatusAction({
        applicationId: application.id,
        status: newStatus,
        reviewerNotes: notes,
      })

      if (res.success && res.application) {
        onStatusUpdated(res.application)
      } else {
        setActionError(res.error || 'Failed to update application status')
      }
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>APPROVED</span>
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/30">
            <XCircle className="w-3.5 h-3.5" />
            <span>REJECTED</span>
          </span>
        )
      case 'waitlist':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>WAITLIST</span>
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>PENDING REVIEW</span>
          </span>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00979c]/20 flex items-center justify-center text-[#00e5ff]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white leading-tight">
                  {application.full_name}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  ID: {application.id}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {getStatusBadge(application.status)}
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300">
            {actionError && (
              <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{actionError}</span>
              </div>
            )}

            {/* Contact & Affiliation */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Contact &amp; Affiliation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                  <a
                    href={`mailto:${application.email}`}
                    className="text-[#00e5ff] hover:underline truncate"
                  >
                    {application.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                  <a
                    href={`tel:${application.phone}`}
                    className="text-slate-200 hover:underline"
                  >
                    {application.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 col-span-full">
                  <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="text-slate-200">
                    {application.organization_or_school || 'No school/org provided'}
                  </span>
                </div>
              </div>
            </div>

            {/* Committee Assignments */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Committee Preferences
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase block font-semibold mb-1">
                    Primary Preference
                  </span>
                  <span className="text-sm font-bold text-[#00e5ff]">
                    {primaryName}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase block font-semibold mb-1">
                    Secondary Preference
                  </span>
                  <span className="text-sm font-medium text-slate-200">
                    {secondaryName}
                  </span>
                </div>
              </div>
            </div>

            {/* Hardware & Maker Background */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#00979c]" />
                <span>Hardware &amp; Maker Skills</span>
              </h3>
              {application.maker_hardware_experience?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {application.maker_hardware_experience.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#00979c]/15 border border-[#00979c]/30 text-xs text-[#00e5ff] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No specific hardware areas checked.</p>
              )}

              {application.maker_experience_details && (
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 font-semibold block mb-1">
                    Project Highlights / Demos:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    {application.maker_experience_details}
                  </p>
                </div>
              )}

              {application.past_volunteer_experience && (
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 font-semibold block mb-1">
                    Past Event Experience:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    {application.past_volunteer_experience}
                  </p>
                </div>
              )}
            </div>

            {/* Logistics, Sizing & Emergency Contact */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Logistics &amp; Safety Details
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <Shirt className="w-5 h-5 text-[#e47128]" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">T-Shirt Size</span>
                    <span className="text-sm font-bold text-white">
                      {application.tshirt_size}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <Heart className="w-5 h-5 text-rose-400" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Emergency Contact</span>
                    <span className="text-xs font-bold text-white block">
                      {application.emergency_contact_name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {application.emergency_contact_phone}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-1.5">
                  Available Shifts / Slots:
                </span>
                <div className="flex flex-wrap gap-2">
                  {application.availability?.map((slot, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviewer Internal Notes */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#00979c]" />
                <span>Internal Reviewer Notes</span>
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add private organizer notes or interview findings..."
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#00979c] transition-all resize-none"
              />
            </div>
          </div>

          {/* Drawer Actions Footer */}
          <div className="p-6 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isUpdating || application.status === 'approved'}
                onClick={() => handleStatusChange('approved')}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/30 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve</span>
              </button>

              <button
                type="button"
                disabled={isUpdating || application.status === 'waitlist'}
                onClick={() => handleStatusChange('waitlist')}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-900/30 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                <Clock className="w-4 h-4" />
                <span>Waitlist</span>
              </button>

              <button
                type="button"
                disabled={isUpdating || application.status === 'rejected'}
                onClick={() => handleStatusChange('rejected')}
                className="px-4 py-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-900/30 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </div>

            {application.status !== 'pending' && (
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => handleStatusChange('pending')}
                className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
              >
                Reset to Pending
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

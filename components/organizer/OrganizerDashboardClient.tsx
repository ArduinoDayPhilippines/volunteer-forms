'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Cpu,
  LogOut,
  Download,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Filter,
  Users,
  Eye,
  Sparkles,
  Shirt,
} from 'lucide-react'
import { VolunteerApplication, Committee } from '@/lib/types/database'
import { logoutOrganizer } from '@/app/actions/organizer-actions'
import { exportApplicationsToCSV } from '@/lib/utils/csv-export'
import { ApplicantDrawer } from './ApplicantDrawer'

export function OrganizerDashboardClient({
  initialApplications,
  committees,
  organizerEmail,
}: {
  initialApplications: VolunteerApplication[]
  committees: Committee[]
  organizerEmail: string
}) {
  const [applications, setApplications] = useState<VolunteerApplication[]>(initialApplications)
  const [selectedCommittee, setSelectedCommittee] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeApplicant, setActiveApplicant] = useState<VolunteerApplication | null>(null)

  const committeeMap = useMemo(
    () => new Map(committees.map((c) => [c.id, c.name])),
    [committees]
  )

  // Metrics counters
  const metrics = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter((a) => a.status === 'pending').length,
      approved: applications.filter((a) => a.status === 'approved').length,
      waitlist: applications.filter((a) => a.status === 'waitlist').length,
      rejected: applications.filter((a) => a.status === 'rejected').length,
    }
  }, [applications])

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      // Committee filter
      if (
        selectedCommittee !== 'all' &&
        app.primary_committee_id !== selectedCommittee &&
        app.secondary_committee_id !== selectedCommittee
      ) {
        return false
      }

      // Status filter
      if (selectedStatus !== 'all' && app.status !== selectedStatus) {
        return false
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchesName = app.full_name.toLowerCase().includes(query)
        const matchesEmail = app.email.toLowerCase().includes(query)
        const matchesOrg = (app.organization_or_school || '').toLowerCase().includes(query)
        const matchesPhone = app.phone.toLowerCase().includes(query)
        if (!matchesName && !matchesEmail && !matchesOrg && !matchesPhone) {
          return false
        }
      }

      return true
    })
  }, [applications, selectedCommittee, selectedStatus, searchQuery])

  const handleStatusUpdated = (updatedApp: VolunteerApplication) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === updatedApp.id ? updatedApp : app))
    )
    setActiveApplicant(updatedApp)
  }

  const handleExportCSV = () => {
    const committeeName =
      selectedCommittee === 'all'
        ? 'all-committees'
        : selectedCommittee.toLowerCase()
    exportApplicationsToCSV(
      filteredApplications,
      committees,
      `adph-2026-${committeeName}`
    )
  }

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>Approved</span>
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">
            <XCircle className="w-3 h-3" />
            <span>Rejected</span>
          </span>
        )
      case 'waitlist':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" />
            <span>Waitlist</span>
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">
            <Clock className="w-3 h-3" />
            <span>Pending</span>
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00979c] to-[#00e5ff] flex items-center justify-center text-slate-950 font-bold">
              <Cpu className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide">
                Arduino Day Philippines 2026
              </h1>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#00e5ff]">
                Organizer Command Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:inline text-xs text-slate-400 font-mono">
              {organizerEmail}
            </span>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <span>View Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <form action={logoutOrganizer}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {/* Total */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-1 text-slate-400 text-xs font-medium">
              <span>Total Applicants</span>
              <Users className="w-4 h-4 text-[#00e5ff]" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">
              {metrics.total}
            </p>
          </div>

          {/* Pending */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-1 text-slate-400 text-xs font-medium">
              <span>Pending Review</span>
              <Clock className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-sky-400">
              {metrics.pending}
            </p>
          </div>

          {/* Approved */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-1 text-slate-400 text-xs font-medium">
              <span>Approved</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {metrics.approved}
            </p>
          </div>

          {/* Waitlist */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-1 text-slate-400 text-xs font-medium">
              <span>Waitlist</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">
              {metrics.waitlist}
            </p>
          </div>

          {/* Rejected */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-1 text-slate-400 text-xs font-medium">
              <span>Rejected</span>
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-red-400">
              {metrics.rejected}
            </p>
          </div>
        </div>

        {/* Filter Bar & Export Actions */}
        <div className="space-y-4">
          {/* Committee Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCommittee('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCommittee === 'all'
                  ? 'bg-[#00979c] text-white shadow-md shadow-[#00979c]/30 font-semibold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Committees ({metrics.total})
            </button>

            {committees.map((comm) => {
              const count = applications.filter(
                (a) =>
                  a.primary_committee_id === comm.id ||
                  a.secondary_committee_id === comm.id
              ).length

              return (
                <button
                  key={comm.id}
                  onClick={() => setSelectedCommittee(comm.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCommittee === comm.id
                      ? 'bg-[#00979c] text-white shadow-md shadow-[#00979c]/30 font-semibold'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {comm.name} ({count})
                </button>
              )
            })}
          </div>

          {/* Search, Status Filter & CSV Export Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, or school..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00979c]"
                />
              </div>

              {/* Status Select */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-[#00979c]"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="waitlist">Waitlist</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* CSV Export Button */}
            <button
              onClick={handleExportCSV}
              disabled={filteredApplications.length === 0}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer disabled:opacity-40"
            >
              <Download className="w-4 h-4 text-[#00e5ff]" />
              <span>Export CSV ({filteredApplications.length})</span>
            </button>
          </div>
        </div>

        {/* Applicants Table */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4 sm:px-6">Applicant</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">School / Org</th>
                  <th className="py-3.5 px-4">Primary Committee</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">Shirt</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 hidden sm:table-cell">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => {
                    const primaryName =
                      committeeMap.get(app.primary_committee_id) || app.primary_committee_id
                    const secondaryName = app.secondary_committee_id
                      ? committeeMap.get(app.secondary_committee_id)
                      : null

                    return (
                      <tr
                        key={app.id}
                        className="hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Name & Contact */}
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="font-semibold text-white">
                            {app.full_name}
                          </div>
                          <div className="text-xs text-slate-400 font-mono">
                            {app.email}
                          </div>
                        </td>

                        {/* Organization */}
                        <td className="py-3.5 px-4 hidden md:table-cell text-slate-300 text-xs">
                          {app.organization_or_school || '—'}
                        </td>

                        {/* Primary Committee */}
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-[#00e5ff] text-xs">
                            {primaryName}
                          </span>
                          {secondaryName && (
                            <span className="block text-[11px] text-slate-500 truncate max-w-[150px]">
                              2nd: {secondaryName}
                            </span>
                          )}
                        </td>

                        {/* T-Shirt */}
                        <td className="py-3.5 px-4 hidden lg:table-cell">
                          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-slate-300">
                            {app.tshirt_size}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">{renderStatusBadge(app.status)}</td>

                        {/* Date */}
                        <td className="py-3.5 px-4 hidden sm:table-cell text-xs text-slate-400">
                          {new Date(app.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setActiveApplicant(app)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00979c]/15 hover:bg-[#00979c] text-[#00e5ff] hover:text-white text-xs font-semibold transition-all cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Review</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="text-sm font-medium">No volunteer applications found</p>
                      <p className="text-xs text-slate-600 mt-1">
                        Try adjusting your committee, status filters, or search terms.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Detail Inspection Drawer */}
      <ApplicantDrawer
        application={activeApplicant}
        committees={committees}
        onClose={() => setActiveApplicant(null)}
        onStatusUpdated={handleStatusUpdated}
      />
    </div>
  )
}

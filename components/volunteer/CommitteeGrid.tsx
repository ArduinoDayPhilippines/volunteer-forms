'use client'

import React from 'react'
import { Cpu, Boxes, Mic, Camera, Users, ShieldAlert, Check } from 'lucide-react'
import { Committee } from '@/lib/types/database'

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Boxes,
  Mic,
  Camera,
  Users,
  ShieldAlert,
}

export function CommitteeGrid({
  committees,
  onSelectCommittee,
}: {
  committees: Committee[]
  onSelectCommittee?: (committeeId: string) => void
}) {
  return (
    <section
      id="committees-section"
      className="py-16 md:py-24 border-t relative overflow-hidden"
      style={{
        borderColor: 'var(--border-muted)',
        /* Subtle dot-grid pattern for lateral fill on wide viewports */
        backgroundImage:
          'radial-gradient(circle, var(--border-base) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay to keep dot grid subtle and not fight content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--bg-base)', opacity: 0.85 }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-mono tracking-wider mb-3"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-base)',
              color: '#00979D',
            }}
          >
            <span>// 01. COMMITTEE DIRECTORY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Volunteer Committees &amp; Shift Duties
          </h2>
          <p className="mt-3 text-sm sm:text-base max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Review the roles below and select your first and second committee preferences in the application form.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {committees.map((committee) => {
            const IconComponent = ICON_MAP[committee.icon] || Users
            return (
              <div
                key={committee.id}
                className="group relative flex flex-col justify-between rounded-xl border p-6 sm:p-7 hover:border-[#00979D] transition-colors"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-base)' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-[#00979D]"
                      style={{ background: 'var(--brand-teal-surface)' }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      #{committee.id}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold mb-2 group-hover:text-[#00979D] transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {committee.name}
                  </h3>

                  {/* Increased from text-sm to text-base */}
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                    {committee.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t" style={{ borderColor: 'var(--border-muted)' }}>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>
                      Key Responsibilities:
                    </p>
                    {/* Increased from text-xs sm:text-sm to text-sm sm:text-base */}
                    <ul className="space-y-2 text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
                      {committee.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#00979D] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {onSelectCommittee && (
                  <button
                    onClick={() => onSelectCommittee(committee.id)}
                    className="mt-6 w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-colors border hover:bg-[#00979D] hover:text-white hover:border-[#00979D] focus-visible:ring-2 focus-visible:ring-[#00979D] focus-visible:outline-none cursor-pointer"
                    style={{
                      background: 'var(--bg-card-hover)',
                      borderColor: 'var(--border-base)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Select for Application
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

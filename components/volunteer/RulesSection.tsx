'use client'

import React from 'react'
import { ShieldCheck, HeartHandshake, Zap, Award, Lock, Eye } from 'lucide-react'

export const VOLUNTEER_RULES = [
  {
    icon: ShieldCheck,
    title: 'Commitment & Punctuality',
    description:
      'Volunteers are expected to attend the virtual briefing session prior to event day and report punctually for their designated shifts. If an emergency arises, notify your committee lead at least 24 hours in advance.',
  },
  {
    icon: HeartHandshake,
    title: 'Inclusive & Respectful Conduct',
    description:
      'Arduino Day Philippines is a safe, collaborative community. We enforce a zero-tolerance policy against harassment, discrimination, or offensive behavior. Treat all makers, students, and attendees with dignity and kindness.',
  },
  {
    icon: Zap,
    title: 'Hardware & Electrical Safety',
    description:
      'Safety is paramount. Ensure soldering irons, power strips, and high-current microcontroller rigs follow safety precautions. Never leave hot tools unattended and immediately flag hazards to the Safety Committee.',
  },
  {
    icon: Award,
    title: 'Maker Spirit & Mentorship',
    description:
      'Support attendees and learners when they ask for assistance with circuits, hardware, or code. Share knowledge generously and encourage questions.',
  },
  {
    icon: Lock,
    title: 'Data Confidentiality',
    description:
      'Attendee registration info, contact rosters, and internal organizer communications are confidential. Volunteers must not export, disclose, or repurpose participant personal data.',
  },
  {
    icon: Eye,
    title: 'Media & Photo Release',
    description:
      'By joining as a volunteer, you acknowledge that event media (photographs, live streams, and highlight reels) may feature you in official Arduino Day Philippines recaps and community archives.',
  },
]

export function RulesSection() {
  return (
    <section
      id="rules-section"
      className="py-16 md:py-24 border-t"
      style={{
        borderColor: 'var(--border-muted)',
        background: 'var(--bg-section-alt)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-mono tracking-wider mb-3"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-base)',
              color: '#F26727',
            }}
          >
            <span>// 02. CODE OF CONDUCT</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Volunteer Code of Conduct &amp; Expectations
          </h2>
          <p className="mt-3 text-sm sm:text-base max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Review these conduct standards before submitting. All volunteers are asked to commit to these guidelines for event day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VOLUNTEER_RULES.map((rule, idx) => {
            const Icon = rule.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border flex flex-col justify-start transition-colors hover:border-[#F26727]/50"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-base)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-[#F26727]"
                  style={{ background: 'var(--brand-orange-surface)' }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {rule.title}
                </h3>
                {/* Increased from text-xs sm:text-sm to text-sm sm:text-base */}
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {rule.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

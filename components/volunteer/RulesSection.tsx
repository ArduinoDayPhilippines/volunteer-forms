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
      'Embrace curiosity! When attendees or young learners struggle with a circuit or line of code, guide them constructively. Volunteers represent the warm, welcoming heartbeat of the Philippine maker ecosystem.',
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
    <section id="rules-section" className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-950/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e47128]/10 border border-[#e47128]/30 text-[#e47128] text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Community Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Volunteer Code of Conduct &amp; Rules
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Our volunteers uphold the highest standards of safety, respect, and enthusiasm. Please review these essential guidelines before submitting your application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VOLUNTEER_RULES.map((rule, idx) => {
            const Icon = rule.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-start"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00979c]/15 text-[#00e5ff] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {rule.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
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

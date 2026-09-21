'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowRight, ShieldCheck, Shirt, Utensils, Award, Cpu } from 'lucide-react'

const EVENT_FACTS = [
  { icon: Calendar, label: 'Date', value: 'March 21, 2026' },
  { icon: MapPin, label: 'Location', value: 'TBA (Metro Manila)' },
  { icon: Clock, label: 'Shifts', value: 'Morning / Afternoon / Full Day' },
  { icon: Cpu, label: 'Format', value: 'In-Person & Live Stream' },
]

const VOLUNTEER_BENEFITS = [
  {
    icon: Shirt,
    title: 'Volunteer T-Shirt & Badge',
    description: 'Official commemorative event shirt, volunteer lanyard, and identification badge.',
  },
  {
    icon: Utensils,
    title: 'Meals & Refreshments',
    description: 'Complimentary meals, drinks, and snacks provided during scheduled shifts.',
  },
  {
    icon: Award,
    title: 'Certificate of Contribution',
    description: 'Formal digital and physical certificate recognizing your volunteer service.',
  },
]

export function HeroSection({
  onApplyClick,
}: {
  onApplyClick: () => void
}) {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Technical Tag Badge */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-mono tracking-wide mb-6"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-base)',
              color: 'var(--text-secondary)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#00979D]" />
            <span>ARDUINO DAY PHILIPPINES 2026 // VOLUNTEER CALL</span>
          </div>

          {/* Headline */}
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl leading-[1.15]"
            style={{ color: 'var(--text-primary)' }}
          >
            Join the Volunteer Crew for{' '}
            <span className="text-[#00979D]">Arduino Day Philippines 2026</span>
          </h1>

          {/* Subtitle — grounded and direct */}
          <p
            className="mt-5 text-base sm:text-xl max-w-2xl leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            We are recruiting volunteers to help run the annual community maker gathering in Metro Manila this March. Shift roles are open for technical operations, registration, workshops, and stage production.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={onApplyClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#00979D] hover:bg-[#008184] text-white font-semibold text-base shadow-sm transition-colors cursor-pointer"
            >
              <span>Apply as Volunteer</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border font-medium text-base transition-colors hover:border-[#00979D] hover:text-[#00979D]"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-base)',
                color: 'var(--text-secondary)',
              }}
            >
              <ShieldCheck className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Event Brief Fact Grid */}
          <div
            className="mt-12 w-full max-w-3xl rounded-xl border p-4 sm:p-5 text-left grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-base)',
            }}
          >
            {EVENT_FACTS.map((fact, idx) => {
              const Icon = fact.icon
              return (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                    <Icon className="w-3.5 h-3.5 text-[#00979D]" />
                    <span className="text-xs font-mono uppercase tracking-wider">{fact.label}</span>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {fact.value}
                  </p>
                </div>
              )
            })}
          </div>

          {/* What Volunteers Receive */}
          <div className="mt-12 w-full max-w-4xl text-left">
            <h2
              className="text-xs font-mono uppercase tracking-wider mb-4 text-center sm:text-left"
              style={{ color: 'var(--text-muted)' }}
            >
              // Volunteer Provisions &amp; Benefits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {VOLUNTEER_BENEFITS.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border transition-colors hover:border-[#00979D]/60"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border-base)',
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 text-[#00979D]"
                      style={{ background: 'var(--brand-teal-surface)' }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

'use client'

import React from 'react'
import Image from 'next/image'
import { Users, Cpu, BookOpen, MapPin, Calendar, Clock, ExternalLink, Sparkles, Radio } from 'lucide-react'

const PILLARS = [
  {
    icon: Users,
    tag: 'CONNECT & SHARE',
    tagColor: 'var(--brand-teal)',
    title: 'Community',
    subtitle: 'Makers, Students & Mentors',
    description:
      'Bringing together beginners, hobbyists, and professional engineers across the Philippines to celebrate open hardware, exchange ideas, and collaborate.',
  },
  {
    icon: Cpu,
    tag: 'HARDWARE & CODE',
    tagColor: 'var(--brand-orange)',
    title: 'Build',
    subtitle: 'Prototyping & Physical Computing',
    description:
      'From custom microcontrollers and sensors to robotics and IoT rigs, witness firsthand what local creators are building with the Arduino ecosystem.',
  },
  {
    icon: BookOpen,
    tag: 'TALKS & DEMOS',
    tagColor: '#21935B',
    title: 'Learn',
    subtitle: 'Open Source Knowledge',
    description:
      'Engage with community-led talks, live project demonstrations, and interactive learning sessions designed to demystify electronics and accessible AI.',
  },
]

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-16 md:py-24 border-t"
      style={{
        borderColor: 'var(--border-muted)',
        background: 'var(--bg-section-alt)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-mono tracking-wider mb-4"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-base)',
              color: 'var(--brand-teal)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: 'var(--brand-teal)' }}
            />
            ABOUT THE DAY
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            What is{' '}
            <span style={{ color: 'var(--brand-teal)' }}>Arduino</span>{' '}
            <span style={{ color: 'var(--brand-orange)' }}>Day</span>{' '}
            <span className="text-[#21935B]">Philippines</span>?
          </h2>

          <div
            className="space-y-4 text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            <p>
              Arduino Day is a worldwide celebration of Arduino&apos;s birthday, bringing people
              together to share their builds, ideas, and open-source learnings.
            </p>
            <p>
              Alongside the official global stream, our Philippine community hosts in-person talks,
              hands-on hardware demos, and maker showcases so anyone—from first-time tinkerers to
              seasoned engineers—can discover, tinker, and contribute.
            </p>
          </div>
        </div>

        {/* Authentic Photo Bento Grid (Community, Build, Learn) */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-[230px_230px] gap-4">
            {/* Card 1: Community (Large feature) */}
            <div
              className="group relative overflow-hidden rounded-2xl border aspect-[16/10] md:aspect-auto md:col-span-3 md:row-span-2 shadow-sm"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-base)',
              }}
            >
              <Image
                src="/images/about/community-stage.png"
                alt="Arduino Day Philippines community gathering on stage"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 flex flex-col justify-end">
                <div className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded bg-[#00979D] text-white text-[11px] font-mono font-bold tracking-wider mb-2">
                  <Users className="w-3.5 h-3.5" />
                  <span>COMMUNITY</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                  Makers, Students &amp; Mentors on Stage
                </h4>
                <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-lg hidden sm:block">
                  A nationwide gathering uniting hardware tinkerers, educators, and robotics
                  enthusiasts from across the country.
                </p>
              </div>
            </div>

            {/* Card 2: Build */}
            <div
              className="group relative overflow-hidden rounded-2xl border aspect-[16/10] md:aspect-auto md:col-span-2 md:row-span-1 shadow-sm"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-base)',
              }}
            >
              <Image
                src="/images/about/makers-team.png"
                alt="Maker team celebrating collaborative Arduino builds"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end">
                <div className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded bg-[#F26727] text-white text-[11px] font-mono font-bold tracking-wider mb-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>BUILD</span>
                </div>
                <h4 className="text-lg font-bold text-white drop-shadow-md">
                  Creative Open-Source Innovations
                </h4>
                <p className="text-xs text-white/80 mt-0.5 hidden sm:block">
                  Real physical computing rigs, robotics, and sensors.
                </p>
              </div>
            </div>

            {/* Card 3: Learn */}
            <div
              className="group relative overflow-hidden rounded-2xl border aspect-[16/10] md:aspect-auto md:col-span-2 md:row-span-1 shadow-sm"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-base)',
              }}
            >
              <Image
                src="/images/about/workshop-session.png"
                alt="Interactive Arduino workshop session with attendees and computers"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end">
                <div className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded bg-[#21935B] text-white text-[11px] font-mono font-bold tracking-wider mb-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>LEARN</span>
                </div>
                <h4 className="text-lg font-bold text-white drop-shadow-md">
                  Hands-On Workstations &amp; Talks
                </h4>
                <p className="text-xs text-white/80 mt-0.5 hidden sm:block">
                  Live mentoring, accessible AI sessions, and coding labs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars Descriptive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="group relative rounded-xl border p-6 sm:p-8 transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-base)',
                }}
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-mono font-semibold tracking-wider"
                    style={{
                      background: `color-mix(in srgb, ${pillar.tagColor} 12%, transparent)`,
                      color: pillar.tagColor,
                      border: `1px solid color-mix(in srgb, ${pillar.tagColor} 25%, transparent)`,
                    }}
                  >
                    {pillar.tag}
                  </span>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    style={{
                      background: 'var(--bg-base)',
                      border: '1px solid var(--border-base)',
                      color: pillar.tagColor,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Pillar Title & Subtitle */}
                <h3
                  className="text-2xl font-bold tracking-tight mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-xs font-mono font-medium mb-3"
                  style={{ color: pillar.tagColor }}
                >
                  {pillar.subtitle}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Event Date & Location Notice (Venue TBA, no map embed) */}
        <div
          className="rounded-2xl border p-6 sm:p-8 lg:p-10"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border-base)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Details */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs font-mono mb-3"
                  style={{
                    background: 'var(--bg-base)',
                    borderColor: 'var(--border-base)',
                    color: 'var(--brand-orange)',
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                  <span>DATE CONFIRMED • LOCATION ANNOUNCEMENT IN PROGRESS</span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-bold tracking-tight mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Location: To Be Announced (Metro Manila)
                </h3>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  We are finalizing partnerships with our host institution in Metro Manila. Exact
                  venue coordinates, transit access guides, and entrance instructions will be shared
                  closer to the event across our official channels.
                </p>
              </div>

              {/* Fast Facts List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div
                  className="flex items-start gap-3 p-3.5 rounded-lg border"
                  style={{
                    background: 'var(--bg-base)',
                    borderColor: 'var(--border-base)',
                  }}
                >
                  <Calendar className="w-5 h-5 shrink-0 text-[var(--brand-teal)] mt-0.5" />
                  <div>
                    <div
                      className="text-xs font-mono uppercase tracking-wider font-semibold"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Date
                    </div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Sunday, March 21, 2027
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 p-3.5 rounded-lg border"
                  style={{
                    background: 'var(--bg-base)',
                    borderColor: 'var(--border-base)',
                  }}
                >
                  <Clock className="w-5 h-5 shrink-0 text-[var(--brand-orange)] mt-0.5" />
                  <div>
                    <div
                      className="text-xs font-mono uppercase tracking-wider font-semibold"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Time &amp; Admission
                    </div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Doors open at 8:00 AM PHT • Free Admission
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Status Callout */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div
                className="p-6 rounded-xl border text-center space-y-4"
                style={{
                  background: 'var(--bg-base)',
                  borderColor: 'var(--border-base)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto flex items-center justify-center border"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--brand-teal)',
                    color: 'var(--brand-teal)',
                  }}
                >
                  <MapPin className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h5
                    className="font-bold text-base"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Venue Announcements
                  </h5>
                  <p
                    className="text-xs leading-relaxed mt-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Follow the official Arduino Day Philippines Facebook page to be the first to know
                    when the venue is announced!
                  </p>
                </div>
                <a
                  href="https://www.facebook.com/arduinodayph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-xs font-semibold text-white transition-colors cursor-pointer"
                  style={{ background: 'var(--brand-teal)' }}
                >
                  <span>Get Notified on Facebook</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

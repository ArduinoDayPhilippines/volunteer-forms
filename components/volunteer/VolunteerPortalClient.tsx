'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Cpu, Shield, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react'
import { Committee } from '@/lib/types/database'
import { HeroSection } from './HeroSection'
import { CommitteeGrid } from './CommitteeGrid'
import { RulesSection } from './RulesSection'
import { VolunteerForm } from './VolunteerForm'

export function VolunteerPortalClient({
  committees,
}: {
  committees: Committee[]
}) {
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const scrollToForm = (committeeId?: string) => {
    if (committeeId) {
      setSelectedCommitteeId(committeeId)
    }
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-[#00979c] selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#090d16]/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00979c] to-[#00e5ff] flex items-center justify-center shadow-md shadow-[#00979c]/30 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-wide group-hover:text-[#00e5ff] transition-colors">
                Arduino Day Philippines
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#00979c]">
                Volunteer Portal 2026
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a
              href="#committees-section"
              className="hover:text-white transition-colors"
            >
              Committees
            </a>
            <a
              href="#rules-section"
              className="hover:text-white transition-colors"
            >
              Rules &amp; Conduct
            </a>
            <button
              onClick={() => scrollToForm()}
              className="hover:text-[#00e5ff] transition-colors cursor-pointer"
            >
              Apply Now
            </button>
            <Link
              href="/organizer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-200 hover:text-white transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-[#00979c]" />
              <span>Organizer Login</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 bg-slate-900 border-b border-slate-800 space-y-3">
            <a
              href="#committees-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-sm font-medium"
            >
              Committees
            </a>
            <a
              href="#rules-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-sm font-medium"
            >
              Rules &amp; Conduct
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                scrollToForm()
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-[#00e5ff] hover:bg-slate-800 text-sm font-medium"
            >
              Apply Now
            </button>
            <Link
              href="/organizer"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium"
            >
              Organizer Login &rarr;
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection onApplyClick={() => scrollToForm()} />

        <CommitteeGrid
          committees={committees}
          onSelectCommittee={(id) => scrollToForm(id)}
        />

        <RulesSection />

        {/* Volunteer Application Form Anchor Section */}
        <section
          ref={formRef}
          id="apply-section"
          className="py-16 md:py-24 border-t border-slate-800/80 relative"
        >
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00979c]/10 blur-3xl opacity-50" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00979c]/15 text-[#00e5ff] text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join The Crew</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Submit Your Volunteer Application
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base">
                Takes about 3 minutes. Applications are screened on a rolling basis.
              </p>
            </div>

            <VolunteerForm
              committees={committees}
              preselectedCommitteeId={selectedCommitteeId}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00979c]/20 flex items-center justify-center text-[#00e5ff]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Arduino Day Philippines 2026</p>
              <p className="text-slate-500 text-xs">
                Empowering the Philippine maker &amp; open-hardware movement.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a
              href="#rules-section"
              className="hover:text-slate-200 transition-colors"
            >
              Code of Conduct
            </a>
            <a
              href="#committees-section"
              className="hover:text-slate-200 transition-colors"
            >
              Committees
            </a>
            <Link
              href="/organizer"
              className="hover:text-[#00e5ff] transition-colors flex items-center gap-1"
            >
              <span>Organizer Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

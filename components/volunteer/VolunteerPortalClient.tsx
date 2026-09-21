'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Cpu, Shield, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react'
import { Committee } from '@/lib/types/database'
import { HeroSection } from './HeroSection'
import { AboutSection } from './AboutSection'
import { CommitteeGrid } from './CommitteeGrid'
import { RulesSection } from './RulesSection'
import { FaqSection } from './FaqSection'
import { VolunteerForm } from './VolunteerForm'
import { ThemeToggle } from './ThemeToggle'

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
    <div
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* Top Navigation */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          background: 'var(--bg-nav)',
          borderColor: 'var(--border-muted)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 sm:h-11 sm:w-11 shrink-0 flex items-center">
              <Image
                src="/images/adph-logo.png"
                alt="Arduino Day Philippines 2026"
                fill
                priority
                sizes="(max-width: 640px) 40px, 44px"
                className="object-contain"
              />
            </div>
            <div
              className="flex flex-col border-l pl-2.5 sm:pl-3"
              style={{ borderColor: 'var(--border-base)' }}
            >
              <span
                className="font-bold text-xs leading-tight tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Arduino Day Philippines
              </span>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#00979D]">
                Volunteer Portal 2026
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav
            className="hidden md:flex items-center gap-6 text-sm font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            <a
              href="#about"
              className="hover:text-[#00979D] transition-colors"
            >
              About
            </a>
            <a
              href="#committees-section"
              className="hover:text-[#00979D] transition-colors"
            >
              Committees
            </a>
            <a
              href="#rules-section"
              className="hover:text-[#00979D] transition-colors"
            >
              Rules &amp; Conduct
            </a>
            <a
              href="#faqs"
              className="hover:text-[#00979D] transition-colors"
            >
              FAQ
            </a>
            <button
              onClick={() => scrollToForm()}
              className="hover:text-[#00979D] transition-colors cursor-pointer"
            >
              Apply Now
            </button>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-all hover:border-[#00979D] hover:text-[#00979D]"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-base)',
                color: 'var(--text-secondary)',
              }}
            >
              <Shield className="w-3.5 h-3.5 text-[#00979D]" />
              <span>Sign In</span>
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile: theme toggle + menu button */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg transition-colors cursor-pointer"
              style={{ color: 'var(--text-muted)' }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div
            className="md:hidden px-4 pt-2 pb-6 border-b space-y-3"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-base)',
            }}
          >
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium transition-colors hover:text-[#00979D]"
              style={{ color: 'var(--text-secondary)' }}
            >
              About
            </a>
            <a
              href="#committees-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium transition-colors hover:text-[#00979D]"
              style={{ color: 'var(--text-secondary)' }}
            >
              Committees
            </a>
            <a
              href="#rules-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium transition-colors hover:text-[#00979D]"
              style={{ color: 'var(--text-secondary)' }}
            >
              Rules &amp; Conduct
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium transition-colors hover:text-[#00979D]"
              style={{ color: 'var(--text-secondary)' }}
            >
              FAQ
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                scrollToForm()
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-[#00979D]"
            >
              Apply Now
            </button>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium transition-colors hover:text-[#00979D]"
              style={{ color: 'var(--text-muted)' }}
            >
              Sign In →
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection onApplyClick={() => scrollToForm()} />

        <AboutSection />

        <CommitteeGrid
          committees={committees}
          onSelectCommittee={(id) => scrollToForm(id)}
        />

        <RulesSection />

        <FaqSection />

        {/* Volunteer Application Form Anchor Section */}
        <section
          ref={formRef}
          id="apply-section"
          className="py-16 md:py-24 border-t relative"
          style={{ borderColor: 'var(--border-muted)' }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-mono tracking-wider mb-3"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-base)',
                  color: '#00979D',
                }}
              >
                <span>// 04. APPLICATION FORM</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Submit Your Volunteer Application
              </h2>
              <p className="mt-3 text-base sm:text-lg" style={{ color: 'var(--text-muted)' }}>
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
      <footer
        className="border-t py-12 text-sm"
        style={{
          background: 'var(--bg-footer)',
          borderColor: 'var(--border-muted)',
          color: 'var(--text-muted)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="relative h-11 w-11 shrink-0">
              <Image
                src="/images/adph-logo.png"
                alt="Arduino Day Philippines 2026"
                fill
                sizes="44px"
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                Arduino Day Philippines 2026
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Empowering the Philippine maker &amp; open-hardware movement.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a
              href="#rules-section"
              className="hover:text-[#00979D] transition-colors"
            >
              Code of Conduct
            </a>
            <a
              href="#committees-section"
              className="hover:text-[#00979D] transition-colors"
            >
              Committees
            </a>
            <Link
              href="/login"
              className="hover:text-[#00979D] transition-colors flex items-center gap-1"
            >
              <span>Sign In</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

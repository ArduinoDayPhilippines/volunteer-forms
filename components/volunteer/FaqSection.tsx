'use client'

import React, { useState } from 'react'
import { ChevronDown, HelpCircle, Mail, ExternalLink, MessageSquare } from 'lucide-react'

interface FaqItem {
  id: string
  question: string
  answer: string
  links?: { label: string; href: string }[]
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-what-is-adph',
    question: 'What is Arduino Day Philippines?',
    answer:
      "Arduino Day is a global celebration of Arduino's birthday, bringing together makers, engineers, and technology enthusiasts. The Philippines chapter is a community-led gathering focused on sharing builds, ideas, and open-source learnings.",
  },
  {
    id: 'faq-when-where',
    question: 'When and where is the event?',
    answer:
      'Arduino Day Philippines 2027 will be held on Sunday, March 21, 2027, in Metro Manila. The official venue partner and location address are currently being finalized and will be revealed in upcoming announcements. Doors open at 8:00 AM PHT.',
  },
  {
    id: 'faq-registration-cost',
    question: 'How do I register and is it free?',
    answer:
      'Registration will open soon and the event will be free to attend. Pre-registration is required so we can manage venue capacity; walk-ins will be limited based on available seats.',
  },
  {
    id: 'faq-program-expectations',
    question: 'What can I expect in the program?',
    answer:
      'Expect community talks, project demos, and maker booths. We are finalizing the speaker lineup, agenda, and build sprints or challenges. Full schedule details will be posted once confirmed.',
  },
  {
    id: 'faq-speakers-exhibits',
    question: 'Can I speak or showcase a project?',
    answer:
      'We will open a call for speakers and project exhibits soon! Keep an eye on our announcements to submit your topic or showcase project as soon as the forms go live.',
  },
  {
    id: 'faq-partnerships',
    question: 'How do I become a community or media partner?',
    answer:
      "We'd love to have you on board! You can fill out our official partnership form below, or reach out to our team directly via email.",
    links: [
      { label: 'Partnership Form', href: 'https://bit.ly/adph2027-partnerships' },
      { label: 'arduinodayph@gmail.com', href: 'mailto:arduinodayph@gmail.com' },
    ],
  },
  {
    id: 'faq-sponsorship',
    question: 'How can I support the event?',
    answer:
      'Sponsorship and in-kind contributions are very welcome! Support helps us provide free kits, badges, and learning resources to students and makers across the country.',
    links: [
      { label: 'Sponsorship Form', href: 'https://forms.gle/arduinodayph-sponsor' },
      { label: 'arduinodayph@gmail.com', href: 'mailto:arduinodayph@gmail.com' },
    ],
  },
  {
    id: 'faq-streaming',
    question: 'Will there be online streaming?',
    answer:
      'We are exploring a hybrid setup for keynote talks and select sessions. If streaming is available, we will post livestream links alongside the final schedule.',
  },
]

export function FaqSection() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-what-is-adph': true, // Open the first question by default
  })

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <section
      id="faqs"
      className="scroll-mt-24 py-16 md:py-24 border-t"
      style={{
        borderColor: 'var(--border-muted)',
        background: 'var(--bg-section-alt)',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-mono tracking-wider mb-4"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-base)',
              color: 'var(--brand-teal)',
            }}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>GOT QUESTIONS?</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Frequently Asked Questions
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Everything you need to know about Arduino Day Philippines 2027, from tickets and venue
            access to talks and sponsorships.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = !!openIds[faq.id]
            const answerId = `faq-answer-${faq.id}`
            const questionId = `faq-question-${faq.id}`

            return (
              <div
                key={faq.id}
                className="rounded-xl border transition-colors overflow-hidden"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: isOpen ? 'var(--brand-teal)' : 'var(--border-base)',
                }}
              >
                <button
                  id={questionId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors cursor-pointer min-h-[56px] focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    outlineColor: 'var(--brand-teal)',
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="text-xs font-mono font-semibold px-2 py-0.5 rounded border shrink-0"
                      style={{
                        background: 'var(--bg-base)',
                        borderColor: 'var(--border-base)',
                        color: isOpen ? 'var(--brand-teal)' : 'var(--text-muted)',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="text-base sm:text-lg font-semibold tracking-tight"
                      style={{
                        color: isOpen ? 'var(--brand-teal)' : 'var(--text-primary)',
                      }}
                    >
                      {faq.question}
                    </span>
                  </span>

                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 border transition-transform duration-200"
                    style={{
                      background: 'var(--bg-base)',
                      borderColor: 'var(--border-base)',
                      color: isOpen ? 'var(--brand-teal)' : 'var(--text-muted)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Collapsible Answer Panel */}
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm sm:text-base leading-relaxed border-t"
                      style={{
                        borderColor: 'var(--border-base)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <p>{faq.answer}</p>

                      {/* Links if available */}
                      {faq.links && faq.links.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2.5 pt-2">
                          {faq.links.map((link) => {
                            const isMail = link.href.startsWith('mailto:')
                            return (
                              <a
                                key={link.href}
                                href={link.href}
                                target={isMail ? '_self' : '_blank'}
                                rel={isMail ? undefined : 'noopener noreferrer'}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors cursor-pointer"
                                style={{
                                  background: 'var(--bg-base)',
                                  borderColor: 'var(--border-base)',
                                  color: 'var(--brand-teal)',
                                }}
                              >
                                {isMail ? (
                                  <Mail className="w-3.5 h-3.5" />
                                ) : (
                                  <ExternalLink className="w-3.5 h-3.5" />
                                )}
                                <span>{link.label}</span>
                              </a>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Contact Footer Box */}
        <div
          className="mt-12 rounded-xl border p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border-base)',
          }}
        >
          <div className="text-left">
            <h4
              className="text-base font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Have a question not listed here?
            </h4>
            <p
              className="text-xs sm:text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              Reach out to our organizing team directly at arduinodayph@gmail.com
            </p>
          </div>
          <a
            href="mailto:arduinodayph@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-colors cursor-pointer shrink-0"
            style={{ background: 'var(--brand-teal)' }}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact Organizers</span>
          </a>
        </div>
      </div>
    </section>
  )
}

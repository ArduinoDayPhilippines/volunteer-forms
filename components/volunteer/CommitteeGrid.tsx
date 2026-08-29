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
    <section id="committees-section" className="py-16 md:py-24 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#00e5ff] mb-3">
            Committees &amp; Responsibilities
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Find the Team Where You Belong
          </p>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Every volunteer plays a vital role in bringing Arduino Day Philippines to life. Browse our committees to see where your talents can make the highest impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {committees.map((committee) => {
            const IconComponent = ICON_MAP[committee.icon] || Users
            return (
              <div
                key={committee.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/70 border border-slate-800 p-6 sm:p-7 hover:border-[#00979c]/50 transition-all duration-200 hover:shadow-xl hover:shadow-[#00979c]/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#00979c]/15 text-[#00e5ff] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      #{committee.id}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00e5ff] transition-colors">
                    {committee.name}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {committee.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-slate-800/80">
                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Key Responsibilities:
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                      {committee.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#00979c] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {onSelectCommittee && (
                  <button
                    onClick={() => onSelectCommittee(committee.id)}
                    className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-[#00979c] text-slate-200 hover:text-white font-medium text-xs sm:text-sm transition-all focus-visible:ring-2 focus-visible:ring-[#00979c] focus-visible:outline-none cursor-pointer"
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

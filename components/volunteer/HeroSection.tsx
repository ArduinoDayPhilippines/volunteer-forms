'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, Calendar, MapPin, Users, ArrowRight, ShieldCheck, Cpu } from 'lucide-react'

export function HeroSection({
  onApplyClick,
}: {
  onApplyClick: () => void
}) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background glowing gradients */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#00979c]/20 via-[#00e5ff]/10 to-transparent blur-3xl opacity-60" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[400px] h-[400px] bg-gradient-to-br from-[#e47128]/15 to-transparent blur-3xl opacity-40" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00979c]/10 border border-[#00979c]/30 text-[#00e5ff] text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-[#00e5ff]" />
            <span>Official Volunteer Recruitment Portal</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]">
            Build the Future of <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#00e5ff] via-[#00979c] to-[#e47128] bg-clip-text text-transparent">
              Arduino Day Philippines
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Be the driving force behind the largest open-source hardware and maker celebration in the country. Join our volunteer committees, mentor aspiring inventors, and shape unforgettable maker experiences.
          </p>

          {/* Event Quick Meta Tags */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur">
              <Calendar className="w-4 h-4 text-[#00979c]" />
              <span>March 2026 &bull; Global Arduino Week</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur">
              <MapPin className="w-4 h-4 text-[#e47128]" />
              <span>Metro Manila &amp; Hybrid Broadcast</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur">
              <Users className="w-4 h-4 text-[#00e5ff]" />
              <span>500+ Makers, Students &amp; Engineers</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onApplyClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#00979c] to-[#008184] hover:from-[#008184] hover:to-[#006468] text-white font-semibold text-base shadow-lg shadow-[#00979c]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[#00979c] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer"
            >
              <span>Apply as Volunteer</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <Link
              href="/organizer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-medium text-base transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>Organizer Portal</span>
            </Link>
          </div>

          {/* Value props */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl text-left">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-[#00979c]/15 flex items-center justify-center text-[#00e5ff] mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Hands-on Hardware</h3>
              <p className="mt-1 text-sm text-slate-400">
                Work directly with microcontrollers, IoT sensor arrays, robotics kits, and stage A/V gear.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-[#e47128]/15 flex items-center justify-center text-[#e47128] mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Maker Community</h3>
              <p className="mt-1 text-sm text-slate-400">
                Network with leading hardware engineers, academic researchers, and nationwide student innovators.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/15 flex items-center justify-center text-[#00e5ff] mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Official Swag &amp; Perks</h3>
              <p className="mt-1 text-sm text-slate-400">
                Exclusive volunteer commemorative t-shirt, meals, official Certificate of Contribution, and maker kit access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

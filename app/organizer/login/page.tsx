'use client'

import React, { useActionState } from 'react'
import Link from 'next/link'
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowLeft, Cpu, KeyRound } from 'lucide-react'
import { loginOrganizer } from '@/app/actions/organizer-actions'

const initialState = {
  error: '',
}

export default function OrganizerLoginPage() {
  const [state, formAction, isPending] = useActionState(loginOrganizer, initialState)

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#090d16] px-4 sm:px-6 lg:px-8 relative overflow-hidden text-slate-100">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#00979c]/15 blur-3xl opacity-50" />

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Volunteer Portal</span>
        </Link>

        {/* Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00979c] to-[#00e5ff] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#00979c]/25">
              <ShieldCheck className="w-7 h-7 text-slate-950 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Organizer Sign In
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Access the Arduino Day Philippines applicant review and committee management portal.
            </p>
          </div>

          {/* Error Message Banner */}
          {state?.error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-800 text-red-200 flex items-start gap-3 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p>{state.error}</p>
            </div>
          )}

          <form action={formAction} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Organizer Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="organizer@arduinoday.ph"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00979c] focus:ring-2 focus:ring-[#00979c]/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00979c] focus:ring-2 focus:ring-[#00979c]/30 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00979c] to-[#008184] hover:from-[#008184] hover:to-[#006468] text-white font-semibold text-sm shadow-lg shadow-[#00979c]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In as Organizer</span>
                  <ShieldCheck className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 text-left">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400">
              <p className="font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#00e5ff]" />
                <span>Authorized Organizer Access</span>
              </p>
              <div className="space-y-1 font-mono text-[11px] text-slate-400">
                <p>
                  Email: <span className="text-slate-200 select-all">organizer@arduinoday.ph</span>
                </p>
                <p>
                  Password: <span className="text-slate-200 select-all">ArduinoDay2026!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

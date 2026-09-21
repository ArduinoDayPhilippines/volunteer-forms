'use client'

import React, { useActionState } from 'react'
import Link from 'next/link'
import { Shield, Mail, Lock, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import { loginOrganizer } from '@/app/actions/organizer-actions'
import { ThemeToggle } from '@/components/volunteer/ThemeToggle'

const initialState = {
  error: '',
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginOrganizer, initialState)

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-200"
      style={{
        backgroundColor: 'var(--bg-base)',
        color: 'var(--text-primary)',
      }}
    >

      {/* Top utility row: Back button & Theme toggle */}
      <div className="w-full max-w-md relative z-10 flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium transition-colors hover:text-[#00979D]"
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Volunteer Portal</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div
          className="rounded-xl border p-8 sm:p-10 shadow-sm transition-colors duration-200"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-base)',
          }}
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-lg bg-[#00979D] flex items-center justify-center mx-auto mb-4 text-white shadow-sm">
              <Shield className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Sign In
            </h1>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Access your Arduino Day Philippines account.
            </p>
          </div>

          {/* Error Message Banner */}
          {state?.error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/80 text-red-200 flex items-start gap-3 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p>{state.error}</p>
            </div>
          )}

          <form action={formAction} className="space-y-5">
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Email Address
              </label>
              <div className="relative">
                <div
                  className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all focus:outline-none focus:border-[#00979D] focus:ring-2 focus:ring-[#00979D]/20"
                  style={{
                    backgroundColor: 'var(--form-bg)',
                    borderColor: 'var(--form-border)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Password
              </label>
              <div className="relative">
                <div
                  className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm transition-all focus:outline-none focus:border-[#00979D] focus:ring-2 focus:ring-[#00979D]/20"
                  style={{
                    backgroundColor: 'var(--form-bg)',
                    borderColor: 'var(--form-border)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 px-4 rounded-lg bg-[#00979D] hover:bg-[#008184] text-white font-semibold text-sm shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

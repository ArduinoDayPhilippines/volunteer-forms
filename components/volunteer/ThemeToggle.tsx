'use client'

import React, { useLayoutEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

const STORAGE_KEY = 'adph-theme'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [isDark, setIsDark] = useState(true)

  // Re-apply after React clears data-theme on dev remount (per Next.js docs pattern).
  // In production this is a no-op since the inline script already ran.
  useLayoutEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const theme = stored === 'light' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', theme)
    setIsDark(theme === 'dark')
  }, [])

  function toggle() {
    const next = isDark ? 'light' : 'dark'
    localStorage.setItem(STORAGE_KEY, next)
    document.documentElement.setAttribute('data-theme', next)
    setIsDark(next === 'dark')
  }

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative p-2 rounded-lg transition-all duration-200 cursor-pointer border border-transparent hover:border-[var(--border-base)] hover:bg-[var(--bg-card-hover)] ${className}`}
      style={{ color: 'var(--text-secondary)' }}
    >
      <span className="sr-only">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
      {isDark ? (
        <Sun className="w-5 h-5 text-[#F26727] transition-transform hover:rotate-12 duration-200" />
      ) : (
        <Moon className="w-5 h-5 text-[#00979D] transition-transform hover:-rotate-12 duration-200" />
      )}
    </button>
  )
}

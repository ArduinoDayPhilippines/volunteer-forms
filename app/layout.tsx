import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Arduino Day Philippines 2026 | Volunteer Recruitment & Management',
  description:
    'Join the official volunteer organizing team for Arduino Day Philippines 2026. Empower makers, students, and hardware innovators across the nation.',
  keywords: [
    'Arduino',
    'Arduino Day Philippines',
    'ADPH',
    'Volunteer',
    'Maker',
    'Hardware',
    'Robotics',
    'Electronics',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-[#00979c] selection:text-white">
        {children}
      </body>
    </html>
  )
}

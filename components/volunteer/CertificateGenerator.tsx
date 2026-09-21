'use client'

import React, { useRef, useCallback, useEffect } from 'react'
import { Download, Award } from 'lucide-react'

interface CertificateGeneratorProps {
  applicantName: string
  committeeName: string
  applicationId: string
  issuedDate: string
}

function drawCertificate(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  { applicantName, committeeName, applicationId, issuedDate }: CertificateGeneratorProps
) {
  // ── Background (Deep Charcoal Slate) ───────────────────────────
  const bgGrad = ctx.createLinearGradient(0, 0, w, h)
  bgGrad.addColorStop(0, '#0E1418')
  bgGrad.addColorStop(0.5, '#161F24')
  bgGrad.addColorStop(1, '#1B262C')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, w, h)

  // Subtle brand tint
  const glowGrad = ctx.createRadialGradient(w / 2, 0, 0, w / 2, 0, h * 0.8)
  glowGrad.addColorStop(0, 'rgba(0, 151, 157, 0.14)')
  glowGrad.addColorStop(0.6, 'rgba(242, 103, 39, 0.05)')
  glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = glowGrad
  ctx.fillRect(0, 0, w, h)

  // ── Outer decorative border (Arduino Teal) ──────────────────────
  const bm = 18
  ctx.strokeStyle = '#00979D'
  ctx.lineWidth = 3
  ctx.strokeRect(bm, bm, w - bm * 2, h - bm * 2)

  ctx.strokeStyle = 'rgba(0, 151, 157, 0.35)'
  ctx.lineWidth = 1
  ctx.strokeRect(bm + 8, bm + 8, w - (bm + 8) * 2, h - (bm + 8) * 2)

  // Corner accent marks (Arduino Orange)
  const cSize = 20
  const corners: [number, number][] = [
    [bm, bm],
    [w - bm, bm],
    [bm, h - bm],
    [w - bm, h - bm],
  ]
  ctx.strokeStyle = '#F26727'
  ctx.lineWidth = 2.5
  for (const [cx, cy] of corners) {
    const dx = cx === bm ? 1 : -1
    const dy = cy === bm ? 1 : -1
    ctx.beginPath()
    ctx.moveTo(cx + dx * cSize, cy)
    ctx.lineTo(cx, cy)
    ctx.lineTo(cx, cy + dy * cSize)
    ctx.stroke()
  }

  // ── Header banner ────────────────────────────────────────────────
  const bannerH = 72
  const bannerGrad = ctx.createLinearGradient(0, bm + 16, w, bm + 16 + bannerH)
  bannerGrad.addColorStop(0, 'rgba(0, 151, 157, 0.22)')
  bannerGrad.addColorStop(1, 'rgba(242, 103, 39, 0.08)')
  ctx.fillStyle = bannerGrad
  ctx.fillRect(bm + 16, bm + 16, w - (bm + 16) * 2, bannerH)

  ctx.font = 'bold 13px sans-serif'
  ctx.fillStyle = '#00979D'
  ctx.textAlign = 'left'
  ctx.fillText('ARDUINO DAY PHILIPPINES', bm + 32, bm + 52)

  ctx.font = 'bold 12px sans-serif'
  ctx.fillStyle = '#F26727'
  ctx.textAlign = 'right'
  ctx.fillText('2027', w - bm - 32, bm + 52)

  // ── Divider line ─────────────────────────────────────────────────
  const divY = bm + 16 + bannerH + 2
  const divGrad = ctx.createLinearGradient(bm + 16, 0, w - bm - 16, 0)
  divGrad.addColorStop(0, 'rgba(0, 151, 157, 0)')
  divGrad.addColorStop(0.3, '#00979D')
  divGrad.addColorStop(0.7, '#F26727')
  divGrad.addColorStop(1, 'rgba(242, 103, 39, 0)')
  ctx.strokeStyle = divGrad
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(bm + 16, divY)
  ctx.lineTo(w - bm - 16, divY)
  ctx.stroke()

  // ── Certificate title ────────────────────────────────────────────
  ctx.textAlign = 'center'
  ctx.font = 'bold 14px sans-serif'
  ctx.fillStyle = 'rgba(0, 151, 157, 0.85)'
  ctx.fillText('CERTIFICATE OF', w / 2, divY + 38)

  ctx.font = 'bold 28px sans-serif'
  const titleGrad = ctx.createLinearGradient(w * 0.25, 0, w * 0.75, 0)
  titleGrad.addColorStop(0, '#FFFFFF')
  titleGrad.addColorStop(1, '#00979D')
  ctx.fillStyle = titleGrad
  ctx.fillText('VOLUNTEER CONTRIBUTION', w / 2, divY + 72)

  ctx.font = '15px serif'
  ctx.fillStyle = 'rgba(209, 219, 223, 0.8)'
  ctx.fillText('This is to certify that', w / 2, divY + 112)

  // ── Applicant name ───────────────────────────────────────────────
  ctx.font = 'bold 38px serif'
  const nameGrad = ctx.createLinearGradient(w * 0.2, 0, w * 0.8, 0)
  nameGrad.addColorStop(0, '#FFFFFF')
  nameGrad.addColorStop(1, '#F26727')
  ctx.fillStyle = nameGrad
  ctx.fillText(applicantName, w / 2, divY + 155)

  const nameMetrics = ctx.measureText(applicantName)
  const nameUnderlineW = Math.min(nameMetrics.width + 40, w - (bm + 32) * 2)
  ctx.strokeStyle = 'rgba(0, 151, 157, 0.5)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(w / 2 - nameUnderlineW / 2, divY + 162)
  ctx.lineTo(w / 2 + nameUnderlineW / 2, divY + 162)
  ctx.stroke()

  // ── Committee and event ──────────────────────────────────────────
  ctx.font = '15px sans-serif'
  ctx.fillStyle = 'rgba(209, 219, 223, 0.85)'
  ctx.fillText('has fulfilled the role of', w / 2, divY + 190)

  ctx.font = 'bold 18px sans-serif'
  ctx.fillStyle = '#F26727'
  ctx.fillText(`Volunteer — ${committeeName}`, w / 2, divY + 216)

  ctx.font = '14px sans-serif'
  ctx.fillStyle = 'rgba(134, 146, 153, 0.85)'
  ctx.fillText('for', w / 2, divY + 238)

  ctx.font = 'bold 16px sans-serif'
  ctx.fillStyle = '#00979D'
  ctx.fillText('Arduino Day Philippines 2027', w / 2, divY + 260)

  // ── Mid-divider ──────────────────────────────────────────────────
  const midDivY = divY + 278
  ctx.strokeStyle = 'rgba(46, 56, 62, 0.8)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(bm + 80, midDivY)
  ctx.lineTo(w - bm - 80, midDivY)
  ctx.stroke()

  // ── App ID & date ────────────────────────────────────────────────
  const rowY = midDivY + 28

  ctx.textAlign = 'left'
  ctx.font = '10px monospace'
  ctx.fillStyle = 'rgba(134, 146, 153, 0.85)'
  ctx.fillText('APPLICATION ID', bm + 48, rowY)
  ctx.font = '12px monospace'
  ctx.fillStyle = 'rgba(209, 219, 223, 0.9)'
  ctx.fillText(applicationId, bm + 48, rowY + 16)

  ctx.textAlign = 'right'
  ctx.font = '10px sans-serif'
  ctx.fillStyle = 'rgba(134, 146, 153, 0.85)'
  ctx.fillText('ISSUED', w - bm - 48, rowY)
  ctx.font = '12px sans-serif'
  ctx.fillStyle = 'rgba(209, 219, 223, 0.9)'
  ctx.fillText(issuedDate, w - bm - 48, rowY + 16)

  // ── Watermark ────────────────────────────────────────────────────
  const sealY = h - bm - 30
  ctx.textAlign = 'center'
  ctx.font = '10px sans-serif'
  ctx.fillStyle = 'rgba(0, 151, 157, 0.5)'
  ctx.fillText(
    'ARDUINO DAY PHILIPPINES · VOLUNTEER RECOGNITION · 2027',
    w / 2,
    sealY
  )
}

export function CertificateGenerator({
  applicantName,
  committeeName,
  applicationId,
  issuedDate,
}: CertificateGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawCertificate(ctx, canvas.width, canvas.height, {
      applicantName,
      committeeName,
      applicationId,
      issuedDate,
    })
  }, [applicantName, committeeName, applicationId, issuedDate])

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawCertificate(ctx, canvas.width, canvas.height, {
      applicantName,
      committeeName,
      applicationId,
      issuedDate,
    })
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      const safeName = applicantName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
      a.download = `volunteer-certificate-${safeName}.png`
      a.href = url
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    }, 'image/png')
  }, [applicantName, committeeName, applicationId, issuedDate])

  return (
    <div className="mt-8 space-y-4">
      {/* Certificate Preview */}
      <div
        className="relative rounded-xl overflow-hidden border"
        style={{ borderColor: 'var(--border-base)' }}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={520}
          className="w-full h-auto block"
          aria-label="Volunteer certificate preview"
        />
      </div>

      {/* Download button */}
      <button
        id="download-certificate-btn"
        onClick={handleDownload}
        className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#00979D] hover:bg-[#008184] text-white font-semibold text-base shadow-sm transition-colors cursor-pointer"
      >
        <Award className="w-5 h-5" />
        <span>Download Certificate as PNG</span>
        <Download className="w-4 h-4 opacity-80" />
      </button>
      <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
        Your certificate of volunteer contribution — save it or share it proudly!
      </p>
    </div>
  )
}

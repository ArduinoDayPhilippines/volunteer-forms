## Context

See proposal.md for motivation. The project is a Next.js 16 / React 19 app using Tailwind CSS v4. Current layout uses hardcoded dark classes and hex colors throughout. The `html` element has a hardcoded `dark` class; themes must work without server-side rendering for theme selection to avoid hydration mismatches.

## Goals / Non-Goals

**Goals:**
- Implement light/dark toggle without introducing a theme library dependency
- Increase font sizes to meet QA readability requirements across all sections
- Add visually rich lateral fill content to wide-viewport layouts
- Render a downloadable HTML5 canvas certificate in the submission success view

**Non-Goals:**
- System-preference `prefers-color-scheme` automatic detection (always defaults to dark)
- Server-side theme rendering (client-only localStorage approach is sufficient)
- PDF certificate output (PNG via canvas download is sufficient)
- Animated certificate transitions

## Decisions

### Theme system: CSS variables + `data-theme` attribute on `<html>`
Instead of relying on Tailwind's `dark:` variants (which require the `dark` class strategy in TW v4), we use CSS custom properties on `:root` (dark defaults) and `[data-theme="light"]` overrides. A small inline `<script>` in `layout.tsx` reads `localStorage` before React hydrates to set the initial `data-theme` attribute — this prevents FOUT (flash of opposite theme).

**Alternative considered:** `next-themes` library. Rejected to avoid adding a dependency for simple two-state toggle.

### Certificate: HTML5 Canvas API, client-only
`CertificateGenerator` is a `'use client'` component. It uses a `<canvas>` element rendered off-screen, draws text/shapes with Canvas 2D API, then calls `canvas.toBlob()` to trigger a download. No server calls needed.

**Alternative considered:** jsPDF or react-pdf. Rejected to avoid bundle size cost; canvas PNG is simpler and sufficient.

### Font size increases: Tailwind class upgrades
Rather than modifying `globals.css` base font-size (which could break spacing rhythm), we update Tailwind utility class sizes in each component individually (e.g. `text-sm` → `text-base`, `text-xs` → `text-sm`). Hero heading remains large; body/card text is the priority.

### Lateral fill: floating decorative stat panels + grid dot pattern
`HeroSection` gains a floating stats panel anchored to the right side on `lg:` breakpoints. `CommitteeGrid` gains a subtle dot-grid pattern as a CSS background. These are purely decorative `pointer-events-none` elements with `aria-hidden`.

## Risks / Trade-offs

- [FOUT risk] Inline `<script>` in layout must run synchronously before React paint. Mitigation: keep the script small (< 200 bytes) and use `dangerouslySetInnerHTML` with a Next.js `<Script strategy="beforeInteractive">` alternative.
- [Canvas font rendering] Canvas font rendering varies across OS/browser. Mitigation: use web-safe fonts (sans-serif stack) and test on Chrome/Firefox.
- [Light mode contrast] Some existing slate-* colors may be too light in light mode. Mitigation: design a complete light-mode token set with explicit contrast-checked values before applying.

## Migration Plan

No database or API changes. All changes are purely frontend. Deploy by running `npm run build` as usual.

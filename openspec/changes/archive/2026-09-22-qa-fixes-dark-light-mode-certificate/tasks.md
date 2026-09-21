## 1. Theme System (CSS Variables + Toggle)

- [x] 1.1 Add light-mode CSS variable overrides to `app/globals.css` using `[data-theme="light"]` selector, covering background, card, border, text, and brand colors; verify the file has no Tailwind conflicts
- [x] 1.2 Add an inline `<script>` to `app/layout.tsx` (via `dangerouslySetInnerHTML`) that reads `localStorage.getItem('theme')` and sets `document.documentElement.setAttribute('data-theme', ...)` before React hydrates; remove hardcoded `dark` class from `<html>`; verify page loads in dark mode by default with no FOUT
- [x] 1.3 Add a `ThemeToggle` button component (sun/moon icon from lucide-react) that reads/writes `data-theme` and syncs to `localStorage`; verify clicking it toggles the HTML attribute
- [x] 1.4 Place `ThemeToggle` in the desktop and mobile nav bars of `VolunteerPortalClient.tsx`; verify it appears in both and updates the theme on click

## 2. Typography & Font Size Increases

- [x] 2.1 In `HeroSection.tsx`: increase subtitle paragraph from `text-lg sm:text-xl` to `text-xl sm:text-2xl`, increase value prop card body text from `text-sm` to `text-base`; verify text is visibly larger
- [x] 2.2 In `CommitteeGrid.tsx`: increase committee description from `text-sm` to `text-base`, increase responsibility list items from `text-xs sm:text-sm` to `text-sm sm:text-base`; verify card content is readable
- [x] 2.3 In `RulesSection.tsx`: increase rule description text from `text-xs sm:text-sm` to `text-sm sm:text-base`; verify rule cards are readable
- [x] 2.4 In `VolunteerForm.tsx`: increase form label sizes from `text-sm` to `text-base` throughout; increase helper/error text from `text-xs` to `text-sm`; verify form readability improved

## 3. Lateral Fill / Side Content Enrichment

- [x] 3.1 In `HeroSection.tsx`: add a floating stats panel on the right side (lg: breakpoint only, `pointer-events-none`, `aria-hidden`) showing 3 event stats (e.g., "500+ Makers", "6 Committees", "1-Day Event") with brand-accented cards; verify it appears only on lg+ and does not overlap main content
- [x] 3.2 In `VolunteerPortalClient.tsx` or `CommitteeGrid.tsx`: add a subtle dot-grid decorative CSS background pattern (`background-image: radial-gradient(...)`) to the CommitteeGrid section container; verify it renders on wide viewports without harming readability

## 4. Certificate Generator Component

- [x] 4.1 Create `components/volunteer/CertificateGenerator.tsx` as a `'use client'` component that accepts `{ applicantName, committeeName, applicationId, issuedDate }` props and renders an off-screen `<canvas>` (800×600px); verify component file exists and imports correctly
- [x] 4.2 Implement canvas drawing in `CertificateGenerator.tsx`: outer decorative border, gradient banner, "Certificate of Volunteer Contribution" title, applicant name in large text, committee name, application ID, event name "Arduino Day Philippines 2026", issued date, and a decorative Arduino-themed accent; verify the canvas renders visually when mounted
- [x] 4.3 Implement download handler in `CertificateGenerator.tsx`: on button click, call `canvas.toBlob()` then create an anchor `href` from blob URL with `download="volunteer-certificate-<name>.png"` and programmatically click it; verify clicking the button downloads a PNG file
- [x] 4.4 Import and render `CertificateGenerator` in the success state of `VolunteerForm.tsx` (lines ~251-342), passing `applicantName`, committee name (looked up from `committees`), `applicationId`, and today's formatted date; verify the certificate download button appears on the success screen after form submission

## 5. Light Mode Color Token Application

- [x] 5.1 Audit `VolunteerPortalClient.tsx`, `HeroSection.tsx`, `CommitteeGrid.tsx`, `RulesSection.tsx` for hardcoded dark hex colors (e.g., `bg-[#090d16]`, `bg-slate-950`, `text-slate-100`) and replace with CSS variable references or Tailwind `dark:`-compatible classes where needed so light mode tokens apply; verify light mode shows readable content
- [x] 5.2 Audit `VolunteerForm.tsx` form inputs and card backgrounds for hardcoded dark colors and update to theme-aware classes; verify form is readable in light mode


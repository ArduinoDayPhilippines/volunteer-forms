## 1. CSS Token & Variable Foundation

- [x] 1.1 Update `app/globals.css` with official Arduino Days design tokens: `--brand-teal: #00979D`, `--brand-teal-hover: #008184`, `--brand-orange: #F26727`, `--brand-orange-hover: #D95318`, along with exact light mode tokens (`--bg-base: #F7F9FA`, `--bg-card: #FFFFFF`, `--border-base: #DAE3E3`, `--text-primary: #2C353A`, `--form-bg: #FFFFFF`, `--form-border: #DAE3E3`) and dark mode tokens (`--bg-base: #13181B`, `--bg-card: #1E2529`, `--border-base: #2E383E`, `--text-primary: #F7F9FA`, `--form-bg: #1E2529`, `--form-border: #2E383E`). Verify tokens are defined and resolve cleanly.
- [x] 1.2 Update selection color in `app/layout.tsx` to `#00979D`. Verify text selection highlight renders in official Arduino Teal.

## 2. Navigation, Header & Theme Toggle

- [x] 2.1 Refactor `components/volunteer/VolunteerPortalClient.tsx` header to remove cyan gradients (`#00e5ff`), use solid Arduino Teal (`#00979D`), and crisp 1px borders matching `days.arduino.cc`. Verify nav bar renders cleanly in both light and dark modes.
- [x] 2.2 Refactor `components/volunteer/ThemeToggle.tsx` to use `#00979D` for active icons and remove hardcoded cyan accents. Verify theme toggle switches between Arduino Days light and dark themes smoothly.

## 3. HeroSection & Event Pillar Components

- [x] 3.1 Refactor `components/volunteer/HeroSection.tsx` to use Arduino Days styling: technical pill badge with `#00979D`, high contrast headline, solid flat CTA buttons without AI glows, and event facts card with crisp 1px border. Verify visual rendering in both themes.
- [x] 3.2 Refactor `components/volunteer/CommitteeGrid.tsx` to implement modular pillar cards: flat solid backgrounds, 1px borders (`#DAE3E3` in light, `#2E383E` in dark), Arduino Teal and Orange role tags, and clean hover states without radial neon dropshadows. Verify cards display properly on mobile and desktop.
- [x] 3.3 Refactor `components/volunteer/RulesSection.tsx` to align card borders, numbered badges, and callout containers with Arduino Days design tokens. Verify rules render with clear hierarchy and high contrast.

## 4. Form & Certificate Styling Refinements

- [x] 4.1 Refactor `components/volunteer/VolunteerForm.tsx` to replace all hardcoded `bg-slate-950` and `border-slate-800` classes with CSS variable tokens (`var(--form-bg)`, `var(--form-border)`, `var(--form-border-focus)`), replace cyan highlights with `#00979D`, and apply official Arduino button styles. Verify form inputs render with clean white/off-white in light mode and dark charcoal in dark mode.
- [x] 4.2 Refactor `components/volunteer/CertificateGenerator.tsx` canvas rendering to use the Arduino Days color scheme: deep slate canvas background, Arduino Teal (`#00979D`) outer border, and Arduino Orange (`#F26727`) corner accents and ribbon seal. Verify certificate canvas renders and downloads correctly.
- [x] 4.3 Refactor `app/login/page.tsx` and centralized login card to adopt the Arduino Days color scheme, crisp 1px border, and theme consistency. Verify login page renders with proper Arduino branding.

## 5. Integration Testing & Verification

- [x] 5.1 Run `npm run build` and verify that Next.js compiles all pages with 0 TypeScript or lint errors.
- [x] 5.2 Validate OpenSpec change with `openspec validate arduino-days-style-color-scheme --json` and verify all artifacts pass schema validation.

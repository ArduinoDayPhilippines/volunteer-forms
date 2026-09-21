## Why

QA testing across multiple reviewers surfaced consistent feedback: typography throughout the volunteer portal is too small and difficult to read, lateral page areas feel visually sparse and wasted, and the site lacks a light/dark mode preference toggle. Additionally, volunteers need a printable certificate of contribution they can download after submitting their application.

## What Changes

- Increase base font sizes globally and throughout all components (hero heading, body text, form labels, card text) to improve readability
- Add rich sidebar/lateral decorative content to sections that currently show large empty margins (e.g. stats panel or floating info strips on the sides of the CommitteeGrid and HeroSection sections)
- Implement a client-side light/dark mode toggle accessible from the main navigation bar, persisted to localStorage
- Add a `CertificateGenerator` component that renders a downloadable PNG/canvas certificate of volunteer contribution, shown after successful application submission

## Capabilities

### New Capabilities
- `theme-toggle`: Light/dark mode toggle with localStorage persistence and CSS variable theming
- `certificate-generator`: Canvas-based downloadable volunteer certificate of contribution shown on the application success screen

### Modified Capabilities
- `ui-ux-intelligence`: Typography scale increased and lateral fill improvements across HeroSection, CommitteeGrid, RulesSection, and VolunteerPortalClient layout

## Impact

- `app/globals.css`: Add light-mode CSS variable overrides, scrollbar theming, body background/text transitions
- `app/layout.tsx`: Remove hardcoded `dark` class; inject `ThemeProvider` or use a script to set initial theme from localStorage
- `components/volunteer/VolunteerPortalClient.tsx`: Add theme toggle button to nav; pass `isDark` state to children if needed
- `components/volunteer/HeroSection.tsx`: Bump text sizes; add lateral floating decorative panels
- `components/volunteer/CommitteeGrid.tsx`: Bump text sizes; add side accents
- `components/volunteer/RulesSection.tsx`: Bump text sizes
- `components/volunteer/VolunteerForm.tsx`: Add certificate download button in success view
- `components/volunteer/CertificateGenerator.tsx` [NEW]: Canvas-based certificate component
- No new dependencies required (HTML5 Canvas API)

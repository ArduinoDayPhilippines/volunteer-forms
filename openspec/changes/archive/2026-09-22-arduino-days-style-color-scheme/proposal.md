## Why

The current portal styling uses generic dark-mode blues and generic accents that do not reflect the authentic, recognizable brand identity of Arduino Days. To align with the official community presence seen at [days.arduino.cc/about/](https://days.arduino.cc/about/), the application must adopt the official Arduino Days 2026 design system: distinctive Arduino Teal, vibrant Arduino Orange, clean Charcoal typography, crisp technical tag pills, modular pillar cards, and authentic light/dark themes without artificial AI-slop visual effects.

## What Changes

- **Official Color Palette Tokens**:
  - Primary Brand Accent: Arduino Teal (`#00979D`, hover `#008184`, subtle surface `rgba(0, 151, 157, 0.08)` / `rgba(0, 151, 157, 0.15)`).
  - Secondary Brand Accent: Arduino Orange (`#F26727`, hover `#D95318`).
  - Text & Neutrals: Charcoal Black (`#1E2529` / `#2C353A`), Neutral Gray (`#869299` / `#A5B2B8`), Light Surface (`#F7F9FA` / `#FFFFFF`), and crisp 1px borders (`#DAE3E3` in light mode, `#2E383E` in dark mode).
- **Typography & Technical Badge Accents**:
  - Clean, legible geometric body copy paired with technical monospace accents (Roboto Mono / JetBrains Mono) for status pills, dates, step numbers, and badge indicators.
- **Card & Layout Architecture**:
  - Adopt Arduino Days modular pillar-card aesthetics with solid backgrounds, 1px borders, generous padding, and high-contrast typography.
  - Apply clean, solid flat buttons with high-contrast text and crisp hover micro-transitions, eliminating all radial neon halos and fuzzy glow effects.
- **Unified Light & Dark Theme Cohesion**:
  - Consistent theming across Header, HeroSection, CommitteeGrid, RulesSection, VolunteerRegistrationForm, CertificateGenerator, and Login modal/portal.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `ui-ux-intelligence`: Update visual design, color tokens, typography, and component styling requirements to strictly conform to the official Arduino Days brand identity (https://days.arduino.cc/about/).

## Impact

- **Affected Files**:
  - `app/globals.css`: Core design tokens, CSS variables (`--color-primary`, `--color-accent`, etc.), border colors, and theme rules.
  - `components/layout/Header.tsx`: Brand badge, navigation links, and theme toggle styling.
  - `components/volunteer/HeroSection.tsx`: Headline badges, primary/secondary action buttons, and event date pill tags.
  - `components/volunteer/CommitteeGrid.tsx`: Committee card borders, hover states, role badges, and iconography accents.
  - `components/volunteer/RulesSection.tsx`: Rule cards, numbered step indicators, and callout containers.
  - `components/volunteer/VolunteerRegistrationForm.tsx`: Form input borders, focus rings, progress bar, and submit controls.
  - `components/volunteer/CertificateGenerator.tsx`: Certificate preview canvas/borders, download button, and input styling.
  - `components/volunteer/VolunteerPortalClient.tsx`: Login modal, portal cards, and action buttons.

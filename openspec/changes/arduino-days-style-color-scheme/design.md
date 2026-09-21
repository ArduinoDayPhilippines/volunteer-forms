## Context

See `proposal.md` for motivation. Currently, the portal features a mix of legacy Tailwind slate blues, outdated `#00979c` hex values, and remnants of AI-slop electric cyan (`#00e5ff`). Additionally, certain components still hold hardcoded dark backgrounds (`bg-slate-950`) and borders (`border-slate-800`), resulting in inconsistent rendering when light mode is selected. The target aesthetic is the official [Arduino Days](https://days.arduino.cc/about/) design language, characterized by crisp 1px borders (`#DAE3E3` in light, `#2E383E` in dark), deep Charcoal (`#2C353A` / `#1E2529`), authentic Arduino Teal (`#00979D`), vibrant Arduino Orange (`#F26727`), and clean technical monospace tag badges.

## Goals / Non-Goals

**Goals:**
- Unify all CSS variables in `app/globals.css` to match the exact Arduino Days color palette and token definitions.
- Eliminate all references to electric cyan (`#00e5ff`) and arbitrary slate blues in favor of Arduino Teal (`#00979D`), Arduino Orange (`#F26727`), and Charcoal slate tokens.
- Standardize cards across `HeroSection`, `CommitteeGrid`, `RulesSection`, `VolunteerForm`, `CertificateGenerator`, and `VolunteerPortalClient` to mirror the modular pillar card style from `days.arduino.cc`.
- Ensure flawless theme switching between Light Mode (clean off-white `#F7F9FA`, white cards `#FFFFFF`, crisp `#DAE3E3` borders) and Dark Mode (deep Charcoal `#13181B`, card `#1E2529`, borders `#2E383E`).
- Ensure the canvas rendering in `CertificateGenerator.tsx` adopts the official Arduino Days Teal and Orange palette.

**Non-Goals:**
- Rewriting form validation logic or changing phone number handling.
- Modifying database schemas or server action payloads.
- Altering core routing or navigation hierarchies.

## Decisions

### Decision 1: Token Architecture in `app/globals.css`
- **Choice**: Replace generic blues with official Arduino Days tokens:
  - `--brand-teal`: `#00979D` (hover: `#008184`, surface: `rgba(0, 151, 157, 0.08)`)
  - `--brand-orange`: `#F26727` (hover: `#D95318`, surface: `rgba(242, 103, 39, 0.1)`)
  - Light mode: `--bg-base: #F7F9FA`, `--bg-card: #FFFFFF`, `--border-base: #DAE3E3`, `--text-primary: #2C353A`, `--text-secondary: #4A575D`, `--text-muted: #869299`.
  - Dark mode: `--bg-base: #13181B`, `--bg-card: #1E2529`, `--border-base: #2E383E`, `--text-primary: #F7F9FA`, `--text-secondary: #D1DBDF`, `--text-muted: #869299`.
- **Rationale**: Replicates the exact DOM styles inspectable on `days.arduino.cc/about/`. Ensures WCAG AAA contrast in both light and dark themes.
- **Alternatives Considered**: Retaining Tailwind's generic `slate` palette was rejected because it causes a cold, generic AI-generated feel rather than an authentic Arduino brand presence.

### Decision 2: Modular Pillar Card Architecture
- **Choice**: Structure cards with 1px solid borders (`var(--border-base)`), 8px to 16px radius, flat background (`var(--bg-card)`), and subtle hover state (border shifts to `var(--brand-teal)`, no fuzzy drop shadows or neon blurs).
- **Rationale**: Directly reflects the "Pillar" components from `days.arduino.cc/about/` ("A Community-Driven Celebration", "Why We Celebrate", etc.).
- **Alternatives Considered**: Floating glassmorphism cards with heavy drop shadows were rejected as AI slop.

### Decision 3: Typography & Technical Tag Badges
- **Choice**: Pair clean body sans with monospace accents (`font-mono`) for event callout tags, committee numbering (e.g. `// 01. COMMITTEE DIRECTORY`), and registration status pills. Use solid teal or orange badge containers with 1px border.
- **Rationale**: Evokes Arduino's microcontroller and engineering heritage without visual clutter.

### Decision 4: Form Input Tokens Replacement
- **Choice**: Replace all hardcoded `border-slate-800` and `bg-slate-950` in `VolunteerForm.tsx` with dynamic CSS variable references: `var(--form-bg)`, `var(--form-border)`, `var(--form-border-focus)`.
- **Rationale**: Resolves visual defects in light mode where inputs retained hardcoded dark background and border colors.

## Risks / Trade-offs

- **[Risk]**: Form input elements might lose contrast against white background in light mode.
  → **Mitigation**: Specify high-contrast border `#DAE3E3` and text `#2C353A`, with active focus ring in Arduino Teal `#00979D`.
- **[Risk]**: Canvas certificate generator colors might look dull without neon gradients.
  → **Mitigation**: Use rich, deep slate gradients (`#0E1418` to `#1E2529`) paired with crisp Arduino Teal `#00979D` and vibrant Arduino Orange `#F26727` borders, corner accents, and stamp seal.

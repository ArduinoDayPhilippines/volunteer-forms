## Context

The current volunteer portal is rendered through `components/volunteer/VolunteerPortalClient.tsx` featuring `HeroSection.tsx`, `CommitteeGrid.tsx`, `RulesSection.tsx`, and `VolunteerForm.tsx`. It uses official Arduino Days design tokens established in `app/globals.css` (`--bg-base`, `--bg-card`, `--border-base`, `--brand-teal`, `--brand-orange`, `--text-primary`). 

Attendees and prospective volunteers need authentic event context and answers to logistical questions, as previously provided on the official website ([arduinodayphilippines.cc](https://www.arduinodayphilippines.cc/)).

## Goals / Non-Goals

**Goals:**
- Implement `components/volunteer/AboutSection.tsx` containing authentic copy from `#about`, 3 pillar cards (Community, Build, Learn), and Asia Pacific College venue information with map embed.
- Implement `components/volunteer/FaqSection.tsx` with all 8 verified questions and answers from `#faqs` in an accessible, responsive accordion component.
- Integrate `#about` and `#faqs` anchors into `VolunteerPortalClient.tsx` navigation bar and mobile drawer.
- Guarantee strict visual cohesion with the Arduino Days design token system across both light and dark themes.

**Non-Goals:**
- Modifying volunteer database schemas, submission server actions, or registration endpoints.
- Introducing heavy 3rd-party UI libraries for accordions (e.g., Radix/Headless UI); native React state and semantic HTML buttons provide optimal performance and zero bundle bloat.

## Decisions

### 1. Dedicated Modular Components
- **Choice**: Create `components/volunteer/AboutSection.tsx` and `components/volunteer/FaqSection.tsx` as dedicated components.
- **Rationale**: Keeps `VolunteerPortalClient.tsx` clean, improves readability, and allows independent visual testing.
- **Alternatives Considered**: Inlining all markup directly into `VolunteerPortalClient.tsx` (rejected: adds over 400 lines to the portal client file).

### 2. Lightweight Accessible Accordion Engine
- **Choice**: Implement an accessible accordion using standard React state (`activeId` or `Set<number>`), `<button>` elements with `aria-expanded` and `aria-controls`, and CSS grid transition (`grid-template-rows: 0fr` to `1fr`) for fluid expand/collapse.
- **Rationale**: Zero external package dependencies, instant hydration, and screen-reader compliant.
- **Alternatives Considered**: Radix UI Accordion (rejected: adds unnecessary dependencies).

### 3. Faithful Content Alignment with Arduino Days Styling
- **Choice**: Retain the exact verified text from `https://www.arduinodayphilippines.cc/` while rendering cards with Arduino Days design tokens (`--bg-card`, crisp 1px borders `--border-base`, `--brand-teal` `#00979D` accents, and technical pill badges) instead of legacy dark glassmorphism.
- **Rationale**: Ensures the content is 100% authentic to ADPH while the aesthetics harmonize with the official Arduino Days 2026 design system.
- **Alternatives Considered**: Copying the legacy Tailwind classes directly (rejected: would clash with light mode and new Arduino Days tokens).

### 4. Venue Card with Lazy-Loaded Map Embed
- **Choice**: Include an APC venue card in `AboutSection.tsx` with a lazy-loaded Google Maps embed (`loading="lazy"`), address text, event date (March 21, 2026), and door open time (8:00 AM).
- **Rationale**: Gives attendees immediate logistical clarity without degrading initial page load times.

## Risks / Trade-offs

- **[Risk] Map embed slows down initial page load** → **Mitigation**: Use `loading="lazy"` and `referrerPolicy="no-referrer-when-downgrade"` on the iframe so map resources do not compete with critical rendering path assets.
- **[Risk] Accordion layout shifting on mobile** → **Mitigation**: Smooth CSS transitions on height/grid rows with overflow hidden, ensuring no abrupt page jumps.
- **[Risk] Fixed header obscures section titles when jumping to anchors** → **Mitigation**: Apply `scroll-mt-24` on `#about` and `#faqs` container elements.

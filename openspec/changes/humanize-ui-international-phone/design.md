## Context

See `proposal.md → Why` for motivation. The portal's current visual layout and copywriting rely heavily on classic AI generation patterns:
- Floating neon cyan/orange radial blur blobs (`blur-3xl`) that serve no purpose
- Pulsating decorative badges with sparkles icons (`animate-pulse`)
- Rainbow text gradients (`bg-gradient-to-r from-[#00e5ff] via-[#00979c] to-[#e47128]`)
- Detached, floating stats panels that feel like generic SaaS template components
- Fluffy AI copywriting ("Build the Future of...", "Find the Team Where You Belong", "Be the driving force behind the largest...", "Hands-on Hardware")
- Phone field error copy and placeholders explicitly suggesting Philippine numbers (`09XX` / `+63`), confusing international applicants

## Goals / Non-Goals

**Goals:**
- Provide full, unrestricted international phone number validation accepting valid formats worldwide with country codes
- Remove all AI slop visual artifacts (blur orbs, pulse badges, rainbow gradients) from `HeroSection`, `VolunteerPortalClient`, `login/page.tsx`, etc.
- Implement an authentic, human-crafted Arduino event aesthetic: crisp technical grid lines, authentic Arduino Teal (`#00979C`), high contrast typography, and structured content cards
- Rewrite landing page, hero, and committee copy using the newly installed `no-ai-slop` skill principles: direct, specific, factual, and human
- Replace the floating stats cards with a grounded event brief strip (Date, Location, Format, Shifts)
- Maintain full dark mode and light mode responsiveness and token compatibility

**Non-Goals:**
- Changing database schema or backend submission actions
- Removing the multi-step form workflow or certificate generator
- Altering the centralized `/login` authentication flow

## Decisions

### D1: Universal International Phone Validation & Guidance
**Chosen:**
- Retain the flexible E.164-compatible regex `/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,19}$/` that accepts standard international formats with country codes.
- Replace all error messages with: `"Please enter a valid phone number with country code (e.g. +1 555 123 4567 or +63 917 123 4567)"`.
- Update input placeholders to: `+1 555 123 4567 or +63 917 123 4567`.
- Add clear field helper text: `"Include your international country code (e.g. +1, +44, +81, +63)."`.

### D2: Visual De-slopping (Authentic Arduino Aesthetic)
**Chosen:**
- Remove all `blur-3xl` background glow circles from `HeroSection.tsx`, `VolunteerPortalClient.tsx`, and `app/login/page.tsx`.
- Remove `animate-pulse` and `Sparkles` icon from badges. Replace with a crisp, technical header tag: `[ ARDUINO DAY 2026 // VOLUNTEER REGISTRATION ]` with monospace accent.
- Remove rainbow text gradient. Use solid, high-contrast typography with authentic Arduino Teal (`#00979c`) for emphasis.
- Remove the floating side stats panel. Replace it with an integrated, structured **Event Brief** card or horizontal fact strip containing real event specifics (Date, Venue, Shift Options, Requirements).
- Replace the 3 generic feature cards ("Hands-on Hardware", etc.) with practical, concrete "What Volunteers Receive" (Official commemorative shirt, meals during shifts, verified certificate of participation, and access to workshops).

### D3: Copy De-slopping (`no-ai-slop` principles)
**Chosen:**
- Apply the rules from `.agents/skills/no-ai-slop/SKILL.md`:
  - Cut throat-clearing, binary contrasts, and importance puffery ("stands as a testament", "vital role", "driving force", "game changer", "build the future").
  - Hero headline: *"Volunteer for Arduino Day Philippines 2026"*.
  - Hero subhead: *"Join the community team organizing the annual open-source hardware and maker gathering in Metro Manila. Shifts are available across technical operations, attendee registration, stage management, and workshops."*.
  - Committee section headline: *"Committees & Roles"* with subtitle *"Choose the committee that matches your skills and interests."*.
  - Rules section: Direct, respectful community expectations without dramatic fluff.

## Risks / Trade-offs

- **[Risk] Visual density feels more restrained compared to splashy AI templates:**  
  → *Mitigation:* The authentic, clean Arduino aesthetic (technical precision, crisp borders, high contrast) conveys professional credibility, competence, and trustworthiness far better than generic AI templates.
- **[Risk] Users expecting PH-only shorthand (e.g. typing just 917xxxxxxx without 0 or +63):**  
  → *Mitigation:* The regex allows numbers starting with 0, +, or digits between 7 and 20 chars, and the helper text explicitly shows examples with country codes.

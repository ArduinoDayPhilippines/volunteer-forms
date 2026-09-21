## Context

The repository contains hardcoded strings referencing "2026" across metadata, titles, hero copy, about sections, FAQs, canvas certificates, CSV exporters, and organizer seed scripts. To prepare for the upcoming edition, all references must cleanly transition to **2027** without breaking layout alignment or export naming conventions.

## Goals / Non-Goals

**Goals:**
- Systematically update all user-facing strings, headers, badges, FAQs, and metadata from 2026 to 2027.
- Update HTML5 canvas certificate generator year watermark and title text to 2027.
- Update CSV download prefix in organizer client to `adph-2027-volunteers`.
- Ensure Next.js builds with 0 errors and all UI elements maintain intended visual balance.

**Non-Goals:**
- Modifying form schemas or database column names.
- Changing committee rosters or eligibility criteria.
- Altering the event location/venue (remains TBA Metro Manila).

## Decisions

- **Decision 1: Event Date string in Hero and About**:
  - Keep the day as March 2027 (e.g. "March 2027" or "Sunday, March 21, 2027"), ensuring consistency between `HeroSection.tsx` and `AboutSection.tsx`.
- **Decision 2: Certificate Generator year text**:
  - In `CertificateGenerator.tsx`, update the top-right year stamp `ctx.fillText('2027', ...)` and title `ctx.fillText('Arduino Day Philippines 2027', ...)` and bottom ribbon text `'ARDUINO DAY PHILIPPINES · VOLUNTEER RECOGNITION · 2027'`.
- **Decision 3: Export naming**:
  - Keep the CSV export prefix unified as `adph-2027-volunteers` across both `lib/utils/csv-export.ts` and `OrganizerDashboardClient.tsx`.

## Risks / Trade-offs

- [Risk]: Stale references in FAQs or links leading to 404s.
  → Mitigation: Verify all internal and external link URLs (e.g. partnership bit.ly link updated or noted).

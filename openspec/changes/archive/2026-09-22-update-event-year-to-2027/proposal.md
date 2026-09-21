## Why

The event branding, page titles, certificate generator, and copy across the volunteer portal currently reference "2026", but the upcoming event is scheduled for **2027** ("Arduino Day Philippines 2027"). Updating all year references ensures accurate event communication, correct volunteer credentials, and official brand alignment.

## What Changes

- **Metadata & Layout**:
  - Update page title and description in [`app/layout.tsx`](file:///e:/adph/volunteer-forms/app/layout.tsx) from 2026 to 2027.
- **Volunteer Landing Page & Navigation**:
  - In [`components/volunteer/VolunteerPortalClient.tsx`](file:///e:/adph/volunteer-forms/components/volunteer/VolunteerPortalClient.tsx), update navbar badge text ("Volunteer Portal 2027"), image alt texts, and footer branding to 2027.
  - In [`components/volunteer/HeroSection.tsx`](file:///e:/adph/volunteer-forms/components/volunteer/HeroSection.tsx), update header technical pill, headline, and event date pill to 2027.
  - In [`components/volunteer/AboutSection.tsx`](file:///e:/adph/volunteer-forms/components/volunteer/AboutSection.tsx), update venue announcement pending card event date to 2027.
  - In [`components/volunteer/FaqSection.tsx`](file:///e:/adph/volunteer-forms/components/volunteer/FaqSection.tsx), update all questions, answers, and external links (partnership form link) referencing 2026 to 2027.
  - In [`components/volunteer/VolunteerForm.tsx`](file:///e:/adph/volunteer-forms/components/volunteer/VolunteerForm.tsx), update submission success banner and confirmation text to 2027.
- **Certificate Generator & Exports**:
  - In [`components/volunteer/CertificateGenerator.tsx`](file:///e:/adph/volunteer-forms/components/volunteer/CertificateGenerator.tsx), update canvas year stamp, title string ("Arduino Day Philippines 2027"), and bottom ribbon text.
  - In [`lib/utils/csv-export.ts`](file:///e:/adph/volunteer-forms/lib/utils/csv-export.ts) and [`components/organizer/OrganizerDashboardClient.tsx`](file:///e:/adph/volunteer-forms/components/organizer/OrganizerDashboardClient.tsx), update CSV filename prefix and export identifiers to `adph-2027-volunteers`.
- **Seed Scripts**:
  - In [`scripts/seed-organizer.mjs`](file:///e:/adph/volunteer-forms/scripts/seed-organizer.mjs), update demo password/comment to 2027.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `certificate-generator`: Update the certificate generation requirement and scenarios to mandate "Arduino Day Philippines 2027" and year 2027 watermark.
- `ui-ux-intelligence`: Update header branding, technical pill, and navigation tokens to reference Arduino Day Philippines 2027.

## Impact

- **UI Components**: `app/layout.tsx`, `HeroSection.tsx`, `AboutSection.tsx`, `FaqSection.tsx`, `VolunteerPortalClient.tsx`, `VolunteerForm.tsx`, `CertificateGenerator.tsx`, `OrganizerDashboardClient.tsx`.
- **Utilities & Scripts**: `lib/utils/csv-export.ts`, `scripts/seed-organizer.mjs`.
- **Specs**: `openspec/specs/certificate-generator/spec.md`, `openspec/specs/ui-ux-intelligence/spec.md`.

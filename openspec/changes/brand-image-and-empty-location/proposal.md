## Why

The volunteer portal currently displays a placeholder `<Cpu>` icon in the navigation header and footer instead of authentic event branding, and displays specific venue details (Asia Pacific College) that should not be published yet. Replacing the icon placeholder with the official Arduino Days 2026 Philippines logo asset and keeping the event location empty / "To Be Announced" (TBA) ensures brand authenticity while preventing premature disclosure of unconfirmed venue logistics.

## What Changes

- **Official Brand Logo Integration**:
  - Install the uploaded official Arduino Days 2026 Philippines logo (`media_1790027046324.png`) as a public asset at `public/images/adph-logo.png`.
  - Replace the generic `<Cpu>` placeholder icon in [`VolunteerPortalClient.tsx`](file:///e:/adph/volunteer-forms/components/volunteer/VolunteerPortalClient.tsx) (header and footer) with Next.js `<Image>` displaying the official brand logo.
  - Optionally feature the brand mark in the [`HeroSection.tsx`](file:///e:/adph/volunteer-forms/components/volunteer/HeroSection.tsx) for enhanced community identity.
- **Location Empty / TBA Placeholder**:
  - In [`components/volunteer/AboutSection.tsx`](file:///e:/adph/volunteer-forms/components/volunteer/AboutSection.tsx), remove the hardcoded Asia Pacific College address details and the Google Maps iframe embed.
  - Replace the venue card with an unannounced venue placeholder indicating that venue partnerships and location will be announced soon ("Venue & Location: To Be Announced / Metro Manila").
  - In [`components/volunteer/HeroSection.tsx`](file:///e:/adph/volunteer-forms/components/volunteer/HeroSection.tsx), update `EVENT_FACTS` location value to "TBA (Metro Manila)".
  - In [`components/volunteer/FaqSection.tsx`](file:///e:/adph/volunteer-forms/components/volunteer/FaqSection.tsx), update Question 2 ("When and where is the event?") to specify date (March 21, 2026) while noting that the physical venue in Metro Manila will be revealed in upcoming announcements.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `ui-ux-intelligence`: Update header branding requirements to use the official Arduino Days 2026 Philippines image asset instead of icon placeholders, and adjust venue requirements to keep the location empty / TBA.

## Impact

- **Assets**: New image file `public/images/adph-logo.png`.
- **Components Affected**:
  - `components/volunteer/VolunteerPortalClient.tsx` (header & footer logo)
  - `components/volunteer/AboutSection.tsx` (remove APC map and address; show TBA state)
  - `components/volunteer/HeroSection.tsx` (update location fact to TBA)
  - `components/volunteer/FaqSection.tsx` (update venue answer to TBA)

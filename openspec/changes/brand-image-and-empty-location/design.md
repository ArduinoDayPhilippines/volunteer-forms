## Context

Currently, the portal header and footer in `VolunteerPortalClient.tsx` display a generic `<Cpu>` icon inside a teal square. Additionally, `AboutSection.tsx`, `HeroSection.tsx`, and `FaqSection.tsx` mention a specific institutional venue ("Asia Pacific College") with a live Google Maps embed. The user has provided the official event banner/mark (`media_1790027046324.png`) and instructed that the brand image be used instead of the CPU icon, and the venue location should be kept empty / to be announced for now.

## Goals / Non-Goals

**Goals:**
- Copy the uploaded official logo asset to `public/images/adph-logo.png`.
- Replace the `<Cpu>` icon in `VolunteerPortalClient.tsx` header and footer with Next.js `<Image>` using the official logo asset.
- Refactor `AboutSection.tsx` to remove the Asia Pacific College address and Google Maps iframe embed, replacing it with a clean "Location: To Be Announced" card.
- Update `HeroSection.tsx` and `FaqSection.tsx` location references to "To Be Announced (Metro Manila)".

**Non-Goals:**
- Altering the committee roles, application forms, or certificate generator logic.
- Removing the date (Saturday, March 21, 2026) which remains confirmed.

## Decisions

### 1. Asset Placement & Next.js `<Image>` Integration
- **Choice**: Store the asset at `public/images/adph-logo.png` and render using `next/image` with `width={180}` and `height={48}` and `className="h-9 w-auto object-contain"`.
- **Rationale**: Next.js optimizes static images automatically without layout shift, and `object-contain` preserves the crisp resolution of the infinity logo.
- **Alternatives Considered**: Direct `<img>` tag without Next.js optimization (rejected: Next.js `<Image>` provides automatic webp/avif generation and lazy loading).

### 2. Location Placeholder Treatment
- **Choice**: Replace the Google Maps card in `AboutSection.tsx` with a refined "Venue Announcement Pending" card featuring a subtle countdown/sparkles pill, event date (March 21, 2026), and a note that venue announcements will be revealed via official social channels.
- **Rationale**: Avoids empty blank space or broken maps while maintaining transparent communication with volunteers.

## Risks / Trade-offs

- **[Risk] Image background color clashing with light/dark header** → **Mitigation**: Ensure container background styling supports the banner with appropriate border or padding, and test against both light and dark themes.

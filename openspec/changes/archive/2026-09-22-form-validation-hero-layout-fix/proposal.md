## Why

QA testing and live browser testing have revealed multiple issues across the application:
1. The floating stats panel in `HeroSection` overlaps the main headline text at desktop widths just above the `lg:` breakpoint (1024px–1279px), obscuring the word "Philippines".
2. The multi-step volunteer form's per-step validation for phone number fields only checks character length (`trim().length < 7`) — applicants can type any arbitrary text (e.g., "asdfasdf") and advance to the next step, bypassing the requirement for a real contact number.
3. The organizer login page (`app/organizer/login/page.tsx`) explicitly displays hardcoded demo credentials ("Authorized Organizer Access: organizer@arduinoday.ph / ArduinoDay2026!") in a public card on the login screen.
4. Having an isolated "Organizer Login" entry point and branding creates a fragmented experience rather than a clean, centralized "Sign In" portal for all community members (volunteers and organizers alike).

## What Changes

- **Phone number format validation (client-side)** — Add regex-based telephone format enforcement to `validateStep(1)` (applicant phone) and `validateStep(4)` (emergency contact phone) in `VolunteerForm.tsx`, preventing non-numeric strings from advancing through the form.
- **Phone number validation (server-side)** — Tighten the Zod schema in `lib/validations/volunteer.ts` with `.regex()` constraints for `phone` and `emergencyContactPhone` to ensure server-side parity.
- **Hero section layout fix** — Restructure `HeroSection.tsx` from absolute positioning (`absolute right-0 top-8`) to a responsive two-column grid layout at `lg:` breakpoints, preventing the stats panel from ever overlapping the headline.
- **Centralized login portal (`/login`)** — Create a clean, unified sign-in page at `/login` for all users. Remove the separate organizer-specific login branding and replace it with a universal "Sign In" experience.
- **Remove hardcoded credentials display** — Completely remove the "Authorized Organizer Access" demo credentials card from the login UI so sensitive access details are never exposed.
- **Role-based redirection** — Authenticated organizers signing in through `/login` are routed to `/organizer`. Unauthenticated visits to `/organizer` redirect to `/login`. Any legacy visits to `/organizer/login` redirect cleanly to `/login`.
- **Navigation links updated** — Change navbar, mobile menu, hero CTA, and footer links from "Organizer Login" / "Organizer Portal" to a clean "Sign In" / "Login" link pointing to `/login`.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `volunteer-registration`: Phone fields (`phone` and `emergencyContactPhone`) require valid telephone format (numeric/E.164 regex) client-side and server-side before step advancement or form submission.
- `ui-ux-intelligence`: Hero section responsive layout prevents stats panel overlap; navigation links updated to neutral "Sign In"; centralized login page styled with design system tokens and light/dark theme compatibility.
- `organizer-management`: Login experience transitions from organizer-specific page to a centralized `/login` portal; demo credentials card removed from the UI; unauthenticated redirects point to `/login`.

## Impact

- `lib/validations/volunteer.ts` — Add `PHONE_REGEX` and apply `.regex()` rules to `phone` and `emergencyContactPhone`.
- `components/volunteer/VolunteerForm.tsx` — Add phone regex checks in `validateStep(1)` and `validateStep(4)`.
- `components/volunteer/HeroSection.tsx` — Two-column responsive layout without absolute positioning; change secondary CTA button to "Sign In" -> `/login`.
- `components/volunteer/VolunteerPortalClient.tsx` — Update navbar link, mobile dropdown link, and footer link from "Organizer Login" to "Sign In" -> `/login`.
- `app/login/page.tsx` — New centralized login page without credentials card.
- `app/organizer/login/page.tsx` — Redirect to `/login` for backward compatibility.
- `app/actions/organizer-actions.ts` — Authentication redirection aligned with `/login` and `/organizer`.
- `app/organizer/page.tsx` — Unauthenticated redirect updated to `/login`.

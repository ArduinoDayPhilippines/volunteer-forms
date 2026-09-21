## 1. Universal International Phone Validation

- [x] 1.1 In `lib/validations/volunteer.ts`, update the validation error strings on `phone` and `emergencyContactPhone` to `"Please enter a valid phone number with country code (e.g. +1 555 123 4567 or +63 917 123 4567)"`, removing any Philippine-only phrasing. Verify with node: invalid input produces the updated international error message.
- [x] 1.2 In `components/volunteer/VolunteerForm.tsx`, update `validateStep(1)` and `validateStep(4)` error messages to match the international message. Update the input placeholders on both phone inputs to `"+1 555 123 4567 or +63 917 123 4567"`, and add helper text: `"Include your country code for international numbers."`. Verify: international numbers (e.g., `+1 202 555 0123`, `+44 7911 123456`, `+63 917 123 4567`) advance without error.

## 2. Visual De-slopping (Remove AI Visual Tropes)

- [x] 2.1 In `components/volunteer/HeroSection.tsx`, remove all background `blur-3xl` gradient blobs, eliminate the pulsating sparkles badge (`animate-pulse`), remove the rainbow gradient text span (`bg-gradient-to-r ... bg-clip-text text-transparent`), and remove the floating absolute/grid stats panel. Verify in browser: hero renders with crisp, solid background and authentic high-contrast typography without neon blur halos.
- [x] 2.2 In `components/volunteer/VolunteerPortalClient.tsx` and `app/login/page.tsx`, remove the oversized radial blur glow divs (`w-[1000px] h-[600px] bg-[#00979c]/10 blur-[140px]` and `w-[700px] h-[500px] blur-3xl`). Verify: surfaces maintain clean, intentional dark/light theme tokens without muddy radial overlays.

## 3. Human-Crafted Arduino Brand Redesign & Copy De-slopping

- [x] 3.1 In `components/volunteer/HeroSection.tsx`, implement a grounded, human-crafted Arduino event hero layout:
  - Header badge: Clean technical pill `[ ARDUINO DAY PHILIPPINES 2026 // VOLUNTEER REGISTRATION ]` with monospace accent.
  - Headline & subhead: Direct, authentic copy adhering to `no-ai-slop` guidelines ("Volunteer for Arduino Day Philippines 2026" / "Join the team organizing the annual open-source hardware and maker gathering in Metro Manila...").
  - Grounded Event Brief card: Clean, structured fact grid displaying Event Date (`March 21, 2026`), Location (`Metro Manila`), Format (`In-Person & Hybrid Broadcast`), and Shift Options (`Morning, Afternoon, Full Day`).
  - Practical Volunteer Perks: Clear, honest breakdown of what volunteers receive (Official shirt, meals during shift, verified certificate, workshop access).
  Verify: Hero displays cleanly and responsively across mobile (375px), tablet (768px), and desktop (1024px+).
- [x] 3.2 In `components/volunteer/CommitteeGrid.tsx` and `components/volunteer/RulesSection.tsx`, rewrite section headers and copy using `no-ai-slop` principles—cutting filler phrases and importance puffery ("Find the Team Where You Belong", "vital role", "highest impact", "safe, collaborative community") in favor of direct, helpful committee descriptions and conduct standards. Verify: sections read like a genuine, human-run open-source event.

## 4. Verification & Production Build

- [x] 4.1 Run `npm run build` and ensure the Next.js production build completes with exit code 0 and zero TypeScript or lint errors. Verify that all routes (`/`, `/login`, `/organizer`) generate successfully.

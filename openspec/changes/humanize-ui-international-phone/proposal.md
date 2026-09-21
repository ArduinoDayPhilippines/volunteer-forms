## Why

The current volunteer portal exhibits two noticeable issues:
1. Phone number validation and error messaging explicitly reference and bias toward Philippine numbers (`09XX` / `+63`), inadvertently discouraging or confusing international applicants, exchange students, and overseas mentors who wish to register for Arduino Day Philippines.
2. The visual interface suffers from ubiquitous "AI slop" aesthetics — oversized neon radial blur blobs, pulsating badges with sparkles, rainbow gradient text clips, and disconnected floating stat boxes that make the site feel like a generic AI-generated template rather than an authentic, human-crafted community maker event.

## What Changes

- **Universal International Phone Number Support** — Remove the Philippine-only bias (`09XX` / `+63`) from validation error copy, helper text, and placeholders. Fully support valid international telephone formats worldwide (standard E.164 with international dial code `+` and 7–20 digits), with clear placeholder guidance (`+1 555 123 4567, +63 917 123 4567`) on both `phone` (Step 1) and `emergencyContactPhone` (Step 4).
- **Remove AI Slop Visual Elements** — Eliminate decorative clichés: remove giant blurred glow spheres (`blur-3xl`), pulsating sparkles badges (`animate-pulse`), and rainbow gradient text spans.
- **Human-Crafted Arduino Brand Aesthetic** — Introduce an authentic, grounded maker aesthetic inspired by official Arduino hardware and documentation: crisp 1px borders, subtle technical grid lines, high-contrast readable typography, authentic Arduino Teal (`#00979C`) and neutral slate surfaces.
- **Authentic, Direct Copy & Real Event Structure** — Replace generic AI marketing buzzwords ("Build the Future...", "Find the Team Where You Belong", "500+ Makers") with authentic, practical event details: clear schedule, role descriptions, logistics, and honest volunteer expectations.
- **Cohesive, Integrated Information Hierarchy** — Convert detached floating widgets into grounded, structured layout blocks (such as a clean event fact sheet bar or technical specifications row) that feel natural on desktop and mobile.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `volunteer-registration`: Phone number validation requirements update to universally support and guide international formats from any country, removing PH-specific error copy.
- `ui-ux-intelligence`: Visual design and branding requirements update to remove AI-generated visual clichés (glowing blur orbs, pulse badges, rainbow text) and establish an authentic, human-crafted Arduino event design system.

## Impact

- `lib/validations/volunteer.ts` — Update validation error messages on `phone` and `emergencyContactPhone` to international wording.
- `components/volunteer/VolunteerForm.tsx` — Update client-side validation error messages, input placeholders, and helper text for international numbers.
- `components/volunteer/HeroSection.tsx` — Remove blur blobs, pulse badge, rainbow gradients, and floating stats; implement grounded, human-crafted Arduino event hero.
- `components/volunteer/VolunteerPortalClient.tsx` — Clean background styling, remove artificial glow overlays, refine navigation and spacing.
- `components/volunteer/CommitteeGrid.tsx` — Refine section header copy and card presentation for authentic craftsmanship.
- `components/volunteer/RulesSection.tsx` — Refine badge and section copy to sound grounded and community-driven.
- `app/login/page.tsx` — Remove background blur blobs, align with clean Arduino aesthetic.

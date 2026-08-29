## Why

Arduino Day Philippines requires a modern, dedicated volunteer recruitment and management system. Prospective volunteers need a clear landing page that communicates event rules, committee responsibilities, and expectations before applying. Organizers require an authenticated dashboard to review incoming applicants, filter by committee assignments, and make approval/rejection decisions efficiently. Additionally, to ensure high-quality, accessible UI/UX and smooth future maintenance, the workspace needs the `ui-ux-pro-max` design intelligence skill and Supabase integration configured for Antigravity.

## What Changes

- **Landing Page & Volunteer Rules**: Create an engaging event landing page presenting Arduino Day Philippines background, committee expectations, rules/Code of Conduct acknowledgment, and an "Apply Now" entry point.
- **Volunteer Application Form**: Build a multi-step, accessible volunteer application form collecting applicant details, primary/secondary committee choices, hardware/maker experience, and t-shirt sizing, with robust client/server validation.
- **Supabase Backend & Security**: Implement database tables (`committees`, `volunteer_applications`), Row Level Security (RLS) policies allowing public submission and restricted organizer management, and server action queries.
- **Organizer Authentication & Review Portal**: Build a protected `/admin` or `/organizer` dashboard with Supabase Auth, committee filter tabs, search, detailed applicant inspection drawer, and instant approve/reject status actions.
- **Antigravity Design Intelligence Skill**: Install and configure the `ui-ux-pro-max` skill inside `.agents/skills/ui-ux-pro-max/` so Antigravity can guide UI decisions with its 79 styles, 192 palettes, and 119 UX guidelines.

## Capabilities

### New Capabilities
- `volunteer-registration`: Covers the public landing page, rules disclosure and acknowledgment, multi-step application submission, and confirmation feedback.
- `organizer-management`: Covers organizer authentication, committee-filtered applicant dashboard, review drawer, status management (approve/reject/waitlist), and application exports.
- `ui-ux-intelligence`: Covers the installation of `ui-ux-pro-max` and Antigravity styling rules to guarantee accessible, branded, responsive interfaces.

### Modified Capabilities
<!-- None. This is a greenfield project setup without pre-existing specs. -->

## Impact

- **Frontend**: Next.js 16 App Router (`app/`), React 19 Server Actions, Tailwind CSS v4 styling.
- **Backend/Database**: Supabase PostgreSQL tables, RLS policies, and `@supabase/ssr` client/server utilities.
- **Antigravity Customizations**: `.agents/skills/ui-ux-pro-max/` with full searchable dataset and Python search script.
- **Environment**: `.env.local` configured with active Supabase project credentials.

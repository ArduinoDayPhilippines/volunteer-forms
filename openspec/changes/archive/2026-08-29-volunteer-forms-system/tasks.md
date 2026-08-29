## 1. Antigravity Intelligence & Skills Setup

- [x] 1.1 Download and assemble the complete `ui-ux-pro-max` skill inside `.agents/skills/ui-ux-pro-max/` (`SKILL.md`, `scripts/search.py`, `data/`, `references/`) and verify `python .agents/skills/ui-ux-pro-max/scripts/search.py "forms" --domain ux` executes successfully
- [x] 1.2 Add Antigravity project rules under `.agents/rules/` for Next.js 16 + React 19 Supabase SSR conventions and Arduino Day PH theme tokens

## 2. Database Schema & Supabase Configuration

- [x] 2.1 Apply PostgreSQL schema migration via the Supabase MCP (`execute_sql`) creating `committees` and `volunteer_applications` with RLS policies, and verify tables exist via MCP `list_tables`
- [x] 2.2 Install project dependencies (`@supabase/supabase-js`, `@supabase/ssr`, `zod`, `lucide-react`) and verify installation succeeds
- [x] 2.3 Implement Supabase client and server utilities (`lib/supabase/client.ts`, `lib/supabase/server.ts`) and volunteer Zod validation schemas (`lib/validations/volunteer.ts`)

## 3. Public Landing Page & Volunteer Form

- [x] 3.1 Build the Arduino Day Philippines landing page with hero banner, committee responsibilities, and rules/Code of Conduct disclosure in `app/page.tsx`
- [x] 3.2 Build the multi-step volunteer application form component with committee selection, hardware experience checklist, availability, t-shirt sizing, and rules acknowledgment
- [x] 3.3 Implement the application submission server action (`app/actions/submit-application.ts`) with duplicate email checks and confirmation state display

## 4. Authenticated Organizer Dashboard

- [x] 4.1 Implement organizer login page (`app/organizer/login/page.tsx`) and session protection using Supabase Auth
- [x] 4.2 Build the organizer dashboard overview (`app/organizer/page.tsx`) with summary metric counters and committee filter tabs
- [x] 4.3 Implement the applicant review table and detail inspection drawer with instant [Approve] and [Reject] server action triggers
- [x] 4.4 Implement CSV export utility for filtered volunteer application lists and verify generated file output

## 5. End-to-End Verification & UI Polish

- [x] 5.1 Perform full end-to-end verification: submit a new volunteer application, review in organizer dashboard, filter by committee, approve applicant, and confirm live Supabase status
- [x] 5.2 Validate responsive styling on mobile (375px) and desktop viewports, ensuring zero horizontal overflow and high-contrast accessible focus rings

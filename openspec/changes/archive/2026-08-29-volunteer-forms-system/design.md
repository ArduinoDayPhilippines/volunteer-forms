## Context

The repository is a Next.js 16 (React 19) project configured with Tailwind CSS v4. A remote Supabase project (`jwdlqmeqktsmfdnvrsyd`) has been created, and the Antigravity Supabase MCP is configured and verified. See `proposal.md` for project motivation and high-level requirements.

## Goals / Non-Goals

**Goals:**
- Provide a clean, branded landing page showcasing Arduino Day Philippines committees and rules.
- Implement an accessible, progressive multi-step volunteer registration form with client/server validation.
- Secure the backend with PostgreSQL Row Level Security (RLS) allowing public inserts and authenticated organizer reviews.
- Create an authenticated organizer dashboard supporting committee-level filtering, search, status review (approve/reject), and CSV export.
- Install the `ui-ux-pro-max` intelligence skill and supporting Antigravity rules to maintain design excellence and UX consistency.

**Non-Goals:**
- Automated email dispatch service integration (e.g. Resend/SendGrid) in this initial phase; confirmation and status notifications will be presented in-app and can be wired to webhooks later.
- Public applicant status tracking portals (applicants will see their confirmation receipt ID upon submission).

## Decisions

### Decision 1: Next.js 16 App Router with React 19 Server Actions & `@supabase/ssr`
- **Choice**: Use Next.js App Router server actions for form submissions and organizer status updates, integrated with `@supabase/ssr` to maintain secure cookie sessions.
- **Alternatives Considered**: Dedicated API routes (`/api/volunteer`, `/api/review`). Server actions simplify progressive enhancement, co-locate validation logic, and reduce boilerplate.

### Decision 2: Supabase Schema & Row Level Security (RLS)
- **Choice**: Create `committees` and `volunteer_applications` tables in the `public` schema with explicit RLS:
  - `committees`: Public read.
  - `volunteer_applications`: Public insert (with `agreed_to_rules = true` constraint); `SELECT` and `UPDATE` restricted to authenticated organizers.
- **Alternatives Considered**: Open API without RLS. Rejected due to sensitivity of volunteer contact and personal data.

### Decision 3: Form State & Validation with Zod
- **Choice**: Define a centralized Zod schema (`lib/validations/volunteer.ts`) reused across both the client-side form steps and the server action handler to ensure strict data integrity.
- **Alternatives Considered**: HTML5 validation alone. Rejected because complex rules (e.g. phone formats, array of skills, committee IDs) require consistent server-side enforcement.

### Decision 4: UI Architecture with Tailwind CSS v4 & Arduino Teal Branding
- **Choice**: Build a clean component hierarchy with Tailwind CSS v4:
  - Brand accents: Arduino Teal (`#00979c`), maker slate dark backgrounds, high-contrast typography, and accessible button/field focus rings.
  - Icons via `lucide-react` for committees, actions, and status badges.
- **Alternatives Considered**: Heavy external component libraries (e.g., MUI). Rejected in favor of lightweight, custom Tailwind components aligned with project rules.

### Decision 5: Antigravity Integration for `ui-ux-pro-max`
- **Choice**: Place the complete skill bundle under `.agents/skills/ui-ux-pro-max/` (`SKILL.md`, `scripts/search.py`, `data/`, `references/`).
- **Rationale**: Project-scoped skills in `.agents/skills/` are automatically discovered by Antigravity, version-controlled with the repository, and immediately available for all team members.

## Risks / Trade-offs

- **[Risk] Unseeded Supabase Database** &rarr; *Mitigation*: Run SQL migrations via the live Supabase MCP tool (`execute_sql`) before deploying the application code.
- **[Risk] Multiple submissions with the same email** &rarr; *Mitigation*: Unique database constraint on `email` combined with user-friendly error feedback in the server action.
- **[Risk] Missing organizer account in Supabase Auth** &rarr; *Mitigation*: Provide instructions or a quick seed script for the organizer admin account during verification.

## Migration Plan

1. Run database migration on Supabase using MCP (`execute_sql`): create tables, seed committees, configure RLS.
2. Install dependencies (`@supabase/supabase-js`, `@supabase/ssr`, `zod`, `lucide-react`).
3. Download and assemble `ui-ux-pro-max` skill into `.agents/skills/ui-ux-pro-max/`.
4. Implement shared Supabase clients and validation schemas (`lib/supabase/`, `lib/validations/`).
5. Implement the landing page, rules modal, and application form (`app/page.tsx`, `components/volunteer/`).
6. Implement organizer authentication and review dashboard (`app/organizer/`, `components/organizer/`).
7. Test end-to-end flow from submission to organizer committee filtering and approval.

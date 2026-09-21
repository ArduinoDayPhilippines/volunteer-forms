## Context

See `proposal.md → Why` for motivation. The relevant current state:

- `VolunteerForm.tsx → validateStep(1)` checks phone length only (`trim().length < 7`), no regex — any non-numeric string passes
- `VolunteerForm.tsx → validateStep(4)` has the same gap for `emergencyContactPhone`
- `lib/validations/volunteer.ts` Zod schema: both phone fields use `.min(7).max(25)` with no format constraint
- `HeroSection.tsx` positions the stats panel with `absolute right-0 top-8` inside a `relative` container that is `text-center`; at 1024px–1280px the panel physically occupies space that the headline text flows into
- `app/organizer/login/page.tsx` is specifically titled "Organizer Sign In" and contains an explicit, hardcoded credentials card ("Authorized Organizer Access: organizer@arduinoday.ph / ArduinoDay2026!") in the UI
- Navbar, mobile drawer, hero CTA, and footer link specifically to `/organizer` labeled "Organizer Login" or "Organizer Portal"

## Goals / Non-Goals

**Goals:**
- Block non-numeric strings and invalid phone formats from advancing past step 1 and step 4 of the volunteer application form
- Align Zod server-side rules with the new client-side regex so there is zero gap between client and server validation
- Fix the floating stats panel overlap by converting the hero section to a responsive two-column grid at `lg:` viewports
- Replace the organizer-specific login page with a centralized, neutral `/login` page for all users (volunteers and organizers)
- Remove the hardcoded credentials display card completely from the login UI
- Maintain backward compatibility: redirect `/organizer/login` to `/login`
- Update all public navigation links to a neutral "Sign In" pointing to `/login`
- Support dark/light mode tokens across the centralized `/login` page

**Non-Goals:**
- Implementing a separate volunteer portal dashboard view (out of scope for this change; existing registration flow remains)
- Replacing Supabase Auth or changing database auth configuration
- Full international telco phone validation library integration (a lightweight regex covering Philippine mobile and E.164 formats is sufficient)

## Decisions

### D1: Phone regex pattern
**Chosen:** `/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,19}$/`  
This pattern accepts:
- Philippine mobile: `09171234567`, `0917 123 4567`
- International: `+639171234567`, `+63 917 123 4567`
- General: `(02) 8123-4567` (landlines)
Rejects:
- Pure alphabetical strings (`"asdfasdf"`, `"abcdef"`)
- Special character junk (`"???@@@"`)

**Error message copy:** `"Please enter a valid phone number (e.g. 09XX XXX XXXX or +63 XXX XXX XXXX)"`

### D2: Hero layout fix approach
**Chosen:** Replace `absolute right-0 top-8` positioning with an `lg:grid lg:grid-cols-[1fr_180px] lg:items-start lg:gap-6` two-column layout wrapping the entire hero content area. The left column contains the centered content (badge, headline, subtitle, metadata tags, CTA buttons, value props). The right column holds the stats panel.
- To provide ample breathing room at exactly 1024px, reduce the headline size on `lg:` from `lg:text-7xl` to `lg:text-6xl`.

### D3: Centralized `/login` architecture & credentials removal
**Chosen:**
1. Create `app/login/page.tsx` as the canonical sign-in page for all users.
2. The UI displays clean, neutral branding: "Sign In", "Access your Arduino Day Philippines account", generic email and password inputs, and a "Sign In" submit button.
3. Remove the entire "Authorized Organizer Access" demo credentials card from the UI.
4. Server action: authenticate via Supabase Auth `signInWithPassword`. Once authenticated, redirect organizers to `/organizer`.
5. Ensure the `/login` page adheres to CSS custom properties (`var(--bg-card)`, `var(--text-primary)`, `var(--border-base)`) for full dark and light mode support.

### D4: Routing, redirects, and navigation links
**Chosen:**
- `app/organizer/login/page.tsx`: Replace page content with an immediate redirect to `/login`.
- `app/organizer/page.tsx`: Redirect unauthenticated users to `/login` (instead of `/organizer/login`).
- `VolunteerPortalClient.tsx`:
  - Desktop nav link: change text from "Organizer Login" to "Sign In", href to `/login`.
  - Mobile dropdown link: change text to "Sign In →", href to `/login`.
  - Footer link: change text from "Organizer Portal" to "Sign In", href to `/login`.
- `HeroSection.tsx`:
  - Secondary CTA: change label from "Organizer Portal" to "Sign In", href to `/login`.

## Risks / Trade-offs

- **[Risk] Bookmarked `/organizer/login` URLs by existing users/testers:**  
  → *Mitigation:* `app/organizer/login/page.tsx` will issue a Next.js `redirect('/login')` so old links seamlessly resolve to the centralized login page.
- **[Risk] Testers unaware of organizer credentials after UI card removal:**  
  → *Mitigation:* Organizer credentials remain securely stored in environment/seed files (`scripts/seed-organizer.mjs`) and are provided directly in the proposal documentation and chat communication for development/QA verification.
- **[Risk] Two-column grid width tightness at 1024px:**  
  → *Mitigation:* Adjust headline font size at `lg:` to `text-6xl`, ensuring no line breaks or awkward wrap issues occur next to the 180px stats column.

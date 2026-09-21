## 1. Phone Number Validation — Zod Schema

- [x] 1.1 In `lib/validations/volunteer.ts`, define a `PHONE_REGEX` constant: `/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,19}$/`. Add `.regex(PHONE_REGEX, 'Please enter a valid phone number (e.g. 09XX XXX XXXX or +63 XXX XXX XXXX)')` to the `phone` field chain after `.min(7)`. Verify: running `npx tsx -e "import {volunteerApplicationSchema as s} from './lib/validations/volunteer'; console.log(s.safeParse({phone:'asdfasdf'}).error)"` produces a validation error on `phone`; with `phone: '09171234567'` it does not.
- [x] 1.2 Apply the same `PHONE_REGEX` `.regex()` rule to the `emergencyContactPhone` field in `lib/validations/volunteer.ts`. Verify: running the schema check with `emergencyContactPhone: 'notanumber'` fails, while `emergencyContactPhone: '+639171234567'` passes.

## 2. Phone Number Validation — Client-Side `validateStep`

- [x] 2.1 In `components/volunteer/VolunteerForm.tsx`, define `PHONE_REGEX` and update the `step === 1` validation block in `validateStep` to verify that `formData.phone` matches the regex, setting the error message `"Please enter a valid phone number (e.g. 09XX XXX XXXX or +63 XXX XXX XXXX)"` if invalid. Verify in browser: entering `"asdfasdf"` into the phone field and clicking "Next Step" keeps the user on Step 1 and renders the inline error.
- [x] 2.2 In `components/volunteer/VolunteerForm.tsx`, update the `step === 4` validation block in `validateStep` to enforce `PHONE_REGEX` on `formData.emergencyContactPhone`. Verify in browser: typing invalid characters into emergency contact phone and attempting to submit flags an inline error and halts submission.

## 3. Hero Section Layout Overlap Fix

- [x] 3.1 In `components/volunteer/HeroSection.tsx`, restructure the inner layout wrapper from `<div className="flex flex-col items-center text-center lg:relative">` to `<div className="lg:grid lg:grid-cols-[1fr_180px] lg:items-start lg:gap-6">`. Place the centered content in a column container, and render `<aside>` for stats as a grid column child with `hidden lg:flex flex-col gap-3 pt-8 w-44 shrink-0` (removing `absolute right-0 top-8`). Verify: at 1024px to 1279px viewport widths, the stats panel appears beside the headline without covering any text.
- [x] 3.2 In `components/volunteer/HeroSection.tsx`, adjust the `<h1>` headline class from `text-4xl sm:text-6xl lg:text-7xl` to `text-4xl sm:text-6xl lg:text-6xl` to maintain clean proportional scaling beside the stats column at 1024px width. Verify: headline displays legibly without overflow or odd wrapping at 1024px.

## 4. Centralized Login Portal & Credentials Card Removal

- [x] 4.1 Create `app/login/page.tsx` implementing the centralized sign-in portal. Present a neutral, modern card with title "Sign In", description "Access your Arduino Day Philippines account", email input, password input, and submit button. Do NOT render the demo credentials info card. Use CSS variables (`var(--bg-card)`, `var(--text-primary)`, `var(--border-base)`) for dark and light theme consistency. Verify: navigating to `http://localhost:3000/login` displays the clean sign-in screen without any exposed organizer credentials.
- [x] 4.2 In `app/actions/organizer-actions.ts`, update `loginOrganizer` to redirect successful logins to `/organizer` (or role-appropriate destination) and ensure error messages remain generic and friendly. Verify: signing in with `organizer@arduinoday.ph` and `ArduinoDay2026!` redirects to `/organizer`.
- [x] 4.3 In `app/organizer/login/page.tsx`, replace the page implementation with a server redirect to `/login` to preserve backward compatibility for old bookmarks. Verify: navigating to `/organizer/login` immediately redirects to `/login`.
- [x] 4.4 In `app/organizer/page.tsx`, update the unauthenticated redirect target from `/organizer/login` to `/login`. Verify: visiting `/organizer` without an active session redirects to `/login`.

## 5. Navigation & CTA Links Update

- [x] 5.1 In `components/volunteer/VolunteerPortalClient.tsx`, update the desktop header button, mobile drawer link, and footer link from "Organizer Login" / "Organizer Portal" to "Sign In" with `href="/login"`. Verify: clicking "Sign In" in the header or footer navigates to `/login`.
- [x] 5.2 In `components/volunteer/HeroSection.tsx`, update the secondary CTA button from "Organizer Portal" to "Sign In" with `href="/login"`. Verify: clicking the hero button navigates to `/login`.

## 6. Verification & Build

- [x] 6.1 Run `npm run build` and ensure the Next.js production build completes with exit code 0 and zero TypeScript or ESLint errors across all routes (`/`, `/login`, `/organizer`, `/organizer/login`).

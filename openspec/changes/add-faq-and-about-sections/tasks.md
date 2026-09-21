## 1. About Section Component

- [x] 1.1 Create `components/volunteer/AboutSection.tsx` with "About the day" technical pill badge, section heading "What is Arduino Day Philippines?", and the authentic introductory copy from the previous website. Verify component renders semantic typography with Arduino Days styling tokens.
- [x] 1.2 Implement the three community pillar cards (Community, Build, Learn) with crisp 1px borders, subtle hover transitions, and technical focus tags. Verify cards render responsively across mobile (1 column) and desktop (3 columns).
- [x] 1.3 Implement the Asia Pacific College venue logistics card with address details, event date (March 21, 2026), doors open time (8:00 AM), and a lazy-loaded Google Maps iframe embed. Verify map and location cards render cleanly without layout shifts in both light and dark modes.

## 2. FAQ Section Component

- [x] 2.1 Create `components/volunteer/FaqSection.tsx` containing the 8 verified questions and answers from `https://www.arduinodayphilippines.cc/#faqs` structured cleanly as typed constants. Verify all question texts, links, and email contacts match the previous website archive.
- [x] 2.2 Implement the accessible accordion interaction using React state, `<button>` triggers with `aria-expanded` / `aria-controls`, and smooth CSS grid height transitions. Verify clicking an item expands the answer and toggles chevron icon rotation cleanly.
- [x] 2.3 Style FAQ accordion cards using Arduino Days design tokens (`--bg-card`, `--border-base`, `--brand-teal`, `--text-primary`) with minimum 44px touch target heights and high-contrast keyboard focus rings. Verify readability and contrast in both light and dark modes.

## 3. Portal Integration & Navigation

- [x] 3.1 Update `components/volunteer/VolunteerPortalClient.tsx` top navigation bar and mobile drawer to add "About" (`#about`) and "FAQ" (`#faqs`) navigation links. Verify links render cleanly alongside existing navigation items.
- [x] 3.2 Mount `<AboutSection />` and `<FaqSection />` into `components/volunteer/VolunteerPortalClient.tsx` within the main landing page flow with `scroll-mt-24` top scroll margins. Verify clicking anchor links scrolls smoothly to target sections without header overlap.

## 4. Integration Testing & Verification

- [x] 4.1 Run `npm run build` and verify that Next.js compiles with 0 TypeScript and lint errors.
- [x] 4.2 Run `openspec validate add-faq-and-about-sections --json` and verify that all change artifacts pass OpenSpec schema validation.

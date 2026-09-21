## 1. Landing Page & Metadata Updates

- [x] 1.1 Update `app/layout.tsx` metadata (title and description) to reference "Arduino Day Philippines 2027". Verify page title updates in browser tab.
- [x] 1.2 Update `components/volunteer/VolunteerPortalClient.tsx` top navbar badge text, footer brand text, and image alt tags to "Arduino Day Philippines 2027" / "Volunteer Portal 2027". Verify header and footer render cleanly.
- [x] 1.3 Update `components/volunteer/HeroSection.tsx` technical pill, headline, and date stat pill to 2027. Verify hero section renders without layout shifts.
- [x] 1.4 Update `components/volunteer/AboutSection.tsx` venue announcement pending card event date to 2027. Verify date reflects 2027.
- [x] 1.5 Update `components/volunteer/FaqSection.tsx` copy and links to 2027. Verify FAQ accordion questions and answers render properly.
- [x] 1.6 Update `components/volunteer/VolunteerForm.tsx` submission success confirmation text to 2027. Verify submission feedback screen mentions 2027.

## 2. Certificate Generator & Export Updates

- [x] 2.1 Update `components/volunteer/CertificateGenerator.tsx` canvas year watermark, event title, and bottom ribbon text to 2027. Verify downloaded certificate renders "2027".
- [x] 2.2 Update `lib/utils/csv-export.ts` and `components/organizer/OrganizerDashboardClient.tsx` default filename prefix to `adph-2027-volunteers`. Verify CSV download names.

## 3. Verification & Build

- [x] 3.1 Run `npm run build` and verify that the Next.js application compiles cleanly with 0 errors.
- [x] 3.2 Run `openspec validate update-event-year-to-2027 --json` and verify that all change artifacts satisfy the OpenSpec schema.

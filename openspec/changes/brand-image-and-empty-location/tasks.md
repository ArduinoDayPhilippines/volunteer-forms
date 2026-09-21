## 1. Asset Setup

- [x] 1.1 Copy the uploaded official image `media_1790027046324.png` to `public/images/adph-logo.png`. Verify the target file exists and is accessible.

## 2. Component Brand Logo Updates

- [x] 2.1 Update `components/volunteer/VolunteerPortalClient.tsx` top navigation bar to replace the placeholder `<Cpu>` icon with Next.js `<Image src="/images/adph-logo.png" ... />`. Verify the official logo renders with crisp proportions in the header across mobile and desktop.
- [x] 2.2 Update `components/volunteer/VolunteerPortalClient.tsx` footer to replace the `<Cpu>` icon with `<Image src="/images/adph-logo.png" ... />`. Verify footer logo displays cleanly in both light and dark modes.

## 3. Location Placeholder Updates

- [x] 3.1 Refactor `components/volunteer/AboutSection.tsx` to remove the Asia Pacific College address and Google Maps iframe embed, replacing them with a refined "Location: To Be Announced (Metro Manila)" card. Verify map iframe is completely removed and no institutional names are shown.
- [x] 3.2 Update `components/volunteer/HeroSection.tsx` `EVENT_FACTS` location value to "TBA (Metro Manila)". Verify event facts panel displays the updated text.
- [x] 3.3 Update `components/volunteer/FaqSection.tsx` Question 2 answer to remove Asia Pacific College and specify that the physical venue in Metro Manila will be revealed in upcoming announcements. Verify FAQ question renders the updated text.

## 4. Integration Testing & Verification

- [x] 4.1 Run `npm run build` and verify that Next.js compiles with 0 TypeScript and lint errors.
- [x] 4.2 Run `openspec validate brand-image-and-empty-location --json` and verify that all change artifacts pass OpenSpec schema validation.

## Why

The user has provided an updated 3D clay-style "Arduino Day Philippines" emblem (`media_1790027926404.png`) to use as the primary brand logo. The raw image has a solid white background, which would render as an opaque white rectangle against the portal's dark mode navbar and theme surfaces. Removing the white background and defringing the edges ensures that the 3D emblem blends naturally into both light and dark themes without white outlines or halos.

## What Changes

- **Background Removal & Edge Defringing**:
  - Process the raw source image `media_1790027926404.png` using automated alpha extraction to remove the white background while preserving smooth drop shadows and anti-aliased contours.
  - Output the optimized transparent asset to `public/images/adph-logo.png` and `public/images/adph-badge-logo.png`.
- **Portal Component Presentation**:
  - Update [`components/volunteer/VolunteerPortalClient.tsx`](file:///e:/adph/volunteer-forms/components/volunteer/VolunteerPortalClient.tsx) to feature the new 3D emblem in the header navigation and footer.
  - Tune dimensions and aspect ratios (`width`, `height`, container box) so the 3D badge displays with sharp detail without distorting proportions.
- **Theme Testing**:
  - Verify edge contrast and visual blending in both Light Mode (`#FFFFFF` / `#F7F9FA`) and Dark Mode (`#13181B` / `#1E2529`).

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `ui-ux-intelligence`: Add requirements for transparent 3D badge logo rendering, background elimination, edge defringing, and multi-theme blending.

## Impact

- **Assets**: Generates transparent PNG `public/images/adph-logo.png`.
- **Components**: `components/volunteer/VolunteerPortalClient.tsx` (header & footer logo presentation).

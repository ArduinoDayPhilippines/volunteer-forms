## Context

The raw image provided (`media_1790027926404.png`) is a 500x500 3D clay-rendered badge containing the Arduino infinity symbol, "ARDUINO DAY PHILIPPINES", on a solid white background (`#FFFFFF`). To look good in both light mode and dark mode (`#13181B`), the white background must be removed with high precision, ensuring edge pixels do not produce a white fringe or halo against dark backgrounds.

## Goals / Non-Goals

**Goals:**
- Implement a background extraction and defringing utility using `sharp` to create a transparent PNG.
- Save the transparent 3D badge emblem to `public/images/adph-logo.png`.
- Update `VolunteerPortalClient.tsx` header and footer logo presentation to support the badge's square/shield aspect ratio (`w-11 h-11` or `w-12 h-12`).
- Verify edge smoothness and contrast across both Light and Dark themes.

**Non-Goals:**
- Manually altering the 3D geometry or text within the image itself.

## Decisions

### 1. Alpha Extraction & Defringing with Sharp
- **Choice**: Extract raw RGBA pixel buffer using `sharp`, compute color distance from the white background, apply smooth alpha ramp for anti-aliased edges, and defringe near-white border pixels.
- **Rationale**: Eliminates the "white halo" that typically plagues naive white-removal algorithms when viewed against dark mode surfaces.

### 2. Badge Dimensioning in Header & Footer
- **Choice**: The 3D emblem is a vertical shield/badge (approx 1:1 aspect ratio), unlike the previous horizontal banner. Adjust the header container in `VolunteerPortalClient.tsx` from wide rectangle (`w-36 h-10`) to square badge dimensions (`w-11 h-11` or `w-12 h-12`), paired with the title text beside it.
- **Rationale**: Keeps the 3D emblem large enough to be clearly legible and tactile while preserving clean navbar alignment.

## Risks / Trade-offs

- **[Risk] White fringing on dark backgrounds** → **Mitigation**: Edge defringing script specifically clamps RGB values on semi-transparent border pixels to blend with the badge's outer teal border.

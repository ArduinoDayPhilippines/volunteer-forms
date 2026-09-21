## Context

See `proposal.md` - Why.
The 3D clay badge logo in the hero is rendered inside a dynamic CSS perspective container at up to 320px x 320px (`xl:w-80 xl:h-80`). Currently, `public/images/adph-logo.png` is 500x500 pixels, and Next.js `<Image>` uses `sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 320px"`. On high-DPI displays (DPR 2x and 3x), browsers upscale the downscaled bitmap, resulting in visible softness and blurriness.

## Goals / Non-Goals

**Goals:**
- Provide a high-resolution, ultra-crisp transparent PNG asset (1024x1024) for `adph-logo.png` and `adph-badge-logo.png`.
- Reconfigure Next.js `<Image>` component attributes in `HeroSection.tsx` with high-density `sizes` (`(max-width: 640px) 320px, (max-width: 1024px) 640px, 1024px`) and `quality={95}`.
- Preserve 100% alpha transparency with clean anti-aliasing against both light and dark mode surfaces.

**Non-Goals:**
- Altering the 3D perspective mouse-tracking mathematics or auto-rotation speeds.
- Changing navbar or footer logos (which remain crisp compact badges).

## Decisions

- **Decision 1: High-Resolution 1024x1024 Transparent Master Asset**:
  - *Rationale*: A 1024x1024 master image provides 3.2x pixel density for 320px containers, exceeding the requirements of 2x and 3x Retina viewports while keeping file size efficient (<400 KB PNG/WebP).
  - *Alternatives considered*: SVG vector conversion. Rejected because the authentic 3D clay badge uses complex volumetric depth lighting, shadows, and smooth clay textures that would lose fidelity or inflate DOM node counts in raw SVG.
- **Decision 2: Next.js Responsive Sizing Matrix**:
  - *Rationale*: Updating `sizes` to `(max-width: 640px) 320px, (max-width: 1024px) 640px, 1024px` instructs Next.js image optimization to generate srcset variants suitable for DPR 2x and 3x devices without downsampling.

## Risks / Trade-offs

- [Risk]: Higher resolution PNG asset increases payload slightly.
  → Mitigation: Optimize with `sharp` PNG compression level 9 and let Next.js automatically generate AVIF/WebP srcset variants during runtime.

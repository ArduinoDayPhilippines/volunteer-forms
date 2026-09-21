## Why

The 3D clay badge emblem in the hero section currently appears blurry, particularly on high-DPI (Retina) mobile screens, laptops, and 4K displays. This blurriness occurs because the source raster asset is low-resolution (500x500 pixels) and the Next.js `<Image>` component specifies a conservative `sizes` attribute that restricts downsampled output sizes, leading to visible scaling blur and softened edges when stretched in the 320px 3D perspective hero wrapper.

## What Changes

- Ingest/generate a high-resolution, ultra-crisp 1024x1024 (or 2048x2048) transparent PNG asset for `public/images/adph-logo.png` and `public/images/adph-badge-logo.png` with smooth anti-aliased alpha contours, clean edges, and zero pixelation.
- Update Next.js `<Image>` component properties in `HeroSection.tsx` to configure high-fidelity `quality={95}`, responsive `sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, 1024px"`, and CSS contrast-preserving rendering.
- Verify that both light and dark mode surfaces display a sharp, vibrant, crystal-clear logo emblem without blur or artifacting.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `ui-ux-intelligence`: Require high-definition (≥1024px source fidelity) emblem rendering with multi-density Retina display support and anti-aliased edge clarity in the Hero section.

## Impact

- Affected code: `components/volunteer/HeroSection.tsx`
- Affected assets: `public/images/adph-logo.png`, `public/images/adph-badge-logo.png`
- Zero breaking API or runtime schema changes.

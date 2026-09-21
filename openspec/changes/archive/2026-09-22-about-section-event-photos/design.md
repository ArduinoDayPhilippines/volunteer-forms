## Context

The previous Arduino Day Philippines website featured a signature 3-photo bento grid in its About section highlighting "Community", "Build", and "Learn". The user has provided 3 authentic, high-resolution photographs from the event archives:
1. `media_1790027254330.png`: Grand stage photo of volunteers, organizers, and community members.
2. `media_1790027272238.png`: Active maker team with celebratory infinity and hand signs.
3. `media_1790027327681.png`: Classroom hands-on workshop session with instructor and workstations.

## Goals / Non-Goals

**Goals:**
- Place all 3 images in `public/images/about/` with descriptive filenames.
- Implement an authentic responsive bento photo grid in `components/volunteer/AboutSection.tsx`.
- Map each photograph directly to the 3 pillars (Community, Build, Learn) with brand-tinted gradient overlays, crisp 1px borders, and smooth hover zoom effects.
- Support both mobile (clean stacked cards with 16:9 aspect ratios) and desktop (bento grid layout with 1 feature image spanning 2 rows and 2 stacked images).

**Non-Goals:**
- Heavy lightbox modals or external carousel packages.

## Decisions

### 1. Bento Grid Architecture
- **Choice**: Implement a CSS grid with `grid-cols-1 md:grid-cols-5 md:grid-rows-[220px_220px] gap-4` where:
  - **Community**: `md:col-span-3 md:row-span-2` (prominent feature card).
  - **Build**: `md:col-span-2 md:row-span-1`.
  - **Learn**: `md:col-span-2 md:row-span-1`.
- **Rationale**: Recreates the exact authentic composition of the previous website while adapting seamlessly to modern screens.
- **Alternatives Considered**: 3 equal columns side-by-side (rejected: less dynamic and creates very tall or very cramped cards).

### 2. Next.js Image Optimization
- **Choice**: Use Next.js `<Image fill ... sizes="..." className="object-cover" />` inside relative containers.
- **Rationale**: Next.js automatically creates WebP variants, prevents layout shifts, and lazy-loads off-screen images.

## Risks / Trade-offs

- **[Risk] High-resolution source image sizes (~1MB each)** → **Mitigation**: Next.js image optimization pipeline automatically compresses and generates responsive `srcset` entries for mobile and desktop screens.

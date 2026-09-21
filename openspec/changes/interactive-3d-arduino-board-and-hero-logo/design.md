## Context

The official site `https://www.arduinodayphilippines.cc/` uses two signature interactive visual components:
1. In the hero section, the brand logo is embedded in a 3D perspective wrapper that tracks mouse movements with `perspective(600px) rotateX(...) rotateY(...)` and a glowing radial blur aura.
2. In the body/about section, a Three.js WebGL canvas loads `/models/arduino.glb` (5.38 MB binary model), providing orbit controls with inertia damping and gentle continuous auto-rotation.

## Goals / Non-Goals

**Goals:**
- Download the official `arduino.glb` model directly into `public/models/arduino.glb`.
- Install `three` and `@types/three` dependencies.
- Build `components/volunteer/HeroLogoParallax.tsx` (or integrate into `HeroSection.tsx`) with cursor-tracking perspective rotation, responsive bounds, and radial glow.
- Build `components/volunteer/ArduinoBoardCanvas.tsx` with dynamic client-side loading, WebGL anti-aliasing, OrbitControls, auto-rotation, and responsive resize listeners.
- Embed the 3D board canvas in `AboutSection.tsx` as an interactive hardware exploration centerpiece.

**Non-Goals:**
- Custom shader coding or physics simulation.
- Replacing static logos in navbar or footer (they remain compact navigation badges).

## Decisions

- **Decision 1: Direct Three.js with Dynamic Client-side Import**:
  - WebGL requires `window` and `document` APIs. `ArduinoBoardCanvas` must be a `'use client'` component, dynamically loaded with `next/dynamic` (`ssr: false`) to guarantee zero SSR hydration mismatches or build-time server crashes.
- **Decision 2: OrbitControls Configuration**:
  - `autoRotate = true`, `autoRotateSpeed = 0.8`.
  - `enableZoom = false` (or constrained min/max distance) to prevent user scroll hijacking on mobile/touch screens.
  - `enableDamping = true` with damping factor for smooth mechanical feel.
- **Decision 3: Perspective Logo Calculations**:
  - Use `(e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)` normalized coordinates.
  - Constrain `rotateX` to [-15deg, 15deg] and `rotateY` to [-15deg, 15deg] with smooth transition timing (`0.1s ease-out`).

## Risks / Trade-offs

- [Risk]: 5.38 MB GLB model download impact on initial page load.
  → Mitigation: Lazy load the 3D canvas and model only when the user scrolls near the About section or after initial hero load, displaying a sleek loading skeleton or pulse ring while downloading.
- [Risk]: WebGL unsupported or disabled on low-end devices.
  → Mitigation: Wrap canvas initialization in a WebGL capability check with graceful fallback to a high-res image.

## Why

The official Arduino Day Philippines website (`https://www.arduinodayphilippines.cc/`) features two signature interactive visual elements: a dynamic cursor-tracking 3D perspective floating logo in the hero section, and a fully interactive, auto-rotating 3D WebGL Arduino board model. Replicating both components elevates the volunteer portal with authentic physical computing aesthetic, high-engagement interaction, and parity with the official event site.

## What Changes

- **3D Asset Ingestion**:
  - Ingest the official 3D model `arduino.glb` (5.38 MB) from `https://www.arduinodayphilippines.cc/models/arduino.glb` and store it at `public/models/arduino.glb`.
- **Interactive 3D Perspective Hero Logo**:
  - In [`components/volunteer/HeroSection.tsx`](file:///e:/adph/volunteer-forms/components/volunteer/HeroSection.tsx), implement the cursor-tracking 3D perspective tilt effect (`perspective(600px) rotateX(...) rotateY(...) translateX(...) translateY(...)`) with easing and ambient radial gradient aura behind the floating logo badge.
- **Interactive 3D WebGL Arduino Board Canvas**:
  - Add `three` and `@types/three` dependencies.
  - Create [`components/volunteer/ArduinoBoardCanvas.tsx`](file:///e:/adph/volunteer-forms/components/volunteer/ArduinoBoardCanvas.tsx) utilizing Three.js `WebGLRenderer`, `GLTFLoader`, and `OrbitControls`.
  - Configure continuous ambient rotation (`autoRotateSpeed: 0.8`), inertia damping, touch/drag orbital navigation, responsive canvas resizing, and theme-adaptive scene lighting.
  - Embed the interactive board in the About Section (`AboutSection.tsx`) adjacent to the "Build & Hardware" pillar as an interactive 3D centerpiece.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `ui-ux-intelligence`: Add requirements for 3D cursor-tracking perspective parallax logo in Hero and interactive WebGL 3D hardware board visualization with responsive touch controls.

## Impact

- **Dependencies**: Adds `three` and `@types/three`.
- **Assets**: Adds `public/models/arduino.glb` (5.38 MB binary).
- **Components**:
  - `components/volunteer/HeroSection.tsx` (3D parallax floating logo).
  - `components/volunteer/ArduinoBoardCanvas.tsx` (new 3D WebGL canvas).
  - `components/volunteer/AboutSection.tsx` (embeds 3D board component).

## ADDED Requirements

### Requirement: Interactive 3D perspective parallax hero logo
The hero section SHALL feature an interactive 3D perspective floating logo element that responds fluidly to user pointer/cursor movements on desktop viewports.

#### Scenario: Pointer movement triggers dynamic perspective tilt
- **WHEN** a user moves the cursor across the hero viewport on desktop (≥1024px)
- **THEN** the logo tilts dynamically along the X and Y axes using 3D perspective (`perspective(600px)`), with gentle translation offsets and smooth CSS transitions (`transition: transform 0.1s ease-out`).

#### Scenario: Responsive mobile fallback for hero logo
- **WHEN** the hero section is viewed on mobile or tablet devices (<1024px) or on devices with `prefers-reduced-motion` enabled
- **THEN** the logo renders in a centered, static or subtle floating orientation without mouse-tracking script overhead.

### Requirement: Interactive 3D WebGL Arduino hardware board
The volunteer portal SHALL provide an interactive 3D WebGL canvas that renders the official Arduino hardware model (`arduino.glb`) with orbit controls and continuous ambient rotation.

#### Scenario: Interactive 3D board rendering and orbit controls
- **WHEN** a user views the 3D board section in the About view
- **THEN** the 3D Arduino board renders smoothly on an anti-aliased, transparent WebGL canvas with ambient rotation, allowing users to rotate and inspect the board via mouse drag or touch gestures.

#### Scenario: Responsive canvas resizing
- **WHEN** the browser window is resized
- **THEN** the 3D canvas and camera projection matrix update dynamically to maintain the model's aspect ratio and center alignment without distortion or overflow.

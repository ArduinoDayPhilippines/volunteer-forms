## MODIFIED Requirements

### Requirement: 3D badge emblem with seamless alpha transparency
The primary event logo SHALL use the transparent-background 3D Arduino Day Philippines emblem, rendering with high-resolution clarity (minimum 1024x1024 pixel source asset fidelity), smooth anti-aliased contours, crisp details on high-density (Retina/DPR ≥ 2) displays, and zero white fringing or blur against dark and light theme surfaces.

#### Scenario: Logo display in Dark Mode header
- **WHEN** the volunteer portal is viewed in dark mode
- **THEN** the 3D emblem displays in the navigation bar without a rectangular white bounding box, white halos, or jagged border pixels against the dark navbar surface.

#### Scenario: Logo display in Light Mode header
- **WHEN** the volunteer portal is viewed in light mode
- **THEN** the 3D emblem blends smoothly with the light background, maintaining vivid teal and orange colors, dimensionality, and crisp definition.

#### Scenario: High-resolution clarity in 3D hero perspective wrapper
- **WHEN** a user views the Hero section on a desktop, mobile, or high-DPI display
- **THEN** the emblem badge renders sharply at full fidelity without pixelation, compression blur, or soft scaling artifacts during perspective tilt and stationary viewing.

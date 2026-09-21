## Purpose

Integrates the UI/UX Pro Max intelligence skill into Antigravity to guide styling, accessibility, and high-impact visual design for the volunteer application.

## Requirements

### Requirement: Design intelligence skill installation
The workspace SHALL provide the complete `ui-ux-pro-max` skill package within `.agents/skills/ui-ux-pro-max/` including the search script, data matrices, and reference guides.

#### Scenario: Agent queries design intelligence
- **WHEN** an agent executes a query against the `search.py` script for palettes, styling, or form UX rules
- **THEN** the script returns verified JSON recommendations matching the query terms without crashing.

### Requirement: Arduino Day Philippines branding and responsive tokens
The user interface SHALL conform to modern high-contrast design tokens, accessible touch target sizes (minimum 44x44px), and responsive mobile-first layouts. Typography SHALL use a minimum base font size of 16px for body content, with section headings at 20px or larger on desktop, and card body text at 15px or larger to address QA-reported readability concerns. Sections with wide lateral margins (CommitteeGrid, HeroSection, RulesSection) SHALL include visually enriching lateral fill content such as floating stat panels, decorative grid patterns, or floating badge elements to reduce perceived emptiness on wide viewports.

#### Scenario: Mobile viewport responsiveness
- **WHEN** the volunteer application or organizer dashboard is viewed on a mobile viewport (375px width)
- **THEN** the layout renders without horizontal scrollbars, form controls remain easily tappable, and typography remains readable.

#### Scenario: Accessible form focus and feedback
- **WHEN** an applicant or organizer navigates using keyboard tab controls
- **THEN** all interactive form inputs and action buttons display distinct, high-contrast focus rings.

#### Scenario: Typography is large enough on desktop
- **WHEN** a user views any volunteer portal section on a desktop viewport (1024px+)
- **THEN** card body text is at minimum 15px, section paragraph text is at minimum 16px, and hero body text is at minimum 18px.

#### Scenario: Wide viewport lateral fill
- **WHEN** the site is viewed on a wide viewport (1280px+)
- **THEN** the HeroSection and CommitteeGrid sections show visual fill content in their side margins rather than blank whitespace.

### Requirement: 3D badge emblem with seamless alpha transparency
The primary event logo SHALL use the transparent-background 3D Arduino Day Philippines emblem, rendering with smooth anti-aliased contours and zero white fringing against dark and light theme surfaces.

#### Scenario: Logo display in Dark Mode header
- **WHEN** the volunteer portal is viewed in dark mode
- **THEN** the 3D emblem displays in the navigation bar without a rectangular white bounding box, white halos, or jagged border pixels against the dark navbar surface.

#### Scenario: Logo display in Light Mode header
- **WHEN** the volunteer portal is viewed in light mode
- **THEN** the 3D emblem blends smoothly with the light background, maintaining vivid teal and orange colors, dimensionality, and crisp definition.

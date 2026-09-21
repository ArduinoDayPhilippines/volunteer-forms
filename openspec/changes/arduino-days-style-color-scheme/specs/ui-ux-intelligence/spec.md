## ADDED Requirements

### Requirement: Official Arduino Days design system and color palette
The user interface SHALL implement the official Arduino Days 2026 design system as demonstrated on days.arduino.cc, featuring Arduino Teal (`#00979D`), Arduino Orange (`#F26727`), Charcoal typography (`#2C353A` / `#1E2529`), technical monospace tag pills, modular 1px solid bordered cards (`#DAE3E3` / `#2E383E`), and high-contrast flat buttons without neon glows or AI-slop visual artifacts.

#### Scenario: Theme palette rendering in light mode
- **WHEN** the user views the application in light mode
- **THEN** the background renders in crisp white or off-white (`#F7F9FA`), primary highlights and brand accents render in Arduino Teal (`#00979D`), secondary callouts render in Arduino Orange (`#F26727`), text displays in Charcoal (`#2C353A`), and cards display 1px solid borders (`#DAE3E3`).

#### Scenario: Theme palette rendering in dark mode
- **WHEN** the user toggles dark mode
- **THEN** surfaces adapt cleanly to dark slate/charcoal backgrounds (`#1E2529` / `#13181B`), primary teal accents remain high-contrast (`#00979D` / `#008184`), card borders render crisp dark charcoal borders (`#2E383E`), and text maintains WCAG AAA contrast ratios.

#### Scenario: Technical badge and pill tags
- **WHEN** event dates, committee categories, or registration status tags are rendered
- **THEN** they display as crisp pill tags with monospace typography (Roboto Mono / JetBrains Mono) with solid teal or orange badge accents and zero blur halos.

## MODIFIED Requirements

### Requirement: Arduino Day Philippines branding and responsive tokens
The user interface SHALL conform to official Arduino Days design tokens, accessible touch target sizes (minimum 44x44px), responsive mobile-first layouts, and high-contrast color pairings.

#### Scenario: Mobile viewport responsiveness
- **WHEN** the volunteer application or organizer dashboard is viewed on a mobile viewport (375px width)
- **THEN** the layout renders without horizontal scrollbars, form controls remain easily tappable, and typography remains readable.

#### Scenario: Accessible form focus and feedback
- **WHEN** an applicant or organizer navigates using keyboard tab controls
- **THEN** all interactive form inputs and action buttons display distinct, high-contrast focus rings using Arduino Teal (`#00979D`).

## MODIFIED Requirements

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

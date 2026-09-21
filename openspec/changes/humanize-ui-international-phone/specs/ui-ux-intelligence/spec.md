## MODIFIED Requirements

### Requirement: Arduino Day Philippines branding and responsive tokens
The user interface SHALL conform to modern high-contrast design tokens, accessible touch target sizes (minimum 44x44px), and responsive mobile-first layouts. The visual design and written content SHALL adhere to human-crafted, authentic Arduino aesthetic standards and No AI Slop principles: eliminating oversized blurred radial glow orbs, pulsating decorative badges, rainbow gradient text clips, and hyperbolic AI marketing copy in favor of clean technical structure, grounded typography, authentic Arduino teal branding, and clear, practical event logistics.

#### Scenario: Mobile viewport responsiveness
- **WHEN** the volunteer application or organizer dashboard is viewed on a mobile viewport (375px width)
- **THEN** the layout renders without horizontal scrollbars, form controls remain easily tappable, and typography remains readable.

#### Scenario: Accessible form focus and feedback
- **WHEN** an applicant or organizer navigates using keyboard tab controls
- **THEN** all interactive form inputs and action buttons display distinct, high-contrast focus rings.

#### Scenario: Absence of generic AI visual clichés
- **WHEN** a user navigates the landing page, form, or sign-in views
- **THEN** the page renders without decorative blur spheres (`blur-3xl`), pulsating badges (`animate-pulse`), or multicolored gradient text clips.

#### Scenario: Authentic grounded event presentation and human copy
- **WHEN** an applicant reviews the event overview, committee descriptions, and volunteer conduct guidelines
- **THEN** the copy avoids AI filler and buzzwords (such as "delve", "foster", "vital role", "driving force", "highest impact", or "build the future"), communicating direct, factual information about the event schedule, shift hours, and committee duties.

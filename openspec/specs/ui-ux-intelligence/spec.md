## Purpose

Integrates the UI/UX Pro Max intelligence skill into Antigravity to guide styling, accessibility, and high-impact visual design for the volunteer application.

## Requirements

### Requirement: Design intelligence skill installation
The workspace SHALL provide the complete `ui-ux-pro-max` skill package within `.agents/skills/ui-ux-pro-max/` including the search script, data matrices, and reference guides.

#### Scenario: Agent queries design intelligence
- **WHEN** an agent executes a query against the `search.py` script for palettes, styling, or form UX rules
- **THEN** the script returns verified JSON recommendations matching the query terms without crashing.

### Requirement: Arduino Day Philippines branding and responsive tokens
The user interface SHALL conform to modern high-contrast design tokens, accessible touch target sizes (minimum 44x44px), and responsive mobile-first layouts.

#### Scenario: Mobile viewport responsiveness
- **WHEN** the volunteer application or organizer dashboard is viewed on a mobile viewport (375px width)
- **THEN** the layout renders without horizontal scrollbars, form controls remain easily tappable, and typography remains readable.

#### Scenario: Accessible form focus and feedback
- **WHEN** an applicant or organizer navigates using keyboard tab controls
- **THEN** all interactive form inputs and action buttons display distinct, high-contrast focus rings.

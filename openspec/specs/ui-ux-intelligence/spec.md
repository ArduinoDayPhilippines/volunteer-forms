## Purpose

Integrates the UI/UX Pro Max intelligence skill into Antigravity to guide styling, accessibility, and high-impact visual design for the volunteer application.

## Requirements

### Requirement: Design intelligence skill installation
The workspace SHALL provide the complete `ui-ux-pro-max` skill package within `.agents/skills/ui-ux-pro-max/` including the search script, data matrices, and reference guides.

#### Scenario: Agent queries design intelligence
- **WHEN** an agent executes a query against the `search.py` script for palettes, styling, or form UX rules
- **THEN** the script returns verified JSON recommendations matching the query terms without crashing.

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

#### Scenario: Hero stats panel does not overlap headline at 1024px–1279px
- **WHEN** a user views the hero section at a viewport width between 1024px and 1279px (the `lg` to `xl` range)
- **THEN** the stats panel is displayed in its own column adjacent to the headline without any text overlap.

#### Scenario: Hero stats panel hidden below lg breakpoint
- **WHEN** a user views the hero section at a viewport width below 1024px
- **THEN** the stats panel is not rendered or is visually hidden, and the headline is fully legible.

#### Scenario: Neutral navigation labels
- **WHEN** a visitor navigates the landing page navbar, hero secondary CTA, mobile navigation drawer, or footer
- **THEN** the navigation links display "Sign In" (linking to `/login`) rather than role-specific "Organizer Login" or "Organizer Portal" copy.

#### Scenario: Typography is large enough on desktop
- **WHEN** a user views any volunteer portal section on a desktop viewport (1024px+)
- **THEN** card body text is at minimum 15px, section paragraph text is at minimum 16px, and hero body text is at minimum 18px.

#### Scenario: Wide viewport lateral fill
- **WHEN** the site is viewed on a wide viewport (1280px+)
- **THEN** the HeroSection and CommitteeGrid sections show visual fill content in their side margins rather than blank whitespace.

#### Scenario: Event year consistency
- **WHEN** a user navigates any page of the volunteer portal (landing, hero, about, faq, rules, and footer)
- **THEN** all brand references prominently designate the event as "Arduino Day Philippines 2027" and "Volunteer Portal 2027".

### Requirement: 3D badge emblem with seamless alpha transparency
The primary event logo SHALL use the transparent-background 3D Arduino Day Philippines emblem, rendering with smooth anti-aliased contours and zero white fringing against dark and light theme surfaces.

#### Scenario: Logo display in Dark Mode header
- **WHEN** the volunteer portal is viewed in dark mode
- **THEN** the 3D emblem displays in the navigation bar without a rectangular white bounding box, white halos, or jagged border pixels against the dark navbar surface.

#### Scenario: Logo display in Light Mode header
- **WHEN** the volunteer portal is viewed in light mode
- **THEN** the 3D emblem blends smoothly with the light background, maintaining vivid teal and orange colors, dimensionality, and crisp definition.

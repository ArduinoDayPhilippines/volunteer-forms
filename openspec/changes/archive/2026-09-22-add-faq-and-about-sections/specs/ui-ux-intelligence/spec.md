## ADDED Requirements

### Requirement: Authentic About section with pillars and venue logistics
The volunteer portal SHALL provide an About section (`#about`) that informs visitors of the event background, community values, and venue logistics based on the official Arduino Day Philippines archive.

#### Scenario: Viewing About section on landing page
- **WHEN** an attendee or prospective volunteer navigates to `#about` or scrolls past the hero section
- **THEN** the portal renders the "About the day" indicator, the authentic explanation of Arduino Day Philippines, the three community pillars (Community, Build, Learn), and the Asia Pacific College venue information.

#### Scenario: Responsive pillar display
- **WHEN** the About section is viewed on mobile (375px) or desktop viewports
- **THEN** the three pillar cards adapt fluidly without horizontal overflow or text clipping, maintaining high-contrast Arduino Days design tokens.

### Requirement: Interactive and accessible FAQ accordion
The volunteer portal SHALL provide a Frequently Asked Questions section (`#faqs`) featuring 8 verified questions and answers from the previous website in an accessible accordion interface.

#### Scenario: Expanding and collapsing an FAQ item
- **WHEN** a user clicks an FAQ question header or activates it using keyboard controls (Enter or Space)
- **THEN** the corresponding answer panel smoothly expands with `aria-expanded="true"`, and activating it again collapses the panel with `aria-expanded="false"`.

#### Scenario: Accessible touch target and typography
- **WHEN** navigating FAQ items on touch-enabled or keyboard devices
- **THEN** all question trigger buttons provide a minimum 44px touch target height, distinct focus rings on keyboard focus, and high-contrast readable text in both light and dark themes.

### Requirement: Portal navigation anchor links
The top navigation bar and mobile menu drawer SHALL include quick-jump anchor links for "About" (`#about`) and "FAQ" (`#faqs`).

#### Scenario: Navigating via top navigation links
- **WHEN** a user clicks on "About" or "FAQ" in the desktop navigation bar or mobile drawer
- **THEN** the browser scrolls smoothly to the target section with adequate top offset clearance (`scroll-mt-24`) so that the fixed header does not obstruct section headlines.

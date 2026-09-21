# theme-toggle Specification

## Purpose
Provides a client-side light/dark mode toggle that persists the user's theme preference to localStorage and applies distinct CSS variable sets for both light and dark themes across the entire volunteer portal.

## Requirements

### Requirement: Theme toggle control in navigation
The navigation SHALL include a clearly identifiable theme toggle button that switches between light and dark modes when activated.

#### Scenario: Toggle button is always visible in nav
- **WHEN** a user views the volunteer portal on any viewport size
- **THEN** a theme toggle button (sun/moon icon) is visible in the top navigation bar

#### Scenario: Toggle switches theme immediately
- **WHEN** a user clicks the theme toggle button
- **THEN** the site's color scheme switches between light and dark mode without a full page reload

### Requirement: Theme persistence across sessions
The user's theme preference SHALL be stored in localStorage and applied on every subsequent page load without flash of wrong theme (FOUT).

#### Scenario: Preference persists on reload
- **WHEN** a user selects dark mode and refreshes the page
- **THEN** the page loads in dark mode without a visible flash of light mode

#### Scenario: Default theme is dark
- **WHEN** a user visits the site for the first time with no stored preference
- **THEN** the page defaults to dark mode

### Requirement: Light mode design token set
The system SHALL apply a distinct, readable light-mode color palette when light mode is active.

#### Scenario: Light mode color contrast
- **WHEN** light mode is active
- **THEN** all text meets WCAG AA contrast ratios against light backgrounds (minimum 4.5:1 for body text)

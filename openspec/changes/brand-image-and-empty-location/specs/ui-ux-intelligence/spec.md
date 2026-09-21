## ADDED Requirements

### Requirement: Official brand image in portal header and footer
The volunteer portal header and footer SHALL display the official Arduino Days 2026 Philippines logo image asset instead of generic icon placeholders.

#### Scenario: Rendering official logo in header
- **WHEN** a user visits any page within the volunteer portal
- **THEN** the top navigation bar displays the official Arduino Days 2026 Philippines logo image with clean scaling and responsive presentation.

#### Scenario: Rendering official logo in footer
- **WHEN** a user scrolls to the footer of the portal
- **THEN** the brand block renders the official logo image alongside the event title and mission description.

### Requirement: Unannounced event location state
The volunteer portal SHALL NOT display any unconfirmed venue names, specific addresses, or interactive map embeds until official venue announcements.

#### Scenario: Viewing location in About section
- **WHEN** a user views the About section (`#about`)
- **THEN** the section displays a "Venue & Location: To Be Announced" card without specific institutional venue names or external map embeds.

#### Scenario: Viewing location in Hero facts and FAQs
- **WHEN** a user views the Hero event facts or the FAQ question regarding event date and venue
- **THEN** the location is shown as "To Be Announced (Metro Manila)" with clarification that venue details will be released in official announcements.

## Purpose

Provides a public landing page with rules disclosure and an accessible, multi-step registration form for Arduino Day Philippines prospective volunteers.

## Requirements

### Requirement: Landing page displays event details and rules
The system SHALL present an event overview for Arduino Day Philippines, detail each volunteer committee, and show explicit volunteer rules and Code of Conduct expectations before application submission.

#### Scenario: Applicant visits the volunteer portal
- **WHEN** an applicant loads the root landing page
- **THEN** the system displays event information, committee cards, volunteer expectations, and a prominent call-to-action button to begin the application.

#### Scenario: Applicant reviews rules and code of conduct
- **WHEN** the applicant views the rules section
- **THEN** the system displays required conduct guidelines and event attendance commitments that must be acknowledged before submitting the form.

### Requirement: Multi-step volunteer application submission
The system SHALL provide an interactive application form collecting applicant details, committee preferences, skills, and sizing, and require rule acknowledgment prior to submission.

#### Scenario: Valid volunteer application submission
- **WHEN** an applicant fills out full name, contact information, selects a primary committee, accepts the rules, and clicks submit
- **THEN** the system validates all required fields, creates a record with status "pending" in the database, and displays a confirmation screen with a unique application reference ID.

#### Scenario: Duplicate email prevention
- **WHEN** an applicant attempts to submit an application using an email address that has already registered
- **THEN** the system prevents creation and displays a friendly error message informing the applicant that an application for this email already exists.

#### Scenario: Incomplete form validation
- **WHEN** an applicant attempts to submit the form without completing required fields or without acknowledging the rules
- **THEN** the system blocks submission and displays inline field-level validation errors.

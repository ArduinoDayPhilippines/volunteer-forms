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
The system SHALL provide an interactive application form collecting applicant details, committee preferences, skills, and sizing, and require rule acknowledgment prior to submission. The system SHALL accept international phone numbers worldwide with standard international dial codes (`+`) or national numbers (7–20 digits), and SHALL NOT restrict, bias, or mandate Philippine-only phone formats in error messages or helper text.

#### Scenario: Valid volunteer application submission
- **WHEN** an applicant fills out full name, contact information, selects a primary committee, accepts the rules, and clicks submit
- **THEN** the system validates all required fields, creates a record with status "pending" in the database, and displays a confirmation screen with a unique application reference ID.

#### Scenario: Duplicate email prevention
- **WHEN** an applicant attempts to submit an application using an email address that has already registered
- **THEN** the system prevents creation and displays a friendly error message informing the applicant that an application for this email already exists.

#### Scenario: Incomplete form validation
- **WHEN** an applicant attempts to submit the form without completing required fields or without acknowledging the rules
- **THEN** the system blocks submission and displays inline field-level validation errors.

#### Scenario: Invalid phone number format blocked at step 1
- **WHEN** an applicant enters a value that contains no digits (e.g. "asdfasdf", "!!!", or a space-only string) in the contact phone field and clicks "Next"
- **THEN** the system blocks advancement to step 2 and displays an inline error on the phone field reading "Please enter a valid phone number (e.g. 09XX XXX XXXX or +63 XXX XXX XXXX)".

#### Scenario: Valid Philippine mobile number accepted
- **WHEN** an applicant enters "09171234567" or "+639171234567" in the contact phone field
- **THEN** the system accepts it as a valid entry and does not display a field error.

#### Scenario: Invalid emergency contact phone blocked at step 4
- **WHEN** an applicant enters a non-numeric string in the emergency contact phone field and attempts to submit from step 4
- **THEN** the system blocks submission and displays an inline error on the emergency contact phone field.

#### Scenario: Server-side phone validation enforced
- **WHEN** an application is submitted to the server action with a phone value that fails the format regex
- **THEN** the server returns a field-level validation error for `phone` and the record is not created.

#### Scenario: International phone number accepted without country restriction
- **WHEN** an applicant enters a valid international phone number from any country (such as "+1 202 555 0123", "+44 7911 123456", "+81 90 1234 5678", or "+63 917 123 4567")
- **THEN** the system accepts the number without error and permits proceeding to the next step.

#### Scenario: Universal phone validation error message
- **WHEN** an applicant enters an invalid string containing non-numeric junk into the phone or emergency contact phone field
- **THEN** the system displays a universal error message reading "Please enter a valid phone number with country code (e.g. +1 555 123 4567 or +63 917 123 4567)" without suggesting Philippine-only numbers.

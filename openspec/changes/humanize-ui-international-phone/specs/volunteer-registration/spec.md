## MODIFIED Requirements

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

#### Scenario: International phone number accepted without country restriction
- **WHEN** an applicant enters a valid international phone number from any country (such as "+1 202 555 0123", "+44 7911 123456", "+81 90 1234 5678", or "+63 917 123 4567")
- **THEN** the system accepts the number without error and permits proceeding to the next step.

#### Scenario: Universal phone validation error message
- **WHEN** an applicant enters an invalid string containing non-numeric junk into the phone or emergency contact phone field
- **THEN** the system displays a universal error message reading "Please enter a valid phone number with country code (e.g. +1 555 123 4567 or +63 917 123 4567)" without suggesting Philippine-only numbers.

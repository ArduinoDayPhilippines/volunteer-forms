## MODIFIED Requirements

### Requirement: Multi-step volunteer application submission
The system SHALL provide an interactive application form collecting applicant details, committee preferences, skills, and sizing, and require rule acknowledgment prior to submission. The form SHALL enforce format validation on all phone number fields — including the applicant's contact number and the emergency contact phone — before allowing advancement to the next step. Phone fields SHALL only accept values matching a valid numeric telephone format (Philippine mobile numbers starting with `09`, international numbers starting with `+`, or strings containing 7–20 digits with optional spaces, hyphens, and parentheses). Strings composed entirely of non-numeric characters SHALL be rejected with an inline error message at the field.

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

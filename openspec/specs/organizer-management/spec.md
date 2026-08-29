## Purpose

Enables authenticated Arduino Day Philippines event organizers to inspect, filter by committee, and approve or reject incoming volunteer applications.

## Requirements

### Requirement: Organizer authentication
The system SHALL require authenticated organizer credentials before granting access to applicant management tools.

#### Scenario: Unauthenticated access attempt
- **WHEN** a user navigates to the organizer dashboard without an active organizer session
- **THEN** the system redirects the user to the organizer login page.

#### Scenario: Successful organizer login
- **WHEN** an organizer enters valid credentials on the login page
- **THEN** the system creates an authenticated session and redirects them to the organizer dashboard.

### Requirement: Committee-filtered applicant dashboard
The system SHALL display all volunteer applications with aggregate statistics and permit filtering by committee and review status.

#### Scenario: Filter by committee
- **WHEN** an organizer selects a specific committee filter tab (such as "Technical & Audio-Visual")
- **THEN** the dashboard list updates to display only applicants whose primary or secondary committee matches the selected filter.

#### Scenario: Search applicants
- **WHEN** an organizer types an applicant's name or email into the search box
- **THEN** the dashboard filters the list in real time to show matching applicants.

### Requirement: Application status review and actions
The system SHALL allow organizers to view applicant responses and update application status to approved, rejected, or waitlist.

#### Scenario: Approve applicant
- **WHEN** an organizer reviews an applicant's details and clicks the "Approve" button
- **THEN** the system updates the application status to "approved", records reviewer metadata, and reflects the updated status immediately in the UI.

#### Scenario: Reject applicant
- **WHEN** an organizer clicks the "Reject" button with optional internal notes
- **THEN** the system updates the application status to "rejected" and persists the reviewer notes.

### Requirement: Export applications data
The system SHALL allow organizers to export filtered or complete application lists to CSV format for event logistics.

#### Scenario: Organizer triggers CSV export
- **WHEN** an organizer clicks the "Export CSV" button
- **THEN** the system generates and downloads a CSV file containing applicant contact information, committee selections, and review statuses.

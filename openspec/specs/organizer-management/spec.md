## Purpose

Enables authenticated Arduino Day Philippines event organizers to inspect, filter by committee, and approve or reject incoming volunteer applications.

## Requirements

### Requirement: Organizer authentication
The system SHALL require authenticated organizer credentials before granting access to applicant management tools, providing a centralized, neutral authentication portal at `/login` for all users rather than an organizer-branded login page. The login interface SHALL NOT display hardcoded demo credentials, account details, or authorized access guidelines. The system SHALL redirect unauthenticated attempts to access `/organizer` to `/login`, and redirect legacy `/organizer/login` traffic to `/login`. Upon successful authentication of an organizer account, the system SHALL establish a session and redirect the user to `/organizer`.

#### Scenario: Unauthenticated access attempt
- **WHEN** a user navigates to the organizer dashboard without an active organizer session
- **THEN** the system redirects the user to the centralized login page (`/login`).

#### Scenario: Successful organizer login
- **WHEN** an organizer enters valid credentials on the centralized login page (`/login`)
- **THEN** the system creates an authenticated session and redirects them to the organizer dashboard (`/organizer`).

#### Scenario: Legacy login route redirect
- **WHEN** a user navigates directly to `/organizer/login`
- **THEN** the system automatically redirects them to `/login`.

#### Scenario: Demo credentials not displayed
- **WHEN** any user loads the `/login` page
- **THEN** the page displays a clean sign-in form with email and password fields without any card, banner, or text exposing pre-filled or authorized organizer credentials.

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

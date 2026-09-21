## MODIFIED Requirements

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

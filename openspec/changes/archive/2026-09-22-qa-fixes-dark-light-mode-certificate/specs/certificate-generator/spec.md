## Purpose

Generates a downloadable PNG certificate of volunteer contribution for Arduino Day Philippines, rendered on an HTML5 canvas with the applicant's name, assigned committee, application reference ID, and event branding. Shown to the volunteer immediately after successful application submission.

## ADDED Requirements

### Requirement: Certificate download button on success screen
After successful application submission, the success confirmation view SHALL display a "Download Certificate" button that generates and downloads a certificate as a PNG image.

#### Scenario: Certificate button is shown on success
- **WHEN** a volunteer's application is successfully submitted
- **THEN** the success screen includes a "Download Certificate" button alongside the application reference ID

#### Scenario: Certificate downloads as PNG
- **WHEN** a user clicks "Download Certificate"
- **THEN** a PNG file named `volunteer-certificate-<applicantName>.png` is downloaded to the user's device

### Requirement: Certificate content accuracy
The certificate SHALL display the volunteer's full name, their primary committee name, the application reference ID, the event name "Arduino Day Philippines 2026", and the issue date.

#### Scenario: Certificate includes volunteer details
- **WHEN** the certificate is generated
- **THEN** it shows the exact full name entered in the application form, the primary committee chosen, the application ID, and the event name

### Requirement: Certificate branding
The certificate SHALL use Arduino Day Philippines brand colors (teal #00979c, cyan #00e5ff, coral #e47128) and be styled as a formal certificate of contribution suitable for printing or sharing.

#### Scenario: Certificate is visually branded
- **WHEN** the certificate PNG is viewed
- **THEN** it includes the Arduino Day Philippines logo/brand mark colors, a border frame, a title "Certificate of Volunteer Contribution", and the volunteer's name rendered prominently

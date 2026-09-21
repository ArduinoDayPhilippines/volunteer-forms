## Why

Prospective volunteers, participants, and community members need clear, accessible information regarding what Arduino Day Philippines is, its community pillars, venue logistics, and quick answers to frequently asked questions (dates, registration fee, call for speakers, partnerships, and streaming). Sourcing these sections from the authentic previous website of Arduino Day Philippines ([arduinodayphilippines.cc/#about](https://www.arduinodayphilippines.cc/#about) and [arduinodayphilippines.cc/#faqs](https://www.arduinodayphilippines.cc/#faqs)) ensures brand continuity, clear attendee expectations, and authoritative event information.

## What Changes

- **Add About Section (`#about`)**:
  - Technical pill tag indicator ("About the day") and high-contrast headline: "What is Arduino Day Philippines?".
  - Authentic descriptive copy introducing Arduino Day as a worldwide celebration of Arduino's birthday and an open-source gathering for builders and tinkerers.
  - Three pillar cards embodying the ADPH spirit:
    - **Community**: Collaboration, community-led gatherings, and sharing open-source learnings.
    - **Build**: Hands-on hardware prototyping, Arduino boards, components, and project demos.
    - **Learn**: Tech talks, speaker presentations, and interactive knowledge exchange.
  - **Venue & Logistics Highlight**: Highlighting Asia Pacific College (APC), Makati City, Metro Manila, including event date (March 21, 2026), door opening time (8:00 AM), and an embedded map/directions container.
- **Add FAQ Section (`#faqs`)**:
  - Interactive, accessible accordion component styled with official Arduino Days design tokens (`--bg-card`, `--border-base`, `--brand-teal`, `--text-primary`, crisp 1px borders).
  - Contains the 8 verified questions and answers from the previous website:
    1. *What is Arduino Day Philippines?* (Global celebration, local community-led gathering).
    2. *When and where is the event?* (March 21, 2026 at Asia Pacific College, Makati City, doors open at 8 AM).
    3. *How do I register and is it free?* (Free admission, pre-registration required for venue capacity).
    4. *What can I expect in the program?* (Community talks, project demos, showcase booths).
    5. *Can I speak or showcase a project?* (Upcoming call for speakers and exhibits).
    6. *How do I become a community or media partner?* (Partnership links & contact email).
    7. *How can I support the event?* (Sponsorship form & email contact).
    8. *Will there be online streaming?* (Hybrid setup exploration and updates).
  - Responsive multi-column layout on desktop with smooth expand/collapse animations and full keyboard navigation (`aria-expanded`, Enter/Space to toggle).
- **Navigation Integration**:
  - Update `components/volunteer/VolunteerPortalClient.tsx` to include `#about` and `#faqs` in the top navigation bar and mobile menu.
  - Smooth anchor scrolling (`scroll-mt-24`) to navigate seamlessly between sections.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `ui-ux-intelligence`: Add requirements for informational About and FAQ sections, ensuring faithful porting of content from the official previous website, Arduino Days styling token compliance, and accessible accordion interactions.

## Impact

- **New Components**:
  - `components/volunteer/AboutSection.tsx`: About narrative, 3 pillar cards, and APC venue logistics.
  - `components/volunteer/FaqSection.tsx`: Interactive FAQ accordion with search/filter or multi-column layout.
- **Modified Components**:
  - `components/volunteer/VolunteerPortalClient.tsx`: Add navigation links and render the new sections in the landing page flow.

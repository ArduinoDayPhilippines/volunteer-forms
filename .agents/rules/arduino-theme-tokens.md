# Arduino Day Philippines Theme Tokens & UI Guidelines

## Brand Colors
- **Primary Brand Teal**: `#00979c` (Arduino Teal)
  - Hover: `#008184`
  - Deep / Accent: `#006468`
  - Subtle Tint: `#00979c15` / `#e0f7f8`
- **Secondary Orange / Coral**: `#e47128`
  - Hover: `#c25816`
- **Electric Cyan (Glow / Highlights)**: `#00e5ff`
- **Dark Mode Backgrounds**:
  - Main background: `#090d16`
  - Elevated card background: `#0f172a`
  - Sub-card / Input background: `#1e293b`
  - Borders: `#334155`

## Typography & Contrast
- High-contrast body text (`#f8fafc` on dark backgrounds, `#0f172a` on light backgrounds).
- Muted helper text minimum 4.5:1 contrast ratio (`#94a3b8` on dark).

## Accessibility Standards (WCAG 2.1 AA)
- **Touch Targets**: All interactive elements (buttons, checkboxes, select inputs) must be at least 44x44px or have sufficient padding.
- **Focus Rings**: Distinct visual focus state: `focus-visible:ring-2 focus-visible:ring-[#00979c] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none`.
- **Form Validation UX**:
  - Real-time or on-blur validation.
  - Descriptive, color-assisted error messages with clear icons.
  - Required fields clearly designated.
- **Responsive Layout**: Zero horizontal overflow on mobile viewports down to 375px.

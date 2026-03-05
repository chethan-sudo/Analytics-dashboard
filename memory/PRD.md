# PRD — SignalDeck CRM Sales Dashboard

## Original Problem Statement
Build a premium CRM Sales Dashboard web application for a B2B computer hardware company, using the provided hardcoded KPI, pipeline, product, monthly trend, sales agent, sector, team, deal size, and radar-chart data. The dashboard must feel SaaS-grade, include dark/light themes, a collapsible sidebar, animated KPI counters, chart tab switching, hover states, a date range selector, strong responsive behavior, and a polished single-page experience.

## User Choices
- Frontend only
- No functional backend/API layer required
- Change the original MavenTech / CRM Pulse branding
- Use the provided spec as-is otherwise
- Later refinement request: redesign the UI toward an **editorial / luxury** direction with better toggle placement, more differentiated charts, and stronger at-a-glance executive readability
- Latest refinement request: put charts at the top with **one hero chart + supporting KPIs beside it**, upgrade typography to a **luxury serif + mono combo**, and make the dashboard feel smoother and easier to understand instantly from a user perspective

## Architecture Decisions
- Built as a single React entry page with embedded static data in `src/data/crmData.js`
- No runtime API calls, no local storage, no routing dependency in the user flow
- Recharts used for charts, Lucide for iconography, custom CSS variable theme system for dark/light styling
- Added measured chart wrappers to avoid Recharts width/height sizing warnings during responsive transitions
- Sidebar, header, KPI cards, and analytical sections are split into focused dashboard components
- Added a dedicated redesign stylesheet layer for the editorial/luxury visual system and layout refinements
- Separated chart languages across sections: area/bar charts for monthly trends, ranked revenue ladder for products, editorial funnel bands for pipeline, donut/radar for comparative views
- Added a second refinement layer to make the top fold chart-first, simplify the header, and improve readability on desktop/tablet without horizontal overflow

## What’s Implemented
- Premium branded dashboard for **Northforge Systems / SignalDeck**
- Animated dark/light theme toggle with fully designed theme tokens
- Collapsible sidebar with profile card, icon-only state, and navigation interactions
- KPI cards with count-up animations, trend indicators, sparkline charts, and accent styling
- Editorial hero/header with improved toolbar placement for date controls, notifications, and theme toggle
- Distinct visualization system: ranked product revenue ladder, editorial pipeline funnel bands, monthly trend summary cards, featured leaderboard, sector donut + overall progress ring, team radar, and deal size distribution
- Styled header controls: search, date selector, notification bell, executive highlight cards, and narrative summary panels
- Responsive desktop/tablet behavior and self-tested interactive flows
- Redesign regression-tested successfully with no functional interaction regressions
- Latest top-fold refinement: compact premium header, luxury serif typography, hero monthly chart placed first, supporting KPI stack beside it on large screens, and a grouped team performance matrix for easier scanning
- Verified again by regression testing: header controls, theme toggle, hero chart tabs, sidebar behavior, anchor navigation, downstream sections, and responsive widths all passed
- Latest UX bug-fix pass: removed duplicated header profile, made the sidebar fixed/static, corrected Reports/Settings anchor behavior, replaced overlapping team bars with a cleaner score matrix, changed pie hover to a dedicated detail panel, improved chart-hover behavior, fixed deal-size visibility, and tightened spacing/text fitting across breakpoints
- Fixed the follow-up mobile header regression found in testing by correcting the narrow-width header layout and validating no horizontal overflow at 390/768/1440 widths

## Prioritized Backlog
### P0
- None currently blocking the requested scope

### P1
- Split large dashboard stylesheet into section-level CSS modules/files for easier maintenance
- Add richer keyboard focus states and extra accessibility cues for chart-heavy interactions
- Tighten mobile-first composition further so more of the hero and boardroom summary remains above the fold on narrow screens
- Consider a final visual-polish pass on the remaining lower sections so they match the upgraded top-fold sophistication even more closely
- Consider one final visual compression pass on desktop controls/header whitespace if an even denser executive layout is desired

### P2
- Optional nav scroll-spy for auto-highlighting the active section while scrolling
- Optional export/share snapshot actions for executive reporting
- Optional live data wiring if a backend is introduced later

## Next Tasks
1. Modularize dashboard styling into smaller feature-specific stylesheets
2. Add accessibility refinements and more explicit chart summaries for screen readers
3. If desired later, wire the hardcoded dashboard to a real CRM dataset/API without changing the visual system

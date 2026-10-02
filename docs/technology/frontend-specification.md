# Frontend Specification

## Target public route model
- `/` — Ranel overview.
- `/barber` — barber vertical landing page.
- `/products` — available offers only, not product hypotheses.
- `/about` — audience and approach.
- `/contact` — contact/interest form.
- `/privacy` — privacy notice.
- `/terms` — terms appropriate to the offer.

Login, dashboard, orders, and reports are deferred until a real workflow requires them.

## Component boundaries
Layout/navigation; content sections and offer cards; accessible forms; feedback/status components; later app shell with workspace navigation, empty states, and data views.

## Rules
- Semantic HTML, accessible labels, keyboard navigation, visible focus, readable contrast, reduced-motion support.
- Mobile-first responsive design.
- No fake counters, fabricated testimonials, unsupported guarantees, or invented dashboard data.
- Client-side validation for usability and server-side validation for security.
- No API keys or privileged logic in browser code; no sensitive data in local storage.
- Handle loading, empty, error, success, and retry states.
- Prefer static rendering for public pages where supported and keep client JavaScript small.

## Acceptance
Every page has a clear primary action, responsive layout, accessible controls, meaningful metadata, no broken links, and no major console errors in release testing.

## Current verified public release

Current production scope is the Phase 2 public baseline: `/`, `/barber`, `/contact`, `/privacy`, `/inquiry` and supporting static assets. See `README.md` and Phase 2 evidence before adding or assuming routes.

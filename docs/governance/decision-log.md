# Ranel — Decision Log

| Date | Decision | Status | Rationale | Revisit trigger |
|---|---|---|---|---|
| 2026-10-02 | Select **Ranel** as master brand | Founder decision | Founder explicitly selected Ranel | Revisit only if legal clearance reveals a material conflict |
| 2026-10-02 | Start with barber businesses | Strategic direction | A focused vertical enables discovery and a narrow first offer | Revisit after discovery and pilot evidence |
| 2026-10-02 | Organize offers into Kits, Systems, and Supply | Proposed architecture | Connects digital products, operational tools, and commerce | Revisit if customer demand/economics contradict it |
| 2026-10-02 | Validate demand before substantial software development | Operating principle | Reduces build risk and prioritizes paid evidence | Revisit only with clear evidence for build-first |
| 2026-10-02 | Implement Phase 1 public code in this existing Ranel repository | Explicit Phase 1 founder instruction | Overrides older README suggestion that future code be separate; existing strategy documentation preserved | Separate only if a later approved scope requires it |
| 2026-10-02 | Use one Hono/TypeScript Cloudflare Pages app without persistence | Implemented; tested locally | Audit found documentation-only baseline and no existing scaffold; lightweight stack fits Phase 1 | A validated workflow requires additional infrastructure |
| 2026-10-02 | Defer unneeded `/products`, `/about`, `/terms` and contact form API | Phase 1 scope resolution | New explicit Phase 1 scope takes priority over broader proposed frontend/API route lists; no completed products or approved submission provider | Separate approval for deliverable offers or form destination |
| 2026-10-02 | Deploy via CF BYOK to an authorized existing project only; push `origin/main` | Founder instruction; deployment BLOCKED | `ranel` and `runnel` Pages lookups returned HTTP 404; do not create a project or select an unrelated site | Founder identifies the correct existing project/account |
| 2026-10-02 | Ranel copy follows newest prompt; hosting-name conflict remains unresolved | Brand selected; hostname PENDING | Earlier message named `runnel.biz.id`/`runnel.page.dev`, latest prompt names Ranel/`ranel.biz.id`; active `ranel.biz.id` Cloudflare zone observed, not deployed-site evidence | Founder confirms exact hostname and Pages project |

Do not rewrite past decisions silently. Add a new row when a decision changes, including the evidence that caused it.

# MVP Acceptance and Release Checklist

Use for the first public website and inquiry workflow. Do not mark an item complete without evidence.

## Product/content
- [ ] Audience and offer are specific and truthful.
- [ ] Available offers are distinguished from hypotheses.
- [ ] Price, deliverables, delivery, limitations, and next steps are clear where applicable.
- [ ] No fabricated testimonials, counts, savings, or performance claims.
- [ ] Contact and privacy information is present.

## Domain/deployment
- [ ] Registrar access and renewal date confirmed privately.
- [ ] DNS for `ranel.biz.id` configured correctly.
- [ ] HTTPS certificate valid; canonical hostname and redirects work.
- [ ] Preview and production are separated.
- [ ] No secrets in source, build output, or browser bundle.

## UX/accessibility
- [ ] Mobile and desktop reviewed.
- [ ] Keyboard navigation and visible focus work.
- [ ] Form fields have labels and understandable errors.
- [ ] Loading, success, and failure states are handled.
- [ ] No broken links or major console errors.

## Backend/privacy
- [ ] Server validation, payload limits, and spam controls exist.
- [ ] Consent is clear and separate where relevant.
- [ ] Personal data is minimized and not written to verbose logs.
- [ ] Retention/export/deletion process documented for collected data.

## Quality/release
- [ ] Formatting, lint, typecheck, tests, and build passed where configured.
- [ ] Migration tests passed if a database exists.
- [ ] Critical journey tested on deployed preview.
- [ ] Production smoke test passed after deployment.
- [ ] Rollback/disablement procedure is known.
- [ ] Commit SHA, deployment URL, test evidence, and known limitations recorded.

Decision: PENDING / GO / NO-GO. Reviewer: __. Commit: __. URL: __. Date: __.
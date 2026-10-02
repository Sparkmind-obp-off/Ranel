# Genspark Execution Protocol

## Source of truth
GitHub code/docs are canonical. Genspark output is a proposed change until reviewed, tested, committed, and deployed. Never paste secrets, customer records, recovery codes, or payment credentials into prompts.

## Every phase prompt must specify
Repository/branch; goal and measurable acceptance criteria; scope/exclusions; architecture/privacy constraints; tests/commands; deployment target; required evidence; stop conditions; unresolved questions.

## Execution cycle
1. Inspect repo, branch, scripts, code, and deployment config.
2. Summarize current state and conflicts with docs.
3. Propose a bounded plan.
4. Implement only the approved phase.
5. Run checks and report exact results.
6. Review diff for secrets, data exposure, unsafe defaults, scope creep.
7. Deploy only to specified environment when configuration is available.
8. Smoke-test and report exact evidence.
9. Commit with meaningful message and SHA.
10. List known gaps and next smallest step.

Built = code exists; tested = test ran; deployed = deployment succeeded; integrated = real provider connection verified; validated = customer evidence exists. Do not claim production success from a local build. Do not silently change framework/database/auth/domain, provision paid services without approval, overwrite unrelated changes, or expose private environment values.

Phase gates: A public website/inquiry capture; B first offer/manual delivery; C internal workflow only if manual work is a bottleneck; D customer app after repeatable paid demand; E multi-tenancy after multiple businesses need the same workflow.
# Ranel — Access & Permission Model

**Status:** LOCKED security/governance standard.
**Purpose:** Define how humans, AI software, connectors, tokens, and provider accounts may access Ranel.

## 1. Principle
Access is granted by capability, scope, environment, and action—not by convenience.
A tool being able to open a website or repository does not automatically authorize it to change production state.

## 2. Actor classes
| Actor | Default role | Typical authority |
|---|---|---|
| Founder | Final authority | Final business decisions and material external approvals |
| ChatGPT | Primary analysis/implementation | Repo work, architecture, tests, routine approved execution within available tools |
| Genspark.ai | External execution layer | Bounded software/desktop/console execution when access is available and task-scoped |
| Provider API | External system | Only the operations granted to its credential |
| CI/deploy automation | Mechanical executor | Only configured repository/deployment permissions |
| End user/customer | Public/business actor | Only permitted customer-facing actions |

## 3. Permission levels
### L0 — Public
Read-only public information. No credentials.
### L1 — Repository read
Inspect source, docs, history, configuration names, and tests.
### L2 — Repository write
Create/update scoped code/docs, run checks, commit/push within the approved repository.
### L3 — Environment execution
Run local/sandbox tooling or approved existing deployment workflows.
### L4 — Provider read
Inspect provider metadata and configuration without changing state.
### L5 — Provider operational
Perform bounded operational changes that are explicitly authorized, reversible, and within known cost/risk.
### L6 — Material production control
Live payment activation, spending, payout, credential rotation/replacement, DNS changes, destructive data operations, or other material external commitments.
L6 is never implied by ordinary repository access.

## 4. Token rules
For every token/credential record only:
- provider
- purpose
- environment
- scope
- owner
- rotation/revocation method
- expiry if applicable
- where stored
- fallback
Never record raw token, API key value, password, recovery code, or private key.

## 5. Environment separation
At minimum distinguish local/development, preview/test, and production.
Never copy production secrets into development or preview unless explicitly required, securely provisioned, and documented.

## 6. AI software access
AI tools may receive access to repository, browser/desktop, provider console, CLI, or deployment system only to the level required by the current task.
Prefer read-only for discovery/audit. Prefer scoped write for implementation. Prefer short-lived or narrowly scoped credentials where supported.

## 7. Production secret handling
An AI executor may use a production credential through the provider secure secret mechanism when explicitly part of an approved implementation.
The executor must never paste the secret into chat, write it to Git, echo it to logs, expose it to browser code, screenshot it, or store it in generated documentation.
The presence of a credential does not authorize every operation available to that credential.

## 8. Permission review
Before material execution verify:
1. authenticated account;
2. project/resource;
3. environment;
4. intended scope;
5. expected cost;
6. rollback/disablement;
7. evidence method.
If any material item is ambiguous, stop the affected action.

## 9. Ranel rule
**Access is a tool capability; authorization is a business decision.**
Genspark, ChatGPT, or another AI may have technical ability to perform an action while still not being authorized to perform that action.
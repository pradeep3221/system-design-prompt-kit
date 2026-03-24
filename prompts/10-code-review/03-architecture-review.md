---
id: "review-architecture"
version: "1.0.0"
category: "code-review"
complexity: "advanced"
tags: ["architecture-review", "rfc", "design-review", "fitness-functions"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Architecture Review

> Review architectural decisions, system design PRs, and technical RFCs.

## Metadata
- **Category:** `code-review`
- **Complexity:** `advanced`

## Context

Use this prompt for reviewing architecture impact of a change.

- **Use case:** Large PRs crossing component boundaries, new dependency additions, public API changes.
- **Prerequisites:** System architecture diagram, change scope, dependency map.
- **Scope:** Architecture impact, dependency analysis, pattern compliance, scalability implications.

## Prompt

```text
You are a principal architect reviewing an architectural proposal or design PR.

**Document/Proposal:**
{{DESIGN_DOCUMENT}}

**Review against these dimensions:**

### 1. Requirements Alignment
- Does the design address all stated requirements?
- Are there unstated assumptions?
- Are non-functional requirements explicitly addressed?

### 2. Architectural Fitness
- Does it follow established architectural principles for this system?
- Is the complexity proportional to the problem being solved?
- Is it consistent with existing system patterns?
- Are new patterns justified?

### 3. Scalability & Performance
- Will this design scale to the stated requirements?
- Where are the bottlenecks?
- Have capacity estimates been provided?
- Are performance targets defined and achievable?

### 4. Reliability & Resilience
- What are the failure modes?
- Is there a single point of failure?
- What happens during partial failures?
- Is the blast radius acceptable?

### 5. Security
- Has threat modeling been performed?
- Are authentication and authorization properly designed?
- Is data protection adequate?
- Are there compliance implications?

### 6. Operability
- Can this be deployed without downtime?
- Is it observable (logging, metrics, tracing)?
- Can it be debugged in production?
- Is the rollback plan defined?

### 7. Cost
- What are the infrastructure costs?
- Are there cheaper alternatives that meet requirements?
- Does cost scale linearly with load?

### 8. Team Impact
- Does the team have the skills to build and maintain this?
- Is the learning curve acceptable?
- Does this create organizational dependencies?

### 9. Missing Considerations
- What isn't addressed that should be?
- What questions still need answers before implementation?

**Provide feedback as:**
- 🔴 **Blockers:** Must be resolved before proceeding.
- 🟡 **Concerns:** Should be discussed and may need changes.
- 🟢 **Suggestions:** Optional improvements.
- ❓ **Questions:** Need clarification.

**Verdict:** Approve to proceed / Revise and re-review / Major rethink needed
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{DESIGN_DOCUMENT}}` | The design to review | RFC, ADR, design doc, architecture diagram description |

## Tips & Variations

- For RFCs: "Include a section evaluating the alternatives presented."
- Add: "Suggest specific experiments or spikes to de-risk uncertain aspects."

## Composition

- **Precedes:** `docs-adr`
- **Follows:** `review-checklist`, `review-pr-feedback`
- **Combines with:** `arch-microservices-design`, `system-trade-off-analysis`
- **Overlay:** N/A (technology-agnostic)

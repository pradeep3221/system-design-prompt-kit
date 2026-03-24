---
id: "docs-adr"
version: "1.0.0"
category: "documentation"
complexity: "intermediate"
tags: ["adr", "architecture-decision", "documentation", "governance"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: false
---

# Architecture Decision Record (ADR)

> Document an architectural decision with full context, options, and consequences.

## Metadata
- **Category:** `documentation`
- **Complexity:** `intermediate`

## Prompt

```text
You are a software architect. Write an Architecture Decision Record (ADR) for the following decision.

**Decision topic:** {{DECISION_TOPIC}}
**Context:** {{CONTEXT}}
**Options considered:** {{OPTIONS}}
**Chosen option:** {{CHOSEN_OPTION}}

**Use this ADR format (based on Michael Nygard's template):**

---

# ADR-{{NUMBER}}: {{TITLE}}

## Status
{{STATUS}} (Proposed | Accepted | Deprecated | Superseded by ADR-XXX)

## Date
{{DATE}}

## Context
What is the issue that motivates this decision? What forces are at play?
- Business context
- Technical context
- Constraints (time, budget, team skills, compliance)
- Related ADRs

## Decision
What is the decision that was made?
State the decision clearly and directly: "We will use X to achieve Y."

## Options Considered

### Option 1: {{OPTION_1_NAME}}
**Description:** How it works.
**Pros:**
- ...
**Cons:**
- ...
**Estimated effort:** ...

### Option 2: {{OPTION_2_NAME}}
**Description:** How it works.
**Pros:**
- ...
**Cons:**
- ...
**Estimated effort:** ...

### Option 3: {{OPTION_3_NAME}} (if applicable)
...

## Decision Rationale
Why was the chosen option selected over alternatives? Reference specific evaluation criteria:
- Alignment with requirements
- Team capability
- Cost and timeline
- Risk profile
- Reversibility

## Consequences

### Positive
- Benefits gained from this decision.

### Negative
- Trade-offs accepted.
- New constraints introduced.
- Technical debt implications.

### Risks
- What could go wrong and how we'll mitigate it.

## Follow-Up Actions
- [ ] Action 1
- [ ] Action 2

## References
- Links to relevant documentation, standards, or discussions.

---
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{DECISION_TOPIC}}` | What's being decided | `Database selection for user service` |
| `{{CONTEXT}}` | Background context | `We need a database for the user service with 10M users, ACID transactions, and complex queries` |
| `{{OPTIONS}}` | Options considered | `PostgreSQL, MongoDB, DynamoDB` |
| `{{CHOSEN_OPTION}}` | Selected option | `PostgreSQL` |

## Tips & Variations

- For lightweight ADRs: "Use the Y-statement format: In the context of X, facing Y, we decided Z, to achieve A, accepting B."
- Add: "Include a decision matrix scoring each option against weighted criteria."

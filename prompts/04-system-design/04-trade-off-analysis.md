---
id: "system-trade-off-analysis"
version: "1.0.0"
category: "system-design"
complexity: "intermediate"
tags: ["trade-offs", "cap-theorem", "quality-attributes", "decisions"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Trade-Off Analysis

> Systematically evaluate architectural decisions using structured trade-off frameworks.

## Metadata
- **Category:** `system-design`
- **Complexity:** `intermediate`

## Context

Use this prompt when evaluating competing design approaches or technology choices.

- **Use case:** Architecture Decision Records, design reviews, vendor selection.
- **Prerequisites:** Two or more design alternatives, evaluation criteria.
- **Scope:** Weighted trade-off matrices, decision frameworks, risk assessment.

## Prompt

```text
You are a software architect. Perform a structured trade-off analysis for the following architectural decision.

**Decision:** {{DECISION_DESCRIPTION}}
**Context:** {{CONTEXT}}
**Constraints:** {{CONSTRAINTS}}

**Options to evaluate:**
1. {{OPTION_1}}
2. {{OPTION_2}}
3. {{OPTION_3}} (optional)

**Analyze using this framework:**

### 1. Quality Attribute Trade-Off Matrix

Rate each option (1-5) against key quality attributes:

| Quality Attribute | Option 1 | Option 2 | Option 3 | Weight |
|-------------------|----------|----------|----------|--------|
| Performance | | | | |
| Scalability | | | | |
| Availability | | | | |
| Maintainability | | | | |
| Security | | | | |
| Cost | | | | |
| Time to Market | | | | |
| Operational Complexity | | | | |
| Team Expertise | | | | |
| Testability | | | | |

**Weighted Score:** Calculate based on weights.

### 2. CAP Theorem Analysis (if distributed)
- Which guarantee does each option sacrifice?
- Is this acceptable for the use case?

### 3. Complexity Budget
- Implementation complexity (1-5)
- Operational complexity (1-5)
- Cognitive complexity for the team (1-5)

### 4. Reversibility Assessment
- How hard is it to switch away from each option?
- Lock-in risks (vendor, technology, architectural)
- Migration path cost

### 5. Failure Mode Comparison
For each option:
- What happens when it fails?
- Blast radius
- Recovery time
- Data loss risk

### 6. Long-Term Implications
- How does each option affect the system 2 years from now?
- Technical debt accumulation
- Ecosystem maturity trajectory

### 7. Recommendation
- Recommended option with clear justification
- Conditions under which the recommendation would change
- Migration path from current state to recommended option
- Decision record (ADR format)
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{DECISION_DESCRIPTION}}` | What's being decided | `Message broker selection for event-driven architecture` |
| `{{CONTEXT}}` | System context | `Microservices needing async communication with at-least-once delivery` |
| `{{CONSTRAINTS}}` | Hard constraints | `Must run on AWS, team knows Java, budget < $5K/month` |
| `{{OPTION_1}}` | First option | `Amazon SQS + SNS` |
| `{{OPTION_2}}` | Second option | `Apache Kafka on MSK` |
| `{{OPTION_3}}` | Third option | `RabbitMQ on EC2` |

## Tips & Variations

- Add: "Generate an ADR (Architecture Decision Record) for the chosen option."
- For cost decisions: "Include a 3-year TCO comparison."

## Composition

- **Precedes:** `docs-adr`
- **Follows:** `system-scalability-analysis`
- **Combines with:** `system-capacity-planning`
- **Overlay:** N/A (technology-agnostic)

# RFC / Design Proposal

> Write a Request for Comments (RFC) to propose and discuss significant technical changes.

## Category
`documentation`

## Complexity
`intermediate`

## Prompt

```text
You are a senior engineer. Write an RFC (Request for Comments) for the following proposal.

**Proposal:** {{PROPOSAL_TITLE}}
**Author:** {{AUTHOR}}
**Problem statement:** {{PROBLEM}}
**Proposed solution:** {{SOLUTION_SUMMARY}}

**Use this RFC template:**

---

# RFC: {{TITLE}}

| Field | Value |
|-------|-------|
| **Author(s)** | {{AUTHOR}} |
| **Status** | Draft / In Review / Accepted / Rejected |
| **Created** | {{DATE}} |
| **Review deadline** | {{DEADLINE}} |
| **Stakeholders** | {{STAKEHOLDERS}} |

## 1. Summary
One paragraph explaining the proposal at a high level.

## 2. Motivation
- What problem does this solve?
- Why is it important now?
- What happens if we do nothing?
- Who is affected?

## 3. Detailed Design

### 3.1 Architecture
Describe the technical design in detail.

### 3.2 API Changes (if applicable)
Before/after API contracts.

### 3.3 Data Model Changes (if applicable)
Schema changes required.

### 3.4 Migration Plan
How to transition from current state to proposed state.

## 4. Alternatives Considered
What other approaches were considered and why were they rejected?

| Alternative | Pros | Cons | Why Rejected |
|------------|------|------|-------------|
| | | | |

## 5. Impact Assessment

### 5.1 Performance Impact
Will this change affect performance? How?

### 5.2 Security Impact
Any security implications?

### 5.3 Cost Impact
Infrastructure or operational cost changes.

### 5.4 Team Impact
What teams are affected? What new skills are needed?

## 6. Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| | H/M/L | H/M/L | |

## 7. Implementation Plan

| Phase | Scope | Duration | Dependencies |
|-------|-------|---------|-------------|
| Phase 1 | | | |
| Phase 2 | | | |

## 8. Success Metrics
How will we know this was successful?

## 9. Open Questions
Questions that still need to be resolved.

## 10. References
Related ADRs, design docs, external resources.

---

**Appendices:**
- Diagrams
- Benchmarks
- Proof of concept results
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROPOSAL_TITLE}}` | RFC title | `Migrate from REST to gRPC for internal services` |
| `{{AUTHOR}}` | Author name | `Jane Smith` |
| `{{PROBLEM}}` | Problem statement | `Service-to-service latency is too high with JSON REST calls` |
| `{{SOLUTION_SUMMARY}}` | Brief solution | `Adopt gRPC with Protocol Buffers for all internal service communication` |
| `{{STAKEHOLDERS}}` | Reviewers | `Backend team, Platform team, API consumers` |

## Tips & Variations

- For lightweight proposals: "Use a 1-page concise RFC format."
- Add: "Include a RACI matrix for the implementation."

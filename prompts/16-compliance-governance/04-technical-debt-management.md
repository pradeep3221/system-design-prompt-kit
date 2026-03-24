---
id: "gov-technical-debt-management"
version: "1.0.0"
category: "compliance-governance"
complexity: "intermediate"
tags: ["technical-debt", "code-quality", "refactoring", "governance", "prioritization"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: false
---

# Technical Debt Management

> Establish a systematic approach to identifying, tracking, prioritizing, and remediating technical debt.

## Metadata
- **Category:** `compliance-governance`
- **Complexity:** `intermediate`

## Context

- **Use case:** Making technical debt visible and managing it as a first-class engineering concern.
- **Prerequisites:** Codebase with accumulated debt, team awareness, management support.
- **Scope:** Debt taxonomy, measurement, prioritization, remediation. Does not cover individual refactoring techniques (see Code Refactoring prompt).

## Prompt

```text
<Role>
You are an engineering manager establishing a technical debt governance program.

<Context>
- System: {{SYSTEM_NAME}}
- Codebase age: {{AGE}} years
- Team size: {{TEAM_SIZE}} engineers
- Current debt perception: {{PERCEPTION}} (low / moderate / high / critical)
- Sprint capacity allocated to debt: {{DEBT_CAPACITY}} (0% / 10% / 20% / variable)

<Task>
Design a technical debt management program covering:

### 1. Debt Taxonomy
| Type | Description | Example | Impact |
|------|-------------|---------|--------|
| Code debt | Poor code quality, duplication | Copy-pasted validation logic | Slower changes, more bugs |
| Architecture debt | Wrong patterns, tight coupling | Monolith that should be services | Can't scale, slow deploys |
| Dependency debt | Outdated libraries, frameworks | EOL Node.js 16, vulnerable deps | Security risk, no patches |
| Test debt | Missing or flaky tests | 30% coverage, 50 flaky tests | Risky releases, slow CI |
| Infrastructure debt | Manual ops, outdated infra | Manual deployments, no IaC | Slow recovery, errors |
| Documentation debt | Missing or stale docs | No runbooks, wrong API docs | Slow onboarding, incidents |
| Design debt | Poor UX patterns | Inconsistent navigation | User frustration |

### 2. Debt Discovery
- Static analysis metrics (complexity, duplication, coverage)
- Dependency audit (outdated, vulnerable, deprecated)
- Developer friction surveys (quarterly)
- Incident root cause analysis → debt linkage
- Sprint retrospective debt identification
- Architecture review findings

### 3. Debt Quantification
For each debt item, capture:
- **Interest:** Ongoing cost of NOT fixing (hours/sprint, incident frequency)
- **Principal:** Estimated effort to fix (story points or hours)
- **Risk:** Probability and impact of related incident
- **Age:** How long the debt has existed
- **Blast radius:** Number of teams/components affected

### 4. Prioritization Framework
```
Priority Score = (Interest × Risk × Blast Radius) / Principal

Where:
- Interest: 1 (low ongoing cost) to 5 (high ongoing cost)
- Risk: 1 (unlikely problem) to 5 (incident imminent)
- Blast radius: 1 (single component) to 5 (system-wide)
- Principal: 1 (trivial fix) to 5 (major effort)
```

### 5. Remediation Strategy
| Approach | When to Use | Example |
|----------|-----------|---------|
| Boy Scout Rule | Small improvements | Clean up code you touch |
| Dedicated Sprint | High-priority debt batch | "Debt Sprint" every 6th sprint |
| Percentage allocation | Sustained investment | 20% of sprint capacity |
| Strangler Fig | Replace legacy component | Build new service alongside old |
| Big Bang | Unavoidable (framework upgrade) | Major version migration |

### 6. Tracking & Reporting
- Debt backlog (separate from feature backlog or tagged)
- Debt dashboard: total items, trend, remediation velocity
- Monthly debt report to leadership
- Debt-to-feature ratio per sprint
- Celebration of debt reduction milestones

### 7. Prevention
- Definition of Done includes "no new debt" criteria
- Architecture Decision Records for significant changes
- Automated quality gates (linting, coverage, complexity)
- Design review for high-risk changes
- Dependency update automation (Renovate, Dependabot)

<Constraints>
- All debt items must be tracked in a visible backlog
- Each debt item must have a quantified priority score
- At least 15-20% of engineering capacity allocated to debt remediation
- New debt introduced must be documented as a conscious decision (ADR)

<Output Format>
Structured markdown with debt taxonomy table, prioritization matrix, tracking template, and quarterly review process.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{SYSTEM_NAME}}` | Yes | System name | `Legacy Platform` |
| `{{AGE}}` | No | Codebase age | `7 years` |
| `{{TEAM_SIZE}}` | No | Team size | `25 engineers` |
| `{{PERCEPTION}}` | No | Current debt level | `high` |
| `{{DEBT_CAPACITY}}` | No | Sprint allocation | `10% currently` |

## Composition

- **Precedes:** `coding-code-refactoring`, `review-architecture-review`
- **Follows:** `review-checklist`, `arch-microservices-design`
- **Combines with:** `devops-cicd-pipeline`, `testing-unit`

## Tips & Variations

- **For legacy systems:** Start with a debt inventory workshop — get the team to list and vote on top debt items.
- **For fast-growing startups:** Conscious debt is okay — document decisions and revisit quarterly.
- **For executive buy-in:** Frame debt in business terms: "This debt causes 2 incidents/month costing $X."

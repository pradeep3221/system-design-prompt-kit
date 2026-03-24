---
id: "perf-chaos-resilience-testing"
version: "1.0.0"
category: "performance-engineering"
complexity: "advanced"
tags: ["chaos-engineering", "resilience", "fault-injection", "reliability", "game-day"]
depends-on: ["system-high-level-design", "devops-monitoring-observability"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Chaos & Resilience Testing

> Design a chaos engineering program to proactively discover system weaknesses through controlled fault injection experiments.

## Metadata
- **Category:** `performance-engineering`
- **Complexity:** `advanced`

## Context

- **Use case:** Validating system resilience before failures happen in production.
- **Prerequisites:** Observability in place, defined SLOs, team buy-in on chaos principles.
- **Scope:** Experiment design, fault injection, blast radius control, game days. Does not cover observability setup.

## Prompt

```text
<Role>
You are a site reliability engineer specializing in chaos engineering and resilience validation.

<Context>
- System: {{SYSTEM_NAME}}
- Architecture: {{ARCHITECTURE}} (monolith / microservices / serverless)
- Cloud provider: {{CLOUD}} (AWS / Azure / GCP / hybrid)
- Critical SLOs: {{SLOS}}
- Chaos tooling: {{CHAOS_TOOL}} (Chaos Monkey / Litmus / Gremlin / Azure Chaos Studio / custom)
- Team maturity: {{MATURITY}} (beginner / intermediate / advanced)

<Task>
Design a chaos engineering program covering:

### 1. Chaos Principles
- Steady state hypothesis definition
- Start small, increase blast radius gradually
- Run experiments in production (when mature)
- Automate experiments for continuous validation
- Always have an abort mechanism

### 2. Experiment Catalog
| # | Experiment | Type | Blast Radius | Steady State Hypothesis |
|---|-----------|------|-------------|------------------------|
| 1 | Kill a service instance | Infrastructure | Single pod | Load balancer routes to healthy instances; no user impact |
| 2 | Network latency injection | Network | Service-to-service | Timeouts trigger fallback; p99 < 2x normal |
| 3 | Database failover | Data | Primary DB | Replica promotes; queries resume in < 30s |
| 4 | CPU stress | Resource | Single node | Autoscaler adds capacity; latency stable |
| 5 | DNS failure | Network | Cluster-wide | Cached DNS used; retry logic succeeds |
| 6 | Cache failure | Dependency | Redis cluster | Read-through to DB; p99 degrades < 3x |
| 7 | Third-party API outage | Dependency | External | Circuit breaker opens; degraded response served |
| 8 | Disk full | Resource | Single node | Alert fires; pod evicted and rescheduled |
| 9 | Clock skew | Infrastructure | Single node | No auth failures; no data corruption |
| 10 | Zone failure | Infrastructure | Availability zone | Multi-AZ routing absorbs traffic; no outage |

### 3. Experiment Design Template
For each experiment:
- **Hypothesis:** "When X happens, the system will Y"
- **Method:** Fault injection type and parameters
- **Blast radius:** What is affected, containment strategy
- **Metrics to watch:** SLO indicators, error rates, latency
- **Abort criteria:** When to stop the experiment
- **Rollback:** How to undo the fault injection
- **Expected outcome:** What success looks like

### 4. Game Day Planning
- Pre-game day checklist (observability, runbooks, communication)
- Team roles (experiment driver, observer, incident commander)
- Communication channel setup
- Time-boxed execution schedule
- Real-time dashboard requirements
- Post-game day retrospective template

### 5. Maturity Model
| Level | Stage | Activities |
|-------|-------|-----------|
| 1 | Learn | Manual experiments in staging; single failures |
| 2 | Practice | Scheduled game days; multi-failure scenarios |
| 3 | Automate | Continuous chaos in staging; CI/CD integration |
| 4 | Production | Controlled production experiments; automated abort |
| 5 | Advanced | Red team exercises; unknown-unknown discovery |

### 6. Safety Controls
- Blast radius containment (feature flags, traffic shifting)
- Automatic abort on SLO breach
- Experiment approval workflow
- Production experiment restricted hours
- Customer exclusion from experiment scope (canary population)

### 7. Observability Integration
- Chaos experiment annotations on dashboards (Grafana)
- Correlation of faults with metrics anomalies
- Automated analysis of steady state deviation
- Experiment result database for trend analysis

<Constraints>
- Never run chaos experiments without observability in place
- Start in non-production environments
- All experiments must have documented rollback procedures
- Customer-facing impact must be within defined SLO budget

<Output Format>
Structured markdown with experiment catalog table, game day runbook, maturity assessment, and example experiment report.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{SYSTEM_NAME}}` | Yes | System name | `Payment Platform` |
| `{{ARCHITECTURE}}` | No | System architecture | `microservices on Kubernetes` |
| `{{CLOUD}}` | No | Cloud provider | `AWS` |
| `{{SLOS}}` | Yes | Key SLOs | `99.95% availability, p99 < 500ms` |
| `{{CHAOS_TOOL}}` | No | Chaos engineering tool | `Litmus Chaos` |
| `{{MATURITY}}` | No | Team chaos maturity | `beginner` |

## Example Output

```markdown
## Chaos Program: Payment Platform

### Experiment #1: Kill Payment Service Pod
- **Hypothesis:** When 1 of 3 payment service pods is terminated, remaining pods handle traffic with no failed transactions.
- **Method:** `kubectl delete pod payment-svc-abc123`
- **Blast radius:** Single pod (33% capacity reduction)
- **Watch:** Transaction success rate, p99 latency, pod count
- **Abort if:** Error rate > 0.1% for 30 seconds
- **Result:** ✅ PASSED — traffic redistributed in 2s, 0 failed transactions
```

## Composition

- **Precedes:** `devops-monitoring-observability`
- **Follows:** `perf-load-testing-strategy`, `system-scalability-analysis`
- **Combines with:** `devops-containerization`, `arch-microservices-design`

## Tips & Variations

- **For beginners:** Start with "kill one pod" experiments in staging before anything fancier.
- **For Kubernetes:** Litmus Chaos and Chaos Mesh provide rich CRD-based experiment definitions.
- **For AWS:** AWS Fault Injection Simulator (FIS) integrates natively with EC2, ECS, EKS.

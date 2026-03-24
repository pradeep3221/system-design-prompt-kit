---
id: "xcut-slo-sli-error-budgets"
version: "1.0.0"
category: "cross-cutting-concerns"
complexity: "advanced"
tags: ["slo", "sli", "sla", "error-budget", "reliability", "sre"]
depends-on: ["devops-monitoring-observability"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# SLO, SLI & Error Budgets

> Design a service level objective framework with measurable indicators, error budget policies, and reliability-driven decision making.

## Metadata
- **Category:** `cross-cutting-concerns`
- **Complexity:** `advanced`

## Context

- **Use case:** Establishing quantitative reliability targets and data-driven feature velocity decisions.
- **Prerequisites:** Monitoring infrastructure, defined user journeys, organizational SRE buy-in.
- **Scope:** SLI selection, SLO definition, error budget policy, alerting. Does not cover SLA contract negotiation.

## Prompt

```text
<Role>
You are a site reliability engineer defining service level objectives for a production system.

<Context>
- Service: {{SERVICE_NAME}}
- Users: {{USER_TYPE}} (internal / external / both)
- Current reliability: {{CURRENT_RELIABILITY}} (if known)
- Business impact of downtime: {{IMPACT}}
- Monitoring stack: {{MONITORING}} (Prometheus / Datadog / CloudWatch / etc.)

<Task>
Design an SLO framework covering:

### 1. SLI Selection
| User Journey | SLI Type | Measurement | Good Threshold |
|-------------|----------|-------------|---------------|
| Page load | Latency | p99 load time | < 2s |
| API request | Availability | Successful responses / total | ≥ 99.9% |
| Checkout | Success rate | Completed orders / attempted | ≥ 99.5% |
| Search | Latency | p95 search response | < 500ms |
| Data freshness | Freshness | Time since last sync | < 5min |

### 2. SLO Definitions
For each SLI:
- **Target:** e.g., 99.9% of requests < 500ms over 30-day window
- **Window:** Rolling 30-day vs. calendar month
- **Measurement:** Request-based vs. time-based
- **Burn rate alerting:** Fast burn (2% in 1h) + slow burn (5% in 6h)

### 3. Error Budget Calculation
```
Monthly Error Budget = 1 - SLO Target
Example: 99.9% SLO → 0.1% error budget → ~43 minutes/month

Budget consumed = (bad events / total events) over window
Remaining budget = target budget - consumed budget
```

### 4. Error Budget Policy
Define actions when error budget is consumed:
| Budget Remaining | Action |
|-----------------|--------|
| > 50% | Normal velocity — ship features |
| 25-50% | Caution — prioritize reliability work |
| 5-25% | Freeze non-critical deployments |
| 0% | Full freeze — reliability-only work until budget replenishes |

### 5. Alerting Strategy
- **Page (immediate):** Fast burn alerts — 2% budget consumed in 1h
- **Ticket (soon):** Slow burn alerts — 5% budget consumed in 6h
- **Report (periodic):** Weekly SLO report to stakeholders
- Multi-window, multi-burn-rate alerting (Google SRE model)

### 6. Dashboard Design
- SLO compliance gauge (current % vs. target)
- Error budget burndown chart (30-day window)
- SLI time series (latency, availability, error rate)
- Incident correlation overlay
- Team-level SLO summary view

### 7. Organizational Integration
- SLO review cadence (monthly)
- SLO as input to sprint planning
- SLO-driven incident priority classification
- SLO reporting to leadership
- SLO evolution (tighten targets as system matures)

<Constraints>
- Every user-facing service must have at least one SLO
- SLOs must be measurable with existing monitoring
- Error budget policy must be agreed upon by engineering + product
- SLO targets should be achievable (not aspirational)

<Output Format>
Structured markdown with SLI/SLO table, error budget calculator, alerting rules (Prometheus/Datadog format), and dashboard mockup description.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{SERVICE_NAME}}` | Yes | Service name | `Payment Service` |
| `{{USER_TYPE}}` | No | User type | `external customers` |
| `{{CURRENT_RELIABILITY}}` | No | Current metrics | `99.7% availability` |
| `{{IMPACT}}` | No | Business impact | `$10K/minute of downtime` |
| `{{MONITORING}}` | No | Monitoring platform | `Prometheus + Grafana` |

## Composition

- **Precedes:** `devops-monitoring-observability`, `perf-chaos-resilience-testing`
- **Follows:** `system-high-level-design`, `arch-microservices-design`
- **Combines with:** `devops-cicd-pipeline`, `xcut-feature-flags-release`

## Tips & Variations

- **For new services:** Start with a relaxed SLO (e.g., 99.5%) and tighten as the system matures.
- **For Prometheus:** Use `pyrra` or `sloth` for SLO-based recording rules and alerts.
- **For Google SRE approach:** Implement multi-window, multi-burn-rate alerting as described in the Google SRE Workbook.

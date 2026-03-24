---
id: "devops-monitoring-observability"
version: "1.0.0"
category: "devops-cicd"
complexity: "advanced"
tags: ["monitoring", "observability", "logging", "metrics", "tracing", "opentelemetry"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Monitoring & Observability

> Design a comprehensive observability stack with logging, metrics, tracing, and alerting.

## Metadata
- **Category:** `devops-cicd`
- **Complexity:** `advanced`

## Prompt

```text
You are an SRE / observability engineer. Design a monitoring and observability strategy for {{SYSTEM_NAME}}.

**Architecture:** {{ARCHITECTURE}}
**Stack:** {{TECH_STACK}}
**Cloud:** {{CLOUD_PROVIDER}}

**Design the three pillars of observability:**

### 1. Logging
- **Structured logging format** (JSON with standard fields):
  - `timestamp`, `level`, `message`, `service`, `traceId`, `spanId`, `userId`
- **Log levels:** When to use ERROR, WARN, INFO, DEBUG
- **What to log:** Request/response summaries, state changes, errors, audit events
- **What NOT to log:** PII, credentials, tokens, full request bodies with sensitive data
- **Log aggregation:** ELK / Loki / CloudWatch Logs
- **Retention policy:** Hot (7d) → Warm (30d) → Cold (90d) → Archive (1y)

### 2. Metrics
**Application metrics (RED method):**
- Rate: Requests per second
- Errors: Error rate / error percentage
- Duration: Latency percentiles (p50, p90, p99)

**Infrastructure metrics (USE method):**
- Utilization: CPU, memory, disk, network
- Saturation: Queue depth, thread pool usage, connection pool
- Errors: Hardware errors, timeout counts

**Business metrics:**
- {{BUSINESS_METRICS}}

**Metric collection:** Prometheus / CloudWatch Metrics / Datadog
**Dashboard design:** Per-service dashboard, system overview dashboard

### 3. Distributed Tracing
- Instrumentation: OpenTelemetry SDK integration
- Trace context propagation (W3C Trace Context)
- Span naming conventions
- Key spans to instrument (HTTP, database, cache, external calls)
- Sampling strategy (head-based vs. tail-based, sample rate)
- Trace storage: Jaeger / Tempo / X-Ray / Application Insights

### 4. Alerting Strategy

| Alert | Condition | Severity | Notification | Runbook |
|-------|-----------|----------|-------------|---------|
| High error rate | > 1% 5xx for 5min | Critical | PagerDuty | link |
| High latency | p99 > 2s for 10min | Warning | Slack | link |
| Pod crash loop | > 3 restarts in 10min | Critical | PagerDuty | link |
| Disk usage | > 80% | Warning | Slack | link |
| Certificate expiry | < 30 days | Warning | Email | link |

**Alert anti-patterns to avoid:**
- Alert fatigue (too many non-actionable alerts)
- Missing runbooks
- Alerting on symptoms, not causes

### 5. SLIs, SLOs, and Error Budgets
- Define SLIs (Service Level Indicators) for key user journeys
- Set SLOs (Service Level Objectives) with percentages
- Calculate error budget and burn rate alerting

### 6. On-Call & Incident Response
- Escalation policy
- Incident severity definitions
- Communication templates
- Post-incident review process

**Provide:** Configuration examples for {{MONITORING_STACK}}.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SYSTEM_NAME}}` | System to monitor | `E-Commerce Platform` |
| `{{ARCHITECTURE}}` | Architecture type | `12 microservices on Kubernetes` |
| `{{TECH_STACK}}` | Application stack | `Node.js, Python, PostgreSQL, Redis, Kafka` |
| `{{CLOUD_PROVIDER}}` | Cloud | `AWS`, `Azure`, `GCP` |
| `{{BUSINESS_METRICS}}` | Key business metrics | `Orders/min, cart abandonment, payment success rate` |
| `{{MONITORING_STACK}}` | Monitoring tools | `Prometheus + Grafana + Loki + Tempo` |

## Tips & Variations

- Add: "Generate Grafana dashboard JSON for the key metrics."
- Add: "Design synthetic monitoring / uptime checks."

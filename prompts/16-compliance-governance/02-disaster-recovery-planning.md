---
id: "gov-disaster-recovery-planning"
version: "1.0.0"
category: "compliance-governance"
complexity: "advanced"
tags: ["disaster-recovery", "business-continuity", "rto", "rpo", "failover"]
depends-on: ["system-high-level-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Disaster Recovery Planning

> Design a disaster recovery plan covering RTO/RPO targets, failover strategies, backup procedures, and DR testing.

## Metadata
- **Category:** `compliance-governance`
- **Complexity:** `advanced`

## Context

- **Use case:** Ensuring business continuity during catastrophic system failures.
- **Prerequisites:** System architecture documented, business impact analysis completed.
- **Scope:** DR strategy, failover automation, backup design, testing. Does not cover physical disaster response.

## Prompt

```text
<Role>
You are a reliability architect designing disaster recovery plans for critical production systems.

<Context>
- System: {{SYSTEM_NAME}}
- Business criticality: {{CRITICALITY}} (Tier 1 / Tier 2 / Tier 3)
- Current RTO/RPO: {{CURRENT_RTO_RPO}} (if known)
- Target RTO: {{TARGET_RTO}} (e.g., < 1h, < 4h, < 24h)
- Target RPO: {{TARGET_RPO}} (e.g., 0 data loss, < 15min, < 1h)
- Cloud: {{CLOUD}} (AWS / Azure / GCP / multi-cloud)
- Data stores: {{DATA_STORES}} (databases, object storage, etc.)

<Task>
Design a disaster recovery plan covering:

### 1. Business Impact Analysis
| Component | Criticality | Max Downtime | Data Loss Tolerance | Revenue Impact |
|-----------|-----------|-------------|-------------------|---------------|
| API Layer | Tier 1 | 15 min | 0 | $X/min |
| Database | Tier 1 | 15 min | 0 | $X/min |
| Queue System | Tier 1 | 30 min | 0 (durable) | Delayed processing |
| Cache | Tier 2 | 1 hour | Rebuildable | Degraded perf |
| Analytics | Tier 3 | 24 hours | < 1 hour | Reporting delay |

### 2. DR Strategy Selection
| Strategy | RTO | RPO | Cost | Complexity |
|----------|-----|-----|------|-----------|
| Backup & Restore | Hours | Hours | $ | Low |
| Pilot Light | 30-60 min | Minutes | $$ | Medium |
| Warm Standby | 15-30 min | Minutes | $$$ | Medium |
| Hot Standby / Active-Active | < 5 min | 0 | $$$$ | High |

### 3. Data Backup Strategy
- Database backup: Full daily + incremental every N hours + WAL/binlog shipping
- Object storage: Cross-region replication
- Configuration: Version-controlled + backup
- Secrets: Cross-region secret replication
- Backup encryption and integrity verification
- Retention policy (30d daily, 12mo monthly, 7yr annual)

### 4. Failover Architecture
- Primary → secondary region failover automation
- DNS failover (Route 53 health checks, Traffic Manager)
- Database failover (read replica promotion, multi-AZ)
- Queue and messaging failover
- Stateless service redeployment strategy
- Failover decision tree (automated vs. manual)

### 5. Recovery Procedures
- Step-by-step runbook for each DR scenario
- Communication plan (internal + external)
- Escalation matrix
- Data integrity verification post-recovery
- Failback procedure (return to primary)

### 6. DR Testing
| Test Type | Frequency | Scope | Duration |
|-----------|-----------|-------|----------|
| Tabletop exercise | Quarterly | Full | 2 hours |
| Component failover | Monthly | Individual | 1 hour |
| Full DR drill | Semi-annual | Complete failover | 4-8 hours |
| Chaos injection | Continuous | Random component | Ongoing |

### 7. Monitoring & Alerting
- Replication lag monitoring
- Backup job success/failure alerts
- DR environment health checks
- RPO/RTO measurement during incidents

<Constraints>
- DR plan must be tested at least semi-annually
- Backup integrity must be verified monthly (restore test)
- Failover must be executable by on-call engineer with runbook
- All procedures must be documented and version-controlled

<Output Format>
Structured markdown with BIA table, failover architecture diagram (Mermaid), recovery runbook, and DR test schedule.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{SYSTEM_NAME}}` | Yes | System name | `Core Banking Platform` |
| `{{CRITICALITY}}` | Yes | Business criticality | `Tier 1` |
| `{{TARGET_RTO}}` | Yes | Recovery time objective | `< 1 hour` |
| `{{TARGET_RPO}}` | Yes | Recovery point objective | `< 15 minutes` |
| `{{CLOUD}}` | No | Cloud provider | `AWS (us-east-1 primary, us-west-2 DR)` |
| `{{DATA_STORES}}` | No | Data stores in scope | `PostgreSQL, Redis, S3` |

## Composition

- **Precedes:** `devops-infrastructure-as-code`
- **Follows:** `system-high-level-design`, `gov-compliance-framework-design`
- **Combines with:** `devops-monitoring-observability`, `perf-chaos-resilience-testing`

## Tips & Variations

- **For AWS:** Use CloudFormation StackSets for multi-region DR infrastructure.
- **For databases:** Aurora Global Database or PostgreSQL logical replication for cross-region RPO < 1s.
- **For cost optimization:** Pilot light is the best cost/RTO trade-off for most applications.

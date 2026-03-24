---
id: "arch-strangler-fig"
version: "1.0.0"
category: "architecture-patterns"
complexity: "advanced"
tags: ["strangler-fig", "migration", "legacy-modernization", "incremental"]
depends-on: ["arch-microservices-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Strangler Fig Pattern

> Incrementally migrate a legacy system to a modern architecture by routing traffic through a facade that gradually replaces functionality.

## Metadata
- **Category:** `architecture-patterns`
- **Complexity:** `advanced`

## Context

Use this prompt when modernizing a legacy monolith without a risky big-bang rewrite.

- **Use case:** Monolith-to-microservices migration, technology stack upgrade, incremental modernization.
- **Prerequisites:** Running legacy system, target architecture vision, routing/proxy infrastructure.
- **Scope:** Migration strategy, routing facade, feature extraction sequencing, data migration, rollback plan.

## Prompt

```text
You are a Migration Architect specializing in legacy modernization. Design a Strangler Fig migration plan for the system described below.

**Project:** {{PROJECT_NAME}}
**Legacy System:** {{LEGACY_SYSTEM}}
**Target Architecture:** {{TARGET_ARCHITECTURE}}
**Migration Driver:** {{MIGRATION_DRIVER}} (e.g., scalability, maintainability, cost, compliance)
**Timeline:** {{TIMELINE}}

Produce a strangler fig migration plan that covers:

1. **Facade / Routing Layer**
   - API Gateway or reverse proxy that routes traffic to legacy or new services
   - Routing rules: path-based, header-based, percentage-based (canary)
   - Feature-flag integration for gradual cutover

2. **Feature Extraction Sequencing**
   - Inventory of legacy features/modules
   - Extraction priority matrix (business value × extraction difficulty)
   - Dependency graph — which modules must be extracted first
   - Batch sizing — how many features per migration wave

3. **Data Migration Strategy**
   - Dual-write during transition vs. change-data-capture (CDC)
   - Data synchronization direction (legacy → new, new → legacy, bidirectional)
   - Schema transformation mapping
   - Data validation and reconciliation

4. **Coexistence Rules**
   - Anti-corruption layer between legacy and new services
   - Shared authentication during transition
   - Transaction boundaries across old and new systems

5. **Testing & Validation**
   - Shadow traffic / dark launching
   - Contract tests between facade and services
   - Smoke tests after each cutover step
   - Performance comparison (legacy vs. new)

6. **Rollback Plan**
   - Route-level rollback (switch traffic back to legacy)
   - Data rollback considerations
   - Maximum rollback window per migration wave

7. **Decommission Criteria**
   - When to remove legacy code path
   - Traffic threshold (0% to legacy for N days)
   - Data archival from legacy system

**Constraints:**
- Zero downtime during migration
- No feature regression — new service must match legacy behavior before cutover
- Legacy and new systems must coexist for the duration of migration
- Each migration wave must be independently rollbackable

**Output Format:**
- Migration roadmap (Gantt or phased timeline)
- Extraction priority matrix
- Routing architecture diagram (Mermaid)
- Data migration strategy per feature
- Risk matrix with mitigations
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Yes | Project name | `Insurance Claims Platform` |
| `{{LEGACY_SYSTEM}}` | Yes | Description of legacy system | `.NET Framework 4.8 monolith, SQL Server, 500K LOC, 15 years old` |
| `{{TARGET_ARCHITECTURE}}` | Yes | Target state | `Microservices on .NET 8, PostgreSQL, Kubernetes` |
| `{{MIGRATION_DRIVER}}` | Yes | Primary reason for migration | `Scalability and team autonomy` |
| `{{TIMELINE}}` | No | Migration window | `18 months` |

## Example Output

```
Migration Roadmap (4 Waves):

Wave 1 (Months 1-4): Authentication & User Management
  ├── Extract User Service (new .NET 8 microservice)
  ├── Dual-write user data (legacy DB ↔ new DB via CDC)
  ├── Route /api/users/* → new User Service
  └── Rollback: Route back to legacy /api/users/*

Wave 2 (Months 4-8): Claims Intake
  ├── Extract Claims Intake Service
  ├── Anti-corruption layer for claims → legacy adjudication
  ├── Route /api/claims/new → new Claims Intake
  └── Legacy continues handling adjudication

Wave 3 (Months 8-13): Claims Adjudication
  ├── Extract Adjudication Service
  ├── Migrate historical claims data (batch + CDC)
  ├── Route /api/claims/review/* → new service
  └── Shadow traffic validation for 2 weeks before cutover

Wave 4 (Months 13-18): Reporting & Decommission
  ├── Extract Reporting Service
  ├── Decommission legacy claims paths
  ├── Archive legacy database
  └── Remove facade routing rules for migrated paths

Extraction Priority Matrix:
┌──────────────────┬────────────┬────────────┬──────────┐
│ Feature          │ Biz Value  │ Difficulty │ Priority │
├──────────────────┼────────────┼────────────┼──────────┤
│ User Management  │ Medium     │ Low        │ 1 (easy) │
│ Claims Intake    │ High       │ Medium     │ 2        │
│ Adjudication     │ High       │ High       │ 3        │
│ Reporting        │ Medium     │ Medium     │ 4        │
│ Billing          │ Low        │ High       │ 5 (last) │
└──────────────────┴────────────┴────────────┴──────────┘
```

## Composition

- **Precedes:** `devops-cicd-pipeline`, `devops-containerization`
- **Follows:** `system-high-level-design`, `system-trade-off-analysis`
- **Combines with:** `arch-microservices-design`, `arch-modular-monolith`, `db-migration-planning`
- **Overlay:** `overlays/{tech}/strangler-fig.overlay.md`

## Tips & Variations

- For database-heavy systems: "Use Change Data Capture (Debezium, DMS) for real-time data sync during transition."
- For frontend migration: "Apply strangler fig at the UI level using micro-frontends with a shell application."
- For risk-averse organizations: "Start with read-only features (reports, dashboards) to build migration confidence."

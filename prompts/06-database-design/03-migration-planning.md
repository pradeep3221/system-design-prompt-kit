---
id: "db-migration-planning"
version: "1.0.0"
category: "database-design"
complexity: "advanced"
tags: ["database", "migration", "zero-downtime", "schema-evolution"]
depends-on: ["db-schema-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Migration Planning

> Plan zero-downtime database migrations for production systems.

## Metadata
- **Category:** `database-design`
- **Complexity:** `advanced`

## Context

Use this prompt when planning schema changes to production databases.

- **Use case:** Adding/altering tables, zero-downtime migrations, data backfills.
- **Prerequisites:** Current schema, target schema, downtime constraints.
- **Scope:** Migration scripts, rollback plans, data transformation, deployment sequence.

## Prompt

```text
You are a database reliability engineer. Plan a zero-downtime migration for the following schema change.

**Current schema:**
```sql
{{CURRENT_SCHEMA}}
```

**Desired schema:**
```sql
{{TARGET_SCHEMA}}
```

**Constraints:**
- Database: {{DATABASE_TYPE}}
- Current row count: {{ROW_COUNT}}
- Zero downtime required: {{ZERO_DOWNTIME}} (yes/no)
- Application framework: {{FRAMEWORK}}

**Produce a migration plan with:**

### 1. Change Classification
Categorize each change:
- **Safe (online):** Additive, non-breaking (add nullable column, add index concurrently)
- **Careful:** Requires multi-step (rename column, change type via expand-contract)
- **Dangerous:** Breaking, data-loss risk (drop column, change constraint)

### 2. Step-by-Step Migration Sequence
For each step:
1. Migration SQL
2. Application code change (if needed)
3. Rollback SQL
4. Verification query
5. Estimated duration at {{ROW_COUNT}} rows

### 3. Expand-Contract Pattern (for breaking changes)
- **Expand:** Add new structure alongside old
- **Migrate:** Dual-write to both, backfill historical data
- **Contract:** Remove old structure after verification

### 4. Data Backfill Strategy
- Batch size and throttling
- Progress tracking
- Validation queries (row counts, checksums)

### 5. Rollback Plan
For each step, provide:
- Rollback SQL
- Data restoration procedure
- Decision criteria for triggering rollback

### 6. Testing Checklist
- [ ] Migration tested against production-sized dataset
- [ ] Rollback tested
- [ ] Application compatible with both old and new schema
- [ ] Performance benchmarked after migration
- [ ] Backup taken before migration
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{DATABASE_TYPE}}` | Database engine | `PostgreSQL`, `MySQL` |
| `{{CURRENT_SCHEMA}}` | Current DDL | Current CREATE TABLE statements |
| `{{TARGET_SCHEMA}}` | Desired DDL | Target CREATE TABLE statements |
| `{{ROW_COUNT}}` | Table size | `100 million rows` |
| `{{FRAMEWORK}}` | ORM/migration tool | `Prisma`, `EF Core`, `Alembic`, `Flyway` |
| `{{ZERO_DOWNTIME}}` | Downtime constraint | `yes` |

## Tips & Variations

- For large tables: "Include pg_repack or pt-online-schema-change considerations."
- Add: "Generate the migration files for {{FRAMEWORK}}."

## Composition

- **Precedes:** `devops-cicd-pipeline`
- **Follows:** `db-schema-design`, `db-indexing-strategy`
- **Combines with:** `testing-integration`
- **Overlay:** `overlays/{tech}/db-migration.overlay.md`

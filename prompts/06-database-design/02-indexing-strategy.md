---
id: "db-indexing-strategy"
version: "1.0.0"
category: "database-design"
complexity: "intermediate"
tags: ["database", "indexing", "performance", "query-optimization"]
depends-on: ["db-schema-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Indexing Strategy

> Design an optimal indexing strategy based on query patterns and performance requirements.

## Metadata
- **Category:** `database-design`
- **Complexity:** `intermediate`

## Context

Use this prompt when optimizing database query performance through indexing.

- **Use case:** Slow query investigation, schema optimization, query-driven index design.
- **Prerequisites:** Schema design, top query patterns, read/write ratio.
- **Scope:** Index types, composite indexes, covering indexes, partial indexes, maintenance.

## Prompt

```text
You are a database performance engineer. Design an indexing strategy for the {{TABLE_NAME}} table in {{DATABASE_TYPE}}.

**Table schema:**
```sql
{{TABLE_DDL}}
```

**Query patterns (ordered by frequency):**
{{QUERY_PATTERNS}}

**Design the following:**

### 1. Index Recommendations

| Index Name | Columns | Type | Justification | Queries Served |
|-----------|---------|------|--------------|---------------|
| | | B-tree / Hash / GIN / GiST | | Q1, Q3 |

### 2. Composite Index Design
- Column ordering rationale (selectivity, equality-first, range-last)
- Covering indexes to avoid table lookups
- Partial/filtered indexes for subset queries

### 3. Index vs. Query Plan Analysis
For each critical query:
- Expected execution plan WITH the index
- Estimated improvement (full scan → index seek)
- Conditions where the index would NOT be used

### 4. Write Performance Impact
- Index maintenance overhead per INSERT/UPDATE/DELETE
- Acceptable trade-off for the read:write ratio ({{READ_WRITE_RATIO}})

### 5. Storage Estimate
- Estimated index size based on row count ({{ROW_COUNT}})
- Total index storage budget

### 6. Anti-Patterns to Avoid
- Over-indexing (too many indexes on a write-heavy table)
- Redundant indexes (index on A is redundant if A,B composite exists)
- Indexing low-cardinality columns alone
- Not using index-only scans when possible

### 7. Monitoring
- Queries to detect unused indexes
- Queries to find missing indexes (slow query log analysis)
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{DATABASE_TYPE}}` | Database engine | `PostgreSQL`, `MySQL` |
| `{{TABLE_NAME}}` | Target table | `orders` |
| `{{TABLE_DDL}}` | Table schema | CREATE TABLE statement |
| `{{QUERY_PATTERNS}}` | Common queries | `Q1: SELECT by user_id + status; Q2: COUNT by date range` |
| `{{READ_WRITE_RATIO}}` | Read vs write ratio | `10:1` |
| `{{ROW_COUNT}}` | Expected rows | `50 million` |

## Tips & Variations

- For full-text search: "Include GIN/GiST index design for text search columns."
- Add: "Generate EXPLAIN ANALYZE examples for before/after comparison."

## Composition

- **Precedes:** `db-query-optimization`
- **Follows:** `db-schema-design`
- **Combines with:** `perf-performance-profiling`
- **Overlay:** `overlays/{tech}/db-indexing.overlay.md`

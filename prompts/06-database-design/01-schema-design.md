---
id: "db-schema-design"
version: "1.0.0"
category: "database-design"
complexity: "intermediate"
tags: ["database", "schema", "erd", "normalization", "ddl"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Schema Design

> Design a database schema from business requirements with proper normalization and relationships.

## Metadata
- **Category:** `database-design`
- **Complexity:** `intermediate`

## Prompt

```text
You are a database architect. Design a {{DATABASE_TYPE}} schema for the {{DOMAIN}} domain.

**Business requirements:**
{{REQUIREMENTS}}

**Design the following:**

### 1. Entity-Relationship Analysis
- Identify all entities and their attributes.
- Define relationships (1:1, 1:N, M:N) with cardinality.
- Identify required vs. optional fields.
- Define natural keys vs. surrogate keys.

### 2. Normalization
- Start with 3NF (Third Normal Form).
- Document any intentional denormalization with justification.
- Identify derived/computed fields and where to store them.

### 3. Schema DDL
Provide complete DDL with:
- Table definitions with columns, types, and constraints
- Primary keys and foreign keys
- Unique constraints and check constraints
- Default values
- Indexes (primary, unique, composite)
- Following the naming conventions: `snake_case`, `pk_`, `fk_`, `idx_`, `uq_`, `ck_`

### 4. Audit Fields
Every table should include:
- `created_at TIMESTAMP NOT NULL DEFAULT NOW()`
- `updated_at TIMESTAMP NOT NULL DEFAULT NOW()`
- `created_by` and `updated_by` (if user tracking needed)
- Soft delete: `deleted_at TIMESTAMP NULL`

### 5. Seed Data
Provide INSERT statements for lookup/reference tables and sample data.

### 6. ER Diagram
Describe the ER diagram in Mermaid syntax for visualization.

### 7. Migration File
Generate the initial migration file following the framework convention.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{DATABASE_TYPE}}` | Database system | `PostgreSQL`, `MySQL`, `SQL Server` |
| `{{DOMAIN}}` | Business domain | `e-commerce`, `healthcare`, `SaaS` |
| `{{REQUIREMENTS}}` | Business requirements | `Users can place orders with multiple items, apply coupons, choose shipping methods` |

## Tips & Variations

- For NoSQL: "Design a MongoDB document schema with embedding vs. referencing decisions."
- Add: "Include a data dictionary with field descriptions and business rules."

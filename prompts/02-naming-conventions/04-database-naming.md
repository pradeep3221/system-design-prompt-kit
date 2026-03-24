---
id: "naming-database"
version: "1.0.0"
category: "naming-conventions"
complexity: "intermediate"
tags: ["naming", "database", "sql", "schema", "tables"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Database Naming Conventions

> Standardize naming for tables, columns, indexes, constraints, and stored procedures.

## Metadata
- **Category:** `naming-conventions`
- **Complexity:** `intermediate`

## Context

Use when designing database schemas to ensure consistent table, column, and constraint naming.

- **Use case:** Schema design, migration planning, cross-team database standards
- **Prerequisites:** Database engine and domain model identified
- **Scope:** Naming only; pair with `db-schema-design` for full schema design

## Prompt

```text
You are a database architect. Create a comprehensive naming convention guide for a {{DATABASE_TYPE}} database serving a {{DOMAIN}} application.

**Cover these areas:**

### 1. Table Names
- Use snake_case and plural nouns: `user_accounts`, `order_items`
- Junction/association tables: `user_roles`, `order_product` (alphabetical or domain-logical order)
- Audit tables: `order_audit_log`
- Lookup/reference tables: `ref_country`, `ref_currency`

### 2. Column Names
- Use snake_case: `first_name`, `created_at`
- Primary keys: `id` or `{table_singular}_id`
- Foreign keys: `{referenced_table_singular}_id` (e.g., `user_id`)
- Boolean columns: `is_active`, `has_verified_email`
- Timestamps: `created_at`, `updated_at`, `deleted_at`
- Monetary values: `price_cents` (store as integer) or `amount` with `currency_code`
- Status columns: `status` with enum or lookup reference

### 3. Index Names
- Pattern: `idx_{table}_{column(s)}` → `idx_users_email`
- Unique indexes: `uq_{table}_{column(s)}` → `uq_users_email`
- Composite indexes: `idx_{table}_{col1}_{col2}`

### 4. Constraint Names
- Primary key: `pk_{table}` → `pk_users`
- Foreign key: `fk_{table}_{referenced_table}` → `fk_orders_users`
- Unique: `uq_{table}_{column}` → `uq_users_email`
- Check: `ck_{table}_{column}` → `ck_orders_quantity_positive`
- Default: `df_{table}_{column}` → `df_users_is_active`

### 5. Stored Procedures / Functions
- Pattern: `{action}_{entity}` → `get_user_by_email`, `create_order`
- Triggers: `trg_{table}_{timing}_{event}` → `trg_orders_after_insert`

### 6. Views
- Pattern: `vw_{description}` → `vw_active_user_orders`

### 7. Migrations
- Pattern: `{timestamp}_{description}` → `20260324_add_email_to_users`

**Provide a complete example schema (5-6 tables) for the {{DOMAIN}} domain demonstrating all conventions.**
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{DATABASE_TYPE}}` | Database system | `PostgreSQL`, `MySQL`, `SQL Server` |
| `{{DOMAIN}}` | Application domain | `e-commerce`, `SaaS platform`, `CMS` |

## Tips & Variations

- Add: "Generate the DDL statements using these conventions."
- For NoSQL: "Adapt these conventions for MongoDB collection and field naming."

## Composition

- **Precedes:** `db-schema-design`, `db-migration-planning`
- **Follows:** `naming-general-guide`
- **Combines with:** `db-schema-design`, `naming-general-guide`, `db-indexing-strategy`
- **Overlay:** Technology overlays available in `overlays/`

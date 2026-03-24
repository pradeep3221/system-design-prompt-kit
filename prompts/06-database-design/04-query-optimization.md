# Query Optimization

> Analyze slow queries and provide optimization recommendations with execution plan analysis.

## Category
`database-design`

## Complexity
`intermediate`

## Prompt

```text
You are a database performance tuning expert. Optimize the following slow query.

**Database:** {{DATABASE_TYPE}}
**Query:**
```sql
{{SLOW_QUERY}}
```

**Context:**
- Table sizes: {{TABLE_SIZES}}
- Current execution time: {{CURRENT_TIME}}
- Target execution time: {{TARGET_TIME}}
- Existing indexes: {{EXISTING_INDEXES}}

**Provide:**

### 1. Query Analysis
- Identify the most expensive operations (full scans, sorts, joins).
- Estimate rows scanned vs. rows returned.
- Identify implicit type conversions or function calls preventing index use.

### 2. Optimization Techniques (apply in order)
1. **Index optimization:** New or modified indexes
2. **Query rewrite:** Restructure the SQL for better plans
3. **Join optimization:** Join order, type (nested loop, hash, merge)
4. **Subquery elimination:** Convert correlated subqueries to JOINs or CTEs
5. **Predicate pushdown:** Move filters earlier in execution
6. **Pagination optimization:** Keyset pagination vs. OFFSET

### 3. Optimized Query
Provide the rewritten query with comments explaining each change.

### 4. Index Recommendations
New indexes required, with estimated size and maintenance cost.

### 5. Before/After Comparison

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Execution time | | | |
| Rows scanned | | | |
| Buffer reads | | | |
| Index usage | | | |

### 6. Application-Level Optimizations
- Caching opportunities
- Batching / prefetching
- Denormalization trade-offs
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{DATABASE_TYPE}}` | Database engine | `PostgreSQL`, `MySQL`, `SQL Server` |
| `{{SLOW_QUERY}}` | The query to optimize | SQL statement |
| `{{TABLE_SIZES}}` | Row counts | `users: 1M, orders: 10M, order_items: 50M` |
| `{{CURRENT_TIME}}` | Current execution time | `4.2 seconds` |
| `{{TARGET_TIME}}` | Target time | `< 100ms` |
| `{{EXISTING_INDEXES}}` | Current indexes | List of existing indexes |

## Tips & Variations

- Add: "Include the EXPLAIN ANALYZE output interpretation."
- For ORM users: "Show the optimized query as ORM code ({{ORM_NAME}})."

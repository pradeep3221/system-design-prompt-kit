# CQRS Pattern

> Design a Command Query Responsibility Segregation architecture with separate read and write models.

## Category
`architecture-patterns`

## Complexity
`advanced`

## Prompt

```text
You are a CQRS/ES architect. Design a CQRS implementation for the {{COMPONENT_NAME}} component of {{SYSTEM_NAME}}.

**Why CQRS?** {{JUSTIFICATION}} (e.g., high read:write ratio, complex queries, different scaling needs)

**Design the following:**

### 1. Command Side (Write Model)
- Command definitions (name, payload, validation rules)
- Command handlers with business logic
- Aggregate design (aggregate root, entities, value objects)
- Domain event generation on state changes
- Write-optimized data store selection

### 2. Query Side (Read Model)
- Query definitions (name, parameters, response shape)
- Read model / projection design (denormalized views)
- Read-optimized data store selection (SQL views, Elasticsearch, Redis)
- Materialized view update strategy

### 3. Synchronization
- How read models are updated from write-side events
- Eventual consistency window and SLA
- Failure handling during projection updates
- Rebuild/replay strategy for read models

### 4. Example Flow
Walk through a complete use case:
1. Client sends Command → API
2. Command validated → Command Handler
3. Aggregate loaded → Business rules applied
4. Domain Event emitted → Event Store
5. Event projected → Read Model updated
6. Client queries Read Model → Response

### 5. When NOT to Use CQRS
- Simple CRUD with uniform read/write patterns
- Small-scale applications
- Team lacks experience (complexity budget)

Provide implementation code in {{LANGUAGE}}/{{FRAMEWORK}}.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SYSTEM_NAME}}` | Parent system | `E-Commerce Platform` |
| `{{COMPONENT_NAME}}` | Component applying CQRS | `Product Catalog` |
| `{{JUSTIFICATION}}` | Why CQRS is needed | `Read traffic is 1000x writes, complex search queries needed` |
| `{{LANGUAGE}}` | Implementation language | `C#`, `TypeScript`, `Java` |
| `{{FRAMEWORK}}` | Framework | `ASP.NET + MediatR`, `NestJS`, `Spring Boot + Axon` |

## Tips & Variations

- Add: "Combine with Event Sourcing for full audit trail."
- For simpler needs: "Design a lightweight CQRS with separate read/write repositories but shared database."

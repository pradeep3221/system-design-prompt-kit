---
id: "graphql-resolver-patterns"
version: "1.0.0"
category: "api-design/graphql"
complexity: "intermediate"
tags: ["graphql", "resolvers", "dataloader", "n+1"]
depends-on: ["graphql-schema-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# GraphQL Resolver Patterns

> Design efficient resolver implementations with DataLoader patterns, error handling, and authorization.

## Metadata
- **Category:** `api-design/graphql`
- **Complexity:** `intermediate`

## Context

Use this prompt when implementing resolvers for a GraphQL schema.

- **Use case:** New resolver implementation, fixing N+1 queries, adding field-level authorization.
- **Prerequisites:** GraphQL schema (SDL), data source access patterns, auth requirements.
- **Scope:** Resolver architecture, DataLoader setup, error handling, authorization middleware.

## Prompt

```text
You are a GraphQL backend engineer specializing in efficient resolver design. Design the resolver architecture for the GraphQL schema below.

**Project:** {{PROJECT_NAME}}
**Schema:** {{SCHEMA_SDL}}
**Data Sources:** {{DATA_SOURCES}}
**Framework:** {{FRAMEWORK}} (e.g., Apollo Server, GraphQL Yoga, Strawberry, Hot Chocolate)

Design a resolver architecture that covers:

1. **Resolver Map** — Resolver functions for all types, queries, and mutations
2. **DataLoader Setup** — Batch loaders for all N+1-prone relationships
3. **Context Factory** — Request-scoped context with auth, DataLoaders, services
4. **Error Handling** — Typed error responses using union types or error extensions
5. **Authorization** — Field-level auth using directives or middleware
6. **Input Validation** — Mutation input validation with descriptive errors
7. **Pagination** — Cursor-based pagination resolver logic (Relay connections)

**Constraints:**
- Prevent N+1 queries — every relationship field must use a DataLoader
- Never expose internal errors to clients
- Authorization checks must happen at the resolver level, not the data layer
- Use transactions for mutations that modify multiple entities
- Log all mutations for audit trail

**Output Format:**
- Resolver architecture diagram
- DataLoader definitions with batch functions
- Example resolver code for key types
- Error handling pattern with examples
- Authorization middleware setup
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Yes | Project name | `E-Commerce Platform` |
| `{{SCHEMA_SDL}}` | Yes | GraphQL schema SDL | (paste schema) |
| `{{DATA_SOURCES}}` | Yes | Backing data sources | `PostgreSQL via Prisma, Redis cache` |
| `{{FRAMEWORK}}` | Yes | GraphQL server framework | `Apollo Server v4` |

## Example Output

```
Resolver Architecture:
├── resolvers/
│   ├── Query/
│   │   ├── product.ts      # product(id) resolver
│   │   └── products.ts     # products(filter, pagination) resolver
│   ├── Mutation/
│   │   ├── createProduct.ts
│   │   └── updateProduct.ts
│   ├── Product/
│   │   ├── seller.ts       # Uses userLoader
│   │   └── reviews.ts      # Uses reviewsByProductLoader + pagination
│   └── index.ts            # Merged resolver map
├── dataloaders/
│   ├── userLoader.ts       # Batch: SELECT * FROM users WHERE id IN (...)
│   ├── reviewsByProductLoader.ts
│   └── index.ts            # DataLoader factory
└── middleware/
    ├── auth.ts             # @auth directive implementation
    └── validation.ts       # Input validation middleware
```

## Composition

- **Precedes:** `graphql-security`, `testing-unit`
- **Follows:** `graphql-schema-design`
- **Combines with:** `db-query-optimization`, `coding-error-handling`
- **Overlay:** `overlays/{tech}/graphql-resolvers.overlay.md`

## Tips & Variations

- For federated subgraphs: "Add __resolveReference for entity types."
- For subscriptions: "Use PubSub pattern with Redis for horizontal scaling."
- For caching: "Add @cacheControl directives and response caching."

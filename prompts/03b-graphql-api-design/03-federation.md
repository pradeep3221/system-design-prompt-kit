---
id: "graphql-federation"
version: "1.0.0"
category: "api-design/graphql"
complexity: "advanced"
tags: ["graphql", "federation", "subgraphs", "gateway", "microservices"]
depends-on: ["graphql-schema-design", "graphql-resolver-patterns", "arch-microservices-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# GraphQL Federation

> Design a federated GraphQL architecture with subgraph composition, entity resolution, and gateway configuration.

## Metadata
- **Category:** `api-design/graphql`
- **Complexity:** `advanced`

## Context

Use this prompt when building a distributed GraphQL API across multiple services.

- **Use case:** Microservices GraphQL unification, team-autonomous subgraphs, gradual schema migration.
- **Prerequisites:** Existing microservices or domain boundaries, GraphQL schema basics, federation spec knowledge.
- **Scope:** Subgraph design, entity ownership, gateway composition, cross-service queries.

## Prompt

```text
You are a Senior API Architect specializing in GraphQL Federation. Design a federated GraphQL architecture for the system described below.

**Project:** {{PROJECT_NAME}}
**Domain Services:** {{SERVICES}}
**Current API Surface:** {{CURRENT_API}}
**Federation Version:** {{FEDERATION_VERSION}} (e.g., Apollo Federation v2, WunderGraph, Mesh)

Produce a federation architecture that covers:

1. **Subgraph Decomposition** — Assign schema types and fields to owning subgraphs
2. **Entity Design** — Define entity keys, `@key` directives, and `__resolveReference` implementations
3. **Cross-Service Fields** — Use `@external`, `@provides`, `@requires` for cross-subgraph field dependencies
4. **Gateway Configuration** — Supergraph composition, query planning, error propagation
5. **Schema Evolution** — Contracts, `@override`, `@inaccessible` for safe migration
6. **Observability** — Distributed tracing across subgraph hops, query plan logging
7. **Performance** — Query plan optimization, subgraph batching, entity caching

**Constraints:**
- Each domain team owns exactly one subgraph
- Breaking schema changes must go through composition checks in CI
- Gateway must support graceful degradation when a subgraph is unavailable
- Latency budget: ≤ 200ms p95 for composed queries spanning ≤ 3 subgraphs
- All subgraphs must expose health and readiness endpoints

**Output Format:**
- Subgraph ownership matrix (type → owning subgraph)
- Entity key definitions with SDL examples
- Gateway composition diagram (Mermaid)
- Query plan example for cross-subgraph query
- CI composition-check pipeline
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Yes | Project name | `Marketplace Platform` |
| `{{SERVICES}}` | Yes | Domain services/teams | `Users, Products, Orders, Reviews, Payments` |
| `{{CURRENT_API}}` | No | Existing API surface | `REST monolith, migrating to GraphQL` |
| `{{FEDERATION_VERSION}}` | Yes | Federation tooling | `Apollo Federation v2` |

## Example Output

```
Subgraph Ownership Matrix:
┌─────────────┬─────────────────────────────────────┐
│ Subgraph    │ Owned Types                         │
├─────────────┼─────────────────────────────────────┤
│ users       │ User, Address, UserPreferences       │
│ products    │ Product, Category, ProductVariant     │
│ orders      │ Order, OrderItem, Shipment            │
│ reviews     │ Review, Rating (extends Product)      │
│ payments    │ Payment, Invoice (extends Order)       │
└─────────────┴─────────────────────────────────────┘

Entity Key Examples:

  # users subgraph
  type User @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
  }

  # reviews subgraph — extends User entity
  type User @key(fields: "id") {
    id: ID! @external
    reviews: [Review!]!
  }

  # reviews subgraph — extends Product entity
  type Product @key(fields: "id") {
    id: ID! @external
    averageRating: Float @requires(fields: "id")
    reviews: [Review!]!
  }
```

## Composition

- **Precedes:** `devops-cicd-pipeline`, `devops-monitoring-observability`
- **Follows:** `graphql-schema-design`, `graphql-resolver-patterns`, `arch-microservices-design`
- **Combines with:** `system-high-level-design`, `system-scalability-analysis`
- **Overlay:** `overlays/{tech}/graphql-federation.overlay.md`

## Tips & Variations

- For migration from monolith: "Use `@override` to gradually move fields to new subgraphs."
- For schema contracts: "Define public/partner/internal contracts using `@tag` and `@inaccessible`."
- For performance: "Enable query plan caching and automatic persisted queries at the gateway."

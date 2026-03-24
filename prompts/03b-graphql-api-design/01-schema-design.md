---
id: "graphql-schema-design"
version: "1.0.0"
category: "api-design/graphql"
complexity: "intermediate"
tags: ["graphql", "api", "schema", "types"]
depends-on: ["system-low-level-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# GraphQL Schema Design

> Design a complete GraphQL schema with types, queries, mutations, and subscriptions for a domain.

## Metadata
- **Category:** `api-design/graphql`
- **Complexity:** `intermediate`

## Context

Use this prompt when designing a new GraphQL API or migrating from REST to GraphQL.

- **Use case:** New GraphQL API, BFF (Backend for Frontend) layer, mobile API optimization.
- **Prerequisites:** Domain model, client data requirements, existing data sources.
- **Scope:** Type definitions, query/mutation design, input types, enums, interfaces, unions.

## Prompt

```text
You are a GraphQL API architect specializing in schema-first design. Design a complete GraphQL schema for the domain described below.

**Project:** {{PROJECT_NAME}}
**Domain:** {{DOMAIN_DESCRIPTION}}
**Primary Consumers:** {{CONSUMERS}} (e.g., web app, mobile app, third-party)
**Existing Data Sources:** {{DATA_SOURCES}} (e.g., PostgreSQL, REST APIs, microservices)

Design a GraphQL schema that includes:

1. **Object Types** — All domain entities with fields, descriptions, and nullability
2. **Query Type** — Root queries for fetching data (single, list, search)
3. **Mutation Type** — Mutations for creating, updating, and deleting data
4. **Input Types** — Dedicated input types for mutations (never reuse object types)
5. **Enums** — All enumerable values as GraphQL enums
6. **Interfaces / Unions** — Where polymorphism is needed
7. **Connection Types** — Relay-style cursor pagination for lists
8. **Subscriptions** — Real-time updates where applicable
9. **Custom Scalars** — DateTime, URL, Email, JSON where needed
10. **Error Handling** — Union types for result types (Success | Error pattern)

**Constraints:**
- Follow GraphQL naming conventions (PascalCase types, camelCase fields)
- Use Relay connection specification for pagination
- Include field-level descriptions for documentation
- Design for N+1 prevention (consider DataLoader patterns)
- Keep mutations granular and named as verbs (createUser, updateOrderStatus)

**Output Format:**
- SDL (Schema Definition Language) with comments
- Example queries for each root query
- Example mutations with variables
- Schema diagram (Mermaid)
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Yes | Project or API name | `E-Commerce Platform` |
| `{{DOMAIN_DESCRIPTION}}` | Yes | Business domain description | `Online marketplace with sellers, products, orders, and reviews` |
| `{{CONSUMERS}}` | Yes | Who will consume this API | `React SPA, React Native mobile app` |
| `{{DATA_SOURCES}}` | No | Backing data services | `PostgreSQL, Elasticsearch, Payment microservice` |

## Example Output

```graphql
"""
A product available for purchase in the marketplace.
"""
type Product implements Node {
  id: ID!
  name: String!
  description: String!
  price: Money!
  status: ProductStatus!
  seller: User!
  reviews(first: Int, after: String): ReviewConnection!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Query {
  """Fetch a single product by ID."""
  product(id: ID!): Product

  """Search products with filtering and pagination."""
  products(
    filter: ProductFilter
    first: Int = 20
    after: String
  ): ProductConnection!
}

type Mutation {
  """Create a new product listing."""
  createProduct(input: CreateProductInput!): CreateProductPayload!

  """Update an existing product."""
  updateProduct(input: UpdateProductInput!): UpdateProductPayload!
}

union CreateProductPayload = CreateProductSuccess | ValidationError
```

## Composition

- **Precedes:** `graphql-resolver-patterns`, `graphql-security`
- **Follows:** `system-low-level-design`
- **Combines with:** `db-schema-design`, `naming-api-url`
- **Overlay:** `overlays/{tech}/graphql-schema.overlay.md`

## Tips & Variations

- For Relay clients: "Ensure all types implement the Node interface with a global ID."
- For schema-first: "Generate resolvers and TypeScript types from the SDL using GraphQL Code Generator."
- For federation: "Design as a subgraph with @key directives for entity types."

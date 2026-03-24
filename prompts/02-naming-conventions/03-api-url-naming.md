---
id: "naming-api-url"
version: "1.0.0"
category: "naming-conventions"
complexity: "intermediate"
tags: ["naming", "api", "rest", "urls", "endpoints"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# API & URL Naming Conventions

> Establish consistent naming patterns for REST API endpoints, query parameters, headers, and payloads.

## Metadata
- **Category:** `naming-conventions`
- **Complexity:** `intermediate`

## Context

Use when designing REST API URL structures, route naming, or query parameter conventions.

- **Use case:** API design kickoff, URL structure standardization, API review
- **Prerequisites:** Resource model or domain entities identified
- **Scope:** URL/route naming only; pair with `api-rest-endpoint-design` for full endpoint design

## Prompt

```text
You are an API design expert. Create a comprehensive naming convention guide for the REST API of {{PROJECT_NAME}}.

**Cover these areas:**

### 1. URL Path Naming
- Use lowercase with hyphens: `/user-profiles`, NOT `/userProfiles` or `/user_profiles`
- Use plural nouns for collections: `/orders`, NOT `/order`
- Use nouns, not verbs: `/orders` (GET), NOT `/getOrders`
- Nested resources: `/users/{userId}/orders/{orderId}`
- Maximum nesting depth recommendation (2-3 levels)
- Action endpoints (when REST verbs aren't enough): `/orders/{id}/cancel`

### 2. Query Parameter Naming
- Use camelCase: `?sortBy=createdAt&pageSize=20`
- Standard pagination: `page`, `pageSize`, `offset`, `limit`
- Standard filtering: `filter[status]=active`, or `status=active`
- Standard sorting: `sort=createdAt:desc`
- Standard searching: `q=search+term`
- Field selection: `fields=id,name,email`

### 3. Request/Response Body Field Naming
- Use camelCase for JSON: `firstName`, `createdAt`
- Use consistent date format: ISO 8601 (`2026-01-01T00:00:00Z`)
- Boolean fields: `isActive`, `hasPermission`, `canEdit`
- ID fields: `id`, `userId`, `orderId` (consistent suffix)
- Enum values: `UPPER_SNAKE_CASE` or `kebab-case` (pick one, be consistent)

### 4. Header Naming
- Custom headers: `X-Request-Id`, `X-Correlation-Id` (or without X- prefix per RFC 6648)
- Standard headers: `Authorization`, `Content-Type`, `Accept`

### 5. API Versioning Naming
- URL path: `/api/v1/...`
- Header: `Accept: application/vnd.myapi.v1+json`
- Query param: `?version=1`
- Recommendation with rationale

**For the domain {{DOMAIN}}, provide 10 example endpoints following all these conventions.**
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | The API project | `E-Commerce Platform API` |
| `{{DOMAIN}}` | Business domain | `e-commerce`, `healthcare`, `fintech` |

## Tips & Variations

- Add: "Include a naming consistency checker script that validates OpenAPI specs."
- For GraphQL: "Adapt these conventions for GraphQL queries, mutations, and subscriptions."

## Composition

- **Precedes:** `api-rest-endpoint-design`, `api-rest-versioning`
- **Follows:** `naming-general-guide`
- **Combines with:** `api-rest-endpoint-design`, `naming-general-guide`, `docs-api`
- **Overlay:** Technology overlays available in `overlays/`

---
id: "graphql-security"
version: "1.0.0"
category: "api-design/graphql"
complexity: "advanced"
tags: ["graphql", "security", "rate-limiting", "query-depth", "persisted-queries"]
depends-on: ["graphql-schema-design", "graphql-resolver-patterns", "security-owasp-top-10"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# GraphQL Security

> Harden a GraphQL API against query abuse, injection, information leakage, and authorization bypass.

## Metadata
- **Category:** `api-design/graphql`
- **Complexity:** `advanced`

## Context

Use this prompt when securing a GraphQL API for production deployment.

- **Use case:** Security hardening before launch, penetration-test remediation, compliance audit.
- **Prerequisites:** Working GraphQL schema and resolvers, authentication mechanism in place.
- **Scope:** Query complexity limits, authorization model, introspection control, transport security.

## Prompt

```text
You are a Security Engineer specializing in GraphQL API security. Perform a comprehensive security review and produce a hardening plan for the GraphQL API described below.

**Project:** {{PROJECT_NAME}}
**Schema:** {{SCHEMA_SDL}}
**Server Framework:** {{FRAMEWORK}}
**Auth Mechanism:** {{AUTH_MECHANISM}} (e.g., JWT, OAuth2, session)
**Deployment:** {{DEPLOYMENT}} (e.g., AWS Lambda, Kubernetes, Cloud Run)

Produce a hardening plan covering:

1. **Query Complexity & Depth Limiting**
   - Maximum query depth (recommend: 10)
   - Maximum query complexity score with field-level cost analysis
   - Operation timeout enforcement

2. **Rate Limiting**
   - Per-client query rate limits
   - Complexity-based rate limiting (cost budget per window)
   - Mutation-specific throttling

3. **Introspection Control**
   - Disable introspection in production
   - Selective introspection for internal tools (allowlisted clients)

4. **Persisted Queries / Allowlisted Operations**
   - Automatic persisted queries (APQ) setup
   - Operation safelisting for zero-trust environments

5. **Authorization**
   - Field-level authorization matrix (role → fields)
   - `@auth` directive or middleware implementation
   - Prevent unauthorized data access through nested traversals

6. **Input Validation**
   - Custom scalar validation (email, URL, UUID)
   - Mutation input size limits
   - File upload security (if applicable)

7. **Information Leakage Prevention**
   - Error message sanitization (no stack traces, no internal paths)
   - Disable GraphQL suggestions in production
   - Schema hiding for non-authenticated clients

8. **Transport Security**
   - HTTPS enforcement, HSTS headers
   - CORS configuration (origin allowlist, no wildcard)
   - CSRF protection for cookie-based auth

**Constraints:**
- OWASP API Security Top 10 compliance required
- PII fields must have explicit access-control annotations
- All rejected queries must be logged with client ID and query hash
- No breaking changes to existing client operations

**Output Format:**
- Security configuration code for the server framework
- Authorization matrix table
- Rate limiting configuration
- Security checklist with pass/fail status
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Yes | Project name | `FinTech Dashboard API` |
| `{{SCHEMA_SDL}}` | No | Schema SDL for review | (paste schema) |
| `{{FRAMEWORK}}` | Yes | GraphQL server framework | `Apollo Server v4` |
| `{{AUTH_MECHANISM}}` | Yes | Authentication mechanism | `JWT via Auth0` |
| `{{DEPLOYMENT}}` | Yes | Deployment environment | `Kubernetes on GKE` |

## Example Output

```
GraphQL Security Hardening Checklist:

 ✅ Query depth limit .............. max 10 levels
 ✅ Query complexity limit ......... max 1000 cost units
 ✅ Operation timeout .............. 30s
 ✅ Rate limit (per client) ........ 100 req/min + 5000 cost/min
 ✅ Introspection .................. disabled (prod), enabled (dev)
 ✅ Persisted queries .............. APQ enabled, safelist in staging
 ✅ Field-level auth ............... @auth directive on 47 fields
 ✅ Error sanitization ............. generic messages, internal logging
 ✅ CORS ........................... allowlist: [app.example.com]
 ✅ CSRF ........................... SameSite=Strict + CSRF token
 ✅ HTTPS .......................... enforced, HSTS max-age=31536000

Authorization Matrix (excerpt):
┌──────────────────┬───────┬─────────┬───────┐
│ Field            │ Admin │ Member  │ Guest │
├──────────────────┼───────┼─────────┼───────┤
│ User.email       │  ✅   │  self   │  ❌   │
│ User.orders      │  ✅   │  self   │  ❌   │
│ Order.payment    │  ✅   │  self   │  ❌   │
│ Product.price    │  ✅   │  ✅     │  ✅   │
│ Mutation.delete* │  ✅   │  ❌     │  ❌   │
└──────────────────┴───────┴─────────┴───────┘
```

## Composition

- **Precedes:** `devops-monitoring-observability`, `testing-e2e`
- **Follows:** `graphql-schema-design`, `graphql-resolver-patterns`, `security-owasp-top-10`
- **Combines with:** `security-authentication`, `security-input-validation`, `api-rest-security`
- **Overlay:** `overlays/{tech}/graphql-security.overlay.md`

## Tips & Variations

- For public APIs: "Add automatic persisted queries AND a query safelist for defense in depth."
- For real-time (subscriptions): "Apply per-connection rate limits and authenticate WebSocket upgrade."
- For multi-tenant systems: "Add tenant-scoped field authorization and query isolation."

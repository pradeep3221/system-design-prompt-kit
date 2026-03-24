---
id: "arch-bff-pattern"
version: "1.0.0"
category: "architecture-patterns"
complexity: "intermediate"
tags: ["bff", "backend-for-frontend", "api-gateway", "aggregation"]
depends-on: ["arch-microservices-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Backend-for-Frontend (BFF) Pattern

> Design dedicated backend services tailored to specific frontend clients with optimized data aggregation.

## Metadata
- **Category:** `architecture-patterns`
- **Complexity:** `intermediate`

## Context

Use this prompt when different frontend clients (web, mobile, IoT) need different API shapes from the same backend services.

- **Use case:** Multi-platform products, mobile-optimized APIs, micro-frontend backends.
- **Prerequisites:** Existing backend services or microservices, multiple client platforms.
- **Scope:** BFF layer design, data aggregation, client-specific optimization, deployment model.

## Prompt

```text
You are a Software Architect specializing in API design for multi-platform products. Design a Backend-for-Frontend (BFF) architecture for the system described below.

**Project:** {{PROJECT_NAME}}
**Clients:** {{CLIENTS}} (e.g., Web SPA, iOS, Android, Smart TV)
**Backend Services:** {{BACKEND_SERVICES}}
**Current Pain Points:** {{PAIN_POINTS}}

Produce a BFF architecture that covers:

1. **BFF Identification** — Determine how many BFFs are needed
   - One BFF per client platform vs. shared BFF with client profiles
   - Decision matrix: when to split vs. share

2. **Data Aggregation** — How each BFF composes responses from multiple services
   - Parallel service calls with timeout budgets
   - Response shaping (field selection, renaming, flattening)
   - Caching strategy per BFF

3. **Client-Specific Optimization**
   - Mobile: smaller payloads, fewer round trips, image optimization
   - Web: richer responses, prefetch hints
   - IoT: minimal payloads, binary protocols

4. **Authentication & Authorization**
   - BFF as token exchange layer (OAuth2 BFF pattern)
   - Session management per client type
   - CSRF protection for cookie-based web BFF

5. **Error Handling**
   - Partial response strategy (return available data with degraded flag)
   - Service-specific error mapping to client-friendly errors
   - Circuit breakers for downstream service calls

6. **Deployment & Ownership**
   - BFF owned by the frontend team vs. API team
   - Independent deployment pipeline per BFF
   - Shared libraries for common aggregation logic

**Constraints:**
- BFF must not contain business logic — it is a composition and adaptation layer only
- Each BFF must have independent scaling and deployment
- Latency budget: BFF adds ≤ 50ms to the critical path
- No direct database access from BFF — always call backend services

**Output Format:**
- Architecture diagram showing clients → BFFs → services (Mermaid)
- BFF responsibility matrix (BFF × client needs)
- API contract examples per BFF
- Deployment topology
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Yes | Project name | `Streaming Platform` |
| `{{CLIENTS}}` | Yes | Frontend clients | `React Web, iOS App, Android App, Smart TV` |
| `{{BACKEND_SERVICES}}` | Yes | Existing backend services | `User Service, Content Service, Recommendation Service, Billing Service` |
| `{{PAIN_POINTS}}` | No | Current API problems | `Mobile gets 10x more data than needed; TV app needs different auth flow` |

## Example Output

```
Architecture:

  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ Web SPA  │  │ Mobile   │  │ Smart TV │
  └────┬─────┘  └────┬─────┘  └────┬─────┘
       │              │              │
  ┌────▼─────┐  ┌────▼─────┐  ┌────▼─────┐
  │ Web BFF  │  │Mobile BFF│  │  TV BFF  │
  │(Next.js) │  │ (Node)   │  │ (Node)   │
  └──┬──┬──┬─┘  └──┬──┬──┬─┘  └──┬──┬────┘
     │  │  │        │  │  │       │  │
  ┌──▼──▼──▼────────▼──▼──▼──────▼──▼─────┐
  │         Backend Microservices           │
  │  Users │ Content │ Recs │ Billing      │
  └────────────────────────────────────────┘

BFF Responsibility Matrix:
┌──────────────┬───────────┬────────────┬─────────┐
│ Concern      │ Web BFF   │ Mobile BFF │ TV BFF  │
├──────────────┼───────────┼────────────┼─────────┤
│ Auth         │ Cookie+CSRF│ JWT        │ Device  │
│ Payload size │ Full      │ Minimal    │ Compact │
│ Image CDN    │ WebP/AVIF │ Responsive │ 4K/HD   │
│ Prefetch     │ Next page │ Carousel   │ Row     │
└──────────────┴───────────┴────────────┴─────────┘
```

## Composition

- **Precedes:** `devops-containerization`, `testing-integration`
- **Follows:** `arch-microservices-design`, `system-high-level-design`
- **Combines with:** `api-rest-endpoint-design`, `graphql-schema-design`
- **Overlay:** `overlays/{tech}/bff-pattern.overlay.md`

## Tips & Variations

- For GraphQL: "Consider a single GraphQL gateway instead of multiple REST BFFs."
- For SSR frameworks: "The BFF and web frontend can be co-located in Next.js or Nuxt."
- For API Gateway integration: "Place BFFs behind an API Gateway for rate limiting and auth offloading."

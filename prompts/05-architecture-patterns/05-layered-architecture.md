---
id: "arch-layered"
version: "1.0.0"
category: "architecture-patterns"
complexity: "basic"
tags: ["layered-architecture", "n-tier", "separation-of-concerns", "monolith"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Layered (N-Tier) Architecture

> Design applications using a traditional layered architecture with clear tier boundaries and dependency rules.

## Metadata
- **Category:** `architecture-patterns`
- **Complexity:** `basic`

## Context

Use this prompt when designing a new application with a layered structure or evaluating an existing monolith's tier boundaries.

- **Use case:** New project scaffolding, monolith restructuring, team onboarding on layer responsibilities.
- **Prerequisites:** High-level requirements, domain model draft.
- **Scope:** Layer decomposition, dependency rules, cross-cutting concerns placement.

## Prompt

```text
You are a Software Architect. Design a layered (N-Tier) architecture for the system described below.

**Project:** {{PROJECT_NAME}}
**Domain:** {{DOMAIN}}
**Tech Stack:** {{TECH_STACK}}
**Deployment Model:** {{DEPLOYMENT_MODEL}} (e.g., single-process monolith, multi-tier deployed)

Produce an architecture design that covers:

1. **Layer Identification** — Define each layer and its single responsibility
   - Presentation / API layer
   - Application / Service layer
   - Domain / Business Logic layer
   - Infrastructure / Data Access layer

2. **Dependency Rules** — Strict top-down dependency flow; no layer may reference a layer above it

3. **Cross-Cutting Concerns** — Placement of logging, authentication, validation, caching
   - Identify where middleware / interceptors sit
   - Define shared kernel or common utilities

4. **Data Flow** — Request lifecycle through each layer with DTO/model mapping boundaries

5. **Testing Strategy** — How each layer is tested in isolation
   - Service layer: unit tests with mocked repositories
   - Domain layer: pure unit tests
   - Infrastructure: integration tests

6. **Scaling Path** — How to evolve from monolith to modular monolith or microservices

**Constraints:**
- No business logic in the Presentation or Infrastructure layers
- Domain layer must have zero external dependencies
- DTOs must not leak across layer boundaries
- Configuration must be injected, not hardcoded

**Output Format:**
- Layer diagram (Mermaid)
- Layer responsibility matrix
- Dependency rule table
- Example data flow for one use case
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Yes | Project name | `HR Management System` |
| `{{DOMAIN}}` | Yes | Application domain | `Employee management, payroll, leave tracking` |
| `{{TECH_STACK}}` | Yes | Technology stack | `ASP.NET Core, EF Core, SQL Server` |
| `{{DEPLOYMENT_MODEL}}` | No | How the app is deployed | `Single-process monolith on Azure App Service` |

## Example Output

```
Layer Diagram:

┌──────────────────────────────────┐
│     Presentation / API Layer     │  Controllers, ViewModels, DTOs
├──────────────────────────────────┤
│     Application / Service Layer  │  Use cases, orchestration, mapping
├──────────────────────────────────┤
│     Domain / Business Logic      │  Entities, value objects, rules
├──────────────────────────────────┤
│     Infrastructure / Data Access │  Repositories, external services
└──────────────────────────────────┘

Dependency Rule: Each layer depends only on the layer directly below it.
Domain layer has ZERO outward dependencies.
```

## Composition

- **Precedes:** `arch-modular-monolith`, `arch-clean-hexagonal`
- **Follows:** `system-high-level-design`
- **Combines with:** `coding-solid-principles`, `coding-clean-code-principles`
- **Overlay:** `overlays/{tech}/layered-architecture.overlay.md`

## Tips & Variations

- For strict DDD: "Add a separate Domain Services sub-layer between Application and Domain."
- For API-first: "Treat the Presentation layer as a thin adapter; all logic lives in Application layer."
- For legacy modernization: "Map existing code to layers first, then enforce dependency rules incrementally."

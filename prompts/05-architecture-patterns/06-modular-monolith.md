---
id: "arch-modular-monolith"
version: "1.0.0"
category: "architecture-patterns"
complexity: "intermediate"
tags: ["modular-monolith", "modules", "bounded-context", "encapsulation"]
depends-on: ["arch-layered"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Modular Monolith

> Design a monolithic application with well-defined module boundaries, explicit APIs, and independent deployability potential.

## Metadata
- **Category:** `architecture-patterns`
- **Complexity:** `intermediate`

## Context

Use this prompt when building a monolith that must remain maintainable at scale or as a stepping stone toward microservices.

- **Use case:** Greenfield projects that don't yet need microservices, monolith restructuring, team autonomy within a single deployable.
- **Prerequisites:** Domain model, bounded context map, team structure.
- **Scope:** Module decomposition, inter-module communication, shared kernel, data isolation.

## Prompt

```text
You are a Software Architect specializing in modular monolith design. Design a modular monolith architecture for the system described below.

**Project:** {{PROJECT_NAME}}
**Domain:** {{DOMAIN}}
**Bounded Contexts:** {{BOUNDED_CONTEXTS}}
**Tech Stack:** {{TECH_STACK}}

Produce a modular monolith design that covers:

1. **Module Decomposition** — Map each bounded context to a module
   - Define module public API (interface/contract)
   - Identify internal vs. exposed types
   - Enforce encapsulation (no direct cross-module database access)

2. **Inter-Module Communication**
   - Synchronous: In-process method calls via module interfaces
   - Asynchronous: In-memory event bus for eventual consistency
   - Define integration events vs. domain events

3. **Data Isolation**
   - Separate schema per module (logical isolation) or separate tables with ownership rules
   - No shared mutable state between modules
   - Module-owned database migrations

4. **Shared Kernel**
   - Common types: IDs, value objects, base classes
   - Keep shared kernel minimal and stable

5. **Module Composition**
   - Dependency injection wiring
   - Module registration and initialization order
   - Feature flags for module enable/disable

6. **Evolution Path**
   - How to extract a module to a microservice
   - Identify extraction candidates (high independence, different scaling needs)
   - Strangler fig compatibility

**Constraints:**
- Modules must communicate only through their public API or events
- No circular dependencies between modules
- Each module must be independently testable
- Database queries must not join across module boundaries

**Output Format:**
- Module map with bounded context alignment
- Module dependency graph (Mermaid)
- Inter-module communication patterns
- Data ownership matrix
- Example module public API
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Yes | Project name | `SaaS Billing Platform` |
| `{{DOMAIN}}` | Yes | Application domain | `Subscription management, invoicing, payments` |
| `{{BOUNDED_CONTEXTS}}` | Yes | Identified bounded contexts | `Accounts, Subscriptions, Billing, Payments, Notifications` |
| `{{TECH_STACK}}` | Yes | Technology stack | `Java 21, Spring Boot, PostgreSQL` |

## Example Output

```
Module Map:
┌──────────────────────────────────────────────────────┐
│                    Application Host                   │
├────────────┬────────────┬───────────┬────────────────┤
│  Accounts  │  Subscript │  Billing  │   Payments     │
│  Module    │  Module    │  Module   │   Module       │
│            │            │           │                │
│ - UserMgmt │ - Plans    │ - Invoice │ - PaymentGW    │
│ - Auth     │ - Trials   │ - Tax     │ - Reconcile    │
├────────────┴────────────┴───────────┴────────────────┤
│               Shared Kernel (IDs, Events)             │
├──────────────────────────────────────────────────────┤
│                  Infrastructure Layer                  │
└──────────────────────────────────────────────────────┘

Inter-Module Communication:
  Subscriptions → (event) SubscriptionCreated → Billing
  Billing → (event) InvoiceFinalized → Payments
  Payments → (event) PaymentCompleted → Subscriptions
```

## Composition

- **Precedes:** `arch-microservices-design`, `arch-strangler-fig`
- **Follows:** `arch-layered`, `system-high-level-design`
- **Combines with:** `arch-cqrs-pattern`, `arch-event-driven`
- **Overlay:** `overlays/{tech}/modular-monolith.overlay.md`

## Tips & Variations

- For DDD alignment: "Use one module per bounded context; name modules after the ubiquitous language."
- For testing: "Each module should have its own integration test suite using an in-memory database."
- For gradual adoption: "Start with package-level separation, then enforce with ArchUnit/NetArchTest rules."

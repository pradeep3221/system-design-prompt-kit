---
id: "arch-saga-pattern"
version: "1.0.0"
category: "architecture-patterns"
complexity: "advanced"
tags: ["saga", "distributed-transactions", "compensation", "choreography", "orchestration"]
depends-on: ["arch-microservices-design", "arch-event-driven"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Saga Pattern

> Design distributed transactions using choreography or orchestration sagas with compensation logic.

## Metadata
- **Category:** `architecture-patterns`
- **Complexity:** `advanced`

## Context

Use this prompt when a business operation spans multiple services and requires data consistency without distributed locks.

- **Use case:** Order processing across services, multi-step provisioning, cross-service state machines.
- **Prerequisites:** Microservices architecture, event/message infrastructure, compensatable operations.
- **Scope:** Saga type selection, step definition, compensation handlers, failure scenarios.

## Prompt

```text
You are a Distributed Systems Architect. Design a saga pattern for the multi-service transaction described below.

**Project:** {{PROJECT_NAME}}
**Transaction:** {{TRANSACTION_DESCRIPTION}}
**Participating Services:** {{SERVICES}}
**Saga Type:** {{SAGA_TYPE}} (choreography / orchestration / recommend)

Produce a saga design that covers:

1. **Saga Steps** — Ordered list of all steps in the happy path
   - Service, action, produced event/command
   - Data required and data produced

2. **Compensation Handlers** — For each step, the compensating action on failure
   - Compensation must be idempotent
   - Compensation order (reverse of execution)
   - Non-compensatable steps (e.g., sending email) — use semantic lock or flag

3. **Choreography vs. Orchestration Decision**
   - Choreography: each service listens for events and acts independently
   - Orchestration: central coordinator manages step execution and compensation
   - Recommendation with trade-off analysis

4. **Failure Scenarios**
   - Step N fails → compensate steps N-1 down to 1
   - Compensation itself fails → retry with backoff, then alert
   - Timeout handling and saga expiration
   - Partial completion visibility to users

5. **Idempotency**
   - Saga ID and step ID for deduplication
   - Idempotency keys for payment and external calls
   - At-least-once delivery handling

6. **Observability**
   - Saga state tracking (pending, running, compensating, completed, failed)
   - Saga timeline visualization
   - Alerting on stuck or long-running sagas

7. **Data Isolation**
   - Semantic locks during saga execution
   - Read isolation: how other operations see in-flight saga data

**Constraints:**
- No distributed locks or two-phase commit
- Each step must be independently compensatable
- Saga must complete or fully compensate within {{TIMEOUT}}
- All events must be persisted before acknowledgment (outbox pattern)

**Output Format:**
- Saga step sequence diagram (Mermaid)
- Step & compensation table
- Failure scenario matrix
- Orchestrator state machine (if orchestration)
- Implementation guidelines
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Yes | Project name | `E-Commerce Checkout` |
| `{{TRANSACTION_DESCRIPTION}}` | Yes | Business transaction | `Place order: reserve inventory → charge payment → create shipment → send confirmation` |
| `{{SERVICES}}` | Yes | Participating services | `Order, Inventory, Payment, Shipping, Notification` |
| `{{SAGA_TYPE}}` | No | Choreography or orchestration | `orchestration` |
| `{{TIMEOUT}}` | No | Max saga duration | `5 minutes` |

## Example Output

```
Saga Step & Compensation Table:

┌────┬──────────────┬──────────────────────┬──────────────────────────┐
│ #  │ Service      │ Action               │ Compensation             │
├────┼──────────────┼──────────────────────┼──────────────────────────┤
│ 1  │ Order        │ Create order (PENDING)│ Cancel order             │
│ 2  │ Inventory    │ Reserve items        │ Release reservation      │
│ 3  │ Payment      │ Charge customer      │ Refund payment           │
│ 4  │ Shipping     │ Create shipment      │ Cancel shipment          │
│ 5  │ Notification │ Send confirmation    │ (non-compensatable)*     │
└────┴──────────────┴──────────────────────┴──────────────────────────┘

* Step 5 is non-compensatable. It executes only after all compensatable
  steps succeed (pivot point after step 4).

Failure Scenario — Payment Fails (Step 3):
  1. Payment.Charge → FAILED
  2. Compensate Step 2: Inventory.ReleaseReservation
  3. Compensate Step 1: Order.Cancel
  4. Saga status → COMPENSATED
```

## Composition

- **Precedes:** `devops-monitoring-observability`, `testing-integration`
- **Follows:** `arch-microservices-design`, `arch-event-driven`
- **Combines with:** `arch-cqrs-pattern`, `db-schema-design`
- **Overlay:** `overlays/{tech}/saga-pattern.overlay.md`

## Tips & Variations

- For simple flows (≤3 steps): "Use choreography — lower complexity, no orchestrator dependency."
- For complex flows (>3 steps): "Use orchestration — centralized control, easier debugging."
- For financial systems: "Add a reconciliation step that runs periodically to catch saga inconsistencies."

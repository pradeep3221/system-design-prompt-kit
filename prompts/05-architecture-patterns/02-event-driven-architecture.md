---
id: "arch-event-driven"
version: "1.0.0"
category: "architecture-patterns"
complexity: "advanced"
tags: ["event-driven", "event-sourcing", "pub-sub", "messaging"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Event-Driven Architecture

> Design event sourcing, pub/sub, and event-driven systems with reliable message delivery.

## Metadata
- **Category:** `architecture-patterns`
- **Complexity:** `advanced`

## Context

Use this prompt when designing asynchronous, event-based systems.

- **Use case:** Decoupling services, event sourcing, real-time data pipelines, CQRS read-side updates.
- **Prerequisites:** Domain events identified, consistency requirements, message broker selection.
- **Scope:** Event schemas, topic design, consumer patterns, ordering, idempotency.

## Prompt

```text
You are an event-driven architecture specialist. Design an event-driven system for {{SYSTEM_NAME}}.

**Requirements:** {{REQUIREMENTS}}
**Delivery guarantee needed:** {{DELIVERY_GUARANTEE}} (at-most-once / at-least-once / exactly-once)

**Design the following:**

### 1. Event Catalog
Define all domain events:

| Event Name | Producer | Consumer(s) | Schema | Criticality |
|-----------|---------|-------------|--------|------------|
| `OrderPlaced` | Order Service | Payment, Inventory, Notification | `{ orderId, items, total }` | Critical |
| | | | | |

### 2. Event Schema Design
- Schema format: JSON Schema / Avro / Protobuf
- Versioning strategy: backward/forward compatible evolution
- Required metadata: `eventId`, `eventType`, `timestamp`, `correlationId`, `causationId`, `version`
- Envelope pattern

### 3. Topology Design
- Topics/queues naming convention: `{domain}.{entity}.{event}` → `orders.order.placed`
- Partitioning strategy and partition key selection
- Consumer group design
- Dead letter queue (DLQ) configuration and retry policy

### 4. Event Sourcing (if applicable)
- Event store design
- Aggregate reconstruction from events
- Snapshot strategy (every N events)
- Projection/read model updates

### 5. Saga / Process Manager
For multi-step business processes:
- Choreography vs. orchestration decision
- Compensating transactions for rollback
- Timeout and failure handling
- State machine definition

### 6. Idempotency
- Idempotency key design
- Deduplication strategy (at broker and consumer level)
- Idempotent consumer pattern implementation

### 7. Observability
- Event flow tracing (distributed trace context propagation)
- Consumer lag monitoring
- Failed event alerting
- Event replay capabilities

### 8. Technology Recommendation
Compare for this use case: Kafka vs. RabbitMQ vs. Cloud-native (SQS/SNS, Event Grid, Pub/Sub).
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SYSTEM_NAME}}` | System being designed | `Order Processing Pipeline` |
| `{{REQUIREMENTS}}` | Key business requirements | `Process orders, update inventory, send notifications, handle payments` |
| `{{DELIVERY_GUARANTEE}}` | Message delivery requirement | `at-least-once` |

## Tips & Variations

- For CQRS: "Combine with CQRS pattern for read model projections."
- Add: "Generate AsyncAPI specification for the event catalog."

## Composition

- **Precedes:** `bgnd-message-consumer-design`
- **Follows:** `arch-microservices-design`
- **Combines with:** `arch-cqrs-pattern`, `db-schema-design`
- **Overlay:** `overlays/{tech}/arch-event-driven.overlay.md`

# Microservices Design

> Decompose a monolith or greenfield system into well-bounded microservices.

## Category
`architecture-patterns`

## Complexity
`advanced`

## Prompt

```text
You are a microservices architect. Design a microservices decomposition for {{SYSTEM_NAME}}.

**Current state:** {{CURRENT_STATE}}
**Business domains:** {{DOMAINS}}

**Produce the following:**

### 1. Service Decomposition
Using Domain-Driven Design (DDD) principles:
- Identify bounded contexts from business domains.
- Define each microservice with: name, responsibility, owned data, and team ownership.
- Apply the Single Responsibility Principle at the service level.
- Identify shared kernels and anti-corruption layers.

### 2. Communication Patterns
For each service interaction, specify:
- Synchronous (REST/gRPC) vs. asynchronous (events/messages)
- Communication pattern: Request-Reply, Publish-Subscribe, Saga, Choreography vs. Orchestration
- API contracts between services

### 3. Data Management
- Database-per-service strategy
- Data consistency approach (eventual consistency, saga pattern)
- Shared data access patterns (API composition, CQRS)
- Event-driven data synchronization

### 4. Service Catalog

| Service | Responsibility | Tech Stack | Data Store | Dependencies |
|---------|---------------|-----------|-----------|-------------|
| | | | | |

### 5. Cross-Cutting Concerns
- Service discovery and registration
- API Gateway configuration
- Distributed tracing (OpenTelemetry)
- Centralized logging (ELK/Loki)
- Health checks and readiness probes
- Circuit breaker configuration
- Secret management

### 6. Deployment Topology
- Container orchestration (Kubernetes)
- Service mesh (Istio/Linkerd) — needed or not?
- CI/CD pipeline per service
- Environment strategy (dev, staging, prod)

### 7. Migration Strategy (if decomposing a monolith)
- Strangler Fig pattern phases
- Database decomposition sequence
- Feature flag strategy for gradual rollout
- Rollback plan for each phase
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SYSTEM_NAME}}` | System to decompose | `E-Commerce Monolith` |
| `{{CURRENT_STATE}}` | Starting point | `Django monolith with single PostgreSQL DB` |
| `{{DOMAINS}}` | Business domains | `Users, Products, Orders, Payments, Shipping, Notifications` |

## Tips & Variations

- Add: "Generate a Mermaid service dependency diagram."
- For team topology: "Map services to team boundaries using Team Topologies."

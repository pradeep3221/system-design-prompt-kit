# High-Level Design (HLD)

> Produce a comprehensive high-level system architecture from product requirements.

## Category
`system-design`

## Complexity
`advanced`

## Prompt

```text
You are a principal systems architect. Create a High-Level Design (HLD) document for the following system.

**System:** {{SYSTEM_NAME}}
**Description:** {{SYSTEM_DESCRIPTION}}
**Key requirements:**
- {{REQUIREMENT_1}}
- {{REQUIREMENT_2}}
- {{REQUIREMENT_3}}

**Non-functional requirements:**
- Expected users: {{USER_COUNT}}
- Peak requests per second: {{PEAK_RPS}}
- Availability target: {{AVAILABILITY}} (e.g., 99.9%)
- Data retention: {{RETENTION}}
- Latency target: {{LATENCY}} (e.g., p99 < 200ms)

**Produce the following sections:**

### 1. System Context Diagram
- External actors and systems
- System boundary
- Key data flows (described textually for diagram generation)

### 2. Component Architecture
- Major components/services and their responsibilities
- Synchronous vs. asynchronous communication patterns
- API Gateway / BFF layer
- Service mesh / communication infrastructure

### 3. Data Architecture
- Data stores (SQL, NoSQL, cache, search index, object storage)
- Data flow between components
- Read vs. write path separation (CQRS if applicable)
- Data consistency model (strong, eventual, causal)

### 4. Infrastructure Architecture
- Cloud provider services mapping
- Network topology (VPC, subnets, load balancers)
- CDN and edge computing
- Container orchestration

### 5. Cross-Cutting Concerns
- Authentication & authorization flow
- Logging, monitoring, and alerting
- Configuration management
- Secret management

### 6. Integration Points
- Third-party service integrations
- Webhook/callback patterns
- Message broker topics/queues

### 7. Failure Modes & Resilience
- Single points of failure
- Failover strategies
- Degraded mode behavior (graceful degradation)

### 8. Technology Stack Recommendation
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | | |
| API Gateway | | |
| Backend Services | | |
| Database | | |
| Cache | | |
| Message Broker | | |
| Search | | |
| Monitoring | | |

### 9. Risk Register
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| | H/M/L | H/M/L | |
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SYSTEM_NAME}}` | System being designed | `URL Shortener`, `Chat Application` |
| `{{SYSTEM_DESCRIPTION}}` | Brief overview | `Real-time messaging platform supporting 1:1 and group chats` |
| `{{USER_COUNT}}` | Expected user base | `10M monthly active users` |
| `{{PEAK_RPS}}` | Peak throughput | `50,000 RPS` |
| `{{AVAILABILITY}}` | Uptime target | `99.99%` |

## Tips & Variations

- Add: "Include a C4 model (Context, Container, Component, Code) for the architecture."
- Add: "Generate Mermaid diagrams for each architectural view."
- For interview prep: "Present this as a 45-minute system design interview answer."

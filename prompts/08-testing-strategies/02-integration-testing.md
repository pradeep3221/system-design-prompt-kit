# Integration Testing

> Test component interactions, database operations, and external service integrations.

## Category
`testing-strategies`

## Complexity
`intermediate`

## Prompt

```text
You are a test automation engineer. Design integration tests for the {{COMPONENT_NAME}} component.

**Stack:** {{LANGUAGE}} / {{FRAMEWORK}}
**Dependencies to test against:** {{DEPENDENCIES}}

**Design tests for these integration points:**

### 1. Database Integration Tests
- CRUD operations with a real test database
- Transaction behavior (commit, rollback)
- Constraint validation (FK, unique, check)
- Migration verification
- Test data seeding and cleanup strategy

### 2. API Integration Tests
- HTTP endpoint testing (request → response)
- Authentication/authorization flows
- Request validation (400 responses)
- Content negotiation
- CORS headers

### 3. External Service Integration
- Mock server setup (WireMock, MSW, VCR)
- Contract verification
- Timeout and retry behavior
- Circuit breaker activation

### 4. Message Queue Integration
- Message publish/consume round-trip
- Message serialization/deserialization
- Dead letter queue behavior
- Idempotency verification

### 5. Test Infrastructure

```
Test Setup:
├── Docker Compose for test dependencies (DB, Redis, message broker)
├── Test database with migrations applied
├── Mock servers for external services
├── Seed data fixtures
└── Cleanup/teardown routines
```

### 6. Test Isolation Strategy
- Database: Transaction rollback per test OR truncate tables between tests
- External services: Dedicated mock instances
- File system: Temp directories with cleanup
- Time: Clock mocking for time-dependent logic

**Provide:** Complete test suite code with setup/teardown, test helpers, and fixtures.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{COMPONENT_NAME}}` | Component to test | `Order Service` |
| `{{LANGUAGE}}` | Language | `TypeScript`, `Python`, `Java` |
| `{{FRAMEWORK}}` | Framework | `NestJS + Supertest`, `FastAPI + httpx`, `Spring Boot` |
| `{{DEPENDENCIES}}` | External systems | `PostgreSQL, Redis, Stripe API, RabbitMQ` |

## Tips & Variations

- Add: "Generate a Docker Compose file for the test infrastructure."
- Add: "Include testcontainers setup for database testing."

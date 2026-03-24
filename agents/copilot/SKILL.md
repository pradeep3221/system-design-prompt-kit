# Copilot Skills — System Design Prompt Kit

> Skill definitions for GitHub Copilot that map to prompt categories in this library.

## Skills

### coding-standards
- **Description:** Apply clean code principles, SOLID, DRY/KISS, and language-specific conventions.
- **Prompts:** `coding-clean-code-principles`, `coding-solid-principles`, `coding-dry-kiss`, `coding-error-handling`, `naming-general-guide`
- **When to use:** Code generation, refactoring, code review

### api-design
- **Description:** Design RESTful APIs with proper endpoint structure, error handling, versioning, and pagination.
- **Prompts:** `api-rest-endpoint-design`, `api-rest-error-response`, `api-rest-versioning`, `api-rest-pagination-filtering`, `api-rest-security`
- **When to use:** Creating new REST APIs, reviewing API designs

### graphql-design
- **Description:** Design GraphQL APIs with schema design, resolvers, federation, and security hardening.
- **Prompts:** `graphql-schema-design`, `graphql-resolver-patterns`, `graphql-federation`, `graphql-security`
- **When to use:** Creating GraphQL APIs, migrating from REST to GraphQL, federated gateway design

### system-design
- **Description:** Design scalable distributed systems with proper architecture, data modeling, and capacity planning.
- **Prompts:** `system-high-level-design`, `system-low-level-design`, `system-scalability-analysis`, `system-trade-off-analysis`, `system-capacity-planning`
- **When to use:** Architecture discussions, system design reviews

### database-design
- **Description:** Design database schemas, indexing strategies, and migration plans.
- **Prompts:** `db-schema-design`, `db-indexing-strategy`, `db-migration-planning`, `db-query-optimization`
- **When to use:** Data modeling, schema reviews, performance tuning

### security
- **Description:** Apply security best practices covering OWASP Top 10, authentication, input validation, and secrets management.
- **Prompts:** `security-owasp-top-10`, `security-authentication-design`, `security-input-validation`, `security-secrets-management`
- **When to use:** Security reviews, auth design, input handling

### testing
- **Description:** Design testing strategies covering unit, integration, E2E, and TDD workflows.
- **Prompts:** `testing-unit`, `testing-integration`, `testing-e2e`, `testing-tdd-workflow`
- **When to use:** Test planning, test code generation

### architecture
- **Description:** Select and implement architecture patterns — layered, modular monolith, microservices, event-driven, CQRS, serverless, BFF, saga, strangler fig.
- **Prompts:** `arch-layered`, `arch-modular-monolith`, `arch-clean-hexagonal`, `arch-microservices-design`, `arch-event-driven`, `arch-cqrs-pattern`, `arch-serverless`, `arch-bff-pattern`, `arch-saga-pattern`, `arch-strangler-fig`
- **When to use:** Architecture decisions, pattern selection, legacy migration planning

### devops
- **Description:** Design CI/CD pipelines, infrastructure as code, containerization, and monitoring.
- **Prompts:** `devops-cicd-pipeline`, `devops-infrastructure-as-code`, `devops-containerization`, `devops-monitoring-observability`
- **When to use:** Pipeline setup, deployment, monitoring configuration

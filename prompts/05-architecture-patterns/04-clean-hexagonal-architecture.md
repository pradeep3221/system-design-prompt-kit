# Clean / Hexagonal Architecture

> Design applications using ports and adapters with strict dependency inversion.

## Category
`architecture-patterns`

## Complexity
`intermediate`

## Prompt

```text
You are a software architect. Design the {{COMPONENT_NAME}} component using Clean Architecture (Hexagonal / Ports & Adapters).

**Language:** {{LANGUAGE}}
**Framework:** {{FRAMEWORK}}
**Component responsibility:** {{DESCRIPTION}}

**Design the following layers:**

### 1. Domain Layer (innermost — no external dependencies)
- Entities: Core business objects with identity and lifecycle
- Value Objects: Immutable objects defined by attributes
- Domain Services: Business logic that doesn't belong to a single entity
- Domain Events: State changes that other parts of the system care about
- Repository interfaces (ports): Data access abstractions
- External service interfaces (ports): Third-party integration abstractions

### 2. Application Layer (use cases / interactors)
- Use Case / Command handlers: One class per business operation
- Input/Output DTOs: Data structures crossing layer boundaries
- Application services: Orchestration of domain objects
- Port definitions (driving and driven)

### 3. Infrastructure Layer (adapters — outermost)
- Repository implementations: Database adapters
- External service clients: HTTP clients, message publishers
- Framework integration: Controllers, middleware, DI container configuration
- Configuration: Environment-specific settings

### 4. Dependency Rule
```
Domain ← Application ← Infrastructure
         (depends on)     (depends on)
```
- Inner layers NEVER depend on outer layers.
- Outer layers depend on inner layers through interfaces (ports).
- Dependency injection wires concrete adapters to port interfaces.

### 5. Folder Structure
Provide a realistic folder/package structure for {{LANGUAGE}}.

### 6. Testing Strategy per Layer
| Layer | Test Type | Dependencies | Speed |
|-------|-----------|-------------|-------|
| Domain | Unit tests | None (pure logic) | Very fast |
| Application | Unit tests | Mocked ports | Fast |
| Infrastructure | Integration tests | Real DB/services | Slower |
| Full stack | E2E tests | Everything | Slowest |

### 7. Example Implementation
Implement one complete use case showing all layers, from HTTP request to database and back.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{COMPONENT_NAME}}` | Component to design | `User Management` |
| `{{LANGUAGE}}` | Implementation language | `TypeScript`, `C#`, `Go` |
| `{{FRAMEWORK}}` | Framework | `NestJS`, `ASP.NET Core`, `Gin` |
| `{{DESCRIPTION}}` | What it does | `User registration, authentication, profile management` |

## Tips & Variations

- For DDD: "Include aggregate boundaries and domain event design."
- Minimal version: "Design a simplified 3-layer architecture for a small service."

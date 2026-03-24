# Low-Level Design (LLD)

> Create detailed component-level design with class diagrams, data models, and API contracts.

## Category
`system-design`

## Complexity
`advanced`

## Prompt

```text
You are a senior software engineer. Create a Low-Level Design (LLD) for the {{COMPONENT_NAME}} component of the {{SYSTEM_NAME}} system.

**Component responsibility:** {{COMPONENT_DESCRIPTION}}
**Language/Framework:** {{LANGUAGE}} / {{FRAMEWORK}}

**Produce the following sections:**

### 1. Class Diagram
Define all classes with:
- Class name and stereotype (Entity, Service, Repository, Controller, DTO, ValueObject)
- Attributes with types and visibility
- Methods with parameters and return types
- Relationships: inheritance, composition, aggregation, dependency
- Design patterns applied (with rationale)

### 2. Data Models
- Entity definitions with all fields, types, and constraints
- Database table design (DDL)
- Indexes and their justification
- Relationships (1:1, 1:N, M:N) with FK constraints

### 3. API Contracts (Internal)
For each public method or API endpoint:
- Input parameters with validation rules
- Output format
- Error conditions and codes
- Pre-conditions and post-conditions

### 4. Sequence Diagrams
For the top 3 critical flows, describe step-by-step interactions:
- Which object calls which method
- Data transformations at each step
- Error handling paths
- Async operations and callbacks

### 5. State Machine (if applicable)
- States and transitions for the primary entity
- Guard conditions on transitions
- Actions triggered on state changes

### 6. Algorithm Details
For any non-trivial business logic:
- Pseudocode or flowchart description
- Time and space complexity
- Edge cases handled

### 7. Concurrency & Thread Safety
- Shared mutable state identification
- Locking/synchronization strategy
- Race condition prevention

### 8. Testability Design
- Interfaces/abstractions for dependency injection
- Seams for unit testing
- Test data factories
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SYSTEM_NAME}}` | Parent system | `E-Commerce Platform` |
| `{{COMPONENT_NAME}}` | Component to design | `Order Processing Service` |
| `{{COMPONENT_DESCRIPTION}}` | What it does | `Handles order lifecycle from creation through fulfillment` |
| `{{LANGUAGE}}` | Implementation language | `Java`, `C#`, `TypeScript` |
| `{{FRAMEWORK}}` | Framework | `Spring Boot`, `ASP.NET Core`, `NestJS` |

## Tips & Variations

- Add: "Generate PlantUML for class and sequence diagrams."
- For data-intensive components: "Focus on the data pipeline design (ETL, streaming)."

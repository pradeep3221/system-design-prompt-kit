# General Naming Guide

> Establish consistent, self-documenting naming conventions for any codebase.

## Category
`naming-conventions`

## Complexity
`basic`

## Prompt

```text
You are a senior software engineer. Create a comprehensive naming convention guide for a {{LANGUAGE}} project of type {{PROJECT_TYPE}}.

**Cover these naming categories:**

### 1. Variables
- Local variables, instance variables, class/static variables
- Boolean naming (`is`, `has`, `should`, `can` prefixes)
- Collections/arrays (plural nouns)
- Iterators and loop variables
- Temporary and accumulator variables

### 2. Functions / Methods
- Action verbs for commands (`create`, `update`, `delete`, `fetch`, `validate`)
- Question verbs for queries (`is`, `has`, `can`, `should`)
- Converter naming (`toJson`, `fromDto`, `asReadOnly`)
- Event handlers (`on`, `handle` prefixes)
- Factory methods (`create`, `build`, `of`, `from`)

### 3. Classes / Types
- Nouns for entities (`User`, `OrderItem`, `PaymentGateway`)
- Adjectives/roles for interfaces (`Serializable`, `Iterable`, `Repository`)
- Suffix patterns: `Service`, `Controller`, `Repository`, `Factory`, `Handler`, `Middleware`
- Generic type parameters (`T`, `K`, `V`, `E`)

### 4. Constants & Enums
- UPPER_SNAKE_CASE for constants
- PascalCase or UPPER_SNAKE_CASE for enum values (by language convention)
- Descriptive grouping prefixes

### 5. Packages / Modules / Namespaces
- Hierarchical organization pattern
- Reverse domain notation where applicable

**For each rule, provide:**
- The convention name
- Pattern: `camelCase`, `PascalCase`, `snake_case`, `UPPER_SNAKE`, `kebab-case`
- Good example and bad example
- Rationale

**Format as a team-ready reference document.**
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{LANGUAGE}}` | Target language | `TypeScript`, `Python`, `C#` |
| `{{PROJECT_TYPE}}` | Type of project | `microservice`, `monolith`, `library` |

## Tips & Variations

- Add: "Generate an ESLint/Pylint/StyleCop configuration that enforces these rules."
- Add: "Include an anti-patterns section with commonly seen bad names."

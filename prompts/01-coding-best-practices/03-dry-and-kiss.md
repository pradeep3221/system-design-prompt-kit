# DRY and KISS Principles

> Identify duplication and unnecessary complexity, then simplify and consolidate.

## Category
`coding-best-practices`

## Complexity
`basic`

## Prompt

```text
You are a senior developer focused on code simplicity and maintainability. Analyze the following code for DRY (Don't Repeat Yourself) and KISS (Keep It Simple, Stupid) violations.

**Language:** {{LANGUAGE}}
**Code:**

```{{LANGUAGE}}
{{CODE_SNIPPET}}
```

**DRY Analysis:**
1. Identify all instances of duplicated logic, patterns, or data.
2. For each duplication, determine the appropriate abstraction:
   - Shared utility function
   - Base class or mixin
   - Configuration/constant extraction
   - Template or generic pattern
3. Show the consolidated code.

**KISS Analysis:**
1. Identify over-engineered or unnecessarily complex sections:
   - Premature abstractions or design patterns
   - Deeply nested conditionals (> 3 levels)
   - Overly clever one-liners that sacrifice readability
   - Unnecessary generics or type gymnastics
   - God objects or God functions
2. For each, provide a simpler alternative that maintains the same behavior.

**Output a table:**

| Issue | Principle | Severity | Current | Suggested Fix |
|-------|-----------|----------|---------|---------------|
| ... | DRY/KISS | H/M/L | Code ref | Brief fix |

Then provide the fully refactored code with inline comments explaining each change.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{LANGUAGE}}` | Programming language | `python`, `go`, `java` |
| `{{CODE_SNIPPET}}` | Code to analyze | Any code with potential duplication |

## Tips & Variations

- For architecture-level analysis: "Analyze this microservice for cross-service code duplication."
- Add: "Estimate the maintenance cost reduction (%) from applying these changes."

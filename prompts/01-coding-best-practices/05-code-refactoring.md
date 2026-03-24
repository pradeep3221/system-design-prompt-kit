---
id: "coding-refactoring-patterns"
version: "1.0.0"
category: "coding-best-practices"
complexity: "advanced"
tags: ["refactoring", "code-smells", "design-patterns", "tdd"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Code Refactoring Patterns

> Identify code smells and apply systematic refactoring techniques to improve design.

## Metadata
- **Category:** `coding-best-practices`
- **Complexity:** `advanced`

## Prompt

```text
You are a refactoring expert following Martin Fowler's refactoring catalog. Analyze the following code for code smells and provide a step-by-step refactoring plan.

**Language:** {{LANGUAGE}}
**Code to refactor:**

```{{LANGUAGE}}
{{CODE_SNIPPET}}
```

**Step 1 — Identify Code Smells:**
Check for these common smells and flag any that apply:
- Long Method (> 20 lines)
- Large Class (> 200 lines or > 5 responsibilities)
- Feature Envy (method uses another class's data more than its own)
- Data Clumps (groups of data that always appear together)
- Primitive Obsession (using primitives instead of small objects)
- Switch Statements (could be replaced with polymorphism)
- Divergent Change (one class changed for multiple reasons)
- Shotgun Surgery (one change requires edits across many classes)
- Dead Code (unreachable or unused code)
- Speculative Generality (unused abstractions "for the future")

**Step 2 — Prioritize by Impact:**
Rank each smell by:
- Risk if left unfixed (1-5)
- Effort to fix (1-5)
- Improvement to readability/testability (1-5)

**Step 3 — Refactoring Plan:**
For each prioritized smell, provide:
1. The specific refactoring technique (e.g., Extract Method, Replace Conditional with Polymorphism)
2. Before and after code examples
3. Tests that should be written or updated to verify the refactoring

**Step 4 — Final Refactored Code:**
Provide the complete refactored version with comments marking each change.

**Constraints:**
- Behavior must remain identical (refactoring, not rewriting).
- Each step should be a safe, independently committable change.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{LANGUAGE}}` | Programming language | `typescript`, `python`, `java` |
| `{{CODE_SNIPPET}}` | Code to refactor | Legacy code, large classes |

## Tips & Variations

- Add: "Also generate the git commit messages for each refactoring step."
- For legacy code: "Assume no tests exist — include characterization tests before refactoring."

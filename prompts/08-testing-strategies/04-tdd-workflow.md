---
id: "testing-tdd-workflow"
version: "1.0.0"
category: "testing-strategies"
complexity: "intermediate"
tags: ["tdd", "red-green-refactor", "bdd", "test-first"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# TDD Workflow

> Apply Test-Driven Development to build a feature with confidence from the start.

## Metadata
- **Category:** `testing-strategies`
- **Complexity:** `intermediate`

## Prompt

```text
You are a TDD practitioner. Guide me through building {{FEATURE_NAME}} using strict Test-Driven Development.

**Language:** {{LANGUAGE}}
**Test framework:** {{TEST_FRAMEWORK}}
**Feature description:** {{FEATURE_DESCRIPTION}}

**Follow the Red-Green-Refactor cycle:**

### Iteration 1: Simplest Case
1. **RED:** Write the simplest failing test for the most basic behavior.
2. **GREEN:** Write the minimum code to make it pass (even if hardcoded).
3. **REFACTOR:** Clean up without changing behavior.

### Iteration 2-N: Incremental Complexity
For each new behavior:
1. **RED:** Write a test for the next simplest behavior.
2. **GREEN:** Extend the implementation to pass all tests.
3. **REFACTOR:** Remove duplication, improve names, extract methods.

**Show each iteration explicitly:**
```
=== Iteration {{N}} ===
--- Behavior: {{description}} ---

[RED] New test:
  {{test code}}

[GREEN] Implementation change:
  {{production code}}

[REFACTOR] Cleanup:
  {{refactored code}}

All tests: ✅ {{pass_count}} passing
```

**Guidelines:**
- Never write production code without a failing test.
- Each test should add exactly one new constraint.
- Tests should be independent and fast.
- Use the Transformation Priority Premise for implementation evolution:
  `constant → variable → conditional → iteration → recursion`

**After all iterations, provide:**
1. The complete test file (all tests).
2. The complete production code (final refactored version).
3. A summary of the TDD journey (what was learned at each step).
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{FEATURE_NAME}}` | Feature to build | `Password Strength Validator` |
| `{{LANGUAGE}}` | Language | `TypeScript`, `Python`, `Java` |
| `{{TEST_FRAMEWORK}}` | Test framework | `Jest`, `pytest`, `JUnit 5` |
| `{{FEATURE_DESCRIPTION}}` | What it should do | `Validate passwords: min 8 chars, uppercase, lowercase, digit, special char` |

## Tips & Variations

- For BDD: "Use Gherkin/Cucumber syntax for the outer loop, TDD for the inner loop."
- Add: "Include outside-in TDD (London school) with mocking."

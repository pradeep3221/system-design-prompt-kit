# Unit Testing Guide

> Write effective, isolated unit tests following best practices and the AAA pattern.

## Category
`testing-strategies`

## Complexity
`basic`

## Prompt

```text
You are a testing expert. Write comprehensive unit tests for the following code.

**Language:** {{LANGUAGE}}
**Test framework:** {{TEST_FRAMEWORK}}
**Code to test:**

```{{LANGUAGE}}
{{CODE_SNIPPET}}
```

**Follow these unit testing principles:**

### 1. Test Structure (AAA Pattern)
- **Arrange:** Set up test data and dependencies.
- **Act:** Execute the method under test.
- **Assert:** Verify the expected outcome.

### 2. Test Naming Convention
Use descriptive names: `methodName_scenario_expectedBehavior`
Examples:
- `calculateTotal_withDiscount_returnsDiscountedPrice`
- `validateEmail_withInvalidFormat_throwsValidationError`

### 3. Test Categories
Write tests for:
- **Happy path:** Normal, expected inputs → expected outputs
- **Edge cases:** Boundary values, empty inputs, null/undefined
- **Error cases:** Invalid inputs, exception scenarios
- **State transitions:** Before/after state changes

### 4. Mocking & Isolation
- Mock all external dependencies (database, HTTP, file system)
- Use dependency injection for testability
- Verify mock interactions (called with correct arguments)
- Reset mocks between tests

### 5. Test Quality Checklist
- [ ] Each test tests exactly ONE behavior
- [ ] Tests are independent (no shared mutable state)
- [ ] Tests run fast (< 100ms each)
- [ ] Test names describe the scenario and expected outcome
- [ ] No conditional logic in tests
- [ ] Magic values replaced with named constants
- [ ] Assertions have clear failure messages

### 6. Code Coverage
- Identify untested branches and paths
- Target: 80%+ line coverage, 100% for critical business logic
- Flag lines that are untestable and explain why

**Output:** Complete test file with all test cases, organized by test suite.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{LANGUAGE}}` | Language | `TypeScript`, `Python`, `C#` |
| `{{TEST_FRAMEWORK}}` | Framework | `Jest`, `pytest`, `xUnit + Moq` |
| `{{CODE_SNIPPET}}` | Code to test | Function or class code |

## Tips & Variations

- Add: "Use property-based testing for mathematical functions."
- Add: "Generate a mutation testing analysis."

---
id: "testing-e2e"
version: "1.0.0"
category: "testing-strategies"
complexity: "intermediate"
tags: ["e2e-testing", "playwright", "cypress", "user-journeys"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# E2E Testing Strategy

> Design end-to-end test suites covering complete user journeys.

## Metadata
- **Category:** `testing-strategies`
- **Complexity:** `intermediate`

## Context

Use this prompt when designing end-to-end tests for user-facing flows.

- **Use case:** Critical path testing, regression test suites, release validation.
- **Prerequisites:** User journeys, page/screen inventory, test environment.
- **Scope:** Test scenarios, page objects, data setup/teardown, CI integration.

## Prompt

```text
You are a QA architect. Design an E2E testing strategy for {{APP_NAME}}.

**Application type:** {{APP_TYPE}}
**E2E framework:** {{E2E_FRAMEWORK}}
**Critical user journeys:** {{USER_JOURNEYS}}

**Design the following:**

### 1. Test Scope Selection
Apply the testing pyramid — E2E tests should cover:
- Critical user workflows (revenue-impacting, safety-critical)
- Cross-service/cross-component integrations
- Authentication and authorization flows
- NOT: Individual component logic (that's unit/integration territory)

### 2. Test Scenarios (Gherkin format)

```gherkin
Feature: {{JOURNEY_NAME}}

  Scenario: Successful {{action}}
    Given {{precondition}}
    When {{user action}}
    Then {{expected outcome}}

  Scenario: {{Error scenario}}
    Given {{precondition}}
    When {{action that fails}}
    Then {{error handling}}
```

### 3. Page Object / Component Model
- Abstract UI interactions into reusable page objects.
- Selectors strategy: data-testid > ARIA roles > CSS selectors
- Wait strategies (avoid hard waits, use explicit conditions)

### 4. Test Data Management
- Factory pattern for test data creation
- API-based setup (skip UI for preconditions)
- Cleanup strategy (after each test or test suite)
- Isolated test environments vs. shared staging

### 5. Reliability Patterns
- Retry logic for flaky network-dependent steps
- Screenshot/video on failure
- Parallel execution strategy
- CI/CD integration (headless browser, container-based)

### 6. Performance Budget
- Maximum E2E suite execution time: {{MAX_DURATION}}
- Individual test timeout
- Parallel thread count

### 7. Smoke vs. Full Regression
- Smoke suite: Top 5-10 critical paths (run on every deploy)
- Full regression: Complete E2E suite (run nightly or before release)

**Provide:** Implementation code for the top 3 most critical test scenarios.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{APP_NAME}}` | Application name | `E-Commerce Web App` |
| `{{APP_TYPE}}` | Application type | `SPA + API`, `Mobile app`, `Multi-page web app` |
| `{{E2E_FRAMEWORK}}` | Testing framework | `Playwright`, `Cypress`, `Selenium` |
| `{{USER_JOURNEYS}}` | Critical flows | `Registration, Login, Checkout, Payment` |
| `{{MAX_DURATION}}` | Time budget | `15 minutes` |

## Tips & Variations

- For APIs only: "Design E2E API tests using Supertest/httpx without UI."
- Add: "Include visual regression testing with Percy or Chromatic."

## Composition

- **Precedes:** `devops-cicd-pipeline`
- **Follows:** `testing-integration`
- **Combines with:** `frontend-component-design`
- **Overlay:** `overlays/{tech}/testing-e2e.overlay.md`

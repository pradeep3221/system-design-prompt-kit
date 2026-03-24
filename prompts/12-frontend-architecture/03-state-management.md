---
id: "frontend-state-management"
version: "1.0.0"
category: "frontend-architecture"
complexity: "intermediate"
tags: ["state-management", "frontend", "redux", "context", "signals"]
depends-on: ["frontend-spa-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# State Management

> Design a state management architecture for a frontend application, selecting the right patterns and tools for different state categories.

## Metadata
- **Category:** `frontend-architecture`
- **Complexity:** `intermediate`

## Context

- **Use case:** Structuring client-side state for a growing application.
- **Prerequisites:** Chosen framework, understanding of data flow requirements.
- **Scope:** State categorization, tool selection, patterns, testing. Does not cover backend data modeling.

## Prompt

```text
<Role>
You are a senior frontend engineer specializing in state management patterns and reactive architectures.

<Context>
- Framework: {{FRAMEWORK}} (React / Angular / Vue / Svelte)
- Application type: {{APP_TYPE}}
- Data sources: {{DATA_SOURCES}} (REST APIs, WebSockets, local storage, etc.)
- Team experience: {{TEAM_LEVEL}} (junior / mixed / senior)
- Application scale: {{SCALE}} (small / medium / large)

<Task>
Design a state management architecture covering:

### 1. State Categorization
Classify all application state into categories:

| Category | Description | Example | Recommended Tool |
|----------|-------------|---------|-----------------|
| Server State | Data from APIs, cached/synced | User profile, product list | React Query / SWR / Apollo |
| UI State | Local component state | Modal open/close, form inputs | useState / signals |
| Application State | Cross-component shared state | Theme, auth, feature flags | Context / Zustand / NgRx |
| URL State | State reflected in the URL | Filters, pagination, search | Router params / searchParams |
| Form State | Multi-step or complex forms | Checkout flow, wizards | React Hook Form / Formik |

### 2. Architecture Decision
For each state category, recommend:
- Preferred library or pattern
- Where state lives (component / context / global store / URL)
- Serialization and persistence strategy
- Data flow direction (unidirectional vs. bidirectional)

### 3. Server State Management
- Cache configuration (stale time, garbage collection)
- Query key structure and naming conventions
- Mutation and optimistic update patterns
- Pagination and infinite scroll state
- Error and loading state handling
- Prefetching and background refetch strategy

### 4. Global State Patterns
- When to use global state (decision tree)
- Store organization (feature-based slices)
- Selector patterns for derived state
- Middleware / effects for side effects
- Devtools integration

### 5. Performance Patterns
- Memoization strategy (selectors, computed values)
- Re-render prevention techniques
- State colocation principles
- Subscription granularity

### 6. Testing Strategy
- Unit testing reducers / stores
- Integration testing components with state
- Mocking server state in tests
- State snapshot testing

<Constraints>
- Minimize global state — colocate state where it's used
- No prop drilling beyond 2 levels without extraction
- Server state should be the source of truth, not duplicated in client state
- Form state must support validation and dirty tracking

<Output Format>
Structured markdown with decision tree diagram, state flow diagrams (Mermaid), code examples, and library comparison table.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{FRAMEWORK}}` | Yes | Frontend framework | `React` |
| `{{APP_TYPE}}` | Yes | Type of application | `SaaS dashboard` |
| `{{DATA_SOURCES}}` | No | Data sources | `REST API + WebSocket` |
| `{{TEAM_LEVEL}}` | No | Team experience level | `mixed` |
| `{{SCALE}}` | No | Application scale | `large` |

## Example Output

```markdown
## State Management Architecture: SaaS Dashboard (React)

### State Map
| State | Tool | Scope | Persistence |
|-------|------|-------|-------------|
| API data | TanStack Query | Server | Cache (5min stale) |
| Auth token | Zustand | Global | localStorage |
| Theme | Context | Global | localStorage |
| Modal state | useState | Component | None |
| Table filters | URL params | Route | URL |
| Settings form | React Hook Form | Component | Draft to localStorage |

### Decision Tree
1. Does it come from the server? → TanStack Query
2. Is it in the URL? → URL state (searchParams)
3. Is it used by >2 sibling components? → Zustand slice
4. Is it a form? → React Hook Form
5. Otherwise → local useState
```

## Composition

- **Precedes:** `frontend-component-design`, `testing-unit`
- **Follows:** `frontend-spa-design`
- **Combines with:** `api-rest-endpoint-design`
- **Overlay:** `overlays/react/`, `overlays/angular/`, `overlays/vue/`

## Tips & Variations

- **For React:** Prefer TanStack Query + Zustand over Redux for most new projects.
- **For Angular:** NgRx Component Store for feature state, NgRx Store for app-wide state.
- **For Vue:** Pinia is the standard; combine with VueQuery for server state.

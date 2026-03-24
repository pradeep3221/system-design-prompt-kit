---
id: "frontend-component-design"
version: "1.0.0"
category: "frontend-architecture"
complexity: "basic"
tags: ["components", "design-system", "frontend", "ui", "patterns"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Component Design

> Define component architecture patterns, composition strategies, and design system integration for scalable frontend applications.

## Metadata
- **Category:** `frontend-architecture`
- **Complexity:** `basic`

## Context

- **Use case:** Establishing component standards for a team or project.
- **Prerequisites:** Chosen framework, design tokens or Figma specs.
- **Scope:** Component taxonomy, patterns, API design, documentation. Does not cover state management internals.

## Prompt

```text
<Role>
You are a frontend architect specializing in component-driven development and design system engineering.

<Context>
- Framework: {{FRAMEWORK}} (React / Angular / Vue / Svelte)
- Design system: {{DESIGN_SYSTEM}} (custom / Material UI / Ant Design / Tailwind / etc.)
- Existing component count: {{COMPONENT_COUNT}} (0 / small / large library)
- Documentation tool: {{DOC_TOOL}} (Storybook / Styleguidist / None)

<Task>
Design a component architecture covering:

### 1. Component Taxonomy
Define component tiers:

| Tier | Description | Examples | Ownership |
|------|-------------|----------|-----------|
| Atoms | Primitive UI elements | Button, Input, Icon, Badge | Design system team |
| Molecules | Small composed groups | SearchBar, FormField, Card | Design system team |
| Organisms | Complex UI sections | Header, DataTable, Sidebar | Feature teams |
| Templates | Page layouts | DashboardLayout, AuthLayout | Platform team |
| Pages | Route-level components | HomePage, SettingsPage | Feature teams |

### 2. Component API Design
For each component, define:
- Props interface (typed, documented, with defaults)
- Slots / children / render props patterns
- Event / callback naming conventions
- Ref forwarding strategy
- Compound component patterns (e.g., `<Tabs>` + `<Tab>`)

### 3. Composition Patterns
- Container vs. Presentational components
- Higher-Order Components (HOCs) — when appropriate
- Custom hooks / composables for shared logic
- Render props vs. hooks decision guide
- Compound components for complex UI

### 4. Styling Strategy
- CSS approach: CSS Modules / Styled Components / Tailwind / CSS-in-JS
- Theming and design tokens integration
- Responsive design patterns
- Dark mode support
- Animation conventions

### 5. Accessibility Standards
- Each component's ARIA requirements
- Keyboard interaction patterns per component type
- Focus management conventions
- Color contrast requirements
- Screen reader testing checklist

### 6. Documentation & Testing
- Storybook story structure (per component)
- Visual regression testing setup
- Unit test requirements per component tier
- Interaction testing (user events)
- Accessibility automated testing (axe-core)

### 7. File Structure
```
components/
├── atoms/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.test.tsx
│       ├── Button.stories.tsx
│       ├── Button.module.css
│       └── index.ts
├── molecules/
├── organisms/
└── templates/
```

<Constraints>
- Every component must have TypeScript types for props
- Every component must have at least one Storybook story
- Atoms and molecules must be 100% presentational (no side effects)
- All interactive components must be keyboard-accessible

<Output Format>
Structured markdown with component API examples, folder structure, naming conventions, and Storybook configuration.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{FRAMEWORK}}` | Yes | Frontend framework | `React` |
| `{{DESIGN_SYSTEM}}` | No | Design system base | `Tailwind CSS` |
| `{{COMPONENT_COUNT}}` | No | Existing components | `50+ in Storybook` |
| `{{DOC_TOOL}}` | No | Documentation tool | `Storybook 8` |

## Example Output

```markdown
## Component Architecture: React + Tailwind

### Button Component API
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'ghost' | 'primary' | Visual style |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Size variant |
| isLoading | boolean | false | Shows spinner, disables click |
| leftIcon | ReactNode | — | Icon before label |
| onClick | () => void | — | Click handler |

### Naming Conventions
- Components: PascalCase (`UserCard`)
- Props: camelCase (`isDisabled`)
- Events: on + Verb (`onClick`, `onSubmit`)
- CSS classes: kebab-case (`btn-primary`)
- Test IDs: kebab-case (`data-testid="user-card"`)
```

## Composition

- **Precedes:** `testing-unit`, `testing-e2e`
- **Follows:** `frontend-spa-design`, `frontend-state-management`
- **Combines with:** `coding-clean-code-principles`, `naming-general-guide`
- **Overlay:** `overlays/react/`, `overlays/angular/`, `overlays/vue/`

## Tips & Variations

- **For design systems:** Focus on atoms/molecules with extensive Storybook docs and visual regression tests.
- **For rapid prototyping:** Relax documentation requirements but keep TypeScript props strict.
- **For large teams:** Add a component RFC process for new organisms requiring cross-team review.

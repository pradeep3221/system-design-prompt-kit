---
id: "frontend-micro-frontend-design"
version: "1.0.0"
category: "frontend-architecture"
complexity: "advanced"
tags: ["micro-frontend", "module-federation", "architecture", "scalability"]
depends-on: ["frontend-spa-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Micro Frontend Design

> Design a micro-frontend architecture for independently deployable frontend modules with shared runtime.

## Metadata
- **Category:** `frontend-architecture`
- **Complexity:** `advanced`

## Context

- **Use case:** Large organizations with multiple teams owning different parts of a web application.
- **Prerequisites:** Existing monolith to decompose or greenfield multi-team project.
- **Scope:** Module boundaries, composition strategy, shared dependencies, deployment pipeline.

## Prompt

```text
<Role>
You are a principal frontend architect with experience designing micro-frontend systems at scale.

<Context>
- Organization: {{ORG_TEAMS}} independent frontend teams
- Current state: {{CURRENT_STATE}} (monolith / modular monolith / greenfield)
- Frameworks in use: {{FRAMEWORKS}} (single framework / mixed)
- Deployment: {{DEPLOYMENT}} (single domain / subdomains / hybrid)
- Shared design system: {{DESIGN_SYSTEM}} (yes / no / planned)

<Task>
Design a micro-frontend architecture covering:

### 1. Decomposition Strategy
- Domain-based module boundaries (identify bounded contexts)
- Page-level vs. component-level composition
- Shared vs. isolated state per micro-frontend
- Team ownership model and contract boundaries

### 2. Composition Approach
Compare and recommend one:
| Approach | Build-Time | Run-Time | Edge-Side |
|----------|-----------|---------|-----------|
| Module Federation | ✅ shared deps | ✅ lazy load | ❌ |
| Single-SPA | ❌ | ✅ orchestrator | ❌ |
| iframes | ❌ | ✅ isolation | ❌ |
| Edge-Side Includes | ❌ | ❌ | ✅ CDN |
| Web Components | ✅ | ✅ | ❌ |

### 3. Shared Dependencies
- Design system / component library integration
- Authentication and session management
- Shared utilities (i18n, analytics, feature flags)
- Version management for shared packages

### 4. Communication Patterns
- Cross-module event bus design
- Shared state management (if any)
- URL-based state sharing
- Custom events vs. pub/sub vs. shared store

### 5. Routing & Navigation
- Shell application routing strategy
- Sub-application route namespacing
- Navigation state synchronization
- Deep linking across micro-frontends

### 6. Build & Deployment
- Independent CI/CD per micro-frontend
- Shared build infrastructure
- Versioning and rollback strategy
- Canary and A/B deployment support

### 7. Performance & Resilience
- Shared dependency deduplication
- Fallback UI when a micro-frontend fails
- Loading strategy (parallel vs. sequential)
- Performance monitoring per module

### 8. Developer Experience
- Local development with mock shell
- Cross-team integration testing
- Contract testing between modules
- Documentation and API registry

<Constraints>
- Each micro-frontend must be independently deployable
- Maximum shared dependency bundle: 100KB gzipped
- Page load degradation < 500ms compared to monolith
- Must support at least 2 framework versions during migration

<Output Format>
Structured markdown with architecture diagram (Mermaid), module dependency graph, folder structure per team, and deployment pipeline diagram.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{ORG_TEAMS}}` | Yes | Number of frontend teams | `5` |
| `{{CURRENT_STATE}}` | Yes | Starting architecture | `monolith` |
| `{{FRAMEWORKS}}` | No | Framework mix | `React + Angular` |
| `{{DEPLOYMENT}}` | No | Deployment topology | `single domain` |
| `{{DESIGN_SYSTEM}}` | No | Design system status | `yes — shared Storybook` |

## Example Output

```markdown
## Micro-Frontend Architecture: E-Commerce Platform

### Module Map
| Module | Team | Framework | Route Prefix |
|--------|------|-----------|-------------|
| Shell | Platform | React 19 | `/` |
| Product Catalog | Discovery | React 19 | `/products/*` |
| Cart & Checkout | Commerce | React 19 | `/cart/*`, `/checkout/*` |
| User Account | Identity | React 19 | `/account/*` |
| Admin Portal | Ops | Angular 18 | `/admin/*` |

### Composition: Module Federation (Webpack 5)
- Shell exposes layout + auth context
- Each module is a remote with independent build
- Shared: react, react-dom, design-system (singleton)
```

## Composition

- **Precedes:** `devops-cicd-pipeline`, `testing-e2e`
- **Follows:** `frontend-spa-design`, `arch-microservices-design`
- **Combines with:** `frontend-component-design`, `frontend-state-management`
- **Overlay:** `overlays/react/`, `overlays/angular/`, `overlays/vue/`

## Tips & Variations

- **For migration:** Start with a strangler fig pattern — wrap the monolith with a shell and extract one module at a time.
- **For mixed frameworks:** Module Federation or Web Components provide the best cross-framework support.
- **For small teams:** Consider modular monolith over full micro-frontends to avoid operational overhead.

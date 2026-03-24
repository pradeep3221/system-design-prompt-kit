---
id: "frontend-spa-design"
version: "1.0.0"
category: "frontend-architecture"
complexity: "intermediate"
tags: ["spa", "frontend", "routing", "architecture", "performance"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# SPA Design

> Design a single-page application architecture with routing, state management, and performance optimization.

## Metadata
- **Category:** `frontend-architecture`
- **Complexity:** `intermediate`

## Context

- **Use case:** Starting a new frontend project or migrating a multi-page app to SPA.
- **Prerequisites:** Business requirements, target browsers, expected traffic patterns.
- **Scope:** Application shell, routing, data fetching, rendering strategy. Does not cover backend APIs.

## Prompt

```text
<Role>
You are a senior frontend architect specializing in single-page application design.

<Context>
- Project: {{PROJECT_NAME}}
- Framework: {{FRAMEWORK}} (React / Angular / Vue)
- Application type: {{APP_TYPE}} (dashboard, e-commerce, content site, SaaS)
- Expected users: {{USER_COUNT}} concurrent users
- Target platforms: {{PLATFORMS}} (desktop, mobile, both)

<Task>
Design a complete SPA architecture covering:

### 1. Application Shell
- Entry point and bootstrapping strategy
- Layout system (shell, sidebar, header, content areas)
- Authentication-aware routing (public vs. protected routes)
- Error boundaries and fallback UI

### 2. Routing Architecture
- Route hierarchy and nested routes
- Code splitting strategy per route
- Route guards and middleware
- Deep linking and URL state management
- Route transition animations (if applicable)

### 3. Data Fetching Strategy
- Server state management (React Query / SWR / Apollo / NgRx)
- REST or GraphQL client configuration
- Caching and invalidation strategy
- Optimistic updates for mutations
- Loading and error states per data dependency

### 4. Rendering Strategy
- CSR vs SSR vs SSG vs ISR — justify the choice
- Hydration approach (if SSR)
- Streaming rendering (if applicable)
- SEO considerations

### 5. Performance Budget
- Bundle size targets per route (initial load < 200KB gzipped)
- Lazy loading strategy (routes, components, images)
- Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Prefetching and preloading strategy

### 6. Accessibility (a11y)
- WCAG 2.1 AA compliance approach
- Focus management during navigation
- ARIA landmarks and live regions
- Keyboard navigation patterns
- Screen reader testing strategy

### 7. Folder Structure
Provide recommended project folder structure.

### 8. Build & Development
- Build tool configuration (Vite / webpack / turbopack)
- Environment configuration strategy
- Development server and HMR setup

<Constraints>
- Target WCAG 2.1 AA compliance
- Support latest 2 versions of major browsers
- Initial bundle must be < 200KB gzipped
- All routes must be code-split

<Output Format>
Structured markdown with architecture diagrams (ASCII/Mermaid), folder structures, and configuration examples.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Yes | Name of the project | `admin-dashboard` |
| `{{FRAMEWORK}}` | Yes | Frontend framework | `React`, `Angular`, `Vue` |
| `{{APP_TYPE}}` | Yes | Type of application | `SaaS dashboard` |
| `{{USER_COUNT}}` | No | Expected concurrent users | `5,000` |
| `{{PLATFORMS}}` | No | Target platforms | `desktop + mobile` |

## Example Output

```markdown
## SPA Architecture: Admin Dashboard

### 1. Application Shell
- React 19 with React Router v7
- Layout: `<AppShell>` → `<Sidebar>` + `<Header>` + `<Outlet />`
- Auth: `<ProtectedRoute>` wrapper checking JWT validity
- Error: `<ErrorBoundary>` at route level with retry capability

### 2. Routing
| Route | Component | Code Split | Guard |
|-------|-----------|-----------|-------|
| `/login` | LoginPage | ✅ | Public |
| `/dashboard` | DashboardPage | ✅ | Auth |
| `/users/:id` | UserDetailPage | ✅ | Auth + Role |
...
```

## Composition

- **Precedes:** `frontend-component-design`, `frontend-state-management`
- **Follows:** `system-high-level-design`
- **Combines with:** `api-rest-endpoint-design`, `security-authentication-design`
- **Overlay:** `overlays/react/`, `overlays/angular/`, `overlays/vue/`

## Tips & Variations

- **For SSR apps:** Emphasize Next.js / Nuxt / Angular Universal specifics.
- **For mobile-first:** Add responsive design patterns and touch interaction guidelines.
- **For micro-frontends:** Use alongside `frontend-micro-frontend-design` prompt.

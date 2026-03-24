---
id: "frontend-pwa-design"
version: "1.0.0"
category: "frontend-architecture"
complexity: "intermediate"
tags: ["pwa", "service-worker", "offline", "installable", "web-vitals"]
depends-on: ["frontend-spa-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Progressive Web App (PWA) Design

> Design a Progressive Web App with offline support, installability, background sync, and push notifications.

## Metadata
- **Category:** `frontend-architecture`
- **Complexity:** `intermediate`

## Context

- **Use case:** Making a web application installable and functional offline.
- **Prerequisites:** Working SPA, HTTPS deployment, understanding of target devices.
- **Scope:** Service worker, caching, installability, push notifications, background sync. Does not cover backend push infrastructure.

## Prompt

```text
<Role>
You are a frontend engineer specializing in Progressive Web Apps and service worker architecture.

<Context>
- Application: {{APP_NAME}} — {{APP_DESCRIPTION}}
- Framework: {{FRAMEWORK}} (React / Angular / Vue / vanilla)
- Offline requirement: {{OFFLINE_LEVEL}} (none / read-only / full offline)
- Push notifications: {{PUSH_REQUIRED}} (yes / no)
- Target devices: {{DEVICES}} (desktop / mobile / both)

<Task>
Design a PWA architecture covering:

### 1. Web App Manifest
- App name, short name, description
- Icons (192px, 512px, maskable)
- Theme color and background color
- Display mode (standalone / minimal-ui / fullscreen)
- Start URL and scope
- Screenshots for install prompt

### 2. Service Worker Strategy
- Registration and lifecycle management
- Update strategy (skip waiting / prompt user)

### 3. Caching Strategy
Define caching per resource type:

| Resource | Strategy | TTL | Fallback |
|----------|----------|-----|----------|
| App shell (HTML) | Cache First | Long | Offline page |
| Static assets (JS/CSS) | Cache First | Versioned | — |
| API responses | Network First | 5min stale | Cached data |
| Images | Stale While Revalidate | 24h | Placeholder |
| Fonts | Cache First | Long | System font |

### 4. Offline Experience
- Offline fallback page design
- Queued actions (forms, mutations) with Background Sync
- Conflict resolution for offline mutations
- IndexedDB schema for offline data
- Sync indicator UI patterns

### 5. Push Notifications
- VAPID key setup and subscription flow
- Notification permission UX (don't ask immediately)
- Notification payload structure
- Click handling and deep linking
- Badge and notification grouping

### 6. Installability
- Install prompt strategy (when, how to trigger)
- `beforeinstallprompt` event handling
- Custom install banner vs. browser prompt
- Post-install experience (standalone mode adjustments)

### 7. Performance & Monitoring
- Lighthouse PWA audit targets (all green)
- Web Vitals monitoring in production
- Service worker error tracking
- Cache storage quota monitoring
- Analytics for offline usage patterns

### 8. Testing
- Service worker testing strategy
- Offline simulation testing
- Push notification testing
- Cross-browser PWA support matrix

<Constraints>
- Must score 100 on Lighthouse PWA audit
- Offline fallback must load in < 1s
- Service worker must not cache user-specific data without encryption
- Push notification permission must not be requested on first visit

<Output Format>
Structured markdown with manifest.json example, service worker architecture diagram, caching strategy table, and IndexedDB schema.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{APP_NAME}}` | Yes | Application name | `TaskFlow` |
| `{{APP_DESCRIPTION}}` | Yes | Brief description | `Project management tool` |
| `{{FRAMEWORK}}` | Yes | Frontend framework | `React (Vite)` |
| `{{OFFLINE_LEVEL}}` | Yes | Offline capability needed | `read-only` |
| `{{PUSH_REQUIRED}}` | No | Push notifications needed | `yes` |
| `{{DEVICES}}` | No | Target devices | `both` |

## Example Output

```markdown
## PWA Architecture: TaskFlow

### Manifest
```json
{
  "name": "TaskFlow — Project Management",
  "short_name": "TaskFlow",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#1a73e8",
  "background_color": "#ffffff",
  "icons": [
    { "src": "/icons/192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### Caching: Workbox Configuration
- precacheAndRoute for app shell + static assets
- registerRoute for API: NetworkFirst with 5min cache
- registerRoute for images: StaleWhileRevalidate
- Offline fallback: /offline.html via setCatchHandler
```

## Composition

- **Precedes:** `devops-cicd-pipeline`, `testing-e2e`
- **Follows:** `frontend-spa-design`, `frontend-component-design`
- **Combines with:** `security-authentication-design`, `devops-monitoring-observability`
- **Overlay:** `overlays/react/`, `overlays/angular/`, `overlays/vue/`

## Tips & Variations

- **For Workbox:** Use `workbox-webpack-plugin` or `vite-plugin-pwa` for automated service worker generation.
- **For React:** `next-pwa` (Next.js) or `vite-plugin-pwa` (Vite) simplify setup.
- **For enterprise:** Add app update notification flow ("New version available — click to refresh").

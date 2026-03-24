---
id: "xcut-feature-flags-release"
version: "1.0.0"
category: "cross-cutting-concerns"
complexity: "intermediate"
tags: ["feature-flags", "release-management", "progressive-delivery", "toggles"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Feature Flags & Release Management

> Design a feature flag system for progressive delivery, A/B testing, and safe rollouts with kill-switch capability.

## Metadata
- **Category:** `cross-cutting-concerns`
- **Complexity:** `intermediate`

## Context

- **Use case:** Decoupling deployment from release, enabling safe rollouts.
- **Prerequisites:** CI/CD pipeline, deployment infrastructure.
- **Scope:** Flag taxonomy, targeting, lifecycle, tooling. Does not cover CI/CD pipeline design.

## Prompt

```text
<Role>
You are a release engineer specializing in progressive delivery and feature management.

<Context>
- System: {{SYSTEM_NAME}}
- Platform: {{PLATFORM}} (LaunchDarkly / Unleash / Flagsmith / Split / custom)
- Team size: {{TEAMS}} development teams
- Release cadence: {{CADENCE}} (daily / weekly / bi-weekly)
- Environments: {{ENVIRONMENTS}} (dev, staging, production)

<Task>
Design a feature flag system covering:

### 1. Flag Taxonomy
| Type | Purpose | Lifetime | Example |
|------|---------|----------|---------|
| Release Toggle | Gate unreleased feature | Short (days-weeks) | `enable-new-checkout` |
| Experiment Toggle | A/B test variant | Medium (weeks) | `checkout-v2-experiment` |
| Ops Toggle | Circuit breaker / kill switch | Permanent | `disable-payment-provider-x` |
| Permission Toggle | Role/entitlement gating | Long-term | `feature-advanced-analytics` |

### 2. Targeting Rules
- User segmentation (% rollout, user ID list, attribute-based)
- Environment-based defaults
- Override hierarchy (user > segment > environment > default)
- Consistent hashing for sticky assignment

### 3. Flag Lifecycle
1. **Create** — PR + flag definition with owner, expiry, description
2. **Develop** — Use flag in code, default OFF
3. **Test** — Enable in dev/staging
4. **Rollout** — Progressive: 1% → 10% → 50% → 100%
5. **Stabilize** — Monitor metrics, confirm no regressions
6. **Clean up** — Remove flag from code, archive in platform

### 4. Code Integration Patterns
- SDK initialization and caching
- Server-side vs. client-side evaluation
- Default values for SDK failures
- Flag evaluation logging for debugging
- Wrapper/utility functions for consistent usage

### 5. Monitoring & Safety
- Flag evaluation metrics (count, latency)
- Metric correlation (flag state ↔ error rate, conversion)
- Automatic rollback trigger rules
- Flag-aware alerting rules
- Stale flag detection

### 6. Governance
- Flag ownership and expiry policy
- Naming conventions: `{team}-{feature}-{type}`
- Maximum active flags policy (tech debt prevention)
- Approval workflow for production flag changes
- Audit log for all flag state changes

<Constraints>
- Flag evaluation must be < 10ms (client-side) or < 1ms (server-side cached)
- Stale flags (> 90 days) must be auto-flagged for review
- Kill switches must work within 30 seconds of activation
- Flag state changes in production require approval

<Output Format>
Structured markdown with flag taxonomy table, lifecycle diagram (Mermaid), code examples, and governance checklist.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{SYSTEM_NAME}}` | Yes | System name | `E-Commerce Platform` |
| `{{PLATFORM}}` | No | Feature flag platform | `LaunchDarkly` |
| `{{TEAMS}}` | No | Number of teams | `6` |
| `{{CADENCE}}` | No | Release cadence | `weekly` |
| `{{ENVIRONMENTS}}` | No | Environment list | `dev, staging, production` |

## Composition

- **Precedes:** `devops-cicd-pipeline`, `testing-e2e`
- **Follows:** `system-high-level-design`
- **Combines with:** `devops-monitoring-observability`, `xcut-configuration-management`

## Tips & Variations

- **For small teams:** Start with a simple JSON config file + environment variables before adopting a platform.
- **For A/B testing:** Integrate flag assignments with analytics to measure experiment outcomes.
- **For compliance:** Ensure audit logs meet regulatory requirements (who changed what, when).

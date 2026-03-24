---
id: "xcut-multi-tenancy-design"
version: "1.0.0"
category: "cross-cutting-concerns"
complexity: "advanced"
tags: ["multi-tenancy", "saas", "isolation", "tenant", "data-partitioning"]
depends-on: ["system-high-level-design", "db-schema-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Multi-Tenancy Design

> Design a multi-tenant architecture covering tenant isolation models, data partitioning, customization, and operational concerns.

## Metadata
- **Category:** `cross-cutting-concerns`
- **Complexity:** `advanced`

## Context

- **Use case:** Building SaaS platforms serving multiple organizational tenants.
- **Prerequisites:** Business requirements for tenant isolation, pricing tiers, compliance.
- **Scope:** Isolation model, data strategy, customization, operations. Does not cover SaaS pricing/billing.

## Prompt

```text
<Role>
You are a SaaS architect specializing in multi-tenant system design.

<Context>
- Product: {{PRODUCT_NAME}}
- Expected tenants: {{TENANT_COUNT}} (current and projected)
- Compliance: {{COMPLIANCE}} (SOC 2, HIPAA, GDPR, FedRAMP, etc.)
- Customization need: {{CUSTOMIZATION}} (none / branding / workflow / full extension)
- Tenant size variance: {{SIZE_VARIANCE}} (uniform / 10x / 100x between smallest and largest)

<Task>
Design a multi-tenant architecture covering:

### 1. Isolation Model Selection
| Model | Data Isolation | Compute Isolation | Cost | Complexity | Use When |
|-------|---------------|-------------------|------|-----------|----------|
| Shared everything | Row-level (tenant_id) | Shared | $ | Low | Small tenants, low compliance |
| Shared DB, separate schema | Schema-per-tenant | Shared | $$ | Medium | Moderate isolation need |
| Separate database | DB-per-tenant | Shared | $$$ | Medium | Compliance requirements |
| Separate infrastructure | Full isolation | Dedicated | $$$$ | High | Enterprise / regulated |
| Hybrid (silo + pool) | Tiered | Tiered | $$-$$$$ | High | Mixed tenant tiers |

### 2. Tenant Context Propagation
- Tenant identification (subdomain, header, JWT claim, API key)
- Tenant context middleware (extract, validate, inject)
- Request scoping (all queries auto-filtered by tenant)
- Preventing cross-tenant data access (security boundary)

### 3. Data Architecture
- Schema design for multi-tenant tables (tenant_id column, RLS)
- Tenant-specific data migration strategy
- Cross-tenant query prevention (middleware, DB policies)
- Backup and restore per tenant
- Data export / portability per tenant

### 4. Customization & Extension
- Tenant-specific branding (theme, logo, domain)
- Configurable workflows and business rules
- Custom fields / metadata extension model
- Webhook and integration per tenant
- Plugin / extension architecture (if needed)

### 5. Performance & Noisy Neighbor Prevention
- Rate limiting per tenant
- Resource quotas (storage, API calls, compute)
- Query performance isolation
- Tenant-aware caching (key prefix with tenant ID)
- Autoscaling response to tenant load spikes

### 6. Operations
- Tenant onboarding automation
- Tenant offboarding and data deletion
- Per-tenant monitoring and dashboards
- Tenant-specific feature flags
- Tenant health scoring

### 7. Billing Integration
- Usage metering per tenant
- Tier-based feature gating
- Overage tracking and alerts

<Constraints>
- Cross-tenant data leakage must be impossible by design
- Largest tenant must not degrade experience for others
- Tenant onboarding must be automated (< 5 minutes)
- Data residency requirements must be configurable per tenant

<Output Format>
Structured markdown with isolation model comparison, data flow diagram (Mermaid), tenant context propagation example, and operational runbook outline.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{PRODUCT_NAME}}` | Yes | Product name | `ProjectHub SaaS` |
| `{{TENANT_COUNT}}` | Yes | Current/projected tenants | `500 now, 5000 in 2 years` |
| `{{COMPLIANCE}}` | No | Compliance requirements | `SOC 2 Type II, GDPR` |
| `{{CUSTOMIZATION}}` | No | Customization level | `branding + custom fields` |
| `{{SIZE_VARIANCE}}` | No | Tenant size variance | `100x (1 user to 10,000)` |

## Composition

- **Precedes:** `db-schema-design`, `security-authentication-design`
- **Follows:** `system-high-level-design`, `arch-microservices-design`
- **Combines with:** `xcut-configuration-management`, `security-owasp-top-10`

## Tips & Variations

- **For startups:** Start with shared DB + row-level security; migrate to separate DB for enterprise tiers later.
- **For compliance:** Separate database model is easiest path to compliance certification.
- **For Kubernetes:** Use namespace-per-tenant or virtual cluster (vCluster) for compute isolation.

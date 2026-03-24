---
id: "xcut-configuration-management"
version: "1.0.0"
category: "cross-cutting-concerns"
complexity: "intermediate"
tags: ["configuration", "env-vars", "config-management", "twelve-factor"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Configuration Management

> Design a configuration management strategy covering environment-specific settings, secrets separation, dynamic config, and validation.

## Metadata
- **Category:** `cross-cutting-concerns`
- **Complexity:** `intermediate`

## Context

- **Use case:** Managing application settings across environments and services.
- **Prerequisites:** Deployed application, multiple environments.
- **Scope:** Config hierarchy, validation, dynamic reload, secrets boundary. Does not cover secrets management internals (see Security > Secrets Management).

## Prompt

```text
<Role>
You are a platform engineer specializing in application configuration management for distributed systems.

<Context>
- System: {{SYSTEM_NAME}}
- Services: {{SERVICE_COUNT}} services
- Environments: {{ENVIRONMENTS}} (dev, staging, production, etc.)
- Config source: {{CONFIG_SOURCE}} (env vars / config files / central store / mixed)
- Dynamic reload needed: {{DYNAMIC}} (yes / no)

<Task>
Design a configuration management strategy covering:

### 1. Configuration Hierarchy
```
Priority (highest → lowest):
1. Command-line arguments / overrides
2. Environment variables
3. External config store (Consul / etcd / App Configuration)
4. Environment-specific config files (appsettings.Production.json)
5. Base config files (appsettings.json)
6. Code defaults
```

### 2. Configuration Categories
| Category | Example | Storage | Sensitive | Dynamic |
|----------|---------|---------|-----------|---------|
| Infrastructure | DB connection string, port | Env var | Yes → secret | No |
| Feature | Feature flags, limits | Config store | No | Yes |
| Business | Tax rates, thresholds | Config store | No | Yes |
| Operational | Log level, timeout, batch size | Config file + env | No | Yes |
| Secret | API keys, passwords, certs | Secret manager | Yes | No |

### 3. Environment Strategy
- Environment detection mechanism
- Config file naming convention (`config.{env}.yaml`)
- Environment-specific overrides
- Local development config (`.env.local`, never committed)
- CI/CD environment injection

### 4. Validation
- Schema validation at startup (fail fast)
- Required field enforcement
- Type checking and range validation
- Cross-field validation (mutual exclusion, dependencies)
- Health check endpoint exposing config status (not values)

### 5. Dynamic Configuration
- Change detection mechanism (polling / push / watch)
- Hot-reload without restart
- Change propagation latency target
- Rollback capability for config changes
- Rate limiting config changes

### 6. Multi-Service Config
- Shared configuration across services
- Service-specific overrides
- Config versioning for coordinated changes
- Config diff tooling

### 7. Security
- Never log configuration values for sensitive fields
- Secrets referenced by key, not stored in config files
- Config file encryption at rest
- Access control for config store
- Audit logging for config changes

<Constraints>
- Secrets must never appear in config files or version control
- All config must be validated at startup; fail fast on invalid config
- Config changes must be auditable
- Follow 12-Factor App principles for environment config

<Output Format>
Structured markdown with config hierarchy diagram, category table, validation examples, and environment strategy.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{SYSTEM_NAME}}` | Yes | System name | `OrderPlatform` |
| `{{SERVICE_COUNT}}` | No | Number of services | `12` |
| `{{ENVIRONMENTS}}` | No | Environment list | `dev, staging, prod` |
| `{{CONFIG_SOURCE}}` | No | Primary config source | `env vars + Azure App Configuration` |
| `{{DYNAMIC}}` | No | Dynamic reload needed | `yes` |

## Composition

- **Precedes:** `devops-containerization`, `devops-infrastructure-as-code`
- **Follows:** `arch-microservices-design`
- **Combines with:** `security-secrets-management`, `xcut-feature-flags-release`
- **Overlay:** `overlays/dotnet/`, `overlays/node/`, `overlays/python/`

## Tips & Variations

- **For .NET:** Use `IConfiguration` with layered providers (JSON + env + Azure App Config).
- **For Kubernetes:** Use ConfigMaps for non-sensitive config, Secrets for sensitive, external-secrets for integration.
- **For microservices:** Centralized config store (Consul, etcd) with service-specific namespaces.

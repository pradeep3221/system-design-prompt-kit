---
id: "security-secrets-management"
version: "1.0.0"
category: "security"
complexity: "intermediate"
tags: ["secrets", "vault", "key-management", "rotation"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Secrets Management

> Design a secure strategy for managing API keys, credentials, certificates, and sensitive configuration.

## Metadata
- **Category:** `security`
- **Complexity:** `intermediate`

## Prompt

```text
You are a DevSecOps engineer. Design a secrets management strategy for {{PROJECT_NAME}}.

**Environment:** {{DEPLOYMENT_ENV}}
**Cloud provider:** {{CLOUD_PROVIDER}}
**Secrets to manage:** {{SECRET_TYPES}}

**Design the following:**

### 1. Secret Classification

| Secret Type | Example | Rotation Frequency | Storage |
|------------|---------|-------------------|---------|
| Database credentials | DB connection string | 90 days | Vault |
| API keys (own) | Service-to-service auth | 90 days | Vault |
| API keys (third-party) | Stripe, Twilio | Per vendor policy | Vault |
| Encryption keys | Data encryption keys | Annually | KMS |
| TLS certificates | Server certificates | Before expiry | Cert manager |
| SSH keys | Deployment keys | 180 days | Vault |
| JWT signing keys | Token signing | 90 days | Vault |

### 2. Storage Solution
- **Recommended tool:** {{CLOUD_PROVIDER}} native (AWS Secrets Manager, Azure Key Vault, GCP Secret Manager) or HashiCorp Vault
- Access control: IAM policies / RBAC
- Audit logging: Who accessed what, when
- Encryption at rest (KMS)

### 3. Application Integration
- SDK-based retrieval at startup
- Environment variable injection (in containers)
- Sidecar pattern for Kubernetes
- Caching strategy (TTL, refresh)
- Fallback behavior when vault is unavailable

### 4. Rotation Strategy
- Automated rotation with zero-downtime (dual-credential pattern)
- Rotation workflow: Generate new → Deploy new → Verify → Revoke old
- Alert on approaching expiration

### 5. Development Workflow
- `.env` files for local development (NEVER committed)
- `.env.example` with dummy values (committed)
- Pre-commit hooks to prevent secret leaks (git-secrets, detect-secrets)
- CI/CD secret injection (GitHub Secrets, Azure DevOps variables)

### 6. Emergency Procedures
- Compromised secret response plan
- Immediate revocation process
- Blast radius assessment
- Communication protocol

### 7. Anti-Patterns to Avoid
- Secrets in source code or config files
- Secrets in container images
- Shared secrets across environments
- Secrets in log output
- Secrets in URL query parameters
- Long-lived, never-rotated credentials

Provide implementation examples for {{LANGUAGE}}/{{FRAMEWORK}}.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name | `Microservices Platform` |
| `{{DEPLOYMENT_ENV}}` | Deployment | `Kubernetes on AWS EKS` |
| `{{CLOUD_PROVIDER}}` | Cloud | `AWS`, `Azure`, `GCP` |
| `{{SECRET_TYPES}}` | Types of secrets | `DB creds, API keys, JWT keys, TLS certs` |
| `{{LANGUAGE}}` | Language | `Node.js`, `Python`, `C#` |
| `{{FRAMEWORK}}` | Framework | `NestJS`, `FastAPI`, `ASP.NET Core` |

## Tips & Variations

- Add: "Set up automated secret scanning in CI/CD pipeline."
- For Kubernetes: "Design with External Secrets Operator."

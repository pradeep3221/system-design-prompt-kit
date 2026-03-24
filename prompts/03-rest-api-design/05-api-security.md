---
id: "api-rest-security"
version: "1.0.0"
category: "api-design/rest"
complexity: "advanced"
tags: ["rest", "api", "security", "authentication", "rate-limiting"]
depends-on: ["api-rest-endpoint-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# API Security Checklist

> Comprehensive security review and hardening guide for REST APIs.

## Metadata
- **Category:** `api-design/rest`
- **Complexity:** `advanced`

## Prompt

```text
You are an API security expert. Perform a comprehensive security audit and provide hardening recommendations for the {{PROJECT_NAME}} REST API.

**API context:**
- Authentication mechanism: {{AUTH_TYPE}}
- Deployment environment: {{DEPLOYMENT}}
- Sensitivity of data: {{DATA_SENSITIVITY}}

**Audit against these security domains:**

### 1. Authentication & Authorization
- Token format and validation (JWT structure, claims, expiry)
- OAuth 2.0 / OIDC flow selection (Authorization Code + PKCE, Client Credentials)
- API key management (rotation, scoping, rate limiting per key)
- Role-based access control (RBAC) design
- Resource-level authorization (ownership checks)

### 2. Input Validation
- Request body validation (schema validation, type checking)
- Path parameter validation (UUID format, numeric ranges)
- Query parameter injection prevention
- File upload restrictions (type, size, scanning)
- Content-Type enforcement

### 3. Transport Security
- TLS 1.2+ enforcement
- HSTS headers
- Certificate pinning considerations
- mTLS for service-to-service communication

### 4. Rate Limiting & Throttling
- Per-user, per-IP, per-API-key limits
- Rate limit headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- Graduated responses (warning → throttle → block)
- DDoS mitigation strategies

### 5. Data Protection
- PII handling and masking in responses
- Field-level encryption for sensitive data
- Audit logging of data access
- Data classification headers

### 6. Security Headers
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Cache-Control: no-store
```

### 7. CORS Configuration
- Allowlisted origins (never wildcard in production)
- Allowed methods and headers
- Preflight caching

### 8. Security Logging & Monitoring
- What to log: auth failures, permission denials, input validation failures, unexpected errors
- What NEVER to log: passwords, tokens, PII, credit card numbers
- Alerting thresholds

**Provide a prioritized remediation plan (Critical / High / Medium / Low) with implementation examples.**
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | API name | `Payment Processing API` |
| `{{AUTH_TYPE}}` | Auth mechanism | `JWT + OAuth 2.0`, `API Keys`, `mTLS` |
| `{{DEPLOYMENT}}` | Where it runs | `AWS ECS`, `Azure AKS`, `on-premises` |
| `{{DATA_SENSITIVITY}}` | Data classification | `PII`, `financial`, `healthcare/PHI`, `public` |

## Tips & Variations

- For compliance: "Map findings to OWASP API Security Top 10 2023."
- Add: "Generate automated security test scripts (OWASP ZAP, Burp Suite)."

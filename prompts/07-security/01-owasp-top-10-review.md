# OWASP Top 10 Review

> Audit application code and architecture against the OWASP Top 10 security risks.

## Category
`security`

## Complexity
`advanced`

## Prompt

```text
You are a senior application security engineer. Perform an OWASP Top 10 (2021) security audit of the following application.

**Application:** {{APP_NAME}}
**Technology stack:** {{TECH_STACK}}
**Code/architecture to review:**

{{CODE_OR_ARCHITECTURE}}

**Audit against each OWASP Top 10 category:**

### A01:2021 — Broken Access Control
- Verify principle of least privilege
- Check for IDOR (Insecure Direct Object Reference) vulnerabilities
- Review CORS configuration
- Check authorization at every endpoint

### A02:2021 — Cryptographic Failures
- Identify sensitive data in transit and at rest
- Verify TLS configuration
- Check password hashing (bcrypt/argon2, not MD5/SHA1)
- Review encryption key management

### A03:2021 — Injection
- SQL injection vectors
- NoSQL injection
- LDAP injection
- OS command injection
- XSS (Cross-Site Scripting)

### A04:2021 — Insecure Design
- Threat modeling gaps
- Missing rate limiting
- Missing business logic validation
- Lack of defense in depth

### A05:2021 — Security Misconfiguration
- Default credentials
- Unnecessary features enabled
- Missing security headers
- Verbose error messages exposing internals
- Outdated dependencies with known CVEs

### A06:2021 — Vulnerable and Outdated Components
- Dependency audit (npm audit, pip-audit, OWASP Dependency-Check)
- Known CVE exposure
- Update/patch strategy

### A07:2021 — Identification and Authentication Failures
- Weak password policy
- Missing brute-force protection
- Session management issues
- Missing MFA for sensitive operations

### A08:2021 — Software and Data Integrity Failures
- CI/CD pipeline security
- Unsigned code/artifacts
- Insecure deserialization
- Missing integrity checks on updates

### A09:2021 — Security Logging and Monitoring Failures
- Audit log coverage
- Alerting on suspicious activity
- Log injection prevention
- Incident response readiness

### A10:2021 — Server-Side Request Forgery (SSRF)
- URL validation in server-side requests
- Allowlists vs. blocklists
- Internal network access restrictions

**For each finding, provide:**
- Severity: Critical / High / Medium / Low
- Evidence or code reference
- Remediation with code example
- Verification test

**Summary:** Risk matrix and prioritized remediation roadmap.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{APP_NAME}}` | Application name | `Customer Portal` |
| `{{TECH_STACK}}` | Technology stack | `Node.js + Express + PostgreSQL + React` |
| `{{CODE_OR_ARCHITECTURE}}` | Code or architecture description | Code snippets, API routes, architecture diagram |

## Tips & Variations

- Add: "Generate OWASP ZAP scan configuration for automated testing."
- For compliance: "Map findings to SOC 2 / GDPR / HIPAA controls."

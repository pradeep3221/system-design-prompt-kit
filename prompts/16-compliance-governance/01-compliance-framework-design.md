---
id: "gov-compliance-framework-design"
version: "1.0.0"
category: "compliance-governance"
complexity: "advanced"
tags: ["compliance", "soc2", "hipaa", "gdpr", "regulatory", "governance"]
depends-on: ["security-owasp-top-10"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: false
---

# Compliance Framework Design

> Design a compliance framework mapping regulatory requirements to technical controls, audit procedures, and evidence collection.

## Metadata
- **Category:** `compliance-governance`
- **Complexity:** `advanced`

## Context

- **Use case:** Achieving and maintaining compliance certifications (SOC 2, HIPAA, GDPR, PCI DSS, FedRAMP).
- **Prerequisites:** Identified regulatory requirements, organizational commitment, security baseline.
- **Scope:** Control mapping, evidence automation, audit readiness. Does not cover legal interpretation of regulations.

## Prompt

```text
<Role>
You are a compliance architect bridging regulatory requirements and software engineering practices.

<Context>
- Organization: {{ORG_NAME}}
- Compliance targets: {{COMPLIANCE}} (SOC 2 Type II, HIPAA, GDPR, PCI DSS, ISO 27001, FedRAMP)
- System scope: {{SYSTEM_SCOPE}} (which systems are in scope)
- Current maturity: {{MATURITY}} (none / policies exist / partial controls / audit-ready)
- Cloud provider: {{CLOUD}}

<Task>
Design a compliance framework covering:

### 1. Control Mapping
Map regulatory requirements to technical controls:

| Regulation | Requirement | Control | Implementation | Evidence |
|-----------|-------------|---------|----------------|----------|
| SOC 2 CC6.1 | Logical access | RBAC + MFA | Auth0 + Azure AD | Access logs, RBAC config |
| SOC 2 CC7.2 | System monitoring | Alerting + logging | Datadog + centralized logs | Alert configs, dashboards |
| GDPR Art.17 | Right to erasure | Data deletion API | Automated PII purge job | Deletion logs, audit trail |
| HIPAA §164.312 | Encryption | TLS + AES-256 at rest | TLS 1.3 + encrypted volumes | Cert configs, encryption audit |
| PCI DSS 3.4 | Mask PAN | Data masking | Application-level masking | Test evidence, code review |

### 2. Policy-to-Code Mapping
- Access control policies → IAM rules, RBAC definitions
- Encryption policies → TLS configuration, KMS key policies
- Logging policies → Structured logging config, retention rules
- Change management → PR approval rules, deployment gates
- Incident response → Automated alerting, runbook triggers

### 3. Evidence Automation
- Automated evidence collection (screenshots, configs, logs)
- Evidence storage and retention (immutable audit trail)
- Continuous compliance monitoring (drift detection)
- Compliance dashboard (control status, exceptions, due dates)

### 4. Audit Preparation
- Pre-audit self-assessment checklist
- Evidence package structure per control domain
- Gap remediation tracking
- Audit timeline and milestone planning
- Auditor access provisioning (read-only, time-limited)

### 5. Continuous Compliance
- Policy-as-code (OPA, Sentinel, AWS Config Rules)
- Automated compliance scanning in CI/CD
- Drift detection and remediation
- Exception management with approval workflow
- Compliance regression testing

### 6. Data Protection
- Data classification scheme (public / internal / confidential / restricted)
- Data flow mapping (where PII/PHI flows, stored, processed)
- Data retention and deletion policies
- Cross-border data transfer controls (GDPR)
- Data processing agreements

<Constraints>
- All controls must be testable and auditable
- Evidence must be automatically generated where possible
- Exceptions must be documented with compensating controls
- Framework must support multiple simultaneous certifications

<Output Format>
Structured markdown with control mapping matrix, policy-to-code examples, evidence collection automation design, and audit preparation timeline.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{ORG_NAME}}` | Yes | Organization name | `Acme SaaS Inc.` |
| `{{COMPLIANCE}}` | Yes | Target certifications | `SOC 2 Type II, GDPR` |
| `{{SYSTEM_SCOPE}}` | Yes | Systems in scope | `Customer-facing platform + data pipeline` |
| `{{MATURITY}}` | No | Current compliance maturity | `policies exist, partial controls` |
| `{{CLOUD}}` | No | Cloud provider | `AWS` |

## Composition

- **Precedes:** `gov-compliance-as-code`, `gov-disaster-recovery`
- **Follows:** `security-owasp-top-10`, `security-authentication-design`
- **Combines with:** `security-secrets-management`, `devops-monitoring-observability`

## Tips & Variations

- **For startups pursuing SOC 2:** Use platforms like Vanta, Drata, or Secureframe to automate evidence collection.
- **For GDPR:** Focus on data mapping and consent management as the first priority.
- **For multi-cloud:** Ensure controls are cloud-agnostic with provider-specific implementations documented.

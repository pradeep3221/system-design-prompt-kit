---
id: "gov-compliance-as-code"
version: "1.0.0"
category: "compliance-governance"
complexity: "intermediate"
tags: ["compliance-as-code", "opa", "policy", "guardrails", "automation"]
depends-on: ["gov-compliance-framework-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Compliance as Code

> Implement compliance policies as executable code that validates infrastructure, application configurations, and deployments automatically.

## Metadata
- **Category:** `compliance-governance`
- **Complexity:** `intermediate`

## Context

- **Use case:** Automating compliance checks to prevent violations before they reach production.
- **Prerequisites:** Defined compliance controls, CI/CD pipeline, infrastructure-as-code.
- **Scope:** Policy authoring, enforcement points, scanning. Does not cover compliance framework design.

## Prompt

```text
<Role>
You are a DevSecOps engineer implementing compliance-as-code for automated policy enforcement.

<Context>
- Organization: {{ORG_NAME}}
- Compliance targets: {{COMPLIANCE}}
- IaC tool: {{IAC}} (Terraform / Bicep / CloudFormation / Pulumi)
- Policy engine: {{POLICY_ENGINE}} (OPA / Sentinel / AWS Config / Azure Policy / Checkov)
- CI/CD: {{CICD}} (GitHub Actions / Azure DevOps / GitLab CI)

<Task>
Design a compliance-as-code implementation covering:

### 1. Policy Categories
| Category | Example Rule | Enforcement Point | Severity |
|----------|-------------|-------------------|----------|
| Encryption | All S3 buckets must have encryption enabled | IaC scan (pre-deploy) | Critical |
| Access | No public ingress on port 22 | IaC scan + runtime | Critical |
| Logging | All API endpoints must have access logging | IaC scan + runtime | High |
| Tagging | All resources must have cost-center tag | IaC scan | Medium |
| Networking | No public IP on compute instances | IaC scan + runtime | High |

### 2. Policy Authoring
- Policy language and structure (Rego for OPA, Sentinel for Terraform)
- Policy testing (unit tests for policy rules)
- Policy versioning and review process
- Policy documentation (what, why, remediation)
- Exception/waiver mechanism

### 3. Enforcement Points
| Point | Timing | Tool | Action on Violation |
|-------|--------|------|-------------------|
| IDE | Code-time | IDE plugin | Warning |
| Pre-commit | Commit-time | pre-commit hook | Block |
| CI Pipeline | Build-time | Scanner step | Block |
| Pre-deploy | Deploy-time | Policy gate | Block |
| Runtime | Post-deploy | Config scanner | Alert + ticket |
| Drift detection | Periodic | Compliance scanner | Alert + auto-remediate |

### 4. CI/CD Integration
- Pipeline step for policy scanning
- Pass/fail criteria and exit codes
- Violation report format (SARIF, JSON)
- PR comment with violations
- Exception approval workflow in pipeline

### 5. Drift Detection & Remediation
- Scheduled runtime compliance scans
- Auto-remediation for safe fixes (e.g., re-enable encryption)
- Manual remediation workflow for complex violations
- Drift alert routing to responsible team
- Compliance score tracking over time

### 6. Reporting & Dashboard
- Compliance posture dashboard (pass/fail by control)
- Trend analysis (violations over time)
- Per-team compliance scorecard
- Audit-ready evidence export
- Exception/waiver tracking

<Constraints>
- Critical policy violations must block deployment
- All policies must have unit tests
- Exceptions must be time-limited and approved
- Policies must be version-controlled alongside IaC

<Output Format>
Structured markdown with policy examples (Rego/Sentinel), CI/CD pipeline integration, enforcement architecture diagram (Mermaid), and compliance dashboard design.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{ORG_NAME}}` | Yes | Organization | `Acme Corp` |
| `{{COMPLIANCE}}` | Yes | Compliance targets | `SOC 2, CIS Benchmarks` |
| `{{IAC}}` | No | IaC tool | `Terraform` |
| `{{POLICY_ENGINE}}` | No | Policy engine | `OPA + Conftest` |
| `{{CICD}}` | No | CI/CD platform | `GitHub Actions` |

## Composition

- **Precedes:** `devops-cicd-pipeline`, `devops-infrastructure-as-code`
- **Follows:** `gov-compliance-framework-design`
- **Combines with:** `security-owasp-top-10`, `devops-containerization`

## Tips & Variations

- **For Terraform:** Use `tfsec`, `checkov`, or Sentinel policies.
- **For Kubernetes:** Use OPA Gatekeeper or Kyverno for admission control policies.
- **For AWS:** Combine AWS Config Rules + Security Hub for runtime compliance.

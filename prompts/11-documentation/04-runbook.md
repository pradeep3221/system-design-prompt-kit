---
id: "docs-runbook"
version: "1.0.0"
category: "documentation"
complexity: "intermediate"
tags: ["runbook", "incident-response", "operations", "playbook"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: false
---

# Runbook / Playbook

> Create operational runbooks for incident response and common operational tasks.

## Metadata
- **Category:** `documentation`
- **Complexity:** `intermediate`

## Context

Use this prompt when creating operational runbooks for production services.

- **Use case:** On-call documentation, incident response playbooks, operational handoffs.
- **Prerequisites:** Service architecture, monitoring dashboards, common failure modes.
- **Scope:** Diagnostic procedures, escalation paths, remediation steps, decision trees.

## Prompt

```text
You are an SRE. Create an operational runbook for the following scenario.

**Service:** {{SERVICE_NAME}}
**Scenario:** {{SCENARIO}}
**Environment:** {{ENVIRONMENT}}

**Use this runbook template:**

---

# Runbook: {{TITLE}}

| Field | Value |
|-------|-------|
| **Service** | {{SERVICE_NAME}} |
| **Severity** | Critical / High / Medium / Low |
| **Last Updated** | {{DATE}} |
| **Owner** | {{TEAM}} |
| **On-Call Rotation** | {{ON_CALL_LINK}} |

## 1. Overview
Brief description of the scenario and impact.

## 2. Detection
How this issue is detected:
- Alert name and condition
- Dashboard link
- Symptoms visible to users

## 3. Impact Assessment
- Which users/services are affected?
- Is there data loss risk?
- Is the issue escalating or stable?

## 4. Immediate Actions (First 5 Minutes)

| Step | Action | Command / Link | Expected Result |
|------|--------|---------------|----------------|
| 1 | Verify the alert is real | `kubectl get pods -n {{namespace}}` | Check pod status |
| 2 | Check recent deployments | Link to CI/CD dashboard | Any recent changes? |
| 3 | Check error logs | `kubectl logs -f deployment/{{service}} -n {{namespace}}` | Look for stack traces |
| 4 | Check dependent services | Link to status page | All dependencies healthy? |

## 5. Diagnosis

### Possible Cause A: {{CAUSE_A}}
**How to verify:**
```bash
# diagnostic command
```
**How to fix:**
```bash
# fix command
```
**Verification:**
```bash
# verify fix worked
```

### Possible Cause B: {{CAUSE_B}}
**How to verify:** ...
**How to fix:** ...

### Possible Cause C: {{CAUSE_C}}
**How to verify:** ...
**How to fix:** ...

## 6. Escalation
If unresolved after {{ESCALATION_TIME}} minutes:
1. Escalate to {{ESCALATION_TEAM}}
2. Create incident in {{INCIDENT_TOOL}}
3. Start incident communication channel

## 7. Rollback Procedure (if applicable)
```bash
# Rollback to last known good deployment
{{ROLLBACK_COMMANDS}}
```

## 8. Post-Incident
- [ ] Root cause identified
- [ ] Fix deployed and verified
- [ ] Post-incident review scheduled
- [ ] Monitoring improved to catch earlier
- [ ] Runbook updated with lessons learned

## 9. Related Resources
- Architecture diagram: {{LINK}}
- Monitoring dashboard: {{LINK}}
- Previous incidents: {{LINK}}

---
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SERVICE_NAME}}` | Service name | `Order Processing Service` |
| `{{SCENARIO}}` | What's happening | `High error rate (> 5% 5xx responses)` |
| `{{ENVIRONMENT}}` | Environment | `Production Kubernetes cluster (us-east-1)` |

## Tips & Variations

- For automated remediation: "Include auto-healing scripts that can be triggered."
- Add: "Generate a decision tree diagram for the diagnosis flow."

## Composition

- **Precedes:** Go-live
- **Follows:** `devops-monitoring-observability`
- **Combines with:** `devops-cicd-pipeline`
- **Overlay:** `overlays/{tech}/docs-runbook.overlay.md`

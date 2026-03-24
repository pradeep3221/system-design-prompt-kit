# Domain Template

> Copy this directory and customize for your industry.

## Domain: {{DOMAIN_NAME}}

### Applicable Regulations
- {{Regulation 1}} — brief description
- {{Regulation 2}} — brief description

### Prompt Category Overrides

| Base Category | Additional Requirements |
|---------------|------------------------|
| API Design | {{e.g., audit logging on all endpoints}} |
| Security | {{e.g., encryption at rest required}} |
| Database Design | {{e.g., data retention policies}} |
| Testing | {{e.g., penetration testing required}} |
| DevOps | {{e.g., change management approval gates}} |

### Data Classification
| Level | Description | Handling Requirements |
|-------|-------------|----------------------|
| Public | Non-sensitive | Standard controls |
| Internal | Business-sensitive | Access controls, encryption in transit |
| Confidential | Regulated data | Encryption at rest + in transit, audit logging, access reviews |
| Restricted | Highest sensitivity | All above + MFA, data masking, geographic restrictions |

### Compliance Checklist
- [ ] Data classification applied to all entities
- [ ] Encryption requirements met per classification
- [ ] Audit logging covers all data access
- [ ] Retention policies defined and implemented
- [ ] Access control model documented
- [ ] Incident response plan includes regulatory notification

# Domain: Financial Services

> Industry-specific requirements for banking, payments, insurance, and fintech applications.

## Applicable Regulations

| Regulation | Scope | Key Requirements |
|------------|-------|------------------|
| PCI-DSS | Payment card data | Encryption, network segmentation, access controls, logging |
| SOX | Financial reporting | Audit trails, change management, access controls |
| PSD2 | Payment services (EU) | Strong Customer Authentication (SCA), open banking APIs |
| GDPR | Personal data (EU) | Consent, data minimization, right to erasure, DPO |
| SOC 2 | Service organizations | Security, availability, processing integrity, confidentiality, privacy |

## Prompt Category Overrides

### API Design
- All endpoints must include audit logging (who, what, when)
- PII fields must never appear in URLs or query parameters
- Payment endpoints require idempotency keys
- Rate limiting must be stricter on auth and payment endpoints
- API responses must not expose internal account numbers

### Security
- All data at rest must use AES-256 encryption
- TLS 1.2+ required for all data in transit
- PCI-DSS scope must be minimized (tokenization)
- Multi-factor authentication required for administrative access
- Session timeout: 15 minutes for high-privilege sessions

### Database Design
- Card numbers must be tokenized, never stored in plaintext
- PII must be stored in dedicated, encrypted columns
- Audit tables must be append-only (no UPDATE/DELETE)
- Data retention: 7 years for transaction records (SOX)
- Geographic data residency may apply (GDPR)

### Testing
- Penetration testing required annually (PCI-DSS Req 11.3)
- Automated security scanning in CI/CD pipeline
- Transaction integrity tests must cover edge cases (rounding, currency conversion)
- Load testing must simulate peak transaction volumes

### DevOps
- Change management requires dual approval for production
- Deployment windows must avoid end-of-month processing
- Rollback procedures must be tested quarterly
- Infrastructure changes require security review

## Data Classification

| Level | Examples | Requirements |
|-------|----------|--------------|
| Public | Product catalog, rates | Standard controls |
| Internal | Employee data, reports | Access controls, encryption in transit |
| Confidential | Customer PII, account data | Encryption at rest + transit, audit logging, access reviews |
| Restricted | Card numbers, credentials | Tokenization, HSM, PCI-DSS scope, geographic restrictions |

## Compliance Checklist
- [ ] PCI-DSS scope identified and minimized
- [ ] Cardholder data tokenized
- [ ] Audit logging on all data access and mutations
- [ ] Encryption at rest (AES-256) for confidential/restricted data
- [ ] TLS 1.2+ for all communications
- [ ] MFA for administrative access
- [ ] Penetration test scheduled
- [ ] Data retention policies implemented
- [ ] Incident response plan includes regulatory notification (72h for GDPR)
- [ ] SOX change management controls active

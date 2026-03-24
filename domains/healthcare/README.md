# Domain: Healthcare

> Industry-specific requirements for healthcare applications, electronic health records, and health data platforms.

## Applicable Regulations

| Regulation | Scope | Key Requirements |
|------------|-------|------------------|
| HIPAA | Protected Health Information (PHI) | Privacy Rule, Security Rule, Breach Notification |
| HITRUST CSF | Healthcare security framework | Comprehensive control framework based on HIPAA + others |
| HL7 FHIR | Health data interoperability | Standardized API format for health data exchange |
| GDPR | Personal data (EU) | Consent, data minimization, right to erasure |
| 21 CFR Part 11 | Electronic records (FDA) | Audit trails, electronic signatures, validation |

## Prompt Category Overrides

### API Design
- Use HL7 FHIR resource types where applicable (Patient, Observation, Encounter)
- All endpoints accessing PHI must require authenticated sessions
- Audit logging must capture: user, patient, resource, action, timestamp
- Break-the-glass access must be logged and reviewed
- Minimum Necessary: APIs must return only the data needed for the request

### Security
- PHI must be encrypted at rest (AES-256) and in transit (TLS 1.2+)
- Role-Based Access Control (RBAC) with principle of minimum necessary
- Automatic session timeout: 10 minutes for clinical workstations
- Multi-factor authentication for remote access
- Business Associate Agreements (BAAs) required for all third-party services

### Database Design
- PHI must be stored in dedicated, encrypted tables/columns
- De-identification: support Safe Harbor or Expert Determination methods
- Audit tables: append-only, tamper-evident
- Data retention: per state law (typically 6-10 years for medical records)
- Backup encryption required; test restores quarterly

### Testing
- HIPAA Security Rule assessment annually
- Penetration testing with focus on PHI exposure
- Access control tests: verify minimum necessary enforcement
- Disaster recovery testing: RPO < 1 hour, RTO < 4 hours for critical systems

### DevOps
- Deployment requires change advisory board (CAB) approval
- PHI must never appear in logs, error messages, or monitoring dashboards
- Container images must be scanned for vulnerabilities before deployment
- Infrastructure must support BAA requirements (e.g., AWS BAA, Azure BAA)

## Data Classification

| Level | Examples | Requirements |
|-------|----------|--------------|
| Public | Facility hours, general health info | Standard controls |
| Internal | Staff schedules, operational data | Access controls, encryption in transit |
| Confidential | De-identified health data | Encryption, access logging, re-identification risk assessment |
| PHI / Restricted | Patient records, diagnoses, medications | Full HIPAA controls: encryption, audit, access controls, BAA, breach notification |

## HIPAA Security Rule Controls

| Control | Requirement |
|---------|-------------|
| Access Control | Unique user IDs, emergency access, automatic logoff, encryption |
| Audit Controls | Hardware, software, and procedural mechanisms to record PHI access |
| Integrity | Mechanisms to authenticate and protect PHI from improper alteration |
| Transmission Security | Encryption for PHI transmitted over networks |
| Person Authentication | Verify identity of persons seeking access to PHI |

## Compliance Checklist
- [ ] PHI identified and classified across all systems
- [ ] Encryption at rest (AES-256) for all PHI
- [ ] TLS 1.2+ for all PHI transmission
- [ ] RBAC with minimum necessary access
- [ ] Audit logging on all PHI access (read and write)
- [ ] BAAs in place for all third-party services handling PHI
- [ ] Automatic session timeout configured
- [ ] De-identification capability implemented
- [ ] Breach notification procedure documented (60-day HIPAA requirement)
- [ ] Annual HIPAA Security Rule risk assessment scheduled
- [ ] Disaster recovery plan tested with RPO/RTO targets
- [ ] Staff HIPAA training documented

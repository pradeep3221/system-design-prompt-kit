# Organization Standards Template

> Copy this directory and customize for your organization.

## Organization: {{ORG_NAME}}

### Approved Technology Stacks

| Layer | Approved Technologies | Notes |
|-------|----------------------|-------|
| Frontend | {{e.g., React, Angular}} | {{version requirements}} |
| Backend | {{e.g., .NET, Node.js}} | {{version requirements}} |
| Database | {{e.g., PostgreSQL, Redis}} | {{managed service preferences}} |
| Cloud | {{e.g., Azure, AWS}} | {{account/subscription details}} |
| CI/CD | {{e.g., GitHub Actions, Azure DevOps}} | {{pipeline templates location}} |
| Monitoring | {{e.g., Datadog, Application Insights}} | {{dashboard standards}} |

### Naming Conventions

| Scope | Convention | Example |
|-------|-----------|---------|
| Repositories | {{pattern}} | {{example}} |
| Services | {{pattern}} | {{example}} |
| APIs | {{pattern}} | {{example}} |
| Databases | {{pattern}} | {{example}} |
| Environment variables | {{pattern}} | {{example}} |

### Review & Approval Process

| Change Type | Required Approvals | SLA |
|-------------|-------------------|-----|
| Feature PR | {{e.g., 2 team members}} | {{e.g., 24h}} |
| Architecture change | {{e.g., Tech Lead + Architect}} | {{e.g., 48h}} |
| Security-sensitive | {{e.g., Security team}} | {{e.g., 48h}} |
| Production deployment | {{e.g., Team Lead}} | {{e.g., same day}} |

### Internal Security Requirements
- [ ] {{e.g., All services must authenticate via corporate SSO}}
- [ ] {{e.g., VPN required for database access}}
- [ ] {{e.g., Secrets stored in corporate vault only}}
- [ ] {{e.g., Annual security training completion required}}

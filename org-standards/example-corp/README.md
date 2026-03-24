# Organization Standards: Example Corp

> Example organizational standards demonstrating how to customize the prompt library for a specific company.

## Approved Technology Stacks

| Layer | Approved Technologies | Notes |
|-------|----------------------|-------|
| Frontend | React 18+, Next.js 14+ | TypeScript required |
| Backend | .NET 8+, Node.js 20+ (NestJS) | .NET preferred for new services |
| Database | PostgreSQL 16+, Redis 7+ | Azure Database for PostgreSQL (Flexible Server) |
| Cloud | Azure | West US 2 (primary), East US (DR) |
| CI/CD | GitHub Actions | Use shared workflow templates from `platform-team/gh-actions` |
| Monitoring | Azure Monitor, Application Insights | All services must emit OpenTelemetry traces |
| Messaging | Azure Service Bus | Standard tier minimum |

## Naming Conventions

| Scope | Convention | Example |
|-------|-----------|---------|
| Repositories | `{team}-{service}-{type}` | `payments-api-service`, `orders-ui-web` |
| Services | `{domain}.{service}` | `payments.processor`, `orders.api` |
| API Base URL | `api.examplecorp.com/{domain}/v{n}` | `api.examplecorp.com/payments/v1` |
| Databases | `{env}_{domain}_{service}_db` | `prod_payments_processor_db` |
| Environment variables | `EXCO_{CATEGORY}_{NAME}` | `EXCO_DB_CONNECTION_STRING` |
| Feature flags | `{team}.{feature}.{variant}` | `payments.instant-transfer.enabled` |

## Coding Standards (Additions to Base Library)

### .NET Services
- Use Minimal APIs for new services
- Follow the corporate solution template: `dotnet new exco-service`
- Health checks required: `/health/live` and `/health/ready`
- Use MediatR for CQRS within services
- NuGet packages must come from internal feed only

### React/Next.js Applications
- Use the corporate design system: `@exco/design-system`
- Authentication via `@exco/auth-react` (wraps MSAL)
- State management: Zustand for client state, React Query for server state
- E2E tests with Playwright

### All Services
- OpenTelemetry instrumentation required (traces, metrics, logs)
- Structured logging with correlation IDs
- API versioning via URL path (`/v1/`, `/v2/`)
- Health endpoints excluded from authentication

## Review & Approval Process

| Change Type | Required Approvals | SLA |
|-------------|-------------------|-----|
| Feature PR | 2 team members (1 senior) | 24h |
| Architecture change | Tech Lead + Domain Architect | 48h |
| Security-sensitive | AppSec team review | 48h |
| Database migration | DBA review + Tech Lead | 48h |
| Production deployment | Team Lead approval | Same day |
| New external dependency | Tech Lead + Security | 72h |

## Internal Security Requirements
- [ ] All services authenticate via Azure AD (Entra ID)
- [ ] Service-to-service auth uses managed identities
- [ ] Secrets stored in Azure Key Vault only (no env vars for secrets)
- [ ] All APIs require OAuth 2.0 bearer tokens
- [ ] VPN required for direct database access
- [ ] Container images scanned with Trivy before deployment
- [ ] Annual security training completion (tracked in LMS)
- [ ] PII access requires data steward approval
- [ ] Incident response follows corporate IRP (see Confluence)

## Deployment Standards
- All deployments go through staging → production
- Blue-green deployment for stateless services
- Database migrations run as separate pipeline step with manual gate
- Rollback procedure documented in service runbook
- Feature flags for all user-facing changes (progressive rollout)

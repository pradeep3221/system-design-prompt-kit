# Prompt Library — Architecture Analysis & Enhancement Plan

> **Prepared by:** Senior AI Architect & Software Engineering Governance Expert  
> **Date:** 2026-03-24  
> **Scope:** Full audit of `system-design-prompt-kit` — validation, gap analysis, and enhancement roadmap to transform this into a **Prompt-Driven Engineering Platform**.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Gap Analysis](#2-gap-analysis)
3. [Enhanced Repository Structure](#3-enhanced-repository-structure)
4. [Prompt Design Standard](#4-prompt-design-standard)
5. [Workflow Orchestration Model](#5-workflow-orchestration-model)
6. [Agent Integration Model](#6-agent-integration-model)
7. [Recommendations](#7-recommendations)
8. [Implementation Roadmap](#8-implementation-roadmap)

---

## 1. Executive Summary

### Current State Assessment

The library is **well-structured and production-quality** at its current scope. It contains **43 atomic prompts** across 11 categories, 4 templates, and 3 worked examples. The prompt template is consistent, uses `{{PLACEHOLDER}}` parameterization, and covers core software engineering disciplines.

**Strengths:**
- Consistent prompt template (Title → Category → Complexity → Prompt → Variables → Example → Tips)
- Strong coverage of system design, API design, security, and testing
- Technology-agnostic core with cross-language examples
- Well-documented contribution guidelines with conventional commits
- High-quality worked examples demonstrating prompt composition

**Overall Rating:** ★★★★☆ (4/5) — Excellent prompt library, not yet a platform.

### Transformation Required

To become a **Prompt-Driven Engineering Platform**, the library needs evolution across six axes:

| Axis | Current | Target |
|------|---------|--------|
| **Technology coverage** | Language-agnostic prompts | Technology-specific overlays (.NET, Python, React, etc.) |
| **Architecture taxonomy** | 4 patterns (micro, event, CQRS, hex) | 8+ patterns with hierarchy (foundational → advanced) |
| **Domain extensibility** | None | Plug-in model for domains & org standards |
| **Workflow orchestration** | Standalone prompts | Multi-step workflow pipelines |
| **AI agent alignment** | Manual copy-paste usage | Native Copilot / Cursor / MCP integration |
| **Governance** | Single CONTRIBUTING.md | Versioned prompt governance framework |

---

## 2. Gap Analysis

### 2.1 Technology Categorization Gaps

#### Backend Technologies

| Technology | Coverage | Status |
|------------|----------|--------|
| General REST API design | ✅ Full | 5 prompts dedicated |
| General architecture patterns | ✅ Full | 4 prompts |
| **.NET / ASP.NET Core** | ⚠️ Mentioned in examples | No dedicated prompts or conventions |
| **Python / FastAPI / Django** | ⚠️ Mentioned in examples | No dedicated prompts |
| **Java / Spring Boot** | ⚠️ Mentioned in examples | No dedicated prompts |
| **Node.js / NestJS / Express** | ⚠️ Used in code review example | No dedicated prompts |
| **Go** | ⚠️ Mentioned in naming conventions | No dedicated prompts |
| **GraphQL** | ❌ Missing | Not covered at all |
| **gRPC** | ⚠️ Mentioned in microservices | No dedicated design prompt |

#### Frontend Technologies

| Technology | Coverage | Status |
|------------|----------|--------|
| **Angular** | ❌ Missing | Not covered |
| **React** | ❌ Missing | Not covered |
| **Vue** | ❌ Missing | Not covered |
| **SPA design** | ❌ Missing | No frontend architecture prompts |
| **Micro Frontends (MFE)** | ❌ Missing | Not covered |
| **PWA** | ❌ Missing | Not covered |

#### Application Types

| Type | Coverage | Status |
|------|----------|--------|
| REST APIs | ✅ Full | Dedicated category |
| **GraphQL APIs** | ❌ Missing | No schema design, resolver, or federation prompts |
| **Worker Services / Background Jobs** | ❌ Missing | No prompt for job design, scheduling, retry patterns |
| **Event-driven / Messaging** | ⚠️ Partial | Architecture-level coverage, no implementation prompts |
| **CLI Applications** | ❌ Missing | Not covered |
| **Real-time (WebSocket/SSE)** | ❌ Missing | Not covered |

#### **Verdict:** The library is strongly backend-API-centric. Frontend, GraphQL, worker services, and technology-specific overlays are entirely missing.

---

### 2.2 System Design Categorization Gaps

#### Architecture Patterns

| Pattern | Status | Current Coverage |
|---------|--------|-----------------|
| Microservices | ✅ Full | `05-architecture-patterns/01-microservices-design.md` |
| Event-Driven | ✅ Full | `05-architecture-patterns/02-event-driven-architecture.md` |
| CQRS | ✅ Full | `05-architecture-patterns/03-cqrs-pattern.md` |
| Clean / Hexagonal | ✅ Full | `05-architecture-patterns/04-clean-hexagonal-architecture.md` |
| **Monolith (Modular)** | ❌ Missing | No prompt for well-structured monolith design |
| **Layered Architecture** | ❌ Missing | No N-tier / layered architecture prompt |
| **Serverless** | ❌ Missing | No FaaS / serverless design prompt |
| **Domain-Driven Design (DDD)** | ⚠️ Partial | Referenced inside microservices; no standalone DDD prompt |
| **Saga / Orchestration patterns** | ⚠️ Partial | Mentioned in event-driven; no dedicated prompt |
| **Strangler Fig / Migration** | ⚠️ Partial | Mentioned in microservices; no standalone prompt |
| **BFF (Backend for Frontend)** | ❌ Missing | Not covered |
| **Service Mesh** | ❌ Missing | Mentioned but not a dedicated prompt |

#### Missing Hierarchy

Current architecture prompts are flat (no progression). Recommended hierarchy:

```
Foundational               → Layered Architecture, Modular Monolith
Intermediate               → Clean/Hexagonal, DDD (Tactical + Strategic)
Advanced                   → Microservices, Event-Driven, CQRS
Specialized                → Serverless, BFF, Service Mesh, Saga Patterns
Migration                  → Strangler Fig, Monolith-to-Microservices
```

---

### 2.3 Domain / Organization Extensibility Gaps

**Current state:** Zero support for domain-specific or organization-specific customization.

| Requirement | Status |
|-------------|--------|
| Domain-specific standards (Insurance, Banking, Retail, Healthcare) | ❌ Missing |
| Organization naming conventions | ❌ Missing |
| Compliance requirements (HIPAA, GDPR, SOX, PCI-DSS) | ⚠️ Mentioned in security prompts, no dedicated structure |
| API governance rules per org | ❌ Missing |
| Organization security policies | ❌ Missing |
| Plug-in model for extensions | ❌ Missing |
| Extension points or override mechanism | ❌ Missing |

**Verdict:** The library has no mechanism to extend prompts with domain or organization context. This is essential for enterprise adoption.

---

### 2.4 Prompt Modularity & Reusability Gaps

| Aspect | Status | Notes |
|--------|--------|-------|
| Atomic (single responsibility) | ✅ Strong | Each prompt addresses one concern |
| Parameterized | ✅ Strong | Consistent `{{PLACEHOLDER}}` usage |
| Composable | ⚠️ Weak | No explicit composition mechanism; examples show manual composition in worked examples |
| **Context block** | ❌ Missing | No standardized "context inject" section |
| **Constraints block** | ❌ Missing | No standardized constraints section |
| **Output format block** | ⚠️ Implicit | Embedded in prompt body, not separated |
| **Prerequisite/dependency declaration** | ❌ Missing | No way to declare "run prompt X before this one" |
| **Metadata / frontmatter** | ❌ Missing | No YAML frontmatter for machine-readable metadata |

**Current prompt format:**
```markdown
# Title
> Description
## Category / Complexity
## Prompt (monolithic text block)
## Variables
## Example Output
## Tips
```

**Missing for composability:**
- YAML frontmatter with `id`, `version`, `depends-on`, `tags`, `tools`
- Separated Context / Task / Constraints / Output Format sections
- Input/Output contract definitions for chaining

---

### 2.5 Workflow Orchestration Gaps

**Current state:** No workflow support at all. All 43 prompts are standalone.

| Requirement | Status |
|-------------|--------|
| Multi-step workflow definitions | ❌ Missing |
| Prompt chaining / sequencing | ❌ Missing |
| Design → Generate → Validate → Review → Optimize pipeline | ❌ Missing |
| Tool-specific workflow configuration | ❌ Missing |
| Workflow templates | ❌ Missing |
| Conditional branching in workflows | ❌ Missing |

The 3 worked examples in `examples/` demonstrate manual composition, but there is no formal workflow model.

---

### 2.6 AI Agent Ecosystem Alignment Gaps

**Current state:** No AI agent integration. Prompts are designed for manual copy-paste.

| Ecosystem | Status | Notes |
|-----------|--------|-------|
| **GitHub Copilot** `.instructions.md` | ❌ Missing | No Copilot instruction files |
| **Copilot Agent Mode** skills/subagents | ❌ Missing | No SKILL.md or agent definitions |
| **Cursor Rules** `.mdc` files | ❌ Missing | No Cursor-compatible rules |
| **MCP (Model Context Protocol)** | ❌ Missing | No MCP tool definitions |
| **CLI agent workflows** | ❌ Missing | No CLI-compatible prompt invocation |
| **.github/copilot-instructions.md** | ❌ Missing | No workspace-level Copilot config |
| **VS Code agent customization** | ❌ Missing | No `.agent.md` or `.prompt.md` files |

**Verdict:** This is the largest structural gap. The library is a static document collection with no integration into the modern AI agent ecosystem.

---

### 2.7 External References Integration Gaps

| Reference | Status |
|-----------|--------|
| Cursor Rules ecosystem (cursor.directory) | ❌ Not referenced or integrated |
| GitHub awesome-copilot instructions | ❌ Not referenced |
| Microsoft .NET Skills for Copilot | ❌ Not referenced |
| MCP connectors (Microsoft Learn) | ❌ Not referenced |
| Import/normalize/version/extend external rules | ❌ No mechanism |

---

### 2.8 Additional Gaps — Deep Audit

A secondary pass reveals **29 additional gaps** across engineering practices, operational patterns, and platform coverage not identified in sections 2.1–2.7.

#### Completely Missing (Zero Coverage) — 10 topics

| # | Topic | Impact | Notes |
|---|-------|--------|-------|
| 1 | **Performance Engineering** | High | No load testing, profiling, benchmarking, or APM prompt. Scattered mentions only. |
| 2 | **Accessibility (a11y)** | High | No WCAG compliance, ARIA, screen reader, keyboard navigation prompts. Critical for frontend category. |
| 3 | **AI/ML Integration Patterns** | High | No prompts for LLM integration, model serving, RAG patterns, embedding strategies, AI agent design. Major gap given the AI-driven development focus. |
| 4 | **Multi-tenancy Design** | Medium | No tenant isolation, data partitioning, per-tenant customization prompts. Essential for SaaS. |
| 5 | **Chaos Engineering / Resilience Testing** | Medium | No fault injection, chaos monkey, failure scenario design prompts. |
| 6 | **Mobile Development** | Medium | No iOS, Android, Flutter, React Native architecture patterns. |
| 7 | **Desktop Development** | Low | No Electron, MAUI, WPF prompts. |
| 8 | **Estimation & Planning** | Medium | No story pointing, complexity estimation, planning/sizing prompts. |
| 9 | **Prompt Engineering (Meta)** | High | No meta-prompts for writing, improving, or testing prompts themselves. Critical for a prompt platform. |
| 10 | **Developer Onboarding** | Medium | No dedicated prompt for generating onboarding docs, new-joiner guides, or repo walkthroughs. |

#### Partially Covered / Scattered (Needs Dedicated Prompts) — 19 topics

| # | Topic | Current State | What's Missing |
|---|-------|--------------|----------------|
| 11 | **Internationalization (i18n/l10n)** | Error localization mentioned in 1 variant | Dedicated i18n architecture prompt (message catalogs, locale strategy, RTL support) |
| 12 | **Data Engineering / ETL** | Brief mention in LLD prompt variant | No data pipeline design, ETL patterns, stream processing prompts |
| 13 | **API Gateway Design** | Mentioned in security & system design | No comprehensive gateway design prompt (routing, aggregation, transformation, auth offloading) |
| 14 | **Disaster Recovery / Business Continuity** | Failover mentioned in passing | No RTO/RPO planning, backup strategy, recovery testing, DR runbook prompt |
| 15 | **Cost Optimization** | "Cost Analysis" section in scalability prompt | No dedicated cloud cost optimization, FinOps, architecture cost modeling prompt |
| 16 | **Release Management / Feature Flags** | Scattered mentions | No comprehensive rollout strategy, canary deployment, feature flag lifecycle prompt |
| 17 | **Configuration Management** | Environment variables only | No app config design, feature toggles, dynamic config, config-as-code prompt |
| 18 | **Caching Strategies** | Scattered across multiple prompts | No dedicated caching design prompt (cache-aside, write-through, TTL strategy, cache invalidation) |
| 19 | **Real-time Communication** | Cursor pagination mentions real-time feeds | No WebSocket, SSE, SignalR, or real-time architecture prompt |
| 20 | **Async / Reactive Programming** | Mentioned in system design & events | No dedicated reactive patterns, backpressure, async pipeline design prompt |
| 21 | **Dependency Management** | Only vulnerability scanning | No version pinning strategy, dependency tree management, monorepo dep strategy prompt |
| 22 | **Git Workflows / Branching Strategy** | Branch strategy parameter in CI/CD | No dedicated git workflow prompt (GitFlow, trunk-based, release branching, merge strategies) |
| 23 | **Compliance & Regulatory Frameworks** | Mentioned as variations (SOC2/GDPR/HIPAA) | No systematic compliance design prompt with controls mapping |
| 24 | **OpenAPI / Swagger Generation** | Snippets in API endpoints | No dedicated spec-first design, tooling, validation, or SDK generation prompt |
| 25 | **Contract Testing** | "API contract testing" in CI/CD | No Pact, consumer-driven contracts, or schema evolution prompt |
| 26 | **Cross-Cutting Concerns** | Correlation IDs & W3C trace context mentioned | No dedicated request-tracing, correlation, or distributed context propagation prompt |
| 27 | **SLOs / SLIs / Error Budgets** | Mentioned in monitoring prompt | No dedicated SRE-focused SLO design, error budget policy, or alerting threshold prompt |
| 28 | **Technical Debt Management** | Refactoring prompt exists | No debt inventory, prioritization framework, or debt paydown planning prompt |
| 29 | **Compliance-as-Code** | Not addressed | No policy-as-code (OPA, Sentinel), automated compliance checking, audit trail design prompt |

#### Gap Severity Heat Map

```
                        Coverage Depth →
                  None          Partial        Full
              ┌───────────┬───────────────┬──────────┐
   Critical   │ a11y      │               │ Security │
   (must fix) │ AI/ML     │               │ API      │
              │ Perf test │               │ Testing  │
              │ Meta-prompt│              │          │
              ├───────────┼───────────────┼──────────┤
   High       │ Mobile    │ Caching       │ Sys Dsgn │
   (should    │ Multi-ten.│ Release mgmt  │ DevOps   │
    fix)      │ Chaos eng │ Config mgmt   │ DB Dsgn  │
              │           │ Git workflow  │ Review   │
              │           │ Compliance    │          │
              ├───────────┼───────────────┼──────────┤
   Medium     │ Desktop   │ DR/BCP        │ Naming   │
   (nice to   │ Estimation│ Cost optim.   │ Coding BP│
    have)     │ Onboarding│ i18n/l10n     │ Docs     │
              │           │ Contract test │          │
              └───────────┴───────────────┴──────────┘
```

---

### 2.9 Redundancy Analysis

| Finding | Severity |
|---------|----------|
| Clean Code Principles (01-01) overlaps with DRY/KISS (01-03) on duplication | Low — acceptable, different focus |
| Error Handling (01-04) overlaps with API Error Responses (03-02) | Low — different abstraction levels |
| OWASP review (07-01) partially overlaps with API Security (03-05) and Input Validation (07-03) | Medium — could benefit from cross-references |
| Architecture Review (10-03) overlaps with Trade-Off Analysis (04-04) | Low — code review vs. design time |

**Verdict:** Minimal redundancy. The library is well-factored. Adding explicit cross-references would help users navigate overlaps.

---

## 3. Enhanced Repository Structure

### 3.1 Production-Ready Folder Structure

```
system-design-prompt-kit/
│
├── README.md                              # Platform overview & navigation
├── LICENSE                                # MIT License
├── CONTRIBUTING.md                        # Enhanced contribution guide
├── CODE_OF_CONDUCT.md                     # Community guidelines
├── CHANGELOG.md                           # Version history (SemVer)
├── prompt-standard.md                     # Prompt Design Standard (new)
│
├── .github/                               # GitHub automation
│   ├── copilot-instructions.md            # 🆕 Workspace-level Copilot context
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── new_prompt.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       ├── validate-prompts.yml           # Lint prompt structure
│       └── version-check.yml             # Enforce SemVer on prompts
│
├── prompts/                               # 🔑 Core prompt library (universal)
│   ├── 01-coding-best-practices/          # (existing — no changes)
│   ├── 02-naming-conventions/             # (existing — no changes)
│   ├── 03-api-design/                     # ✏️ Renamed from rest-api-design
│   │   ├── rest/                          # 🆕 REST sub-category
│   │   │   ├── 01-endpoint-design.md
│   │   │   ├── 02-error-response-design.md
│   │   │   ├── 03-api-versioning.md
│   │   │   ├── 04-pagination-filtering.md
│   │   │   └── 05-api-security.md
│   │   ├── graphql/                       # 🆕 GraphQL prompts
│   │   │   ├── 01-schema-design.md
│   │   │   ├── 02-resolver-patterns.md
│   │   │   ├── 03-federation.md
│   │   │   └── 04-graphql-security.md
│   │   ├── grpc/                          # 🆕 gRPC prompts
│   │   │   ├── 01-protobuf-design.md
│   │   │   └── 02-service-contracts.md
│   │   └── README.md
│   ├── 04-system-design/                  # (existing — no changes)
│   ├── 05-architecture-patterns/          # ✏️ Expanded
│   │   ├── foundational/                  # 🆕 Tier 1
│   │   │   ├── 01-layered-architecture.md
│   │   │   └── 02-modular-monolith.md
│   │   ├── intermediate/                  # 🆕 Tier 2
│   │   │   ├── 01-clean-hexagonal-architecture.md  # (moved)
│   │   │   └── 02-domain-driven-design.md          # 🆕
│   │   ├── advanced/                      # 🆕 Tier 3
│   │   │   ├── 01-microservices-design.md           # (moved)
│   │   │   ├── 02-event-driven-architecture.md      # (moved)
│   │   │   └── 03-cqrs-pattern.md                   # (moved)
│   │   ├── specialized/                   # 🆕 Tier 4
│   │   │   ├── 01-serverless-architecture.md
│   │   │   ├── 02-backend-for-frontend.md
│   │   │   └── 03-saga-orchestration.md
│   │   ├── migration/                     # 🆕 Tier 5
│   │   │   ├── 01-strangler-fig-pattern.md
│   │   │   └── 02-monolith-to-microservices.md
│   │   └── README.md
│   ├── 06-database-design/               # (existing — no changes)
│   ├── 07-security/                       # (existing — no changes)
│   ├── 08-testing-strategies/             # (existing — no changes)
│   ├── 09-devops-cicd/                    # (existing — no changes)
│   ├── 10-code-review/                    # (existing — no changes)
│   ├── 11-documentation/                  # (existing — no changes)
│   ├── 12-frontend-architecture/          # 🆕 Frontend category
│   │   ├── 01-spa-design.md
│   │   ├── 02-micro-frontend-design.md
│   │   ├── 03-state-management.md
│   │   ├── 04-component-design.md
│   │   ├── 05-pwa-design.md
│   │   └── README.md
│   ├── 13-background-processing/          # 🆕 Worker services category
│   │   ├── 01-worker-service-design.md
│   │   ├── 02-job-scheduling.md
│   │   ├── 03-message-consumer-design.md
│   │   └── README.md
│   ├── 14-performance-engineering/        # 🆕 Performance & reliability
│   │   ├── 01-load-testing-strategy.md
│   │   ├── 02-performance-profiling.md
│   │   ├── 03-caching-strategy.md
│   │   ├── 04-chaos-resilience-testing.md
│   │   └── README.md
│   ├── 15-cross-cutting-concerns/         # 🆕 Operational patterns
│   │   ├── 01-feature-flags-release.md
│   │   ├── 02-configuration-management.md
│   │   ├── 03-multi-tenancy-design.md
│   │   ├── 04-i18n-l10n-strategy.md
│   │   ├── 05-slo-sli-error-budgets.md
│   │   └── README.md
│   ├── 16-compliance-governance/          # 🆕 Regulatory & compliance
│   │   ├── 01-compliance-framework-design.md    # GDPR, HIPAA, SOC2, PCI-DSS
│   │   ├── 02-disaster-recovery-planning.md
│   │   ├── 03-compliance-as-code.md             # OPA, Sentinel, audit trails
│   │   ├── 04-technical-debt-management.md
│   │   └── README.md
│   ├── 17-ai-integration/                 # 🆕 AI/ML application patterns
│   │   ├── 01-llm-integration-patterns.md       # RAG, embeddings, prompt chains
│   │   ├── 02-ai-agent-design.md                # Agent architectures, tool use
│   │   ├── 03-ml-model-serving.md               # Inference, A/B, shadow mode
│   │   └── README.md
│   └── 18-meta-prompts/                   # 🆕 Prompt engineering itself
│       ├── 01-prompt-writing-guide.md
│       ├── 02-prompt-testing-evaluation.md
│       └── README.md
│
├── overlays/                              # 🆕 Technology-specific overlays
│   ├── README.md                          # How overlays extend base prompts
│   ├── dotnet/
│   │   ├── coding-conventions.md          # C# / .NET specific conventions
│   │   ├── aspnet-api-design.md           # ASP.NET Core REST API patterns
│   │   ├── ef-core-patterns.md            # Entity Framework Core patterns
│   │   ├── minimal-api-design.md          # .NET Minimal APIs
│   │   └── dotnet-testing.md              # xUnit, NSubstitute, Moq patterns
│   ├── python/
│   │   ├── coding-conventions.md          # PEP 8, type hints, Pythonic patterns
│   │   ├── fastapi-design.md              # FastAPI patterns
│   │   ├── django-design.md               # Django REST Framework patterns
│   │   └── python-testing.md              # pytest patterns
│   ├── java/
│   │   ├── coding-conventions.md          # Java conventions
│   │   ├── spring-boot-design.md          # Spring Boot patterns
│   │   └── java-testing.md                # JUnit 5, Mockito patterns
│   ├── node/
│   │   ├── coding-conventions.md          # TypeScript / Node.js conventions
│   │   ├── nestjs-design.md               # NestJS patterns
│   │   ├── express-design.md              # Express patterns
│   │   └── node-testing.md                # Jest, Vitest patterns
│   ├── react/
│   │   ├── component-patterns.md          # Hooks, composition, state
│   │   ├── nextjs-design.md               # Next.js App Router patterns
│   │   └── react-testing.md               # React Testing Library
│   ├── angular/
│   │   ├── module-design.md               # NgModules / standalone components
│   │   ├── service-patterns.md            # RxJS, dependency injection
│   │   └── angular-testing.md             # Karma, Jasmine, Jest
│   └── vue/
│       ├── composition-api-patterns.md    # Vue 3 Composition API
│       ├── nuxt-design.md                 # Nuxt 3 patterns
│       └── vue-testing.md                 # Vitest, Vue Test Utils
│
├── domains/                               # 🆕 Domain-specific extensions
│   ├── README.md                          # How to create domain extensions
│   ├── _template/                         # Template for new domains
│   │   ├── domain-context.md              # Domain glossary & bounded contexts
│   │   ├── compliance-requirements.md     # Regulatory constraints
│   │   ├── data-classification.md         # PII, PHI etc.
│   │   └── api-governance.md              # Domain-specific API rules
│   ├── financial-services/                # Example: Banking / Insurance
│   │   ├── domain-context.md
│   │   ├── compliance-requirements.md     # PCI-DSS, SOX, KYC/AML
│   │   ├── data-classification.md
│   │   └── api-governance.md
│   ├── healthcare/                        # Example: Healthcare / Pharma
│   │   ├── domain-context.md
│   │   ├── compliance-requirements.md     # HIPAA, HL7 FHIR
│   │   └── data-classification.md
│   └── retail/                            # Example: E-Commerce / Retail
│       ├── domain-context.md
│       └── api-governance.md
│
├── org-standards/                         # 🆕 Organization-specific overrides
│   ├── README.md                          # How to create org standards
│   ├── _template/                         # Template for new organizations
│   │   ├── naming-conventions.md          # Org naming rules (extend 02-*)
│   │   ├── security-policies.md           # Org security policies (extend 07-*)
│   │   ├── api-governance.md              # Org API standards (extend 03-*)
│   │   ├── tech-radar.md                  # Approved technologies & versions
│   │   └── review-standards.md            # Org code review standards (extend 10-*)
│   └── example-corp/                      # Worked example
│       ├── naming-conventions.md
│       ├── security-policies.md
│       └── tech-radar.md
│
├── workflows/                             # 🆕 Multi-step workflow orchestrations
│   ├── README.md                          # Workflow model documentation
│   ├── api-development/
│   │   ├── workflow.md                    # Full API development pipeline
│   │   ├── 01-design.md                   # Step: Design endpoints
│   │   ├── 02-generate.md                 # Step: Generate code
│   │   ├── 03-validate.md                 # Step: Validate against standards
│   │   ├── 04-test.md                     # Step: Generate tests
│   │   └── 05-document.md                 # Step: Generate docs
│   ├── system-design/
│   │   ├── workflow.md
│   │   ├── 01-requirements.md
│   │   ├── 02-hld.md
│   │   ├── 03-lld.md
│   │   ├── 04-review.md
│   │   └── 05-adr.md
│   ├── code-review/
│   │   ├── workflow.md
│   │   ├── 01-checklist.md
│   │   ├── 02-security-scan.md
│   │   ├── 03-feedback.md
│   │   └── 04-summary.md
│   ├── greenfield-project/
│   │   ├── workflow.md
│   │   ├── 01-architecture-selection.md
│   │   ├── 02-project-scaffold.md
│   │   ├── 03-ci-cd-setup.md
│   │   └── 04-observability-setup.md
│   └── migration/
│       ├── workflow.md
│       ├── 01-assessment.md
│       ├── 02-decomposition-plan.md
│       ├── 03-incremental-migration.md
│       └── 04-validation.md
│
├── agents/                                # 🆕 AI Agent integration layer
│   ├── README.md                          # Agent integration guide
│   ├── copilot/
│   │   ├── copilot-instructions.md        # Global Copilot instructions
│   │   ├── instructions/                  # Per-concern .instructions.md files
│   │   │   ├── api-design.instructions.md
│   │   │   ├── csharp.instructions.md
│   │   │   ├── python.instructions.md
│   │   │   ├── react.instructions.md
│   │   │   ├── security.instructions.md
│   │   │   ├── testing.instructions.md
│   │   │   └── dotnet-architecture.instructions.md
│   │   └── skills/                        # Copilot Agent Mode skills
│   │       ├── api-designer/
│   │       │   └── SKILL.md
│   │       ├── code-reviewer/
│   │       │   └── SKILL.md
│   │       ├── system-designer/
│   │       │   └── SKILL.md
│   │       └── security-auditor/
│   │           └── SKILL.md
│   ├── cursor/
│   │   ├── rules/                         # Cursor .mdc rule files
│   │   │   ├── api-design.mdc
│   │   │   ├── dotnet.mdc
│   │   │   ├── python.mdc
│   │   │   ├── react.mdc
│   │   │   ├── security.mdc
│   │   │   └── testing.mdc
│   │   └── README.md                      # How to install Cursor rules
│   └── mcp/
│       ├── prompt-server/                 # MCP server exposing prompts as tools
│       │   ├── README.md
│       │   └── server-config.json
│       └── connectors/                    # Pre-built MCP connector configs
│           ├── microsoft-learn.json       # learn.microsoft.com/api/mcp
│           └── README.md
│
├── templates/                             # (existing — extended)
│   ├── adr-template.md
│   ├── rfc-template.md
│   ├── api-spec-template.md
│   ├── design-doc-template.md
│   ├── prompt-template.md                 # 🆕 Standard prompt authoring template
│   ├── overlay-template.md                # 🆕 Technology overlay template
│   ├── domain-template.md                 # 🆕 Domain extension template
│   └── workflow-template.md               # 🆕 Workflow step template
│
├── examples/                              # (existing — extended)
│   ├── sample-api-design.md
│   ├── sample-system-design.md
│   ├── sample-code-review.md
│   ├── sample-workflow-api.md             # 🆕 Worked workflow example
│   ├── sample-overlay-dotnet.md           # 🆕 Overlay usage example
│   └── sample-domain-extension.md         # 🆕 Domain extension example
│
└── scripts/                               # 🆕 Automation & validation
    ├── validate-prompts.js                # Lint all prompts against standard
    ├── generate-index.js                  # Auto-generate prompt index
    └── export-agent-configs.js            # Export prompts → agent formats
```

### 3.2 Design Decisions

| Decision | Rationale |
|----------|-----------|
| **`overlays/` separate from `prompts/`** | Base prompts remain universal; overlays add technology context without forking |
| **`domains/` and `org-standards/` at root level** | Clear separation of universal vs. domain vs. org scope; plug-in model |
| **`workflows/` at root level** | Workflows compose prompts; they are orchestration, not content |
| **`agents/` at root level** | Agent configs are build artifacts derived from prompts; separate concern |
| **Architecture tiers in subfolders** | Enables progressive learning path from foundational → specialized |
| **API design split into rest/graphql/grpc** | Avoids folder explosion; keeps related API patterns together |
| **`_template/` folders in domains and org-standards** | Convention-over-configuration; copy-and-customize model |

---

## 4. Prompt Design Standard

### 4.1 Enhanced Prompt Template

Every prompt file MUST follow this structure:

```markdown
---
# YAML Frontmatter (machine-readable metadata)
id: "prompt-category-name"          # Unique identifier
version: "1.0.0"                    # SemVer
category: "api-design/rest"         # Dot-path category
complexity: "intermediate"          # basic | intermediate | advanced
tags: ["rest", "api", "crud"]       # Searchable tags
depends-on: []                      # Prerequisite prompt IDs
tools: ["copilot", "cursor"]        # Compatible AI tools
overlay-compatible: true            # Can be extended with overlays
---

# Prompt Title

> One-line description of what this prompt produces.

## Context

Describe when and why to use this prompt. Include:
- **Use case:** When should an engineer reach for this prompt?
- **Prerequisites:** What information must be gathered first?
- **Scope:** What is in/out of scope for this prompt?

## Prompt

\```text
<System Role>
You are a [role] specializing in [domain].

<Context>
Project: {{PROJECT_NAME}}
Technology: {{TECH_STACK}}
[Additional context variables]

<Task>
[Clear, specific instructions for what the AI should produce]

<Constraints>
- [Constraint 1: e.g., "Follow Microsoft REST API Guidelines"]
- [Constraint 2: e.g., "All endpoints must be idempotent"]
- [Constraint 3: e.g., "Use OpenAPI 3.1 specification"]

<Output Format>
[Explicit format specification: Markdown, JSON, YAML, code, etc.]
[Section-by-section breakdown of expected output]
\```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{VAR}}` | Yes/No | What it represents | Sample value |

## Example Output

[A realistic, high-quality example of the expected output]

## Composition

- **Precedes:** [Prompts that typically follow this one]
- **Follows:** [Prompts that typically precede this one]
- **Combines with:** [Prompts used alongside this one]
- **Overlay:** [Technology overlays that extend this prompt]

## Tips & Variations

- Variant 1: [Adjustment for different context]
- Variant 2: [Adjustment for different tool]
```

### 4.2 Key Changes from Current Format

| Aspect | Current | Enhanced |
|--------|---------|----------|
| **Metadata** | Category + Complexity in body text | YAML frontmatter with full metadata |
| **Prompt structure** | Monolithic text block | Separated: Role → Context → Task → Constraints → Output |
| **Variables** | 3-column table | 4-column table with required flag |
| **Composition** | None | Explicit dependency and chaining declarations |
| **Tool compatibility** | None | `tools` field in frontmatter |
| **Versioning** | None | SemVer per prompt |

### 4.3 Overlay Extension Model

Technology overlays extend base prompts by injecting additional context:

```markdown
---
id: "overlay-dotnet-api-design"
extends: "prompt-api-design-endpoint"      # Base prompt ID
technology: "dotnet"
framework: "aspnet-core"
version: "1.0.0"
---

# .NET Overlay: API Endpoint Design

## Additional Context

When applying the base API Endpoint Design prompt to ASP.NET Core:

## Injected Constraints

- Use `[ApiController]` attribute on all controllers
- Use `ActionResult<T>` for typed responses
- Apply `[ProducesResponseType]` attributes for Swagger
- Use `MediatR` for CQRS separation (if applicable)
- Follow Microsoft.AspNetCore.Mvc conventions
- Use `ProblemDetails` (RFC 7807) for error responses

## Technology-Specific Variables

| Variable | Value |
|----------|-------|
| `{{FRAMEWORK}}` | ASP.NET Core 9 |
| `{{ORM}}` | Entity Framework Core |
| `{{AUTH}}` | ASP.NET Identity + JWT Bearer |
| `{{VALIDATION}}` | FluentValidation |

## Code Template

\```csharp
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[Produces("application/json")]
public class {{RESOURCE}}Controller : ControllerBase
{
    // ...
}
\```
```

---

## 5. Workflow Orchestration Model

### 5.1 Workflow Definition Format

Each workflow is a `workflow.md` file that defines a multi-step prompt pipeline:

```markdown
---
id: "workflow-api-development"
version: "1.0.0"
description: "End-to-end API development pipeline"
steps: 5
estimated-time: "30-60 minutes"
---

# API Development Workflow

## Overview

This workflow guides you through designing, implementing, validating,
testing, and documenting a REST API endpoint from scratch.

## Pipeline

\```
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌────────┐    ┌──────────┐
│ 1.Design │───▶│ 2.Generate│───▶│ 3.Validate│───▶│ 4.Test │───▶│ 5.Document│
└─────────┘    └──────────┘    └──────────┘    └────────┘    └──────────┘
\```

## Steps

### Step 1: Design
- **Prompt:** `prompts/03-api-design/rest/01-endpoint-design.md`
- **Overlay:** `overlays/{{TECH}}/api-design.md` (if applicable)
- **Input:** Project requirements, resource description
- **Output:** Resource model, endpoint table, OpenAPI spec
- **Gate:** Review endpoints before proceeding

### Step 2: Generate
- **Prompt:** `overlays/{{TECH}}/api-codegen.md`
- **Input:** Output from Step 1
- **Output:** Controller, service, repository code
- **Gate:** Code compiles and follows conventions

### Step 3: Validate
- **Prompts:**
  - `prompts/03-api-design/rest/05-api-security.md`
  - `prompts/07-security/03-input-validation.md`
  - `org-standards/{{ORG}}/api-governance.md` (if applicable)
- **Input:** Generated code from Step 2
- **Output:** Security review, validation rules, compliance check
- **Gate:** All critical findings resolved

### Step 4: Test
- **Prompts:**
  - `prompts/08-testing-strategies/01-unit-testing.md`
  - `prompts/08-testing-strategies/02-integration-testing.md`
- **Overlay:** `overlays/{{TECH}}/testing.md`
- **Input:** Code from Step 2, validation from Step 3
- **Output:** Unit tests, integration tests, test data
- **Gate:** Tests pass, coverage ≥ 80%

### Step 5: Document
- **Prompt:** `prompts/11-documentation/03-api-documentation.md`
- **Input:** All prior outputs
- **Output:** API documentation, Postman collection, changelog entry
- **Gate:** Documentation complete and reviewed

## Context Passing

Each step receives a `{{WORKFLOW_CONTEXT}}` that accumulates:
\```json
{
  "project": "{{PROJECT_NAME}}",
  "tech_stack": "{{TECH_STACK}}",
  "step_1_output": { "endpoints": [...], "schema": {...} },
  "step_2_output": { "files": [...] },
  "step_3_output": { "findings": [...] },
  "step_4_output": { "test_results": {...} }
}
\```
```

### 5.2 Workflow Catalog

| Workflow | Steps | Use Case |
|----------|-------|----------|
| **API Development** | Design → Generate → Validate → Test → Document | New API endpoint creation |
| **System Design** | Requirements → HLD → LLD → Review → ADR | Architecture planning |
| **Code Review** | Checklist → Security Scan → Feedback → Summary | Pull request review |
| **Greenfield Project** | Architecture → Scaffold → CI/CD → Observability | New project bootstrap |
| **Migration** | Assessment → Decomposition → Incremental Migration → Validation | Monolith to microservices |
| **Security Audit** | OWASP Review → Auth Audit → Input Validation → Secrets Audit | Security assessment |
| **Database Change** | Schema Design → Migration Plan → Index Strategy → Query Optimization | Database evolution |

### 5.3 Tool-Specific Workflow Execution

| Tool | Execution Model |
|------|----------------|
| **GitHub Copilot Chat** | User invokes workflow steps manually via `@workspace` with prompt files |
| **Copilot Agent Mode** | Agent executes workflow via SKILL.md with step-by-step orchestration |
| **Cursor Composer** | Cursor rules (.mdc) enforce constraints; user drives steps |
| **CLI Agent** | Script-driven execution via prompt files read from disk |
| **MCP** | Prompts exposed as MCP tools; external orchestrator calls sequentially |

---

## 6. Agent Integration Model

### 6.1 GitHub Copilot Integration

#### Workspace Instructions (`.github/copilot-instructions.md`)

Maps the entire prompt library as context for Copilot:

```markdown
# Copilot Workspace Instructions

## Coding Standards
When writing code in this project, follow the guidelines in:
- `prompts/01-coding-best-practices/` for code quality
- `prompts/02-naming-conventions/` for naming standards

## API Design
When designing or reviewing APIs, apply:
- `prompts/03-api-design/rest/` for REST API standards
- `prompts/07-security/05-api-security.md` for security requirements

## Architecture
When making architectural decisions, reference:
- `prompts/05-architecture-patterns/` for pattern selection
- `prompts/04-system-design/` for design methodology

## Technology Overlays
Apply the relevant technology overlay from `overlays/` based on the
project's tech stack.
```

#### Per-Concern Instructions (`agents/copilot/instructions/`)

```markdown
# api-design.instructions.md
---
applyTo: "**/*controller*,**/*api*,**/*endpoint*,**/*route*"
---
When working on API files:
- Follow RESTful conventions from prompts/03-api-design/rest/01-endpoint-design.md
- Use proper HTTP status codes per prompts/03-api-design/rest/02-error-response-design.md
- Apply pagination patterns from prompts/03-api-design/rest/04-pagination-filtering.md
- Validate inputs per prompts/07-security/03-input-validation.md
```

#### Copilot Skills (`agents/copilot/skills/`)

Each skill wraps a workflow into an agent capability:

```markdown
# SKILL.md — API Designer

## Description
Designs a complete REST API for a given resource, including endpoints,
error handling, pagination, security, and OpenAPI specification.

## Tools
- readFile (to read overlay and domain context)
- editFile (to generate code artifacts)

## Workflow
1. Read project context from `.github/copilot-instructions.md`
2. Apply base prompt: `prompts/03-api-design/rest/01-endpoint-design.md`
3. Apply technology overlay: `overlays/{tech}/api-design.md`
4. Apply domain constraints: `domains/{domain}/api-governance.md` (if exists)
5. Apply org standards: `org-standards/{org}/api-governance.md` (if exists)
6. Generate endpoint design, error catalog, and OpenAPI spec
7. Run validation against `prompts/03-api-design/rest/05-api-security.md`
```

### 6.2 Cursor Integration

#### Cursor Rules (`agents/cursor/rules/*.mdc`)

Each `.mdc` file translates prompt constraints into Cursor-native rules:

```markdown
---
description: REST API Design Standards
globs: ["**/*controller*", "**/*api*", "**/*route*"]
alwaysApply: false
---

# API Design Rules

## Endpoint Conventions
- Use plural nouns for resource paths: `/users`, `/orders`
- Use kebab-case for multi-word paths: `/order-items`
- Use HTTP methods correctly: GET (read), POST (create), PUT (replace), PATCH (update), DELETE (remove)
- Return appropriate status codes: 200, 201, 204, 400, 401, 403, 404, 409, 422, 500

## Error Response Format
Always use RFC 7807 Problem Details:
\```json
{
  "type": "https://api.example.com/errors/validation-error",
  "title": "Validation Error",
  "status": 422,
  "detail": "One or more fields failed validation.",
  "instance": "/orders/123",
  "errors": [...]
}
\```

## Security Requirements
- Validate all input at the boundary
- Use parameterized queries (never string concatenation)
- Apply rate limiting on all public endpoints
- Require authentication for all non-public endpoints
```

### 6.3 MCP Integration

#### Prompt Server Concept

Expose prompts as MCP tools that any MCP-compatible client can invoke:

```json
{
  "name": "prompt-library-mcp",
  "version": "1.0.0",
  "description": "MCP server exposing the prompt library as tools",
  "tools": [
    {
      "name": "design_api_endpoint",
      "description": "Design a RESTful API endpoint set for a resource",
      "inputSchema": {
        "type": "object",
        "properties": {
          "project_name": { "type": "string" },
          "resource_name": { "type": "string" },
          "domain_description": { "type": "string" },
          "tech_stack": { "type": "string", "enum": ["dotnet", "python", "java", "node"] }
        },
        "required": ["project_name", "resource_name"]
      },
      "promptFile": "prompts/03-api-design/rest/01-endpoint-design.md"
    },
    {
      "name": "review_code_security",
      "description": "Perform OWASP Top 10 security review on code",
      "inputSchema": {
        "type": "object",
        "properties": {
          "code": { "type": "string" },
          "language": { "type": "string" }
        },
        "required": ["code", "language"]
      },
      "promptFile": "prompts/07-security/01-owasp-top-10-review.md"
    }
  ],
  "connectors": [
    {
      "name": "microsoft-learn",
      "endpoint": "https://learn.microsoft.com/api/mcp",
      "description": "Microsoft Learn documentation via MCP"
    }
  ]
}
```

### 6.4 Prompt-to-Agent Mapping

| Prompt Category | Copilot Skill | Cursor Rule | MCP Tool |
|----------------|---------------|-------------|----------|
| 01-coding-best-practices | `code-quality-reviewer` | `clean-code.mdc` | `review_code_quality` |
| 02-naming-conventions | (inline instructions) | `naming.mdc` | `check_naming` |
| 03-api-design | `api-designer` | `api-design.mdc` | `design_api_endpoint` |
| 04-system-design | `system-designer` | `architecture.mdc` | `design_system` |
| 05-architecture-patterns | `architecture-advisor` | `patterns.mdc` | `recommend_architecture` |
| 06-database-design | `db-designer` | `database.mdc` | `design_schema` |
| 07-security | `security-auditor` | `security.mdc` | `review_code_security` |
| 08-testing-strategies | `test-generator` | `testing.mdc` | `generate_tests` |
| 09-devops-cicd | `devops-advisor` | `devops.mdc` | `design_pipeline` |
| 10-code-review | `code-reviewer` | `review.mdc` | `review_pull_request` |
| 11-documentation | `doc-generator` | `docs.mdc` | `generate_documentation` |
| 12-frontend-architecture | `frontend-designer` | `frontend.mdc` | `design_frontend` |
| 13-background-processing | `worker-designer` | `background.mdc` | `design_worker` |

---

## 7. Recommendations

### 7.1 Scalability Improvements

| # | Recommendation | Priority | Effort |
|---|---------------|----------|--------|
| 1 | **Add YAML frontmatter to all 43 existing prompts** — enables machine-readable metadata, versioning, and tool integration | High | Medium |
| 2 | **Create `overlays/` for top 4 tech stacks** (.NET, Python, Node, React) — unblocks technology-specific usage | High | High |
| 3 | **Add frontend architecture category (12-*)** — fills the largest content gap | High | Medium |
| 4 | **Add GraphQL API design prompts** — second most requested API paradigm | Medium | Medium |
| 5 | **Build 3 core workflows** (API dev, system design, code review) — demonstrates multi-step orchestration | High | Medium |
| 6 | **Create Copilot instruction files** — immediate integration with most-used AI tool | High | Low |
| 7 | **Create Cursor rule files** — second most common AI coding tool | Medium | Low |
| 8 | **Add architecture pattern hierarchy** with foundational tier — enables onboarding path | Medium | Medium |
| 9 | **Build domain extension templates** with financial services example — enables enterprise adoption | Medium | Low |
| 10 | **Create `prompt-standard.md`** at root — single source of truth for prompt authoring | High | Low |

### 7.2 Governance Model

```
Governance Structure
├── Prompt Ownership
│   ├── Each category has a designated maintainer (CODEOWNERS)
│   ├── Overlays owned by technology community leads
│   └── Workflows require 2 reviewer approvals
│
├── Quality Gates
│   ├── CI validation: YAML frontmatter, required sections, variable table
│   ├── Peer review: At least 1 domain expert review
│   ├── Example output: Every prompt must have a worked example
│   └── Tested: Example output validated with ≥ 2 AI tools
│
├── Change Management
│   ├── Breaking changes: Major version bump, migration guide
│   ├── New prompts: Feature branch → PR → review → merge
│   ├── Overlay additions: Technology lead approval
│   └── Domain/Org standards: Domain owner approval
│
└── Release Process
    ├── Semantic versioning (library-wide + per-prompt)
    ├── Changelog updated per release
    ├── GitHub Releases with tag
    └── Quarterly review of prompt effectiveness
```

### 7.3 Versioning Strategy

| Scope | Strategy | Example |
|-------|----------|---------|
| **Library-wide** | SemVer in CHANGELOG.md and GitHub Releases | `v2.0.0` |
| **Per-prompt** | SemVer in YAML frontmatter | `version: "1.2.0"` |
| **Overlays** | SemVer aligned with base prompt compatibility | `version: "1.0.0"` + `compatible-with: ">=1.0.0"` |
| **Workflows** | SemVer; breaking = step addition/removal | `version: "1.1.0"` |
| **Agent configs** | Generated from source prompts; version = source version | Auto-derived |

**Backward Compatibility Rule:** A minor version update to a base prompt must not break any existing overlay or workflow that references it. Breaking changes require a new major version and a migration guide.

### 7.4 External Integration Strategy

| Source | Import Strategy |
|--------|----------------|
| **cursor.directory** | Curate relevant `.mdc` rules → normalize into `agents/cursor/rules/` format → credit source |
| **awesome-copilot instructions** | Adapt `.instructions.md` patterns → place in `agents/copilot/instructions/` → map to prompt IDs |
| **awesome-cursor-rules-mdc** | Select rules by technology → normalize → place in `agents/cursor/rules/` |
| **Microsoft .NET Skills** | Reference as upstream; create wrapper SKILL.md that combines library prompts with MS skill patterns |
| **Microsoft Learn MCP** | Pre-configure connector in `agents/mcp/connectors/microsoft-learn.json`; reference in workflows |
| **dotnet-cursor-rules** | Import .NET-specific rules → merge with `overlays/dotnet/` content → credit source in metadata |

**Normalization Process:**
1. **Import** — Copy external rule/instruction into `_imported/` staging area
2. **Normalize** — Reformat to library standard (YAML frontmatter, consistent sections)
3. **Map** — Link to relevant base prompts via `extends` or `related-to` metadata
4. **Version** — Assign local version; track upstream source URL and version
5. **Review** — Peer review for quality and consistency before merging to main

---

## 8. Implementation Roadmap

### Phase 1: Foundation (Immediate)

- [ ] Add YAML frontmatter to all 43 existing prompts
- [ ] Create `prompt-standard.md` defining the enhanced template
- [ ] Create `templates/prompt-template.md` for contributors
- [ ] Add `Composition` section to existing prompts
- [ ] Create `.github/copilot-instructions.md`

### Phase 2: Expand Coverage (Short-term)

- [ ] Add `prompts/12-frontend-architecture/` (5 prompts)
- [ ] Add `prompts/13-background-processing/` (3 prompts)
- [ ] Add `prompts/03-api-design/graphql/` (4 prompts)
- [ ] Expand `prompts/05-architecture-patterns/` with tier structure and 6 new prompts
- [ ] Add `prompts/05-architecture-patterns/foundational/` (layered, modular monolith)
- [ ] Add `prompts/05-architecture-patterns/specialized/` (serverless, BFF, saga)

### Phase 3: Technology Overlays (Short-term)

- [ ] Create `overlays/dotnet/` (5 files)
- [ ] Create `overlays/python/` (4 files)
- [ ] Create `overlays/node/` (4 files)
- [ ] Create `overlays/react/` (3 files)
- [ ] Create `overlays/README.md` documenting overlay model

### Phase 4: Workflows & Orchestration (Medium-term)

- [ ] Build `workflows/api-development/` (5 steps)
- [ ] Build `workflows/system-design/` (5 steps)
- [ ] Build `workflows/code-review/` (4 steps)
- [ ] Create `workflows/README.md` documenting workflow model
- [ ] Add worked example `examples/sample-workflow-api.md`

### Phase 5: Agent Integration (Medium-term)

- [ ] Create `agents/copilot/instructions/` (7 instruction files)
- [ ] Create `agents/copilot/skills/` (4 skills)
- [ ] Create `agents/cursor/rules/` (6 .mdc rule files)
- [ ] Create `agents/mcp/` connector configs
- [ ] Create `agents/README.md` integration guide

### Phase 6: Enterprise Extensions (Long-term)

- [ ] Create `domains/_template/` and `domains/financial-services/` example
- [ ] Create `org-standards/_template/` and `org-standards/example-corp/`
- [ ] Build `scripts/validate-prompts.js` CI validation
- [ ] Build `scripts/generate-index.js` auto-index generation
- [ ] Set up CODEOWNERS for governance
- [ ] Create quarterly review process documentation

---

## Appendix A: Complete Prompt Inventory (Current → Target)

| # | Category | Current Prompts | New Prompts Needed | Target Total |
|---|----------|----------------|-------------------|-------------|
| 01 | Coding Best Practices | 5 | 0 | 5 |
| 02 | Naming Conventions | 5 | 0 | 5 |
| 03 | API Design (REST) | 5 | 0 | 5 |
| 03 | API Design (GraphQL) | 0 | 4 | 4 |
| 03 | API Design (gRPC) | 0 | 2 | 2 |
| 04 | System Design | 5 | 0 | 5 |
| 05 | Architecture Patterns | 4 | 6 | 10 |
| 06 | Database Design | 4 | 0 | 4 |
| 07 | Security | 4 | 0 | 4 |
| 08 | Testing Strategies | 4 | 0 | 4 |
| 09 | DevOps & CI/CD | 4 | 0 | 4 |
| 10 | Code Review | 3 | 0 | 3 |
| 11 | Documentation | 4 | 0 | 4 |
| 12 | Frontend Architecture | 0 | 5 | 5 |
| 13 | Background Processing | 0 | 3 | 3 |
| 14 | Performance Engineering | 0 | 4 | 4 |
| 15 | Cross-Cutting Concerns | 0 | 5 | 5 |
| 16 | Compliance & Governance | 0 | 4 | 4 |
| 17 | AI Integration | 0 | 3 | 3 |
| 18 | Meta-Prompts | 0 | 2 | 2 |
| **Total** | | **43** | **38** | **81** |

Technology overlays add **~24 files** across 7 tech stacks.  
Workflows add **~24 files** across 5 workflows.  
Agent configs add **~20 files** across Copilot, Cursor, and MCP.

**Grand total: ~149 files** (from current 63) — a **2.4x growth** that transforms the library into a platform.

---

## Appendix B: Prompt Cross-Reference Matrix

Shows how prompts compose across workflows (expanded with new categories):

| Workflow Step | Coding | Naming | API | Sys Dsgn | Arch | DB | Security | Testing | DevOps | Review | Docs | Frontend | Bgnd Proc | Perf Eng | Cross-Cut | Compliance | AI Integ |
|--------------|--------|--------|-----|----------|------|----|----------|---------|--------|--------|------|----------|-----------|----------|-----------|------------|----------|
| API Development | ✓ | ✓ | ★ | | | ✓ | ✓ | ✓ | | | ✓ | | | ✓ | ✓ | | |
| System Design | | | ✓ | ★ | ★ | ✓ | ✓ | | ✓ | | ✓ | | | ✓ | ✓ | ✓ | |
| Code Review | ★ | ✓ | ✓ | | ✓ | | ✓ | ✓ | | ★ | | | | ✓ | | | |
| Greenfield Project | ✓ | ✓ | ✓ | ✓ | ★ | ✓ | ✓ | ✓ | ★ | | ✓ | ✓ | | | ✓ | ✓ | |
| Migration | | | ✓ | ✓ | ★ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | | | ✓ | | | |
| Security Audit | | | | | | | ★ | ✓ | | ✓ | ✓ | | | | | ★ | |
| Database Change | | ✓ | | | | ★ | | ✓ | ✓ | ✓ | ✓ | | | ✓ | | | |
| Frontend Dev | ✓ | ✓ | ✓ | | ✓ | | ✓ | ✓ | | ✓ | | ★ | | ✓ | ✓ | | |
| AI Feature Dev | ✓ | | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | | ✓ | ✓ | | | ✓ | | | ★ |
| Compliance Audit | | | ✓ | | | ✓ | ★ | | ✓ | ✓ | ✓ | | | | | ★ | |

★ = Primary category for this workflow | ✓ = Supporting prompts used

---

*End of Analysis Document*


The full 6-phase implementation is complete. The repository has grown from 43 prompts across 11 categories to 69 prompts across 18 categories, plus overlays, workflows, agent configs, domain extensions, and org standards — transforming it from a static prompt collection into a comprehensive prompt-driven engineering platform.

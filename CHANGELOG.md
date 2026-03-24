# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [2.1.0] - 2026-03-24

### Added

#### New Prompt Category
- **03b — GraphQL API Design** (4 prompts) — Schema design (SDL), resolver patterns (DataLoader, N+1), federation (Apollo Federation v2), security hardening (query depth, rate limiting, persisted queries).

#### Architecture Tier Expansion (6 new prompts)
- **Layered Architecture** (`arch-layered`) — N-tier with dependency rules and cross-cutting concerns.
- **Modular Monolith** (`arch-modular-monolith`) — Module boundaries, inter-module events, data isolation.
- **Serverless Architecture** (`arch-serverless`) — FaaS decomposition, event routing, cost modeling.
- **Backend-for-Frontend** (`arch-bff-pattern`) — Client-specific backends, data aggregation.
- **Saga Pattern** (`arch-saga-pattern`) — Distributed transactions with compensation logic.
- **Strangler Fig Pattern** (`arch-strangler-fig`) — Incremental legacy modernization.

#### New Workflows (3)
- **Database Change** workflow (6 steps) — Schema design through migration and deployment.
- **Migration** workflow (8 steps) — Legacy modernization using Strangler Fig pattern.
- **Frontend Development** workflow (8 steps) — SPA from architecture to deployment.

#### Overlay Content Files (6 new)
- Node.js overlay: REST endpoint design (NestJS + Express patterns).
- Python overlay: REST endpoint design (FastAPI + Django REST Framework patterns).
- React overlay: SPA design (Next.js App Router, TanStack Query, Zustand).
- Angular overlay: SPA design (Standalone components, NgRx SignalStore).
- Vue overlay: SPA design (Nuxt 3, Composition API, Pinia).
- Java overlay: REST endpoint design (Spring Boot 3, records, ProblemDetail).

#### Tooling
- **Validation script** (`scripts/validate-prompts.js`) — Validates frontmatter, required sections, ID uniqueness, and cross-references.
- **Index generator** (`scripts/generate-index.js`) — Generates `prompt-index.json` with all prompt metadata.
- **CODEOWNERS** — Code ownership configuration.
- **.gitignore** — Ignore generated files and OS artifacts.

#### Agent Config Expansion
- Cursor: 2 new rule files (`architecture.mdc`, `database.mdc`).
- SKILL.md: Added `graphql-design` skill, expanded `architecture` skill to 10 prompts.
- MCP tools.json: Added `design_graphql_api` and `select_architecture` tools.

### Fixed
- Fixed cross-reference ID mismatches in SKILL.md (9), tools.json (2), copilot-instructions.md (3), and all 5 workflow files.
- Fixed `depends-on` reference `arch-event-driven-architecture` → `arch-event-driven` in message consumer prompt.
- Fixed CHANGELOG v2.0.0 date ordering.

### Changed
- Added **Context** and **Composition** sections to all 47 original prompts (categories 01–11).
- Updated README: prompt count from 69 → 83, added GraphQL category row, updated Architecture count 4 → 10.
- Updated Architecture Patterns README with 6 new rows.
- Updated Workflows README with 3 new rows.

---

## [2.0.0] - 2026-03-24

### Added

#### Foundation
- **Prompt Design Standard** (`prompt-standard.md`) — canonical template, YAML frontmatter schema, quality checklist, and naming conventions for all prompts.
- **Prompt Template** (`templates/prompt-template.md`) — copy-paste template for creating new prompts.
- **Copilot Workspace Instructions** (`.github/copilot-instructions.md`) — GitHub Copilot workspace-level configuration referencing prompt categories.

#### New Prompt Categories (7 categories, 26 prompts)
- **12 — Frontend Architecture** — SPA design, micro-frontends, state management, component design, PWA design.
- **13 — Background Processing** — Worker service design, job scheduling, message consumer design.
- **14 — Performance Engineering** — Load testing strategy, performance profiling, caching strategy, chaos/resilience testing.
- **15 — Cross-Cutting Concerns** — Feature flags & release, configuration management, multi-tenancy design, i18n/l10n strategy, SLO/SLI/error budgets.
- **16 — Compliance & Governance** — Compliance framework design, disaster recovery planning, compliance-as-code, technical debt management.
- **17 — AI Integration** — LLM integration patterns, AI agent design, ML model serving.
- **18 — Meta-Prompts** — Prompt writing guide, prompt testing & evaluation.

#### YAML Frontmatter
- Added YAML frontmatter (id, version, category, complexity, tags, depends-on, tools, overlay-compatible) to all 43 existing prompts across categories 01-11.

#### Technology Overlays
- **Overlay System** (`overlays/`) — technology-specific extensions that augment base prompts with framework-specific patterns.
- Overlay directories for: .NET, Node.js, Python, React, Angular, Vue, Java/Spring Boot.
- Full example overlay: `overlays/dotnet/api-rest-endpoint-design.overlay.md` (ASP.NET Core minimal API patterns).
- Overlay template (`overlays/overlay-template.md`).

#### Workflow Orchestration
- **Workflows** (`workflows/`) — multi-prompt pipelines with quality gates and Mermaid flow diagrams.
- API Development workflow (8 steps, 3 gates).
- System Design workflow (7 steps, 2 gates).
- Greenfield Project workflow (10 steps, 3 gates).
- Code Review workflow (5 steps, 2 gates).
- Security Audit workflow (6 steps, 2 gates).

#### AI Agent Integration
- **Agent Configurations** (`agents/`) — pre-built configs for AI coding agents.
- GitHub Copilot: `SKILL.md` with 8 skill definitions mapping to prompt categories.
- Cursor: 3 `.mdc` rule files (coding-standards, api-design, security).
- MCP: `tools.json` with 5 tool definitions (design_api, design_system, review_security, design_database, review_code).

#### Domain Extensions
- **Domains** (`domains/`) — industry-specific compliance overlays.
- Domain template (`domains/_template/`) with data classification and compliance checklist.
- Financial Services domain (PCI-DSS, SOX, PSD2, GDPR, SOC 2).
- Healthcare domain (HIPAA, HITRUST, HL7 FHIR, 21 CFR Part 11).

#### Organization Standards
- **Org Standards** (`org-standards/`) — company-specific approved tech stacks, naming, and review processes.
- Org standards template (`org-standards/_template/`).
- Example Corp reference implementation with full tech stack, naming, and security policies.

### Changed
- Updated `README.md` with new categories table (18 categories), overlays, workflows, agents, domains, and org-standards sections.
- Restructured repository structure diagram in README to reflect all new directories.
- Updated contributing instructions to reference `prompt-standard.md` and `templates/prompt-template.md`.

---

## [1.0.0] - 2026-03-24

### Added
- Initial release of the Technical Prompt Library.
- **Coding Best Practices** — Clean code, SOLID, DRY/KISS, error handling prompts.
- **Naming Conventions** — General, language-specific, API, and database naming prompts.
- **REST API Design** — Endpoint design, error handling, versioning, pagination, and security prompts.
- **System Design** — HLD, LLD, scalability, and trade-off analysis prompts.
- **Architecture Patterns** — Microservices, event-driven, CQRS, and hexagonal architecture prompts.
- **Database Design** — Schema design, indexing, migration, and query optimization prompts.
- **Security** — OWASP, authentication, input validation, and encryption prompts.
- **Testing Strategies** — Unit testing, integration testing, E2E, and TDD prompts.
- **DevOps & CI/CD** — Pipeline design, IaC, containerization, and monitoring prompts.
- **Code Review** — Review checklists, feedback templates, and PR guideline prompts.
- **Documentation** — ADR, RFC, API documentation, and runbook prompts.
- Reusable document templates (ADR, RFC, API Spec, Design Doc).
- Worked examples for API design, system design, and code review.
- GitHub community files (issue templates, PR template, CI workflow).

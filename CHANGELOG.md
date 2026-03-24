# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [2.0.0] - 2025-07-08

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

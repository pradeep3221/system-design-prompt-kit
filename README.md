# 📖 Technical Prompt Library

> A comprehensive, community-driven collection of reusable prompts for technical design, system architecture, coding best practices, and software engineering workflows.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub Stars](https://img.shields.io/github/stars/your-org/technical-prompt-library?style=social)]()

---

## 🎯 Purpose

This library provides **battle-tested prompt templates** that engineers, architects, and technical leads can use to:

- Generate consistent, high-quality technical designs
- Enforce coding standards and naming conventions across teams
- Accelerate code reviews and documentation
- Produce system design artifacts following industry best practices
- Bootstrap REST API designs, database schemas, and architecture decisions

---

## 📁 Repository Structure

```
technical-prompt-library/
│
├── README.md                        # You are here
├── LICENSE                          # MIT License
├── CONTRIBUTING.md                  # How to contribute
├── CODE_OF_CONDUCT.md               # Community guidelines
├── CHANGELOG.md                     # Version history
├── prompt-standard.md               # Prompt design standard & quality guidelines
│
├── .github/
│   └── copilot-instructions.md      # GitHub Copilot workspace instructions
│
├── prompts/                         # 🔑 Core prompt library (18 categories, 69 prompts)
│   ├── 01-coding-best-practices/    # Clean code, SOLID, DRY, etc.
│   ├── 02-naming-conventions/       # Variables, functions, files, APIs
│   ├── 03-rest-api-design/          # RESTful API best practices
│   ├── 04-system-design/            # HLD, LLD, scalability, trade-offs
│   ├── 05-architecture-patterns/    # Microservices, event-driven, CQRS, hexagonal
│   ├── 06-database-design/          # Schema design, indexing, migrations
│   ├── 07-security/                 # OWASP, auth, encryption, secrets
│   ├── 08-testing-strategies/       # Unit, integration, E2E, TDD
│   ├── 09-devops-cicd/              # Pipelines, IaC, containers, monitoring
│   ├── 10-code-review/              # Review checklists & feedback
│   ├── 11-documentation/            # ADRs, RFCs, API docs, runbooks
│   ├── 12-frontend-architecture/    # SPA, micro-frontends, state, PWA
│   ├── 13-background-processing/    # Workers, schedulers, consumers
│   ├── 14-performance-engineering/  # Load testing, profiling, caching, chaos
│   ├── 15-cross-cutting-concerns/   # Feature flags, config, multi-tenancy, i18n
│   ├── 16-compliance-governance/    # Compliance, DR, tech debt
│   ├── 17-ai-integration/           # LLM patterns, agents, ML serving
│   └── 18-meta-prompts/             # Prompt writing & evaluation
│
├── overlays/                        # 🔧 Technology-specific extensions
│   ├── dotnet/                      # .NET / ASP.NET Core
│   ├── node/                        # Node.js / NestJS
│   ├── python/                      # Python / FastAPI / Django
│   ├── react/                       # React / Next.js
│   ├── angular/                     # Angular
│   ├── vue/                         # Vue / Nuxt
│   └── java/                        # Java / Spring Boot
│
├── workflows/                       # 🔄 Multi-prompt orchestration pipelines
│   ├── api-development.md           # End-to-end API development
│   ├── system-design.md             # System design workflow
│   ├── greenfield-project.md        # New project setup
│   ├── code-review.md               # Structured code review
│   └── security-audit.md            # Security audit workflow
│
├── agents/                          # 🤖 AI agent configurations
│   ├── copilot/                     # GitHub Copilot skills
│   ├── cursor/                      # Cursor .mdc rule files
│   └── mcp/                         # MCP server tool definitions
│
├── domains/                         # 🏢 Industry-specific extensions
│   ├── _template/                   # Template for new domains
│   ├── financial-services/          # PCI-DSS, SOX, PSD2
│   └── healthcare/                  # HIPAA, HL7/FHIR, HITRUST
│
├── org-standards/                   # 🏗️ Organization-specific standards
│   ├── _template/                   # Template for new orgs
│   └── example-corp/                # Example corporate standards
│
├── templates/                       # Reusable document templates
│   ├── prompt-template.md           # New prompt template
│   ├── adr-template.md              # Architecture Decision Record
│   ├── rfc-template.md              # Request for Comments
│   ├── api-spec-template.md         # API specification template
│   └── design-doc-template.md       # System design document
│
└── examples/                        # Worked examples & sample outputs
    ├── sample-api-design.md
    ├── sample-system-design.md
    └── sample-code-review.md
```

---

## 🚀 Quick Start

1. **Browse** the [`prompts/`](prompts/) directory for the category you need.
2. **Copy** the prompt template into your AI assistant or documentation tool.
3. **Customize** the placeholders (`{{VARIABLE}}`) with your project-specific details.
4. **Iterate** on the output and refine as needed.

### Example Usage

```text
# Copy a prompt from prompts/03-rest-api-design/01-endpoint-design.md
# Replace placeholders:

Design a RESTful API for a {{PROJECT_NAME: E-Commerce Platform}}.
Resource: {{RESOURCE: Orders}}
...
```

---

## 📂 Categories at a Glance

| # | Category | Description | Prompts |
|---|----------|-------------|---------|
| 01 | [Coding Best Practices](prompts/01-coding-best-practices/) | Clean code, SOLID principles, DRY, KISS, error handling | 5 |
| 02 | [Naming Conventions](prompts/02-naming-conventions/) | Variables, functions, classes, files, APIs, databases | 5 |
| 03 | [REST API Design](prompts/03-rest-api-design/) | Endpoint design, versioning, error responses, pagination | 5 |
| 04 | [System Design](prompts/04-system-design/) | HLD, LLD, scalability, reliability, trade-offs | 5 |
| 05 | [Architecture Patterns](prompts/05-architecture-patterns/) | Microservices, CQRS, event-driven, hexagonal | 4 |
| 06 | [Database Design](prompts/06-database-design/) | Schema design, normalization, indexing, migrations | 4 |
| 07 | [Security](prompts/07-security/) | OWASP top 10, auth, encryption, input validation | 4 |
| 08 | [Testing Strategies](prompts/08-testing-strategies/) | Unit tests, integration, E2E, TDD, mocking | 4 |
| 09 | [DevOps & CI/CD](prompts/09-devops-cicd/) | Pipelines, IaC, containerization, monitoring | 4 |
| 10 | [Code Review](prompts/10-code-review/) | Review checklists, feedback templates, PR guidelines | 3 |
| 11 | [Documentation](prompts/11-documentation/) | ADRs, RFCs, API docs, runbooks, onboarding | 4 |
| 12 | [Frontend Architecture](prompts/12-frontend-architecture/) | SPA design, micro-frontends, state management, PWA | 5 |
| 13 | [Background Processing](prompts/13-background-processing/) | Worker services, job scheduling, message consumers | 3 |
| 14 | [Performance Engineering](prompts/14-performance-engineering/) | Load testing, profiling, caching, chaos testing | 4 |
| 15 | [Cross-Cutting Concerns](prompts/15-cross-cutting-concerns/) | Feature flags, config management, multi-tenancy, i18n | 5 |
| 16 | [Compliance & Governance](prompts/16-compliance-governance/) | Compliance frameworks, DR planning, tech debt | 4 |
| 17 | [AI Integration](prompts/17-ai-integration/) | LLM patterns, AI agents, ML model serving | 3 |
| 18 | [Meta-Prompts](prompts/18-meta-prompts/) | Prompt writing guide, prompt testing & evaluation | 2 |

---

## 🔧 Technology Overlays

Overlays extend base prompts with technology-specific patterns. Apply an overlay when working with a specific stack:

| Overlay | Stack | Directory |
|---------|-------|-----------|
| .NET | ASP.NET Core, C#, Entity Framework | [`overlays/dotnet/`](overlays/dotnet/) |
| Node.js | NestJS, Express, TypeScript | [`overlays/node/`](overlays/node/) |
| Python | FastAPI, Django, SQLAlchemy | [`overlays/python/`](overlays/python/) |
| React | React, Next.js, TypeScript | [`overlays/react/`](overlays/react/) |
| Angular | Angular, RxJS, NgRx | [`overlays/angular/`](overlays/angular/) |
| Vue | Vue 3, Nuxt, Pinia | [`overlays/vue/`](overlays/vue/) |
| Java | Spring Boot, JPA, Maven/Gradle | [`overlays/java/`](overlays/java/) |

---

## 🔄 Workflows

Workflows orchestrate multiple prompts into end-to-end pipelines with quality gates:

| Workflow | Steps | Description |
|----------|-------|-------------|
| [API Development](workflows/api-development.md) | 8 | Design → implement → test → document an API |
| [System Design](workflows/system-design.md) | 7 | Requirements → HLD → LLD → capacity planning |
| [Greenfield Project](workflows/greenfield-project.md) | 10 | Full project setup from architecture to monitoring |
| [Code Review](workflows/code-review.md) | 5 | Structured review from checklist to architecture review |
| [Security Audit](workflows/security-audit.md) | 6 | OWASP review → auth → input → secrets → remediation |

---

## 🤖 AI Agent Integration

Pre-built configurations for popular AI coding agents:

| Agent | Format | Directory |
|-------|--------|-----------|
| GitHub Copilot | `.instructions.md`, `SKILL.md` | [`agents/copilot/`](agents/copilot/) |
| Cursor | `.mdc` rule files | [`agents/cursor/`](agents/cursor/) |
| MCP Servers | JSON tool definitions | [`agents/mcp/`](agents/mcp/) |

---

## 🏢 Domain Extensions & Org Standards

Extend the library with industry-specific compliance requirements or company-specific conventions:

- **[Domains](domains/)** — Industry overlays (Financial Services, Healthcare)
- **[Org Standards](org-standards/)** — Company-specific approved tech stacks, naming, and review processes

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a PR.

**Quick contribution steps:**
1. Fork the repository
2. Create a feature branch (`git checkout -b prompts/new-category`)
3. Add your prompt following the [prompt standard](prompt-standard.md) and [prompt template](templates/prompt-template.md)
4. Submit a Pull Request

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## ⭐ Acknowledgments

Built with contributions from the open-source community. Inspired by industry standards from:
- Martin Fowler's architecture patterns
- Google's API Design Guide
- Microsoft REST API Guidelines
- OWASP Security Standards
- The Twelve-Factor App methodology

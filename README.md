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
├── .github/                         # GitHub-specific config
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── new_prompt.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       └── validate-prompts.yml
│
├── prompts/                         # 🔑 Core prompt library
│   ├── 01-coding-best-practices/    # Clean code, SOLID, DRY, etc.
│   ├── 02-naming-conventions/       # Variables, functions, files, APIs
│   ├── 03-rest-api-design/          # RESTful API best practices
│   ├── 04-system-design/            # High-level & low-level design
│   ├── 05-architecture-patterns/    # Microservices, event-driven, etc.
│   ├── 06-database-design/          # Schema design, indexing, migrations
│   ├── 07-security/                 # OWASP, auth, encryption
│   ├── 08-testing-strategies/       # Unit, integration, E2E, TDD
│   ├── 09-devops-cicd/              # Pipelines, IaC, monitoring
│   ├── 10-code-review/              # Review checklists & prompts
│   └── 11-documentation/            # ADRs, RFCs, runbooks
│
├── templates/                       # Reusable document templates
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

| # | Category | Description |
|---|----------|-------------|
| 01 | [Coding Best Practices](prompts/01-coding-best-practices/) | Clean code, SOLID principles, DRY, KISS, error handling |
| 02 | [Naming Conventions](prompts/02-naming-conventions/) | Variables, functions, classes, files, APIs, databases |
| 03 | [REST API Design](prompts/03-rest-api-design/) | Endpoint design, versioning, error responses, pagination |
| 04 | [System Design](prompts/04-system-design/) | HLD, LLD, scalability, reliability, trade-offs |
| 05 | [Architecture Patterns](prompts/05-architecture-patterns/) | Microservices, CQRS, event-driven, hexagonal |
| 06 | [Database Design](prompts/06-database-design/) | Schema design, normalization, indexing, migrations |
| 07 | [Security](prompts/07-security/) | OWASP top 10, auth, encryption, input validation |
| 08 | [Testing Strategies](prompts/08-testing-strategies/) | Unit tests, integration, E2E, TDD, mocking |
| 09 | [DevOps & CI/CD](prompts/09-devops-cicd/) | Pipelines, IaC, containerization, monitoring |
| 10 | [Code Review](prompts/10-code-review/) | Review checklists, feedback templates, PR guidelines |
| 11 | [Documentation](prompts/11-documentation/) | ADRs, RFCs, API docs, runbooks, onboarding |

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a PR.

**Quick contribution steps:**
1. Fork the repository
2. Create a feature branch (`git checkout -b prompts/new-category`)
3. Add your prompt following the [prompt template](.github/ISSUE_TEMPLATE/new_prompt.md)
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

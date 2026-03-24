# Copilot Workspace Instructions

> These instructions apply to all Copilot interactions within this workspace.

## Project Context

This is a **Technical Prompt Library** — a collection of reusable prompts for software engineering, system design, API design, architecture patterns, and development workflows.

## Coding Standards

When writing or reviewing code in this workspace:
- Follow clean code principles from `prompts/01-coding-best-practices/`
- Apply naming conventions from `prompts/02-naming-conventions/`
- Use error handling patterns from `prompts/01-coding-best-practices/04-error-handling.md`

## API Design

When designing or reviewing APIs:
- Follow REST conventions from `prompts/03-api-design/rest/`
- Use RFC 7807 Problem Details for error responses
- Apply security requirements from `prompts/07-security/05-api-security.md`
- Include pagination for list endpoints per `prompts/03-api-design/rest/04-pagination-filtering.md`

## Architecture

When making architectural decisions:
- Reference patterns in `prompts/05-architecture-patterns/`
- Use system design methodology from `prompts/04-system-design/`
- Document decisions using ADR template from `templates/adr-template.md`

## Security

When working on security-sensitive code:
- Apply OWASP Top 10 review from `prompts/07-security/01-owasp-top-10-review.md`
- Validate all inputs per `prompts/07-security/03-input-validation.md`
- Follow secrets management from `prompts/07-security/04-secrets-management.md`

## Testing

When writing tests:
- Follow unit testing patterns from `prompts/08-testing-strategies/01-unit-testing.md`
- Use integration testing approach from `prompts/08-testing-strategies/02-integration-testing.md`
- Target 80%+ code coverage

## Documentation

When writing documentation:
- Use ADR format from `templates/adr-template.md` for decisions
- Use RFC format from `templates/rfc-template.md` for proposals
- Follow API documentation patterns from `prompts/11-documentation/03-api-documentation.md`

## Prompt Authoring

When creating or editing prompts in this library:
- Follow the prompt design standard in `prompt-standard.md`
- Use the template at `templates/prompt-template.md`
- Include YAML frontmatter, Variables table, Example Output, and Composition section
- Follow file naming: `NN-kebab-case.md`

## Technology Overlays

When the project uses a specific technology stack, apply the relevant overlay from `overlays/`:
- .NET / ASP.NET Core → `overlays/dotnet/`
- Python / FastAPI / Django → `overlays/python/`
- Node.js / NestJS → `overlays/node/`
- React / Next.js → `overlays/react/`
- Angular → `overlays/angular/`
- Vue / Nuxt → `overlays/vue/`

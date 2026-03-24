---
id: "naming-file-folder"
version: "1.0.0"
category: "naming-conventions"
complexity: "basic"
tags: ["naming", "files", "folders", "project-structure"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# File & Folder Naming Conventions

> Standardize project structure, file names, and folder organization patterns.

## Metadata
- **Category:** `naming-conventions`
- **Complexity:** `basic`

## Context

Use when setting up project structure or enforcing file/folder naming consistency.

- **Use case:** Monorepo setup, project scaffolding, documentation reorganization
- **Prerequisites:** Framework and project type identified
- **Scope:** File and folder names; pair with `naming-general-guide` for code naming

## Prompt

```text
You are a senior engineer establishing project structure standards. Create a file and folder naming convention guide for a {{LANGUAGE}} / {{FRAMEWORK}} project.

**Cover these areas:**

### 1. Folder Structure Pattern
- Feature/domain-based vs. layer-based organization
- Recommended depth limits (3-4 levels max)
- Standard top-level folders (`src`, `tests`, `docs`, `config`, `scripts`)

### 2. Source File Naming
- Convention: `kebab-case.ts`, `snake_case.py`, or `PascalCase.cs` (language-appropriate)
- One class/component per file rule
- Suffix patterns: `.controller.ts`, `.service.ts`, `.repository.ts`, `.spec.ts`
- Index/barrel files

### 3. Test File Naming
- Mirror source structure in test directory
- Naming: `{source-name}.test.ts`, `test_{source_name}.py`, `{SourceName}Tests.cs`
- Fixtures/mocks: `__fixtures__/`, `__mocks__/`

### 4. Configuration Files
- Standard names: `.env`, `.env.example`, `tsconfig.json`, `pyproject.toml`
- Environment-specific: `.env.development`, `.env.production`
- Never version-control secrets (`.gitignore` rules)

### 5. Documentation Files
- `README.md` at each significant directory level
- `CHANGELOG.md`, `CONTRIBUTING.md`, `LICENSE` at root
- `docs/` for extended documentation
- `docs/adr/` for architecture decision records

### 6. Scripts & Automation
- `scripts/` directory for build/deploy scripts
- Naming: `setup.sh`, `build.sh`, `deploy.sh`, `seed-db.sh`

**Provide a complete example directory tree (20-30 entries) for a {{PROJECT_TYPE}} project.**
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{LANGUAGE}}` | Programming language | `TypeScript`, `Python`, `C#` |
| `{{FRAMEWORK}}` | Framework used | `Next.js`, `FastAPI`, `ASP.NET` |
| `{{PROJECT_TYPE}}` | Project type | `REST API`, `full-stack web app`, `CLI tool` |

## Tips & Variations

- Add: "Generate the shell commands to scaffold this entire structure."
- Add: "Include a `.editorconfig` and `.gitattributes` file."

## Composition

- **Precedes:** `devops-containerization`, `devops-iac`
- **Follows:** `naming-general-guide`
- **Combines with:** `naming-general-guide`, `naming-language-specific`
- **Overlay:** Technology overlays available in `overlays/`

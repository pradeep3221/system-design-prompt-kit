# Prompt Design Standard

> The canonical template and quality guidelines for all prompts in this library.

---

## Prompt File Structure

Every prompt file **must** follow this structure:

```markdown
---
id: "category-name-of-prompt"
version: "1.0.0"
category: "category-slug"
complexity: "basic | intermediate | advanced"
tags: ["tag1", "tag2"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Prompt Title

> One-line description of what this prompt produces.

## Metadata
- **Category:** `category-slug`
- **Complexity:** `basic` | `intermediate` | `advanced`

## Context

When and why to use this prompt:
- **Use case:** When should an engineer reach for this prompt?
- **Prerequisites:** What information must be gathered first?
- **Scope:** What is in/out of scope?

## Prompt

\```text
<Role>
You are a [role] specializing in [domain].

<Context>
- Project: {{PROJECT_NAME}}
- Technology: {{TECH_STACK}}
[additional context variables]

<Task>
[Clear, specific instructions for what the AI should produce]

<Constraints>
- [Constraint 1]
- [Constraint 2]

<Output Format>
[Explicit format: Markdown, JSON, YAML, code, etc.]
\```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{VAR}}` | Yes/No | What it represents | Sample value |

## Example Output

[A realistic, high-quality example of expected output]

## Composition

- **Precedes:** [Prompts that typically follow this one]
- **Follows:** [Prompts that typically precede this one]
- **Combines with:** [Prompts used alongside this one]
- **Overlay:** [Technology overlays that extend this prompt]

## Tips & Variations

- Variant 1: [Adjustment for different context]
- Variant 2: [Adjustment for different tool]
```

---

## YAML Frontmatter Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `id` | Yes | string | Unique identifier (`category-descriptive-name`) |
| `version` | Yes | string | SemVer (`1.0.0`) |
| `category` | Yes | string | Dot-path category (`api-design/rest`) |
| `complexity` | Yes | enum | `basic`, `intermediate`, or `advanced` |
| `tags` | Yes | array | Searchable keywords |
| `depends-on` | No | array | IDs of prerequisite prompts |
| `tools` | No | array | Compatible AI tools |
| `overlay-compatible` | No | boolean | Whether overlays can extend this prompt |

---

## Quality Checklist

Before submitting a prompt, verify:

- [ ] YAML frontmatter is valid and complete
- [ ] Title is concise and action-oriented
- [ ] Description is a single sentence
- [ ] Context section explains when/why to use
- [ ] Prompt uses `<Role>`, `<Context>`, `<Task>`, `<Constraints>`, `<Output Format>` sections
- [ ] All placeholders use `{{UPPER_SNAKE_CASE}}` format
- [ ] Variables table documents every placeholder
- [ ] Example output is realistic and complete
- [ ] Composition section lists related prompts
- [ ] Tips provide at least 2 useful variations
- [ ] File name follows `NN-kebab-case.md` convention

---

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| File name | `NN-kebab-case.md` | `01-endpoint-design.md` |
| Prompt ID | `category-descriptive-name` | `api-rest-endpoint-design` |
| Variables | `{{UPPER_SNAKE_CASE}}` | `{{PROJECT_NAME}}` |
| Categories | `kebab-case` | `api-design/rest` |
| Tags | lowercase, singular | `["rest", "api", "crud"]` |

---

## Complexity Definitions

| Level | Definition | Typical Output |
|-------|-----------|----------------|
| **Basic** | Single concept, minimal context needed | Checklist, naming review, simple template |
| **Intermediate** | Multiple interrelated concepts, requires project context | API design, schema design, test strategy |
| **Advanced** | System-level thinking, trade-offs, multi-component | Architecture design, capacity planning, migration plan |

---

## Overlay Extension Model

Technology overlays extend base prompts without modifying them:

```markdown
---
id: "overlay-tech-base-prompt-name"
extends: "base-prompt-id"
technology: "dotnet"
framework: "aspnet-core"
version: "1.0.0"
---

# Technology Overlay: [Base Prompt] for [Technology]

## Additional Context
[Technology-specific background]

## Injected Constraints
- [Technology-specific rules]

## Technology Variables
| Variable | Value |
|----------|-------|
| `{{FRAMEWORK}}` | ASP.NET Core 9 |

## Code Template
[Technology-specific starter code]
```

---

## Workflow Step Model

Workflow steps reference base prompts and chain them:

```markdown
---
step: 1
prompt: "prompts/03-api-design/rest/01-endpoint-design.md"
overlay: "overlays/{{TECH}}/api-design.md"
input: "requirements"
output: "endpoint-design"
gate: "Review endpoints before proceeding"
---
```

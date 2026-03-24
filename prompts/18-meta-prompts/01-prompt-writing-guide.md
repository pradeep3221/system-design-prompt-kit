---
id: "meta-prompt-writing-guide"
version: "1.0.0"
category: "meta-prompts"
complexity: "basic"
tags: ["meta", "prompt-engineering", "authoring", "template"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: false
---

# Prompt Writing Guide

> A meta-prompt for creating high-quality, reusable engineering prompts that follow the library's standard format.

## Metadata
- **Category:** `meta-prompts`
- **Complexity:** `basic`

## Context

- **Use case:** Creating new prompts for this library or adapting existing ones.
- **Prerequisites:** Familiarity with the prompt standard (`prompt-standard.md`).
- **Scope:** Prompt authoring, structure, quality. Does not cover prompt evaluation.

## Prompt

```text
<Role>
You are a prompt engineer creating reusable, high-quality prompts for a software engineering prompt library.

<Context>
- Target prompt topic: {{TOPIC}}
- Target audience: {{AUDIENCE}} (junior / mid / senior / staff engineers)
- Complexity level: {{COMPLEXITY}} (basic / intermediate / advanced)
- Category: {{CATEGORY}}

<Task>
Create a prompt following this structure:

### 1. Frontmatter
```yaml
---
id: "{{ID}}"
version: "1.0.0"
category: "{{CATEGORY}}"
complexity: "{{COMPLEXITY}}"
tags: [relevant, tags, here]
depends-on: [list of prerequisite prompt IDs]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true/false
---
```

### 2. Title & Description
- Title: Clear, concise noun phrase (e.g., "Caching Strategy", not "How to Cache")
- Description: Single sentence starting with an action verb (e.g., "Design a...", "Define a...", "Implement...")

### 3. Prompt Body
Structure using the Role-Context-Task-Constraints-Output pattern:

**Role:** Define the expert persona (be specific — not just "senior engineer")
**Context:** Use {{VARIABLES}} for all customizable inputs
**Task:** Number all sections; use tables for comparisons; be exhaustive but not verbose
**Constraints:** 3-7 non-negotiable quality gates
**Output Format:** Specify exact deliverable format

### 4. Quality Checklist
Verify the prompt meets these criteria:
- [ ] Role is specific (not generic "engineer")
- [ ] All customizable values use {{VARIABLE}} syntax
- [ ] Variables table documents all variables with Required/Description/Example
- [ ] Task has numbered, actionable sections
- [ ] At least one table or structured comparison
- [ ] Constraints are measurable (not "be good")
- [ ] Output format is explicit
- [ ] Example output demonstrates expected quality
- [ ] Composition section links to related prompts
- [ ] Tips section has at least 2 variations

### 5. Anti-Patterns to Avoid
- Vague roles: "You are a helpful assistant" → too generic
- Missing variables: Hardcoded values that should be customizable
- Wall of text: No structure, no tables, no numbered sections
- Unmeasurable constraints: "Write clean code" → what does clean mean?
- Missing example: No example output to set quality expectations
- Orphan prompt: No composition links to other prompts

<Constraints>
- Follow the format in `prompt-standard.md` exactly
- Every prompt must have at least 3 variables
- Example output must be realistic and high-quality
- Composition section must reference at least 2 related prompts

<Output Format>
Complete prompt file in Markdown, ready to save as a `.md` file in the appropriate category folder.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{TOPIC}}` | Yes | The subject of the new prompt | `GraphQL API Design` |
| `{{AUDIENCE}}` | Yes | Target engineer level | `mid to senior engineers` |
| `{{COMPLEXITY}}` | Yes | Prompt complexity | `intermediate` |
| `{{CATEGORY}}` | Yes | Library category | `api-design` |
| `{{ID}}` | Yes | Prompt ID | `api-graphql-design` |

## Example Output

```markdown
---
id: "api-graphql-design"
version: "1.0.0"
category: "api-design"
complexity: "intermediate"
tags: ["graphql", "api", "schema", "query"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# GraphQL API Design

> Design a GraphQL API schema with type definitions, resolvers, and query optimization patterns.

## Prompt
[... full prompt following standard format ...]
```

## Composition

- **Precedes:** All other prompts (used to create them)
- **Follows:** None (entry point)
- **Combines with:** `meta-prompt-testing-evaluation`

## Tips & Variations

- **For specialized domains:** Add domain-specific context section (e.g., healthcare vocabulary).
- **For overlay-compatible prompts:** Ensure variables include technology/framework choices.
- **For complex topics:** Break into multiple related prompts instead of creating one monolithic prompt.

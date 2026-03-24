# Prompt Template

> Copy this template when creating a new prompt. Replace all placeholder content.

---
id: "category-prompt-name"
version: "1.0.0"
category: "category-slug"
complexity: "basic"
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

- **Use case:** Describe when an engineer should use this prompt.
- **Prerequisites:** List any information that must be gathered first.
- **Scope:** Define what is in and out of scope.

## Prompt

```text
<Role>
You are a [role] specializing in [domain].

<Context>
- Project: {{PROJECT_NAME}}
- Technology: {{TECH_STACK}}

<Task>
[Describe what the AI should produce]

<Constraints>
- [Constraint 1]
- [Constraint 2]

<Output Format>
[Specify: Markdown, JSON, YAML, code, etc.]
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Yes | Name of the project | `my-api` |
| `{{TECH_STACK}}` | Yes | Technology stack | `Node.js + Express` |

## Example Output

<!-- Provide a realistic, complete example of expected output -->

```markdown
## Example Section
...
```

## Composition

- **Precedes:** [Prompt IDs that typically follow]
- **Follows:** [Prompt IDs that typically precede]
- **Combines with:** [Prompt IDs used alongside]
- **Overlay:** [Technology overlays that extend this prompt]

## Tips & Variations

- **Quick version:** Reduce scope to focus on [specific area].
- **Detailed version:** Add [extra dimension] for comprehensive output.

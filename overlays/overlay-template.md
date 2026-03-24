# Overlay Template

> Standard format for creating technology overlay files.

## Frontmatter

```yaml
---
overlay: "{{technology}}"
extends: "{{base-prompt-id}}"
version: "1.0.0"
---
```

## Structure

```markdown
# {{Technology}} Overlay: {{Base Prompt Title}}

> Technology-specific guidance for {{base prompt topic}} using {{technology stack}}.

## Extends
- **Base prompt:** `{{base-prompt-id}}` — [{{Base Prompt Title}}](../../prompts/{{category}}/{{file}})

## Technology-Specific Guidance

### Recommended Libraries & Tools
| Purpose | Library | Version | Notes |
|---------|---------|---------|-------|
| ... | ... | ... | ... |

### Implementation Patterns
[Technology-specific code patterns, configurations, and conventions]

### Project Structure
[Recommended folder layout for this technology]

### Configuration
[Technology-specific configuration examples]

### Testing
[Framework-specific testing setup and patterns]

### Common Pitfalls
[Technology-specific anti-patterns and gotchas]
```

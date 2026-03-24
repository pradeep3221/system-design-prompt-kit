---
id: "naming-language-specific"
version: "1.0.0"
category: "naming-conventions"
complexity: "intermediate"
tags: ["naming", "python", "typescript", "csharp", "go", "language-idioms"]
depends-on: ["naming-general-guide"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Language-Specific Naming Conventions

> Generate or review naming conventions aligned with a language's ecosystem and community standards.

## Metadata
- **Category:** `naming-conventions`
- **Complexity:** `intermediate`

## Context

Use when writing or reviewing code for a specific language/framework to ensure idiomatic naming.

- **Use case:** Code review, onboarding, cross-language team alignment
- **Prerequisites:** Target language/framework identified
- **Scope:** Language-specific conventions; builds on `naming-general-guide`

## Prompt

```text
You are an expert in {{LANGUAGE}} ecosystem conventions. Produce a definitive naming convention guide that aligns with the official style guide and community best practices for {{LANGUAGE}}.

**Reference the official style guide:**
{{STYLE_GUIDE_REFERENCE}}

**Cover all of these constructs with the idiomatic naming pattern:**

| Construct | Convention | Example |
|-----------|-----------|---------|
| Local variables | | |
| Global variables | | |
| Function/method names | | |
| Class names | | |
| Interface names | | |
| Abstract class names | | |
| Type aliases / typedefs | | |
| Enum types | | |
| Enum values | | |
| Constants | | |
| Private members | | |
| Protected members | | |
| Static members | | |
| Test functions/methods | | |
| Package/module names | | |
| File names | | |
| Generic type parameters | | |
| Error/exception types | | |
| Configuration keys | | |

**For each, include:**
1. The naming pattern (camelCase, PascalCase, snake_case, etc.)
2. Prefix/suffix conventions (e.g., `I` prefix for interfaces in C#)
3. A good example and a bad example
4. Tooling that enforces this convention (linter rule name if applicable)

**Also include a section on:**
- Abbreviation handling (e.g., `URL` vs `Url` vs `url`)
- Acronym casing rules
- Domain-specific naming patterns for the language ecosystem
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{LANGUAGE}}` | Target language | `Python`, `TypeScript`, `Go`, `Rust`, `C#` |
| `{{STYLE_GUIDE_REFERENCE}}` | Official guide name | `PEP 8`, `Google TS Style Guide`, `Effective Go` |

## Tips & Variations

- For multi-language projects: "Generate a cross-language naming translation table showing how the same concept is named in {{LANG1}} vs {{LANG2}}."

## Composition

- **Precedes:** `coding-clean-code-principles`, `review-checklist`
- **Follows:** `naming-general-guide`
- **Combines with:** `naming-general-guide`, `coding-clean-code-principles`
- **Overlay:** Technology overlays available in `overlays/`

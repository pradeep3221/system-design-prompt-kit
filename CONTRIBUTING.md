# Contributing to Technical Prompt Library

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents

- [How Can I Contribute?](#how-can-i-contribute)
- [Prompt Guidelines](#prompt-guidelines)
- [File Naming Conventions](#file-naming-conventions)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)

---

## How Can I Contribute?

### 🐛 Report Issues
- Use the [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md) template for errors or inconsistencies.

### 💡 Suggest New Prompts
- Use the [New Prompt](.github/ISSUE_TEMPLATE/new_prompt.md) template to propose additions.

### 🔧 Submit Changes
1. Fork the repository.
2. Create a feature branch: `git checkout -b prompts/your-topic`
3. Make your changes following the guidelines below.
4. Commit with a descriptive message: `git commit -m "feat(api): add rate-limiting prompt"`
5. Push to your fork and open a Pull Request.

---

## Prompt Guidelines

Every prompt file must follow this structure:

```markdown
# Title of the Prompt

> Brief one-line description of what this prompt accomplishes.

## Category
`category-name`

## Complexity
`basic` | `intermediate` | `advanced`

## Prompt

\```text
The actual prompt content with {{PLACEHOLDERS}} for customization.
\```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{VAR}}` | What it represents | Sample value |

## Example Output

A sample of what good output looks like when the prompt is used.

## Tips & Variations

- Variant 1: ...
- Variant 2: ...
```

---

## File Naming Conventions

- Use kebab-case: `01-endpoint-design.md`
- Prefix with a 2-digit number for ordering: `01-`, `02-`, etc.
- Keep names descriptive but concise.
- Each category folder must have a `README.md` index file.

---

## Pull Request Process

1. Ensure your prompt follows the [Prompt Guidelines](#prompt-guidelines).
2. Update the category `README.md` if adding a new prompt.
3. Update the root `CHANGELOG.md` with your addition.
4. Your PR will be reviewed by at least one maintainer.
5. Once approved, a maintainer will merge your PR.

---

## Style Guide

### Markdown
- Use ATX-style headers (`#`, `##`, `###`).
- Use fenced code blocks with language identifiers.
- Use tables for structured data.
- One sentence per line for easier diffs.

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat(category): add new prompt for X`
- `fix(api): correct placeholder in endpoint design prompt`
- `docs: update README with new category`

---

## 🙏 Thank You

Every contribution makes this library more useful for the community!

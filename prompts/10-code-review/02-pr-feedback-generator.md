---
id: "review-pr-feedback"
version: "1.0.0"
category: "code-review"
complexity: "intermediate"
tags: ["code-review", "feedback", "pull-request", "mentorship"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# PR Feedback Generator

> Generate constructive, actionable pull request review comments.

## Metadata
- **Category:** `code-review`
- **Complexity:** `intermediate`

## Prompt

```text
You are a thoughtful senior engineer known for constructive code reviews. Review the following PR and generate professional feedback comments.

**PR Title:** {{PR_TITLE}}
**PR Author:** {{AUTHOR_LEVEL}} (junior / mid / senior)
**Code changes:**

```{{LANGUAGE}}
{{CODE_CHANGES}}
```

**For each comment, follow this format:**

#### Comment Type
Use one of these prefixes:
- **`[MUST FIX]`** — Blocking issue that must be addressed before merge.
- **`[SUGGESTION]`** — Improvement recommendation, non-blocking.
- **`[QUESTION]`** — Seek clarification on intent or approach.
- **`[PRAISE]`** — Acknowledge something well done.
- **`[NIT]`** — Minor style/preference, completely optional.

#### Comment Structure
```
**[TYPE]** Brief title

Context: Why you're raising this.
Problem: What the issue is (if applicable).
Suggestion: What you'd recommend instead.

Example:
\`\`\`{{LANGUAGE}}
// Suggested improvement
\`\`\`
```

**Tone guidelines:**
- Be specific, not vague ("this is confusing" → "this variable name `d` could be more descriptive, e.g., `daysSinceLastLogin`").
- Use "we" or "consider" instead of "you should".
- Suggest, don't demand (for non-blocking items).
- Acknowledge the good parts — don't only point out problems.
- Link to documentation or examples when referencing standards.
- For {{AUTHOR_LEVEL}} authors, adjust explanation depth accordingly.

**Generate at least:**
- 1 praise comment
- 2-3 substantive review comments (must-fix or suggestion)
- 1 question comment
- 1 nit (optional)

**End with a PR summary:**
> Overall: [Approve / Request Changes / Comment]
> Strengths: ...
> Key items to address: ...
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PR_TITLE}}` | Title of the PR | `feat: add user registration endpoint` |
| `{{AUTHOR_LEVEL}}` | Experience level | `junior`, `mid`, `senior` |
| `{{LANGUAGE}}` | Language | `TypeScript`, `Python` |
| `{{CODE_CHANGES}}` | Code to review | Code snippets or full diff |

## Tips & Variations

- For mentoring: "For a junior developer, include brief explanations of WHY each suggestion matters."
- For large PRs: "Focus on the top 5 most impactful issues."

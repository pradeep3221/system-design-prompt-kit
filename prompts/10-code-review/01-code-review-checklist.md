---
id: "review-checklist"
version: "1.0.0"
category: "code-review"
complexity: "basic"
tags: ["code-review", "checklist", "quality-gate", "pull-request"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Code Review Checklist

> Apply a comprehensive checklist to systematically review any pull request.

## Metadata
- **Category:** `code-review`
- **Complexity:** `basic`

## Prompt

```text
You are a senior engineer conducting a code review. Review the following code change using a structured checklist.

**PR description:** {{PR_DESCRIPTION}}
**Language:** {{LANGUAGE}}
**Code diff:**

```diff
{{CODE_DIFF}}
```

**Apply this review checklist:**

### ✅ Correctness
- [ ] Does the code do what the PR description says?
- [ ] Are edge cases handled (null, empty, boundary values)?
- [ ] Are error paths handled correctly?
- [ ] Is the logic correct for all inputs?
- [ ] Are race conditions possible?

### ✅ Design
- [ ] Does the change follow existing architectural patterns?
- [ ] Is the code at the right abstraction level?
- [ ] Does it follow SOLID principles?
- [ ] Is there unnecessary complexity?
- [ ] Could this be simpler?

### ✅ Readability
- [ ] Are names self-documenting?
- [ ] Is the code easy to follow without comments?
- [ ] Are functions small and focused?
- [ ] Is formatting consistent?

### ✅ Security
- [ ] Is user input validated?
- [ ] Are there injection vulnerabilities (SQL, XSS, command)?
- [ ] Are secrets or PII exposed?
- [ ] Are permissions checked?

### ✅ Performance
- [ ] Are there N+1 query issues?
- [ ] Are expensive operations in loops?
- [ ] Are there unnecessary allocations?
- [ ] Is caching considered where appropriate?

### ✅ Testing
- [ ] Are new tests added for new functionality?
- [ ] Do tests cover happy path and error cases?
- [ ] Are tests independent and repeatable?
- [ ] Is test coverage adequate?

### ✅ Observability
- [ ] Is logging appropriate (not too much, not too little)?
- [ ] Are errors logged with context?
- [ ] Are metrics updated?

### ✅ Documentation
- [ ] Are complex decisions documented?
- [ ] Is the README updated if behavior changes?
- [ ] Is the CHANGELOG updated?

**For each issue found, provide:**
- Category (from checklist above)
- Severity: 🔴 Must Fix | 🟡 Should Fix | 🟢 Nitpick
- Specific line reference
- Explanation with suggestion
- Code example of the fix

**Summary:** Overall assessment — Approve / Request Changes / Comment
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PR_DESCRIPTION}}` | What the PR does | `Add order cancellation endpoint` |
| `{{LANGUAGE}}` | Language | `TypeScript`, `Python`, `Java` |
| `{{CODE_DIFF}}` | The diff to review | Git diff content |

## Tips & Variations

- For junior developers: "Emphasize learning opportunities and explain WHY for each suggestion."
- For security-critical code: "Weight the security section 2x higher."

# Clean Code Principles

> Generate a comprehensive clean code review and improvement plan for a given codebase or code snippet.

## Category
`coding-best-practices`

## Complexity
`basic`

## Prompt

```text
You are a senior software engineer specializing in clean code practices. Analyze the following code and provide recommendations based on clean code principles.

**Context:**
- Language: {{LANGUAGE}}
- Project type: {{PROJECT_TYPE}}
- Code to review:

```{{LANGUAGE}}
{{CODE_SNIPPET}}
```

**Evaluate the code against these clean code principles:**

1. **Meaningful Names** — Are variable, function, and class names self-documenting?
2. **Small Functions** — Does each function do exactly one thing? Are they under 20 lines?
3. **Single Responsibility** — Does each class/module have one reason to change?
4. **Minimal Comments** — Is the code self-explanatory, or do comments compensate for unclear code?
5. **Consistent Formatting** — Is indentation, spacing, and style consistent?
6. **No Magic Numbers** — Are literal values replaced with named constants?
7. **Minimal Dependencies** — Are function parameters kept to 3 or fewer?
8. **No Side Effects** — Do functions avoid unexpected state changes?
9. **Error Handling** — Are errors handled explicitly without swallowing exceptions?
10. **DRY Compliance** — Is there any duplicated logic?

**For each issue found, provide:**
- The principle violated
- The specific line or section
- A corrected code example
- Brief explanation of why the change improves the code

**Output format:** Structured markdown with sections per principle.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{LANGUAGE}}` | Programming language | `python`, `typescript`, `java` |
| `{{PROJECT_TYPE}}` | Type of project | `REST API`, `CLI tool`, `web app` |
| `{{CODE_SNIPPET}}` | The code to analyze | Any code block |

## Example Output

```markdown
## Clean Code Analysis

### 1. Meaningful Names
- **Issue:** Variable `d` on line 5 is not descriptive.
- **Fix:** Rename to `daysSinceLastLogin`.
- **Why:** Self-documenting names reduce the need for comments and cognitive load.

### 2. Small Functions
- **Issue:** `processOrder()` is 85 lines long and handles validation, pricing, and persistence.
- **Fix:** Extract into `validateOrder()`, `calculatePrice()`, and `saveOrder()`.
...
```

## Tips & Variations

- For a quick review, ask to focus on only the top 3 most impactful improvements.
- Append "Also suggest which automated linting rules would catch these issues" for tooling recommendations.
- Add "Rate the overall cleanliness from 1-10 with justification" for a summary score.

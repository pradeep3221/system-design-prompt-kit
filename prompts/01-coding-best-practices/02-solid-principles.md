# SOLID Principles

> Analyze or design code following the five SOLID object-oriented design principles.

## Category
`coding-best-practices`

## Complexity
`intermediate`

## Prompt

```text
You are an expert software architect. Analyze the following {{LANGUAGE}} code for adherence to SOLID principles and provide actionable improvements.

**Code to analyze:**

```{{LANGUAGE}}
{{CODE_SNIPPET}}
```

**Evaluate against each SOLID principle:**

### S — Single Responsibility Principle (SRP)
- Does each class have only one reason to change?
- Identify classes with mixed responsibilities and suggest how to split them.

### O — Open/Closed Principle (OCP)
- Is the code open for extension but closed for modification?
- Identify places where adding new behavior requires modifying existing code.
- Suggest strategy/plugin patterns where appropriate.

### L — Liskov Substitution Principle (LSP)
- Can derived classes be substituted for their base classes without breaking behavior?
- Identify any inheritance hierarchies that violate behavioral contracts.

### I — Interface Segregation Principle (ISP)
- Are interfaces focused and minimal?
- Identify "fat" interfaces that force implementers to depend on methods they don't use.

### D — Dependency Inversion Principle (DIP)
- Do high-level modules depend on abstractions rather than concrete implementations?
- Identify tight couplings and suggest dependency injection improvements.

**For each violation, provide:**
1. The principle violated and its severity (High / Medium / Low)
2. Current code showing the violation
3. Refactored code demonstrating the fix
4. Explanation of the design improvement

**Summary:** Provide an overall SOLID compliance score (1-10) and a prioritized list of refactoring tasks.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{LANGUAGE}}` | Programming language | `csharp`, `java`, `typescript` |
| `{{CODE_SNIPPET}}` | Code to analyze | Class definitions, module code |

## Example Output

```markdown
## SOLID Analysis — Overall Score: 6/10

### SRP Violations (2 found)
**Severity: High**
`OrderService` handles order creation, email notifications, and PDF generation.
**Suggested refactoring:** Extract `OrderNotificationService` and `OrderDocumentService`...

### DIP Violations (1 found)
**Severity: Medium**
`OrderService` directly instantiates `SqlOrderRepository`.
**Suggested refactoring:** Inject `IOrderRepository` via constructor...
```

## Tips & Variations

- For greenfield design: "Design a class structure for {{FEATURE}} that adheres to all SOLID principles."
- For code review: "Which SOLID violations are the highest priority to fix and why?"
- Combine with "Also apply clean code naming conventions to the refactored version."

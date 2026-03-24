# Error Handling Best Practices

> Design and review robust error handling strategies for production-grade applications.

## Category
`coding-best-practices`

## Complexity
`intermediate`

## Prompt

```text
You are an expert in building resilient, production-grade software. Design or review the error handling strategy for the following context.

**Language:** {{LANGUAGE}}
**Framework:** {{FRAMEWORK}}
**Application type:** {{APP_TYPE}}
**Code/Architecture to review:**

{{CODE_OR_DESCRIPTION}}

**Analyze and recommend error handling for:**

1. **Error Classification**
   - Define error categories: Validation, Business Logic, Infrastructure, External Service, Authentication/Authorization.
   - Map each error to appropriate HTTP status codes (if applicable) or exit codes.

2. **Error Propagation Strategy**
   - When to catch vs. propagate exceptions.
   - Use of custom exception hierarchies vs. error codes vs. Result/Either patterns.
   - Global error handlers vs. local try-catch blocks.

3. **Error Response Format**
   Recommend a consistent structure:
   ```json
   {
     "error": {
       "code": "RESOURCE_NOT_FOUND",
       "message": "Human-readable description",
       "details": [],
       "traceId": "abc-123",
       "timestamp": "2026-01-01T00:00:00Z"
     }
   }
   ```

4. **Logging & Observability**
   - What to log at each level (ERROR, WARN, INFO).
   - Sensitive data that must NEVER appear in logs.
   - Correlation IDs and distributed tracing integration.

5. **Retry & Circuit Breaker Patterns**
   - Which errors are retryable vs. terminal.
   - Recommended retry policies (exponential backoff, jitter).
   - Circuit breaker thresholds.

6. **Anti-Patterns to Avoid**
   - Swallowing exceptions silently.
   - Using exceptions for control flow.
   - Returning `null` instead of proper error indicators.
   - Catching generic `Exception` without re-throwing.

**Provide:** A complete error handling implementation guide with code examples.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{LANGUAGE}}` | Programming language | `java`, `csharp`, `node.js` |
| `{{FRAMEWORK}}` | Framework in use | `Spring Boot`, `ASP.NET`, `Express` |
| `{{APP_TYPE}}` | Type of application | `REST API`, `event processor`, `CLI` |
| `{{CODE_OR_DESCRIPTION}}` | Existing code or system description | Code snippet or architecture overview |

## Tips & Variations

- For microservices: "Include cross-service error propagation and gRPC error mapping."
- For frontend: "Include user-facing error message guidelines and retry UX."

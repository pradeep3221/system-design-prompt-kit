# Error Response Design

> Standardize API error response formats, error codes, and HTTP status code usage.

## Category
`rest-api-design`

## Complexity
`intermediate`

## Prompt

```text
You are an API design expert. Create a comprehensive error handling specification for the {{PROJECT_NAME}} REST API.

**Design the following:**

### 1. Standard Error Response Schema

```json
{
  "error": {
    "code": "string — Machine-readable error code",
    "message": "string — Human-readable summary",
    "target": "string — The field or parameter that caused the error (optional)",
    "details": [
      {
        "code": "string",
        "message": "string",
        "target": "string"
      }
    ],
    "innererror": {
      "traceId": "string — Request trace ID for debugging",
      "timestamp": "string — ISO 8601 timestamp"
    }
  }
}
```

### 2. HTTP Status Code Usage Guide

| Status Code | When to Use | Example Scenario |
|-------------|-------------|-----------------|
| 400 Bad Request | | |
| 401 Unauthorized | | |
| 403 Forbidden | | |
| 404 Not Found | | |
| 405 Method Not Allowed | | |
| 409 Conflict | | |
| 422 Unprocessable Entity | | |
| 429 Too Many Requests | | |
| 500 Internal Server Error | | |
| 502 Bad Gateway | | |
| 503 Service Unavailable | | |

### 3. Application Error Code Catalog
Define a structured error code system:
- `VALIDATION_*` — Input validation errors
- `AUTH_*` — Authentication/authorization errors
- `RESOURCE_*` — Resource state errors
- `BUSINESS_*` — Business rule violations
- `SYSTEM_*` — Infrastructure/system errors

Create at least 15 specific error codes for the {{DOMAIN}} domain.

### 4. Validation Error Format
Show how to return multiple field validation errors in a single response.

### 5. Error Localization Strategy
How to support multi-language error messages.

### 6. Client Error Handling Guidance
Document how API consumers should handle each error category.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | API project name | `Payment Gateway API` |
| `{{DOMAIN}}` | Business domain | `payments`, `e-commerce`, `healthcare` |

## Tips & Variations

- Add: "Include retry guidance in error responses (Retry-After header)."
- Add: "Design a problem+json response format per RFC 9457."

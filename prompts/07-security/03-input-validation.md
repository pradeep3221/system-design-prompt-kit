---
id: "security-input-validation"
version: "1.0.0"
category: "security"
complexity: "intermediate"
tags: ["input-validation", "sanitization", "injection", "xss"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Input Validation

> Design comprehensive input validation and sanitization strategies to prevent injection attacks.

## Metadata
- **Category:** `security`
- **Complexity:** `intermediate`

## Prompt

```text
You are a secure coding expert. Design an input validation strategy for the {{APP_NAME}} {{LANGUAGE}} application.

**Application endpoints/inputs to validate:**
{{INPUT_SOURCES}}

**Design validation for each input type:**

### 1. String Inputs
- Maximum length limits
- Character allowlists (prefer over blocklists)
- Regex patterns for structured data (email, phone, URL)
- Unicode and encoding normalization
- HTML/script tag stripping or encoding

### 2. Numeric Inputs
- Type checking (integer vs. float)
- Range validation (min/max)
- Precision limits for decimal values

### 3. Email Addresses
- RFC 5322 format validation
- Domain verification (MX record check)
- Disposable email detection (optional)

### 4. URLs
- Protocol allowlist (`https` only)
- Private IP/localhost blocking (SSRF prevention)
- URL length limits

### 5. File Uploads
- MIME type validation (check magic bytes, not just extension)
- File size limits
- Filename sanitization (path traversal prevention)
- Image reprocessing (strip EXIF, re-encode)
- Virus scanning integration

### 6. API Request Bodies
- JSON schema validation
- Unknown field rejection (`additionalProperties: false`)
- Nested depth limits
- Array size limits

### 7. Query Parameters & Path Params
- Type coercion safety
- SQL injection prevention in sort/filter params
- Pagination limit enforcement

### 8. Output Encoding
- Context-aware encoding (HTML, JavaScript, URL, CSS)
- Content-Security-Policy header
- JSON serialization safety

**For each validation, provide:**
- The validation rule
- Implementation code in {{LANGUAGE}}
- What attack it prevents
- Error message to return (without leaking internals)

**Framework integration:** Show how to integrate with {{FRAMEWORK}}'s validation pipeline.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{APP_NAME}}` | Application name | `User Registration API` |
| `{{LANGUAGE}}` | Programming language | `TypeScript`, `Python`, `C#` |
| `{{FRAMEWORK}}` | Framework | `NestJS + class-validator`, `FastAPI + Pydantic`, `ASP.NET FluentValidation` |
| `{{INPUT_SOURCES}}` | Inputs to validate | `Registration form, profile update, file upload, search` |

## Tips & Variations

- Add: "Generate a reusable validation middleware/decorator library."
- For APIs: "Include OpenAPI schema validation middleware setup."

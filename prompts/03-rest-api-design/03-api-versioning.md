---
id: "api-rest-versioning"
version: "1.0.0"
category: "api-design/rest"
complexity: "intermediate"
tags: ["rest", "api", "versioning", "backward-compatibility"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# API Versioning Strategy

> Choose and implement the right API versioning approach for long-term maintainability.

## Metadata
- **Category:** `api-design/rest`
- **Complexity:** `intermediate`

## Prompt

```text
You are an API architect. Recommend and design an API versioning strategy for {{PROJECT_NAME}}.

**Context:**
- Number of API consumers: {{CONSUMER_COUNT}}
- API type: {{API_TYPE}}
- Expected rate of breaking changes: {{CHANGE_FREQUENCY}}

**Analyze these versioning approaches:**

### 1. URI Path Versioning
- Example: `/api/v1/users`, `/api/v2/users`
- Pros and cons
- When to use

### 2. Query Parameter Versioning
- Example: `/api/users?version=2`
- Pros and cons
- When to use

### 3. Header Versioning
- Example: `Accept: application/vnd.myapi.v2+json`
- Pros and cons
- When to use

### 4. Content Negotiation
- Example: `Accept: application/vnd.myapi.users.v2+json`
- Pros and cons
- When to use

**For the recommended approach, provide:**

1. **Migration strategy** — How to introduce a new version without breaking existing consumers.
2. **Deprecation policy** — Timeline and communication plan for sunsetting old versions.
3. **Breaking vs. non-breaking changes** — Classification guide:
   - Breaking: removing fields, changing types, renaming endpoints
   - Non-breaking: adding optional fields, new endpoints, adding enum values
4. **Version lifecycle** — Stages: Alpha → Beta → Stable → Deprecated → Sunset
5. **Documentation requirements** — Per-version changelogs, migration guides.
6. **Implementation pattern** — Code-level approach (routing, controllers, transformers).
7. **Sunset headers** — `Sunset: Sat, 01 Jan 2028 00:00:00 GMT` per RFC 8594.

**Provide a concrete implementation example in {{LANGUAGE}}/{{FRAMEWORK}}.**
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | API name | `Customer Portal API` |
| `{{CONSUMER_COUNT}}` | Approximate consumer count | `10+`, `100+`, `public` |
| `{{API_TYPE}}` | Public, internal, or partner | `public`, `internal`, `partner` |
| `{{CHANGE_FREQUENCY}}` | How often breaking changes occur | `quarterly`, `rarely`, `frequently` |
| `{{LANGUAGE}}` | Implementation language | `Node.js`, `C#`, `Python` |
| `{{FRAMEWORK}}` | Framework | `Express`, `ASP.NET`, `FastAPI` |

## Tips & Variations

- For GraphQL: "Design a schema evolution strategy instead of traditional versioning."
- For event-driven APIs: "Include event schema versioning with Avro/Protobuf."

# Endpoint Design

> Design a complete, RESTful API endpoint set for any resource following REST conventions.

## Category
`rest-api-design`

## Complexity
`intermediate`

## Prompt

```text
You are an API architect following Microsoft REST API Guidelines and Google API Design Guide. Design a complete RESTful API for the resource described below.

**Project:** {{PROJECT_NAME}}
**Resource:** {{RESOURCE_NAME}}
**Domain description:** {{DOMAIN_DESCRIPTION}}

**Design the following for this resource:**

### 1. Resource Model
- Define the resource schema (JSON) with all fields, types, and constraints.
- Identify sub-resources and relationships.
- Define read-only fields (`id`, `createdAt`, `updatedAt`).

### 2. Endpoints
Design each endpoint with:
- HTTP method and URL path
- Request headers, path params, query params
- Request body (if applicable)
- Response body with status codes
- Idempotency considerations

**Standard CRUD:**
| Operation | Method | Endpoint | Success Code |
|-----------|--------|----------|-------------|
| List | GET | /{{resource}} | 200 |
| Get by ID | GET | /{{resource}}/{id} | 200 |
| Create | POST | /{{resource}} | 201 |
| Full Update | PUT | /{{resource}}/{id} | 200 |
| Partial Update | PATCH | /{{resource}}/{id} | 200 |
| Delete | DELETE | /{{resource}}/{id} | 204 |

**Beyond CRUD (if applicable):**
- Bulk operations: `POST /{{resource}}/bulk`
- Actions: `POST /{{resource}}/{id}/{{action}}`
- Sub-resources: `GET /{{resource}}/{id}/{{sub-resource}}`

### 3. Request/Response Examples
Provide curl examples for each endpoint.

### 4. OpenAPI Specification
Generate an OpenAPI 3.0 YAML snippet for 2-3 key endpoints.

### 5. Design Decisions
Document why specific design choices were made (e.g., PATCH vs PUT, nested vs. flat resources).
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | The API project name | `Inventory Management System` |
| `{{RESOURCE_NAME}}` | Primary resource | `products`, `orders`, `users` |
| `{{DOMAIN_DESCRIPTION}}` | Brief domain context | `E-commerce platform managing product catalog with categories and inventory` |

## Tips & Variations

- For microservices: "Design with cross-service communication contracts (sync + async)."
- Add: "Include rate limiting headers and HATEOAS links in responses."

# API Documentation

> Generate comprehensive API reference documentation from endpoints or OpenAPI specs.

## Category
`documentation`

## Complexity
`basic`

## Prompt

```text
You are a technical writer. Generate comprehensive API documentation for the {{API_NAME}}.

**API base URL:** {{BASE_URL}}
**Authentication:** {{AUTH_METHOD}}
**Endpoints or OpenAPI spec:**

{{ENDPOINT_LIST_OR_SPEC}}

**For each endpoint, document:**

### Endpoint: `{{METHOD}} {{PATH}}`

**Description:** What this endpoint does in one sentence.

**Authentication:** Required / Optional / None

**Request:**

| Parameter | Location | Type | Required | Description |
|-----------|----------|------|----------|-------------|
| | path / query / header / body | string / integer / boolean | yes / no | |

**Request Body Example:**
```json
{
  "field": "value"
}
```

**Response:**

| Status Code | Description |
|-------------|-------------|
| 200 | Success response description |
| 400 | Validation error |
| 401 | Authentication required |
| 404 | Resource not found |

**Success Response Example:**
```json
{
  "data": {},
  "pagination": {}
}
```

**Error Response Example:**
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found."
  }
}
```

**Code Examples:**

```bash
# cURL
curl -X {{METHOD}} {{BASE_URL}}{{PATH}} \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

```javascript
// JavaScript (fetch)
const response = await fetch('{{BASE_URL}}{{PATH}}', { ... });
```

```python
# Python (requests)
response = requests.{{method}}('{{BASE_URL}}{{PATH}}', ...)
```

---

**Also include:**
- Authentication guide (how to obtain and use tokens)
- Rate limiting documentation
- Pagination guide
- Error code reference
- Webhook documentation (if applicable)
- SDK quickstart guides
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{API_NAME}}` | API name | `User Management API` |
| `{{BASE_URL}}` | Base URL | `https://api.example.com/v1` |
| `{{AUTH_METHOD}}` | Auth method | `Bearer token (JWT)`, `API Key`, `OAuth 2.0` |
| `{{ENDPOINT_LIST_OR_SPEC}}` | Endpoints or spec | List of endpoints or OpenAPI YAML |

## Tips & Variations

- Add: "Generate an OpenAPI 3.0 specification from these endpoints."
- Add: "Create a Postman collection for these endpoints."

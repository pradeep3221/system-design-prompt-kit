# API Specification Template

> Copy this template to document a new API or API version.

---

# {{API Name}} — API Specification

**Version:** 1.0.0
**Base URL:** `https://api.example.com/v1`
**Authentication:** Bearer Token (JWT)

---

## Overview

[Brief description of the API and its purpose.]

## Authentication

### Obtaining a Token
```bash
POST /auth/token
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "********"
}
```

### Using the Token
```
Authorization: Bearer <access_token>
```

---

## Common Response Format

### Success
```json
{
  "data": { ... },
  "meta": {
    "requestId": "uuid",
    "timestamp": "ISO8601"
  }
}
```

### Error
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": []
  }
}
```

### Pagination
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 100,
    "totalPages": 5
  }
}
```

---

## Endpoints

### Resource: [Name]

#### List [Resources]
```
GET /resources?page=1&pageSize=20&sort=createdAt:desc
```
**Query Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | integer | 1 | Page number |
| pageSize | integer | 20 | Items per page (max: 100) |
| sort | string | createdAt:desc | Sort field and direction |

**Response:** `200 OK`
```json
{
  "data": [{ "id": "...", "name": "..." }],
  "pagination": { ... }
}
```

#### Get [Resource]
```
GET /resources/{id}
```
**Response:** `200 OK`

#### Create [Resource]
```
POST /resources
```
**Request Body:**
```json
{
  "name": "required string",
  "description": "optional string"
}
```
**Response:** `201 Created`

#### Update [Resource]
```
PATCH /resources/{id}
```
**Response:** `200 OK`

#### Delete [Resource]
```
DELETE /resources/{id}
```
**Response:** `204 No Content`

---

## Error Codes

| Code | HTTP Status | Description |
|------|------------|-------------|
| VALIDATION_ERROR | 400 | Request validation failed |
| UNAUTHORIZED | 401 | Invalid or missing authentication |
| FORBIDDEN | 403 | Insufficient permissions |
| RESOURCE_NOT_FOUND | 404 | Resource does not exist |
| CONFLICT | 409 | Resource state conflict |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Unexpected server error |

---

## Rate Limiting

| Header | Description |
|--------|-------------|
| X-RateLimit-Limit | Maximum requests per window |
| X-RateLimit-Remaining | Remaining requests in window |
| X-RateLimit-Reset | UTC epoch when window resets |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | YYYY-MM-DD | Initial release |

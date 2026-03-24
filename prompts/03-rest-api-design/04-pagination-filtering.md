# Pagination & Filtering

> Design robust pagination, sorting, and filtering for API collection endpoints.

## Category
`rest-api-design`

## Complexity
`intermediate`

## Prompt

```text
You are an API architect. Design a comprehensive pagination, filtering, and sorting system for the {{PROJECT_NAME}} API.

**Resource:** {{RESOURCE}} with approximately {{DATASET_SIZE}} records.

### 1. Pagination Strategy

**Compare and recommend between:**

| Strategy | Best For | Drawbacks |
|----------|----------|-----------|
| Offset-based (`?page=2&pageSize=20`) | Simple UIs, random page access | Inconsistent with inserts/deletes |
| Cursor-based (`?cursor=abc123&limit=20`) | Large datasets, real-time feeds | No random page access |
| Keyset pagination (`?after=lastId&limit=20`) | High-performance ordered data | Requires stable sort key |

**Design the response envelope:**
```json
{
  "data": [...],
  "pagination": {
    "page": 2,
    "pageSize": 20,
    "totalItems": 1547,
    "totalPages": 78,
    "hasNext": true,
    "hasPrevious": true,
    "links": {
      "self": "/api/v1/{{resource}}?page=2&pageSize=20",
      "first": "/api/v1/{{resource}}?page=1&pageSize=20",
      "prev": "/api/v1/{{resource}}?page=1&pageSize=20",
      "next": "/api/v1/{{resource}}?page=3&pageSize=20",
      "last": "/api/v1/{{resource}}?page=78&pageSize=20"
    }
  }
}
```

### 2. Filtering

Design a filtering system supporting:
- Exact match: `?status=active`
- Comparison: `?price[gte]=10&price[lte]=100`
- Contains/search: `?name[contains]=widget`
- In list: `?status[in]=active,pending`
- Date ranges: `?createdAt[after]=2026-01-01`
- Null checks: `?deletedAt[isNull]=true`
- Nested field filtering: `?author.name=John`

### 3. Sorting

- Single sort: `?sort=createdAt:desc`
- Multi-sort: `?sort=status:asc,createdAt:desc`
- Default sort behavior when not specified.
- Fields that should be sortable vs. non-sortable.

### 4. Field Selection (Sparse Fieldsets)
- `?fields=id,name,email` — return only specified fields.
- Performance implications and implementation.

### 5. Performance Considerations
- Maximum page size limits.
- Index requirements for filterable/sortable fields.
- Count query optimization (exact vs. estimated counts).
- Caching strategy for paginated responses.

**Provide implementation code for {{LANGUAGE}}/{{FRAMEWORK}}.**
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | API project name | `Product Catalog API` |
| `{{RESOURCE}}` | Collection resource | `products`, `orders` |
| `{{DATASET_SIZE}}` | Expected data volume | `10K`, `1M`, `100M+` |
| `{{LANGUAGE}}` | Implementation language | `TypeScript`, `Python`, `C#` |
| `{{FRAMEWORK}}` | Framework | `Express`, `FastAPI`, `ASP.NET` |

## Tips & Variations

- For GraphQL: "Design with Relay-style cursor connections."
- Add: "Include OpenAPI spec for the paginated endpoint."

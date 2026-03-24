# Sample API Design: Task Management API

> This is a worked example using prompts from `prompts/03-rest-api-design/`.

---

## Context

We are designing a REST API for a task management application (like a simplified Todoist/Trello). This example demonstrates the output you might get from applying the API design prompts to a real project.

---

## 1. Resource Identification (from 01-endpoint-design.md)

### Resources
| Resource | Description |
|----------|-------------|
| `users` | Application users |
| `projects` | Task containers / workspaces |
| `tasks` | Individual work items within projects |
| `labels` | Tags applied to tasks |
| `comments` | Discussion on tasks |

### Endpoint Design

```
# Projects
GET    /api/v1/projects                    # List user's projects
POST   /api/v1/projects                    # Create project
GET    /api/v1/projects/{projectId}        # Get project details
PUT    /api/v1/projects/{projectId}        # Update project
DELETE /api/v1/projects/{projectId}        # Delete project

# Tasks (nested under projects)
GET    /api/v1/projects/{projectId}/tasks              # List tasks
POST   /api/v1/projects/{projectId}/tasks              # Create task
GET    /api/v1/projects/{projectId}/tasks/{taskId}     # Get task
PATCH  /api/v1/projects/{projectId}/tasks/{taskId}     # Partial update
DELETE /api/v1/projects/{projectId}/tasks/{taskId}     # Delete task
POST   /api/v1/projects/{projectId}/tasks/{taskId}/complete  # Complete task

# Comments (nested under tasks)
GET    /api/v1/projects/{projectId}/tasks/{taskId}/comments
POST   /api/v1/projects/{projectId}/tasks/{taskId}/comments
DELETE /api/v1/projects/{projectId}/tasks/{taskId}/comments/{commentId}

# Labels (top-level, shared across projects)
GET    /api/v1/labels
POST   /api/v1/labels
DELETE /api/v1/labels/{labelId}
```

---

## 2. Error Response Design (from 02-error-response-design.md)

### Standard Error Envelope

```json
{
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "The requested task does not exist.",
    "status": 404,
    "details": [
      {
        "field": "taskId",
        "reason": "Task with ID '9f3a...' was not found in project 'proj_abc'."
      }
    ],
    "traceId": "abc-123-def-456"
  }
}
```

### Error Code Catalog

| HTTP Status | Error Code | Description |
|------------|------------|-------------|
| 400 | `VALIDATION_ERROR` | Request body fails validation |
| 400 | `INVALID_DATE_FORMAT` | Date must be ISO 8601 |
| 401 | `AUTHENTICATION_REQUIRED` | Missing or invalid token |
| 403 | `INSUFFICIENT_PERMISSIONS` | User lacks project access |
| 404 | `TASK_NOT_FOUND` | Task ID does not exist |
| 404 | `PROJECT_NOT_FOUND` | Project ID does not exist |
| 409 | `TASK_ALREADY_COMPLETED` | Cannot modify a completed task |
| 422 | `DUE_DATE_IN_PAST` | Due date cannot be in the past |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |

---

## 3. Pagination & Filtering (from 04-pagination-filtering.md)

### Request

```
GET /api/v1/projects/proj_abc/tasks?status=open&priority=high&page=2&per_page=20&sort=-due_date
```

### Response with Pagination Metadata

```json
{
  "data": [
    {
      "id": "task_001",
      "title": "Design database schema",
      "status": "open",
      "priority": "high",
      "due_date": "2026-04-15",
      "assignee": "user_42",
      "labels": ["backend", "database"],
      "created_at": "2026-03-20T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 2,
    "per_page": 20,
    "total_items": 87,
    "total_pages": 5,
    "has_next": true,
    "has_prev": true
  },
  "links": {
    "self": "/api/v1/projects/proj_abc/tasks?page=2&per_page=20",
    "first": "/api/v1/projects/proj_abc/tasks?page=1&per_page=20",
    "prev": "/api/v1/projects/proj_abc/tasks?page=1&per_page=20",
    "next": "/api/v1/projects/proj_abc/tasks?page=3&per_page=20",
    "last": "/api/v1/projects/proj_abc/tasks?page=5&per_page=20"
  }
}
```

### Supported Filters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | enum | `open`, `completed`, `archived` |
| `priority` | enum | `low`, `medium`, `high`, `urgent` |
| `assignee` | string | User ID |
| `label` | string | Label name (repeatable) |
| `due_before` | date | ISO 8601 date |
| `due_after` | date | ISO 8601 date |
| `q` | string | Full-text search on title/description |

---

## 4. API Security (from 05-api-security.md)

### Authentication
- **Mechanism**: OAuth 2.0 with JWT access tokens
- **Token lifetime**: 15 minutes (access), 7 days (refresh)
- **Header**: `Authorization: Bearer <token>`

### Authorization Model
- Project-level roles: `owner`, `editor`, `viewer`
- Task operations require at least `editor` role on the parent project
- Users can only see projects they are members of

### Rate Limiting
| Tier | Limit | Window |
|------|-------|--------|
| Free | 100 requests | per minute |
| Pro | 1000 requests | per minute |
| Enterprise | 10,000 requests | per minute |

Rate limit headers returned on every response:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1711320000
```

### Input Validation Rules
- Task title: 1–200 characters, sanitized for XSS
- Description: max 10,000 characters, Markdown allowed
- Labels: max 50 per task, each 1–50 characters, alphanumeric + hyphens
- Due date: must be ISO 8601, must be today or future

---

## Summary

This example demonstrated how the prompts in the REST API Design category can be applied together to produce a cohesive, well-documented API design for a real-world application.

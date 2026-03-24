# Python / FastAPI Overlay

Technology overlay for Python, FastAPI, Django, and Flask applications.

## Overlay Files

| Overlay | Extends Base Prompt | Description |
|---------|-------------------|-------------|
| REST API Design | `api-rest-endpoint-design` | FastAPI routers, Pydantic models |
| Worker Service | `bg-worker-service-design` | Celery, RQ, Dramatiq patterns |
| Testing | `testing-unit` | pytest, httpx, factory_boy |

## Stack Summary

| Concern | Recommended | Alternative |
|---------|-------------|-------------|
| Runtime | Python 3.12+ | PyPy |
| Framework | FastAPI | Django REST Framework, Flask |
| Validation | Pydantic v2 | marshmallow |
| ORM | SQLAlchemy 2.0 | Django ORM, Tortoise |
| Migration | Alembic | Django migrations |
| Testing | pytest + httpx | unittest |
| Queue | Celery + Redis | Dramatiq, RQ |
| Auth | python-jose + passlib | Django auth |
| Logging | structlog | loguru |
| Type checking | mypy or pyright | — |

## Usage

> "Apply the Python / FastAPI overlay to the above design. Use FastAPI with SQLAlchemy and Celery."

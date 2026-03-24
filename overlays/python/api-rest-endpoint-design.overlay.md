---
overlay: "python"
extends: "api-rest-endpoint-design"
version: "1.0.0"
---

# Python Overlay: REST Endpoint Design

> FastAPI and Django REST Framework patterns for REST API endpoint design.

## Extends
- **Base prompt:** `api-rest-endpoint-design` — [Endpoint Design](../../prompts/03-rest-api-design/01-endpoint-design.md)

## Technology-Specific Guidance

### Recommended Libraries & Tools
| Purpose | Library | Version | Notes |
|---------|---------|---------|-------|
| Framework | FastAPI | 0.100+ | Async-first, type-safe |
| Alternative | Django REST Framework | 3.14+ | Full-featured, ORM-integrated |
| Validation | Pydantic v2 | 2.0+ | Built into FastAPI |
| Serialization | Pydantic / DRF Serializers | — | Automatic JSON schema |
| API Docs | Built-in (Swagger + ReDoc) | — | Auto-generated from type hints |
| Versioning | URL prefix (APIRouter) | — | `/api/v1/` prefix per router |
| Database | SQLAlchemy 2.0 / Django ORM | — | Async support in SQLAlchemy 2.0 |

### FastAPI vs. Django REST Framework

| Criteria | FastAPI | Django REST Framework |
|----------|---------|----------------------|
| Performance | ✅ Async/ASGI | ⚠️ Sync by default |
| Type safety | ✅ Pydantic + hints | ⚠️ Serializer-based |
| Auto docs | ✅ Built-in | ⚠️ drf-spectacular |
| ORM | ⚠️ BYO (SQLAlchemy) | ✅ Django ORM |
| Admin panel | ❌ Separate | ✅ Built-in |
| Ecosystem | Growing | ✅ Mature |

### Implementation Patterns

#### FastAPI Router
```python
from fastapi import APIRouter, Depends, HTTPException, Query
from uuid import UUID

router = APIRouter(prefix="/api/v1/products", tags=["products"])

@router.get("/", response_model=PagedResult[ProductOut])
async def list_products(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    service: ProductService = Depends(get_product_service),
):
    return await service.get_all(page=page, page_size=page_size)

@router.get("/{product_id}", response_model=ProductOut)
async def get_product(
    product_id: UUID,
    service: ProductService = Depends(get_product_service),
):
    product = await service.get_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail=f"Product {product_id} not found")
    return product

@router.post("/", response_model=ProductOut, status_code=201)
async def create_product(
    dto: CreateProductIn,
    service: ProductService = Depends(get_product_service),
):
    return await service.create(dto)
```

#### Pydantic Models
```python
from pydantic import BaseModel, Field, ConfigDict
from uuid import UUID
from datetime import datetime

class CreateProductIn(BaseModel):
    name: str = Field(..., max_length=200, examples=["Widget Pro"])
    price: float = Field(..., ge=0, examples=[29.99])
    category_id: UUID

class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    price: float
    category_id: UUID
    created_at: datetime
```

#### Error Response (RFC 7807)
```python
from fastapi import Request
from fastapi.responses import JSONResponse

async def problem_details_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "type": f"https://api.example.com/errors/{exc.status_code}",
            "title": exc.detail if isinstance(exc.detail, str) else "Error",
            "status": exc.status_code,
            "instance": str(request.url),
        },
    )

app.add_exception_handler(HTTPException, problem_details_handler)
```

### Project Structure
```
src/
├── api/
│   ├── v1/
│   │   ├── products/
│   │   │   ├── router.py
│   │   │   ├── schemas.py
│   │   │   └── dependencies.py
│   │   └── orders/
│   └── deps.py              # Shared dependencies
├── core/
│   ├── config.py
│   └── security.py
├── domain/
│   ├── models.py
│   └── services.py
├── infrastructure/
│   ├── database.py
│   └── repositories.py
└── main.py
```

### Common Pitfalls
- **Sync in async:** Never call sync ORM methods inside `async def` endpoints — use `run_in_executor` or async ORM.
- **Pydantic v1 vs. v2:** Pydantic v2 uses `model_config = ConfigDict(...)` instead of inner `Config` class.
- **Dependency injection scope:** FastAPI `Depends()` creates new instances per request unless you use caching.
- **Response model filtering:** Always define separate `In` and `Out` models; never expose internal fields.

---
overlay: "dotnet"
extends: "api-rest-endpoint-design"
version: "1.0.0"
---

# .NET Overlay: REST Endpoint Design

> ASP.NET Core-specific patterns for REST API endpoint design.

## Extends
- **Base prompt:** `api-rest-endpoint-design` — [Endpoint Design](../../prompts/03-rest-api-design/01-endpoint-design.md)

## Technology-Specific Guidance

### Recommended Libraries & Tools
| Purpose | Library | Version | Notes |
|---------|---------|---------|-------|
| Framework | ASP.NET Core | 8.0+ | LTS version |
| Routing | Minimal APIs or Controllers | — | Minimal APIs for simple endpoints |
| Validation | FluentValidation | 11+ | Replaces DataAnnotations for complex rules |
| Serialization | System.Text.Json | Built-in | Prefer over Newtonsoft.Json |
| API Docs | Swashbuckle / Scalar | — | OpenAPI 3.0 generation |
| Versioning | Asp.Versioning.Http | 8+ | URL, header, or query string versioning |
| Mapping | Mapster or AutoMapper | — | Mapster for performance |

### Controller vs. Minimal API Decision

| Criteria | Controllers | Minimal APIs |
|----------|------------|-------------|
| Complex routing | ✅ Better | ❌ Verbose |
| Simple CRUD | ❌ Overhead | ✅ Cleaner |
| Filters/middleware | ✅ Built-in | ⚠️ Manual |
| Team familiarity | ✅ Traditional | ⚠️ Newer approach |
| Testing | ✅ Well-established | ✅ Good with WebApplicationFactory |

### Implementation Patterns

#### Minimal API Example
```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

var products = app.MapGroup("/api/v1/products")
    .WithTags("Products")
    .RequireAuthorization();

products.MapGet("/", async (IProductService svc, [AsParameters] PaginationQuery query) =>
{
    var result = await svc.GetAllAsync(query);
    return Results.Ok(result);
})
.WithName("GetProducts")
.Produces<PagedResult<ProductDto>>(200);

products.MapGet("/{id:guid}", async (Guid id, IProductService svc) =>
{
    var product = await svc.GetByIdAsync(id);
    return product is not null ? Results.Ok(product) : Results.NotFound();
})
.WithName("GetProductById")
.Produces<ProductDto>(200)
.Produces(404);
```

#### Error Response (RFC 7807)
```csharp
builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = ctx =>
    {
        ctx.ProblemDetails.Extensions["traceId"] = ctx.HttpContext.TraceIdentifier;
    };
});
```

### Project Structure
```
src/
├── Api/
│   ├── Endpoints/
│   │   ├── Products/
│   │   │   ├── GetProducts.cs
│   │   │   ├── GetProductById.cs
│   │   │   ├── CreateProduct.cs
│   │   │   └── ProductEndpoints.cs  (MapGroup registration)
│   │   └── Orders/
│   ├── Filters/
│   ├── Middleware/
│   └── Program.cs
├── Application/
│   ├── Products/
│   │   ├── Commands/
│   │   └── Queries/
│   └── Common/
├── Domain/
│   └── Entities/
└── Infrastructure/
    ├── Persistence/
    └── ExternalServices/
```

### Configuration
```json
// appsettings.json
{
  "Api": {
    "Title": "Product API",
    "Version": "v1",
    "RateLimiting": {
      "PermitLimit": 100,
      "WindowSeconds": 60
    }
  }
}
```

### Testing
```csharp
public class ProductEndpointTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ProductEndpointTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetProducts_ReturnsOkWithPagedResult()
    {
        var response = await _client.GetAsync("/api/v1/products?page=1&pageSize=10");
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var result = await response.Content.ReadFromJsonAsync<PagedResult<ProductDto>>();
        result.Should().NotBeNull();
        result!.Items.Should().NotBeEmpty();
    }
}
```

### Common Pitfalls
- **Don't use synchronous I/O** — always use `async/await` in endpoints.
- **Don't return domain entities** — always map to DTOs to avoid leaking internal structure.
- **Don't forget `[AsParameters]`** — use it for complex query objects in minimal APIs.
- **Don't ignore cancellation** — pass `CancellationToken` through to async operations.
- **Don't hardcode connection strings** — use `IConfiguration` and secret managers.

---
overlay: "java"
extends: "api-rest-endpoint-design"
version: "1.0.0"
---

# Java Overlay: REST Endpoint Design

> Spring Boot-specific patterns for REST API endpoint design.

## Extends
- **Base prompt:** `api-rest-endpoint-design` — [Endpoint Design](../../prompts/03-rest-api-design/01-endpoint-design.md)

## Technology-Specific Guidance

### Recommended Libraries & Tools
| Purpose | Library | Version | Notes |
|---------|---------|---------|-------|
| Framework | Spring Boot | 3.2+ | Java 21+, virtual threads |
| Validation | Jakarta Validation (Hibernate Validator) | 3.0+ | Annotation-based |
| Serialization | Jackson | Built-in | `@JsonProperty`, mixins |
| API Docs | springdoc-openapi | 2.x | OpenAPI 3.0 from annotations |
| Versioning | URL prefix (RequestMapping) | — | `/api/v1/` per controller |
| Mapping | MapStruct | 1.5+ | Compile-time code gen, type-safe |
| Database | Spring Data JPA | — | Repository pattern |
| Testing | MockMvc + JUnit 5 | — | Slice testing with `@WebMvcTest` |

### Implementation Patterns

#### REST Controller
```java
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Tag(name = "Products")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    @Operation(summary = "List products with pagination")
    public ResponseEntity<PagedResult<ProductDto>> listProducts(
            @Valid PaginationQuery query) {
        return ResponseEntity.ok(productService.findAll(query));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID")
    public ResponseEntity<ProductDto> getProduct(
            @PathVariable UUID id) {
        return productService.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));
    }

    @PostMapping
    @Operation(summary = "Create a new product")
    public ResponseEntity<ProductDto> createProduct(
            @Valid @RequestBody CreateProductRequest request) {
        ProductDto created = productService.create(request);
        URI location = URI.create("/api/v1/products/" + created.id());
        return ResponseEntity.created(location).body(created);
    }
}
```

#### DTO (Record)
```java
public record CreateProductRequest(
    @NotBlank @Size(max = 200)
    String name,

    @NotNull @DecimalMin("0.00")
    BigDecimal price,

    @NotNull
    UUID categoryId
) {}

public record ProductDto(
    UUID id,
    String name,
    BigDecimal price,
    UUID categoryId,
    Instant createdAt
) {}
```

#### Error Response (RFC 7807)
```java
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleNotFound(ResourceNotFoundException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.NOT_FOUND, ex.getMessage());
        problem.setType(URI.create("https://api.example.com/errors/not-found"));
        problem.setTitle("Resource Not Found");
        return problem;
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers,
            HttpStatusCode status, WebRequest request) {
        ProblemDetail problem = ProblemDetail.forStatus(status);
        problem.setTitle("Validation Failed");
        problem.setProperty("errors", ex.getFieldErrors().stream()
                .map(e -> Map.of("field", e.getField(), "message", e.getDefaultMessage()))
                .toList());
        return ResponseEntity.status(status).body(problem);
    }
}
```

### Project Structure
```
src/main/java/com/example/app/
├── config/
│   ├── SecurityConfig.java
│   ├── OpenApiConfig.java
│   └── WebConfig.java
├── product/                       # Feature-based packaging
│   ├── ProductController.java
│   ├── ProductService.java
│   ├── ProductRepository.java
│   ├── Product.java               # JPA entity
│   ├── ProductDto.java
│   ├── CreateProductRequest.java
│   └── ProductMapper.java         # MapStruct
├── order/
│   └── ...
├── common/
│   ├── exception/
│   │   ├── ResourceNotFoundException.java
│   │   └── GlobalExceptionHandler.java
│   ├── pagination/
│   │   ├── PaginationQuery.java
│   │   └── PagedResult.java
│   └── security/
└── Application.java
```

### Configuration
```yaml
# application.yml
spring:
  jackson:
    default-property-inclusion: non_null
    serialization:
      write-dates-as-timestamps: false
  mvc:
    problemdetails:
      enabled: true

springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui
```

### Testing
```java
@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired MockMvc mockMvc;
    @MockitoBean ProductService productService;

    @Test
    void listProducts_returnsPagedResult() throws Exception {
        when(productService.findAll(any()))
                .thenReturn(PagedResult.of(List.of(testProduct()), 1));

        mockMvc.perform(get("/api/v1/products")
                .param("page", "1")
                .param("pageSize", "20"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items[0].name").value("Widget Pro"));
    }
}
```

### Common Pitfalls
- **Exposing JPA entities:** Always map to DTOs; entity serialization leaks internal structure and causes lazy-loading issues.
- **Field injection:** Use constructor injection (Lombok `@RequiredArgsConstructor`) for testability.
- **Missing `@Transactional` boundaries:** Service layer should own transaction boundaries, not controllers.
- **N+1 queries:** Use `@EntityGraph` or `JOIN FETCH` in repository queries for associations.

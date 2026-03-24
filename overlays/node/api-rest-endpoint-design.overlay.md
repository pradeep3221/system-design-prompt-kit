---
overlay: "node"
extends: "api-rest-endpoint-design"
version: "1.0.0"
---

# Node.js Overlay: REST Endpoint Design

> NestJS and Express-specific patterns for REST API endpoint design.

## Extends
- **Base prompt:** `api-rest-endpoint-design` — [Endpoint Design](../../prompts/03-rest-api-design/01-endpoint-design.md)

## Technology-Specific Guidance

### Recommended Libraries & Tools
| Purpose | Library | Version | Notes |
|---------|---------|---------|-------|
| Framework | NestJS | 10+ | Opinionated, module-based |
| Alternative | Express + TypeScript | 4.x | Minimalist, flexible |
| Validation | class-validator + class-transformer | — | Decorator-based DTO validation |
| Serialization | Built-in (class-transformer) | — | Use `@Exclude()` / `@Expose()` decorators |
| API Docs | @nestjs/swagger | — | OpenAPI 3.0 from decorators |
| Versioning | @nestjs/common (URI/Header) | — | Built-in versioning support |
| Mapping | @automapper/nestjs or manual | — | DTO ↔ Entity mapping |

### NestJS vs. Express Decision

| Criteria | NestJS | Express |
|----------|--------|---------|
| Structure | ✅ Enforced modules | ❌ Manual |
| DI | ✅ Built-in | ⚠️ Manual or awilix |
| Testing | ✅ TestingModule | ⚠️ Manual setup |
| Learning curve | ⚠️ Steeper | ✅ Simple |
| Microservices | ✅ Built-in transports | ❌ Manual |

### Implementation Patterns

#### NestJS Controller
```typescript
@ApiTags('products')
@Controller({ path: 'products', version: '1' })
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'List products with pagination' })
  @ApiOkResponse({ type: PagedResultDto })
  async findAll(@Query() query: PaginationQueryDto): Promise<PagedResultDto<ProductDto>> {
    return this.productService.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: ProductDto })
  @ApiNotFoundResponse({ type: ProblemDetailsDto })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ProductDto> {
    const product = await this.productService.findById(id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  @Post()
  @ApiCreatedResponse({ type: ProductDto })
  async create(@Body() dto: CreateProductDto): Promise<ProductDto> {
    return this.productService.create(dto);
  }
}
```

#### DTO Validation
```typescript
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @ApiProperty({ example: 'Widget Pro' })
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @ApiProperty({ example: 29.99 })
  price: number;

  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  categoryId: string;
}
```

#### Error Response (RFC 7807)
```typescript
// Global exception filter
@Catch()
export class ProblemDetailsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      type: `https://api.example.com/errors/${status}`,
      title: HttpStatus[status],
      status,
      detail: exception instanceof HttpException ? exception.message : 'Internal server error',
      instance: ctx.getRequest().url,
    });
  }
}
```

### Project Structure
```
src/
├── modules/
│   ├── products/
│   │   ├── products.module.ts
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── product.dto.ts
│   │   └── entities/
│   │       └── product.entity.ts
│   └── orders/
├── common/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── config/
│   └── configuration.ts
├── app.module.ts
└── main.ts
```

### Common Pitfalls
- **Circular dependencies:** Use `forwardRef()` sparingly; redesign modules instead.
- **Validation pipe scope:** Register `ValidationPipe` globally in `main.ts`, not per-controller.
- **Response serialization:** Use `ClassSerializerInterceptor` to respect `@Exclude()` decorators.
- **Async validators:** `class-validator` async validators need `validateOrReject` — the pipe handles this.

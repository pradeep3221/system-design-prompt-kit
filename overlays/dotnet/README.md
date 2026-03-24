# .NET / ASP.NET Core Overlay

Technology overlay for .NET and ASP.NET Core applications.

## Overlay Files

| Overlay | Extends Base Prompt | Description |
|---------|-------------------|-------------|
| [REST API Design](api-rest-endpoint-design.overlay.md) | `api-rest-endpoint-design` | ASP.NET Core controller patterns, minimal APIs |
| [Clean Architecture](arch-clean-hexagonal.overlay.md) | `arch-clean-hexagonal-architecture` | .NET Clean Architecture with MediatR |
| [Worker Service](bg-worker-service-design.overlay.md) | `bg-worker-service-design` | IHostedService, BackgroundService patterns |
| [Testing](testing-unit.overlay.md) | `testing-unit` | xUnit, NSubstitute, FluentAssertions |

## Stack Summary

| Concern | Recommended | Alternative |
|---------|-------------|-------------|
| Framework | ASP.NET Core 8+ | — |
| ORM | Entity Framework Core | Dapper |
| Validation | FluentValidation | DataAnnotations |
| Mediator | MediatR | — |
| Testing | xUnit + NSubstitute | MSTest + Moq |
| Logging | Serilog + Seq | NLog |
| Auth | ASP.NET Identity + JWT | Duende IdentityServer |
| Background | IHostedService | Hangfire, Quartz.NET |
| API Docs | Swagger / Scalar | NSwag |

## Usage

After running any overlay-compatible base prompt, apply this overlay:

> "Apply the .NET / ASP.NET Core overlay to the above design. Use ASP.NET Core 8 with Entity Framework Core and MediatR."

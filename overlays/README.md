# Technology Overlays

Technology-specific extensions that augment base prompts with framework, language, or platform-specific guidance.

## How Overlays Work

Base prompts provide technology-agnostic guidance. When a prompt has `overlay-compatible: true` in its frontmatter, you can layer a technology overlay on top for platform-specific implementation details.

**Usage:** After running a base prompt with your AI assistant, follow up with:

> "Apply the {{technology}} overlay to the above design."

## Available Overlays

| Overlay | Folder | Covers |
|---------|--------|--------|
| [.NET / ASP.NET Core](dotnet/) | `overlays/dotnet/` | C#, ASP.NET Core, Entity Framework, Azure |
| [Python / FastAPI](python/) | `overlays/python/` | Python, FastAPI, Django, SQLAlchemy |
| [Node.js / NestJS](node/) | `overlays/node/` | TypeScript, NestJS, Express, Prisma |
| [React / Next.js](react/) | `overlays/react/` | React, Next.js, TanStack, Zustand |
| [Angular](angular/) | `overlays/angular/` | Angular, RxJS, NgRx, Angular Material |
| [Vue / Nuxt](vue/) | `overlays/vue/` | Vue 3, Nuxt 3, Pinia, VueQuery |
| [Java / Spring Boot](java/) | `overlays/java/` | Java, Spring Boot, Spring Cloud, JPA |

## Creating a Custom Overlay

1. Create a folder under `overlays/` with the technology name
2. Add a `README.md` listing the overlay files
3. Create overlay files matching base prompt IDs: `{base-prompt-id}.overlay.md`
4. Each overlay should specify which base prompt it extends

See [Overlay Template](overlay-template.md) for the standard format.

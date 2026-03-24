# Node.js / NestJS Overlay

Technology overlay for Node.js, TypeScript, NestJS, and Express applications.

## Overlay Files

| Overlay | Extends Base Prompt | Description |
|---------|-------------------|-------------|
| REST API Design | `api-rest-endpoint-design` | NestJS controllers, Express routers |
| Worker Service | `bg-worker-service-design` | BullMQ, Agenda.js patterns |
| Testing | `testing-unit` | Jest, Vitest, Supertest patterns |

## Stack Summary

| Concern | Recommended | Alternative |
|---------|-------------|-------------|
| Runtime | Node.js 20 LTS | Bun |
| Framework | NestJS | Express, Fastify |
| Language | TypeScript 5+ | — |
| ORM | Prisma | TypeORM, Drizzle |
| Validation | class-validator + class-transformer | Zod |
| Testing | Jest or Vitest | — |
| Queue | BullMQ | Agenda.js |
| Auth | Passport.js + JWT | — |
| Logging | Pino | Winston |

## Usage

> "Apply the Node.js / NestJS overlay to the above design. Use NestJS with Prisma and BullMQ."

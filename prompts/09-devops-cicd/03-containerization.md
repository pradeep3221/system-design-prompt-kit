# Containerization Strategy

> Dockerize applications following security and performance best practices.

## Category
`devops-cicd`

## Complexity
`intermediate`

## Prompt

```text
You are a container specialist. Create a production-ready containerization strategy for {{APP_NAME}}.

**Application:** {{LANGUAGE}} / {{FRAMEWORK}}
**Deployment target:** {{DEPLOYMENT_TARGET}}

**Provide:**

### 1. Dockerfile (Multi-stage Build)
- Build stage: Compile, install dependencies, run tests
- Production stage: Minimal runtime image
- Base image selection (distroless, alpine, slim — with rationale)
- Non-root user
- Layer optimization (order instructions by change frequency)
- `.dockerignore` file

### 2. Security Hardening
- Run as non-root user
- Read-only file system where possible
- No secrets in image layers
- Minimal base image (reduce attack surface)
- Health check instruction
- Drop all capabilities, add only needed ones
- Scan with Trivy/Grype before pushing

### 3. Performance Optimization
- Multi-stage build to minimize image size
- Layer caching strategy
- Dependency caching (mount cache)
- `.dockerignore` to exclude unnecessary files
- Target image size: < 100MB for compiled languages, < 300MB for interpreted

### 4. Docker Compose (Development)
Complete `docker-compose.yml` for local development:
- Application service
- Database service
- Cache service
- Message broker (if needed)
- Volume mounts for hot-reload
- Health checks

### 5. Kubernetes Manifests (Production)
- Deployment with resource requests/limits
- Service definition
- ConfigMap and Secret references
- Liveness and readiness probes
- HPA (Horizontal Pod Autoscaler) configuration
- Pod disruption budget
- Network policy

### 6. Image Tagging Strategy
- `latest` only for development
- Production: `v1.2.3`, `v1.2.3-abc1234` (semver + commit SHA)
- Immutable tags in production

**Provide:** Complete Dockerfile, docker-compose.yml, and Kubernetes manifests.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{APP_NAME}}` | Application name | `Order API Service` |
| `{{LANGUAGE}}` | Language | `Node.js`, `Go`, `Python`, `Java`, `C#` |
| `{{FRAMEWORK}}` | Framework | `NestJS`, `Gin`, `FastAPI`, `Spring Boot`, `ASP.NET` |
| `{{DEPLOYMENT_TARGET}}` | Where it runs | `Kubernetes`, `ECS Fargate`, `Cloud Run` |

## Tips & Variations

- For multi-service: "Generate a docker-compose.yml for the entire microservices stack."
- Add: "Include a Skaffold or Tilt configuration for local Kubernetes development."

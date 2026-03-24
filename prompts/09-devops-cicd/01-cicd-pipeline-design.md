---
id: "devops-cicd-pipeline"
version: "1.0.0"
category: "devops-cicd"
complexity: "intermediate"
tags: ["cicd", "pipeline", "github-actions", "deployment"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# CI/CD Pipeline Design

> Design comprehensive build, test, and deployment pipelines.

## Metadata
- **Category:** `devops-cicd`
- **Complexity:** `intermediate`

## Prompt

```text
You are a DevOps engineer. Design a CI/CD pipeline for {{PROJECT_NAME}}.

**Context:**
- Repository: {{REPO_TYPE}} (monorepo / polyrepo)
- Language/Framework: {{TECH_STACK}}
- CI/CD platform: {{CICD_PLATFORM}}
- Deployment target: {{DEPLOYMENT_TARGET}}
- Branch strategy: {{BRANCH_STRATEGY}}

**Design the following pipeline stages:**

### 1. Build Stage
- Dependency installation (with caching)
- Code compilation / transpilation
- Asset building (if applicable)
- Build artifact generation
- Build metadata (version, commit SHA, timestamp)

### 2. Quality Gates
- Linting and formatting checks
- Static analysis (SonarQube, CodeQL)
- Unit tests with coverage reporting
- Coverage threshold enforcement (e.g., > 80%)
- License compliance check

### 3. Security Scanning
- Dependency vulnerability scanning (Snyk, Dependabot, npm audit)
- SAST (Static Application Security Testing)
- Secret detection (git-secrets, detect-secrets)
- Container image scanning (Trivy, Grype)

### 4. Integration Testing
- Spin up test dependencies (database, cache, message broker)
- Run integration test suite
- API contract testing
- Performance/load test (for release branches)

### 5. Artifact Publishing
- Container image build and push to registry
- Versioning strategy (semantic versioning, git SHA)
- Artifact signing

### 6. Deployment Stages
| Environment | Trigger | Approval | Strategy |
|------------|---------|----------|---------|
| Dev | PR merge to develop | Auto | Rolling update |
| Staging | Merge to main | Auto | Blue/Green |
| Production | Tag / Release | Manual approval | Canary / Blue-Green |

### 7. Post-Deployment
- Smoke tests against deployed environment
- Health check verification
- Rollback trigger conditions
- Notification (Slack, Teams, email)
- Deployment tracking (change log update)

### 8. Pipeline Optimization
- Parallel job execution
- Caching strategies (dependencies, Docker layers)
- Conditional stage execution (skip if no changes)
- Pipeline-as-code definition

**Provide:** Complete pipeline configuration file for {{CICD_PLATFORM}}.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name | `Order Service` |
| `{{REPO_TYPE}}` | Repository type | `monorepo`, `polyrepo` |
| `{{TECH_STACK}}` | Stack | `Node.js + TypeScript + NestJS` |
| `{{CICD_PLATFORM}}` | CI/CD tool | `GitHub Actions`, `Azure DevOps`, `GitLab CI` |
| `{{DEPLOYMENT_TARGET}}` | Where to deploy | `AWS ECS`, `Azure AKS`, `GCP Cloud Run` |
| `{{BRANCH_STRATEGY}}` | Git branching | `GitFlow`, `trunk-based`, `GitHub Flow` |

## Tips & Variations

- For monorepo: "Add affected-project detection for selective builds."
- Add: "Include release automation with semantic-release."

# Workflows

Predefined sequences of prompts for common engineering workflows. Each workflow composes prompts from the library into a step-by-step process.

## Available Workflows

| Workflow | Description | Steps | Estimated Duration |
|----------|-------------|-------|--------------------|
| [API Development](api-development.md) | End-to-end REST API from design to deployment | 8 | 2-4 hours |
| [System Design](system-design.md) | Full system design from requirements to capacity planning | 7 | 3-6 hours |
| [Greenfield Project](greenfield-project.md) | Start a new project from scratch with all foundations | 10 | 4-8 hours |
| [Code Review](code-review.md) | Comprehensive code review from PR to architecture | 5 | 1-2 hours |
| [Security Audit](security-audit.md) | Security-focused review and hardening | 6 | 2-4 hours |

## How to Use Workflows

1. Choose a workflow that matches your task
2. Execute prompts in order, feeding outputs as context to subsequent steps
3. Use the **gate** criteria to decide whether to proceed or iterate
4. Skip optional steps based on your project's needs

## Workflow Legend

- **Step:** Sequential prompt execution
- **Gate:** Quality checkpoint — must pass before proceeding
- **Optional:** Can be skipped for simpler projects
- **Parallel:** Steps that can be done simultaneously

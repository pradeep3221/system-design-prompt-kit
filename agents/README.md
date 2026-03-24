# Agent Integration

> Configuration files and instructions for using this prompt library with AI coding agents.

## Supported Agents

| Agent | Directory | Configuration Format |
|-------|-----------|---------------------|
| GitHub Copilot | `agents/copilot/` | `.instructions.md`, `SKILL.md` |
| Cursor | `agents/cursor/` | `.mdc` rule files |
| MCP Servers | `agents/mcp/` | JSON tool definitions |

## How It Works

AI agents can use this library in two ways:

### 1. Workspace Instructions
Configure your agent to be aware of the prompt library so it follows the patterns automatically.

### 2. Explicit Prompt Invocation
Reference a specific prompt ID when asking the agent to perform a task:

```
Use the `api-rest-endpoint-design` prompt to design endpoints for a user management API.
```

## Setup

### GitHub Copilot
Copy `.github/copilot-instructions.md` (already in this repo) to your project. It references prompt categories and patterns automatically.

For Copilot Skills, see `agents/copilot/SKILL.md` for skill definitions that map to prompt categories.

### Cursor
Copy rule files from `agents/cursor/` into your project's `.cursor/rules/` directory:
```
.cursor/rules/
  coding-standards.mdc
  api-design.mdc
  security.mdc
```

### MCP Servers
Use the tool definitions in `agents/mcp/` with any MCP-compatible agent. Each tool maps to a prompt or workflow.

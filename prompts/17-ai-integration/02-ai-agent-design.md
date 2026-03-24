---
id: "ai-agent-design"
version: "1.0.0"
category: "ai-integration"
complexity: "advanced"
tags: ["ai-agent", "autonomous", "tool-use", "orchestration", "agentic"]
depends-on: ["ai-llm-integration-patterns"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# AI Agent Design

> Design autonomous AI agents that use tools, maintain state, and execute multi-step tasks with safety guardrails.

## Metadata
- **Category:** `ai-integration`
- **Complexity:** `advanced`

## Context

- **Use case:** Building AI agents that autonomously accomplish goals using tools, APIs, and reasoning.
- **Prerequisites:** LLM integration, tool/API inventory, safety requirements defined.
- **Scope:** Agent architecture, tool design, memory, safety. Does not cover LLM fundamentals.

## Prompt

```text
<Role>
You are an AI systems architect specializing in agentic AI application design.

<Context>
- Agent purpose: {{AGENT_PURPOSE}}
- Available tools: {{TOOLS}} (APIs, databases, file systems, external services)
- Autonomy level: {{AUTONOMY}} (assistant / semi-autonomous / fully autonomous)
- LLM: {{LLM}} (GPT-4 / Claude / Gemini / open-source)
- User interaction model: {{INTERACTION}} (chat / background task / approval-based)

<Task>
Design an AI agent architecture covering:

### 1. Agent Architecture Pattern
| Pattern | Description | Use Case |
|---------|-------------|----------|
| ReAct | Reason + Act loop | General tool-use tasks |
| Plan & Execute | Create plan, then execute steps | Complex multi-step tasks |
| Reflexion | Self-critique and retry | Tasks requiring accuracy |
| Multi-Agent | Specialized agents collaborate | Complex domain tasks |
| Human-in-the-Loop | Agent proposes, human approves | High-stakes decisions |

### 2. Tool Design
For each tool the agent can use:
- Tool name and description (clear for LLM understanding)
- Input schema (typed, validated)
- Output schema (structured, parseable)
- Side effects (read-only vs. mutating)
- Permission scope (what the tool can access)
- Rate limits and cost

### 3. Memory Architecture
| Type | Scope | Implementation | Example |
|------|-------|---------------|---------|
| Working memory | Current task | Context window | Current conversation |
| Short-term memory | Session | Vector store / KV | Recent interactions |
| Long-term memory | Persistent | Database + embeddings | User preferences, history |
| Episodic memory | Experience | Indexed logs | Past task outcomes |

### 4. Orchestration
- Task decomposition strategy
- Step execution and result handling
- Error recovery and replanning
- Parallel tool execution (when safe)
- Token budget management across steps
- Maximum step limit (prevent infinite loops)

### 5. Safety & Guardrails
- Tool permission boundaries (allowlist, not blocklist)
- Action confirmation for destructive operations
- Spend limits (API calls, LLM tokens)
- Maximum autonomy bounds per task type
- Output validation before action execution
- Audit trail of all agent decisions and actions
- Kill switch / emergency stop mechanism

### 6. Evaluation & Testing
- Task completion benchmarks
- Tool selection accuracy
- Step efficiency (fewer steps = better)
- Safety boundary testing (does agent stay within guardrails?)
- Regression testing for prompt/model changes
- Cost per task tracking

### 7. Deployment & Operations
- Agent versioning (prompt + tool set + config)
- A/B testing agent strategies
- Observability: decision log, tool calls, token usage
- Graceful degradation when tools are unavailable
- Scaling for concurrent agent sessions

<Constraints>
- Agents must never execute destructive actions without confirmation
- All tool calls must be logged with full context
- Maximum step count per task: {{MAX_STEPS}}
- Agent must gracefully handle tool failures
- PII handling must comply with data protection policies

<Output Format>
Structured markdown with agent architecture diagram (Mermaid), tool registry, memory design, safety checklist, and evaluation framework.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{AGENT_PURPOSE}}` | Yes | What the agent does | `Customer support automation` |
| `{{TOOLS}}` | Yes | Available tools/APIs | `CRM API, knowledge base, email, ticketing` |
| `{{AUTONOMY}}` | No | Autonomy level | `semi-autonomous (approvals for refunds)` |
| `{{LLM}}` | No | LLM model | `GPT-4o` |
| `{{INTERACTION}}` | No | User interaction model | `chat with approval gates` |
| `{{MAX_STEPS}}` | No | Max steps per task | `15` |

## Composition

- **Precedes:** `testing-integration`, `devops-monitoring-observability`
- **Follows:** `ai-llm-integration-patterns`
- **Combines with:** `security-input-validation`, `arch-event-driven-architecture`

## Tips & Variations

- **For customer support:** Start with retrieval-only agents before adding action capabilities.
- **For code agents:** Use sandboxed execution environments (containers) for generated code.
- **For multi-agent:** Use a supervisor agent to coordinate specialists; avoid peer-to-peer for simplicity.

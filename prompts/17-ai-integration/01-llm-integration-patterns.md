---
id: "ai-llm-integration-patterns"
version: "1.0.0"
category: "ai-integration"
complexity: "intermediate"
tags: ["llm", "openai", "rag", "prompt-engineering", "ai", "genai"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# LLM Integration Patterns

> Design patterns for integrating Large Language Models into production applications with reliability, cost control, and safety guardrails.

## Metadata
- **Category:** `ai-integration`
- **Complexity:** `intermediate`

## Context

- **Use case:** Adding LLM-powered features (chat, summarization, generation, classification) to applications.
- **Prerequisites:** Use case identified, LLM provider selected, expected usage volume estimated.
- **Scope:** Architecture patterns, prompt management, safety, cost. Does not cover model training or fine-tuning.

## Prompt

```text
<Role>
You are an AI engineer specializing in LLM integration patterns for production applications.

<Context>
- Application: {{APP_NAME}}
- LLM use cases: {{USE_CASES}} (chat, summarization, code generation, classification, extraction)
- LLM provider: {{PROVIDER}} (OpenAI / Azure OpenAI / Anthropic / Google / self-hosted)
- Expected volume: {{VOLUME}} requests/day
- Latency requirement: {{LATENCY}} (real-time / near-real-time / batch)

<Task>
Design an LLM integration architecture covering:

### 1. Architecture Patterns
| Pattern | Use Case | Complexity | Latency |
|---------|----------|-----------|---------|
| Direct API call | Simple completion | Low | Low |
| RAG (Retrieval-Augmented Generation) | Knowledge-grounded Q&A | Medium | Medium |
| Chain / Pipeline | Multi-step reasoning | Medium | Higher |
| Agent with tools | Autonomous task execution | High | Variable |
| Streaming | Real-time chat UX | Low | Progressive |
| Batch processing | Bulk classification/extraction | Low | High (acceptable) |

### 2. Prompt Management
- Prompt template versioning and storage
- Variable interpolation and context injection
- System / user / assistant role design
- Few-shot example management
- Prompt testing and evaluation framework
- A/B testing different prompts

### 3. RAG Architecture (if applicable)
- Document ingestion pipeline (chunking, embedding, indexing)
- Vector store selection (Pinecone, Weaviate, pgvector, Azure AI Search)
- Retrieval strategy (similarity search, hybrid, re-ranking)
- Context window management (token budgeting)
- Citation and source attribution
- Freshness and update strategy

### 4. Safety & Guardrails
- Input validation (prompt injection prevention)
- Output validation (harmful content filtering)
- PII detection and redaction
- Hallucination mitigation (grounding, citations)
- Content moderation layer
- Rate limiting per user / tenant
- Human-in-the-loop for high-stakes decisions

### 5. Reliability & Performance
- Retry strategy with exponential backoff
- Fallback models (GPT-4 → GPT-3.5 → cached response)
- Response caching for deterministic queries
- Timeout configuration per use case
- Circuit breaker for LLM provider outages
- Streaming for long-generation UX

### 6. Cost Management
- Token usage tracking per feature / user / tenant
- Model selection optimization (use cheapest sufficient model)
- Prompt compression techniques
- Caching identical/similar queries
- Budget alerts and hard limits
- Cost attribution to business units

### 7. Observability
- Request/response logging (sanitized — no PII)
- Latency tracking (TTFT, total generation time)
- Token usage metrics
- Quality evaluation (automated scoring, user feedback)
- Error rate and category tracking
- A/B test result dashboards

<Constraints>
- Never send PII to external LLM providers without encryption/redaction
- All prompts must be stored as templates, not hardcoded
- Implement prompt injection defenses at input layer
- Cost must be tracked and budgeted per feature
- Responses must be validated before displaying to users

<Output Format>
Structured markdown with architecture diagram (Mermaid), prompt template examples, RAG pipeline diagram, guardrail configuration, and cost model.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{APP_NAME}}` | Yes | Application name | `SupportBot` |
| `{{USE_CASES}}` | Yes | LLM use cases | `customer Q&A with RAG, ticket summarization` |
| `{{PROVIDER}}` | No | LLM provider | `Azure OpenAI` |
| `{{VOLUME}}` | No | Expected daily volume | `50,000 requests/day` |
| `{{LATENCY}}` | No | Latency requirement | `< 3s for chat, batch for summarization` |

## Composition

- **Precedes:** `ai-agent-design`, `testing-integration`
- **Follows:** `system-high-level-design`, `security-input-validation`
- **Combines with:** `perf-caching-strategy`, `security-owasp-top-10`

## Tips & Variations

- **For RAG:** Start with naive chunking + cosine similarity; add re-ranking and hybrid search as needed.
- **For cost:** Cache responses for FAQ-like queries; use smaller models for classification tasks.
- **For safety:** Use a layered approach: input filter → system prompt → output filter → human review for edge cases.

---
id: "arch-serverless"
version: "1.0.0"
category: "architecture-patterns"
complexity: "advanced"
tags: ["serverless", "faas", "lambda", "cloud-functions", "event-driven"]
depends-on: ["arch-event-driven"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Serverless Architecture

> Design event-driven serverless systems with function composition, cold-start mitigation, and cost optimization.

## Metadata
- **Category:** `architecture-patterns`
- **Complexity:** `advanced`

## Context

Use this prompt when designing a new serverless application or migrating workloads to a function-as-a-service model.

- **Use case:** Event processing pipelines, API backends with variable traffic, cost-optimized batch jobs.
- **Prerequisites:** Cloud provider selection, event sources identified, latency requirements.
- **Scope:** Function decomposition, event routing, state management, observability, cost modeling.

## Prompt

```text
You are a Cloud Architect specializing in serverless systems. Design a serverless architecture for the system described below.

**Project:** {{PROJECT_NAME}}
**Cloud Provider:** {{CLOUD_PROVIDER}} (AWS / Azure / GCP)
**Workload Type:** {{WORKLOAD_TYPE}} (e.g., API, event processing, scheduled jobs)
**Traffic Pattern:** {{TRAFFIC_PATTERN}} (e.g., spiky, steady, batch)

Produce a serverless architecture that covers:

1. **Function Decomposition**
   - Single-purpose functions aligned to business operations
   - Function granularity: one function per API route vs. router function trade-offs
   - Shared layers / extensions for common code

2. **Event Routing & Orchestration**
   - Event sources (API Gateway, queues, streams, schedules, storage events)
   - Choreography (event-driven) vs. orchestration (Step Functions / Durable Functions)
   - Dead-letter queues and retry policies

3. **State Management**
   - Functions are stateless; externalize state to databases, caches, or object storage
   - Session/context passing via event payloads or external stores
   - Idempotency keys for exactly-once semantics

4. **Cold Start Mitigation**
   - Provisioned concurrency / pre-warming strategies
   - Runtime selection for fast startup (Node.js, Python vs. JVM, .NET)
   - Bundle size optimization

5. **Security**
   - Least-privilege IAM roles per function
   - API Gateway authorization (JWT, API keys, IAM)
   - Secrets management (Parameter Store, Key Vault)
   - VPC considerations (when needed vs. not)

6. **Observability**
   - Structured logging with correlation IDs
   - Distributed tracing across function chains
   - Custom metrics (invocation count, duration, errors, throttles)

7. **Cost Optimization**
   - Memory/CPU tuning per function
   - Reserved vs. on-demand concurrency
   - Cost projection for expected traffic patterns

**Constraints:**
- Function timeout must be under the provider limit (15 min AWS Lambda, 10 min Azure Functions)
- Payload size limits must be respected (6 MB sync, 256 KB async for AWS)
- No long-running connections — use queues or webhooks for long operations
- All functions must be idempotent

**Output Format:**
- Architecture diagram (Mermaid)
- Function catalog with trigger, runtime, memory, timeout
- Event flow diagram
- Cost estimate table
- Cold-start mitigation plan
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Yes | Project name | `Image Processing Pipeline` |
| `{{CLOUD_PROVIDER}}` | Yes | Cloud platform | `AWS` |
| `{{WORKLOAD_TYPE}}` | Yes | Type of workload | `Event-driven image processing` |
| `{{TRAFFIC_PATTERN}}` | Yes | Expected traffic shape | `Spiky — 0-500 req/s based on upload bursts` |

## Example Output

```
Function Catalog:
┌────────────────────┬──────────────┬─────────┬────────┬─────────┐
│ Function           │ Trigger      │ Runtime │ Memory │ Timeout │
├────────────────────┼──────────────┼─────────┼────────┼─────────┤
│ api-upload         │ API Gateway  │ Node 20 │ 256 MB │ 30s     │
│ process-image      │ SQS Queue    │ Python  │ 1 GB   │ 5 min   │
│ generate-thumbnail │ SQS Queue    │ Python  │ 512 MB │ 2 min   │
│ store-metadata     │ SNS Topic    │ Node 20 │ 128 MB │ 10s     │
│ notify-complete    │ EventBridge  │ Node 20 │ 128 MB │ 10s     │
└────────────────────┴──────────────┴─────────┴────────┴─────────┘

Cost Estimate (1M images/month):
  Lambda invocations: $2.40
  Lambda compute:     $18.50
  SQS messages:       $0.80
  S3 storage:         $23.00
  API Gateway:        $3.50
  Total:              ~$48.20/month
```

## Composition

- **Precedes:** `devops-infrastructure-as-code`, `devops-monitoring-observability`
- **Follows:** `system-high-level-design`, `arch-event-driven`
- **Combines with:** `system-capacity-planning`, `system-trade-off-analysis`
- **Overlay:** `overlays/{tech}/serverless.overlay.md`

## Tips & Variations

- For API-centric: "Use a single router function per domain to reduce cold starts and simplify routing."
- For hybrid: "Combine serverless functions for spiky workloads with containers for steady-state services."
- For testing: "Use LocalStack or emulator SDKs to test function chains locally."

---
id: "perf-performance-profiling"
version: "1.0.0"
category: "performance-engineering"
complexity: "intermediate"
tags: ["profiling", "optimization", "bottleneck", "apm", "flame-graph"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Performance Profiling

> Systematically identify and resolve performance bottlenecks in applications using profiling tools, metrics analysis, and optimization techniques.

## Metadata
- **Category:** `performance-engineering`
- **Complexity:** `intermediate`

## Context

- **Use case:** Diagnosing slow endpoints, high CPU/memory usage, or degraded user experience.
- **Prerequisites:** Observable system with metrics/APM, reproducible performance issue.
- **Scope:** Profiling methodology, tool selection, analysis, optimization. Does not cover load test design.

## Prompt

```text
<Role>
You are a performance engineer specializing in application profiling and optimization.

<Context>
- Application: {{APP_NAME}}
- Language/Runtime: {{RUNTIME}} (Node.js / .NET / Java / Python / Go)
- Symptom: {{SYMPTOM}} (slow endpoint, high CPU, memory leak, high GC pause, etc.)
- Environment: {{ENVIRONMENT}} (production / staging / local)
- APM tool: {{APM}} (Datadog / New Relic / Application Insights / Jaeger / none)

<Task>
Guide a systematic performance profiling investigation covering:

### 1. Symptom Classification
| Symptom | Likely Cause | First Tool |
|---------|-------------|-----------|
| Slow response time | I/O wait, N+1 queries, serialization | APM trace + DB profiler |
| High CPU | Hot loop, regex, JSON parsing, crypto | CPU profiler (flame graph) |
| Memory growth | Leak, large cache, event listener buildup | Heap snapshot / memory profiler |
| High GC pause | Object churn, large heap, finalization | GC log analysis |
| Thread starvation | Blocking I/O on async path, lock contention | Thread dump / async profiler |

### 2. Profiling Methodology
1. **Baseline** — Establish current metrics (latency, CPU, memory, throughput)
2. **Reproduce** — Create consistent reproduction (load test or specific request)
3. **Instrument** — Attach profiler with minimal overhead
4. **Collect** — Gather profiles (30s-2min for CPU, snapshots for memory)
5. **Analyze** — Identify hot paths, allocations, wait times
6. **Hypothesize** — Form theory about root cause
7. **Optimize** — Apply targeted fix
8. **Validate** — Re-test and compare with baseline

### 3. Tool Selection
| Runtime | CPU Profiler | Memory Profiler | APM |
|---------|-------------|----------------|-----|
| Node.js | clinic.js, 0x, --prof | heapdump, clinic heap | Datadog, New Relic |
| .NET | dotTrace, PerfView, dotnet-counters | dotMemory, dotnet-dump | Application Insights |
| Java | async-profiler, JFR, VisualVM | Eclipse MAT, JFR | Datadog, Elastic APM |
| Python | py-spy, cProfile, yappi | tracemalloc, objgraph | Datadog, New Relic |
| Go | pprof (cpu, heap, goroutine) | pprof heap | Datadog, Jaeger |

### 4. Common Optimization Patterns
- **N+1 queries:** Batch loading / eager loading / DataLoader pattern
- **Serialization overhead:** Use streaming serialization, avoid unnecessary fields
- **Memory leaks:** Clear event listeners, use WeakRef, scope caches
- **Lock contention:** Reduce critical section, use lock-free structures
- **GC pressure:** Object pooling, reduce allocations in hot paths
- **I/O wait:** Async I/O, connection pooling, caching

### 5. Production Profiling Safety
- Overhead budgets (< 5% CPU impact)
- Sampling vs. instrumentation trade-offs
- Continuous profiling setup (always-on, low-overhead)
- PII considerations in profiles (stack traces, parameters)

### 6. Documentation & Communication
- Performance investigation report template
- Before/after comparison format
- Flame graph annotation guide
- Linking profile data to business impact

<Constraints>
- Production profiling must have < 5% overhead
- Always establish baseline before optimization
- Measure after each change (one change at a time)
- Document root cause and fix for future reference

<Output Format>
Structured markdown with profiling playbook, tool configuration examples, optimization patterns, and investigation report template.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{APP_NAME}}` | Yes | Application name | `OrderService` |
| `{{RUNTIME}}` | Yes | Language and runtime | `Node.js 20` |
| `{{SYMPTOM}}` | Yes | Performance symptom | `p99 latency 3s on GET /orders` |
| `{{ENVIRONMENT}}` | No | Where profiling happens | `staging` |
| `{{APM}}` | No | APM tool in use | `Datadog` |

## Example Output

```markdown
## Profiling Investigation: OrderService — Slow GET /orders

### Baseline
| Metric | Current | Target |
|--------|---------|--------|
| p50 latency | 800ms | < 200ms |
| p99 latency | 3.2s | < 500ms |
| CPU (avg) | 45% | < 30% |

### Root Cause: N+1 Query Pattern
- APM trace shows 47 SQL queries per request
- Each order loads related items individually
- Total DB time: 2.8s of 3.2s p99

### Fix: Batch Loading
- Replace individual item queries with JOIN + batch load
- After fix: 2 SQL queries per request, DB time: 40ms
- p99 latency: 180ms (94% improvement)
```

## Composition

- **Precedes:** `perf-caching-strategy`, `db-query-optimization`
- **Follows:** `perf-load-testing-strategy`, `devops-monitoring-observability`
- **Combines with:** `coding-code-refactoring`, `db-indexing-strategy`
- **Overlay:** `overlays/dotnet/`, `overlays/node/`, `overlays/python/`, `overlays/java/`

## Tips & Variations

- **For production:** Use continuous profiling tools (Pyroscope, Datadog Continuous Profiler) for always-on coverage.
- **For frontend:** Use Chrome DevTools Performance panel, Lighthouse, and Web Vitals.
- **For databases:** Profile queries separately with EXPLAIN ANALYZE before profiling application code.

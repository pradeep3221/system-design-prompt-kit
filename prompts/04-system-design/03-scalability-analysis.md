# Scalability Analysis

> Identify bottlenecks and design strategies to scale a system horizontally and vertically.

## Category
`system-design`

## Complexity
`advanced`

## Prompt

```text
You are a scalability engineer. Perform a thorough scalability analysis of the {{SYSTEM_NAME}} system.

**Current state:**
- Architecture: {{ARCHITECTURE_DESCRIPTION}}
- Current load: {{CURRENT_LOAD}}
- Target load: {{TARGET_LOAD}}
- Current pain points: {{PAIN_POINTS}}

**Analyze and recommend:**

### 1. Bottleneck Identification
For each layer (compute, database, network, storage):
- Identify the theoretical throughput limit.
- Identify the current bottleneck.
- Measure or estimate headroom before failure.

### 2. Horizontal Scaling Strategy
- Stateless service design (session externalization)
- Load balancing algorithm selection (round-robin, least connections, consistent hashing)
- Auto-scaling policies (CPU, memory, queue depth, custom metrics)
- Data partitioning / sharding strategy
- Read replica configuration

### 3. Vertical Scaling Opportunities
- Instance sizing optimization
- Connection pool tuning
- JVM/runtime tuning (if applicable)
- Query optimization opportunities

### 4. Caching Strategy
| Cache Layer | Technology | TTL | Invalidation | Hit Rate Target |
|-------------|-----------|-----|-------------|----------------|
| CDN | | | | |
| API Gateway | | | | |
| Application | | | | |
| Database | | | | |

- Cache-aside vs. read-through vs. write-through patterns
- Cache stampede prevention
- Distributed cache consistency

### 5. Asynchronous Processing
- Identify synchronous operations that can be made async.
- Queue/topic design for deferred processing.
- Back-pressure handling.
- Dead letter queue strategy.

### 6. Database Scaling
- Read/write splitting
- Sharding key selection and strategy
- Connection pooling optimization
- Query performance benchmarks
- Denormalization trade-offs

### 7. Performance Targets

| Metric | Current | Target | Strategy |
|--------|---------|--------|----------|
| p50 latency | | | |
| p99 latency | | | |
| Throughput (RPS) | | | |
| Error rate | | | |
| Availability | | | |

### 8. Cost Analysis
Estimate infrastructure cost at current and target scale.
Recommend cost-optimization strategies.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SYSTEM_NAME}}` | System to analyze | `Payment Processing Platform` |
| `{{ARCHITECTURE_DESCRIPTION}}` | Current architecture summary | `Monolith on 4 EC2 instances + RDS PostgreSQL` |
| `{{CURRENT_LOAD}}` | Current traffic | `1,000 RPS, 500K daily users` |
| `{{TARGET_LOAD}}` | Scale target | `10x: 10,000 RPS, 5M daily users` |
| `{{PAIN_POINTS}}` | Known issues | `DB connection exhaustion during peak hours` |

## Tips & Variations

- For cost-sensitive projects: "Optimize for cost-per-request at target scale."
- Add: "Include a phased scaling roadmap (3-month, 6-month, 12-month)."

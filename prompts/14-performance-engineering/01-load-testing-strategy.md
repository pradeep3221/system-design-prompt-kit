---
id: "perf-load-testing-strategy"
version: "1.0.0"
category: "performance-engineering"
complexity: "intermediate"
tags: ["load-testing", "performance", "stress-test", "k6", "jmeter", "benchmarking"]
depends-on: ["system-capacity-planning"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Load Testing Strategy

> Design a comprehensive load testing strategy covering test types, tooling, scenarios, success criteria, and integration with CI/CD.

## Metadata
- **Category:** `performance-engineering`
- **Complexity:** `intermediate`

## Context

- **Use case:** Validating system performance under expected and peak loads before release.
- **Prerequisites:** Deployed system (staging), defined SLOs, capacity estimates.
- **Scope:** Load test plan, scripts, execution, analysis. Does not cover performance tuning (see Performance Profiling).

## Prompt

```text
<Role>
You are a performance engineer specializing in load testing and capacity validation for distributed systems.

<Context>
- System: {{SYSTEM_NAME}}
- Architecture: {{ARCHITECTURE}} (monolith / microservices / serverless)
- Critical endpoints: {{ENDPOINTS}} (list top 5-10 by traffic)
- Expected load: {{EXPECTED_LOAD}} (requests/sec normal, peak)
- SLOs: {{SLOS}} (p99 latency, error rate, availability)
- Tool preference: {{TOOL}} (k6 / JMeter / Gatling / Locust / Artillery)

<Task>
Design a load testing strategy covering:

### 1. Test Types
| Type | Purpose | Duration | Load Profile |
|------|---------|----------|-------------|
| Smoke | Verify scripts work | 1-2 min | 1-5 VUs |
| Load | Validate SLOs under normal load | 10-30 min | Ramp to expected load |
| Stress | Find breaking point | 15-30 min | Ramp beyond expected |
| Spike | Test sudden traffic burst | 5-10 min | Instant 10x spike |
| Soak/Endurance | Find memory leaks, resource exhaustion | 2-8 hours | Sustained normal load |
| Breakpoint | Find maximum capacity | 20-40 min | Step-up until failure |

### 2. Scenario Design
For each critical endpoint:
- User flow / transaction definition
- Think time and pacing
- Data parameterization (user IDs, search terms)
- Session management (auth tokens)
- Realistic traffic mix (% distribution across endpoints)

### 3. Test Environment
- Environment parity with production (% scale)
- Data seeding requirements
- External dependency handling (mocks vs. real)
- Network simulation (latency, bandwidth)
- Isolation strategy (no impact on other testing)

### 4. Success Criteria
| Metric | Target | Measurement |
|--------|--------|-------------|
| p50 response time | < {{P50_TARGET}} | Per endpoint |
| p99 response time | < {{P99_TARGET}} | Per endpoint |
| Error rate | < {{ERROR_TARGET}} | Overall |
| Throughput | ≥ {{THROUGHPUT_TARGET}} | req/sec sustained |
| CPU utilization | < 70% at normal load | Per service |
| Memory | No growth trend over soak | Per service |

### 5. Script Structure
- Modular script organization
- Shared utilities (auth, data generation)
- Configuration externalization (thresholds, VU count)
- Custom metrics and tags

### 6. CI/CD Integration
- Automated load tests as pipeline gate
- Threshold-based pass/fail criteria
- Performance trend tracking across builds
- Automated report generation

### 7. Analysis & Reporting
- Key charts: response time distribution, throughput over time, error rate, resource utilization
- Bottleneck identification methodology
- Comparison with baseline results
- Actionable recommendations format

<Constraints>
- Tests must be repeatable and version-controlled
- Test data must not pollute production databases
- External services must be mocked or rate-limited in test env
- Results must be stored for trend analysis

<Output Format>
Structured markdown with test plan table, k6/JMeter script examples, CI/CD integration config, and dashboard design.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{SYSTEM_NAME}}` | Yes | System under test | `E-Commerce API` |
| `{{ARCHITECTURE}}` | No | System architecture | `microservices` |
| `{{ENDPOINTS}}` | Yes | Critical endpoints | `GET /products, POST /orders, GET /search` |
| `{{EXPECTED_LOAD}}` | Yes | Traffic expectations | `500 rps normal, 2000 rps peak` |
| `{{SLOS}}` | Yes | Performance SLOs | `p99 < 500ms, error < 0.1%` |
| `{{TOOL}}` | No | Load testing tool | `k6` |

## Example Output

```markdown
## Load Test Plan: E-Commerce API

### Traffic Mix
| Endpoint | Method | % Traffic | Think Time |
|----------|--------|-----------|-----------|
| /products | GET | 40% | 3s |
| /products/:id | GET | 25% | 5s |
| /search | GET | 20% | 2s |
| /cart | POST | 10% | 10s |
| /orders | POST | 5% | 15s |

### k6 Threshold Configuration
```javascript
export const options = {
  thresholds: {
    http_req_duration: ['p(99)<500', 'p(50)<200'],
    http_req_failed: ['rate<0.001'],
    http_reqs: ['rate>500'],
  },
  scenarios: {
    load_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 100 },
        { duration: '10m', target: 100 },
        { duration: '2m', target: 0 },
      ],
    },
  },
};
```
```

## Composition

- **Precedes:** `perf-performance-profiling`, `perf-caching-strategy`
- **Follows:** `system-capacity-planning`, `api-rest-endpoint-design`
- **Combines with:** `devops-monitoring-observability`, `devops-cicd-pipeline`

## Tips & Variations

- **For k6:** Use k6 Cloud for distributed load generation and built-in dashboards.
- **For CI/CD:** Run smoke tests on every PR, full load tests on release branches.
- **For microservices:** Test individual services + end-to-end user flows.

# Capacity Planning

> Estimate compute, storage, bandwidth, and infrastructure needs from requirements.

## Category
`system-design`

## Complexity
`advanced`

## Prompt

```text
You are a capacity planning engineer. Perform back-of-the-envelope calculations and detailed capacity planning for {{SYSTEM_NAME}}.

**System parameters:**
- Daily active users (DAU): {{DAU}}
- Read:Write ratio: {{READ_WRITE_RATIO}}
- Average request payload size: {{PAYLOAD_SIZE}}
- Data retention period: {{RETENTION}}
- Growth rate: {{GROWTH_RATE}} per year

**Calculate the following:**

### 1. Traffic Estimates
- Requests per second (average and peak)
- Read QPS and Write QPS
- Peak-to-average ratio (typically 2-5x)
- Seasonal or event-driven spikes

### 2. Storage Estimates
- Per-record storage size (with overhead)
- Daily data generation
- Monthly and yearly growth
- Storage after {{RETENTION}} retention
- Storage type allocation (hot / warm / cold / archive)

### 3. Bandwidth Estimates
- Ingress bandwidth (writes)
- Egress bandwidth (reads)
- Internal bandwidth (service-to-service)
- CDN offload percentage

### 4. Compute Estimates
- CPU requirements per request type
- Memory requirements (working set, caches, buffers)
- Instance sizing and count
- Container resource requests/limits

### 5. Database Sizing
- Connection pool sizing: `connections = (num_instances × threads_per_instance)`
- IOPS requirements (read/write)
- Storage I/O throughput
- Recommended instance class (with cloud provider specifics)

### 6. Cache Sizing
- Cache hit rate target
- Working set size
- Memory required: `size = items × avg_item_size / hit_rate`
- Eviction policy recommendation

### 7. Message Queue Sizing
- Messages per second
- Average message size
- Consumer throughput requirements
- Retention period and storage

### 8. Cost Estimate Summary

| Resource | Specification | Monthly Cost |
|----------|-------------|-------------|
| Compute | | $ |
| Database | | $ |
| Cache | | $ |
| Storage | | $ |
| Bandwidth | | $ |
| Message Queue | | $ |
| Monitoring | | $ |
| **Total** | | **$** |

### 9. Scaling Thresholds
Define when to scale each resource (metrics and thresholds).

**Show all calculations with formulas.**
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SYSTEM_NAME}}` | System to plan for | `Social Media Feed Service` |
| `{{DAU}}` | Daily active users | `5 million` |
| `{{READ_WRITE_RATIO}}` | Read vs write ratio | `100:1` |
| `{{PAYLOAD_SIZE}}` | Average request size | `2 KB` |
| `{{RETENTION}}` | How long data is kept | `5 years` |
| `{{GROWTH_RATE}}` | Annual growth | `2x` |

## Tips & Variations

- For interview prep: "Format as a 5-minute back-of-envelope estimation."
- Add: "Include a Terraform/IaC snippet for provisioning the estimated infrastructure."

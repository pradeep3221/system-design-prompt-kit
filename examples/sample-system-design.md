# Sample System Design: URL Shortener Service

> This is a worked example using prompts from `prompts/04-system-design/`.

---

## Context

We are designing a URL shortener (like bit.ly) that handles 100M+ shortened URLs and 10K reads/second. This example demonstrates output from applying the system design prompts.

---

## 1. High-Level Design (from 01-high-level-design.md)

### Requirements

**Functional**
- Shorten a long URL → returns a short URL
- Redirect short URL → original long URL
- Optional: custom aliases, expiration, click analytics

**Non-Functional**
- Read-heavy: 100:1 read-to-write ratio
- Low latency redirects: < 50ms p99
- High availability: 99.99%
- Shortened URLs must be unique and non-guessable

### Architecture Diagram

```
                    ┌──────────────┐
   Users ──────────►│  CDN / Edge  │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │   API Gateway │
                    │  (Rate Limit) │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼──┐  ┌──────▼──┐  ┌─────▼────┐
       │  Write  │  │  Read   │  │ Analytics │
       │ Service │  │ Service │  │  Service  │
       └────┬────┘  └────┬────┘  └─────┬─────┘
            │             │             │
       ┌────▼─────────────▼────┐  ┌─────▼─────┐
       │     Redis Cache       │  │  Kafka /   │
       └──────────┬────────────┘  │  Kinesis   │
                  │               └─────┬──────┘
            ┌─────▼──────┐        ┌─────▼──────┐
            │  Database   │        │  Analytics │
            │ (PostgreSQL)│        │    DB      │
            └─────────────┘        └────────────┘
```

### Component Responsibilities

| Component | Responsibility |
|-----------|---------------|
| API Gateway | Routing, rate limiting, authentication |
| Write Service | URL shortening, alias generation, validation |
| Read Service | URL lookup, redirect (301/302) |
| Analytics Service | Click tracking, geographic stats |
| Redis Cache | Hot URL caching for fast redirects |
| PostgreSQL | Persistent storage of URL mappings |
| Kafka | Async event streaming for analytics |

---

## 2. Low-Level Design (from 02-low-level-design.md)

### URL Shortening Algorithm

**Approach**: Base62 encoding of a distributed unique ID

```
1. Generate unique ID via Snowflake ID or database sequence
2. Encode ID to Base62 (a-z, A-Z, 0-9)
3. Result: 7-character short code (62^7 = 3.5 trillion combinations)

Example: ID 12345678 → Base62 → "dnh6F"
```

### Database Schema

```sql
CREATE TABLE urls (
    id            BIGINT PRIMARY KEY,
    short_code    VARCHAR(10) UNIQUE NOT NULL,
    original_url  TEXT NOT NULL,
    user_id       BIGINT,
    created_at    TIMESTAMP DEFAULT NOW(),
    expires_at    TIMESTAMP,
    click_count   BIGINT DEFAULT 0,
    is_active     BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_short_code ON urls (short_code);
CREATE INDEX idx_user_id ON urls (user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_expires_at ON urls (expires_at) WHERE expires_at IS NOT NULL;
```

### Read Path (Redirect Flow)

```
1. User visits https://short.url/dnh6F
2. Read Service checks Redis cache for key "dnh6F"
3. Cache HIT → return original URL, respond 301
4. Cache MISS → query PostgreSQL by short_code
5. Store result in Redis (TTL: 24 hours)
6. Respond 301 with Location header
7. Async: publish click event to Kafka
```

### Write Path (Shorten Flow)

```
1. POST /api/v1/shorten { "url": "https://example.com/very-long-path" }
2. Validate URL format and reachability
3. Check for duplicate (same URL by same user → return existing)
4. Generate unique ID → Base62 encode → short_code
5. Insert into PostgreSQL
6. Warm Redis cache with new entry
7. Return { "short_url": "https://short.url/dnh6F" }
```

---

## 3. Scalability Analysis (from 03-scalability-analysis.md)

### Traffic Estimates

| Metric | Value |
|--------|-------|
| URLs shortened/day | 1M |
| Redirects/day | 100M |
| Redirects/second (avg) | ~1,150 |
| Redirects/second (peak) | ~10,000 |
| Storage/year | ~50 GB (URLs + metadata) |

### Scaling Strategy

| Component | Strategy |
|-----------|----------|
| Read Service | Horizontal scaling (stateless), 10+ pods |
| Write Service | 2-3 pods (lower traffic) |
| Redis Cache | Cluster mode, 3 shards, 95%+ hit rate |
| PostgreSQL | Primary-replica setup, read replicas for Read Service |
| Kafka | 6 partitions, 3-day retention |

### Cache Strategy

- **Cache-aside pattern** for reads
- **Write-through** on URL creation
- **TTL**: 24 hours for regular URLs, no TTL for top-1000 hot URLs
- **Eviction**: LRU when memory threshold reached
- **Expected hit rate**: 95%+ (power-law distribution of URL access)

---

## 4. Trade-Off Analysis (from 04-trade-off-analysis.md)

### Decision: 301 vs 302 Redirects

| Factor | 301 (Permanent) | 302 (Temporary) |
|--------|-----------------|-----------------|
| Caching | Browser caches → fewer server hits | No browser cache → every click hits server |
| Analytics | Undercounts (cached redirects skipped) | Accurate click tracking |
| SEO | Passes link equity to destination | Does not pass link equity |
| **Verdict** | Better for performance | **Chosen** — analytics accuracy is critical |

### Decision: SQL vs NoSQL for URL Storage

| Factor | PostgreSQL | DynamoDB |
|--------|-----------|----------|
| Query flexibility | Rich queries, joins | Key-value lookups only |
| Scaling | Vertical + read replicas | Automatic horizontal |
| Cost at scale | Lower for moderate scale | Lower at massive scale |
| Operational complexity | Moderate | Low (managed) |
| **Verdict** | **Chosen** — sufficient for 100M URLs, richer query support | Better if scaling to 10B+ URLs |

---

## 5. Capacity Planning (from 05-capacity-planning.md)

### Storage Projection (3 years)

```
Per URL record: ~500 bytes (URL + metadata + indexes)
Year 1: 365M URLs × 500B = ~180 GB
Year 2: 730M URLs × 500B = ~360 GB
Year 3: 1.1B URLs × 500B = ~540 GB
```

### Infrastructure Cost Estimate (Year 1)

| Component | Specification | Monthly Cost (est.) |
|-----------|--------------|-------------------|
| Read Service | 10 × c5.large (K8s) | $600 |
| Write Service | 3 × c5.large (K8s) | $180 |
| PostgreSQL | db.r5.2xlarge (RDS, multi-AZ) | $1,200 |
| Redis | cache.r5.xlarge (3-node cluster) | $900 |
| Kafka (MSK) | 3 brokers, kafka.m5.large | $700 |
| Load Balancer + CDN | ALB + CloudFront | $400 |
| **Total** | | **~$3,980/month** |

---

## Summary

This example demonstrated how the five system design prompts work together to produce a comprehensive design — from high-level architecture through capacity planning — for a real-world distributed system.

# System Design Document Template

> Copy this template to create a design document for a new system or major feature.

---

# Design Document: [System/Feature Name]

| Field | Value |
|-------|-------|
| **Author(s)** | [Names] |
| **Status** | Draft / In Review / Approved |
| **Created** | YYYY-MM-DD |
| **Last Updated** | YYYY-MM-DD |
| **Reviewers** | [Names] |

---

## 1. Overview

### 1.1 Problem Statement
[What problem are we solving?]

### 1.2 Goals
- [Goal 1]
- [Goal 2]

### 1.3 Non-Goals
- [Explicitly out of scope]

### 1.4 Success Metrics
| Metric | Target |
|--------|--------|
| [Metric 1] | [Target] |

---

## 2. Background

[Context, current state, and prior art. What do readers need to understand?]

---

## 3. High-Level Design

### 3.1 Architecture Diagram
[Include or describe the system architecture.]

### 3.2 Components
| Component | Responsibility | Technology |
|-----------|---------------|-----------|
| [Component 1] | [What it does] | [Tech] |

### 3.3 Data Flow
[Describe how data moves through the system.]

---

## 4. Detailed Design

### 4.1 API Design
[Endpoint definitions, request/response formats.]

### 4.2 Data Model
[Schema, relationships, storage decisions.]

### 4.3 Key Algorithms / Logic
[Non-trivial business logic explained.]

### 4.4 Error Handling
[How errors are detected, reported, and recovered from.]

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Latency targets: [p50, p99]
- Throughput targets: [RPS]

### 5.2 Scalability
[How the system scales to meet demand.]

### 5.3 Availability
- Target: [99.X%]
- Failover strategy

### 5.4 Security
[Authentication, authorization, data protection.]

### 5.5 Observability
[Logging, metrics, tracing, alerting.]

---

## 6. Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| [Option 1] | ... | ... | Chosen / Rejected |
| [Option 2] | ... | ... | Chosen / Rejected |

---

## 7. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| [Risk] | H/M/L | H/M/L | [Plan] |

---

## 8. Implementation Plan

| Phase | Scope | Duration | Owner |
|-------|-------|---------|-------|
| Phase 1 | [Scope] | [Time] | [Who] |

---

## 9. Open Questions

- [ ] [Question 1]
- [ ] [Question 2]

---

## 10. Appendix

- Diagrams
- Benchmarks
- References

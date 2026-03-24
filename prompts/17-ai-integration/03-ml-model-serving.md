---
id: "ai-ml-model-serving"
version: "1.0.0"
category: "ai-integration"
complexity: "advanced"
tags: ["ml-ops", "model-serving", "inference", "deployment", "ml-pipeline"]
depends-on: ["system-high-level-design"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# ML Model Serving

> Design a production ML model serving architecture covering inference APIs, model versioning, A/B testing, and monitoring.

## Metadata
- **Category:** `ai-integration`
- **Complexity:** `advanced`

## Context

- **Use case:** Deploying trained ML models as production inference services.
- **Prerequisites:** Trained model artifact, performance benchmarks, serving infrastructure.
- **Scope:** Serving architecture, deployment, monitoring, versioning. Does not cover model training or feature engineering.

## Prompt

```text
<Role>
You are an MLOps engineer designing production model serving infrastructure.

<Context>
- Model type: {{MODEL_TYPE}} (classification, recommendation, NLP, vision, ranking)
- Inference pattern: {{PATTERN}} (real-time / batch / streaming)
- Latency requirement: {{LATENCY}} (e.g., < 50ms, < 200ms, < 1s)
- Throughput: {{THROUGHPUT}} (requests/sec)
- Infrastructure: {{INFRA}} (Kubernetes / SageMaker / Vertex AI / custom)
- Model size: {{MODEL_SIZE}}

<Task>
Design a model serving architecture covering:

### 1. Serving Architecture
| Pattern | Latency | Throughput | Use Case |
|---------|---------|-----------|----------|
| REST API | Medium | Medium | General purpose |
| gRPC | Low | High | Service-to-service |
| Batch inference | High (OK) | Very high | Offline scoring |
| Streaming | Low | High | Real-time events |
| Edge inference | Very low | Per-device | Mobile / IoT |

### 2. Model Deployment Pipeline
1. Model training completes → artifact stored in model registry
2. Automated validation (accuracy, latency, bias checks)
3. Shadow deployment (live traffic, results not served)
4. Canary deployment (5% → 25% → 50% → 100%)
5. Full rollout with monitoring
6. Rollback capability (instant switch to previous version)

### 3. Model Versioning
- Model registry (MLflow, SageMaker Registry, Vertex Model Registry)
- Version naming: `{model-name}/v{major}.{minor}`
- Model metadata: training data version, hyperparameters, metrics
- A/B testing framework (traffic split by model version)
- Champion/challenger evaluation

### 4. Feature Serving
- Online feature store (Feast, Tecton, SageMaker Feature Store)
- Feature computation: pre-computed vs. real-time
- Feature freshness requirements
- Feature consistency (training vs. serving)

### 5. Performance Optimization
- Model optimization (quantization, pruning, distillation)
- Batching inference requests
- GPU/CPU resource allocation
- Autoscaling based on queue depth / latency
- Model caching (warm model instances)
- Request deduplication

### 6. Monitoring & Observability
| Metric | Description | Alert Threshold |
|--------|-------------|----------------|
| Inference latency | p50, p99 response time | p99 > 2x baseline |
| Throughput | Predictions/sec | Sustained drop > 20% |
| Error rate | Failed inferences | > 1% |
| Model drift | Prediction distribution shift | KL divergence threshold |
| Data drift | Input feature distribution shift | PSI > 0.2 |
| Accuracy | Online evaluation (if labels available) | Drop > 5% from baseline |

### 7. Safety & Governance
- Model approval workflow before production
- Bias detection and fairness metrics
- Explainability (SHAP, LIME) for decision audit
- Model cards (documentation per model)
- A/B test statistical significance validation

<Constraints>
- Model rollback must be possible within 5 minutes
- Inference latency must be monitored and alerted
- All model deployments require automated validation pass
- Feature parity between training and serving must be verified

<Output Format>
Structured markdown with serving architecture diagram (Mermaid), deployment pipeline, monitoring dashboard design, and model registry structure.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{MODEL_TYPE}}` | Yes | Type of ML model | `product recommendation` |
| `{{PATTERN}}` | Yes | Inference pattern | `real-time` |
| `{{LATENCY}}` | Yes | Latency requirement | `< 100ms p99` |
| `{{THROUGHPUT}}` | No | Throughput | `5,000 rps` |
| `{{INFRA}}` | No | Serving infrastructure | `Kubernetes + NVIDIA Triton` |
| `{{MODEL_SIZE}}` | No | Model artifact size | `500MB` |

## Composition

- **Precedes:** `devops-monitoring-observability`, `perf-load-testing-strategy`
- **Follows:** `system-high-level-design`
- **Combines with:** `devops-containerization`, `devops-cicd-pipeline`

## Tips & Variations

- **For real-time:** Use NVIDIA Triton Inference Server or TensorFlow Serving for GPU-optimized serving.
- **For simplicity:** Start with a Flask/FastAPI wrapper; move to dedicated serving infrastructure as scale demands.
- **For LLMs:** Use vLLM or TGI for efficient LLM serving with batched inference and KV-cache optimization.

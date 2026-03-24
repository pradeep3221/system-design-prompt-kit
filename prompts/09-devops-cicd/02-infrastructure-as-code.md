---
id: "devops-infrastructure-as-code"
version: "1.0.0"
category: "devops-cicd"
complexity: "advanced"
tags: ["iac", "terraform", "bicep", "cloudformation", "infrastructure"]
depends-on: []
tools: ["copilot", "cursor", "cli"]
overlay-compatible: true
---

# Infrastructure as Code

> Design and implement infrastructure using Terraform, Bicep, or CloudFormation.

## Metadata
- **Category:** `devops-cicd`
- **Complexity:** `advanced`

## Prompt

```text
You are an infrastructure engineer. Design and implement IaC for {{PROJECT_NAME}}.

**Cloud provider:** {{CLOUD_PROVIDER}}
**IaC tool:** {{IAC_TOOL}}
**Architecture:** {{ARCHITECTURE_DESCRIPTION}}

**Implement the following:**

### 1. Network Layer
- VPC / Virtual Network with CIDR planning
- Public and private subnets (multi-AZ)
- NAT Gateway / NAT Instance
- Security groups / NSGs with least-privilege rules
- Network peering (if multi-VPC)

### 2. Compute Layer
- Container orchestration (ECS/EKS/AKS) or serverless
- Auto-scaling configuration
- Instance/pod sizing
- Health checks and readiness probes

### 3. Data Layer
- Database provisioning (RDS/Azure SQL/Cloud SQL)
- Multi-AZ / read replicas
- Backup and restore configuration
- Cache cluster (ElastiCache/Redis)
- Object storage (S3/Blob/GCS)

### 4. Networking & Load Balancing
- Application load balancer
- SSL/TLS certificate management
- DNS configuration (Route53/Azure DNS)
- CDN distribution

### 5. Security
- IAM roles and policies (least privilege)
- Secrets management integration (Secrets Manager/Key Vault)
- Encryption at rest and in transit
- WAF rules

### 6. Monitoring
- CloudWatch/Azure Monitor/Cloud Monitoring
- Log aggregation
- Alerting rules
- Dashboard definitions

### 7. IaC Best Practices
- Module/component structure
- Remote state management (S3 + DynamoDB lock / Azure Storage)
- Environment parameterization (dev/staging/prod)
- Tagging strategy
- Cost allocation tags
- Drift detection

### 8. Folder Structure
```
infrastructure/
├── modules/
│   ├── networking/
│   ├── compute/
│   ├── database/
│   └── monitoring/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
├── main.tf / main.bicep
├── variables.tf / parameters
└── outputs.tf
```

**Provide:** Complete IaC code with modules for each layer.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name | `E-Commerce Platform` |
| `{{CLOUD_PROVIDER}}` | Cloud | `AWS`, `Azure`, `GCP` |
| `{{IAC_TOOL}}` | IaC tool | `Terraform`, `Bicep`, `CDK`, `Pulumi` |
| `{{ARCHITECTURE_DESCRIPTION}}` | What to deploy | `3-tier web app: ALB → ECS Fargate → RDS PostgreSQL + ElastiCache` |

## Tips & Variations

- Add: "Include a cost estimate using Infracost."
- Add: "Generate a compliance check using Checkov/tfsec."

# Domain Extensions

> Industry-specific extensions that layer additional requirements, constraints, and patterns on top of the base prompt library.

## How Domains Work

Domain extensions don't replace base prompts — they **augment** them with industry-specific requirements. When working in a regulated or specialized industry, apply the relevant domain overlay alongside the base prompt.

### Usage Example

```markdown
Apply the `api-rest-endpoint-design` prompt for designing a patient records API,
with the `healthcare` domain overlay for HIPAA compliance requirements.
```

## Available Domains

| Domain | Directory | Key Regulations |
|--------|-----------|-----------------|
| Template | `_template/` | Starting point for new domains |
| Financial Services | `financial-services/` | PCI-DSS, SOX, PSD2 |
| Healthcare | `healthcare/` | HIPAA, HL7/FHIR, HITRUST |

## Creating a New Domain

1. Copy `_template/` to a new directory
2. Fill in the domain-specific requirements
3. Map requirements to base prompt categories
4. Add compliance checklists

# Organization Standards

> Company-specific standards that extend the base prompt library with organizational conventions, approved technologies, and internal policies.

## How Org Standards Work

Organization standards layer **company-specific rules** on top of the base prompts. They define things like approved technology stacks, internal naming conventions, required review processes, and corporate security policies.

### Usage Example

```markdown
Apply the `api-rest-endpoint-design` prompt using our org standards
from `org-standards/example-corp/` for the approved tech stack and naming conventions.
```

## Available Organizations

| Organization | Directory | Description |
|--------------|-----------|-------------|
| Template | `_template/` | Starting point for new org standards |
| Example Corp | `example-corp/` | Example organizational standards |

## Creating Org Standards

1. Copy `_template/` to a new directory named after your organization
2. Fill in your approved technology stacks
3. Document naming conventions and coding standards
4. Define review and approval processes
5. Add any internal security requirements beyond the base library

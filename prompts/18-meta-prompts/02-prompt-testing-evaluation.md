---
id: "meta-prompt-testing-evaluation"
version: "1.0.0"
category: "meta-prompts"
complexity: "intermediate"
tags: ["meta", "testing", "evaluation", "quality", "prompt-qa"]
depends-on: ["meta-prompt-writing-guide"]
tools: ["copilot", "cursor", "cli"]
overlay-compatible: false
---

# Prompt Testing & Evaluation

> Define a framework for testing prompt quality, evaluating output consistency, and validating prompt effectiveness across models.

## Metadata
- **Category:** `meta-prompts`
- **Complexity:** `intermediate`

## Context

- **Use case:** Validating that prompts produce high-quality, consistent results.
- **Prerequisites:** A prompt to evaluate, access to at least one LLM.
- **Scope:** Evaluation criteria, testing methodology, scoring. Does not cover prompt authoring.

## Prompt

```text
<Role>
You are a prompt QA engineer evaluating prompt effectiveness and output quality.

<Context>
- Prompt to evaluate: {{PROMPT_ID}} — {{PROMPT_TITLE}}
- Test models: {{MODELS}} (GPT-4, Claude 3.5, Gemini, etc.)
- Test scenarios: {{SCENARIOS}} (number of variable combinations to test)

<Task>
Evaluate the prompt using this framework:

### 1. Structural Validation
| Check | Pass/Fail | Notes |
|-------|-----------|-------|
| YAML frontmatter present and valid | | |
| Role is specific and expert-level | | |
| All hardcoded values extracted to variables | | |
| Variables table is complete | | |
| Task has numbered sections | | |
| Constraints are measurable | | |
| Output format is specified | | |
| Example output is realistic | | |
| Composition section has links | | |
| Tips have at least 2 entries | | |

### 2. Content Quality Evaluation
Rate each dimension 1-5:

| Dimension | Score | Description |
|-----------|-------|-------------|
| Specificity | /5 | Does the prompt give specific, actionable instructions? |
| Completeness | /5 | Does it cover the topic comprehensively? |
| Clarity | /5 | Is every instruction unambiguous? |
| Practicality | /5 | Would the output be usable in a real project? |
| Consistency | /5 | Consistent quality across different variable values? |

### 3. Output Testing
For each test scenario:
1. Fill in variables with realistic values
2. Run prompt with target model(s)
3. Evaluate output against criteria:
   - Does the output follow the specified format?
   - Does it address all numbered sections?
   - Are tables and diagrams present as requested?
   - Is the content technically accurate?
   - Would a senior engineer find this useful?

### 4. Cross-Model Consistency
- Run identical prompt with same variables on 2+ models
- Compare output structure compliance
- Compare content depth and accuracy
- Note model-specific strengths/weaknesses
- Identify prompt adjustments for better cross-model results

### 5. Edge Case Testing
- Test with minimal variables (only required fields)
- Test with unusual/extreme variable values
- Test with conflicting variables
- Test with very specific niche scenarios
- Verify graceful handling of under-specified inputs

### 6. Scoring & Recommendations
**Overall Score:** Structural (max 10) + Content Quality (max 25) + Output Testing (max 15) = /50

| Range | Rating | Action |
|-------|--------|--------|
| 40-50 | Excellent | Publish as-is |
| 30-39 | Good | Minor revisions |
| 20-29 | Needs Work | Significant revision required |
| < 20 | Poor | Rewrite from scratch |

### 7. Improvement Suggestions
For each issue found:
- **Issue:** What's wrong
- **Impact:** How it affects output quality
- **Fix:** Specific change to the prompt
- **Before/After:** Show the diff

<Constraints>
- Test with at least 3 different variable combinations
- Test on at least 2 different LLM models
- All evaluations must include specific examples, not just ratings
- Recommendations must include actionable prompt edits

<Output Format>
Structured evaluation report in Markdown with scoring tables, output samples, and improvement recommendations.
```

## Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `{{PROMPT_ID}}` | Yes | ID of prompt to evaluate | `api-rest-endpoint-design` |
| `{{PROMPT_TITLE}}` | Yes | Title of the prompt | `REST Endpoint Design` |
| `{{MODELS}}` | No | LLMs to test with | `GPT-4o, Claude 3.5 Sonnet` |
| `{{SCENARIOS}}` | No | Number of test scenarios | `5` |

## Composition

- **Precedes:** Prompt revision cycle
- **Follows:** `meta-prompt-writing-guide`
- **Combines with:** All prompts in the library (evaluates any prompt)

## Tips & Variations

- **For automated testing:** Build a script that runs prompts with different variables and collects outputs for batch evaluation.
- **For team evaluation:** Have 2-3 engineers independently score and compare ratings for calibration.
- **For new models:** Re-evaluate all prompts when adopting a new LLM to identify model-specific adjustments.

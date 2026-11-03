---
name: spec-review
description: Review a specification for gaps, vague wording, and missing boundaries, ranked by patient risk.
---

## Steps

1. Read the supplied specification and identify its intended users, workflow, inputs, outputs, and stated business rules.
2. Flag gaps, vague terms, conflicting statements, missing boundaries, and untestable requirements. Do not invent requirements to fill them.
3. Rank each finding by patient risk and explain the plausible patient impact. Separate direct evidence from assumptions.
4. Identify questions the human spec owner must resolve, and cite the relevant section or wording for each finding when available.
5. Never write or change test code.

## Output format

- **Scope reviewed:** specification name or supplied scope.
- **Findings:** numbered list, each with severity/rank, cited wording or location, issue, and patient-risk rationale.
- **Questions for the spec owner:** numbered list; write “None” if there are no open questions.
- **Assumptions:** numbered list; write “None” if none were needed.

## Risk and approval rule

For any proposed change assessed in this review, use the supplied impact and likelihood scores and calculate risk as their product. A score of 15 or more is high risk and requires QA lead and business owner approval; 8 to 14 is medium risk and requires QA lead approval; under 8 is low risk and requires a policy check. Do not imply approval has been granted.

## Safety rule

Never write or change test code.

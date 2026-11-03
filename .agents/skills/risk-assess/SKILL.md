---
name: risk-assess
description: Score a change using impact and likelihood, assign a risk tier, and identify required approvers.
---

## Steps

1. Summarize the proposed change and its scope from the supplied information.
2. Assign impact and likelihood scores using the provided scoring scale. If no scale or enough evidence is provided, ask for the missing inputs or mark the assessment provisional; do not silently invent a scale.
3. Calculate the total risk score as impact multiplied by likelihood.
4. Assign the tier: high at 15 or more; medium at 8 to 14; low under 8.
5. Name required approvers: high requires QA lead and business owner approval; medium requires QA lead approval; low requires a policy check.
6. List the evidence, assumptions, and uncertainties behind the score. Do not represent an approval as granted unless explicitly confirmed.
7. Never write or change test code.

## Output format

- **Change assessed:**
- **Impact:** score and rationale.
- **Likelihood:** score and rationale.
- **Risk score:** impact × likelihood.
- **Risk tier:** high / medium / low.
- **Required approval:** QA lead and business owner / QA lead / policy check.
- **Evidence and assumptions:**
- **Open questions:**
- **Approval status:** pending / confirmed with supplied evidence / not applicable.

## Safety rule

Never write or change test code.

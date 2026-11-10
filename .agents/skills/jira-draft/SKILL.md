---
name: jira-draft
description: Draft a Jira bug for a suspected product defect with reproducible steps, expected and actual results, and evidence.
---

## Steps

1. Review the supplied suspected defect summary, reproduction details, business rule, and evidence.
2. Draft a concise title that describes the observed behavior without asserting an unverified cause.
3. Write numbered reproduction steps using only supplied facts; mark missing details as questions or placeholders.
4. State expected behavior by referring to the supplied business rule, and state actual behavior from the evidence.
5. Include evidence references, environment/build details, and impact. Do not fabricate logs, attachments, or reproduction results.
6. Assess risk only when impact and likelihood scores are supplied; apply the approval tiers below.
7. Never write or change test code.

## Output format

- **Title:**
- **Description:**
- **Preconditions / environment:**
- **Steps to reproduce:** numbered list.
- **Expected result:**
- **Actual result:**
- **Business rule / BR-ID:**
- **Evidence:** links or artifact names supplied by the requester; “Not provided” if absent.
- **Impact and risk:** scores and tier, or “Not scored.”
- **Approvals:** high (15+) requires QA lead and business owner; medium (8–14) requires QA lead; low (under 8) requires a policy check. State that approval is pending unless explicitly confirmed.
- **Open questions:**

## Safety rule

Never write or change test code. Never alter or recommend weakening a BR-ID assertion. Report a suspected product defect for product investigation.

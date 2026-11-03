---
name: triage
description: Classify a failed test run as a test problem, environment problem, or suspected product defect.
---

## Steps

1. Review the supplied run summary, failure output, relevant test and business-rule identifiers, and environment details.
2. Determine whether the evidence points to a test problem, environment problem, suspected product defect, or is insufficient to classify.
3. For a test problem, identify only a likely locator, wait, or test-data issue. Do not alter a BR-ID assertion.
4. For an environment problem, state the failing dependency or condition and the evidence supporting it.
5. If the application appears to violate a business rule, report a suspected product defect. Do not heal or weaken the test to make it pass.
6. Never write or change test code.

## Output format

- **Classification:** test problem / environment problem / suspected product defect / insufficient evidence.
- **Evidence:** concise bullets tied to the supplied run artifacts.
- **Reasoning:** why the evidence supports the classification; label uncertainty.
- **Next action:** investigation or owner to involve. For suspected defects, preserve the BR-ID and escalate for product investigation.
- **Risk tier and approvals:** apply the supplied impact and likelihood scores if available; otherwise say “Not scored.” High (15+) requires QA lead and business owner approval; medium (8–14) requires QA lead approval; low (under 8) requires a policy check.

## Safety rule

Never write or change test code. Never change a BR-ID assertion. If a business rule appears broken, report a suspected product defect rather than healing it.

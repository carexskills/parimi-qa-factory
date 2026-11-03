# Reusable prompts

## spec-review

Review the specification below for gaps, vague wording, conflicts, and missing boundaries. Rank each finding by patient risk, explain the rationale, cite the relevant wording or location, and list the questions the human spec owner must resolve. Do not invent requirements. If assessing a proposed change, use impact × likelihood and these tiers: 15 or more is high (QA lead and business owner approve), 8 to 14 is medium (QA lead approves), and under 8 is low (policy check). Make clear that required approvals are pending unless confirmed. Never write or change test code.

Specification: <specification>
Proposed change and impact/likelihood scores, if applicable: <change-and-scores>

Use this output format: scope reviewed; findings (rank, cited wording/location, issue, patient-risk rationale); questions for the spec owner; assumptions.

## triage

Triage the failed run below as a test problem, environment problem, suspected product defect, or insufficient evidence. Tie conclusions to the supplied evidence. A test problem may involve locators, waits, or test data; never change a BR-ID assertion. If the application appears to break a business rule, report a suspected product defect and do not heal it. Apply these risk tiers if scores are available: 15 or more is high (QA lead and business owner approve), 8 to 14 is medium (QA lead approves), and under 8 is low (policy check). Never write or change test code.

Run summary and failure output: <run-summary-and-failure>
Test / BR-ID details: <test-and-business-rule-details>
Environment and build: <environment-and-build>
Impact and likelihood scores, if available: <impact-and-likelihood>

Use this output format: classification; evidence; reasoning and uncertainty; next action; risk tier and required approvals or “Not scored.”

## jira-draft

Draft a Jira bug for the suspected product defect below. Use only supplied facts, avoid asserting an unverified cause, and mark missing details as questions or placeholders. Preserve the business rule and do not propose weakening its assertion. If impact and likelihood scores are supplied, calculate the product and apply these tiers: 15 or more is high (QA lead and business owner approve), 8 to 14 is medium (QA lead approves), and under 8 is low (policy check). State that approval is pending unless confirmed. Never write or change test code.

Defect summary: <defect-summary>
Business rule / BR-ID: <business-rule-id-and-rule>
Reproduction details: <reproduction-details>
Expected result: <expected-result>
Actual result: <actual-result>
Evidence references: <evidence>
Environment/build: <environment-and-build>
Impact and likelihood scores, if available: <impact-and-likelihood>

Use this output format: title; description; preconditions/environment; numbered reproduction steps; expected result; actual result; business rule/BR-ID; evidence; impact and risk; approvals; open questions.

## risk-assess

Assess the proposed change using the supplied impact and likelihood scoring scale. Calculate risk as impact × likelihood. Assign high for 15 or more (QA lead and business owner approval), medium for 8 to 14 (QA lead approval), and low for under 8 (policy check). If the scoring scale or evidence is missing, mark the assessment provisional or identify the needed inputs; do not invent a scale. Do not claim approval has been granted unless supplied evidence confirms it. Never write or change test code.

Change and scope: <change-and-scope>
Impact scoring scale and evidence: <impact-scale-and-evidence>
Likelihood scoring scale and evidence: <likelihood-scale-and-evidence>
Known assumptions or constraints: <assumptions-and-constraints>
Approval status/evidence: <approval-status-and-evidence>

Use this output format: change assessed; impact score and rationale; likelihood score and rationale; risk score; risk tier; required approval; evidence and assumptions; open questions; approval status.

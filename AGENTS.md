# Repository agent rules

## Roles

1. The human writes the specs and the business rules. Codex writes the tests, page objects and fixtures.

## Who edits what

2. Nobody types test code by hand.

## Protected assertions

3. An assertion that checks a business rule (a BR-ID) is protected. No agent may change it to make a test pass.

## The healer

4. The healer may fix locators, waits and test data. Never a BR-ID assertion.
5. If the app breaks a business rule, report a suspected product defect. Do not heal it.

## Gate rules

6. Nothing merges unless the gate is green. High-risk changes need a human approval.

## Secrets

7. Never put an API key or a token in a prompt, a file or a log.

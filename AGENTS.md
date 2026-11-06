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

## Spec format

8. Acceptance specs are written in Gherkin, in specs/<module>/*.feature, and every scenario is tagged with its BR-ID.
9. Agent plans, reviews and reports are written in Markdown.

## Commits

10. Agents never commit; humans commit. An agent leaves its changes in the working tree for a human to review.

## Test code standards

11. Every action and every check is a test.step with a plain-English name.
12. A step that checks a business rule starts with its BR-ID, like BR-BOOK-06: reason defaults to General visit.
13. Locators live in page objects only. A test file never contains a locator, and never waits for networkidle or a fixed time.
14. Cleanup lives in a fixture or an afterEach hook, never in the test body.

# My factory rules (plain English)

Write one rule per line. Codex turns them into AGENTS.md.

I write the specs and the business rules. Codex writes the tests, page objects and fixtures.
Nobody types test code by hand.
An assertion that checks a business rule (a BR-ID) is protected. No agent may change it to make a test pass.
The healer may fix locators, waits and test data. Never a BR-ID assertion.
If the app breaks a business rule, report a suspected product defect. Do not heal it.
Nothing merges unless the gate is green. High-risk changes need a human approval.
Never put an API key or a token in a prompt, a file or a log.

Acceptance specs are written in Gherkin, in specs/<module>/*.feature, and every scenario is tagged with its BR-ID.
Agent plans, reviews and reports are written in Markdown.
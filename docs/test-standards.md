# Test code standards (plain English)

Rules every generated test must obey. One rule per line.
Every action and every check is a test.step with a plain-English name.
A step that checks a business rule starts with its BR-ID, like BR-BOOK-06: reason defaults to General visit.
Locators live in page objects only. A test file never contains a locator, and never waits for networkidle or a fixed time.
Cleanup lives in a fixture or an afterEach hook, never in the test body.

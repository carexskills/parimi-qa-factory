# Test data policy

1. Every patient in a test is synthetic. **Reason:** This keeps real patient data out of the repository and test systems.
2. Each test creates its own patient with a unique name. **Reason:** Separate identities prevent runs from sharing patient state.
3. Every environment is reset from a versioned seed pack before a test run. **Reason:** A known starting state makes runs repeatable.
4. Emails in test data end in `@parimipractice.test`. **Reason:** The reserved test domain prevents messages from reaching real people.
5. Logs, reports and screenshots never contain anything that looks like a real ID or a real email. **Reason:** Test artifacts must not expose sensitive identifiers.
6. A real-looking ID in any output is an incident: the run fails and a human reviews it. **Reason:** Failures trigger prompt investigation of possible data exposure.

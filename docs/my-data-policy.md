# Test data policy (plain English)

One rule per line. Every test, fixture and seed pack follows them.
Every patient in a test is synthetic. Never copy real patient data into this repo.
Each test creates its own patient with a unique name, so two runs never share data.
Every environment is reset from a versioned seed pack before a test run.
Emails in test data end in @parimipractice.test.
Logs, reports and screenshots never contain anything that looks like a real ID, like a social security number or a real email.
A real-looking ID in any output is an incident: the run fails and a human reviews it.

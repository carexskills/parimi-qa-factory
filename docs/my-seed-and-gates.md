# Seed test and gates (plain English)

Seed starting state first, then the gates every generated test must pass.
Seed: the test starts as the signed-in Silver patient, on the patient home page.
Seed: it checks what the patient sees, the Home heading, never the URL.
Gate: the type check passes.
Gate: every test file starts with a comment naming its spec and BR-IDs.
Gate: no fixed waits, so no waitForTimeout and no sleep.
Gate: no CSS or XPath locators in tests.

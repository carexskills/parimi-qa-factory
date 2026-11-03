# PP-202 test plan: Patient sign-in with a one-time code

**Ticket:** PP-202  
**Ticket priority:** High  
**Scope:** Patient authentication with password and one-time code, failed-login handling, and sign-in localization.  
**Status:** Proposed scenarios; no authentication was performed during reconnaissance.

## Reconnaissance and constraints

Started at `http://127.0.0.1:8096` without signing in. The app opened at the sign-in page with email and password fields, EN/ES language controls, a sign-in button, fictional demo account options, and a notice that sign-in sends a one-time code to the test inbox. The public page does not expose the post-password code form, inbox contents, or lockout response. Those behaviors must be verified by running the scenarios below with an isolated patient test account and access to the test mailbox.

The detailed acceptance criteria below are from `tickets/PP-202.md`. Do not weaken or alter an assertion that checks an acceptance criterion to make a test pass. A failure of an acceptance criterion is a suspected product defect. Use synthetic test data only; do not place credentials, codes, API keys, or tokens in this plan.

## Shared setup and execution notes

- Begin each scenario from a fresh browser context at the sign-in page, signed out.
- Use an isolated synthetic patient account and its test mailbox where the scenario requires credentials. Obtain values through approved test fixtures or the test inbox at execution time; do not hard-code secrets in test code or logs.
- For comparisons involving an unknown email, use a syntactically valid address that is not associated with an account in the test environment.
- Record visible messages and relevant state transitions without exposing passwords or one-time codes in logs.
- Run scenarios independently and restore/reset the synthetic account when needed. Do not use a shared account if another run could affect its failed-attempt count.
- Priorities: **P1** = core security/authentication behavior; **P2** = important boundary, error, or localization coverage.

## Acceptance-criterion scenarios

### PP-202 AC1 — Correct credentials prompt for a six-digit code — Priority P1

**Scenario:** Patient with valid email and password is prompted for a one-time code.

**Starting state:** Fresh signed-out browser context; active synthetic patient account; mailbox access available.

1. Open the sign-in page.
2. Enter the active patient's correct email and password.
3. Submit the sign-in form.
4. Inspect the next screen and its code-entry control without completing verification.

**Expected:** The password step advances to a one-time-code challenge. The challenge clearly asks for a code and permits entry of a six-digit value (including a value whose first digit is zero). The patient is not admitted to the portal before code verification.

**Pass/fail:** Pass if the six-digit challenge appears and the authenticated portal remains inaccessible before verification. Fail if valid credentials bypass the code, no challenge appears, or the code control cannot represent six digits.

### PP-202 AC2 — Code is delivered and expires after ten minutes — Priority P1

**Scenario:** Verify mailbox delivery and the ten-minute validity window.

**Starting state:** Fresh signed-out browser context; active synthetic patient account with accessible test mailbox; mailbox initially cleared or its current messages recorded.

1. Submit the patient's correct email and password.
2. Open the test inbox and locate the newly delivered one-time code message.
3. Verify the message is addressed to the patient's configured email and corresponds to the current sign-in attempt.
4. Submit the received code before ten minutes have elapsed and confirm successful verification.
5. Start a new sign-in challenge and retain its code securely for the test run.
6. Wait until more than ten minutes have elapsed from issuance, then submit that code.

**Expected:** A code for the current attempt is delivered to the patient's email. A code remains valid within the ten-minute period and is rejected after its ten-minute expiry. The expired-code response allows the user to understand that the code is no longer valid and does not grant access.

**Pass/fail:** Pass if delivery and both sides of the expiry boundary behave as specified. Fail if no email arrives, a code is sent to the wrong mailbox, or an expired code authenticates. Record actual issuance and submission times when evaluating the boundary.

### PP-202 AC3 — Wrong-password error does not disclose account existence — Priority P1

**Scenario:** Compare wrong-password handling for a known and unknown email.

**Starting state:** Fresh signed-out browser context; one active synthetic patient account and a valid but unregistered email address.

1. Submit the active patient's correct email with an incorrect password.
2. Record the visible error text and whether the page state indicates an account or code challenge exists.
3. In a fresh context, submit the unregistered email with an incorrect password.
4. Compare the user-visible error and flow state for both attempts.

**Expected:** Both attempts produce equivalent user-visible failure behavior and do not disclose whether the email belongs to an account. Neither attempt advances to the code challenge.

**Pass/fail:** Pass if the errors and externally visible flow do not distinguish registered from unregistered addresses. Fail if wording, status presentation, or next-step behavior reveals account existence.

### PP-202 AC4 — Fifth wrong attempt locks the account and advises contacting the practice — Priority P1

**Scenario:** Five consecutive invalid-password attempts cause lockout and show contact guidance.

**Starting state:** Fresh/reset synthetic patient account with no failed attempts in the current lockout window; fresh signed-out browser context.

1. Submit the patient's correct email with an incorrect password four times, recording each response.
2. Confirm the first four failures have not admitted the user or displayed an incorrect lockout state.
3. Submit a fifth incorrect password for the same account.
4. Inspect the resulting message and account state.
5. In a separate clean browser context, attempt sign-in using the account's correct password to verify the account remains locked, without attempting code verification.

**Expected:** After five wrong attempts, the account is locked and the patient is told to contact the practice. Correct credentials do not bypass the lockout. No specific unlock duration or reset behavior is assumed because the criterion does not define one.

**Pass/fail:** Pass if lockout occurs at the fifth failure, the contact-practice guidance is shown, and sign-in remains blocked. Fail if lockout occurs before/after the fifth failure or the required guidance is absent. Reset the synthetic account only through the approved test reset process after execution.

### PP-202 AC5 — Sign-in page works in English and Spanish — Priority P2

**Scenario:** Switch sign-in page language and exercise the available sign-in flow in both languages.

**Starting state:** Fresh signed-out browser context at the sign-in page; active synthetic patient account and test mailbox available.

1. Set the page to English and inspect the email/password labels, primary action, validation/error area, and code challenge after submitting correct credentials.
2. Return to a fresh sign-in flow and switch to Spanish.
3. Inspect the equivalent labels, primary action, validation/error area, and code challenge after submitting correct credentials.
4. In Spanish, submit an incorrect password and verify the error remains understandable and does not disclose account existence.
5. Switch back to English and confirm the interface updates without changing the account or bypassing authentication.

**Expected:** The sign-in flow is usable in both languages: relevant controls, validation/error feedback, and code challenge have appropriate localized text; switching language preserves the signed-out security state. No untranslated fragments that block understanding or completion of the sign-in flow.

**Pass/fail:** Pass if the sign-in and code-entry flows remain understandable and usable in English and Spanish. Fail if a language switch breaks the form, leaves essential authentication instructions untranslated, or changes the authentication requirement.

## Additional edge-case scenarios

### PP-202 AC1 — Malformed and incomplete code input — Priority P2

**Scenario:** Code challenge handles values that are not exactly six digits.

**Starting state:** Fresh signed-out browser context; correct credentials have advanced the patient to the code challenge.

1. Submit an empty code.
2. Submit fewer than six digits.
3. Submit more than six digits if the control permits it.
4. Submit non-numeric characters if the control permits them.

**Expected:** Invalid or incomplete input is rejected with usable feedback, and none of these submissions grants access. A leading zero remains representable as part of a six-digit code.

**Pass/fail:** Pass if malformed inputs cannot authenticate and valid six-digit format remains possible. Fail if incomplete or malformed input is accepted.

### PP-202 AC2 — Code resend and superseded code behavior — Priority P2

**Scenario:** A newly issued code does not accidentally permit an older challenge code to authenticate.

**Starting state:** Fresh signed-out browser context; active synthetic patient account and accessible test mailbox.

1. Request a code and record its issuance time.
2. Use the resend option if one is presented, then retrieve the newly issued message.
3. Submit the older code, then submit the newest code in a clean challenge as necessary to avoid one attempt affecting the other.

**Expected:** The current challenge can be completed with its valid code. Supersession behavior should follow the product's documented rule; if no rule is available, record whether the older code remains valid as an open specification question and ensure an invalidated code cannot grant access.

**Pass/fail:** Pass if current code behavior is consistent and no invalidated code grants access. If resend/supersession semantics are undefined, report the observed behavior for product clarification rather than inventing a criterion.

### PP-202 AC3 — Email normalization and equivalent generic failures — Priority P2

**Scenario:** Whitespace or case variations do not introduce account-enumeration differences.

**Starting state:** Fresh signed-out browser context; active synthetic patient account.

1. Submit the known email with leading/trailing whitespace and an incorrect password.
2. Submit an unregistered email with equivalent whitespace and an incorrect password.
3. Compare visible failure behavior; do not assume whether email case or whitespace is normalized unless specified elsewhere.

**Expected:** Failure handling does not reveal account existence. Any input normalization behavior should be recorded separately if not defined by PP-202.

**Pass/fail:** Fail if an observable difference identifies whether an address is registered. Treat normalization differences as clarification unless another business rule specifies the expected normalization.

### PP-202 AC4 — Attempt counting across page reloads — Priority P2

**Scenario:** Reloading or opening a second signed-out context does not evade the five-attempt account lockout.

**Starting state:** Fresh/reset synthetic patient account; two signed-out browser contexts.

1. Submit two incorrect passwords in the first context.
2. Reload that page and submit one more incorrect password.
3. Submit a fourth incorrect password in the second context.
4. Submit a fifth incorrect password in either context.
5. Attempt a correct password after the fifth failure.

**Expected:** The failure count is account-scoped rather than reset by navigation/context changes; the fifth failure triggers the same lockout and contact-practice message as the primary AC4 scenario.

**Pass/fail:** Pass if these navigation changes do not avoid the lockout. Fail if attempts can be reset by reload or a separate context. Use an isolated account and reset it after the scenario.

### PP-202 AC5 — Language switch retains authentication protections — Priority P2

**Scenario:** Changing language during a sign-in attempt does not clear or bypass a required authentication step.

**Starting state:** Fresh signed-out browser context; active synthetic patient account.

1. Switch to Spanish and enter correct credentials to reach the code challenge.
2. Switch language if the control remains available.
3. Verify the code challenge still requires a code and submit no code.
4. Start a separate flow in English and confirm the same authentication requirement.

**Expected:** Language selection does not authenticate the user, discard necessary security checks, or make the challenge unusable.

**Pass/fail:** Pass if a valid code remains required in either language. Fail if language switching bypasses the challenge or loses the ability to complete verification.

## Coverage index

| Scenario | Criterion | Priority |
| --- | --- | --- |
| Valid credentials show six-digit code challenge | AC1 | P1 |
| Code delivery and ten-minute expiration | AC2 | P1 |
| Generic wrong-password behavior | AC3 | P1 |
| Lockout after fifth wrong attempt | AC4 | P1 |
| English and Spanish sign-in flow | AC5 | P2 |
| Malformed/incomplete code input | AC1 | P2 |
| Resend and older-code handling | AC2 | P2 |
| Email variation and generic error | AC3 | P2 |
| Attempt counter persists across reload/contexts | AC4 | P2 |
| Language switching preserves security | AC5 | P2 |

---
Reviewed by Suresh Parimi, 2 November 2026: approved as the starting plan for section 5. Signed-in scenarios to be explored with test accounts.

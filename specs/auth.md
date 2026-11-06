# Patient sign-in with one-time code

## Scope and observed flow

- Requirement source: `requirements/auth.md` (BR-AUTH-01 through BR-AUTH-04).
- Start each scenario signed out on `http://127.0.0.1:8096/#/login`. For the happy path use the Silver patient (`SILVER_PATIENT_EMAIL` from `.env`) and `SILVER_PATIENT_PASSWORD` from `.env`.
- Live flow observed: submit email and password; the app opens `#/verify`, masks the destination email, and shows six separately labelled inputs (“Digit 1 of 6” through “Digit 6 of 6”), “Verify and continue”, “Resend code”, a five-minute countdown, and “Use a different account”. The test inbox is visible in the page.
- Retrieve the newest message received after the sign-in attempt from `GET /api/dev/mailbox?email=<URL-encoded SILVER_PATIENT_EMAIL>`; do not reuse older mailbox messages. Enter each digit in its corresponding box and verify. A valid code led to `#/patient/home` as Sam Rivera.
- A partial entry submitted live showed “Enter all 6 digits.” A locked demo account was refused on the credential screen with “This account is locked. Contact your clinic administrator.”
- Test expiry with a controlled clock or an expired-code fixture. Never wait five real minutes.

## Core scenarios (one per rule)

### [BR-AUTH-01] Silver patient completes email and password sign-in with the emailed six-digit code

1. Starting signed out at `#/login`, enter the Silver patient's email and configured credential, then submit.
2. Confirm the verify screen identifies a masked destination and presents six code inputs.
3. Read the newest message timestamped after this attempt from the test inbox endpoint. Enter its six digits into the six inputs and submit.
4. **Expected:** Sign-in succeeds and the patient reaches `#/patient/home` authenticated as the Silver patient.

### [BR-AUTH-02] A wrong one-time code is refused and the patient stays signed out

1. Start a fresh Silver sign-in and submit a complete six-digit value that differs from the current code.
2. **Expected:** The code is refused, the patient remains on the verification flow, and no authenticated patient page is accessible.

### [BR-AUTH-03] A one-time code expires five minutes after it is sent

1. Start a fresh Silver sign-in and capture that attempt's current code and send time.
2. Advance controlled time beyond five minutes from the send time (or provide a code fixture known to be expired), then submit that code.
3. **Expected:** The code is refused and the patient remains signed out. Do not use a real-time five-minute wait.

### [BR-AUTH-04] A locked account is refused and sees that the account is locked

1. Starting on `#/login`, submit the provided locked demo account credentials.
2. **Expected:** Sign-in is refused, the account-locked message is visible, and no verification or authenticated patient state is reached. Live copy observed: “This account is locked. Contact your clinic administrator.”

## Edge cases

### [BR-AUTH-02] Incomplete code cannot authenticate

1. Start a Silver sign-in, enter fewer than six digits, and submit.
2. **Expected:** The patient remains signed out and cannot proceed. Live UI copy for a partial entry is “Enter all 6 digits.”

### [BR-AUTH-03] Code remains valid immediately before expiry

1. Start a Silver sign-in and capture its code and send time.
2. With controlled time, submit just before the five-minute boundary.
3. **Expected:** The unexpired code is accepted. Do not sleep through the boundary in real time.

### [BR-AUTH-04] Locked account is blocked before code delivery

1. Submit the locked demo account credentials and inspect both the rendered state and inbox for that account.
2. **Expected:** The locked notice appears and sign-in does not advance to code verification. Confirm no new one-time code was issued for the blocked attempt.

## Policy gaps

- BR-AUTH-02 does not define the expected feedback text or behavior after repeated wrong-code attempts, including whether attempts are rate-limited or the account becomes locked.
- BR-AUTH-03 does not define the exact expiry boundary (for example, whether a code is valid at precisely five minutes), timer behavior, or expired-code recovery.
- The verify screen exposes “Resend code”, but requirements do not specify when it is enabled, resend limits, whether resending invalidates earlier codes, or which code remains valid if messages arrive out of order.
- Requirements do not define format handling for empty, short, long, pasted, or non-numeric input; only the six-digit code length is stated.
- BR-AUTH-04 requires the patient to see that the account is locked but does not prescribe message copy, recovery steps, or whether a one-time code must not be sent. The live demo behavior is recorded above for observation, not as an additional business rule.
- BR-AUTH-01 does not define behavior for incorrect credentials, unknown email addresses, lost email access, or navigating away from the verification step.

---
Approved by Suresh Parimi, 3 November 2026: one scenario per BR-AUTH rule, edge cases reviewed, gaps go to the product owner.

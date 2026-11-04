# Authentication Derived Test Cases

Source: `business-rules/auth.rules.md`.

Planning only. Each case uses isolated synthetic state; observe settled outcomes. Undefined policies are questions, not new business rules.

## Coverage summary

| Rule | Positive | Negative | Edge | Abuse | Total |
|---|---:|---:|---:|---:|---:|
| BR-AUTH-01 — Email code sign-in | 1 | 1 | 1 | 1 | 4 |
| BR-AUTH-02 — Wrong code refused | 1 | 1 | 1 | 1 | 4 |
| BR-AUTH-03 — Code expiry | 1 | 1 | 1 | 1 | 4 |
| BR-AUTH-04 — Locked account sign-in | 1 | 1 | 1 | 1 | 4 |
| **Total** | **4** | **4** | **4** | **4** | **16** |

## BR-AUTH-01 — Email code sign-in

| Case ID | Type | Case | Expected result | BR-ID |
|---|---|---|---|---|
| CASE-AUTH-01-01 | Positive | Submit valid email and password, then the newly emailed six-digit code before expiry. | Patient signs in as the intended patient. | BR-AUTH-01 |
| CASE-AUTH-01-02 | Negative | Submit valid credentials but omit the code. | Patient remains signed out; the code step is required. | BR-AUTH-01 |
| CASE-AUTH-01-03 | Edge | Use a controlled newly issued six-digit code beginning with zero. | All six digits are preserved and sign-in succeeds. | BR-AUTH-01 |
| CASE-AUTH-01-04 | Abuse | Attempt authenticated-page access directly after credentials, without code verification. | Patient remains signed out; protected access is refused. | BR-AUTH-01 |

## BR-AUTH-02 — Wrong code refused

| Case ID | Type | Case | Expected result | BR-ID |
|---|---|---|---|---|
| CASE-AUTH-02-01 | Positive | Submit the correct current code after valid credentials. | Patient signs in; valid input is not rejected as wrong. | BR-AUTH-02 |
| CASE-AUTH-02-02 | Negative | Submit a complete six-digit code different from the current code. | Code is refused and patient remains signed out. | BR-AUTH-02 |
| CASE-AUTH-02-03 | Edge | Submit a six-digit code differing from the current code by one digit. | Code is refused and patient remains signed out. | BR-AUTH-02 |
| CASE-AUTH-02-04 | Abuse | Repeat wrong-code submissions through direct verification requests. | Every wrong code is refused and patient remains signed out; rate limits and lockout policy are unspecified. | BR-AUTH-02 |

## BR-AUTH-03 — Code expiry

| Case ID | Type | Case | Expected result | BR-ID |
|---|---|---|---|---|
| CASE-AUTH-03-01 | Positive | With controlled time, submit the current code one minute after sending. | Code is accepted after valid credentials. | BR-AUTH-03 |
| CASE-AUTH-03-02 | Negative | With controlled time, submit the code five minutes and one second after sending. | Expired code is refused and patient remains signed out. | BR-AUTH-03 |
| CASE-AUTH-03-03 | Edge | Independently submit fresh codes at send time + 4:59.999 and exactly + 5:00.000. | Before five minutes code is valid; at exactly five minutes it is expired and cannot authenticate. | BR-AUTH-03 |
| CASE-AUTH-03-04 | Abuse | Submit an expired code through a direct request while changing the client countdown or device clock. | Code remains expired at five minutes from sending; client changes cannot extend validity. | BR-AUTH-03 |

## BR-AUTH-04 — Locked account sign-in

| Case ID | Type | Case | Expected result | BR-ID |
|---|---|---|---|---|
| CASE-AUTH-04-01 | Positive | Attempt sign-in with valid credentials for a locked account. | Sign-in is refused and the patient sees that the account is locked. | BR-AUTH-04 |
| CASE-AUTH-04-02 | Negative | Attempt the code step for a locked account using otherwise valid sign-in data. | Locked account cannot sign in and the locked state is shown. | BR-AUTH-04 |
| CASE-AUTH-04-03 | Edge | Lock an account after code delivery but before submitting its still-current code. | While locked, account cannot sign in and the patient sees the locked state. | BR-AUTH-04 |
| CASE-AUTH-04-04 | Abuse | Replay sign-in requests for a locked account while bypassing the credential screen. | No sign-in succeeds and the patient sees that the account is locked. | BR-AUTH-04 |

## Orphans

The legacy `specs/plans/pp-202-plan.md` ten-minute expiry conflicts with BR-AUTH-03. Its localization, account-enumeration and automatic-lockout expectations have no corresponding approved rule here. Resend, recovery, repeated-attempt limits and no-code-delivery for locked accounts are unspecified. `specs/auth.md` calls the exact expiry instant undefined, but the approved boundary explicitly expires the code at five minutes.

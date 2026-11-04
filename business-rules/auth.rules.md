# Authentication business rules (approved)

Source: requirements/auth.md

## BR-AUTH-01 — Email code sign-in

A patient signs in with email and password, then a 6-digit one-time code sent to their email.

Boundary: Sign-in requires email and password followed by a 6-digit one-time code sent to the patient's email.

Severity: High

## BR-AUTH-02 — Wrong code refused

A wrong one-time code is refused, and the patient stays signed out.

Boundary: Applies when a patient submits a wrong one-time code; the patient remains signed out.

Severity: High

## BR-AUTH-03 — Code expiry

A one-time code expires 5 minutes after it is sent.

Boundary: The code expires at 5 minutes after it is sent.

Severity: High

## BR-AUTH-04 — Locked account sign-in

A locked account cannot sign in, and the patient sees that the account is locked.

Boundary: Applies to locked accounts; sign-in is refused and the patient sees that the account is locked.

Severity: High

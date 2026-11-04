# Telehealth e-consent Derived Test Cases

Source: `business-rules/consent.rules.md`.

Planning only. Each case uses isolated synthetic state; observe settled outcomes. Undefined policies are questions, not new business rules.

## Coverage summary

| Rule | Positive | Negative | Edge | Abuse | Total |
|---|---:|---:|---:|---:|---:|
| BR-CON-01 — Telehealth consent signing | 1 | 1 | 1 | 1 | 4 |
| BR-CON-02 — Incomplete consent stays unsigned | 1 | 1 | 1 | 1 | 4 |
| BR-CON-03 — Signed consent details | 1 | 1 | 1 | 1 | 4 |
| BR-CON-04 — Consent withdrawal | 1 | 1 | 1 | 1 | 4 |
| **Total** | **4** | **4** | **4** | **4** | **16** |

## BR-CON-01 — Telehealth consent signing

| Case ID | Type | Case | Expected result | BR-ID |
|---|---|---|---|---|
| CASE-CON-01-01 | Positive | From Not signed, submit the patient first and last name with explicit agreement. | Consent becomes signed by that patient. | BR-CON-01 |
| CASE-CON-01-02 | Negative | Independently omit first name, last name, or explicit agreement while supplying the other two. | Each attempted consent remains Not signed. | BR-CON-01 |
| CASE-CON-01-03 | Edge | Submit whitespace-only name content with agreement. | Unspecified: rules do not define trimming or what qualifies as a name; obtain a human decision. | BR-CON-01 |
| CASE-CON-01-04 | Abuse | Bypass the widget and submit signing requests independently missing each required name or agreement. | Each incomplete consent remains Not signed. | BR-CON-01 |

## BR-CON-02 — Incomplete consent stays unsigned

| Case ID | Type | Case | Expected result | BR-ID |
|---|---|---|---|---|
| CASE-CON-02-01 | Positive | Supply first and last name and explicit agreement to an unsigned consent. | Consent becomes signed; rejection of all input cannot pass. | BR-CON-02 |
| CASE-CON-02-02 | Negative | Attempt three isolated submissions: missing first name only, missing last name only, missing agreement only. | Each remains Not signed after the attempt settles and on revisit. | BR-CON-02 |
| CASE-CON-02-03 | Edge | Leave both names and agreement absent and attempt submission. | Consent remains Not signed. | BR-CON-02 |
| CASE-CON-02-04 | Abuse | Replay an incomplete signing request after navigating away and returning. | Consent remains Not signed; replay cannot complete missing requirements. | BR-CON-02 |

## BR-CON-03 — Signed consent details

| Case ID | Type | Case | Expected result | BR-ID |
|---|---|---|---|---|
| CASE-CON-03-01 | Positive | Sign complete consent; inspect the resulting status and details. | Correct signer, signing date and a nonempty reference number are all shown. | BR-CON-03 |
| CASE-CON-03-02 | Negative | Using independent display fixtures, omit signer, date, then reference from an otherwise signed consent. | Each display fails the rule; the remaining details cannot substitute for the missing one. | BR-CON-03 |
| CASE-CON-03-03 | Edge | Sign across a controlled midnight rollover and inspect details. | Signer and reference are shown with the signing date; date timezone is unspecified and needs a human decision for a precise rollover oracle. | BR-CON-03 |
| CASE-CON-03-04 | Abuse | Alter client-displayed signer, date or reference, then reload the signed consent. | Shown details must belong to the actual signed consent; identity matching policy and reference format are unspecified. | BR-CON-03 |

## BR-CON-04 — Consent withdrawal

| Case ID | Type | Case | Expected result | BR-ID |
|---|---|---|---|---|
| CASE-CON-04-01 | Positive | Prove consent is signed, then withdraw it. | Status returns to Not signed and remains so on revisit. | BR-CON-04 |
| CASE-CON-04-02 | Negative | Sign consent, navigate away and return without requesting withdrawal. | Consent remains signed; this is a comparison with the withdrawal case, with persistence implicit rather than explicitly defined. | BR-CON-04 |
| CASE-CON-04-03 | Edge | Immediately after signing completes, withdraw the signed consent. | Status returns to Not signed. | BR-CON-04 |
| CASE-CON-04-04 | Abuse | Repeat or replay withdrawal after the first successful withdrawal. | First withdrawal returns status to Not signed; repeat response and idempotency policy are unspecified. | BR-CON-04 |

## Orphans

Whitespace/name parsing, account-name matching, reference syntax, signing-date timezone, historical-record retention and repeated-withdrawal responses have no explicit approved outcome. Plan persistence checks and unsigned-display comparisons extend beyond BR-CON-03’s signed-details scope; unsigned rejection is grounded in BR-CON-02.

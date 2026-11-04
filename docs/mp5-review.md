# MP5 case review

Sign-in — **Needs revision**: four case types per rule; overlapping checks, policy orphans and expiry-plan conflict remain.
Booking — **Needs revision**: four case types per rule; duplicates, unresolved oracles and plan-detail gaps remain.
E-consent — **Needs revision**: four case types per rule; repeated omissions, undefined oracles and persistence-plan gaps remain.

Bar: positive/negative/edge/abuse coverage per rule; duplicates; orphans or unsupported outcomes; case-to-plan agreement. Counts alone do not satisfy coverage. Sources: the three `cases/*.cases.md` catalogues, their approved rule files, `specs/auth.md`, `specs/booking.md`, `specs/consent.md`, and legacy `specs/plans/*.md`. Booking scope is PP-101 / BR-BOOK-01–06; cancellation rules 07–10 are outside this catalogue review.

## Sign-in: top three gaps

| Risk | Bar | Gap | Source |
|---|---|---|---|
| High | Plan agreement | Legacy ten-minute expiry conflicts with approved five minutes; current plan wrongly calls exact boundary undefined. | BR-AUTH-03; auth plan; pp-202-plan AC2 |
| High | Duplicates / coverage | Wrong-code negative and one-digit edge overlap; locked positive/negative/replay largely repeat refusal. No case checks locked-attempt code delivery from the plan; that expectation lacks a rule. | CASE-AUTH-02-02/03; 04-01/02/04; auth locked edge |
| Medium | Orphans | Resend, rate limits, recovery and legacy localization/lockout policies lack approved outcomes. Keep them pending human rules. | Auth plan policy gaps; pp-202-plan |

## Booking: top three gaps

| Risk | Bar | Gap | Source |
|---|---|---|---|
| High | Plan agreement | No explicit Riverbend/Pacific or second-clinic fixture; generic clinic-time checks can miss a fixed-zone implementation. | CASE-BOOK-05-01–04; plan 05-A/B |
| High | Duplicates / orphans | Price positive/edge overlap; mismatch case lacks a fixture. Sequential occupied-slot checks overlap across rules 01/02. | CASE-BOOK-04-01/02/03; 01-02; 02-02/04 |
| Medium | Coverage / orphans | Exact-start cancellation conflicts; whitespace reason lacks oracle; empty reason checks storage rather than planned confirmation. | CASE-BOOK-03-03; 06-02/03 |

The previous review's closed-future-slot gap is closed by CASE-BOOK-01-05. CASE-BOOK-04-01 already requires $15.00 at all three price points, so separate lifecycle coverage is present; its broad setup and duplicate precision case still need refinement.

## E-consent: top three gaps

| Risk | Bar | Gap | Source |
|---|---|---|---|
| High | Duplicates / coverage | Rules 01/02 repeat complete-input and omission cases; single-name UI cannot isolate first/last parsing. | CASE-CON-01-01/02; 02-01/02; plan C01/C02a–c |
| Medium | Orphans | Whitespace, date timezone, repeat-withdrawal response and persistence lack explicit policy; several edge/negative outcomes remain qualified. | CASE-CON-01-03; 03-03; 04-02/04 |
| Medium | Plan agreement | Catalogue lacks explicit same-detail revisit checks for signer/date/reference and a separate unsigned-display comparison. | CASE-CON-03-01; plan C03/C04/C05 |

Trace links show rule membership, not proof of semantic agreement or execution. Undefined outcomes remain questions for the human; no business rules or protected assertions were changed.

---
Approved by Suresh Parimi, 4 November 2026: sign-in, booking and e-consent planned and reviewed; every rule traced to plan scenarios and cases; tickets for auth and consent to raise.

# Runnable scenarios (tests added, each with its CASE ID)

- CASE-BOOK-01-01 — Book an open future slot: `tests/booking/open-future-slot.spec.ts`.
- CASE-BOOK-03-01 — Cancel a visit before its start time: `tests/booking/cancel-before-start.spec.ts`.
- CASE-BOOK-05-01 — Confirm a Riverbend Clinic visit in clinic time: `tests/booking/riverbend-timezone.spec.ts`.

# Skipped scenarios (each with its reason)

- CASE-BOOK-01-02 — Needs a second signed-in patient to contend for the booked slot.
- CASE-BOOK-01-03 — Needs the clock moved to the exact slot start time.
- CASE-BOOK-01-04 — Requires a forged past-slot request or controlled backend fixture, neither exposed by the current page-object flow.
- CASE-BOOK-01-05 — Requires a controlled closed future slot; no such fixture is available.
- CASE-BOOK-02-01 — BR-BOOK-02 is skipped because its scenario set requires a second signed-in patient.
- CASE-BOOK-02-02 — Needs a second signed-in patient.
- CASE-BOOK-02-03 — Needs two signed-in patients submitting concurrently.
- CASE-BOOK-02-04 — Needs a second signed-in patient to own the already booked slot.
- CASE-BOOK-03-02 — Needs the clock moved past the visit start time.
- CASE-BOOK-03-03 — Needs the clock moved to the exact visit start time; exact-start wording also remains ambiguous in the approved plan.
- CASE-BOOK-03-04 — Repeated cancellation/replay requires a controlled request replay fixture not exposed in the page-object flow.
- CASE-BOOK-05-02 — Requires a confirmation displaying only patient-local time; this is a defect-shaped negative state, not a separately reachable user flow.
- CASE-BOOK-05-03 — Needs a clock/appointment fixture near a daylight-saving offset transition.
- CASE-BOOK-05-04 — Needs the client timezone or device clock changed.

---
Approved by Suresh Parimi: booking tests added for BR-BOOK-01, 03 and 05, every booking title carries its CASE ID, gaps accepted with reasons.

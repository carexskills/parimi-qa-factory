# PP-101 Booking with Copay Test Plan

| Scenario | BR-ID | Type | Priority | Steps |
|---|---|---|---|---|
| Patient books only an open future slot | BR-BOOK-01 | positive | P1 | Open a future open slot and complete booking; verify it is confirmed. |
| Patient cannot book a closed slot | BR-BOOK-01 | negative | P1 | Attempt to book a slot already marked unavailable; verify booking is refused. |
| Patient cannot book a past slot | BR-BOOK-01 | edge | P1 | Attempt to book a slot whose start time has passed; verify booking is refused. |
| Second patient is refused an already booked slot | BR-BOOK-02 | negative | P1 | Book a slot as one patient, then attempt that provider and slot as another; verify refusal. |
| Patient cancels before the visit starts without a fee | BR-BOOK-03 | positive | P2 | Cancel a booked visit before its start time; verify no fee and the slot reopens. |
| Patient cancels at the visit start time without a fee | BR-BOOK-03 | edge | P2 | Cancel at the visit start time; verify cancellation succeeds without a fee and the slot reopens. |
| Patient cannot cancel at or after the visit start time | BR-BOOK-03 | negative | P2 | Attempt cancellation at or after start; verify it is refused. |
| Silver patient sees $15.00 for a standard visit at all three points | BR-BOOK-04 | positive | P1 | Book a standard visit; verify $15.00 before confirmation, on confirmation, and on receipt. |
| Confirmation shows the visit time in the clinic time zone | BR-BOOK-05 | positive | P1 | Book a visit; verify its confirmation time is expressed in the clinic time zone. |
| Empty reason is stored as “General visit” | BR-BOOK-06 | edge | P3 | Leave the reason empty and book; inspect the saved booking reason. |

## Open questions

- Which appointment constraints are approved: 30-minute duration, starts on the hour or half hour, and weekdays only? The requirements specify these, but the approved rules do not.
- Must the clinic time zone be named wherever a visit time is shown? BR-BOOK-05 only specifies the clinic time zone on the confirmation; it does not require the zone name or cover other screens.
- Does the $15.00 copay apply to both in-person and virtual standard visits? What should other plans, visit types, or unavailable plan/copay data display?
- What should happen when a patient provides a non-empty reason? The approved rule only defines the empty-reason behavior.
- What patient-facing message is required when a slot becomes unavailable during booking? BR-BOOK-02 says the second booking is refused but does not specify message content or alternate-slot selection behavior.
- Should cancellation produce a confirmation to the patient? The approved cancellation rule does not specify a confirmation.
- How should tests define the exact instant “at” the visit start time across the clinic time zone and daylight-saving transitions?

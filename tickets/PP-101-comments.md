# PP-101 · Comments

**Product owner · 2 Nov 2026**

Answers for the QA team:
- Times: a patient can book only an open time in the future. Every visit is 30 minutes,
  starting on the hour or the half hour. There are no times at weekends.
- Time zone: show every visit time in the clinic's time zone, and name the zone.
- Copay: the amount shown is what the patient pays, not an estimate. A Silver plan patient
  pays $15.00 for a standard visit, in person or virtual. Show the same amount before
  booking, on the confirmation and on the receipt.
- Cancel: a patient can cancel any time before the visit starts, with no fee.
  The time opens up again.
- Same time: two patients can never book the same provider at the same time.
  The second one sees a clear message and picks another time.
- Reason: optional. If it is empty, the booking stores "General visit".

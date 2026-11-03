# Booking business rules (approved)

Source: PP-101 (requirements/PP-101.md)

## BR-BOOK-01 — Future open slots

A patient can book only an open slot in the future.

Boundary: The slot must be open and its time must be in the future.

Severity: High

## BR-BOOK-02 — No double booking

Two patients can never book the same slot. The second booking is refused.

Boundary: Applies when a second patient attempts to book an already booked slot.

Severity: High

## BR-BOOK-03 — Cancellation cutoff

A patient can cancel a booked visit up to its start time without a fee. At or after the start time, cancellation is refused. The slot opens again after cancellation.

Boundary: Cancellation is allowed through the visit start time, and refused from that time onward.

Severity: Medium

## BR-BOOK-04 — Silver standard visit price

A Silver patient pays exactly $15.00 for a standard visit before booking, on the confirmation, and on the receipt.

Boundary: The $15.00 amount applies to Silver patients and standard visits, and must appear at all three stated points.

Severity: High

## BR-BOOK-05 — Clinic timezone on confirmation

The confirmation shows the visit time in the clinic's time zone.

Boundary: Applies to the visit time displayed on the confirmation.

Severity: High

## BR-BOOK-06 — Booking reason

Every booking has a reason. An empty reason becomes “General visit”.

Boundary: If the reason is empty, use “General visit”.

Severity: Low

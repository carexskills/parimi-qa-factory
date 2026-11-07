# Booking a Visit — Boundary Test Plan

| Rule | Boundary | Scenario IDs |
|---|---|---|
| BR-BOOK-01 | The slot must be open and its time must be in the future. | BR-BOOK-01-A (open + future); BR-BOOK-01-B (past or closed) |
| BR-BOOK-02 | Applies when a second patient attempts to book an already booked slot. | BR-BOOK-02-A (sequential second attempt refused); BR-BOOK-02-B (competing second attempt refused) |
| BR-BOOK-03 | Cancellation is allowed through the visit start time, and refused from that time onward. | BR-BOOK-03-A (before start); BR-BOOK-03-B (after start; exact-start wording conflict noted below) |
| BR-BOOK-04 | The $15.00 amount applies to Silver patients and standard visits, and must appear at all three stated points. | BR-BOOK-04-A (before booking); BR-BOOK-04-B (confirmation and receipt) |
| BR-BOOK-05 | Applies to the visit time displayed on the confirmation. | BR-BOOK-05-A (Riverbend/Pacific display); BR-BOOK-05-B (different clinic timezone) |
| BR-BOOK-06 | If the reason is empty or contains only spaces, use “General visit”. | BR-BOOK-06-A (empty reason default); BR-BOOK-06-B (spaces-only reason defaults); BR-BOOK-06-C (nonempty reason retained) |

## Coverage Notes

- BR-BOOK-03 has conflicting wording at the exact start instant: “up to its start time” allows cancellation there, while “at or after the start time” refuses it. BR-BOOK-03-B follows the latter clause and should be treated as pending clarification before its exact-start assertion is approved. The before-start and after-start checks remain unambiguous.
- BR-BOOK-04 and BR-BOOK-05 state in-scope requirements but do not specify alternate prices or display behavior outside that scope. Their paired scenarios therefore split the applicable lifecycle/display checks; they do not invent expectations for out-of-scope patients, visit types, or UI screens.
- BR-BOOK-01-B covers both invalid sides of the eligibility boundary: an open past slot and a closed future slot. Each must be independently refused.

## Application Overview

Plan based only on the approved rules in business-rules/booking.rules.md. Browser exploration began from tests/seed.spec.ts as a signed-in Silver patient on Home. Each rule has two tagged scenarios representing the rule's in-scope and boundary-invalid/scope sides where the approved wording provides an expected outcome. The BR-BOOK-03 exact-start wording conflicts; BR-BOOK-04 and BR-BOOK-05 do not define behavior outside their stated scope.

## Test Scenarios

### 1. Booking a visit

**Seed:** `tests/seed.spec.ts`

#### 1.1. BR-BOOK-01-A — @BR-BOOK-01 Future open slot can be booked

**File:** `(plan only)`

**Steps:**
  1. From the supplied signed-in Silver patient state, open Find care and choose a provider with a future open slot. Select that future date and slot, then confirm the booking.
    - expect: The slot is offered as open and is in the future.
    - expect: Booking succeeds and the appointment appears with the selected time.

#### 1.2. BR-BOOK-01-B — @BR-BOOK-01 Past or closed slot is refused

**File:** `(plan only)`

**Steps:**
  1. Using controlled slot fixtures, attempt booking a slot in the past that is open, then attempt booking a future slot that is closed.
    - expect: The past slot cannot be booked.
    - expect: The closed future slot cannot be booked.
    - expect: No appointment is created for either invalid attempt.

#### 1.3. BR-BOOK-02-A — @BR-BOOK-02 Sequential second booking is refused

**File:** `(plan only)`

**Steps:**
  1. As patient A, book an open future slot. Then, as patient B, submit a booking for the exact same slot.
    - expect: Patient B's second booking is refused and no second visit is created for that slot.

#### 1.4. BR-BOOK-02-B — @BR-BOOK-02 Competing second booking is refused

**File:** `(plan only)`

**Steps:**
  1. Arrange two patients to submit a booking for the same open slot at nearly the same time, using a controlled overlap at the final booking step.
    - expect: At most one booking succeeds; the other attempt is refused and the slot has one booking only.

#### 1.5. BR-BOOK-03-A — @BR-BOOK-03 Cancellation before start is allowed and reopens slot

**File:** `(plan only)`

**Steps:**
  1. Prepare a visit starting just after the controlled current time. Cancel it before its start time.
    - expect: Cancellation succeeds without a fee.
    - expect: The same slot becomes available to book again.

#### 1.6. BR-BOOK-03-B — @BR-BOOK-03 Cancellation after start is refused

**File:** `(plan only)`

**Steps:**
  1. Prepare a booked visit after its start time using a controlled clock and attempt cancellation.
    - expect: Cancellation is refused.

**Boundary ambiguity:** the approved rule says cancellation is allowed “up to” the start time and also says it is refused “at or after” the start time. These clauses disagree at the exact start instant. Keep an exact-start case pending clarification; do not encode either result as the protected BR assertion until the human resolves the wording.

#### 1.7. BR-BOOK-04-A — @BR-BOOK-04 Silver standard price before booking

**File:** `(plan only)`

**Steps:**
  1. As the signed-in Silver patient, choose a standard visit and inspect its price before confirming.
    - expect: The displayed amount is exactly $15.00.

#### 1.8. BR-BOOK-04-B — @BR-BOOK-04 Silver standard price on confirmation and receipt

**File:** `(plan only)`

**Steps:**
  1. As the signed-in Silver patient, book a standard visit and inspect the confirmation and resulting receipt.
    - expect: Confirmation shows exactly $15.00.
    - expect: Receipt shows exactly $15.00.

#### 1.9. BR-BOOK-05-A — @BR-BOOK-05 Confirmation uses Riverbend clinic timezone

**File:** `(plan only)`

**Steps:**
  1. Choose a Riverbend Clinic appointment time and confirm a visit while the patient/browser timezone differs from clinic time.
    - expect: Confirmation displays the visit time in the clinic's Pacific Time zone (America/Los_Angeles), with the correct corresponding local time.

#### 1.10. BR-BOOK-05-B — @BR-BOOK-05 Confirmation follows selected clinic timezone

**File:** `(plan only)`

**Steps:**
  1. Repeat confirmation at a clinic in a different timezone from Riverbend and compare the visit time to that clinic's timezone.
    - expect: Confirmation displays the selected clinic's local visit time, not the patient's/browser timezone or a fixed timezone.

#### 1.11. BR-BOOK-06-A — @BR-BOOK-06 Empty booking reason defaults to General visit

**File:** `tests/booking/reason.spec.ts`

**Steps:**
  1. Leave Reason for visit empty and confirm an otherwise valid booking.
    - expect: The booking/confirmation identifies the reason as “General visit”.

#### 1.12. BR-BOOK-06-B — @BR-BOOK-06 Spaces-only booking reason defaults to General visit

**File:** `tests/booking/reason.spec.ts`

**Steps:**
  1. Enter a reason containing only spaces and confirm an otherwise valid booking.
    - expect: The booking/confirmation identifies the reason as “General visit”.

#### 1.13. BR-BOOK-06-C — @BR-BOOK-06 Nonempty reason is retained

**File:** `tests/booking/reason.spec.ts`

**Steps:**
  1. Enter a distinctive nonempty reason and confirm an otherwise valid booking.
    - expect: The booking identifies the reason as the distinctive nonempty reason entered.

---
Approved by Suresh Parimi, 3 November 2026: both sides of every BR-BOOK boundary planned; gaps go to the product owner.

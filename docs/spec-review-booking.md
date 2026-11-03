| gap | source (rule or decision) | risk (high, medium or low) | why it matters |
|---|---|---|---|
| No scenarios verify only open future slots can be booked. | BR-BOOK-01 | high | Patients could book unavailable or past appointments, delaying appropriate care. |
| No scenario prevents two patients booking the same provider and time. | BR-BOOK-02 | high | Duplicate visits can disrupt care and leave patients without a valid appointment. |
| No scenario verifies Silver standard copay for in-person and virtual visits. | BR-BOOK-04 | high | Patients may see or pay an incorrect amount for either visit type. |
| No scenario verifies confirmation time uses the clinic timezone. | BR-BOOK-05 | high | Patients may arrive at the wrong time for care. |
| No cancellation scenario tests the start-time boundary or reopening the slot. | BR-BOOK-03 | medium | Patients may be charged incorrectly or lose access to a cancelled appointment. |
| No scenario verifies an empty reason stores “General visit”. | BR-BOOK-06 | low | Visits may lack the expected reason, reducing useful booking context. |
| No scenarios cover visit type selection or time increments, duration, and weekends. | Decision: PP-101 criteria 1–2 | medium | Patients may be offered appointment options outside the stated booking constraints. |

---
Reviewed by Suresh Parimi, 3 November 2026: the two highest-risk gaps are added in specs/booking/slots.feature. The rest stay on this list for the next spec round, or go back to the product owner.

| Risk | Flow | Impact (1–5) | Likelihood (1–5) | Score (impact × likelihood) | Factory that should catch it | One-line reason |
|---|---|---:|---:|---:|---|---|
| A patient refills a prescription that belongs to someone else. | Refill | 5 | 3 | 15 | autonomous QA | Test prescription ownership checks to prevent unauthorized refills and harm to both patients. |
| A refill is sent to the wrong pharmacy. | Refill | 5 | 3 | 15 | autonomous QA | Verify the selected pharmacy matches the refill destination to prevent delayed medication access. Changed because: a misrouted refill can interrupt essential medication and cause serious patient harm; impact raised from 4 to 5. |
| A renewal request never reaches the provider. | Refill | 5 | 3 | 15 | production intelligence | Monitor request delivery and unacknowledged renewals to detect patients waiting without medication. Changed because: an undelivered renewal can leave a patient without essential medication and cause serious harm; impact raised from 4 to 5. |
| A patient books a slot that another patient already has. | Booking | 4 | 3 | 12 | autonomous QA | Test concurrent bookings of the same slot to prevent double bookings and disrupted patient care. |
| A patient books a provider who does not accept their insurance plan. | Booking | 4 | 3 | 12 | autonomous QA | Test provider eligibility against the patient's plan to prevent denied coverage and unexpected costs. |
| A visit is booked in the wrong time zone. | Booking | 4 | 3 | 12 | autonomous QA | Test booking times across patient and provider time zones to prevent missed visits. |
| The refills left count does not go down after a refill. | Refill | 5 | 3 | 15 | autonomous QA | Verify each successful refill decrements the remaining count to prevent refills beyond the authorized supply. Changed because: repeated refills beyond the authorized supply can enable unsafe medication use and serious harm; impact raised from 4 to 5. |
| The copay shown before booking differs from the copay charged. | Booking | 3 | 3 | 9 | autonomous QA | Compare the quoted and charged copay through booking and billing to prevent unexpected patient charges. |
| A cancelled visit still sends the patient a reminder. | Booking | 2 | 4 | 8 | autonomous QA | Test cancellation with queued reminders to prevent patient confusion and unnecessary travel. |
| A refill request is missing from the audit log. | Refill | 4 | 2 | 8 | release assurance | Gate releases on complete refill audit records so investigators can trace patient requests and actions. |

Factories that catch no risk: agent engineering; continuous improvement.


Reviewed by Suresh Parimi, 2 November 2026, with the QA lead review applied.
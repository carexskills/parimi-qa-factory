# Business rule lint

| Rule ID | Verdict | Vague words | Missing boundary | Suggested rewrite |
|---|---|---|---|---|
| BR-BOOK-01 | PASS | — | — | A patient can book only an open slot in the future. |
| BR-BOOK-02 | PASS | — | — | Two patients can never book the same slot. The second one is refused. |
| BR-BOOK-03 | PASS | — | — | A patient can cancel a booked visit up to its start time, with no fee. At the start time and afterward, cancellation is refused. The slot opens again. |
| BR-BOOK-04 | PASS | — | — | A Silver patient pays exactly $15.00 for a standard visit before booking, on the confirmation, and on the receipt. |
| BR-BOOK-05 | PASS | — | — | The confirmation shows the visit time in the clinic's time zone. |
| BR-BOOK-06 | PASS | — | — | Every booking has a reason. An empty reason becomes “General visit”. |

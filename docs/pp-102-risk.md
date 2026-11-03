| Risk | Impact (1–5) | Likelihood (1–5) | Score (impact × likelihood) | Tier |
|---|---:|---:|---:|---|
| A patient cannot cancel a visit online and cannot reach the front desk. | 3 | 3 | 9 | medium |
| A patient misses a visit because the cutoff is applied at the wrong time. | 4 | 3 | 12 | medium |
| A staff member cannot cancel a visit that needs urgent rescheduling. | 4 | 2 | 8 | medium |
| A cancellation lacks actor attribution, delaying investigation of a disputed appointment. | 3 | 2 | 6 | low |
| An unauthorized person cancels a patient's visit. | 4 | 2 | 8 | medium |

Scores are provisional estimates based on the change request; likelihood needs validation against implementation and usage data.

## Spec gaps

| Rank | Gap | Rule | Risk | Why |
|---:|---|---|---|---|
| 1 | No attempt after visit start | PP-102 AC 4 | High | A started visit could be cancelled. |
| 2 | No cancellation audit or actor identity check | BR-BOOK-10; PP-102 AC 1, 3 | High | Missing records weaken dispute investigation. |
| 3 | No front desk cancellation scenario | BR-BOOK-09; PP-102 AC 3 | Medium | Staff cancellation before start is unverified. |
| 4 | Exact two-hour behavior conflicts with AC 1 wording (“more than two hours”) | BR-BOOK-07; PP-102 AC 1; open question 1 | Medium | Requirement wording leaves the boundary unresolved; the feature and rule allow exactly two hours. |
| 5 | No assertion that online cancellation has no fee | PP-102 AC 1; decision 1 | Low | The feature does not verify the no-fee outcome. |

---
Reviewed by Suresh Parimi, 3 November 2026: rules BR-BOOK-07 to 10 pass the lint. The 2-hour boundary decision goes back to the product owner on PP-102. Front desk and audit scenarios come next.

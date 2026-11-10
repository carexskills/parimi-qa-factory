| Risk | Impact (1–5) | Likelihood (1–5) | Score (impact × likelihood) | Factory that should catch it | One-line reason |
|---|---:|---:|---:|---|---|
| A refill is sent for a prescription that is no longer active. | 5 | 3 | 15 | autonomous QA | Test refill eligibility against current prescription status to prevent potentially harmful medication use. |
| A patient can see another patient’s test results. | 5 | 3 | 15 | autonomous QA | Test patient-level access controls to catch disclosure of another patient’s sensitive results. |
| A booked visit disappears from the provider’s schedule. | 4 | 3 | 12 | release assurance | Verify booking persistence and schedule integrity across releases to prevent missed care. |
| A patient is charged the wrong copay for a visit. | 3 | 3 | 9 | autonomous QA | Test copay calculations against coverage and visit details to catch incorrect patient charges. |
| The one-time sign-in code never arrives. | 3 | 3 | 9 | production intelligence | Monitor delivery failures and sign-in completion to detect patients being locked out by live delivery issues. |


Reviewed by Suresh Parimi, 2 November 2026: accepted as v0.
# First browser session: PP-201 refill route

Inspected ParimiPractice at `http://127.0.0.1:8096` with Playwright on 3 November 2026. I did not sign in, submit a form, or create an account.

## Where a patient would request a refill

The public sign-in page advertises that patients can “see lab results and refill prescriptions.” That points to the signed-in patient portal's prescriptions area as the place to start. The exact patient-facing page route and controls could not be confirmed while signed out. The documented API route for a prescription refill is `POST /api/prescriptions/{id}/refill` (from the repo's system map); that is an API path, not a verified browser route.

## What is visible without signing in

The app opens at `/#/login`, titled “Sign in to ParimiPractice.” It shows email and password fields, English/Spanish controls, a “New patient? Create an account” link, and a list of fictional demo roles. The page says every sign-in sends a one-time code to the test inbox. A banner describes the app as fictional and says its people and data are invented.

The public `/#/signup` page shows a patient registration form (name, date of birth, sex assigned at birth, state, insurance plan, email, password and terms checkbox) and a link back to sign-in. I did not fill or submit it. No prescription list, refill action, patient-specific data, status, or audit history is visible while signed out.

## What an end-to-end PP-201 test needs

- A patient test identity and a way to complete the sign-in one-time-code flow through the test inbox.
- Patient-owned prescription fixtures in at least three states: active with refills remaining, active with zero refills, and inactive. Include a known pharmacy for the first case.
- The signed-in patient UI route and observable controls for requesting a refill, along with expected confirmation/status text.
- A way to verify persistence after the request: status “Refill requested” and refills decreased by one for the first case; status “Renewal requested” and provider-renewal notice for the zero-refill case; inactive prescriptions must not be refillable.
- Access to the audit log (or an equivalent test-visible audit record) to verify each refill or renewal request is recorded.
- A reset or isolated data setup so requests do not contaminate later cases.

The acceptance criteria above come from PP-201. The browser session established only the public entry and registration pages; authenticated UI behavior and fixture availability remain to be verified before writing or running the end-to-end test.

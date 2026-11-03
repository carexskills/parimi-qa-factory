| Area | Scenario | Key checks | Boundary failure condition |
|---|---|---|---|
| E-consent | Keyboard signing | Signed-in Silver patient signs with keyboard; Consent status names Sam Rivera and shows the signed record. | — |
| E-consent | Withdrawal/reset | Withdraw signed consent; status returns to Not signed and the form is restored. | — |
| E-consent | Empty name | Tick I agree and submit with no signature name. | Fail if consent becomes signed or a signed confirmation/reference appears. |
| E-consent | Agreement unchecked | Enter the patient's name and submit without ticking I agree. | Fail if consent becomes signed or a signed confirmation/reference appears. |
| Vitals | History table | Compare all table readings and order to the signed-in patient's `/api/vitals/history` data. | Fail on missing, extra, reordered, or mismatched date/value/pulse rows. |
| Vitals | Latest chart summary | Compare accessible canvas summary to newest patient record (128/89 mmHg on Nov 3, 2026). | Fail if either summary value differs from the newest record. |

# Telehealth E-consent and Vitals Chart Test Plan

## Live exploration notes

- The seed session opened as Sam Rivera, Patient; no manual sign-in was performed.
- The consent widget instructions exposed the keyboard route. Signing by keyboard changed Consent status to `Signed by Sam Rivera on Nov 3, 2026` with a reference. Activating Withdraw consent returned status to `Not signed` and restored the form. This consent was withdrawn during exploration.
- The vitals page exposes a 12-row Blood pressure readings table and an accessible name on the canvas. The authenticated `GET /api/vitals/history` response for `PT-SILVER` matched the table; the newest item is `2026-11-03`, `128/89 mmHg`, pulse `80`. The canvas accessible summary reports latest systolic `128 mmHg` and diastolic `89 mmHg`.
- The live browser stalled while returning to consent for the two negative submissions. Those expected blocks are specified as explicit failure conditions below, but were not manually exercised during exploration.

## Application Overview

Explore telehealth consent and blood pressure history for the signed-in Silver patient (Sam Rivera, PT-SILVER) established by tests/seed.spec.ts at http://127.0.0.1:8096. Validate consent only through keyboard interaction and the page's Consent status; the signature widget is a third-party closed shadow root. Validate the canvas chart using its accessible latest-value summary and patient data, never pixels. The vitals history endpoint is GET /api/vitals/history; its current authenticated response has 12 readings and the newest is 2026-11-03: 128/89 mmHg, pulse 80. Do not perform manual sign-in.

## Test Scenarios

### 1. Consent and vitals

**Seed:** `tests/seed.spec.ts`

#### 1.1. Sign telehealth consent by keyboard and show signed status

**File:** `Plan only; no test file requested`

**Steps:**
  1. Start from the seed test's signed-in Silver patient session; open Consent forms and verify Consent status is Not signed.
    - expect: Consent status reads Not signed before the flow.
  2. Use the keyboard path: Tab into the signature widget, type Sam Rivera, Tab, Space to tick I agree, Tab, Enter on Sign.
    - expect: Consent status changes to Signed by Sam Rivera and includes the signed date/reference.
    - expect: Do not inspect or target controls inside the closed shadow root.

#### 1.2. Withdraw signed consent and restore the initial state

**File:** `Plan only; no test file requested`

**Steps:**
  1. Starting from a signed consent, activate Withdraw consent.
    - expect: Consent status returns to Not signed.
    - expect: The signature form is restored so consent can be signed again.
  2. Reload the consent route and re-check status.
    - expect: Withdrawn state remains Not signed after reload; no active consent is shown.

#### 1.3. Reject consent submission when the signature name is empty

**File:** `Plan only; no test file requested`

**Steps:**
  1. Start with Not signed. Use keyboard navigation to the widget, leave the name empty, Tab to I agree, press Space, Tab to Sign, then Enter.
    - expect: Submission is blocked or validation is shown.
    - expect: Consent status remains Not signed and no signed confirmation/reference appears. This scenario fails if an empty-name submission creates signed consent.

#### 1.4. Reject consent submission when I agree is unchecked

**File:** `Plan only; no test file requested`

**Steps:**
  1. Start with Not signed. Use keyboard navigation to enter Sam Rivera, leave I agree unchecked, Tab to Sign, then Enter.
    - expect: Submission is blocked or validation is shown.
    - expect: Consent status remains Not signed and no signed confirmation/reference appears. This scenario fails if signing succeeds without the agreement checkbox.

#### 1.5. Show Silver patient's complete blood pressure history

**File:** `Plan only; no test file requested`

**Steps:**
  1. Open Vitals as the seed-signed-in Silver patient. Compare the Blood pressure readings table's rows to the authenticated GET /api/vitals/history items for the same patient.
    - expect: The table contains all 12 readings in newest-first order, with each date, systolic/diastolic value, and pulse matching patient data.
    - expect: The latest table row is Nov 3, 2026; the oldest is Dec 1, 2025.

#### 1.6. Chart summary matches the newest patient record

**File:** `Plan only; no test file requested`

**Steps:**
  1. On Vitals, read the latest record from the patient's history data and compare it to the canvas accessible name/summary.
    - expect: The latest record is 2026-11-03 with systolic 128 mmHg, diastolic 89 mmHg, pulse 80 bpm.
    - expect: The chart's accessible summary reports Systolic: latest 128 mmHg; Diastolic: latest 89 mmHg.
    - expect: No pixel or canvas screenshot assertions.

---
Approved by Suresh Parimi, 3 November 2026: keyboard consent path, status and vitals data covered; decisions go to the product owner.

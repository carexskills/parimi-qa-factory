| Rule | Boundary side | Scenario | Decisive protected outcome |
| --- | --- | --- | --- |
| BR-CON-01 | First name, last name and explicit agreement present | C01 | Consent status becomes signed by Sam Rivera |
| BR-CON-01 | One requirement absent, each independently | C02a–c | Consent status stays Not signed after attempted submission |
| BR-CON-02 | First name, last name or agreement absent | C02a–c | Each isolated omission stays Not signed |
| BR-CON-02 | No requirement absent | C01 | Consent status becomes signed, preventing an always-unsigned implementation passing |
| BR-CON-03 | Signed | C03 | Correct signer, signing date and nonempty reference are individually required |
| BR-CON-03 | Not signed | C04 | Status is explicitly Not signed and does not claim a current signature |
| BR-CON-04 | Signed, withdrawal not requested | C05 | Consent stays signed on returning to the page |
| BR-CON-04 | Signed, withdrawal requested | C06 | Consent status returns to Not signed |

# Telehealth e-consent boundary plan

Source: `business-rules/consent.rules.md`. Planning only; no tests generated. Scenario tags below identify protected business-rule outcomes. Markdown is an agent plan, not a new acceptance specification.

## Starting state and isolation

For **every scenario and every outline row**, start with a fresh isolated patient state using `tests/seed.spec.ts` and its `signedInSilverPatient` fixture: signed-in Silver patient Sam Rivera on Home at `http://127.0.0.1:8096`. Never sign in by hand. A fresh browser alone must not be assumed to reset persisted consent: verify the initial Consent status is `Not signed`; if necessary withdraw existing consent as setup, then return Home. Do not share consent state between scenarios or run these cases concurrently against the same patient.

1. From seeded Home, select the **Consent forms** navigation link.
2. Wait for the **Telehealth consent** heading and the named status **Consent status**. Require its initial text to be exactly `Not signed`.
3. Read the consent terms. Use the **Signature (secure widget)** group as the keyboard focus anchor.

For every case that signs consent, register cleanup before attempting to sign: if the visible status becomes signed, select **Withdraw consent** and wait for **Consent status** to be exactly `Not signed`, including when another assertion fails. Do not hide a failed protected assertion during cleanup. Leave all changes for human review; do not commit.

## Observed keyboard interaction

The signature widget is in a closed shadow root; snapshots expose its group but no internal input, agreement or Sign button. Do not pierce the root, inspect internal state or dispatch synthetic signing events.

- Focus the group **Signature (secure widget)** directly. Focus delegates into the full-name input. Alternatively reach the input by normal Tab navigation; do not add another Tab after direct host focus.
- Type the full name with the page keyboard. `Tab` moves to agreement; `Space` checks it; `Tab` moves to Sign; `Enter` attempts signing.
- For the unchecked-agreement case, use `Tab`, `Tab`, `Enter` after typing, omitting Space.
- Use a fresh mounted widget for every omission case so agreement is initially unchecked. Do not infer checkbox state from the inaccessible internals.
- Assert the externally visible **Consent status**, scoped to the Telehealth consent section. A toast or successful keystroke alone never proves signing or rejection. Await completion of a valid submission before checking the result; for rejected input, observe the completed validation/settled attempt and confirm the status again after leaving and returning. Avoid a transient initial `Not signed` passing before a delayed sign completes.

## Boundary scenarios

### C01 — Complete consent signs successfully

`@BR-CON-01 @BR-CON-02`

Starting state: fresh seeded unsigned patient as above.

1. Open Consent forms and confirm `Not signed`.
2. Focus the secure widget, type `Sam Rivera`, then press `Tab`, `Space`, `Tab`, `Enter`.
3. Wait for Consent status to report a signed consent by **Sam Rivera**.
4. Return Home and reopen Consent forms; require it still reports signed by Sam Rivera.
5. Withdraw in cleanup and verify `Not signed`.

Success: the complete input changes unsigned to signed. Fail if a complete valid consent remains unsigned, reports another signer, or loses its signed state on revisit. This is also the opposite boundary of BR-CON-02: an implementation that rejects everything cannot pass.

### C02 — Each missing requirement independently prevents signing

`@BR-CON-01 @BR-CON-02` — Scenario outline; each row is a separate independent scenario.

| Case | Name typed | Agreement | Isolated missing requirement |
| --- | --- | --- | --- |
| C02a | `Rivera` | Checked with Space | First name |
| C02b | `Sam` | Checked with Space | Last name |
| C02c | `Sam Rivera` | Leave unchecked; omit Space | Explicit agreement |

1. Begin with a fresh seeded unsigned patient and freshly mounted widget for this row; confirm `Not signed`.
2. Focus the widget and type exactly the row's name.
3. Press Tab to agreement; press Space only for checked rows. Press Tab then Enter to attempt Sign, even for invalid input.
4. After the attempted submission settles, require Consent status to remain exactly `Not signed`.
5. Return Home and reopen Consent forms; require exactly `Not signed` again. If an erroneous signature was created, fail the rule assertion and withdraw it during cleanup.

Success: every row independently remains unsigned. Fail if any omission produces a signed consent, immediately or after revisit. Never replace a status assertion with an assertion about a disabled button, validation message or toast; those could coexist with an erroneous persisted signature. Single omissions ensure accepting one missing requirement is caught without another missing requirement masking it.

### C03 — Signed consent displays all three required details

`@BR-CON-03`

Starting state: fresh seeded unsigned patient; no previous scenario's signature.

1. Open Consent forms, confirm `Not signed`, and record the signing-date window (the displayed date corresponding to submission, allowing a midnight rollover).
2. Sign with `Sam Rivera` and explicit agreement using the keyboard path.
3. Wait for the named Consent status to report signed.
4. Independently require all three within that status: signer **Sam Rivera**, a visible date corresponding to the signing-date window, and a nonempty reference number clearly attached to this signed consent.
5. Return Home and reopen Consent forms; independently require the same signer, date and reference as before navigation.
6. Withdraw in cleanup; require `Not signed`.

Success: every detail is present and attributable to this signature. Fail if identity, date or reference is missing, empty or replaced by an unrelated value, even if the other details and a signed toast appear. Do not hardcode the exploration reference or calendar date. The observed `PP-CON-` prefix is evidence, not an approved format requirement.

### C04 — Unsigned consent is not represented as currently signed

`@BR-CON-03 @BR-CON-02`

Starting state: fresh seeded unsigned patient.

1. Open Consent forms; confirm named Consent status is exactly `Not signed`.
2. Attempt signing with complete name `Sam Rivera` but without agreement, using Tab, Tab, Enter.
3. After the attempt settles, require Consent status to remain exactly `Not signed` and not report `Signed by` for the current consent.
4. Return Home and reopen Consent forms; require the same unsigned state.

Success: the unsigned side never claims a current signer. Fail if it reports signed or introduces a current signature despite missing agreement. BR-CON-03 only defines details for signed consent; it does **not** require erasure of historical signature records or a particular unsigned layout. The decisive rejection expectation here is grounded in BR-CON-02, avoiding an invented BR-CON-03 obligation.

### C05 — Signed consent stays signed without withdrawal

`@BR-CON-04 @BR-CON-01`

Starting state: fresh seeded unsigned patient.

1. Open Consent forms and sign with Sam Rivera and explicit agreement.
2. Require signed Consent status; record its signer, date and reference as state evidence.
3. Do **not** select Withdraw consent. Return Home and reopen Consent forms.
4. Require Consent status still reports the same signed consent; require **Withdraw consent** is available.
5. Withdraw during cleanup only and verify `Not signed`.

Success: consent remains signed until the withdrawal action. Fail if it spontaneously becomes unsigned or withdrawal is unavailable. This comparison catches an implementation that always displays `Not signed`; C06 must first prove its signed precondition.

### C06 — Withdrawing a signed consent returns it to Not signed

`@BR-CON-04`

Starting state: fresh seeded unsigned patient.

1. Open Consent forms and sign with Sam Rivera and explicit agreement.
2. Require Consent status reports signed by Sam Rivera before proceeding. Require **Withdraw consent** is available.
3. Select **Withdraw consent** once. Wait for the named Consent status to become exactly `Not signed`.
4. Return Home and reopen Consent forms; require it remains exactly `Not signed`.
5. Confirm cleanup has left no signed consent; retry withdrawal only as cleanup if the rule assertion failed and signing remains active.

Success: a proven signed state becomes unsigned following withdrawal and stays unsigned on revisit. Fail if withdrawal cannot be requested, status stays signed, or the signature reappears. A `Consent withdrawn.` toast alone cannot pass this scenario.

## Live exploration evidence and limitations

Explored on 2026-11-04 using the planner setup with the existing seed test; the browser began at signed-in Home as Sam Rivera. Home → Consent forms exposed the terms, secure widget group and named Consent status `Not signed`.

Directly focusing the group, typing `Sam Rivera`, and using Tab, Space, Tab, Enter produced `Signed by Sam Rivera on Nov 4, 2026 · PP-CON-MW25COIVKMZ7`, a **Withdraw consent** button and `Consent signed.` toast. Clicking Withdraw consent returned the named status to `Not signed` and showed `Consent withdrawn.`. This was the only consent successfully signed during exploration and it was withdrawn immediately. Subsequent independent probes with `Sam` plus agreement, `Sam Rivera` without agreement, and `Rivera` plus agreement all left the status `Not signed`; final exploration state was unsigned.

A click on the host followed by an extra Tab did not reliably target the name field; it moved keyboard navigation onward. The verified path above uses explicit host focus and types immediately. No shadow-root bypass or screenshot was needed.

The UI offers one full-name field, not separately addressable first/last fields. C02a/C02b represent known patient's missing first/last name with `Rivera`/`Sam`; they decisively detect accepting a one-part name but cannot distinguish internal first-name parsing from last-name parsing. Approved rules do not specify whitespace, multiword surnames, identity matching against account data, reference syntax, date timezone, historical-detail retention or withdrawal confirmation behavior. Do not invent protected assertions for those. BR-CON-03's unsigned side has no independent details requirement; C04 uses the explicit unsigned-status obligation from BR-CON-02. These limits do not weaken the stated signed-details checks.

This is a browser-informed plan, not a test execution report. Future generated tests must preserve the BR assertions and report a suspected product defect if the app violates them; locator, wait or data healing must not change those outcomes.

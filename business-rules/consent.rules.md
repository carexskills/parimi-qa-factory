# Consent business rules (approved)

Source: practice manager, telehealth consent policy

## BR-CON-01 — Telehealth consent signing

A patient signs the telehealth consent with their first and last name and an explicit agreement.

Boundary: Signing requires the patient's first and last name and an explicit agreement.

Severity: High

## BR-CON-02 — Incomplete consent stays unsigned

Without a first and last name, or without the agreement, the consent stays Not signed.

Boundary: The consent stays Not signed if the first name, last name or agreement is missing.

Severity: High

## BR-CON-03 — Signed consent details

A signed consent shows who signed it, the date and a reference number.

Boundary: Applies to signed consent and requires all three stated details.

Severity: Medium

## BR-CON-04 — Consent withdrawal

A patient can withdraw a signed consent, and the status returns to Not signed.

Boundary: Withdrawing a signed consent returns its status to Not signed.

Severity: Medium

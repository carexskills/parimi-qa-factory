# Cancellation rules (proposed, PP-102)

Source: PP-102 (requirements/PP-102.md)
Status: approved for development, not in the app yet. BR-BOOK-07 narrows BR-BOOK-03 when PP-102 is released.

## BR-BOOK-07 — Patient online cancellation window

A patient can cancel online only while the visit starts 2 hours or more from now.

Boundary: Online cancellation is available when the visit starts at least 2 hours from now.

Severity: High

## BR-BOOK-08 — Front desk contact near visit start

When the visit starts in less than 2 hours, the patient sees the front desk phone number instead of a Cancel button.

Boundary: When the visit starts less than 2 hours from now, the phone number is shown in place of the Cancel button.

Severity: High

## BR-BOOK-09 — Front desk cancellation

The front desk can cancel any visit before it starts.

Boundary: The front desk can cancel visits only before their start time.

Severity: Medium

## BR-BOOK-10 — Cancellation audit log

Every cancellation is written to the audit log, with who cancelled it.

Boundary: Each cancellation is recorded in the audit log with the identity of the person who cancelled it.

Severity: High

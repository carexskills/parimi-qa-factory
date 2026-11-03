# ID convention (plain English)

One line per link in the chain.

Ticket: PP-<number>, from Jira. Example: PP-101.
Rule: BR-<MODULE>-<two digits>. Example: BR-BOOK-04.
Case: CASE-<MODULE>-<rule digits>-<two digits>. Example: CASE-BOOK-04-01.
Test: the test title starts with its case ID and carries its BR-ID tag.
Run: the run ID and date from the test report.
Defect: BUG-<NAME>, linked to the rule it breaks. Example: BUG-COPAY.
Release: R<number>. Example: R1.

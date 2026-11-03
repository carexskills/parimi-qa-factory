# Agent permissions (plain English)

One line per agent: what it may do, and what it may not do.

Planner: may read the repo and open the app in a browser. May not change any file.
Generator: may write only in tests/, pages/ and fixtures/.
Healer: may change locators, waits and test data in tests/. Never a BR-ID assertion.
Ticket reader: may read Jira tickets with a read-only token. May not create, edit or close tickets.

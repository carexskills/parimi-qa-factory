# Agent permissions

| Agent | Read repo | Write paths | Browser | Network | Jira | Sandbox mode | Approval mode | Reason |
|---|---|---|---|---|---|---|---|---|
| Planner | Yes | None | Yes | No | No | Read-only | None | Can review the repo and open the app to plan work without changing files. |
| Generator | Yes | `tests/`, `pages/`, `fixtures/` | No | No | No | Workspace-write, limited to listed paths | Human approval for high-risk changes | Needs repository context and permission to create tests, page objects and fixtures only. |
| Healer | Yes | `tests/` (locators, waits and test data only; never BR-ID assertions) | Yes | No | No | Workspace-write, limited to `tests/` | Human approval for high-risk changes | Needs to inspect the app and adjust test mechanics while protected business-rule assertions remain unchanged. |
| Ticket reader | No | None | No | Jira read-only access only | Read-only | Read-only | None | Needs read-only Jira access to inspect tickets, without repo access or ticket changes. |

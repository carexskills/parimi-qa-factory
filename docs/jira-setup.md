# Jira setup checklist

- [ ] Create project `PP` for the ParimiPractice portal.
- [ ] Add issue types: Story, Bug, Change Request.
- [ ] Configure statuses in the order shown below.
- [ ] Add the custom fields listed below to every issue.
- [ ] Require risk tier, candidate, and evidence on every issue. (proposed)
- [ ] Block Prod transitions until evidence and approval are present.
- [ ] Require a green gate before merge.
- [ ] Require human approval for high-risk changes.
- [ ] Configure approvals by tier: low policy check; medium QA lead; high QA lead and business owner. (proposed)

## Statuses

| Status | What must be true to enter it | Who moves the ticket |
|---|---|---|
| Intake | Request recorded. (proposed) | Requester. (proposed) |
| Preview | Specs, rules, and test plan reviewed. (proposed) | QA lead. (proposed) |
| Gate | Test evidence collected; gate result ready. (proposed) | QA lead. (proposed) |
| INT | Gate is green. (proposed) | QA lead. (proposed) |
| UAT | INT validation evidence is available. (proposed) | QA lead. (proposed) |
| Prod | Evidence and approval are present. | QA lead. (proposed) |

## Custom fields

| Field | Allowed values |
|---|---|
| Risk tier | low; medium; high |
| Candidate | Build identifier. (proposed) |
| Evidence | Links to runs, reports, and approvals |

---
Reviewed by Suresh Parimi, 3 November 2026: proposals checked. Apply on the Jira site, project PP.

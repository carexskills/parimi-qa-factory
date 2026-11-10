# Working agreement · The Agentic QA Factory

This is the contract between you and the agents. Read it, sign it, keep it in the repo.

## 1. What I write (plain English only)
- Tickets and acceptance criteria
- Business rules, each with an ID, like BR-BOOK-04
- Specs and test plans
- Prompts for Codex and the agents
- Policies: risk tiers, gate rules and approvals

## 2. What I approve or reject
- The business rules that Codex extracts from a ticket
- The test plans that the planner agent writes
- Every heal, as a pull request
- Every bug that triage wants to file in Jira
- Merges and releases, by risk tier:
  low = policy check · medium = QA lead · high = QA lead + business owner

## 3. What the agents own
- All test, framework and app code, written by Codex
- Running the tests and collecting the evidence

## 4. What I never do
- Type test, framework or app code
- Let an agent change an assertion that carries a business rule ID
- Put an API key in a prompt, a file or on screen
- Approve a change without seeing its evidence

## Signed
Name: Suresh Parimi
Date: 2 November 2026

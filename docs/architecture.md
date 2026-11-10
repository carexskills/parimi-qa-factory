# Repository tour

## Tracked top-level folders

```text
.
├── .agents/
├── .codex/
├── .githooks/
├── .playwright-mcp/
├── business-rules/
├── docs/
├── fixtures/
├── pages/
├── prompts/
├── reports/
├── requirements/
├── scripts/
├── specs/
├── tests/
└── tickets/
```

## Folder guide

| Folder | What lives there | Owner | AGENTS.md rule |
| --- | --- | --- | --- |
| `.agents/` | Repository skills | Codex | — |
| `.codex/` | Agent and repository configuration | Codex | — |
| `.githooks/` | Git hooks | Codex | — |
| `.playwright-mcp/` | Captured browser page snapshots | Test runs | — |
| `business-rules/` | Business rule documents | Human | 1 |
| `docs/` | Guides, reports, and architecture notes | Human | 9 |
| `fixtures/` | Test data and fixtures | Codex | 1 |
| `pages/` | Page objects | Codex | 1 |
| `prompts/` | Agent prompts and templates | Human | — |
| `reports/` | Playwright HTML reports | Test runs | — |
| `requirements/` | Feature requirements | Human | — |
| `scripts/` | Repository utility scripts | Codex | — |
| `specs/` | Gherkin acceptance specifications | Human | 1, 8 |
| `tests/` | Generated Playwright tests | Codex | 1, 2 |
| `tickets/` | Product tickets | Human | — |

## Hand-editing boundary

Humans never hand-edit `tests/`; rule 2 forbids hand-typed test code.
Humans leave `pages/` and `fixtures/` to Codex, which writes both under rule 1.
Humans author `specs/` and `business-rules/`; Codex turns them into test artifacts.

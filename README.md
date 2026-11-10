# parimi-qa-factory

> **Demo credentials and security**
> - Every password, login and key in this repo (the `.env.example` and `environments/*.env` files, seed data, fixtures) is a fake demo value for the ParimiPractice training app, kept public on purpose so you can run it.
> - In a real company, secrets never go into Git: `.env` is listed in `.gitignore` and only a `.env.example` with placeholders is committed.
> - Real values live in a secrets manager or vault (GitHub Actions secrets, Azure Key Vault, AWS Secrets Manager, HashiCorp Vault), and CI injects them at run time.
> - They are scoped per environment, rotated regularly, and secret scanning plus pre-commit hooks block any that slip into a commit.

The course repo for **The Agentic QA Factory** (Skills in Action).
Tests target ParimiPractice, a fictional healthcare training app with synthetic data only.

You write tickets, rules, specs, prompts and policies. Codex writes the code.
Every lesson ends with a tag: `git checkout s<section>-l<lesson>` takes you to its finished state.

## Folders

- `specs/` — Your test specifications.
- `business-rules/` — Your business rules.
- `tests/` — Generated Playwright tests.
- `pages/` — Page objects.
- `fixtures/` — Test data.
- `reports/` — Playwright HTML reports.

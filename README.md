# parimi-qa-factory

> **Demo credentials and security**
> - Every password, login and key in this repo (the `.env.example` and `environments/*.env` files, seed data, fixtures) is a fake demo value for the ParimiPractice training app, kept public on purpose so you can run it.
> - In a real company, secrets never go into Git: `.env` is listed in `.gitignore` and only a `.env.example` with placeholders is committed.
> - Real values live in a secrets manager or vault (GitHub Actions secrets, Azure Key Vault, AWS Secrets Manager, HashiCorp Vault), and CI injects them at run time.
> - They are scoped per environment, rotated regularly, and secret scanning plus pre-commit hooks block any that slip into a commit.

The course repo for **The Agentic QA Factory** (Skills in Action).
Tests target ParimiPractice, a fictional healthcare training app with synthetic data only.

You write tickets, rules, specs, prompts and policies. Codex writes the code.

## Lesson tags

Every lesson in Sections 1 to 6 ends with a commit and a tag. `git checkout <tag>` puts the project in that lesson's finished state, which is also the starting state of the next lesson.

```bash
git fetch --tags     # only if you cloned before the tags were added
git tag              # list the tags
git checkout s1-l3   # end of lesson 1.3 = start of lesson 1.4
git switch main      # back to your own work
```

The 52 tags:

- Section 1: `s1-l1` to `s1-l4`, `s1-mp1-start`, `s1-mp1`
- Section 2: `s2-l1` to `s2-l8`, `s2-mp2-start`, `s2-mp2`
- Section 3: `s3-l1` to `s3-l8`, `s3-mp3-start`, `s3-mp3`
- Section 4: `s4-l1` to `s4-l8`, `s4-mp4-start`, `s4-mp4`
- Section 5: `s5-l1` to `s5-l6`, `s5-mp5-start`, `s5-mp5`
- Section 6: `s6-l1` to `s6-l6`, `s6-mp6-start`, `s6-mp6`

`sN-mpN-start` is where mini project N starts (brief and walkthrough). `sN-mpN` is the end of its walkthrough. Lessons 2.5a and 3.2a change no project files, so they have no tag of their own.
The tags from Section 2 onward have a `package.json`: run `npm ci` after you check one out. From `s2-l5` onward, `npx playwright test tests/seed.spec.ts` runs the seed test (the app must be running on port 8096).

The full lesson history is on the `course-history` branch. `main` is the setup starter that the Setup section clones: the project files of `s4-l8` (end of lesson 4.8), plus this README and the CI change below.

When you follow a lesson in your own clone, its `git tag sN-lN` step says the tag already exists, because the course tags are already here. Skip that step, or use your own name, for example `my-s6-l1`.

## CI

On every push, the CI check runs the free gitleaks CLI and scans the commit history for secrets. No licence key or repo secret is needed. The commits behind the lesson tags still hold the workflow as lesson 4.7 built it (`gitleaks/gitleaks-action`), which needs a licence key on organisation repos; the free-CLI version is on `main`.

## Folders

- `specs/` — Your test specifications.
- `business-rules/` — Your business rules.
- `tests/` — Generated Playwright tests.
- `pages/` — Page objects.
- `fixtures/` — Test data.
- `reports/` — Playwright HTML reports.

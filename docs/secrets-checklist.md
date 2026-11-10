# Secrets checklist

- Never put API keys or tokens in prompts, logs, screenshots, or git; enforced by `AGENTS.md` and `.githooks/pre-push`.
- Keep tracked environment files to setting names and safe values; enforced by `environments/*.env` templates and Gitleaks scans.
- Store secret values in ignored local files or GitHub secrets; enforced by `.gitignore`, `scripts/env.sh`, and `.github/workflows/ci.yml`.
- Give each environment separate secrets; enforced by `scripts/env.sh` loading `environments/<env>.secrets.env`.
- Scan every push and stop on findings; enforced by `.githooks/pre-push` and `.github/workflows/ci.yml`.

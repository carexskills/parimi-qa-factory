# Environments

All environments use `parimipractice:1.0.0` and the same `environments/compose.yml` service definition. Each has an independent Compose project and named data volume. The env files contain configuration only; they contain no credentials or tokens.

| Environment | Port | Settings | Data volume | Lifecycle |
| --- | ---: | --- | --- | --- |
| local | 8787 | `APP_ENV=local`, `RESET_POLICY=manual`, seed v1 | `parimi-local-data` | On your laptop; reset whenever you want. |
| preview | 8788 | `APP_ENV=preview`, `RESET_POLICY=after-branch-merge`, seed v1 | `parimi-preview-data` | One per branch; start for a pull request and remove after merge. |
| int | 8789 | `APP_ENV=int`, `RESET_POLICY=nightly`, seed v1 | `parimi-int-data` | Shared integration environment; reset nightly from seed v1. |
| uat | 8790 | `APP_ENV=uat`, `RESET_POLICY=on-request`, seed v1 | `parimi-uat-data` | User acceptance; reset only on request. |
| prod-sim | 8791 | `APP_ENV=prod-sim`, `RESET_POLICY=never`, seed v1 | `parimi-prod-sim-data` | Production simulation; never reset by tests. |

Use `npm run env:up -- <environment>`, `npm run env:down -- <environment>`, or `npm run env:status -- <environment>`, where `<environment>` is `local`, `preview`, `int`, `uat`, or `prod-sim`. `env:up` waits up to two minutes for `/api/health` to return a successful response.

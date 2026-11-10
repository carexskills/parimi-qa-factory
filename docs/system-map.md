# ParimiPractice system map

Reviewed 2 November 2026 using the Playwright browser, without signing in or submitting forms. Sources: [public site](https://parimipractice.sites.tab.bot) and [OpenAPI 3.1 description, version 1.0.0](https://parimipractice.sites.tab.bot/api/openapi.json). All people and data are fictional.

## Pages and routes

| Page | Route | Observed behavior |
| --- | --- | --- |
| Entry / sign-in | `/` → `/#/login` | Shared email/password form; EN/ES controls; demo roles; notice that sign-in requires a one-time code. |
| Patient registration | `/#/signup` | Personal details, state, insurance, email, password and terms checkbox; link back to sign-in. No form submitted. |
| API description | `/api/openapi.json` | Public JSON describing endpoints, schemas and authentication. |
| Authenticated pages | Not established | Portal routes and page contents were not verified without signing in. |

## Portals and roles

The public page describes these areas; it does not establish their exact permission boundaries. Role identifiers come from the API's `User.role` enum.

| Portal / area | Roles | Evidence and scope |
| --- | --- | --- |
| Patient | `patient` | Public page advertises bookings, video visits, messages, lab results and prescription refills. |
| Clinical | `doctor`, `nurse` | Both appear in demo accounts; public page advertises clinician schedules, charts, e-prescribing and referrals. Per-role access unverified. |
| Front desk | `frontdesk` | Demo role is listed; specific portal and permissions unverified. |
| Operations | `admin` | Demo role is listed; public page advertises locations, roles, audit trail and feature flags. |
| Audit | `auditor` | API schema lists this role; no auditor demo account or portal was visible on the public pages. |

## API groups

Paths below are relative to `/api`; braces denote path parameters. These are documented capabilities, not executed operations. The specification defaults to Bearer JWT or a `pp_session` cookie; explicit public exceptions include health, OpenAPI, the test mailbox and auth operations other than `auth/me`. It does not specify role-by-role permissions.

| Groups (OpenAPI tags) | Paths / families | Purpose |
| --- | --- | --- |
| `health`, `openapi.json`, `auth`, `dev` | `/health`, `/openapi.json`, `/auth/{login,resend,verify,signup,me,logout}`, `/dev/mailbox` | Service status, API contract, account/session and MFA flow, test inbox. |
| `clinics`, `providers`, `directory` | `/clinics`, `/clinics/{id}`, `/clinics/nearest`, `/providers`, `/providers/{id}`, `/providers/{id}/slots`, `/directory` | Location/provider discovery and maintenance, availability, directory. |
| `appointments`, `schedule`, `visits`, `copay` | `/appointments`, `/appointments/{id}`, `/schedule`, `/visits/{id}/{join,status}`, `/copay` | Booking, appointment updates, schedules, virtual visits and copay quotes. |
| `patients`, `labs`, `lab-orders`, `vitals` | `/patients`, `/patients/{id}`, `/patients/{id}/notes`, `/labs`, `/lab-orders`, `/vitals/history` | Patient records, notes, lab results/orders and vital history. |
| `prescriptions`, `formulary`, `referrals` | `/prescriptions`, `/prescriptions/{id}/refill`, `/formulary`, `/referrals` | Prescribing, refills, medication catalog and referrals. |
| `messages`, `assistant` | `/messages`, `/assistant/stream` | Messaging and assistant stream. |
| `insurance-cards`, `insurance`, `bills` | `/insurance-cards`, `/insurance/eligibility`, `/bills`, `/bills/{id}/pay` | Insurance cards, eligibility, bills and payments. |
| `visit-summaries`, `documents`, `intake`, `consents` | `/visit-summaries/{id}`, `/documents`, `/documents/{id}`, `/intake`, `/consents` | Visit summaries, document management, intake and consent submission. |
| `admin`, `users`, `audit`, `flags`, `me` | `/admin/{kpis,visits-series,reset-demo,claims}`, `/users`, `/users/{id}`, `/audit`, `/audit/history`, `/flags`, `/flags/{key}`, `/me/faults` | Reporting, demo reset, user management, audit history, feature flags and training fault controls. |

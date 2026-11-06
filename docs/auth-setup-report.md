# Authentication setup verification

- The setup project signs in the Silver patient once using environment credentials and a fresh test-inbox code, then saves `.auth/silver-patient.json`.
- Chromium depends on setup and loads that saved state. Tests no longer authenticate individually.
- Missing Silver credentials fail immediately with the variable name and no fallback. `.env.example` lists names without values. `.env` was not opened or printed during this work; the test process loads it at runtime.
- Setup traces, screenshots and video are disabled to avoid capturing credentials or inbox codes. `.auth/` remains git-ignored.
- Booking slots are partitioned by their immutable start timestamp and the stable worker parallel index. Distinct workers cannot select the same timestamp within a run. A depleted partition fails explicitly rather than borrowing another worker's slot.
- Protected business-rule assertions remain unchanged.

## Results

- `npm run verify`: passed (TypeScript, test gates, agent rules).
- `npx playwright test tests/smoke tests/booking --workers=2`: **4 passed in 23.1 seconds** (one setup, one smoke, two booking).
- Synthetic partition check across 1,440 timestamps with 2, 3, 4 and 8 workers: passed; no overlap and every partition populated.

The existing booking suite contains one test that confirms a visit and one price-only test. The browser run used two workers; simultaneous booking confirmations are not currently covered by that suite. Independent Playwright invocations sharing the same account and state file are outside this within-run partition guarantee.

Changes are left uncommitted for human review.

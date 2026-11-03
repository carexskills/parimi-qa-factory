# Drift report

Generated: 2026-11-03T16:20:44.531Z

| check | uat | prod-sim | result |
| --- | --- | --- | --- |
| Container image | 13e9b61b5b2a | 13e9b61b5b2a | match |
| App version | 1.0.0 | 1.0.0 | match |
| Flag ai_visit_notes | enabled=0; variant=off; rollout=10 | enabled=0; variant=off; rollout=10 | match |
| Flag new_booking_flow | enabled=0; variant=off; rollout=0 | enabled=0; variant=off; rollout=0 | match |
| Flag portal_banner | enabled=1; variant=split; rollout=50 | enabled=1; variant=split; rollout=50 | match |
| Flag virtual_visits | enabled=1; variant=on; rollout=100 | enabled=1; variant=on; rollout=100 | match |
| Environment setting names | APP_ENV, COMPOSE_PROJECT_NAME, DATA_VOLUME, HOST_PORT, RESET_POLICY, SEED_VERSION (all 5 files match) | APP_ENV, COMPOSE_PROJECT_NAME, DATA_VOLUME, HOST_PORT, RESET_POLICY, SEED_VERSION (all 5 files match) | match |

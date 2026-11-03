# Drift policy (plain English)

What must match between uat and prod-sim. One rule per line.
uat and prod-sim run the same app image digest.
The feature flags in uat match prod-sim exactly.
The app version from the health check is the same.
Every environment file has the same setting names; only the values may differ.

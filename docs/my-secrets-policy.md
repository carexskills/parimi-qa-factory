# Secrets policy (plain English)

One rule per line. People and agents follow them.
A secret never goes into a prompt, a log, a screenshot or git.
Environment files in git hold setting names and safe values only.
Secret values live in a local file that git ignores, or in the CI secret store.
Each environment has its own secrets; uat never uses the values of prod-sim.
Every push runs a secret scan, and a finding stops the push.

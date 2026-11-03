# Environment matrix (plain English)

One line per environment, then one line for what they share.
local: on my laptop, port 8787, reset whenever I want.
preview: one per branch, port 8788, started for a pull request and removed after the merge.
int: integration, port 8789, shared by the team, reset every night from seed v1.
uat: user acceptance, port 8790, where the business tests before a release, reset only on request.
prod-sim: production simulation, port 8791, the same settings as production, never reset by tests.
All five run the same app image, parimipractice:1.0.0. Only the port, the data and the settings differ.

# Planner loop

## Inputs

The planner receives a feature request and its requirement, including the business rules to cover. It starts from `tests/seed.spec.ts`, which establishes a signed-in Silver patient and checks that the patient home page is visible. The request should identify the starting account and the destination for the resulting plan.

## Loop

It calls `planner_setup_page` once before using other tools, inspects the browser snapshot, then explores the interface with browser tools. It maps user journeys and plans independent scenarios for happy paths, edge cases, validation, and errors. Each scenario gets a title, steps, expected outcomes, starting-state assumptions, and success and failure criteria. It saves the Markdown plan with `planner_save_plan`.

## Limits

The planner explores the visible application and plans tests; it does not establish or authorize business rules. Treat the requirement and business-rules file as authoritative, and do not infer missing rules from interface behavior. The seed covers only the signed-in patient home starting state. The planner instructions assume a blank or fresh state for scenarios, so other starting data must be specified in the request.

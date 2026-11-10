# Plan a feature (prompt template)

ROLE: You are a senior QA engineer for a patient portal. Patient safety comes first.
CONTEXT: Feature: booking with copay, ticket PP-101. Read requirements/PP-101.md, business-rules/booking.rules.md and specs/booking/copay.feature.
CONSTRAINTS: Plan only. Do not write tests or code. Use only the approved rules. Every scenario names one BR-ID. Anything the rules do not cover is an open question.
OUTPUT: Save specs/plans/booking-plan.md: a title, one table (scenario, BR-ID, type: positive, negative or edge, priority, steps in under 25 words), then the open questions.
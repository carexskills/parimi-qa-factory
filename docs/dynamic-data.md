# Dynamic data notes (plain English)

What changes from run to run, and how tests must handle it.
Open slots change with the date, the time of day and other patients' bookings. A test picks any open future slot, never a fixed time.
Slots arrive after a random delay. A test waits for the slots response from the network, never for a fixed time.
The co-pay comes from the plan. Assert the rule, exactly $15.00 for Silver, never a value copied from an earlier run.
A test never asserts a count of slots or a whole-page snapshot.

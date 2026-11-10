Feature: Late cancellations go to the front desk (PP-102, proposed)

  @BR-BOOK-07
  Scenario: A patient can still cancel online exactly 2 hours before the visit
    Given a booked visit that starts in exactly 2 hours
    When the patient cancels it online
    Then the visit is cancelled and the slot opens again

  @BR-BOOK-08
  Scenario: Online cancellation is closed in the last 2 hours
    Given a booked visit that starts in 1 hour and 59 minutes
    When the patient opens the visit
    Then there is no Cancel button
    And the patient sees the front desk phone number
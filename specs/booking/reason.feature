Feature: Booking reason

  @BR-BOOK-06
  Scenario: An empty reason defaults to General visit
    Given a signed-in patient is booking a valid visit
    When they leave the reason empty and confirm the booking
    Then the booking reason is “General visit”

  @BR-BOOK-06
  Scenario: A reason containing only spaces defaults to General visit
    Given a signed-in patient is booking a valid visit
    When they enter a reason containing only spaces and confirm the booking
    Then the booking reason is “General visit”

  @BR-BOOK-06
  Scenario: A nonempty reason is retained
    Given a signed-in patient is booking a valid visit
    When they enter a distinctive reason and confirm the booking
    Then the booking reason matches the distinctive reason they entered

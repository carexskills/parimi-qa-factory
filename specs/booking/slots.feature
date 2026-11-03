Feature: Open slots, one patient per slot

  @BR-BOOK-02
  Scenario: A second patient cannot book a slot that is already taken
    Given patient A has booked a slot with a provider
    When patient B tries to book the same slot
    Then patient B is refused with a clear message
    And only patient A has a booking for that slot

  @BR-BOOK-01
  Scenario: A slot in the past cannot be booked
    Given a slot that started yesterday
    When a patient tries to book it
    Then the booking is refused
    And no appointment is created
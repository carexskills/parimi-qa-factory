Feature: Silver copay for a standard visit

  @BR-BOOK-04
  Scenario: A Silver patient sees the same copay at every step
    Given a patient on the Silver plan
    When they book a standard visit
    Then the copay before booking is $15.00
    And the confirmation shows a copay of $15.00
    And the receipt shows a copay of $15.00
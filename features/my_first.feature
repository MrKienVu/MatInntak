Feature: Counter

  Scenario: As a user I can increment the first counter
    When I press "Press here to increment."
    Then I see the text "My first value is: 1"

  Scenario: As a user I can decrement the second counter
    When I press "Press here to decrement."
    Then I see the text "My second value is: -1"

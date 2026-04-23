Feature: Add User

  Scenario: User input successfully
    Given I am logged on and access the user page
    And I click add user button
    When I enter valid user information with name "Daniel R" and email "daniel@email.com"
    And I click Save User
    Then I should be redirected to the user page
    And I should see "Daniel R" in user list table
    Then the user list should display the formatted email for "daniel@email.com"

  Scenario: User does not fill email
    Given I am logged on and access the user page
    And I click add user button
    When I do not enter any email
    And I click Save User
    Then I should get browser validation

  Scenario: User enter wrong format of email
    Given I am logged on and access the user page
    And I click add user button
    When I enter email wrong
    And I click Save User
    Then I should get browser validation

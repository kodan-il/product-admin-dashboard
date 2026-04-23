Feature: Add User

  Scenario: User input successfully
    Given I am logged on and access the user page
    And I click add user button
    When I enter valid user information
    And I click Save User
    Then I should be redirected to the user page
    And I should see "testingUser" in user list table

  Scenario: User does not fill email
    Given I am logged on and access the user page
    And I click add user button
    When I do not enter any email
    And I click Save User
    Then I should get browser validation

  Scenario: User enter wrong formal of email
    Given I am logged on and access the user page
    And I click add user button
    When I enter email wrong
    And I click Save User
    Then I should get browser validation

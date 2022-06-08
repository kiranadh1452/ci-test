Feature: login

    As a user
    I want to login to my joomla account
    So that only I can access my account

    Background:
      Given the user has browsed to the login page

    Scenario Outline: Login with invalid credentials
      When the user tries to log in using username '<username>' and password '<password>'
      Then the user should see the message 'Username and password do not match or you do not have an account yet.'
      Examples:
        | username  | password |
        | valid     | invalid  |
        | invalid   | invalid  |
        | invalid   | valid    |
        
    Scenario: Login with valid credentials      
      When the user tries to log in using username 'valid' and password 'valid'
      Then the user should be on the Homepage

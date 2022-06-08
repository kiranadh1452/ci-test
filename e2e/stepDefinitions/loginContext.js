const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");
const { getInnerText, getAlphaNumeric } = require("../utils.js");

const HomePage = require("../pageObjects/HomePage.js");
const LoginPage = require("../pageObjects/LoginPage.js");

const homePage = new HomePage();
const loginPage = new LoginPage();

Given("the user has browsed to the login page", async function () {
  await loginPage.browseToLoginPage();
});

When(
  "the user tries to log in using username {string} and password {string}",
  async function (username, password) {
    if (username === "valid") username = loginPage.credentials.id
    if (password === "valid") password = loginPage.credentials.pswd;

    await loginPage.login(username, password);
  }
);

Then("the user should be on the Homepage", async function () {
  let headingText = await getInnerText(homePage.titleSelector);
  let pageTitle = getAlphaNumeric(homePage.staticValues.heading);
  headingText = getAlphaNumeric(headingText);

  assert.equal(headingText, pageTitle, "The user expected to be on the Homepage but is not");
});

Then("the user should see the message {string}", async function (errorMsg) {
  const msgText = await loginPage.getErrorMsg();

  assert.equal(msgText, errorMsg, `Expected error message: ${errorMsg} but found ${msgText}`);
});

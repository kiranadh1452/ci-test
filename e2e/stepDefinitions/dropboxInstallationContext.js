const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");
const { getInnerText, getAlphaNumeric} = require("../utils.js");

const HomePage = require("../pageObjects/HomePage.js");
const LoginPage = require("../pageObjects/LoginPage.js");

const homePage = new HomePage();
const loginPage = new LoginPage();

Given("the user has logged in", async function () {
  await loginPage.browseToLoginPage();
  await loginPage.login(loginPage.credentials.id, loginPage.credentials.pswd);

  let titleText = await getInnerText(homePage.titleSelector);
  titleText = getAlphaNumeric(titleText);
  const headingText = getAlphaNumeric(homePage.values.headingText);

  assert.equal(
    titleText,
    headingText,
    "User expected to be on the Homepage but is not"
  );
});

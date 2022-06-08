const { clickOnElement } = require("../utils.js");
const { MAIN_URL, JOOMLA_ID, JOOMLA_PSWD } = require("../cucumber.config.js");

class LoginPage {
  constructor() {
    this.adminPageUrl = MAIN_URL;
    this.loginLogoSelector = "#element-box img";

    this.msgSelector = ".alert-message";
    this.loginButtonSelector = ".login-button";
    this.unameSelector = "#mod-login-username";
    this.passwordSelector = "#mod-login-password";

    this.credentials = {
      id: JOOMLA_ID,
      pswd: JOOMLA_PSWD,
    };
  }

  /**
   * Function to visit the Joomla Admin Page
   */
  async browseToLoginPage() {
    await page.goto(this.adminPageUrl);

    const logoLocator = await page.locator(this.loginLogoSelector);
    await expect(logoLocator).toBeVisible();
  }

  /**
   * Function to login to the Joomla admin page
   * @param {string} username - Joomla Account Username
   * @param {string} password - Joomla Account Password
   */
  async login(username, password) {
    await page.fill(this.unameSelector, username);
    await page.fill(this.passwordSelector, password);

    await clickOnElement(this.loginButtonSelector);
  }

  /**
   * Function to get error message that is shown for invalid login credentials
   * @return {string} Error message on invalid login
   */
  async getErrorMsg() {
    const msgLocator = await page.locator(this.msgSelector);
    const msgText = await msgLocator.innerText();

    return msgText;
  }
}
module.exports = LoginPage;

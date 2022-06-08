const { clickOnElement } = require("../utils.js");
const { DROPBOX_PSWD, DROPBOX_EMAIL } = require("../cucumber.config.js");

class DropboxAuthPage {
    constructor()
    {
        this.tokenFieldSelector = "#auth-code input";
        this.accessGrantSelector = "button[name='allow_access']";
        this.emailFieldSelector = "div input[name='login_email']";
        this.passwordFieldSelector = "div input[name='login_password']";
        this.loginButtonSelector =
        "button.login-button.signin-button.button-primary";
        this.url =
        "https://www.dropbox.com/oauth2/authorize?client_id=qea2qg672mampkw&response_type=code";
        this.credential = {
            email: DROPBOX_EMAIL,
            password: DROPBOX_PSWD,
        };
    }

    /**
     * Function to login to the Dropbox account
     *
     * @param {page} pageInstance - Dropbox authentication page
     * @param {string} email - Email Id
     * @param {string} password - Password for login
     */
    async loginToDropboxAccount(pageInstance, email, password)
    {
        await pageInstance.fill(this.emailFieldSelector, email);
        await pageInstance.fill(this.passwordFieldSelector, password);

        await clickOnElement(this.loginButtonSelector, pageInstance);
    }

    /**
     * Function to receive the token (required for granting access) after authorizing dropbox user account
     *
     * @param  {page} pageInstance - Dropbox authentication page
     * @return {string} Token value
     */
    async getToken(pageInstance)
    {
        await clickOnElement(this.accessGrantSelector, pageInstance); // accessing dropbox more often requires two click to verify as a human.

        //getting the token value for later use
        const tokenFieldLocator = await pageInstance.locator(
            this.tokenFieldSelector
        );
        const token = await tokenFieldLocator.inputValue();

        return token;
    }
}
module.exports = DropboxAuthPage;

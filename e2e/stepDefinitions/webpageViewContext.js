const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");
const { getVisibility, getInnerText, getAlphaNumeric } = require("../utils.js");

const DropboxView = require("../pageObjects/DropboxView.js");
const DropboxAuthPage = require("../pageObjects/DropboxAuthPage.js");
const DropboxJoomlaHomePage = require("../pageObjects/DropboxJoomlaHomePage.js");

let dropboxView;
const dropboxAuthPage = new DropboxAuthPage();
const dropboxJoomlaHomePage = new DropboxJoomlaHomePage();

Given(
  "the user has successfully created a dropbox folder as {string}",
  async function (folderName) {
    await dropboxJoomlaHomePage.clickOnNewBtn();

    // Checking whether the user sees the content of 'New Dropbox' page
    await checkForNewDropboxPage(dropboxJoomlaHomePage);

    // fill up folder name
    await dropboxJoomlaHomePage.fillFolderNameField(folderName);

    // clicking on the save button makes the connect button visible
    await dropboxJoomlaHomePage.clickOnSaveBtn();

    // check whether the connect button is visible
    const isConnectBtnVisible = await getVisibility(
      dropboxJoomlaHomePage.editPage.connectBtnSelector
    );
    assert.equal(
      isConnectBtnVisible,
      true,
      "Expected Connect button to be visible but is not"
    );

    // getting token from dropbox
    let token = await getTokenFromDropbox(dropboxAuthPage);

    // fill the obtained token in the token filed
    await page.fill(dropboxJoomlaHomePage.editPage.tokenFieldSelector, token);

    //click on `Save&Close` button
    await dropboxJoomlaHomePage.clickOnSaveAndClose();

    await checkPreviewBtnVisibility(folderName);
  }
);

When(
  "the user previews the page for the folder {string} using the webUI",
  async function (folderName) {
    const idValue = await dropboxJoomlaHomePage.getIdFromFolderName(folderName);

    dropboxView = new DropboxView(idValue);
    await dropboxJoomlaHomePage.clickOnPreviewBtn(folderName);
  }
);

Then("the user should be in the preview page", async function () {
  const visibility = await getVisibility(dropboxView.titleSelector);
  assert.equal(
    visibility,
    true,
    "User expected to be on the preview page but is not"
  );

  const pageStatus = await dropboxView.checkIfContentLoads();
  assert.equal(
    pageStatus,
    true,
    "Error in fetching the content of the preview page"
  );
});

/**
 * Helper function to check the visibility of preview btn for a folder
 */
async function checkPreviewBtnVisibility(folderName) {
  const visibility = await dropboxJoomlaHomePage.checkPreviewBtnVisibility(
    folderName
  );

  assert.equal(
    visibility,
    true,
    `Expected Preview button to be visible but is not visible for the folder ${folderName}`
  );
}

/**
 * Helper function that returns a token after authenticating with dropbox
 * @param {object} dropboxAuthPage - Object representing the dropbox authentication page object
 * @return {string} Auth code or token received after authentication
 */
async function getTokenFromDropbox(dropboxAuthPage) {
  let newPage = await context.newPage();
  await newPage.goto(dropboxAuthPage.url);

  await dropboxAuthPage.loginToDropboxAccount(
    newPage,
    dropboxAuthPage.credential.email,
    dropboxAuthPage.credential.password
  );

  let token = await dropboxAuthPage.getToken(newPage);
  await newPage.close();

  return token;
}

/**
 * Helper functions ensuring that the user is in `New Dropbox` page
 * @param {object} dropboxJoomlaHomePage - Object representing the dropbox-joomla integration home page object
 */
async function checkForNewDropboxPage(dropboxJoomlaHomePage) {
  // Checking whether the user sees the content of 'New Dropbox' page
  let headingText = await getInnerText(dropboxJoomlaHomePage.titleSelector);
  let pageTitle = getAlphaNumeric(dropboxJoomlaHomePage.staticValues.heading);
  headingText = getAlphaNumeric(headingText);
  assert.equal(
    headingText,
    pageTitle,
    "User expected to be on the `Dropbox[New]` page, but is not"
  );
}

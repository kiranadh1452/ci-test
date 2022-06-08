const { Given, When, Then } = require("@cucumber/cucumber");

const assert = require("assert");
const { getVisibility, getInnerText, getAlphaNumeric } = require("../utils.js");

const HomePage = require("../pageObjects/HomePage.js");
const DropboxAuthPage = require("../pageObjects/DropboxAuthPage.js");
const DropboxJoomlaHomePage = require("../pageObjects/DropboxJoomlaHomePage.js");

const homePage = new HomePage();
const dropboxAuthPage = new DropboxAuthPage();
const dropboxJoomlaHomePage = new DropboxJoomlaHomePage();

Given("the user has browsed to the Dropbox Page", async function () {
  await homePage.clickOnComponentsSection();
  await homePage.clickOnDropboxSection();

  // checking whether dropbox page is the current page
  let headingText = await getInnerText(dropboxJoomlaHomePage.titleSelector);
  let pageTitle = getAlphaNumeric(
    dropboxJoomlaHomePage.staticValues.homeHeading
  );
  headingText = getAlphaNumeric(headingText);

  assert.equal(
    headingText,
    pageTitle,
    "User expected to be on Dropbox Page, but the observed page title do not match with the expected page title."
  );
});

When(
  "the user creates a new dropbox folder as {string}",
  async function (folderName) {
    await dropboxJoomlaHomePage.clickOnNewBtn();

    // fill up folder name
    await dropboxJoomlaHomePage.fillFolderNameField(folderName);
  }
);

When("the user saves it without connecting to dropbox", async function () {
  await dropboxJoomlaHomePage.clickOnSaveAndClose();
});

When(
  "the user connects to the dropbox account and saves the folder",
  async function () {
    // clicking on the save button makes the connect button visible
    await dropboxJoomlaHomePage.clickOnSaveBtn();

    // check whether the connect button is visible
    const isConnectBtnVisible = await getVisibility(
      dropboxJoomlaHomePage.editPage.connectBtnSelector
    );
    assert.equal(isConnectBtnVisible, true, "Expected Connect button to be visible but is not");

    // getting token from dropbox
    let newPage = await context.newPage();
    await newPage.goto(dropboxAuthPage.url);
    await dropboxAuthPage.loginToDropboxAccount(
      newPage,
      dropboxAuthPage.credential.email,
      dropboxAuthPage.credential.password
    );
    let token = await dropboxAuthPage.getToken(newPage);
    await newPage.close();

    // fill the obtained token in the token filed
    await page.fill(dropboxJoomlaHomePage.editPage.tokenFieldSelector, token);

    //click on `Save&Close` button
    await dropboxJoomlaHomePage.clickOnSaveAndClose();
  }
);

Then(
  "the connection status for {string} should be {string}",
  async function (folderName, connectionStatus) {
    //first, check if the folder itself is visible or not
    const selectorForFolder = format(
      dropboxJoomlaHomePage.boxes.folderSelectorByName,
      folderName
    );
    const isFolderVisible = await getVisibility(selectorForFolder);
    assert.equal(
      isFolderVisible,
      true,
      `Expected folder ${folderName} to be visible but is not`
    );

    // then, check the status for connection
    const status = await dropboxJoomlaHomePage.getConnectionStatusForFolder(
      folderName
    );

    assert.equal(
      status,
      connectionStatus,
      `Expected Connection status for the folder to be ${connectionStatus} but found ${status}`
    );
  }
);

Then(
  "the user {string} see the preview button for {string}",
  async function (preference, folderName) {
    const isVisible = await dropboxJoomlaHomePage.checkPreviewBtnVisibility(
      folderName
    );

    if (preference === "should") {
      assert.equal(isVisible, true, `Expected Preview button to be visible but found not visible for the folder ${folderName}`);
    }

    if (preference === "should not") {
      assert.equal(isVisible, false, `Expected Preview button to be invisible but found visible for the folder ${folderName}`);
    }
  }
);

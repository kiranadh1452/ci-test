const { getVisibility } = require("../utils.js");
const { ROOT_URL, TEST_ID } = require("../cucumber.config.js");

class DropboxView {
  constructor(id = TEST_ID) {
    this.dropboxId = id;
    this.baseUrl = `${ROOT_URL}index.php?option=com_dropbox&id=${this.dropboxId}`;

    this.titleSelector = ".site-title";
    this.mainContentSelector = "#content";
    this.mainMenuSelector = ".well._menu";
    this.pageHeaderSelector = ".page-header";
  }

  /**
   * Function to visit the preview page
   */
  async viewWebpage() {
    await page.goto(this.baseUrl);
  }

  /**
   * Function to check whether the page content has loaded successfully or not
   * Upon token expiry, the page would load but the menu will not load
   * @return {bool} Status for whether the menu is loaded or not
   */
  async checkIfContentLoads() {
    return getVisibility(this.mainMenuSelector);
  }
}

module.exports = DropboxView;

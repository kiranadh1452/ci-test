const { getVisibility, getInnerText, clickOnElement } = require("../utils.js");

class DropboxJoomlaHomePage {
  constructor() {
    this.staticValues = {
      heading: "Dropbox: [New]",
      homeHeading: "Dropbox Manager",
    };
    this.titleSelector = "//h1[@class='page-title']";
    this.toolbar = {
      newBtn: "#toolbar-new button",
      editBtn: "#toolbar-edit button",
      deleteBtn: "#toolbar-delete button",
      options: "#toolbar-options button",
    };
    this.editPage = {
      tokenFieldSelector: "#jform_dropbox_secret",
      folderNameSelector: "#jform_folder",
      saveAndCloseBtnSelector: "#toolbar-save button",
      connectBtnSelector: "#toolbar-arrow-right-4 button",
      formTitleSelector: "//h1[@class='page-title']/small",
      saveBtnSelector: "//div[@id='toolbar-apply']/button",
    };

    this.boxes = {
      folderSelectorByName: "//a[contains(text(), '%s')]",
      rowSelectorByName: "//a[contains(text(), '%s')]/ancestor::tr",
      rowSelectorById: "//input[@value='%s']/ancestor::tr",
      connectionSelector: "/td[contains(text(),'Connected')]", // this is to be appended after the row selection
      previewSelector: "//span/parent::a",
    };

    this.folderSelectorByName = "//a[contains(text(),'%s')]";
  }

  // click on `New` button
  async clickOnNewBtn() {
    await clickOnElement(this.toolbar.newBtn);
  }

  // click on `Edit` button
  async clickOnEditBtn() {
    await clickOnElement(this.toolbar.editBtn);
  }

  // click on `Delete` button
  async clickOnDeleteBtn() {
    await clickOnElement(this.toolbar.deleteBtn);
  }

  // click on `Options` button
  async clickOnOptionsBtn() {
    await clickOnElement(this.toolbar.options);
  }

  /**
   * Function to fill 'folder name' in the folder field
   * @param {string} folderName - Name of the folder
   */
  async fillFolderNameField(folderName) {
    await page.fill(this.editPage.folderNameSelector, folderName);
  }

  // click on `Save & Close` button
  async clickOnSaveAndClose() {
    await clickOnElement(this.editPage.saveAndCloseBtnSelector);
  }

  // click on `Save` button
  async clickOnSaveBtn() {
    await clickOnElement(this.editPage.saveBtnSelector);
  }

  // click on `Connect` button
  async clickOnConnectBtn() {
    await clickOnElement(this.editPage.connectBtnSelector);
  }

  /**
   * Function to get the selector for an entire row using the folder name
   * @param {string} folderName - Name of folder
   * @return {string} Selector value for the row containing folder name
   */
  getRowSelectorByFolderName(folderName) {
    return format(this.boxes.rowSelectorByName, folderName);
  }

  /**
   * Function to get the selector for an entire row using the folder id
   * @param {string} folderId - Id of the folder
   * @return {string} Selector value for the row containing folder id
   */
  getRowSelectorById(folderId) {
    return format(this.boxes.rowSelectorById, folderId);
  }

  /**
   * Function to get the id value from the name of the folder
   * @param {string} folderName - Name of the folder
   * @return {string} Id value of that folder
   */
  async getIdFromFolderName(folderName) {
    const selectorValue = format(this.boxes.folderSelectorByName, folderName);
    const folderLocator = await page.locator(selectorValue);

    // get the url for the folder (this url is of editing the folder)
    // The format of the url is => `******/index.php?option=com_dropbox&task=dropbox.edit&id=ID_NUMBER` where ID_NUMBER is the allotted id number
    const urlForFolder = await folderLocator.getAttribute("href");

    // on splitting the url by '&id=' , we get an array where the last element is the id value
    const arrayContainingId = urlForFolder.split("&id=");
    return arrayContainingId[arrayContainingId.length - 1];
  }

  /**
   * Function to check the connection status of the folder (whether it is connected to dropbox account or not)
   * @param {string} folderName - Name of the folder for which we want to check the connection
   * @return {string} Connection status
   */
  async getConnectionStatusForFolder(folderName) {
    const rowSelector = this.getRowSelectorByFolderName(folderName);
    const connectionStatusSelector =
      rowSelector + this.boxes.connectionSelector;

    return getInnerText(connectionStatusSelector);
  }

  /**
   * Function to check the visibility of preview button for a particular folder
   * @param {string} folderName - Name of the folder
   * @return {boolean} Returns visibility of the preview button
   */
  async checkPreviewBtnVisibility(folderName) {
    const rowSelector = this.getRowSelectorByFolderName(folderName);
    return this.checkPreviewBtnFromRow(rowSelector);
  }

  /**
   * Function to check the visibility of preview button for a particular folder id
   * @param {number} folderId - Id of the folder
   * @return {boolean} Returns visibility of the preview button
   */
  async checkPreviewBtnForId(folderId) {
    const rowSelector = this.getRowSelectorById(folderId);
    return this.checkPreviewBtnFromRow(rowSelector);
  }

  /**
   * Function to check the visibility of preview button for a particular folder id
   * @param {string} rowSelector - Selector value for a particular row
   * @return {boolean} Returns visibility of the preview button in that row
   */
  async checkPreviewBtnFromRow(rowSelector) {
    const previewBtnSelector = rowSelector + this.boxes.previewSelector;
    return getVisibility(previewBtnSelector);
  }

  /**
   * Function to click on the preview button for a folder
   * @param {string} folderName - Name of the folder
   */
  async clickOnPreviewBtn(folderName) {
    const rowSelector = this.getRowSelectorByFolderName(folderName);
    await clickOnElement(rowSelector + this.boxes.previewSelector);

    [page] = await Promise.all([
      context.waitForEvent("page"),
      clickOnElement(rowSelector + this.boxes.previewSelector),
    ]);

    await page.waitForLoadState();
  }
}

module.exports = DropboxJoomlaHomePage;

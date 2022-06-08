const { clickOnElement } = require("../utils.js");

class HomePage {
    constructor()
    {
        this.staticValues = {
            heading: "Control Panel",
            extensionManageHeading: "Extensions: Manage",
            extensionInstallHeading: "Extensions: Install",
        };
        this.titleSelector = "//h1[@class='page-title']";
        this.componentSelector =
        "//ul[@id='menu']//a[contains(text(), 'Components')]";
        this.dropboxComponentSelector =
        "//ul[@id='menu']//a[contains(text(), 'Dropbox')]";
        this.extensionSelector = "//ul[@id='menu']//a[text()= 'Extensions ']";

        // this will only work when the `Extension` is clicked and dropdown menu is loaded
        this.manageExtensionSelector =
        "//li[@class='dropdown open']/ul/li/a[text()='Manage']";

        this.values = {
            headingText: "Control Panel",
        };

        this.manageExtensionPage = {
            uploadMenuSelector: "a[href='#package']",
            uploadFieldSelector: "//*[@id='package']",
            inputFieldSelector: "//*[@id='install_package']",
            installSelector: "//*[@id='submenu']/li/a[text()='Install']",
        };
    }

    /**
     * Function to get the heading of the page
     *
     * @return {string} Heading / title of page
     */
    async getPageTitle()
    {
        const headingLocator = await page.locator(this.titleSelector);
        const headingText = await headingLocator.innerText();

        return headingText;
    }

    /**
     * Function to click on `Components` menu
     */
    async clickOnComponentsSection()
    {
        await clickOnElement(this.componentSelector);
    }

    /**
     * Function to click on `Extensions` menu
     */
    async clickOnExtensionsSection()
    {
        await clickOnElement(this.extensionSelector);
    }

    /**
     * Function to click on `Dropbox` sub-menu
     */
    async clickOnDropboxSection()
    {
        await clickOnElement(this.dropboxComponentSelector);
    }

    /**
     * Function to click on `Install` inside the `Extensions` option
     */
    async clickOnManageSection()
    {
        await clickOnElement(this.manageExtensionSelector);
    }

    /**
     * Function to click on `Install` option
     */
    async clickOnInstallExtension()
    {
        await clickOnElement(this.manageExtensionPage.installSelector);
    }

    /**
     * uploads an extension file in joomla for installation
     */
    async uploadExtensionFile(pathForFile)
    {
        const inputFieldLocator = await page.locator(
            this.manageExtensionPage.inputFieldSelector
        );
        await inputFieldLocator.setInputFiles(pathForFile);
    }
}
module.exports = HomePage;

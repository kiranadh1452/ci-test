// Step 1: Bring in the env variables and make them global
require("dotenv").config();
const util = require("util");
const { chromium } = require("playwright");
const { expect } = require("@playwright/test");
const { urlFormatter } = require("./utils.js");
const {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
} = require("@cucumber/cucumber");

updateConfigData();
setDefaultTimeout(100 * 1000);

//setting up global parameters for use
function updateConfigData() {
  global.expect = expect;
  global.format = util.format;

  ROOT_URL = urlFormatter(process.env.ROOT_URL);
  MAIN_URL = global.ROOT_URL + "administrator/";

  JOOMLA_ID = process.env.JOOMLA_ID;
  JOOMLA_PSWD = process.env.JOOMLA_PSWD;
  DROPBOX_PSWD = process.env.DROPBOX_PSWD;
  DROPBOX_EMAIL = process.env.DROPBOX_EMAIL;

  TEST_ID = process.env.DROPBOX_TEST_ID;
  PATH_FOR_FILES = process.env.PATH_FOR_FILES;

  JOOMLA_DB_HOST = process.env.JOOMLA_DATA_BASE_HOST;
  JOOMLA_DB_USER = process.env.JOOMLA_DATA_BASE_USER;
  JOOMLA_DB_PSWD = process.env.JOOMLA_DATA_BASE_PSWD;
  JOOMLA_DB_NAME = process.env.JOOMLA_DATA_BASE_NAME;
  JOOMLA_DB_TABLE = process.env.JOOMLA_DATA_BASE_TABLE_PREFIX + "_dropbox"; // the table format is : prefix_dropbox
  JOOMLA_DB_TEST_ID = process.env.JOOMLA_DATA_BASE_TEST_ID;
}

BeforeAll(async function () {
  global.browser = await chromium.launch({
    headless: true,
    channel: "chrome",
  });
});

AfterAll(async function () {
  await global.browser.close();
});

Before(async function () {
  global.context = await global.browser.newContext();
  global.page = await global.context.newPage();
});

After(async function () {
  await global.page.close();
  await global.context.close();
});

module.exports = {
  ROOT_URL,
  MAIN_URL,
  JOOMLA_ID,
  JOOMLA_PSWD,
  DROPBOX_PSWD,
  DROPBOX_EMAIL,
  TEST_ID,
  PATH_FOR_FILES,
  JOOMLA_DB_HOST,
  JOOMLA_DB_USER,
  JOOMLA_DB_PSWD,
  JOOMLA_DB_NAME,
  JOOMLA_DB_TABLE,
  JOOMLA_DB_TEST_ID,
};

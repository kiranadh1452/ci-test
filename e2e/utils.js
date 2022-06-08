/**
 * Function to check whether an element is visible or not
 * @param {string} selectorValue - Selector which is used to locate the element
 * @return {boolean} returns true if the element is visible
 */
async function getVisibility(selectorValue, page = global.page) {
  const locatorValue = await page.locator(selectorValue);
  const visibility = await locatorValue.isVisible();

  return visibility;
}

/**
 * Function to find out all the inner-texts from an element
 * @param {string} selectorValue - Selector which is used to locate the element
 * @return {string} returns the inner-texts of the element
 */
async function getInnerText(selectorValue, page = global.page) {
  const locatorValue = await page.locator(selectorValue);
  const innerText = await locatorValue.innerText();

  return innerText;
}

/**
 * Function to remove all white-spaces from a string
 * @param {string} inputString - Input string that is to be formatted
 * @return {string} returns the formatted string
 */
function getAlphaNumeric(inputString) {
  let newString = inputString.replace(/\W/g, ""); // /W selects any non-alphanumeric values
  return newString;
}

/**
 * Function to automate click on an element
 * @param {string} selectorValue - Selector which is used to locate the element
 */
async function clickOnElement(selectorValue, page = global.page) {
  const locatorValue = await page.locator(selectorValue);
  await locatorValue.click();
}

/**
 * Function that formats the url
 * @param {string} inputUrl - URL given which could be formatted or not (eg: www.jankaritech.com)
 * @return {string} Formatted url  (eg: http://www.jankaritech.com/)
 */
function urlFormatter(inputUrl) {
  const httpPos = inputUrl.indexOf("http");

  if (httpPos === -1) {
    inputUrl = `http://${inputUrl}`;
  }

  const endChar = inputUrl[inputUrl.length - 1];

  if (endChar !== "/") {
    inputUrl += "/";
  }

  return inputUrl;
}

module.exports = {
  getVisibility,
  getInnerText,
  urlFormatter,
  getAlphaNumeric,
  clickOnElement,
};

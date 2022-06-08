const { chromium } = require("playwright");

const install = async () => {
  browser = await chromium.launch({
    headless: true,
    channel: "chrome",
  });
  context = await browser.newContext();
  page = await context.newPage();

  await page.goto("http://localhost:8080");
  await page.fill("#jform_site_name", "CI_TEST");

  await page.fill("#jform_admin_email", "newuser1452@gmail.com");

  await page.fill("#jform_admin_user", "kiranadh");

  await page.fill("#jform_admin_password", "kiranadh1234");
  await page.fill("#jform_admin_password2", "kiranadh1234");

  const nextBtnLocator = await page.locator(
    "(//a[@class='btn btn-primary'])[1]"
  );
  await nextBtnLocator.click();

  await page.fill("#jform_db_host", "joomladb");

  await page.fill("#jform_db_user", "root");

  await page.fill("#jform_db_pass", "kiran12345");
  await page.fill("#jform_db_name", "joomladb");
  await page.fill("#jform_db_prefix", "kiran_");
  await nextBtnLocator.click();
  await nextBtnLocator.click();

  const removeInstallationFolderBtn = await page.locator("input.btn");
  await removeInstallationFolderBtn.click();

  await page.locator("(//a[@class='btn btn-primary'])[2]").click();
  page.pause();

  await page.close();
  await context.close();
  await browser.close();
};

install();

// await page.fill("#jform_site_name", "CI_TEST");
// await page.fill("#jform_site_name", "CI_TEST");
// await page.fill("#jform_site_name", "CI_TEST");
// await page.fill("#jform_site_name", "CI_TEST");

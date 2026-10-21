import { test,expect } from '@playwright/test';

test('link opens in a new tab', async ({ page, context }) => {
  test.setTimeout(60000);
 await page.goto('https://opensource-demo.orangehrmlive.com/', {
  waitUntil: 'domcontentloaded',
  timeout: 60000
});
 
   // Wait for the new tab and click the link together
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('link', { name: 'OrangeHRM, Inc' }).click()
  ]);

  // Wait for the new tab to load
  await newPage.waitForLoadState('domcontentloaded');

  //Print new page title
  console.log('New tab title:',  await newPage.title());
  const pageTitleHeading =  newPage.locator('.page-title h1').first();
  await expect(pageTitleHeading).toContainText('Streamline All Your HR Needs');

  //Switch back to the original tab and perform actions
  await page.bringToFront();
   const userNameInput = page.locator('input[name="username"]');
   await userNameInput.fill('Admin');

  //Close new Page 
  await newPage.close();
});
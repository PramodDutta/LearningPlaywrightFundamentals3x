import { expect, test } from '@playwright/test';

test('link opens in a new window', async ({ page }) => {

   test.setTimeout(60000);
  // A button that opens a separate popup window (with its own size)
  await page.setContent(`
    <button onclick="window.open('https://www.orangehrm.com', '_blank', 'width=600,height=400')">
      Open Window
    </button>
  `);

  // Start listening for the popup BEFORE clicking
  const popupPromise = page.waitForEvent('popup');

  // Click the button
  await page.getByRole('button', { name: 'Open Window' }).click();

  // Grab the popup window
  const popupWindowPage = await popupPromise;
  await popupWindowPage.waitForLoadState('domcontentloaded');

  console.log('Popup title:', await popupWindowPage.title());

  // Perform actions in the popup window
  const pageTitleHeading =  popupWindowPage.locator('.page-title h1').first();
  await expect(pageTitleHeading).toContainText('Streamline All Your HR Needs');
    

  // Close it
  await popupWindowPage.close();

  // Switch back to the original page and do some assertions
  await page.bringToFront();
  await expect(page.getByRole('button', { name: 'Open Window' })).toBeVisible();
});
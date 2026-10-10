import { test, expect } from '@playwright/test';

test.describe('Scroll to Element - TestingAcademy', () => {

   test.beforeEach(async ({ page }) => {
      await page.goto('https://app.thetestingacademy.com/playwright/widgets/scroll');

   });
   test('scroll to view', async ({ page }) => {

      // 1
      // await page.getByTestId("deep-anchor").scrollIntoViewIfNeeded();
      // await page.getByTestId('deep-anchor').click();
      
      // 2 - JS execute
      // await page.evaluate(() => window.scrollBy(0, 1000));
      
      // // 3) jump to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      

       //    // // 4) jump back to top
      await page.evaluate(() => window.scrollTo(0, 0));



      await page.pause();




   });

});

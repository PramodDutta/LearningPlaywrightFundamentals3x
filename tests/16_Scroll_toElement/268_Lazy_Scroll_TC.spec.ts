import { test, expect } from '@playwright/test';

test.describe('Scroll to Element - TestingAcademy', () => {

   test.beforeEach(async ({ page }) => {
      await page.goto('https://app.thetestingacademy.com/playwright/widgets/scroll');

   });
   test('scroll to view', async ({ page }) => {


      // 5) lazy list grows past 10 once visible

      await page.getByTestId('section-lazy').scrollIntoViewIfNeeded();
      await page.getByTestId('lazy-list').scrollIntoViewIfNeeded();

      const list = page.getByTestId('lazy-list').locator('li');
      const initialCount = await list.count();

      // scroll the LAST existing item into view — item 11 does not exist yet,
      // so nth(10) would just wait until the test times out.
      await list.last().scrollIntoViewIfNeeded();


      await expect.poll(async () => list.count(), {
         message: "expected_itmes > 10",
         timeout: 10_000
      }).toBeGreaterThan(initialCount);

      const finalCount = await list.count();
      console.log(finalCount);

      await page.waitForTimeout(5000);

   });

});

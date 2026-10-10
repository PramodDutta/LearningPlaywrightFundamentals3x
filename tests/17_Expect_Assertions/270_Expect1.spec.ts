import { test, expect } from '@playwright/test';

test.describe('Scroll to Element - TestingAcademy', () => {

   test.beforeEach(async ({ page }) => {
      await page.goto('https://app.thetestingacademy.com/playwright/widgets/scroll');

   });
   test('Expect', async ({ page }) => {
      expect(1 + 2).toBe(3);
      let ac = false;
      expect(ac).toBeFalsy();
      expect(true).toBeTruthy();
      expect(null).toBeNull();
      expect(34).toBeGreaterThan(11);
      expect([1, 2, 3]).toEqual([1, 2, 3]);
      expect({ role: 'admin' }).toEqual({ role: 'admin' });
      expect({ age: 20, role: 'admin' }).toEqual({ role: 'admin', age: 20 });





   });

});

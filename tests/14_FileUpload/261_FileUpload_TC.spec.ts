import { test, expect, Locator } from '@playwright/test';
import path from 'path';

const URL = 'https://app.thetestingacademy.com/playwright/widgets/upload-download'; // replace with target page

test.describe('FileUpload handling', () => {

   test.beforeEach(async ({ page }) => {
      await page.goto(URL, { waitUntil: 'domcontentloaded' });
   });

   test('locate FileUpload and upload', async ({ page }) => {
      // File upload
      // Path of the file. - You should. A

      const filePath = path.join(__dirname, 'testdata.txt');
      console.log(filePath);
      // __dirname - Current working directory full path 
      await page.locator("#single-upload").setInputFiles([filePath]);
      await page.pause();

   });
});
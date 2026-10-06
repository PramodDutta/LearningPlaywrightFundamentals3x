import { test, expect, Locator } from '@playwright/test';
import path from 'path';

const URL = 'https://www.patternfly.org/components/file-upload/multiple-file-upload/';

test.describe('FileUpload handling', () => {

   test.beforeEach(async ({ page }) => {
      await page.goto(URL);
   });

   test('upload a PDF, a JPG and a DOC together', async ({ page }) => {

      // Three different MIME types in one call. With the path form Playwright
      // reads each file off disk and infers its Content-Type from the
      // extension, so nothing has to be declared by hand.
      //
      // This dropzone's accept attribute is:
      //   image/jpeg,.jpg,.jpeg,application/msword,.doc,application/pdf,.pdf,image/png,.png
      // so it takes .doc but silently drops .docx.
      const files = [
         path.join(__dirname, 'sample.pdf'),
         path.join(__dirname, 'sample.jpg'),
         path.join(__dirname, 'sample.doc'),
      ];
      files.forEach(f => console.log(f));

      await page.locator("div.pf-v6-c-multiple-file-upload input").setInputFiles(files);

      const uploadArea = page.locator('div.pf-v6-c-multiple-file-upload');
      await expect(uploadArea).toContainText('sample.pdf');
      await expect(uploadArea).toContainText('sample.jpg');
      await expect(uploadArea).toContainText('sample.doc');

      await page.pause();
   });
});

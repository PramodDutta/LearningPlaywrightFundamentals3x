import { test, expect, Locator } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const URL = 'https://www.patternfly.org/components/file-upload/multiple-file-upload/';

/**
 * Same upload as 264, but the fixtures live OUTSIDE this folder, in a shared
 * test-data/uploads/ directory at the repo root:
 *
 *   LearningPlaywrightFundamentals3x/
 *   ├── test-data/uploads/      <- sample.pdf, sample.jpg, sample.doc
 *   └── tests/14_FileUpload/    <- this spec
 *
 * Walking up with '..' from __dirname is what keeps it working no matter
 * which directory you start the runner from.
 */
const UPLOAD_DIR = path.join(__dirname, '..', '..', 'test-data', 'uploads');

test.describe('FileUpload handling', () => {

   test.beforeEach(async ({ page }) => {
      await page.goto(URL);
   });

   test('upload files from a different directory', async ({ page }) => {

      const files = ['sample.pdf', 'sample.jpg', 'sample.doc']
         .map(name => path.join(UPLOAD_DIR, name));

     

      await page.locator("div.pf-v6-c-multiple-file-upload input").setInputFiles(files);

      const uploadArea = page.locator('div.pf-v6-c-multiple-file-upload');
      await expect(uploadArea).toContainText('sample.pdf');
      await expect(uploadArea).toContainText('sample.jpg');
      await expect(uploadArea).toContainText('sample.doc');

      await page.pause();
   });
});

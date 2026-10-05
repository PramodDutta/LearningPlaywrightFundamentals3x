import { test, expect, Locator } from '@playwright/test';

const SimpleMaps = "https://simplemaps.com/svg/country/in";
test.describe('SVG handling', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(SimpleMaps);
    });


    test('locate SVG root and assert visible', async ({ page }) => {

        let allStates = await page.locator('path').all();
        for (const state of allStates) {
            const className = await state.getAttribute('class');
            if (className) { // checks if className is not null
                console.log(className);

                if (className.endsWith('UP')) { // checks if stateEnd ends with 'UP'
                    await state.click();
                    console.log("Clicked on UP");
                }
            }



            await page.pause();

        }

    });

});
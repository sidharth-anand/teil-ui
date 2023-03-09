import { expect, test } from '@playwright/test';

const URL = '/teil-ui/docs/components/dialog';

const elements = {
    OVERLAY: 'dialog__overlay',
    TRIGGER: 'dialog__trigger',
    CONTENT: 'dialog__content',
    CLOSE: 'dialog__close',
}

test.describe('Dialog', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(URL);
        await page.reload();
    })

    test('dialog opens when trigger is clicked', async ({ page }) => {
        const trigger = page.locator(`.${elements.TRIGGER}`).first();
        const content = page.locator(`.${elements.CONTENT}`).first();
        await expect(trigger).toBeVisible();
        await expect(content).not.toBeVisible();
        await trigger.click();
        await expect(content).toBeVisible();
    });
    
    test('dialog closes when close button is clicked', async ({page}) => {
        const trigger = page.locator(`.${elements.TRIGGER}`).first();
        const content = page.locator(`.${elements.CONTENT}`).first();
        await trigger.click();
        await expect(content).toBeVisible();
        const close = page.locator(`.${elements.CLOSE}`).first();
        await close.click();
        await expect(content).not.toBeVisible();
    })
    
    test('dialog closes when Esc is pressed', async ({page}) => {  
        const trigger = page.locator(`.${elements.TRIGGER}`).first();
        const content = page.locator(`.${elements.CONTENT}`).first();
        await trigger.click();
        await expect(content).toBeVisible();
        await page.keyboard.down('Escape');
        await expect(content).not.toBeVisible();
    })    
})
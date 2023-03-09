import { expect, test } from '@playwright/test';

const URL = '/teil-ui/docs/components/accordion';

const elements = {
	CONTAINER: 'accordion__container',
	ITEM: 'accordion__item',
	TRIGGER: 'accordion__trigger',
	CONTENT: 'accordion__content',
}

test.describe('Accordion', () => {
	test.beforeEach(async ({page}) => {
		await page.goto(URL);
		await page.reload();
	})

	test('accordion opens when clicked', async ({ page }) => {
		const trigger = page.locator(`.${elements.TRIGGER}`).first();
		const content = page.locator(`.${elements.CONTENT}`).first();
		expect(trigger).toBeVisible();
		expect(content).toBeEmpty();
		await trigger.click();
		expect(content).not.toBeEmpty();
	});

	test.fixme('trigger focus should whift when using keyboard', async ({ page }) => {
		const triggers = await page.locator(`.${elements.TRIGGER}`).all();
		await triggers[0]?.focus();
		await page.keyboard.press('ArrowDown');
		const hasFocus = await triggers[1]?.evaluate(node => document.activeElement === node);
		expect(hasFocus).toBeTruthy();
	});
})



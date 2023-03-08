import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/teil-ui/docs/components/accordion');
	await expect(page.getByRole('heading', { name: 'Accordion' })).toBeVisible();
});

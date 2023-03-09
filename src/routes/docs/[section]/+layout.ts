import type { LayoutLoad } from './$types';

import { error } from '@sveltejs/kit';

export const prerender = false;

export const load = (async ({ params, parent }) => {
	try {
		const { sections } = await parent();
		const section = sections.find((section) => section.prefix === params.section);

		if (section === undefined) throw error(404, 'Not found');

		return {
			section
		};
	} catch (err) {
		throw error(500, (err as Error).message);
	}
}) satisfies LayoutLoad;

import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';

export const load = (async ({ params, parent }) => {
    try {
        const { section } = await parent();
        const page = section.pages.find(page => page.prefix === params.page.toLowerCase());

        if (page === undefined) {
            throw error(404, 'Not found');
        }

        const files = import.meta.glob('../../../../../**/*.md');
        const match = files[`../../../../${page.file}.md`];
        const markdown: any = await match!();

        return {
            component: markdown.default
        };
    } catch (err) {
        console.log(err);
        throw error(500, (err as Error).message);
    }

}) satisfies PageLoad;
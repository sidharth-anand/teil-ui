import type { PageServerLoad } from './$types';

import { initialize, initialized, search } from "$components/search/search";

export const load = (async ({ url, fetch }) => {
    if (!initialized) {
        const res = await fetch('/search.json');

        if (!res.ok)
            throw new Error(`Failed to fetch search.json: ${res.status} ${res.statusText}`);

        const blocks = (await res.json()).blocks;
        initialize(blocks);
    }

    const query: string | null = url.searchParams.get('q');
    const results = query ? search(query) : [];

    return {
        query,
        results
    };

}) satisfies PageServerLoad;
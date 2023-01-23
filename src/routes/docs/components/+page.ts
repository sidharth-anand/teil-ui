import type { PageLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load = (() => {
    throw redirect(302, '/docs/components/accordion');
}) satisfies PageLoad;
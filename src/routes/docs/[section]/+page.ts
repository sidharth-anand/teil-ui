import type { PageLoad } from "./$types";

import { redirect } from "@sveltejs/kit";

import { base } from '$app/paths';

export const load = (async ({ parent }) => {
    const { section } = await parent();
    console.log(section);

    throw redirect(302, `${base}/docs/${section.prefix}/${section.pages[0].title}`)
}) satisfies PageLoad;
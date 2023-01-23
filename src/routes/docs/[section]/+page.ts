import type { PageLoad } from "./$types";

import { redirect } from "@sveltejs/kit";

export const load = (async ({parent}) => {
    const { section } = await parent();
    console.log(section);

    throw redirect(302, `/docs/${section.prefix}/${section.pages[0].title}`)
}) satisfies PageLoad;
import type { PageLoad } from "./$types";

import { redirect } from "@sveltejs/kit";

import {base} from '$app/paths';

export const load = (() => {
    throw redirect(302, `${base}/docs/getting-started/introduction`);
}) satisfies PageLoad;
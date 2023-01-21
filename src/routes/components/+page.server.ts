import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
 
export const load = (() => {
    throw redirect(302, '/components/Accordion');
}) satisfies LayoutServerLoad;
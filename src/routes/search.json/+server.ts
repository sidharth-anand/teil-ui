import type { RequestHandler } from './$types';

import { json } from '@sveltejs/kit';

import { content } from '$components/search/content.server';

export const prerender = true;

export const GET = (() => {
	return json({
		blocks: content()
	});
}) satisfies RequestHandler;
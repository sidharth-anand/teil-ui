import type { SvelteComponent } from 'svelte';
import type { SvelteInformations } from '@el3um4s/svelte-get-component-info';

import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';

type MetadataType = {
	title: string;
	description: string;
}

const inherits: Record<string, string> = {
	'ContextMenu': 'Menu'
};

function extractCode(text: string): { code: string; style: string } {
	const code = (text.match(/<!--code start-->([\s\S]*?)<!--code end-->/)?.[1] || '').trim();
	const style = (text.match(/<style global>([\s\S]*?)<\/style>/)?.[1] || '').trim();
	return { code, style };
}

export const load = (async ({ params, parent }) => {
	const { components, elements, raw } = await parent();
	const { slug } = params;

	if (!components.includes(slug)) {
		throw error(404, 'Not found');
	}

	try {
		const markdown = await import(`../../../../src/docs/${slug}.md` /* @vite-ignore */);

		return {
			components: slug in inherits ? new Map<string, SvelteInformations>([...elements.get(inherits[slug] ?? '')?.entries() ?? [], ...elements.get(slug)?.entries() ?? []]) : elements.get(slug),
			content: markdown.default as typeof SvelteComponent,
			meta: markdown.metadata as MetadataType,
			...extractCode(raw.get(slug) ?? '')
		};
	} catch (err) {
		throw error(500, (err as Error).message);
	}
}) satisfies PageLoad;

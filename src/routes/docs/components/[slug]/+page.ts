import type { SvelteComponent } from 'svelte';
import type { SvelteInformations } from '@el3um4s/svelte-get-component-info';

import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';

type MetadataType = {
	title: string;
	description: string;
	exclude?: Array<string>;
};

const inherits: Record<string, string> = {
	ContextMenu: 'Menu',
	DropdownMenu: 'Menu'
};

function extractCode(text: string): { code: string; style: string } {
	const code = (text.match(/<!--code start-->([\s\S]*?)<!--code end-->/)?.[1] || '').trim();
	const style = (text.match(/<style global>([\s\S]*?)<\/style>/)?.[1] || '').trim();
	return { code, style };
}

export const load = (async ({ params, parent }) => {
	const { components, elements, raw }: {
		components: string[],
		elements: Map<string, Map<string, SvelteInformations>>,
		raw: Map<string, string>
	} = (await parent()).components;
	const { slug } = params;

	const title = components.find((component) => component.toLowerCase() === slug);

	if (title === undefined) {
		throw error(404, 'Not found');
	}

	try {
		const markdown = await import(
			`../../../../../src/docs/02 - Components/${title}.md` /* @vite-ignore */
		);

		return {
			components:
				title in inherits
					? new Map<string, SvelteInformations>([
							...(elements.get(inherits[title] ?? '')?.entries() ?? []),
							...(elements.get(title)?.entries() ?? [])
					  ])
					: elements.get(title),
			content: markdown.default as typeof SvelteComponent,
			meta: markdown.metadata as MetadataType,
			...extractCode(raw.get(title) ?? '')
		};
	} catch (err) {
		throw error(500, (err as Error).message);
	}
}) satisfies PageLoad;

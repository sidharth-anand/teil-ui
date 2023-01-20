import type { LayoutServerLoad } from './$types';
import type { SvelteInformations } from '@el3um4s/svelte-get-component-info';

import * as fs from 'node:fs';

import { error } from '@sveltejs/kit';

import { getInfo } from '@el3um4s/svelte-get-component-info';

const extra = ['Menu'];

export const load = (() => {
	try {
		const components = fs.readdirSync('src/docs').map((file) => file.replace('.md', ''));
		const elements = components.concat(extra).reduce((acc, component) => {
			return new Map<string, Map<string, SvelteInformations>>([
				...acc.entries(),
				[
					component,
					fs
						.readdirSync(`src/lib/components/${component}`)
						.filter((file) => file.endsWith('.svelte'))
						.reduce((info, file) => {
							return new Map<string, SvelteInformations>([
								...info.entries(),
								[
									file.replace('.svelte', ''),
									getInfo(`src/lib/components/${component}/${file}`)
								]
							]);
						}, new Map<string, SvelteInformations>())
				]
			]);
		}, new Map<string, Map<string, SvelteInformations>>());
		const raw = components.reduce(
			(acc, component) =>
				new Map<string, string>([
					...acc.entries(),
					[component, fs.readFileSync(`src/docs/${component}.md`, 'utf-8')]
				]),
			new Map<string, string>()
		);

		return {
			raw,
			elements,
			components
		};
	} catch (err) {
		throw error(500, (err as Error).message);
	}
}) satisfies LayoutServerLoad;

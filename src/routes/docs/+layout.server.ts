import type { LayoutServerLoad } from './$types';
import type { SvelteInformations } from '@el3um4s/svelte-get-component-info';

import type { ComponentInformation, DocsSection } from '../../global';

import * as fs from 'node:fs';

import { error } from '@sveltejs/kit';

import { getInfo } from '@el3um4s/svelte-get-component-info';

const extra = ['Menu'];

function slugify(title: string): string {
	return title
		.toLowerCase()
		.replace(/&lt;/g, '')
		.replace(/&gt;/g, '')
		.replace(/[^a-z0-9-$]/g, '-')
		.replace(/-{2,}/g, '-')
		.replace(/^-/, '')
		.replace(/-$/, '');
}

function getSections(): Array<DocsSection> {
	const sections = fs.readdirSync('src/docs').sort();
	return sections.map((section) => {
		const pages = fs.readdirSync(`src/docs/${section}`).sort();
		const title = section.replace(/[0-9]* \- /, '');

		return {
			title: title,
			prefix: slugify(title),
			dir: `src/docs/${section}`,
			pages: pages
				.map((page) => page.replace('.md', ''))
				.map((page) => ({
					title: page.replace(/[0-9]* \- /, ''),
					prefix: slugify(page.replace(/[0-9]* \- /, '')),
					file: `docs/${section}/${page}`
				}))
		};
	});
}

function getComponentInformation(): ComponentInformation {
	const components = fs
		.readdirSync('src/docs/02 - Components')
		.map((file) => file.replace('.md', ''));
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
				[component, fs.readFileSync(`src/docs/02 - Components/${component}.md`, 'utf-8')]
			]),
		new Map<string, string>()
	);

	return {
		raw,
		elements,
		components
	};
}

export const load = (() => {
	try {
		return {
			sections: getSections(),
			components: getComponentInformation()
		};
	} catch (err) {
		console.log(err);
		throw error(500, (err as Error).message);
	}
}) satisfies LayoutServerLoad;

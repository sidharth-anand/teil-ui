import type { SvelteInformations } from '@el3um4s/svelte-get-component-info';

export type DocsPage = {
	title: string;
	prefix: string;
	file: string;
};

export type DocsSection = {
	title: string;
	prefix: string;
	dir: string;
	pages: Array<DocsPage>;
};

export type ComponentInformation = {
	components: Array<string>;
	elements: Map<string, Map<string, SvelteInformations>>;
	raw: Map<string, string>;
};

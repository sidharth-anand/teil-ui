import * as path from 'node:path';
import * as url from 'node:url';

import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	kit: {
		adapter: adapter({
			strict: false
		}),
		alias: {
			$lib: 'src/lib',
			$models: 'src/models',
			$styles: 'src/styles',
			$components: 'src/components'
		}
	},

	extensions: ['.svelte', '.md'],
	preprocess: [
		preprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				component: path.join(
					path.dirname(url.fileURLToPath(import.meta.url)),
					'src/components/DocumentationComponent.svelte'
				)
			}
		})
	],

	vitePlugin: {
		experimental: {
			inspector: {
				holdMode: true
			}
		}
	}
};

export default config;

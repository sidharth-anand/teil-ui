import * as url from 'node:url';
import * as path from 'node:path';
import * as process from 'node:process';

import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

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
			$styles: 'src/scss',
			$components: 'src/components'
		},
		paths: {
			assets:
				process.env.NODE_ENV === 'production'
					? 'https://sidharth-anand.github.io/teil-ui'
					: undefined,
			base: process.env.NODE_ENV === 'production' ? '/teil-ui' : ''
		}
	},

	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
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

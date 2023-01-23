<script lang="ts">
	import type { DocsSection } from 'src/global';

	import { page } from '$app/stores';

	export let sections: Array<DocsSection> = [];
</script>

<nav aria-label="Docs">
	<ul class="sidebar">
		{#each sections as section}
			<li>
				<span class="section">
					{section.title}
				</span>

				<ul>
					{#each section.pages as sectionpage}
						<li>
							<a
								data-sveltekit-preload-data
								class="page"
								class:active={`/docs/${section.prefix}/${sectionpage.prefix}` ===
									$page.url.pathname}
								href={`/docs/${section.prefix}/${sectionpage.prefix}`}
							>
								{sectionpage.title}
							</a>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		top: 0;
		left: 0;
		color: var(--sk-text-3);
	}
	.sidebar {
		padding: var(--sk-page-padding-top) 0 var(--sk-page-padding-top) 0;
		font-family: var(--sk-font);
		height: 100%;
		bottom: auto;
		width: 100%;
		columns: 2;
		margin: 0;
	}
	li {
		display: block;
		line-height: 1.2;
		margin: 0;
		margin-bottom: 4rem;
	}
	li:last-child {
		margin-bottom: 0;
	}
	a {
		position: relative;
		transition: color 0.2s;
		border-bottom: none;
		padding: 0;
		color: var(--sk-text-3);
		user-select: none;
	}
	.section {
		display: block;
		padding-bottom: 0.8rem;
		font-size: var(--sk-text-xs);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 600;
	}
	.page {
		display: block;
		font-size: 1.6rem;
		font-family: var(--sk-font);
		padding-bottom: 0.6em;
		text-transform: capitalize;
	}
	.active {
		font-weight: 700;
		color: var(--sk-text-1);
	}
	ul ul,
	ul ul li {
		margin: 0;
	}
	@media (min-width: 600px) {
		.sidebar {
			columns: 2;
			padding-left: var(--sk-page-padding-side);
			padding-right: var(--sk-page-padding-side);
		}
	}
	@media (min-width: 700px) {
		.sidebar {
			columns: 3;
		}
	}
	@media (min-width: 832px) {
		.sidebar {
			columns: 1;
			padding-left: 3.2rem;
			padding-right: 0;
			width: var(--sidebar-menu-width);
			margin: 0 0 0 auto;
		}
		nav {
			min-height: calc(100vh - var(--ts-toggle-height));
		}
		.active::after {
			--size: 1rem;
			content: '';
			position: absolute;
			width: var(--size);
			height: var(--size);
			top: -0.1rem;
			right: calc(-0.5 * var(--size));
			background-color: var(--sk-back-1);
			border-left: 1px solid var(--sk-back-5);
			border-bottom: 1px solid var(--sk-back-5);
			transform: translateY(0.2rem) rotate(45deg);
			z-index: 2;
		}
	}
</style>

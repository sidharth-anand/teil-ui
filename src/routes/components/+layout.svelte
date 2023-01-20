<script lang="ts">
	import type { LayoutData } from './$types';

	import Header from '$components/Header.svelte';
	import NavContent from '$components/NavContent.svelte';

	export let data: LayoutData;

	$: sections = [
		{ title: 'Getting Started', contents: ['Introduction', 'Installation'] },
		{ title: 'Components', contents: data.components }
	] as Array<{ title: string; contents: Array<string> }>;
</script>

<Header>
	<div class="container">
		<div class="page">
			<slot />
		</div>

		<div class="toc-container">
			<NavContent {sections} />
		</div>

		<div class="ts-toggle" />
	</div>
</Header>

<style>
	.container {
		--sidebar-menu-width: 28rem;
		--sidebar-width: var(--sidebar-menu-width);
		--ts-toggle-height: 4.2rem;
	}
	.page {
		--on-this-page-display: none;
		padding: var(--sk-page-padding-top) var(--sk-page-padding-side);
	}
	.toc-container {
		background: var(--sk-back-3);
	}

	.ts-toggle {
		width: 100%;
		border-top: 1px solid var(--sk-back-4);
		background-color: var(--sk-back-3);
    height: var(--ts-toggle-height);
	}
	@media (min-width: 832px) {
		.toc-container {
			width: var(--sidebar-width);
			height: calc(100vh - var(--sk-nav-height) - var(--ts-toggle-height));
			position: fixed;
			left: 0;
			top: var(--sk-nav-height);
			overflow-x: hidden;
			overflow-y: auto;
		}
		.toc-container::before {
			content: '';
			position: fixed;
			width: 0;
			height: 100%;
			top: 0;
			left: calc(var(--sidebar-width) - 1px);
			border-right: 1px solid var(--sk-back-5);
		}
		.ts-toggle {
			position: fixed;
			width: var(--sidebar-width);
			bottom: 0;
			z-index: 1;
			margin-right: 0;
			border-right: 1px solid var(--sk-back-5);
		}
		.page {
			padding-left: calc(var(--sidebar-width) + var(--sk-page-padding-side));
		}
	}
	@media (min-width: 1200px) {
		.container {
			--sidebar-width: max(28rem, 23vw);
		}
		.page {
			--on-this-page-display: block;
			padding: var(--sk-page-padding-top)
				calc(var(--sidebar-width) + var(--sk-page-padding-side));
			margin: 0 auto;
			max-width: var(--sk-line-max-width);
			box-sizing: content-box;
		}
	}
</style>

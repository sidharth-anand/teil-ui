<script lang="ts">
	import { browser } from '$app/environment';
	import { page, navigating } from '$app/stores';

	import HeaderItem from './HeaderItem.svelte';
	import Loading from './Loading.svelte';
	import Icon from './Icon.svelte';

	import Search from './search/Search.svelte';
	import SearchBox from './search/SearchBox.svelte';

	let open: boolean = false;
	let visible = true;
	let hashChanged = false;
	let lastScroll = 0;

	let element: HTMLElement | null = null;

	function hashchange() {
		hashChanged = true;
	}

	function scroll() {
		const scroll = window.pageYOffset;
		if (!hashChanged) {
			visible = scroll < 50 || scroll < lastScroll;
		}

		lastScroll = scroll;
		hashChanged = false;
	}

	function focus() {
		if (open && !element?.contains(document.activeElement)) {
			open = false;
		}
	}

	function click() {
		open = false;
	}

	function toggle() {
		open = !open;
	}

	//TODO: Replace with our components wherever necessary
</script>

<svelte:window on:hashchange={hashchange} on:scroll={scroll} on:focusin={focus} />

{#if $navigating}
	<Loading />
{/if}

{#if open}
	<div class="modal-background hide-if-desktop" on:click={click} />
{/if}

<header bind:this={element} class:visible={visible || open} class:open>
	<a href="/" class="header-spot home" title="Home">
		<span>headless</span>
	</a>

	<button
		aria-label="Toggle menu"
		aria-expanded={open}
		class="menu-toggle"
		class:open
		on:click={toggle}
	>
		X
	</button>

	<ul>
		<li>
			<Search></Search>
		</li>
	</ul>

	<ul class="external">
		<HeaderItem selected={$page.url.pathname.startsWith('/docs')} href="/components">
			Docs
		</HeaderItem>
		<li aria-hidden="true"><span class="separator" /></li>
		<HeaderItem external="https://github.com/sveltejs/kit" title="GitHub Repo">
			<span class="small">GitHub</span>
			<span class="large">
				<Icon name="github" />
			</span>
		</HeaderItem>
	</ul>
</header>

<main id="main">
	<slot />
</main>

{#if browser}
	<SearchBox />
{/if}

<style>
	.modal-background {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(255, 255, 255, 0.8);
		z-index: 2;
		backdrop-filter: grayscale(0.5) blur(2px);
	}
	header {
		--shadow-height: 0.5rem;
		--shadow-gradient: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.1) 0%,
			rgba(0, 0, 0, 0.05) 30%,
			transparent 100%
		);
		position: fixed;
		width: 100vw;
		height: var(--header-height);
		margin: 0 auto;
		background-color: #2e3440;
		font-family: var(--font);
		z-index: 100;
		user-select: none;
		transition: transform 0.2s;
	}
	header::after {
		content: '';
		position: absolute;
		width: 100%;
		height: var(--shadow-height);
		left: 0;
		bottom: calc(-1 * var(--shadow-height));
		background: var(--shadow-gradient);
	}
	ul {
		position: relative;
		width: 100%;
		padding: 0;
		margin: 0;
		list-style: none;
	}
	ul :global(a) {
		color: var(--text);
	}
	.home {
		width: 30rem;
		height: var(--header-height);
		display: flex;
		background-position: calc(var(--side-nav) - 1rem) 50%;
		background-repeat: no-repeat;
		background-size: auto 70%;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
	.home span {
		box-sizing: border-box;
		text-transform: uppercase;
		font-weight: 700;
	}
	button {
		position: absolute;
		top: calc(var(--header-height) / 2 - 1rem);
		right: var(--side-nav);
		line-height: 1;
	}
	@media (max-width: 799px) {
		ul {
			position: relative;
			display: none;
			width: 100%;
			background: white;
			padding: 1rem var(--side-nav);
		}
		.open ul {
			display: block;
		}
		ul.external {
			padding: 1rem var(--side-nav) 1rem;
		}
		ul.external::before {
			content: '';
			position: absolute;
			top: 0;
			left: var(--side-nav);
			width: calc(100% - 2 * var(--side-nav));
			height: 1px;
			background: radial-gradient(circle at center, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05));
		}
		ul.external::after {
			content: '';
			position: absolute;
			width: 100%;
			height: var(--shadow-height);
			left: 0;
			bottom: calc(-1 * var(--shadow-height));
			background: var(--shadow-gradient);
		}
	}
	@media (min-width: 800px) {
		.modal-background {
			display: none;
		}
		header {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		ul {
			display: flex;
			width: auto;
			height: 100%;
		}
		ul :global(li) {
			margin: 0 0.5rem;
			padding: 0;
		}
		ul :global(a) {
			display: flex;
			align-items: center;
			height: 100%;
		}
		ul.external {
			width: 30rem;
			padding: 0 var(--side-nav) 0 0;
			justify-content: end;
		}
		button {
			display: none;
		}
	}

	main {
		position: relative;
		margin: 0 auto;
		padding-top: var(--sk-nav-height);
		overflow: hidden;
	}
	.small {
		display: inline;
	}
	.large {
		display: none;
	}
	/* duplicating content from <Nav> — bit hacky but will do for now */
	.separator {
		display: block;
		position: relative;
		height: 1px;
		margin: 0.5rem 0;
		background: radial-gradient(circle at center, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05));
	}
	@media (min-width: 800px) {
		.small {
			display: none;
		}
		.large {
			display: inline;
		}
		.separator {
			display: flex;
			align-items: center;
			justify-content: center;
			background: none;
			height: 100%;
			margin: 0;
			border: none;
			text-align: center;
		}
		.separator::before {
			content: '•';
			margin: 0 0.3rem;
			color: #ccc;
		}
	}
	@media (min-width: 960px) {
		/* this is an unfortunate hack, but necessary to temporarily avoid
		breaking changes to site-kit */
		:global(ul.external) {
			width: 30rem !important;
		}
	}
	:global(body) {
		font-size: 1.6rem !important;
	}
	li {
		display: flex;
		align-items: center;
	}
	:global(.examples-container, .repl-outer, .tutorial-outer) {
		height: calc(100vh - var(--sk-nav-height)) !important;
	}
	:global(.toggle) {
		bottom: 0 !important;
	}
	@media (max-width: 830px) {
		:global(aside) {
			z-index: 9999 !important;
		}
	}
</style>

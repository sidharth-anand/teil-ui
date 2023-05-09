<script lang="ts">
	import type { Tree, MapBlock } from './types';

	import { onMount } from 'svelte';

	import { afterNavigate } from '$app/navigation';

	import SearchWorker from './search.worker?worker';
	import { query, recent, searching } from './stores';

	import SearchResults from './SearchResults.svelte';
	import Icon from '../Icon.svelte';

	let ready: boolean = false;
	let search: { results: Array<Tree>; query: string } | null = null;
	let recents: Array<MapBlock> = [];

	let worker: Worker | null = null;

	let pending: Set<number> = new Set();
	let hasPending: boolean = false;

	let modal: HTMLElement | null = null;

	let uid: number = 1;

	function close() {
		if ($searching) {
			const scroll = -parseInt(document.body.style.top || '0');

			document.body.style.position = '';
			document.body.style.top = '';
			document.body.tabIndex = -1;
			document.body.focus();
			document.body.removeAttribute('tabindex');

			window.scrollTo(0, scroll);

			$searching = false;
		}
	}

	function navigate(href: string) {
		$recent = [href, ...$recent.filter((x) => x !== href)];
		close();
	}

	onMount(() => {
		worker = new SearchWorker();

		worker.addEventListener('message', (event) => {
			const { type, payload } = event.data;

			if (type === 'ready') {
				ready = true;
			} else if (type === 'results') {
				search = payload;
			} else if (type === 'recents') {
				recents = payload;
			}
		});

		worker.postMessage({
			type: 'init',
			payload: {
				origin: location.origin
			}
		});
	});

	afterNavigate(() => {
		close();
	});

	$: {
		if (ready) {
			const id = uid++;
			pending.add(id);
			hasPending = true;

			worker?.postMessage({
				type: 'query',
				id,
				payload: $query
			});
		}
	}

	$: {
		if (ready) {
			worker?.postMessage({
				type: 'recents',
				payload: $recent
			});
		}
	}

	$: {
		if ($searching) {
			document.body.style.top = `-${window.scrollY}px`;
			document.body.style.position = 'fixed';
		}
	}

	//TODO: Use dialog component here
	//TODO: Use FocusGroup here
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'k' && (navigator.platform === 'MacIntel' ? e.metaKey : e.ctrlKey)) {
			e.preventDefault();
			$query = '';

			if ($searching) {
				close();
			} else {
				$searching = true;
			}
		}

		if (e.code === 'Escape') {
			close();
		}
	}}
/>

{#if $searching && ready}
	<button aria-roledescription="close searchbox" class="modal-background" on:click={close} />

	<div bind:this={modal} class="modal">
		<div class="search-box">
			<!-- svelte-ignore a11y-autofocus -->
			<input
				autofocus
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						modal?.querySelector('a[data-has-node]')?.dispatchEvent(new Event('click'));
					}
				}}
				on:input={(e) => {
					// @ts-ignore
					$query = e.target.value;
				}}
				value={$query}
				placeholder="Search"
				aria-describedby="search-description"
				aria-label="Search"
				spellcheck="false"
			/>

			<button aria-label="Close" on:click={close}>
				<Icon name="close" />
			</button>

			<span id="search-description" class="visually-hidden"
				>Results will update as you type</span
			>

			<div class="results">
				{#if search?.query}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="results-container" on:click={() => ($searching = false)}>
						<SearchResults
							results={search.results}
							query={search.query}
							on:select={(e) => {
								navigate(e.detail.href);
							}}
						/>
					</div>
				{:else}
					<h2 class="info" class:empty={recents.length === 0}>
						{recents.length ? 'Recent searches' : 'No recent searches'}
					</h2>
					{#if recents.length}
						<div class="results-container">
							<ul>
								{#each recents as search, i}
									<!-- svelte-ignore a11y-mouse-events-have-key-events -->
									<li class="recent">
										<a
											on:click={() => navigate(search.href)}
											href={search.href}
										>
											<small>{search.breadcrumbs.join('/')}</small>
											<strong>{search.title}</strong>
										</a>

										<button
											aria-label="Delete"
											on:click={(e) => {
												$recent = $recent.filter(
													(href) => href !== search.href
												);
												e.stopPropagation();
												e.preventDefault();
											}}
										>
											<Icon name="delete" />
										</button>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
{/if}

<div aria-live="assertive" class="visually-hidden">
	{#if $searching && search?.results.length === 0}
		<p>No results</p>
	{/if}
</div>

<style lang="scss">
	@use '/src/scss/variables' as variables;

	input {
		font-family: inherit;
		font-size: 1.6rem;
		width: 100%;
		padding: 1rem 6rem 0.5rem 1rem;
		height: 5rem;
		border: none;
		border-bottom: 1px solid var(--tui-back-2);
		font-weight: 600;
		flex-shrink: 0;
		background: var(--tui-back-2);
		color: var(--tui-text-1);
	}
	input::selection {
		background-color: var(--tui-back-translucent);
	}
	input::placeholder {
		color: var(--tui-back-2);
		opacity: 0.6;
	}
	input:focus-visible {
		background: var(--tui-theme-2);
		color: var(--tui-back-2);
		outline: none;
	}
	input:focus-visible::placeholder {
		color: rgba(variables.$color-white, 0.5);
	}
	button[aria-label='Close'] {
		--size: 2rem;
		position: absolute;
		top: 0;
		right: 0;
		width: 5rem;
		height: 5rem;
		background: none;
		color: var(--tui-text-2);
	}
	button[aria-label='Close']:focus-visible {
		background: var(--tui-theme-2);
		color: var(--tui-back-1);
		outline: none;
	}
	input:focus-visible + button[aria-label='Close'] {
		color: var(--tui-back-1);
	}
	ul {
		margin: 0;
	}
	.modal-background,
	.modal {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
	}
	.modal-background {
		background: var(--tui-back-1);
		opacity: 0.7;
	}
	.modal {
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: none;
	}
	.search-box {
		position: relative;
		height: calc(100% - 2rem);
		width: calc(100vw - 2rem);
		max-width: 50rem;
		max-height: 50rem;
		filter: drop-shadow(2px 4px 16px rgba(variables.$color-black, 0.2));
		border-radius: var(--tui-border-radius);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.search-box > * {
		pointer-events: all;
	}
	.results {
		overflow: auto;
		overscroll-behavior-y: none;
	}
	.results-container {
		background: var(--tui-back-2);
		border-radius: 0 0 var(--tui-border-radius) var(--tui-border-radius);
		pointer-events: all;
	}
	.info {
		padding: 1rem;
		font-size: 1.2rem;
		font-weight: normal;
		text-transform: uppercase;
		background-color: var(--tui-back-2);
		pointer-events: all;
	}
	.info.empty {
		border-radius: 0 0 var(--tui-border-radius) var(--tui-border-radius);
	}
	a {
		display: block;
		text-decoration: none;
		line-height: 1;
		padding: 1rem;
	}
	a:hover {
		background: rgba(variables.$color-black, 0.05);
	}
	a:focus {
		background: var(--tui-theme-2);
		color: var(--tui-back-1);
		outline: none;
	}
	a small,
	a strong {
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1;
	}
	a small {
		font-size: 1rem;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--tui-text-3);
	}
	a strong {
		font-size: 1.6rem;
		color: var(--tui-text-2);
		margin: 0.4rem 0;
	}
	a:focus small {
		color: white;
		opacity: 0.6;
	}
	a:focus strong {
		color: white;
	}
	a strong :global(mark) {
		background: var(--tui-theme-2);
		color: var(--tui-text-3);
		text-decoration: none;
		border-radius: 1px;
	}
	li {
		position: relative;
	}
	button[aria-label='Delete'] {
		position: absolute;
		top: 0;
		right: 0;
		width: 5rem;
		height: 100%;
		color: var(--tui-text-2);
		opacity: 0.1;
	}
	a:focus + [aria-label='Delete'] {
		color: var(--tui-back-1);
	}
	button[aria-label='Delete']:hover {
		opacity: 1;
		outline: none;
	}
	button[aria-label='Delete']:focus-visible {
		background: var(--tui-theme-2);
		color: var(--tui-text-1);
		opacity: 1;
		outline: none;
	}
</style>

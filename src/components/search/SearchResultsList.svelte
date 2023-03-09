<script lang="ts">
	import type { Tree } from './types';

	import { createEventDispatcher } from 'svelte';

	export let results: Array<Tree>;
	export let query: string;

	type EventTypes = {
		select: {
			href: string;
		};
	};

	const dispatch = createEventDispatcher<EventTypes>();

	function escape(text: string): string {
		return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function excerpt(content: string, query: string): string {
		const index = content.toLowerCase().indexOf(query.toLowerCase());
		if (index === -1) {
			return content.slice(0, 100);
		}
		const prefix =
			index > 20 ? `…${content.slice(index - 15, index)}` : content.slice(0, index);
		const suffix = content.slice(
			index + query.length,
			index + query.length + (80 - (prefix.length + query.length))
		);
		return (
			escape(prefix) +
			`<mark>${escape(content.slice(index, index + query.length))}</mark>` +
			escape(suffix)
		);
	}
</script>

<ul>
	{#each results as result, i}
		<li>
			<a
				data-sveltekit-preload-data
				href={result.href}
				on:click={() => dispatch('select', { href: result.href })}
				data-has-node={result.node ? true : undefined}
			>
				<strong
					>{@html excerpt(
						result.breadcrumbs[result.breadcrumbs.length - 1] ?? '',
						query
					)}</strong
				>

				{#if result.node?.content}
					<span>{@html excerpt(result.node.content, query)}</span>
				{/if}
			</a>

			{#if result.children.length > 0}
				<svelte:self results={result.children} {query} on:select />
			{/if}
		</li>
	{/each}
</ul>

<style lang="scss">
	@use '/src/scss/variables' as variables;

	ul {
		position: relative;
		margin: 0;
	}
	ul :global(ul) {
		margin-left: 0.8em !important;
		padding-left: 0em;
		border-left: 1px solid var(--tui-back-6);
	}
	li {
		list-style: none;
		margin-bottom: 1em;
	}
	li:last-child {
		margin-bottom: 0;
	}
	ul ul li {
		margin: 0;
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
		color: variables.$color-white;
		outline: none;
	}
	a strong,
	a span {
		display: block;
		white-space: nowrap;
		line-height: 1;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	a strong {
		font-size: 1.6rem;
		color: var(--tui-text-2);
	}
	a span {
		font-size: 1.2rem;
		color: var(--tui-text-6);
		margin: 0.4rem 0 0 0;
	}
	a :global(mark) {
		--highlight-color: #b48ead33;
	}
	a span :global(mark) {
		background: none;
		color: var(--tui-text-1);
		background: var(--highlight-color);
		outline: 2px solid var(--highlight-color);
		border-top: 2px solid var(--highlight-color);
	}
	a:focus span {
		color: rgba(variables.$color-white, 0.6);
	}
	a:focus strong {
		color: variables.$color-white;
	}
	a:focus span :global(mark),
	a:focus strong :global(mark) {
		--highlight-color: #808093;
		mix-blend-mode: lighten;
		color: variables.$color-white;
	}
	a strong :global(mark) {
		color: var(--tui-text-1);
		background: var(--highlight-color);
		outline: 2px solid var(--highlight-color);
		border-radius: 1px;
	}
</style>

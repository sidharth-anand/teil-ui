<script lang="ts">
    import type {Tree} from './types';

    import SearchResultsList from "./SearchResultsList.svelte";

    export let results: Array<Tree>;
    export let query: string;
</script>

{#if results.length > 0}
	<SearchResultsList {results} {query} on:select />
{:else if query}
	<p class="info">No results</p>
{/if}

<style>
	.info {
		padding: 1rem;
		font-size: 1.2rem;
		font-weight: normal;
		text-transform: uppercase;
		background-color: var(--sk-back-2);
		border-radius: 0 0 var(--sk-border-radius) var(--sk-border-radius);
		pointer-events: all;
		margin: 0;
	}
</style>
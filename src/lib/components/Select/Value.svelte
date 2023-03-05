<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { SelectStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	export let placeholder: string = '';

	if (!hasContext(CONTEXT.SELECT)) {
		throw new Error('Select.Value must be used inside a Select.Container');
	}

	const selectStore = getContext<Writable<SelectStoreType>>(CONTEXT.SELECT);
</script>

<span bind:this={$selectStore.display} {...$$restProps} style="pointer-events: none">
	{#if $selectStore.value}
		{$selectStore.valuetext ?? ''}
	{:else if placeholder}
		{placeholder}
	{:else}
		<slot />
	{/if}
</span>

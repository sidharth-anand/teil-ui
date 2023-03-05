<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { SelectItemStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	if (!hasContext(CONTEXT.SELECT)) {
		throw new Error('Select.Text must be used inside a Select.Container');
	}

	if (!hasContext(CONTEXT.SELECTITEM)) {
		throw new Error('Select.Text must be used inside a Select.Item');
	}

	const selectItemStore = getContext<Writable<SelectItemStoreType>>(CONTEXT.SELECTITEM);
</script>

{#if $selectItemStore.selected}
	<span {...$$restProps} aria-hidden>
		<slot />
	</span>
{/if}

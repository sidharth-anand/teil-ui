<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { TabsStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	export let value: string;

	if (!hasContext(CONTEXT.TABS)) {
		throw new Error('Tabs.Content must be used inside a Tabs.Container');
	}

	const tabsStore = getContext<Writable<TabsStoreType>>(CONTEXT.TABS);

	$: selected = $tabsStore.value === value;
</script>

{#if selected}
	<div
		role="tabpanel"
		id={`${$tabsStore.id}-content-${value}`}
		class={$$restProps.class}
		hidden={false}
		aria-labelledby={`${$tabsStore.id}-trigger-${value}`}
	>
		<slot />
	</div>
{/if}

<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { MenuItemIndicatorStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	if (!hasContext(CONTEXT.MENUINDICATOR)) {
		throw new Error('Menu.ItemIndicator must be used inside Menu.CheckItem or Menu.RadioItem');
	}

	const indicatorStore: Writable<MenuItemIndicatorStoreType> = getContext(CONTEXT.MENUINDICATOR);
</script>

<span class={$$props.class}>
	{#if $indicatorStore.checked === true || (!$$slots.indeterminate && $indicatorStore.checked === 'indeterminate')}
		<slot name="checked" />
	{:else if $indicatorStore.checked === 'indeterminate' && $$slots.indeterminate}
		<slot name="indeterminate" />
	{:else}
		<slot name="unchecked" />
	{/if}
</span>

<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { TabsStoreType } from './types';

	import { hasContext, getContext, setContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	import Focus from '../Focus';
	import { createFocusContext } from '../Focus/context';

	export let loop: boolean = true;

	if (!hasContext(CONTEXT.TABS)) {
		throw new Error('Tabs.List must be used inside a Tabs.Container');
	}

	const tabsStore = getContext<Writable<TabsStoreType>>(CONTEXT.TABS);
	const focusStore = createFocusContext({
		direction: $tabsStore.direction,
		orientation: $tabsStore.orientation,
		loop: loop
	});

	setContext(CONTEXT.FOCUS, focusStore);
</script>

<div
	role="tablist"
	{...$$restProps}
	aria-orientation={$tabsStore.orientation}
	use:Focus.Group={focusStore}
>
	<slot />
</div>

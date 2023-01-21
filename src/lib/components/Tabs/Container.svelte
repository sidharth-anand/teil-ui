<script lang="ts">
	import type { Activation, Orientation, Direction, TabsStoreType } from './types';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	import id from '../id';

	export let value: string = '';
	export let orientation: Orientation = 'horizontal';
	export let direction: Direction = 'ltr';
	export let activation: Activation = 'automatic';

	const tabsStore = writable<TabsStoreType>({
		id: id(),

		value,
		orientation,
		direction,
		activation
	});

	setContext(CONTEXT.TABS, tabsStore);

	$: {
		if (value !== $tabsStore.value) {
			tabsStore.update(state => ({
				...state,
				value
			}));
		}
	}

	$: {
		value = $tabsStore.value;
	}
</script>

<div class={$$props.class}>
	<slot />
</div>

<script lang="ts">
	import type { Type, ToggleGroupStoreType } from './types';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	import Focus from '../Focus';
	import { createFocusContext } from '../Focus/context';

	export let type: Type = 'single';
	export let disabled: boolean = false;
	export let value: string | Array<string> = type === 'single' ? '' : [];

	const toggleGroupStore = writable<ToggleGroupStoreType>({
		type,
		value,
		disabled
	});
	const focusStore = createFocusContext({
		orientation: 'horizontal',
		direction: 'ltr',
		loop: true
	});

	setContext(CONTEXT.TOGGLEGROUP, toggleGroupStore);
	setContext(CONTEXT.FOCUS, focusStore);

	$: {
		if (value !== $toggleGroupStore.value) {
			toggleGroupStore.update((state) => ({
				...state,
				value
			}));
		}
	}

	$: {
		value = $toggleGroupStore.value;
	}

	$: {
		toggleGroupStore.update((state) => ({
			...state,
			type,
			disabled
		}));
	}
</script>

<div role="group" class={$$props.class} use:Focus.Group={focusStore}>
	<slot />
</div>

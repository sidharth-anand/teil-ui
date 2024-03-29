<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	import { writable } from 'svelte/store';

	import Focus from '../Focus';
	import { createFocusContext } from '../Focus/context';

	import type { Direction, Orientation } from '../Focus/types';
	import type { RadioStoreType } from './types';

	export let name: string = '';
	export let disabled: boolean = false;
	export let required: boolean = false;

	export let value: string = '';

	export let direction: Direction = 'ltr';
	export let orientation: Orientation = 'both';
	export let loop: boolean = true;

	const radioStore = writable<RadioStoreType>({
		name,
		required,
		disabled,
		value
	});

	const focusStore = createFocusContext({ orientation, direction, loop });
	const dispatch = createEventDispatcher<{change: string}>();

	setContext(CONTEXT.RADIO, radioStore);
	setContext(CONTEXT.FOCUS, focusStore);

	$: {
		if (value !== $radioStore.value) {
			radioStore.update((state) => ({
				...state,
				value
			}));
		}
	}

	$: {
		value = $radioStore.value;
		dispatch('change', value);
	}
</script>

<div
	role="radiogroup"
	{...$$restProps}
	dir={direction}
	aria-orientation={orientation === 'both' ? undefined : orientation}
	aria-disabled={disabled}
	use:Focus.Group={focusStore}
>
	<slot />
</div>

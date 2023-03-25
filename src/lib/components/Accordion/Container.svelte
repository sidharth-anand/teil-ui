<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	import Focus from '../Focus';
	import { createFocusContext } from '../Focus/context';

	import type { AccordionType, AccordionStoreType } from './types';

	export let value: any | Array<any> = [];
	export let type: AccordionType = 'single';
	export let disabled: boolean = false;

	if (!(value instanceof Array)) {
		value = [value];
	}

	const accordionStore = writable<AccordionStoreType>({
		open: value,
		type,
		disabled
	});
	const focusStore = createFocusContext({
		orientation: 'vertical',
		direction: 'ltr',
		loop: true,
		forceFocusAll: true
	});
	const dispatch = createEventDispatcher<{change: boolean}>();

	setContext(CONTEXT.ACCORDION, accordionStore);
	setContext(CONTEXT.FOCUS, focusStore);

	$: {
		if (!value.every((v: any, i: number) => v === $accordionStore.open[i])) {
			accordionStore.update(state => ({
				...state,
				open: value
			}));
		}
	}

	$: {
		value = $accordionStore.open;
		dispatch('change', value);
	}
</script>

<div {...$$restProps} use:Focus.Group={focusStore}><slot /></div>

<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { FocusStoreType } from '../Focus/types';
	import type { AccordionStoreType, AccordionItemStoreType } from './types';

	import { hasContext, getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	import Collapsible from '../Collapsible';

	export let value: any;
	export let disabled: boolean = false;

	if (!hasContext(CONTEXT.ACCORDION)) {
		throw new Error('Accordion.Item must be used inside Accordion.Container');
	}

	const accordionStore = getContext<Writable<AccordionStoreType>>(CONTEXT.ACCORDION);
	const focusStore = getContext<Writable<FocusStoreType>>(CONTEXT.FOCUS);
	const accordionItemStore = writable<AccordionItemStoreType>({
		value
	});

	let open = false;

	setContext(CONTEXT.ACCORDION_ITEM, accordionItemStore);

	$: open = $accordionStore.open.includes(value);

	function toggle() {
		if (!open) {
			accordionStore.update((store) => {
				store.open = store.open.filter((item) => item !== value);
				return store;
			});
		} else {
			accordionStore.update((store) => {
				if (store.type === 'single') {
					store.open = [value];
				} else {
					store.open = [...store.open, value];
				}
				return store;
			});
		}
	}
</script>

<Collapsible.Container
	bind:open
	{disabled}
	{...$$restProps}
	focus={{ focusable: true, active: true, store: focusStore }}
	on:toggle={toggle}
>
	<slot />
</Collapsible.Container>

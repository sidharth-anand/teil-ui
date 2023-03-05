<script lang="ts">
	import type { CollapsibleStoreType } from './types';
	import type { FocusItemActionInput } from '../Focus/types';

	import { setContext, createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	import Focus from '../Focus';
	import id from '../id';

	type EventTypes = {
		toggle: void;
	};

	export let disabled: boolean = false;
	export let open: boolean = false;
	export let focus: FocusItemActionInput | undefined = undefined;

	const collapsibleStore = writable<CollapsibleStoreType>({
		open,
		disabled,
		id: id()
	});

	const dispatch = createEventDispatcher<EventTypes>();

	setContext(CONTEXT.COLLAPSIBLE, collapsibleStore);

	$: {
		if (open !== $collapsibleStore.open) {
			collapsibleStore.update((state) => ({
				...state,
				open
			}));
		}
	}

	$: {
		open = $collapsibleStore.open;
		dispatch('toggle');
	}
</script>

{#if focus === undefined}
	<div {...$$restProps}><slot /></div>
{:else}
	<div {...$$restProps} use:Focus.Item={focus}><slot /></div>
{/if}

<script lang="ts">
	//TODO: Add support for multiple select

	import type { Direction, SelectStoreType } from './types';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	import id from '../id';

	export let name: string = '';
	export let direction: Direction = 'ltr';
	export let autocomplete: boolean = true;

	export let value: string = '';
	export let open: boolean = false;
	export let disabled: boolean = false;
	export let required: boolean = false;

	//TODO: Support native control when part of form

	const selectStore = writable<SelectStoreType>({
		value,
		open,

		direction,
		disabled,
		required,
		autocomplete,

		contentID: id(),
		triggerID: id()
	});

	setContext(CONTEXT.SELECT, selectStore);

	$: {
		if (value !== $selectStore.value || open !== $selectStore.open) {
			selectStore.update((state) => ({
				...state,
				value,
				open
			}));
		}
	}

	$: {
		selectStore.update((state) => ({
			...state,
			disabled,
			direction,
			autocomplete
		}));
	}

	$: {
		value = $selectStore.value;
		open = $selectStore.open;
	}
</script>

<slot />

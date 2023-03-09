<script lang="ts">
	import type { DialogStoreType } from './types';

	import { createEventDispatcher, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	import id from '../id';

	export let open: boolean = false;
	export let modal: boolean = true;

	const dialogStore = writable<DialogStoreType>({
		open,
		modal,

		triggerID: id(),
		titleID: id(),
		contentID: id(),
		descriptionID: id()
	});
	const dispatch = createEventDispatcher();

	setContext(CONTEXT.DIALOG, dialogStore);

	$: {
		if (open !== $dialogStore.open) {
			dialogStore.update((state) => ({
				...state,
				open
			}));
		}
	}

	$: {
		open = $dialogStore.open;
		dispatch('openChange', open);
	}
</script>

<slot />

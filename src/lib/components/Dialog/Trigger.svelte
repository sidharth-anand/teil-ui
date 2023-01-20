<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { DialogStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	if (!hasContext(CONTEXT.DIALOG)) {
		throw new Error('Dialog.Trigger must be used inside Dialog.Container');
	}

	const dialogStore = getContext<Writable<DialogStoreType>>(CONTEXT.DIALOG);
</script>

<button
	id={$dialogStore.triggerID}
	class={$$props.class}
	type="button"
	aria-haspopup="dialog"
	aria-expanded={$dialogStore.open}
	aria-controls={$dialogStore.contentID}
	on:click={() => {
		dialogStore.update((state) => ({
			...state,
			open: !state.open
		}));
	}}
>
	<slot />
</button>

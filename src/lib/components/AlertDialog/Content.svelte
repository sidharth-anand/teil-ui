<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { DialogStoreType } from '../Dialog/types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	import Dismissable from '../Dismissable';
	import { createDismissableContext } from '../Dismissable/context';

	if (!hasContext(CONTEXT.DIALOG)) {
		throw new Error('Dialog.Content must be used inside Dialog.Container');
	}

	const dialogStore = getContext<Writable<DialogStoreType>>(CONTEXT.DIALOG);
	const dismissableStore = createDismissableContext();

	function escape(event: CustomEvent<KeyboardEvent>) {
		dialogStore.update((state) => ({
			...state,
			open: false
		}));
	}
</script>

{#if $dialogStore.open}
	<div
		role="alertdialog"
		on:escape={escape}
		id={$dialogStore.contentID}
		{...$$restProps}
		aria-describedby={$dialogStore.descriptionID}
		aria-labelledby={$dialogStore.titleID}
		use:Dismissable.Layer={{
			store: dismissableStore,
			disableOutsidePointerEvents: true
		}}
	>
		<slot />
	</div>
{/if}

<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { DialogStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	import Dismissable from '../Dismissable';
	import { createDismissableContext } from '../Dismissable/context';

	if (!hasContext(CONTEXT.DIALOG)) {
		throw new Error('Dialog.Content must be used inside Dialog.Container');
	}

	const dialogStore = getContext<Writable<DialogStoreType>>(CONTEXT.DIALOG);
	const dismissableStore = createDismissableContext();

	$: trapFocus = ($dialogStore.open && $dialogStore.modal) as boolean;
	$: disableOutsidePointerEvents = $dialogStore.modal as boolean;

	function focusoutside(event: CustomEvent<FocusEvent>) {
		if (trapFocus) {
			event.preventDefault();
		}
	}

	function pointerdownoutside(event: CustomEvent<PointerEvent>) {
		if ($dialogStore.modal) {
			const originalEvent = event.detail;
			const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
			const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

			if (isRightClick) {
				event.preventDefault();
			}
		}
	}

	function interactoutside(event: CustomEvent<PointerEvent | FocusEvent>) {
		if (!$dialogStore.modal) {
			if (
				document
					.getElementById($dialogStore.triggerID)
					.contains(event.detail.target as Node)
			) {
				event.preventDefault();
			}
		}
	}

	function dismiss() {
		dialogStore.update((state) => ({
			...state,
			open: false
		}));
	}
</script>

{#if $dialogStore.open}
	<div
		role="dialog"
		id={$dialogStore.contentID}
		class={$$props.class}
		aria-describedby={$dialogStore.descriptionID}
		aria-labelledby={$dialogStore.titleID}
		on:focusOutside={focusoutside}
		on:pointerDownOutside={pointerdownoutside}
		on:interact={interactoutside}
		on:dismiss={dismiss}
		use:Dismissable.Layer={{
			store: dismissableStore,
			disableOutsidePointerEvents
		}}
	>
		<slot />
	</div>
{/if}

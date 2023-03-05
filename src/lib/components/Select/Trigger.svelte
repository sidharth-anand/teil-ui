<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { SelectStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	import { OPEN_KEYS } from './constants';

	export let disabled: boolean = false;

	if (!hasContext(CONTEXT.SELECT)) {
		throw new Error('Select.Trigger must be used inside a Select.Container');
	}

	const selectStore = getContext<Writable<SelectStoreType>>(CONTEXT.SELECT);

	//TODO: Handle typeahead

	function open() {
		console.log('trigger open');

		if (!disabled && !$selectStore.disabled) {
			selectStore.update((state) => ({
				...state,
				open: true
			}));
		}
	}

	function click(event: MouseEvent) {
		(event.currentTarget as HTMLElement).focus();
	}

	function pointerdown(event: PointerEvent) {
		const target = event.target as HTMLElement;

		if (target.hasPointerCapture(event.pointerId)) {
			target.releasePointerCapture(event.pointerId);
		}

		if (event.button === 0 && event.ctrlKey === false) {
			open();
			event.preventDefault();

			console.log(event.pageX, event.pageY, Math.round(event.pageX));

			selectStore.update((state) => ({
				...state,
				triggerPointerPosition: {
					x: event.pageX,
					y: event.pageY
				}
			}));
		}
	}

	function keydown(event: KeyboardEvent) {
		//TODO: typeahaed
		if (OPEN_KEYS.includes(event.key)) {
			open();
			event.preventDefault();
		}
	}
</script>

<button
	bind:this={$selectStore.trigger}
	type="button"
	role="combobox"
	id={$selectStore.triggerID}
	{...$$restProps}
	disabled={$selectStore.disabled}
	aria-autocomplete="none"
	aria-controls={$selectStore.contentID}
	aria-expanded={$selectStore.open}
	aria-required={$selectStore.required}
	aria-disabled={$selectStore.disabled}
	on:click={click}
	on:pointerdown={pointerdown}
	on:keydown={keydown}
>
	<slot />
</button>

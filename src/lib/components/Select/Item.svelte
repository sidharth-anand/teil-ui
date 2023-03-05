<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { FocusStoreType } from '../Focus/types';
	import type { SelectStoreType, SelectItemStoreType } from './types';

	import { hasContext, getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	import { SELECTION_KEYS } from './constants';

	import Focus from '../Focus';
	import id from '../id';

	export let value: string;
	export let disabled: boolean = false;

	if (!hasContext(CONTEXT.SELECT)) {
		throw new Error('Select.Value must be used inside a Select.Container');
	}

	const selectStore = getContext<Writable<SelectStoreType>>(CONTEXT.SELECT);
	const focusStore = getContext<Writable<FocusStoreType>>(CONTEXT.FOCUS);
	const selectItemStore = writable<SelectItemStoreType>({
		value,
		disabled,
		id: id(),
		selected: false
	});

	let element: HTMLElement | null = null;

	$: selected = value === $selectStore.value;

	function select() {
		if (!disabled) {
			selectItemStore.update((state) => ({
				...state,
				selected: true
			}));

			selectStore.update((state) => ({
				...state,
				value,
				open: false,
				positioned: false
			}));
		}
	}

	function itemleave() {
		$selectStore.content?.focus();
	}

	function pointerup() {
		select();
	}

	function pointermove(event: PointerEvent) {
		if (disabled) {
			itemleave();
		} else {
			(event.currentTarget as HTMLElement).focus({ preventScroll: true });
			focusStore.update((state) => ({
				...state,
				currentStopIndex: Array.from(state.state.entries()).filter(
					([_, { node }]) => node === element
				)[0][0]
			}));
		}
	}

	function pointerleave(event: PointerEvent) {
		if (event.currentTarget === document.activeElement) {
			itemleave();
		}
	}

	function keydown(event: KeyboardEvent) {
		//TODO: typeahed
		if (SELECTION_KEYS.includes(event.key)) {
			select();
		}

		if (event.key === ' ') {
			event.preventDefault();
		}
	}

	setContext(CONTEXT.SELECTITEM, selectItemStore);

	$: {
		if (
			$selectStore.open &&
			$selectStore.value &&
			$selectStore.value === value &&
			element !== null &&
			$selectStore.selected !== element
		) {
			selectStore.update((state) => ({
				...state,
				selected: element
			}));

			focusStore.update((state) => ({
				...state,
				currentStopIndex: Array.from(state.state.entries()).filter(
					([_, { node }]) => node === element
				)[0][0]
			}));
		}
	}

	$: {
		if (!$selectStore.value && !$selectStore.selected && $selectStore.open && element) {
			if (
				$focusStore.state.get($focusStore.items[0]) &&
				element === $focusStore.state.get($focusStore.items[0]).node
			) {
				selectStore.update((state) => ({
					...state,
					selected: element
				}));

				selectItemStore.update((state) => ({
					...state,
					selected: true
				}));
			}
		}
	}

	$: {
		if ($selectStore.value) {
			selectItemStore.update((state) => ({
				...state,
				value,
				disabled,
				selected
			}));
		}
	}
</script>

<div
	bind:this={element}
	role="option"
	{...$$restProps}
	tabindex={disabled ? undefined : -1}
	aria-labelledby={$selectItemStore.id}
	aria-selected={selected}
	aria-disabled={disabled}
	on:pointerup={pointerup}
	on:pointermove={pointermove}
	on:pointerleave={pointerleave}
	on:keydown={keydown}
	use:Focus.Item={{ store: focusStore, focusable: !disabled }}
>
	<slot />
</div>

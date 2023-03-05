<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { SelectStoreType } from './types';

	import { hasContext, getContext, onMount, onDestroy, createEventDispatcher } from 'svelte';

	import { CONTEXT } from '../../constants';

	type EventTypes = {
		autoscroll: void;
	};

	if (!hasContext(CONTEXT.SELECT)) {
		throw new Error('Select.Value must be used inside a Select.Container');
	}

	const selectStore = getContext<Writable<SelectStoreType>>(CONTEXT.SELECT);

	const dispatch = createEventDispatcher<EventTypes>();

	let autoscrollTimer: NodeJS.Timeout | null = null;

	function clear() {
		if (autoscrollTimer !== null) {
			clearInterval(autoscrollTimer);
			autoscrollTimer = null;
		}
	}

	function pointermove() {
		$selectStore.content?.focus();
		if (autoscrollTimer === null) {
			autoscrollTimer = setInterval(() => {
				dispatch('autoscroll');
			}, 50);
		}
	}

	function pointerleave() {
		clear();
	}

	onMount(() => {
		if ($selectStore.selected) {
			$selectStore.selected.scrollIntoView({ block: 'nearest' });
		}
	});

	onDestroy(() => {
		clear();
	});
</script>

<div
	{...$$restProps}
	aria-hidden
	on:pointermove={pointermove}
	on:pointerleave={pointerleave}
>
	<slot />
</div>

<style>
	div {
		flex-shrink: 0;
	}
</style>
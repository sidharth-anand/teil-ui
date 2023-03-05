<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { ScrollStoreType } from './types';

	import { hasContext, getContext, onMount, onDestroy } from 'svelte';

	import { CONTEXT } from '../../constants';

	if (!hasContext(CONTEXT.SCROLL)) {
		throw new Error('Scroll.Bar must be used inside a Scroll.Area');
	}

	const scrollStore = getContext<Writable<ScrollStoreType>>(CONTEXT.SCROLL);

	$: visible =
		$scrollStore.type !== 'scroll' &&
		$scrollStore.vertical !== null &&
		$scrollStore.horizontal !== null &&
		$scrollStore.corner.width !== 0 &&
		$scrollStore.corner.height !== 0;

	const widthObserver = new ResizeObserver(() => {
		scrollStore.update((state) => ({
			...state,
			corner: {
				...state.corner,
				width: state.vertical?.offsetWidth ?? 0
			}
		}));
	});

	const heightObserver = new ResizeObserver(() => {
		scrollStore.update((state) => ({
			...state,
			corner: {
				...state.corner,
				height: state.horizontal?.offsetHeight ?? 0
			}
		}));
	});

	onMount(() => {
		if ($scrollStore.vertical) widthObserver.observe($scrollStore.vertical);
		if ($scrollStore.horizontal) heightObserver.observe($scrollStore.horizontal);
	});

	onDestroy(() => {
		widthObserver.disconnect();
		heightObserver.disconnect();
	});
</script>

{#if visible}
	<div
		{...$$restProps}
		style:right={$scrollStore.direction === 'ltr' ? 0 : undefined}
		style:left={$scrollStore.direction === 'rtl' ? 0 : undefined}
		style="
        width: {$scrollStore.corner.width}px;
        height: {$scrollStore.corner.height}px;
"
	>
		<slot />
	</div>
{/if}

<style>
	div {
		position: absolute;
		bottom: 0;
	}
</style>
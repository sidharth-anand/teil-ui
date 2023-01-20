<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { ScrollStoreType, Orientation } from '../types';

	import { hasContext, getContext, onMount, onDestroy } from 'svelte';

	import { CONTEXT } from '../../../constants';
	import { debounce } from '../../../debounce';

	import Visible from './Visible.svelte';

	export let orientation: Orientation;

	if (!hasContext(CONTEXT.SCROLL)) {
		throw new Error('Scroll.Bar must be used inside a Scroll.Area');
	}

	const scrollStore = getContext<Writable<ScrollStoreType>>(CONTEXT.SCROLL);

	const debouncedResize = debounce(() => {
		if ($scrollStore.viewport) {
			visible =
				orientation === 'horizontal'
					? $scrollStore.viewport.offsetWidth < $scrollStore.viewport.scrollWidth
					: $scrollStore.viewport.offsetHeight < $scrollStore.viewport.scrollHeight;
		}
	}, 10);
	const resizeObserver = new ResizeObserver(debouncedResize);

	let visible: boolean = false;

	onMount(() => {
		resizeObserver.observe($scrollStore.viewport);
		resizeObserver.observe($scrollStore.content);

		debouncedResize();
	});

	onDestroy(() => {
		resizeObserver.disconnect();
	});
</script>

{#if visible}
	<Visible class={$$props.class} {orientation}><slot /></Visible>
{/if}

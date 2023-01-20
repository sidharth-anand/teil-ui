<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { ScrollStoreType, Orientation } from '../types';

	import { hasContext, getContext, onMount, onDestroy } from 'svelte';

	import { CONTEXT } from '../../../constants';

	import Auto from './Auto.svelte';

	export let orientation: Orientation;

	if (!hasContext(CONTEXT.SCROLL)) {
		throw new Error('Scroll.Bar must be used inside a Scroll.Area');
	}

	const scrollStore = getContext<Writable<ScrollStoreType>>(CONTEXT.SCROLL);

	let visible: boolean = false;
	let hideTimer: NodeJS.Timeout = null;

	function pointerenter() {
		clearTimeout(hideTimer);
		visible = true;
	}

	function pointerleave() {
		hideTimer = setTimeout(() => {
			visible = false;
		}, $scrollStore.delay);
	}

	onMount(() => {
		$scrollStore.area?.addEventListener('pointerenter', pointerenter);
		$scrollStore.area?.addEventListener('pointerleave', pointerleave);
	});

	onDestroy(() => {
		$scrollStore.area?.removeEventListener('pointerenter', pointerenter);
		$scrollStore.area?.removeEventListener('pointerleave', pointerleave);
	});
</script>

{#if visible}
	<Auto class={$$props.class} {orientation}><slot /></Auto>
{/if}

<script lang="ts">
	import type { Direction, ScrollType, ScrollStoreType } from './types';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	export let type: ScrollType = 'auto';
	export let direction: Direction = 'ltr';
	export let delay: number = 500;

	const scrollStore = writable<ScrollStoreType>({
		type,
		direction,
		delay,

		area: null,
		viewport: null,
		content: null,
		vertical: null,
		horizontal: null,
		thumb: null,

		enableThumb: false,
		enableX: false,
		enableY: false,

		corner: { width: 0, height: 0 }
	});

	setContext(CONTEXT.SCROLL, scrollStore);
</script>

<div bind:this={$scrollStore.area} {...$$restProps}><slot /></div>

<style>
	div {
		position: relative;
	}
</style>

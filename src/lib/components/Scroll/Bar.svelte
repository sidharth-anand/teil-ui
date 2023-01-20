<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { ScrollStoreType, Orientation } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	import Auto from './Bars/Auto.svelte';
	import Hover from './Bars/Hover.svelte';
	import Scroll from './Bars/Scroll.svelte';
	import Visible from './Bars/Visible.svelte';

	export let orientation: Orientation = 'vertical';

	if (!hasContext(CONTEXT.SCROLL)) {
		throw new Error('Scroll.Bar must be used inside a Scroll.Area');
	}

	const scrollStore = getContext<Writable<ScrollStoreType>>(CONTEXT.SCROLL);
</script>

{#if $scrollStore.type === 'auto'}
	<Auto class={$$props.class} {orientation}><slot /></Auto>
{:else if $scrollStore.type === 'hover'}
	<Hover class={$$props.class} {orientation}><slot /></Hover>
{:else if $scrollStore.type === 'scroll'}
	<Scroll class={$$props.class} {orientation}><slot /></Scroll>
{:else if $scrollStore.type === 'always'}
	<Visible class={$$props.class} {orientation}><slot /></Visible>
{/if}

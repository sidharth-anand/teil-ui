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

	const scrollComponents = {
		auto: Auto,
		hover: Hover,
		scroll: Scroll,
		always: Visible
	};
</script>

<svelte:component this={scrollComponents[$scrollStore.type]} {orientation} {...$$restProps}
	><slot /></svelte:component
>

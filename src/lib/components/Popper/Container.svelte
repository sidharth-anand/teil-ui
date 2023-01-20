<script lang="ts">
	import type { Measurable, PopperStoreType } from './types';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	export let anchor: Measurable | undefined = undefined;

	const popperStore = writable<PopperStoreType>({
		anchor,
		reference: null
	});

	setContext(CONTEXT.POPPER, popperStore);
</script>

<slot />

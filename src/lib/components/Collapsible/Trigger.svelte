<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { CollapsibleStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	if (!hasContext(CONTEXT.COLLAPSIBLE)) {
		throw new Error('Collapsible.Trigger must be used inside Collapsible.Container');
	}

	const collapsibleStore = getContext<Writable<CollapsibleStoreType>>(CONTEXT.COLLAPSIBLE);

	function toggle() {
		if ($collapsibleStore.disabled) {
			return;
		}

		collapsibleStore.update((state) => ({
			...state,
			open: !state.open
		}));
	}
</script>

<button
	type="button"
	aria-controls={$collapsibleStore.id}
	aria-expanded={$collapsibleStore.open}
	aria-disabled={$collapsibleStore.disabled}
	disabled={$collapsibleStore.disabled}
	on:click={toggle}
	class={$$props.class}><slot /></button
>

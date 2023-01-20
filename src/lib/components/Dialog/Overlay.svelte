<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { DialogStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	if (!hasContext(CONTEXT.DIALOG)) {
		throw new Error('Dialog.Trigger must be used inside Dialog.Container');
	}

	const dialogStore = getContext<Writable<DialogStoreType>>(CONTEXT.DIALOG);

	//TODO: Scroll lock other components
</script>

{#if $dialogStore.open}
	<div class={$$props.class} style="pointer-events: auto;"><slot /></div>
{/if}

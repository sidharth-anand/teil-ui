<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { ProgressStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	if (!hasContext(CONTEXT.PRORGRESS)) {
		throw new Error('Progress.Bar must be used inside a Progress.Track');
	}

	const progressStore = getContext<Writable<ProgressStoreType>>(CONTEXT.PRORGRESS);

	$: state =
		$progressStore.value === null
			? 'indeterminate'
			: $progressStore.value === $progressStore.max
			? 'complete'
			: 'loading';
</script>

<div {...$$restProps} data-value={$progressStore.value} data-state={state}>
	<slot />
</div>

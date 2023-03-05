<script lang="ts">
	import type { SelectGroupStoreType } from './types';

	import { hasContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	import id from '../id';

	if (!hasContext(CONTEXT.SELECT)) {
		throw new Error('Select.Group must be used inside a Select.Container');
	}

	const selectGroupStore = writable<SelectGroupStoreType>({
		id: id()
	});

	setContext(CONTEXT.SELECTGROUP, selectGroupStore);
</script>

<div role="group" {...$$restProps} aria-labelledby={$selectGroupStore.id}>
	<slot />
</div>

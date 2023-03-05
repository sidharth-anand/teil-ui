<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { DropdownStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	import Menu from '../Menu';

	if (!hasContext(CONTEXT.DROPDOWNMENU)) {
		throw new Error('DropdownMenu.Content must be used inside DropdownMenu.Container');
	}

	const dropdownStore = getContext<Writable<DropdownStoreType>>(CONTEXT.DROPDOWNMENU);
</script>

<Menu.Content
	id={$dropdownStore.contentID}
	{...$$restProps}
	side="bottom"
	alignment="center"
	labelled={$dropdownStore.triggerID}
>
	<slot />
</Menu.Content>

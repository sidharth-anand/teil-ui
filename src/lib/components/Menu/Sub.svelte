<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { MenuStoreType, SubmenuStoreType } from './types';

	import { hasContext, getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	import Popper from '../Popper';
	import id from '../id';

	import Container from './Container.svelte';
	import Item from './Item.svelte';

	let open = false;

	let isSubmenu = false;
	let previousSubmenuStore = null;

	if (!hasContext(CONTEXT.MENU)) {
		throw new Error('Menu.Sub must be used inside Menu.Container');
	}

	if (hasContext(CONTEXT.SUBMENU)) {
		isSubmenu = true;
		previousSubmenuStore = getContext<Writable<SubmenuStoreType>>(CONTEXT.SUBMENU);
	}

	const menuStore = getContext<Writable<MenuStoreType>>(CONTEXT.MENU);
	const submenuStore = writable<SubmenuStoreType>({
		open: false,

		triggerID: id(),
		contentID: id(),

		root: isSubmenu ? previousSubmenuStore.root : menuStore
	});

	setContext(CONTEXT.SUBMENU, submenuStore);

	$: {
		open = $submenuStore.open;
	}
</script>

<Popper.Container>
	<Popper.Anchor>
		<Item submenu class={$$props.class}><slot name="item" /></Item>
	</Popper.Anchor>
	<Container submenu bind:open modal={$menuStore.modal} direction={$menuStore.direction}>
		<slot name="menu" />
	</Container>
</Popper.Container>

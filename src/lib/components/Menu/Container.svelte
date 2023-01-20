<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { Direction, MenuStoreType, SubmenuStoreType } from './types';

	import { hasContext, getContext, setContext, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	import Popper from '../Popper';

	export let open: boolean = false;
	export let modal: boolean = true;
	export let submenu: boolean = false;
	export let direction: Direction = 'ltr';

	let keyboard = false;

	if (submenu && !hasContext(CONTEXT.SUBMENU)) {
		throw new Error('Menu.Container marked as a submenu must be used inside Menu.Sub');
	}

	const menuStore = writable<MenuStoreType>({
		open,
		modal,
		submenu,
		keyboard,
		direction,
		value: null
	});

	onMount(() => {
		const keyDown = () => {
			keyboard = true;

			document.addEventListener('pointerdown', pointerDown, {
				capture: true,
				once: true
			});
			document.addEventListener('pointermove', pointerDown, {
				capture: true,
				once: true
			});
		};

		const pointerDown = () => {
			keyboard = false;
		};

		document.addEventListener('keydown', keyDown, { capture: true });
	});

	setContext(CONTEXT.MENU, menuStore);

	$: {
		menuStore.update((state) => ({
			...state,
			keyboard,
			submenu,
			modal,
			direction
		}));
	}

	$: {
		if (submenu) {
			menuStore.update((state) => ({
				...state,
				open
			}));
		}
	}
</script>

{#if !submenu}
	<Popper.Container><slot /></Popper.Container>
{:else}
	<slot />
{/if}

<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { Point, MenuStoreType } from '../Menu/types';
	import type { Measurable } from '../Popper/types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	import Menu from '../Menu';

	export let disabled: boolean = false;

	if (!hasContext(CONTEXT.MENU)) {
		throw new Error('ContextMenu.Trigger must be used inside ContextMenu.Container');
	}

	const menuStore = getContext<Writable<MenuStoreType>>(CONTEXT.MENU);

	let point: Point = { x: 0, y: 0 };
	let longpress: NodeJS.Timeout = null;

	function clearLongpress() {
		if (longpress !== null) {
			clearTimeout(longpress);
			longpress = null;
		}
	}

	function open(event: MouseEvent | PointerEvent) {
		if (!$menuStore.open) {
			point = { x: event.clientX, y: event.clientY };
			console.log(point);

			menuStore.update((state) => ({
				...state,
				open: true
			}));
		}
	}

	function contextmenu(event: MouseEvent) {
		if (!disabled) {
			clearLongpress();

			open(event);
			event.preventDefault();
		}
	}

	function pointerdown(event: PointerEvent) {
		clearLongpress();
		longpress = setTimeout(() => open(event), 500);
	}

	$: target = {
		getBoundingClientRect: () => ({ ...point, width: 0, height: 0 })
	} as Measurable;
</script>

<Menu.Anchor virtualElement={target}>
	<span
		{...$$restProps}
		on:contextmenu={contextmenu}
		on:pointerdown={pointerdown}
		on:pointermove={clearLongpress}
		on:pointerup={clearLongpress}
		on:pointercancel={clearLongpress}
	>
		<slot />
	</span>
</Menu.Anchor>

<style>
	span {
		--webkit-touch-callout: 'none'
	}
</style>
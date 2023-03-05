<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { FocusStoreType } from '../Focus/types';
	import type { DismissableStoreType } from '../Dismissable/types';

	import type { Point, Checked, Direction, MenuStoreType, SubmenuStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';
	import { SELECTION_KEYS, SUBMENU_OPEN_KEYS } from './constants';

	import Focus from '../Focus';
	import Dismissable from '../Dismissable';

	export let disabled: boolean = false;
	export let closeOnClick: boolean = true;

	export let value: string = '';
	export let disableImplicitValue: boolean = false;

	export let submenu: boolean = false;

	export let role: string = 'menuitem';
	export let ariaChecked: Checked = null;

	if (!hasContext(CONTEXT.MENU)) {
		throw new Error('Menu.Item must be used inside Menu.Container');
	}

	if (!hasContext(CONTEXT.FOCUS) || !hasContext(CONTEXT.DISMISSABLE)) {
		throw new Error('Menu.Item must be used inside Menu.Content');
	}

	if (submenu && !hasContext(CONTEXT.SUBMENU)) {
		throw new Error('Menu.Item marked as a submenu must be inside Menu.Sub');
	}

	const menuStore = getContext<Writable<MenuStoreType>>(CONTEXT.MENU);
	const submenuStore = getContext<Writable<SubmenuStoreType> | undefined>(CONTEXT.SUBMENU);
	const focusStore = getContext<Writable<FocusStoreType>>(CONTEXT.FOCUS);
	const dismissableStore = getContext<Writable<DismissableStoreType>>(CONTEXT.DISMISSABLE);

	let element: HTMLElement = null;

	let active: boolean = false;
	let isPointerDown: boolean = false;

	let submenuTimer: NodeJS.Timeout = null;

	let cursor: Point | null = null;
	let cursorDirection: Direction | null;
	let area: Array<Point> | null = null;

	function inPolygon(
		point: { x: number; y: number },
		polygon: Array<{ x: number; y: number }>
	): boolean {
		const { x, y } = point;
		let inside = false;
		for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
			const xi = polygon[i].x;
			const yi = polygon[i].y;
			const xj = polygon[j].x;
			const yj = polygon[j].y;

			const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
			if (intersect) inside = !inside;
		}

		return inside;
	}

	function select() {
		//TODO: Handle Selection?
		console.log(closeOnClick);
		if (closeOnClick) {
			focusStore.update((state) => ({
				...state,
				currentStopIndex: undefined
			}));

			if ($menuStore.submenu) {
				$submenuStore.root.update((state) => ({
					...state,
					open: false
				}));
			}

			menuStore.update((state) => ({
				...state,
				open: false
			}));
		}
	}

	function click(event: MouseEvent) {
		if (!submenu) {
			select();
		} else if (!disabled) {
			(event.currentTarget as HTMLElement).focus();
			submenuStore.update((state) => ({
				...state,
				open: true
			}));
		}
	}

	function pointerdown() {
		isPointerDown = true;
	}

	function pointerup(event: PointerEvent) {
		if (!isPointerDown) {
			(event.currentTarget as HTMLElement)?.click();
		}
	}

	function pointermove(event: PointerEvent) {
		if (event.pointerType === 'mouse' && !disabled) {
			active = true;

			if (submenu && !$submenuStore.open && submenuTimer === null) {
				submenuTimer = setTimeout(() => {
					submenuStore.update((state) => ({
						...state,
						open: true
					}));

					submenuTimer = null;
				}, 100);
			}
		}
	}

	function pointerleave(event: PointerEvent) {
		clearTimeout(submenuTimer);
		submenuTimer = null;

		if (!submenu) {
			active = false;
			return;
		}

		cursorDirection = event.clientX > (cursor?.x ?? 0) ? 'ltr' : 'rtl';
		cursor = { x: event.clientX, y: event.clientY };

		const contentRect = $submenuStore.content?.getBoundingClientRect();

		if (!contentRect) {
			active = false;
			return;
		}

		const right = $menuStore.direction === 'ltr';

		const pad = 5;
		const bleed = right ? -pad : pad;

		const near = contentRect[right ? 'left' : 'right'];
		const far = contentRect[right ? 'right' : 'left'];

		area = [
			{ x: event.clientX + bleed, y: event.clientY },
			{ x: near, y: contentRect.top },
			{ x: far, y: contentRect.top },
			{ x: far, y: contentRect.bottom },
			{ x: near, y: contentRect.bottom }
		];

		active = inPolygon(cursor, area) && cursorDirection === $menuStore.direction;
	}

	function keydown(event: KeyboardEvent) {
		if (disabled) return;

		if (!submenu) {
			if (SELECTION_KEYS.includes(event.key)) {
				if (!event.defaultPrevented) {
					(event.currentTarget as HTMLElement)?.click();
					event.preventDefault();
				}
			}
		} else {
			if (SUBMENU_OPEN_KEYS[$menuStore.direction].includes(event.key)) {
				submenuStore.update((state) => ({
					...state,
					open: true
				}));
				event.preventDefault();
			}
		}
	}

	function focus() {
		active = true;
	}

	function blur() {
		if (submenu && cursor && cursorDirection && area) {
			active = inPolygon(cursor, area) && cursorDirection === $menuStore.direction;
		} else {
			active = false;
		}

		if (submenu && !active) {
			submenuStore.update((state) => ({
				...state,
				open: false
			}));
		}
	}

	if (submenu) {
		submenuStore.update((state) => ({
			...state,
			refocus: () => {
				active = true;
				submenuStore.update((state) => ({
					...state,
					open: false
				}));
			},
			reset: () => {
				active = false;
				focusStore.update((state) => ({
					...state,
					currentStopIndex: undefined
				}));
				submenuStore.update((state) => ({
					...state,
					open: false
				}));
			}
		}));
	}

	$: computedValue = value || (disableImplicitValue ? '' : element?.textContent ?? '');

	$: {
		if (active) {
			menuStore.update((state) => ({
				...state,
				value: computedValue
			}));
		}
	}

	$: {
		if (submenu) {
			if ($menuStore.value !== computedValue) {
				active = false;
				submenuStore.update((state) => ({
					...state,
					open: false
				}));
			}
		}
	}

	$: {
		if (submenu && element !== null) {
			submenuStore.update((state) => ({
				...state,
				trigger: element
			}));
		}
	}
</script>

<div
	bind:this={element}
	id={submenu ? $submenuStore.triggerID : null}
	{...$$restProps}
	{role}
	{disabled}
	data-active={active}
	data-submenu-active={submenu ? $submenuStore.open : null}
	aria-disabled={disabled}
	aria-checked={ariaChecked === 'indeterminate' ? 'mixed' : ariaChecked}
	aria-haspopup={submenu ? 'menu' : null}
	aria-expanded={submenu ? $submenuStore.open : null}
	aria-controls={submenu ? $submenuStore.contentID : null}
	on:click
	on:keydown
	on:click={click}
	on:pointerdown={pointerdown}
	on:pointerup={pointerup}
	on:pointermove={pointermove}
	on:pointerleave={pointerleave}
	on:keydown={keydown}
	on:focus={focus}
	on:blur={blur}
	use:Focus.Item={{
		store: focusStore,
		focusable: !disabled,
		focused: active,
		active
	}}
	use:Dismissable.Branch={dismissableStore}
>
	<slot />
</div>

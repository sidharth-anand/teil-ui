<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { HoverCardStoreType } from './types';

	import { hasContext, getContext, onMount, onDestroy } from 'svelte';

	import { CONTEXT } from '../../constants';

	import Dismissable from '../Dismissable';
	import Popper from '../Popper';

	import { createDismissableContext } from '../Dismissable/context';

	if (!hasContext(CONTEXT.HOVERCARD)) {
		throw new Error('HoverCard.Content must be used inside HoverCard.Container');
	}

	const hoverCardStore = getContext<Writable<HoverCardStoreType>>(CONTEXT.HOVERCARD);
	const dismissableStore = createDismissableContext();

	let element: HTMLElement = null;

	let isPointerDown: boolean = false;
	let hasSelection: boolean = false;
	let containsSelection: boolean = false;

	let originalUserSelect: string = null;

	function dismiss() {
		hoverCardStore.update((state) => ({
			...state,
			open: false
		}));
	}

	function pointerdown(event: PointerEvent) {
		if ((event.currentTarget as HTMLElement).contains(event.target as Node)) {
			containsSelection = true;
		}

		hasSelection = false;
		isPointerDown = true;
	}

	function pointerup() {
		containsSelection = false;
		isPointerDown = false;

		setTimeout(() => {
			hasSelection = document.getSelection()?.toString() !== '';
		});
	}

	function pointerenter(event: PointerEvent) {
		if (event.pointerType !== 'touch') {
			$hoverCardStore.toggle?.(true);
		}
	}

	function pointerleave(event: PointerEvent) {
		if (event.pointerType !== 'touch') {
			$hoverCardStore.toggle?.(false);
		}
	}

	function disableTabbing() {
		if (element) {
			const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
				acceptNode: (node: any) => {
					return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
				}
			});

			while (walker.nextNode()) {
				(walker.currentNode as HTMLElement).setAttribute('tabindex', '-1');
			}
		}
	}

	onMount(() => {
		document.addEventListener('pointerup', pointerup);

		disableTabbing();
	});

	onDestroy(() => {
		if (originalUserSelect !== null) {
			document.body.style.userSelect = originalUserSelect;
		}

		if (globalThis.document) {
			document.removeEventListener('pointerup', pointerup);
		}
	});

	$: {
		if (containsSelection) {
			const body = document.body;

			if (originalUserSelect === null) {
				originalUserSelect = body.style.userSelect;
			}

			body.style.userSelect = 'none';
		}
	}

	$: {
		if ($hoverCardStore.open && element) {
			disableTabbing();
		}
	}
</script>

<Popper.Content>
	{#if $hoverCardStore.open}
		<div
			bind:this={element}
			class={$$props.class}
			style="
        user-select: {containsSelection ? 'text' : undefined};
        '--webkit-user-select': {containsSelection ? 'text' : undefined};
      "
			on:dismiss={dismiss}
			on:pointerenter={pointerenter}
			on:pointerleave={pointerleave}
			on:pointerdown={pointerdown}
			use:Dismissable.Layer={{
				store: dismissableStore,
				disableOutsidePointerEvents: false
			}}
		>
			<slot />
		</div>
	{/if}
</Popper.Content>

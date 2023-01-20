<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { FocusIntent } from '../Focus/types';
	import type { SelectStoreType } from './types';

	import { hasContext, getContext, onMount, onDestroy, setContext } from 'svelte';

	import { hideOthers } from 'aria-hidden';

	import { CONTEXT } from '../../constants';
	import { clamp } from '../../math';

	import { CONTENT_MARGIN } from './constants';

	import Focus from '../Focus';
	import Dismissable from '../Dismissable';

	import { createFocusContext } from '../Focus/context';
	import { createDismissableContext } from '../Dismissable/context';

	if (!hasContext(CONTEXT.SELECT)) {
		throw new Error('Select.Value must be used inside a Select.Container');
	}

	const selectStore = getContext<Writable<SelectStoreType>>(CONTEXT.SELECT);
	const focusStore = createFocusContext({
		orientation: 'vertical',
		direction: $selectStore.direction,
		loop: true,

		forceFocusContainer: true,
		forceFocusAll: true,
		focusContainerOnMount: true,

		getFocusIntent: intent
	});
	const dismissableStore = createDismissableContext();

	let delta: { x: number; y: number } = { x: 0, y: 0 };

	function intent(event: KeyboardEvent): FocusIntent {
		if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
			event.preventDefault();
		}

		switch (event.key) {
			case 'ArrowUp':
				return 'previous';
			case 'ArrowDown':
				return 'next';
			case 'Home':
				return 'first';
			case 'End':
				return 'last';
			default:
				return undefined;
		}
	}

	function ltr() {
		const trigger = $selectStore.trigger.getBoundingClientRect();
		const content = $selectStore.content.getBoundingClientRect();
		const value = $selectStore.display.getBoundingClientRect();
		const text = $selectStore.text.getBoundingClientRect();

		const offset = text.left - content.left;
		const left = value.left - offset;
		const delta = trigger.left - left;

		const min = trigger.width + delta;
		const width = Math.max(min, content.width);

		const right = window.innerWidth - CONTENT_MARGIN;
		const clamped = clamp([CONTENT_MARGIN, right - width], left);

		$selectStore.wrapper.style.minWidth = min + 'px';
		$selectStore.wrapper.style.left = clamped + 'px';
	}

	function rtl() {
		const trigger = $selectStore.trigger.getBoundingClientRect();
		const content = $selectStore.content.getBoundingClientRect();
		const value = $selectStore.display.getBoundingClientRect();
		const text = $selectStore.text.getBoundingClientRect();

		const offset = text.right - content.right;
		const right = window.innerWidth - value.right - offset;
		const delta = window.innerWidth - right - trigger.right;

		const min = trigger.width + delta;
		const width = Math.max(min, content.width);

		const left = window.innerWidth - CONTENT_MARGIN;
		const clamped = clamp([CONTENT_MARGIN, left - width], right);

		$selectStore.wrapper.style.minWidth = min + 'px';
		$selectStore.wrapper.style.right = clamped + 'px';
	}

	function horizontal() {
		if ($selectStore.direction === 'ltr') {
			ltr();
		} else {
			rtl();
		}
	}

	function vertical() {
		const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
		const itemsHeight = $selectStore.viewport.scrollHeight;

		const contentStyles = window.getComputedStyle($selectStore.content);
		const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
		const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
		const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
		const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
		const fullContentHeight =
			contentBorderTopWidth +
			contentPaddingTop +
			itemsHeight +
			contentPaddingBottom +
			contentBorderBottomWidth;
		const minContentHeight = Math.min(
			$selectStore.selected.offsetHeight * 5,
			fullContentHeight
		);

		const viewportStyles = window.getComputedStyle($selectStore.viewport);
		const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
		const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);

		const topEdgeToTriggerMiddle =
			$selectStore.trigger.getBoundingClientRect().top +
			$selectStore.trigger.getBoundingClientRect().height / 2 -
			CONTENT_MARGIN;
		const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;

		const selectedItemHalfHeight = $selectStore.selected.offsetHeight / 2;
		const itemOffsetMiddle = $selectStore.selected.offsetTop + selectedItemHalfHeight;
		const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
		const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;

		const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;

		if (willAlignWithoutTopOverflow) {
			const isLastItem =
				$selectStore.selected ===
				$focusStore.state.get($focusStore.items[$focusStore.items.length - 1]).node;

			const viewportOffsetBottom =
				$selectStore.content.clientHeight -
				$selectStore.viewport.offsetTop -
				$selectStore.viewport.offsetHeight;
			const clampedTriggerMiddleToBottomEdge = Math.max(
				triggerMiddleToBottomEdge,
				selectedItemHalfHeight +
					(isLastItem ? viewportPaddingBottom : 0) +
					viewportOffsetBottom +
					contentBorderBottomWidth
			);
			const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;

			$selectStore.wrapper.style.bottom = '0px';
			$selectStore.wrapper.style.height = height + 'px';
		} else {
			const isFirstItem =
				$selectStore.selected === $focusStore.state.get($focusStore.items[0]).node;

			const clampedTopEdgeToTriggerMiddle = Math.max(
				topEdgeToTriggerMiddle,
				contentBorderTopWidth +
					$selectStore.viewport.offsetTop +
					(isFirstItem ? viewportPaddingTop : 0) +
					selectedItemHalfHeight
			);
			const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;

			$selectStore.wrapper.style.top = '0px';
			$selectStore.wrapper.style.height = height + 'px';

			$selectStore.viewport.scrollTop =
				contentTopToItemMiddle - topEdgeToTriggerMiddle + $selectStore.viewport.offsetTop;
		}

		$selectStore.wrapper.style.margin = `${CONTENT_MARGIN}px 0`;
		$selectStore.wrapper.style.minHeight = minContentHeight + 'px';
		$selectStore.wrapper.style.maxHeight = availableHeight + 'px';
	}

	function position() {
		console.log('position', $selectStore.text, $selectStore.content);

		if (!$selectStore.text || !$selectStore.content || $selectStore.positioned) return;

		horizontal();
		vertical();

		selectStore.update((state) => ({
			...state,
			positioned: true
		}));

		requestAnimationFrame(() => {
			selectStore.update((state) => ({
				...state,
				expandOnScroll: true
			}));
		});
	}

	function close() {
		console.log('close');
		selectStore.update((state) => ({
			...state,
			open: false,
			positioned: false
		}));
	}

	function pointermove(event: PointerEvent) {
		delta = {
			x: Math.abs(Math.round(event.pageX) - $selectStore.triggerPointerPosition?.x ?? 0),
			y: Math.abs(Math.round(event.pageY) - $selectStore.triggerPointerPosition?.y ?? 0)
		};
	}

	function pointerup(event: PointerEvent) {
		if (delta.x <= 10 && delta.y <= 10) {
			event.preventDefault();
			event.stopPropagation();
		} else if ($selectStore.content) {
			if (!$selectStore.content.contains(event.target as HTMLElement)) {
				close();
			}
		}

		document.removeEventListener('pointermove', pointermove);

		selectStore.update((state) => ({
			...state,
			triggerPointerPosition: null
		}));
	}

	function blur() {
		return;
		close();
	}

	function resize() {
		close();
	}

	function contextmenu(event: Event) {
		event.preventDefault();
	}

	function focusoutside(event: CustomEvent<FocusEvent>) {
		event.preventDefault();
	}

	function pointerdownoutside(event: CustomEvent<PointerEvent>) {
		if ($selectStore.trigger.contains(event.detail.target as HTMLElement)) {
			event.preventDefault();
		}
	}

	function dismiss() {
		close();
	}

	function keydown() {
		//TODO: typeahead
	}

	onMount(() => {
		window.addEventListener('blur', blur);
		window.addEventListener('resize', resize);
	});

	onDestroy(() => {
		if (globalThis.document) {
			document.removeEventListener('pointermove', pointermove);
			document.removeEventListener('pointerup', pointerup, { capture: true });
		}

		if (globalThis.window) {
			window.removeEventListener('blur', blur);
			window.removeEventListener('resize', resize);
		}
	});

	setContext(CONTEXT.FOCUS, focusStore);

	$: {
		if (
			$selectStore.open &&
			!$selectStore.positioned &&
			$selectStore.content &&
			$selectStore.text
		) {
			position();
		}
	}

	$: {
		if ($selectStore.content && $selectStore.triggerPointerPosition !== null) {
			document.addEventListener('pointermove', pointermove);
			document.addEventListener('pointerup', pointerup, {
				capture: true,
				once: true
			});
		}
	}

	$: {
		if ($selectStore.open && $focusStore.currentStopIndex && $selectStore.viewport) {
			if ($focusStore.currentStopIndex === $focusStore.items[0]) {
				$selectStore.viewport.scrollTop = 0;
			} else if (
				$focusStore.currentStopIndex === $focusStore.items[$focusStore.items.length - 1]
			) {
				$selectStore.viewport.scrollTop = $selectStore.viewport.scrollHeight;
			}
		}
	}

	//TODO: Disable scroll outside content
</script>

{#if $selectStore.open}
	<div
		bind:this={$selectStore.wrapper}
		style="
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: {$selectStore.content ? window.getComputedStyle($selectStore.content).zIndex : 0};
"
	>
		<div
			bind:this={$selectStore.content}
			role="listbox"
			id={$selectStore.contentID}
			class={$$props.class}
			style="
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      height: 100%;
      outline: none;
    "
			on:contextmenu={contextmenu}
			on:keydown={keydown}
			on:focusOutside={focusoutside}
			on:pointerDownOutside={pointerdownoutside}
			on:dismiss={dismiss}
			use:Focus.Group={focusStore}
			use:Dismissable.Layer={{
				store: dismissableStore,
				disableOutsidePointerEvents: true
			}}
		>
			<slot />
		</div>
	</div>
{/if}

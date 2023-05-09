<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { FocusStoreType } from '../Focus/types';
	import type { RadioStoreType } from './types';

	import { hasContext, getContext, onMount } from 'svelte';

	import Focus from '../Focus';

	import { CONTEXT } from '../../constants';
	import { NoJS } from '../../nojs';

	export let value: string;

	if (!hasContext(CONTEXT.RADIO)) {
		throw new Error('Radio.Button must be used inside Radio.Group');
	}

	const radioStore = getContext<Writable<RadioStoreType>>(CONTEXT.RADIO);
	const focusStore = getContext<Writable<FocusStoreType>>(CONTEXT.FOCUS);

	let arrowKeyNavigation = false;

	function update() {
		radioStore.update((state) => ({
			...state,
			value
		}));
	}

	function click(event: MouseEvent) {
		update();
		event.stopPropagation();
	}

	function keydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	}

	function focus() {
		if (arrowKeyNavigation) {
			update();
		}
	}

	onMount(() => {
		document.addEventListener('keydown', (event) => {
			if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
				arrowKeyNavigation = true;
			} else {
				arrowKeyNavigation = false;
			}
		});
	});

	$: checked = $radioStore.value === value;
</script>

<button
	role="radio"
	id={$$props.id}
	style={$$props.style}
	class={$$props.class}
	{value}
	disabled={$radioStore.disabled}
	aria-checked={checked}
	aria-disabled={$radioStore.disabled}
	on:click={click}
	on:keydown={keydown}
	on:focus={focus}
	use:Focus.Item={{
		focusable: true,
		active: checked,
		store: focusStore
	}}
>
	<slot />
</button>

<input
	type="radio"
	id={$$props.id}
	style="position: absolute;"
	name={$radioStore.name}
	{checked}
	disabled={$radioStore.disabled}
	required={$radioStore.required}
	formaction={$$props.formaction}
	aria-required={$radioStore.required}
	aria-disabled={$radioStore.disabled}
	use:NoJS
/>

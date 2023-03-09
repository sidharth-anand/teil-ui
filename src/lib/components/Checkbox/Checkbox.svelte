<script lang="ts">
	import type { CheckboxStoreType, CheckboxState } from './types';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';
	import { NoJS } from '../../nojs';

	export let name: string = '';

	export let checked: CheckboxState = false;
	export let required: boolean = false;
	export let disabled: boolean = false;

	const checkboxStore = writable<CheckboxStoreType>({
		state: checked,
		disabled
	});

	function keydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	}

	function click(event: MouseEvent) {
		checked = checked === 'indeterminate' ? true : !checked;
		event.stopPropagation();
	}

	$: {
		if (checked !== $checkboxStore.state) {
			checkboxStore.update((state) => ({
				...state,
				state: checked
			}));
		}
	}

	$: {
		checked = $checkboxStore.state;
	}

	$: {
		checkboxStore.update((state) => ({
			...state,
			disabled
		}));
	}

	setContext(CONTEXT.CHECKBOX, checkboxStore);
</script>

<button
	style={$$props.style}
	class={$$props.class}
	type="button"
	role="checkbox"
	aria-checked={checked === 'indeterminate' ? 'mixed' : checked}
	aria-required={required}
	aria-disabled={disabled}
	{disabled}
	on:keydown={keydown}
	on:click={click}
>
	<slot state={checked} {disabled} />
</button>

<input
	type="checkbox"
	id={$$props.id}
	style="position: absolute;"
	{name}
	{required}
	{disabled}
	aria-required={required}
	aria-disabled={disabled}
	formaction={$$props.formaction}
	checked={checked === 'indeterminate' ? true : checked}
	use:NoJS
/>

<script lang="ts">
	import type { CheckboxStoreType, CheckboxState } from './types';


	import { createEventDispatcher, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';
	import { NoJS } from '../../nojs';

	export let name: string = '';

	export let checked: CheckboxState = false;
	export let required: boolean = false;
	export let disabled: boolean = false;

	//TODO: add ability to make state controllable to allow state being indeterminate

	const checkboxStore = writable<CheckboxStoreType>({
		state: checked,
		disabled
	});
	const dispatch = createEventDispatcher<{change: CheckboxState}>();

	function keydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	}

	function click(event: MouseEvent) {
		checkboxStore.update(state => ({
			...state,
			state: $checkboxStore.state === 'indeterminate' ? true : !$checkboxStore.state
		}));

		dispatch('change', $checkboxStore.state);
		
		event.stopPropagation();
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

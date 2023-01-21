<script lang="ts">
	import { hasContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	import type { CheckboxStoreType, CheckboxState } from './types';

	export let checked: CheckboxState = false;
	export let required: boolean = false;
	export let disabled: boolean = false;

	const isFormControl = hasContext(CONTEXT.FORM);

	const checkboxStore = writable<CheckboxStoreType>({
		state: checked,
		disabled
	});

	$: {
		if (checked !== $checkboxStore.state) {
			checkboxStore.update(state => ({
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
	class={$$props.class}
	type="button"
	role="checkbox"
	aria-checked={checked === 'indeterminate' ? 'mixed' : checked}
	aria-required={required}
	aria-disabled={disabled}
	{disabled}
	on:keydown={(event) => {
		if (event.key === 'Enter') event.preventDefault();
	}}
	on:click={(event) => {
		checked = checked === 'indeterminate' ? true : !checked;
		if (isFormControl) {
			event.stopPropagation();
		}
	}}
>
	<slot state={checked} {disabled} />
</button>

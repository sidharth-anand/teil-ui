<script lang="ts">
	import { createEventDispatcher, hasContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import type { SwitchStoreType } from './types';

	import { CONTEXT } from '../../constants';

	export let checked: boolean = false;
	export let disabled: boolean = false;

	const isFormControl = hasContext(CONTEXT.FORM);

	const switchStore = writable<SwitchStoreType>({
		checked
	});
	const dispatch = createEventDispatcher<{change: boolean}>();

	setContext(CONTEXT.SWITCH, switchStore);

	$: {
		if (checked !== $switchStore.checked) {
			switchStore.update(state => ({
				...state,
				checked
			}));
		}
	}

	$: {
		checked = $switchStore.checked;
		dispatch('change', checked);
	}
</script>

<button
	type="button"
	role="switch"
	{checked}
	{disabled}
	aria-checked={checked}
	aria-disabled={disabled}
	{...$$restProps}
	on:click={(event) => {
		checked = !checked;
		if (isFormControl) {
			event.stopPropagation();
		}
	}}><slot /></button
>

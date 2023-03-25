<script lang="ts">
	import { createEventDispatcher } from "svelte";


	export let pressed: boolean = false;
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher<{toggle: boolean}>();
	function click() {
		if (!disabled) {
			pressed = !pressed;
		}
		dispatch('toggle', pressed);
	}
</script>

<button
	type="button"
	{...$$restProps}
	aria-pressed={pressed}
	aria-disabled={disabled}
	on:click={click}
>
	<slot />
</button>

<script lang="ts">
	export let pressed: boolean = false;
	export let disabled: boolean = false;

	function click() {
		if (!disabled) {
			pressed = !pressed;
		}
	}
</script>

<button
	type="button"
	class={$$props.class}
	aria-pressed={pressed}
	aria-disabled={disabled}
	on:click={click}
>
	<slot />
</button>

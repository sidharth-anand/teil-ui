<script lang="ts">
	import type { Orientation } from './types';

	export let orientation: Orientation = 'horizontal';
	export let decorative: boolean = false;
</script>

<div
	role={decorative ? 'none' : 'separator'}
	class={$$props.class}
	aria-orientation={decorative ? undefined : orientation}
/>

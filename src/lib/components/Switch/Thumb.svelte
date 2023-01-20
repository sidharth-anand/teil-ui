<script lang="ts">
	import { hasContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	if (!hasContext(CONTEXT.SWITCH)) {
		throw new Error('Switch.Thumb must be used inside Switch.Track');
	}
</script>

<span class={$$props.class}>
	<slot />
</span>

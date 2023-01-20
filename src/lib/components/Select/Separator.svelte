<script lang="ts">
	import { hasContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	if (!hasContext(CONTEXT.SELECT)) {
		throw new Error('Select.Value must be used inside a Select.Container');
	}
</script>

<div class={$$props.class} aria-hidden>
	<slot />
</div>

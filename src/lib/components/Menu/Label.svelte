<script lang="ts">
	import { hasContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	if (!hasContext(CONTEXT.MENU)) {
		throw new Error('Menu.Label must be used inside a Menu.Container');
	}
</script>

<div class={$$props.class}><slot /></div>

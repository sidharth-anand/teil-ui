<script lang="ts">
	import { hasContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	if (!hasContext(CONTEXT.MENU)) {
		throw new Error('Menu.Group must be used inside a Menu.Container');
	}
</script>

<div {...$$restProps} role="group"><slot /></div>

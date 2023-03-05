<script lang="ts">
	import type { Measurable } from '../Popper/types';

	import { hasContext } from 'svelte';

	import Popper from '../Popper';

	import { CONTEXT } from '../../constants';

	export let virtualElement: Measurable | undefined = undefined;

	if (!hasContext(CONTEXT.MENU)) {
		throw new Error('Menu.Anchor must be used inside Menu.Container');
	}
</script>

<Popper.Anchor {...$$restProps} {virtualElement}>
	<slot />
</Popper.Anchor>

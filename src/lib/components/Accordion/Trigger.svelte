<script lang="ts">
	import { hasContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	import Collapsible from '../Collapsible';

	if (!hasContext(CONTEXT.ACCORDION_ITEM)) {
		throw new Error('Accordion.Trigger must be used inside Accordion.Item');
	}
</script>

<Collapsible.Trigger class={$$props.class}><slot /></Collapsible.Trigger>

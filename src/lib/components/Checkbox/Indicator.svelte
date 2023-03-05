<script lang="ts">
	import { hasContext, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	import type { CheckboxStoreType } from './types';

	if (!hasContext(CONTEXT.CHECKBOX)) {
		throw new Error('Checkbox.Indicator must be used inside Checkbox.Box');
	}

	const checkboxStore: Readable<CheckboxStoreType> = getContext(CONTEXT.CHECKBOX);
</script>

<span
	{...$$restProps}
	aria-disabled={$checkboxStore.disabled}
>
	{#if $checkboxStore.state === true || (!$$slots.indeterminate && $checkboxStore.state === 'indeterminate')}
		<slot name="checked" />
	{:else if $checkboxStore.state === 'indeterminate' && $$slots.indeterminate}
		<slot name="indeterminate" />
	{:else}
		<slot name="unchecked" />
	{/if}
</span>

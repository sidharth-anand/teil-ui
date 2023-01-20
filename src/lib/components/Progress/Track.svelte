<script lang="ts">
	import type { ProgressStoreType } from './types';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { CONTEXT } from '../../constants';

	export let value: number = 0;
	export let max: number = 100;

	export let label: (value: number, max: number) => string = (value: number, max: number) =>
		`${(value / max) * 100}%`;

	const progressStore = writable<ProgressStoreType>({
		value,
		max
	});

	setContext(CONTEXT.PRORGRESS, progressStore);

	$: max = typeof max !== 'number' || isNaN(max) || max <= 0 ? 100 : max;
	$: value = typeof value !== 'number' || isNaN(value) || value < 0 || value > max ? null : value;
	$: text = typeof max === 'number' ? label(value, max) : undefined;

	$: {
		progressStore.set({
			value,
			max
		});
	}
</script>

<div
	role="progressbar"
	class={$$props.class}
	aria-valuemax={max}
	aria-valuemin={0}
	aria-valuenow={value}
	aria-valuetext={text}
>
	<slot />
</div>

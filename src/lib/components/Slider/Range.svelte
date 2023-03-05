<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { SliderStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	import { OPPOSITES } from './constants';

	if (!hasContext(CONTEXT.SLIDER)) {
		throw new Error('Slider.Range must be used inside a Slider.Container');
	}

	const sliderStore = getContext<Writable<SliderStoreType>>(CONTEXT.SLIDER);

	$: valuesCount = $sliderStore.value.length;
	$: percentages = $sliderStore.value.map(
		(value) => (100 / ($sliderStore.max - $sliderStore.min)) * (value - $sliderStore.min)
	);

	$: start = valuesCount > 1 ? Math.min(...percentages) : 0;
	$: end = 100 - Math.max(...percentages);
</script>

<span
	{...$$restProps}
	style="
    {$sliderStore.movement}: {start}%;
    {OPPOSITES[$sliderStore.movement]}: {end}%;
"
>
	<slot />
</span>

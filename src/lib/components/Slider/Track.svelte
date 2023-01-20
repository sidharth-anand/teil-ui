<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { SliderStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	if (!hasContext(CONTEXT.SLIDER)) {
		throw new Error('Slider.Track must be used inside a Slider.Container');
	}

	const sliderStore: Writable<SliderStoreType> = getContext(CONTEXT.SLIDER);
</script>

<span
	class={$$props.class}
	aria-orientation={$sliderStore.orientation}
	aria-disabled={$sliderStore.disabled}><slot /></span
>

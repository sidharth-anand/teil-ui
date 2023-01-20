<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { HoverCardStoreType } from './types';

	import { hasContext, getContext } from 'svelte';

	import { CONTEXT } from '../../constants';

	import Popper from '../Popper';

	export let delayOpen: number = 700;
	export let delayClose: number = 300;

	if (!hasContext(CONTEXT.HOVERCARD)) {
		throw new Error('HoverCard.Trigger must be used inside HoverCard.Container');
	}

	const hoverCardStore = getContext<Writable<HoverCardStoreType>>(CONTEXT.HOVERCARD);

	let openTimer: NodeJS.Timeout = null;
	let closeTimer: NodeJS.Timeout = null;

	function toggle(open: boolean) {
		hoverCardStore.update((state) => ({
			...state,
			open
		}));
	}

	function open() {
		clearTimeout(closeTimer);
		openTimer = setTimeout(() => toggle(true), delayOpen);
	}

	function close() {
		clearTimeout(openTimer);
		closeTimer = setTimeout(() => toggle(false), delayClose);
	}

	hoverCardStore.update((state) => ({
		...state,
		toggle: (change: boolean) => {
			change ? open() : close();
		}
	}));
</script>

<Popper.Anchor
	on:pointerenter={open}
	on:pointerleave={close}
	on:focus={open}
	on:blur={close}
	on:touchstart={(event) => event.preventDefault()}
>
	<slot />
</Popper.Anchor>

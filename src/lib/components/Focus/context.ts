import type { Writable } from 'svelte/store';

import type { FocusContextOptions, FocusIntent, FocusStoreType } from './types';

import { get, writable } from 'svelte/store';

const register = (items: Array<number>): number => {
	return items.push(items.length + 1);
};

const unregister = (items: Array<number>, index: number): void => {
	items.splice(
		items.findIndex((item) => item === index),
		1
	);
};

const shiftFocus = (
	items: Array<number>,
	intent: FocusIntent,
	loop: boolean,
	focusStore: Writable<FocusStoreType>
): number => {
	if (!get(focusStore).currentStopIndex) {
		if (!items.length) {
			return;
		} else {
			focusStore.update((state) => ({
				...state,
				currentStopIndex: -1
			}));
		}
	}

	const focusable = items.filter((item) => get(focusStore).state.get(item).focusable);

	const currentIndex = focusable.findIndex((index) => index === get(focusStore).currentStopIndex);

	let nextIndex = currentIndex;

	if (intent === 'previous') {
		nextIndex = loop
			? (currentIndex - 1 + focusable.length) % focusable.length
			: Math.max(0, currentIndex - 1);
	} else if (intent === 'next') {
		nextIndex = loop
			? (currentIndex + 1 + focusable.length) % focusable.length
			: Math.min(focusable.length - 1, currentIndex + 1);
	} else if (intent === 'first') {
		nextIndex = 0;
	} else if (intent === 'last') {
		nextIndex = focusable.length - 1;
	}

	setTimeout(() => {
		focusStore.update((state) => ({
			...state,
			currentStopIndex: focusable[nextIndex]
		}));
	});

	return focusable[nextIndex];
};

export function createFocusContext(options: FocusContextOptions) {
	const focusStore: Writable<FocusStoreType> = writable({
		orientation: options.orientation,
		direction: options.direction,
		loop: options.loop,

		forceFocusAll: options.forceFocusAll ?? false,
		forceFocusContainer: options.forceFocusContainer ?? false,
		forceFocusFirst: options.forceFocusFirst ?? false,

		disableTabbing: options.disableTabbing ?? false,
		focusContainerOnMount: options.focusContainerOnMount ?? false,
		blurContainerOnLeave: options.blurContainerOnLeave ?? false,

		tabbingOut: false,

		items: new Array(),
		state: new Map(),

		getFocusIntent: options.getFocusIntent,

		shiftFocus: function (intent: FocusIntent) {
			return shiftFocus(this.items, intent, options.loop, focusStore);
		},

		register: function () {
			return register(this.items);
		},
		unregister: function (index: number) {
			return unregister(this.items, index);
		}
	});

	return focusStore;
}
